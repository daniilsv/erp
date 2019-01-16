<template>
  <v-layout align-start justify-start row>
    {{item}}
    <div v-for="(field, index) in item.fields" :key="index">
      <CField v-model="fields[index]"/>
    </div>

    <v-snackbar v-model="errorSnackbar" color="error">
      {{ errorText }}
      <v-btn dark flat @click="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>


<script>
import { mapActions, mapMutations } from "vuex";
import CField from "~/components/content-editable-field.vue";
export default {
  created() {
    this.read();
  },
  data() {
    return {
      item: {},
      errorSnackbar: false,
      errorText: ""
    };
  },
  components: { CField },
  methods: {
    ...mapActions({ cRead: "content/read", cDelete: "content/delete" }),
    ...mapMutations({ setFab: "view/setFab" }),
    read() {
      this.cRead({
        socket: this.$socket,
        id: this.$route.params.id
      })
        .then(this.onRead)
        .catch(this.showError);
    },
    onRead(item) {
      this.item = item;
      this.setFab([
        { icon: "fa-sync", color: "blue", click: this.read },
        { icon: "fa-pen", color: "orange", to: `/project/${item._id}/edit` },
        { icon: "fa-trash-alt", color: "red", click: this.delete }
      ]);
    },
    delete() {
      this.cDelete({
        socket: this.$socket,
        id: this.$route.params.id
      })
        .then(this.onDelete)
        .catch(this.failed);
    },
    onDelete() {
      this.$router.replace("/project");
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