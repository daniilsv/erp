<template>
  <v-input class="v-text-field f-datetime">
    <label aria-hidden="true" :class="'v-label'+(localValue?' v-label--active':'')">{{label}}</label>
    <Datetime v-model="localValue" :type="type"/>
  </v-input>
</template>


<script>
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
export default {
  props: ["value", "label", "type"],
  components: { Datetime },
  data() {
    return {
      localValue: this.value
    };
  },
  watch: {
    localValue(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.localValue = val;
    }
  }
};
</script>

<style lang="scss">
.f-datetime .v-label {
  position: absolute;
  pointer-events: none;
}
.v-label--active {
  position: absolute;
}
.f-datetime .vdatetime {
  width: 100%;
}
</style>
