<template>
  <v-input class="v-text-field">
    <label aria-hidden="true" :class="labelclass">{{label}}</label>
    <datetime v-bind:value="value" v-on:input="value=$event" type="datetime"/>
  </v-input>
</template>


<script>
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
export default {
  props: ["time", "label"],
  components: {
    datetime: Datetime
  },
  data: () => ({
    localValue: undefined
  }),
  computed: {
    labelclass() {
      return this.localValue ? "v-label v-label--active" : "v-label";
    },
    value: {
      get() {
        return (this.localValue = this.time);
      },
      set(_) {
        this.localValue = _;
        this.$emit("changed", _);
      }
    }
  }
};
</script>

<style lang="scss">
.v-label--active {
  position: absolute;
}
</style>
