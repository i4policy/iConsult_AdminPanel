export default {
    login(state, data) {
        state.user = data;
    },
    
    updateLoading(state, loading) {
        state.loading = loading;
    }
}