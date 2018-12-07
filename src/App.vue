<template>
<v-app>
    <v-toolbar app>

        <v-toolbar-side-icon v-if="$store.getters.loggedIn">
            <v-icon @click="$store.state.drawer = !$store.state.drawer">menu</v-icon>
        </v-toolbar-side-icon>

        <v-toolbar-title v-if="!$store.getters.loggedIn" class="headline text-uppercase pt-2">
            <img width="50" src="@/assets/logo.png">
        </v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="font-weight-bold" v-if="!$store.getters.loggedIn">I4POLICY ADMIN PANEL</span>

            <v-menu v-if="$store.getters.loggedIn">
                <v-avatar color="primary" slot="activator">
                    <v-icon>person</v-icon>
                </v-avatar>

                <v-list>

                    <v-list-tile @click="$router.push('/profile')">

                        <v-list-tile-avatar>
                            <v-icon>edit</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-title>Profile</v-list-tile-title>

                    </v-list-tile>

                    <v-list-tile @click="logout">

                        <v-list-tile-avatar>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-title>Logout</v-list-tile-title>

                    </v-list-tile>

                </v-list>

            </v-menu>

    </v-toolbar>

    <v-content>
        <router-view />
    </v-content>

    <v-footer app dark height="80" v-if="!$store.getters.loggedIn">
        <img class="ml-3" width="60" src="@/assets/logo.white.png">
        <v-spacer></v-spacer>
        <img class="mr-3" width="80" src="@/assets/ahadoo-logo.png">
    </v-footer>
</v-app>
</template>

<script>
export default {
    name: 'App',
    methods: {
        logout() {
            this.$store.commit("logout");
            this.$router.replace("/");
        }
    }
}
</script>

<style>
.ql-editor p {
    margin: 1rem 0;
}
</style>
