<template>
  <div>
    <CEForm :fields="data"/>
    <v-btn @click="add"/>
  </div>
</template>

<script>
import CEForm from "~/components/content-edit-form.vue";
export default {
  components: { CEForm },
  data() {
    return {
      data: [
        {
          type: "text",
          label: "label",
          value: "value"
        },
        {
          type: "textarea",
          label: "Use password?",
          value: "usePassword"
        }
      ]
    };
  },
  methods: {
    add() {
      this.data.push({
        type: "textarea",
        label: "Use password?",
        value: "usePassword"
      });
    }
  }
};
</script>