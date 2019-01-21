<template>
  <v-combobox
    :label="label"
    :multiple="multiple"
    v-model="localValue"
    :items="items"
    :filter="filter"
    :hide-no-data="!search"
    :search-input.sync="search"
    small-chips
    hide-selected
  />
</template>

<script>
export default {
  props: { label: String, multiple: Boolean, value: String | Object },
  data() {
    return {
      localValue: this.value,
      items: [],
      search: ""
    };
  },
  methods: {
    filter(item, queryText, itemText) {
      return true;
    }
  },
  watch: {
    localValue(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.localValue = val;
    },
    search(val) {
      this.$socket.emit(
        "user.autocomplete",
        { name: val },
        _ => (this.items = _)
      );
    }
  }
};
</script>