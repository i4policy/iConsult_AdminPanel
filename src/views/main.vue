<template>
<v-container fluid full-height>

    <v-navigation-drawer :app="true" :dark="true" width="250" :mini-variant.sync="$store.state.drawer">

        <v-list>

            <v-toolbar color="#414141" flat>
                <v-list>
                    <v-list-tile>
                        <img class="mr-2" src="@/assets/logo.white.png" width="80">
                        <v-list-tile-title v-if="!$store.state.drawer">
                            <h3>I4Policy Manifesto</h3>
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list-tile>
                <v-list-tile-avatar>
                    <v-icon color="primary">dashboard</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <router-link to="/dashboard">Dashboard</router-link>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
                <v-list-tile-avatar>
                    <v-icon color="primary">book</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <router-link to="/documents">Documents</router-link>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
                <v-list-tile-avatar>
                    <v-icon color="primary">reply</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <router-link to="/responses">Responses</router-link>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
                <v-list-tile-avatar>
                    <v-icon color="primary">people</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>
                        <router-link to="/users">Users</router-link>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

        </v-list>

    </v-navigation-drawer>

    <router-view :ref="$route.fullPath"></router-view>

</v-container>
</template>

<script>
import {
    loggedIn
} from "../guards";

export default {
    name: "main",
    beforeCreate: loggedIn
};
</script>

<style>
a {
    text-decoration: none;
}

.router-link-active {
    text-decoration: underline;
    font-weight: 900;
}
</style>
