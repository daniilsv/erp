<template>
  <v-layout align-center justify-center row fill-height wrap>
    <authLogin/>
    <authRegistration/>
  </v-layout>
</template>


<script>
import authLogin from "~/components/auth-login.vue";
import authRegistration from "~/components/auth-registration.vue";
export default {
  layout: "auth",
  components: { authRegistration, authLogin }
};
</script>
