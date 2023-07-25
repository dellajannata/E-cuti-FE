export default {
  router: {
    base: '/dashboard'
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FE Magang NuxtJS',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "FE Magang" },
      { name: " format-detection", content: "telephone-no" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
        crossorigin: "",
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.icon'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
      }
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.7.0.js',
        type: 'text/javascript'
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
        type: 'text/javascript'
      },
      {
        src: 'assets/js/template.js',
        type: 'text/javascript'
      }
    ]
  },

  css: [
    '~/assets/vendors/feather/feather.css',
    '~/assets/vendors/mdi/css/materialdesignicons.min.css',
    '~/assets/vendors/ti-icons/css/themify-icons.css',
    '~/assets/vendors/typicons/typicons.css',
    '~/assets/vendors/simple-line-icons/css/simple-line-icons.css',
    '~/assets/vendors/css/vendor.bundle.base.css',
    // '~/assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css',
    '~/assets/js/select.dataTables.min.css',
    '~/assets/css/vertical-layout-light/style.css',
  ],
  js:[
    '~/assets/js/off-canvas.js',
    '~/assets/js/hoverable-collapse.js',
    '~/assets/js/settings.js',
    '~/assets/js/todolist.js',
    '~/assets/js/jquery.cookie.js',
    '~/assets/js/dashboard.js',
    '~/assets/js/Chart.roundedBarCharts.js',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // ...
    'tailwindcss',
  ],
  

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  }
}
