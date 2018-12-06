export default {
    login(state, data) {
        state.user = data;
    },

    logout(state) {
        state.user = null;
        localStorage.removeItem("session");
    },
    
    updateLoading(state, loading) {
        state.loading = loading;
    }
}