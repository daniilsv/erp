import { mapActions, mapMutations } from "vuex";

export default ({ CForm, type }) => ({
  created() {
    this.read();
  },
  data() {
    return {
      item: undefined,
      old: undefined,
      errorSnackbar: false,
      errorText: ""
    };
  },
  components: { CForm },

  methods: {
    ...mapActions({ cRead: "content/read", cUpdate: "content/update" }),
    ...mapMutations({ setFab: "view/setFab" }),
    read() {
      this.cRead({
        socket: this.$socket,
        id: this.$route.params.id
      })
        .then(this.onRead)
        .catch(this.showError);
    },
    onRead(item) {
      this.item = item;
      this.old = JSON.parse(JSON.stringify(item));
      this.setFab([
        { icon: "fa-sync", color: "blue", click: this.read },
        { icon: "fa-arrow-left", color: "grey", to: `/${type}/${item._id}` }
      ]);
    },
    update() {
      this.cUpdate({
        socket: this.$socket,
        item: this.item,
        old: this.old
      })
        .then(this.onUpdated)
        .catch(this.failed);
    },
    onUpdated(result) {
      this.$router.replace(`/${type}/${result}`);
    },
    failed(result) {
      this.showError(result);
    },
    showError(error) {
      this.errorSnackbar = true;
      this.errorText = error;
    }
  }
});
