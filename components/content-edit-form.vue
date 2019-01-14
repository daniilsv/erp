<template>
  <div>
    <div v-for="(field, index) in fields" :key="index">
      <CEFField v-model="fields[index]"/>
    <v-btn @click="change(index)"/>
    </div>
  </div>
</template>

<script>
import CEFField from "~/components/content-edit-form-field.vue";
export default {
  props: ["fields"],
  components: { CEFField },
  methods: {
    change(index) {
      this.fields[index].type="checkbox";
    }
  }
};
</script>