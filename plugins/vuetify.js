import Vue from "vue";
import Vuetify, {
  VApp, // required
  VNavigationDrawer,
  VFooter,
  VToolbar
} from "vuetify/lib";
import { Ripple } from "vuetify/lib/directives";

import "~/static/css/font-awesome.css";

Vue.use(Vuetify, {
  iconfont: "fa",
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar
  },
  directives: {
    Ripple
  }
});

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(key, obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});
