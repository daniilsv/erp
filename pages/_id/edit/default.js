import { mapActions, mapMutations } from "vuex";
import { DateTime, UserSelect } from "~/components/fields";

export default ({ type }) => ({
  created() {
    this.read();
  },
  data() {
    return {
      item: {},
      old: {},
      errorSnackbar: false,
      errorText: "",
      tagSearch: null,
      tagsList: ["FrontEnd", "BackEnd", "ServerSide"],
      types: [
        { value: "project", text: "Проект" },
        { value: "tak", text: "Задача" },
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
