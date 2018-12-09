export function loggedIn() {
    this.$store.getters.loggedIn ? null : this.$router.replace(`/?next=${this.$route.path}`);
};

export function notLoggedIn() {
    this.$store.getters.loggedIn ? this.$router.replace("/dashboard") : null;
};