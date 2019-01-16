<template>
  <v-layout column>
    <v-data-table :headers="headers" :items="items">
      <template slot="items" slot-scope="props">
        <td>
          <router-link :to="genHref(props.item)">{{ props.item.title }}</router-link>
        </td>
        <td class="text-xs">{{ props.item.time }}</td>
      </template>
    </v-data-table>
  </v-layout>
</template>


<script>
import { mapMutations } from "vuex";
export default {
  created() {
    this.$socket.emit("content.getRelated", {}, this.onLoadList);
    this.setFab([{ icon: "fa-plus", color: "green", to: `/project/create` }]);
  },
  data() {
    return {
      headers: [
        {
          text: "Название",
          value: "title"
        },
        { text: "Время начала", value: "time" }
      ],
      items: [],
      ans: "All"
    };
  },
  methods: {
    ...mapMutations({ setFab: "view/setFab" }),
    setWidgets(_) {
      this.ans = _;
      console.log(_);
    },
    genHref(item) {
      return `/project/${item._id}`;
    },
    onLoadList(items) {
      this.items = items;
    }
  }
};
</script>