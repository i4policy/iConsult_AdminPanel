import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    drawer: false
  },
  mutations: mutations,
  actions: actions,
  getters: {
    loggedIn: (state) => state.user && state.user.auth_token !== null && state.user.auth_token !== undefined
  }
});
