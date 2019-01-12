<template>
  <v-layout align-start justify-start row>{{ans}}</v-layout>
</template>


<script>
import { mapMutations } from "vuex";
export default {
  created() {
    this.setFab(null);
  },
  data() {
    return {
      ans: "All"
    };
  },
  methods: {
    ...mapMutations({ setFab: "view/setFab" })
  }
};
</script>