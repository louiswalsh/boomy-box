import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import BootstrapVue from "bootstrap-vue";
import store from "./store/store.js";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

axios.interceptors.request.use(
  config => {
    if (localStorage.access_token) {
      config.headers = {
        Authorization: "Bearer " + localStorage.access_token
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const status = error.response.status;
    const originalConfig = error.config;

    // Capture authentication error - return to login
    if (status === 400) {
      router.push({
        name: "Login"
      });
    }
    // Uses refresh token if access token invalid or expired
    if (status === 401) {
      const new_access_token = await store.refresh();
      if (new_access_token) {
        originalConfig.headers.Authorization =
          "Bearer " + localStorage.access_token;
        return axios(originalConfig);
      }
    }

    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
