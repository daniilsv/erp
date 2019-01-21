import { mapActions, mapMutations } from "vuex";
import { DateTime, UserSelect } from "~/components/fields";

export default ({ type }) => ({
  created() {
    this.setFab([{ icon: "fa-arrow-left", color: "grey", to: `/${type}` }]);
  },
  data() {
    return {
      item: {
        parent: this.$route.query.parent || null,
        type: this.$route.query.type || null,
      },
      errorSnackbar: false,
      errorText: "",
      tagSearch: null,
      tagsList: ["FrontEnd", "BackEnd", "ServerSide"],
      types: [
        { value: "project", text: "Проект" },
        { value: "task", text: "Задача" },
        { value: "bug", text: "Баг" },
        { value: "note", text: "Заметка" },
        { value: "timer", text: "Таймер" },
        { value: "stopwatch", text: "Секундомер" },
        { value: "counter", text: "Счетчик" }
      ]
    };
  },
  components: { DateTime, UserSelect },

  methods: {
    ...mapActions({ cCreate: "content/create" }),
    ...mapMutations({ setFab: "view/setFab" }),
    create() {
      this.cCreate({
        socket: this.$socket,
        item: Object.assign({}, this.item)
      })
        .then(this.onCreated)
        .catch(this.failed);
    },
    onCreated(result) {
      this.$router.replace(`/${result}`);
    },
    failed(result) {
      this.showError(result);
    },
    showError(error) {
      this.errorSnackbar = true;
      this.errorText = error;
    },
    tagFilter(item, queryText, itemText) {
      const hasValue = val => val || "";
      const text = hasValue(itemText);
      const query = hasValue(queryText);
      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    }
  }
});
