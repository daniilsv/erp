<template>
  <v-layout column>
    <v-data-table :headers="headers" :items="items">
      <template slot="items" slot-scope="props">
        <td>
          <router-link :to="'/'+props.item._id">{{ props.item.title }}</router-link>
        </td>
        <td class="text-xs">{{ props.item.time }}</td>
      </template>
    </v-data-table>
  </v-layout>
</template>


<script>
import { mapMutations, mapActions } from "vuex";
export default {
  created() {
    this.loadList();
    this.setFab([
      { icon: "fa-plus", color: "green", to: `/create?type=${this.type}` }
    ]);
  },
  updated() {
    this.loadList();
  },
  data() {
    return {
      headers: [
        { text: "Название", value: "title" },
        { text: "Время начала", value: "time" }
      ],
      items: [],
      ans: "All"
    };
  },
  computed: {
    type() {
      return this.$route.query.type || "";
    }
  },
  methods: {
    ...mapMutations({ setFab: "view/setFab" }),
    ...mapActions({ cRelated: "content/related" }),
    loadList() {
      this.cRelated({ socket: this.$socket, filter: { type: this.type } }).then(
        this.onLoadList
      );
    },
    onLoadList(items) {
      this.items = items;
    }
  }
};
</script>