<template>
  <v-app>
    <v-navigation-drawer clipped v-model="drawer" fixed app>
      <v-list class="drawer-menu">
        <v-list-tile
          v-on:click="item.click!==undefined?item.click():$router.push(item.to)"
          :key="i"
          v-for="(item, i) in items"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left>
      <v-toolbar-side-icon @click="toggleDrawer">
        <v-icon>fa-bars</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer/>
      <v-toolbar-side-icon @click="$router.go(-1)">
        <v-icon>fa-arrow-left</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-side-icon @click="$router.go(1)">
        <v-icon>fa-arrow-right</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

    <v-speed-dial bottom right direction="top" fixed v-if="fabShow">
      <v-btn slot="activator" color="blue darken-2" dark fab>
        <v-icon>fa-ellipsis-h</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        v-for="(button, index) in fabButtons.slice().reverse()"
        :key="index"
        :color="button.color"
        v-on:click="button.click!==undefined?button.click():$router.push(button.to)"
      >
        <v-icon>{{button.icon}}</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-app>
</template>

<script>
import socket from "~/plugins/socket.io";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  async created() {
    if (!this.$store.getters["auth/isAuthenticated"]) {
      return this.$router.replace("/auth");
    }
    let { error } = await socket(this);
    if (error) return this.$router.replace("/auth");
  },
  data() {
    return {
      items: [
        { icon: "fa-tachometer-alt", title: "Главная", to: "/" },
        { icon: "fa-project-diagram", title: "Проекты", to: "/project" },
        { icon: "fa-tasks", title: "Задачи", to: "/task" },
        { icon: "fa-sticky-note", title: "Заметки", to: "/note" },
        { icon: "fa-bug", title: "Багтрекер", to: "/bugtracker" },
        { icon: "fa-sort-numeric-down", title: "Счетчики", to: "/counter" },
        { icon: "fa-clock", title: "Таймеры", to: "/timer" },
        { icon: "fa-stopwatch", title: "Секундомеры", to: "/stopwatch" },
        { icon: "fa-sign-out-alt", title: "Выход", click: this.logout }
      ],
      right: true
    };
  },
  computed: {
    ...mapState("view", ["title"]),
    ...mapState("view", { fabButtons: "fab" }),
    drawer: {
      get() {
        return this.$store.state.view.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    },
    fabShow: function() {
      return Array.isArray(this.fabButtons) && this.fabButtons.length > 0;
    }
  },
  methods: {
    ...mapMutations({
      setDrawer: "view/setDrawer",
      toggleDrawer: "view/toggleDrawer"
    }),
    ...mapActions({
      aLogout: "auth/logout"
    }),
    logout() {
      this.aLogout({
        socket: this.$socket,
        router: this.$router
      }).then(this.onLogout);
    },
    onLogout() {
      this.$router.replace({ path: "/auth" });
    }
  }
};
</script>

<style lang="scss">
.fa {
  font-weight: normal !important;
}
</style>
