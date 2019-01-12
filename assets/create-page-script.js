import { mapActions, mapMutations } from "vuex";

export default ({ CForm, type }) => ({
  created() {
    this.setFab([{ icon: "fa-arrow-left", color: "grey", to: `/${type}` }]);
  },
  data() {
    return {
      errorSnackbar: false,
      errorText: ""
    };
  },
  components: { CForm },

  methods: {
    ...mapActions({ cCreate: "content/create" }),
    ...mapMutations({ setFab: "view/setFab" }),
    create(item) {
      this.cCreate({
        socket: this.$socket,
        item: Object.assign({}, item)
      })
        .then(this.onCreated)
        .catch(this.failed);
    },
    onCreated(result) {
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
