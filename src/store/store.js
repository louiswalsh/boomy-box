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
  },
  getBoomyTracks: async () => {
    return await Vue.axios.get("https://api.spotify.com/v1/search?q=label:boomy&type=track");
  },
  createUserPlaylist: async (emoji) => {

    const data = {'name': `${emoji} - Boomy`, 'public': 'true'}
    return await Vue.axios.post("https://api.spotify.com/v1/users/1239638484/playlists", data);
  },
  populatePlaylist: async (data, playlistId) => {
    return await Vue.axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, data);
  }
};
