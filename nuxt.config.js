const nodeExternals = require("webpack-node-externals");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
module.exports = {
  mode: "spa",

  head: {
    title: "DVS.ERP",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
      }
    ]
  },
  plugins: ["~/plugins/vuetify.js", "~/plugins/socket.io.js"],
  css: ["~/assets/style/app.styl"],

  loading: { color: "orange" },

  build: {
    transpile: [/^vuetify/],
    plugins: [new VuetifyLoaderPlugin()],
    extractCSS: true,
    extend(config, ctx) {
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  }
};
