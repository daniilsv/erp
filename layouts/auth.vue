<template>
  <v-app>
    <v-toolbar fixed app>
      <v-toolbar-title v-text="title"/>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
import socket from "~/plugins/socket.io";
export default {
  async created() {
    if (this.$store.getters["auth/isAuthenticated"]) {
      return this.$router.replace("/");
    }
    let { error } = await socket(this);
    if (!error) return this.$router.replace("/");
  },
  data() {
    return {
      title: "DVS.ERP"
    };
  }
};
</script>
