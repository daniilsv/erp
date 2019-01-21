<template>
  <v-card class="mx-4" max-width="720" min-width="320">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>Авторизация</span>
    </v-card-title>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text>
        <v-text-field v-model="user.email" label="Email" :rules="emailRules"></v-text-field>

        <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
          :rules="passwordRules"
        ></v-text-field>
      </v-card-text>
    </v-form>
    <v-divider></v-divider>

    <v-layout justify-center>
      <v-btn color="primary" depressed @click="login">Login</v-btn>
    </v-layout>
    <v-snackbar v-model="errorSnackbar" color="error">
      {{ errorText }}
      <v-btn dark flat @click="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    errorSnackbar: false,
    errorText: "",
    valid: true,
    emailRules: [
      v => !!v || "E-mail is requiredd",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [v => !!v || "Password is required"],
    user: {}
  }),
  methods: {
    ...mapActions({ aLogin: "auth/login" }),
    login() {
      if (this.$refs["form"].validate())
        this.aLogin({
          socket: this.$socket,
          user: this.user
        })
          .then(this.onLogin)
          .catch(this.failed);
    },
    onLogin(result) {
      this.$router.replace(`/`);
    },
    failed(result) {
      this.showError(result);
    },
    showError(error) {
      this.errorSnackbar = true;
      this.errorText = error;
    }
  }
};
</script>
