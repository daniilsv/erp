<template>
  <v-layout column>
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>Создание проекта</span>
    </v-card-title>
    <CForm v-on:submit="create"/>
    <v-snackbar v-model="errorSnackbar" color="error">
      {{ errorText }}
      <v-btn dark flat @click="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>


<script>
import CForm from "~/components/form-project.vue";
import createScript from "~/assets/create-page-script.js";
export default createScript({ CForm, type: "project" });
</script>