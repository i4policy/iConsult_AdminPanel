import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import Main from "./views/main";
import Dashboard from "./views/dashboard";
import Documents from "./views/documents/documents";
import EditDocument from "./views/documents/edit";
import AddDocument from "./views/documents/add";
import Responses from "./views/responses/responses";
import Response from "./views/responses/response";

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
        },
        {
          path: "/documents",
          component: Documents
        },
        {
          path: "/documents/add",
          component: AddDocument
        },
        {
          path: "/documents/:id",
          component: EditDocument
        },
        {
          path: "/users",
          component: () => import("./views/users")
        },
        {
          path: "/profile",
          component: () => import("./views/profile")
        },
        {
          path: "/responses",
          component: Responses
        },
        {
          path: "/responses/:id",
          component: Response
        }
      ]
    },
  ]
})
