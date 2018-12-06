<template>

  <v-container fluid full-height>

    <v-navigation-drawer class="primary" :app="true" :dark="true" width="250" :mini-variant.sync="$store.state.drawer">

      <v-list>

        <v-toolbar color="#212121" flat>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-avatar>
                  <img src="@/assets/logo.white.png">
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-title v-if="!$store.state.drawer"><h4>I4Policy Manifesto</h4></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon color="grey">dashboard</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/dashboard">Dashboard</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon color="grey">people</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title><router-link to="/users">Users</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>

    </v-navigation-drawer>

    <router-view :ref="$route.fullPath"></router-view>

  </v-container>

</template>

<script>
  export default {
    name: "main"
  }
</script>

<style>
a {
    color: #9e9e9e !important;
    text-decoration: none;
}
</style>
