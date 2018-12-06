import Vue from "vue"
import "./plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import validate from "validate.js";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false

validate.formatters.custom = function(errors) {
  let data = {};
  for (let error in errors) {
    if (!errors.hasOwnProperty(error)) continue;
    data[errors[error].attribute] = errors[error].error;
  }
  return data;
};

Vue.prototype.$validate = function(object, constraints) {
  return validate(object, constraints, {format: "custom", fullMessages: false});
};

Vue.prototype.$fetch = function(url, method, data) {

  store.commit("updateLoading", "loading");

  return new Promise((resolve, reject) => {
      fetch(process.env.VUE_APP_BASE_URL + url, {
          method: method || "GET",
          body: JSON.stringify(data),
          mode: "cors",
          redirect: "follow",
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": store.state.user && store.state.user.auth_token ? store.state.user.auth_token : undefined
          }
      })
      .then(response => {
        response.ok ? store.commit("updateLoading", "done") : store.commit("updateLoading", "fail");
        resolve(response);
      })
      .catch(error => {
        store.commit("updateLoading", "fail");
      });
  });
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
