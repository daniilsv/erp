<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="item.title" label="Название"></v-text-field>
    <FDatetime :time="item.time" v-on:changed="item.time=$event" label="Дата начала"/>
    <v-btn :disabled="!valid" color="success" @click="$emit('submit',item)">Сохранить</v-btn>
  </v-form>
</template>

<script>
import FDatetime from "~/components/field-datetime.vue";
export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        type: "project",
        data: {}
      })
    }
  },
  components: { FDatetime },
  data: () => ({
    valid: true
  })
};
</script>
