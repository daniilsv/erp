<template>
  <v-layout column>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-layout column>
          <small v-if="item.parent">
            <router-link :to="'/'+item.parent._id">{{item.parent.title}}</router-link>
          </small>
          {{item.title}}
        </v-layout>
      </v-toolbar-title>

      <v-spacer/>
      <v-menu>
        <v-icon slot="activator">fa-plus</v-icon>
        <v-list>
          <v-list-tile
            @click="createChild(menuItem.type)"
            :key="i"
            v-for="(menuItem, i) in createMenuItems"
          >
            <v-list-tile-action>
              <v-icon v-html="menuItem.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="menuItem.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-layout wrap row>
      <v-flex sm12 md6>
        <blockquote class="blockquote">{{item.description}}</blockquote>
      </v-flex>

      <v-flex sm12 md6>
        <blockquote class="blockquote">{{item.description}}</blockquote>
      </v-flex>

      <v-flex sm12 md6 elevation6>
        <v-card>
          <v-card-title>Дочерний контент</v-card-title>
          <v-list>
            <v-list-tile :to="'/'+child._id" :key="i" v-for="(child, i) in children">
              <v-list-tile-action>
                <v-icon v-text="typeIcon(child.type)"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="child.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <div v-for="(field, index) in item.fields" :key="index">
      <CField v-model="fields[index]"/>
    </div>
    <v-snackbar v-model="errorSnackbar" color="error">
      {{ errorText }}
      <v-btn dark flat @click="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>


<script>
import { mapActions, mapMutations } from "vuex";
import CField from "~/components/content-editable-field.vue";
const contentTypes = [
  { icon: "fa-project-diagram", title: "Проект", type: "project" },
  { icon: "fa-tasks", title: "Задача", type: "task" },
  { icon: "fa-sticky-note", title: "Заметка", type: "note" },
  { icon: "fa-bug", title: "Баг", type: "bug" },
  { icon: "fa-sort-numeric-down", title: "Счетчик", type: "counter" },
  { icon: "fa-clock", title: "Таймер", type: "timer" },
  { icon: "fa-stopwatch", title: "Секундомер", type: "stopwatch" }
];
export default {
  created() {
    this.read();
    this.setFab([
      { icon: "fa-sync", color: "blue", click: this.read },
      { icon: "fa-pen", color: "orange", to: `/${this.itemId}/edit` },
      { icon: "fa-trash-alt", color: "red", click: this.delete }
    ]);
  },
  data() {
    return {
      item: {},
      children: [],
      errorSnackbar: false,
      errorText: "",
      createMenuItems: contentTypes
    };
  },
  components: { CField },
  computed: {
    itemId() {
      return this.$route.params.id;
    }
  },
  methods: {
    ...mapActions({
      cRead: "content/read",
      cDelete: "content/delete",
      cChildren: "content/children"
    }),
    ...mapMutations({ setFab: "view/setFab" }),
    read() {
      this.cRead({
        socket: this.$socket,
        id: this.itemId,
        populate: true
      })
        .then(this.onRead)
        .catch(this.showError);
    },
    onRead(item) {
      this.item = item;
      this.readChildren();
    },
    delete() {
      this.cDelete({
        socket: this.$socket,
        id: this.itemId
      })
        .then(this.onDelete)
        .catch(this.failed);
    },
    onDelete() {
      if (this.item.parent) this.$router.replace(`/${this.item.parent._id}`);
      else this.$router.replace(`/content?type=${this.item.type}`);
    },
    failed(result) {
      this.showError(result);
    },
    showError(error) {
      this.errorSnackbar = true;
      this.errorText = error;
    },
    typeIcon(type) {
      return contentTypes.filter(_ => _.type === type)[0].icon;
    },
    createChild(type) {
      this.$router.push(`/create?type=${type}&parent=${this.itemId}`);
    },
    readChildren() {
      this.cChildren({
        socket: this.$socket,
        id: this.itemId
      })
        .then(this.onReadChildren)
        .catch(this.showError);
    },
    onReadChildren(items) {
      this.children = items;
    }
  }
};
</script>