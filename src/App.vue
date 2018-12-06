<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <img width="50" src="@/assets/logo.png">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="font-weight-bold">I4POLICY ADMIN PANEL</span>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer app dark height="80">
      <img class="ml-3" width="60" src="@/assets/logo.white.png">
      <v-spacer></v-spacer>
      <img class="mr-3" width="80" src="@/assets/ahadoo-logo.png">
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
