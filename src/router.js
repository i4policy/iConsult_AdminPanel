import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import Main from "./views/main";
import Dashboard from "./views/dashboard";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      component: Login
    },
    {
      path: "/_/",
      component: Main,
      children: [
        {
          path: "/dashboard",
          component: Dashboard
        }
      ]
    }
  ]
})
