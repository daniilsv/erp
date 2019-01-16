<template>
  <v-card class="mx-4" max-width="720" min-width="320">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>Регистрация</span>
      <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-form ref="form1" v-model="valid" lazy-validation>
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
      </v-window-item>

      <v-window-item :value="2">
        <v-form ref="form2" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field v-model="user.name_first" label="First name" :rules="nameRules"></v-text-field>
            <v-text-field v-model="user.name_second" label="Second name"></v-text-field>
          </v-card-text>
        </v-form>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn v-show="step !== 1 && valid" flat @click="prev">Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!valid" color="primary" depressed @click="next">Next</v-btn>
    </v-card-actions>
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
    nameRules: [v => !!v || "Name is required"],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [v => !!v || "Password is required"],
    user: {},
    step: 1
  }),
  methods: {
    ...mapActions({ aRegister: "auth/register" }),
    prev() {
      if (this.$refs["form" + this.step].validate()) this.step--;
    },
    next() {
      if (this.$refs["form" + this.step].validate()) this.step++;
      if (this.step === 3) {
        this.register();
        this.step--;
      }
    },
    register() {
      this.aRegister({
        socket: this.$socket,
        user: this.user
      })
        .then(this.onRegister)
        .catch(this.failed);
    },
    onRegister(result) {
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
