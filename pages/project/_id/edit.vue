<template>
  <v-layout column>
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>Редактирование проекта {{old?old.title:""}}</span>
    </v-card-title>
    <CForm :item="item" v-on:submit="update"/>
    <v-snackbar v-model="errorSnackbar" color="error">
      {{ errorText }}
      <v-btn dark flat @click="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>


<script>
import CForm from "~/components/form-project.vue";
import editScript from "~/assets/edit-page-script.js";
export default editScript({ CForm, type: "project" });
</script>