<template>
  <div>
    <div v-if="localValue.type == 'email'">
      <v-text-field v-model="localValue.value" :label="localValue.label"></v-text-field>
    </div>

    <div v-else-if="localValue.type == 'checkbox'">
      <v-checkbox v-model="localValue.value" :label="localValue.label"></v-checkbox>
    </div>

    <div v-else-if="localValue.type == 'textarea'">
      <v-textarea v-model="localValue.value" :label="localValue.label"/>
    </div>

    <div v-else>
      <v-text-field v-model="localValue.value" :label="localValue.label"></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],

  data() {
    return {
      localValue: this.value
    };
  },
  watch: {
    localValue(val) {
      this.$emit("input", val);
    }
  }
};
</script>