import Vue from "vue";
export default {
  refresh: async () => {
    try {
      const response = await Vue.axios.get(
        "SERVER_PORT_ADDRESS/refresh_token",
        {
          params: {
            refresh_token: localStorage.refresh_token
          }
        }
      );
      if (response.status === 200 || response.status === 204) {
        return (localStorage.access_token = response.data.access_token);
      }
    } catch (error) {
      console.log(`${error} - ${error.response.data.error.error_description}`);
      return null;
    }
  },
  getUserData: async () => {
    return await Vue.axios.get("https://api.spotify.com/v1/me");
  }
};
