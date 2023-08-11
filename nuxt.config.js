export default {
  router: {
    // middleware: ['auth'], // Apply the 'auth' middleware to protect routes
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
      },
      {
      rel: 'stylesheet',
      href: '//cdn.jsdelivr.net/npm/sweetalert2@10'
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
      },
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
    // '~/assets/js/select.dataTables.min.css',
    '~/assets/css/vertical-layout-light/style.css',
    '~/assets/login/vendor/bootstrap/css/bootstrap.min.css',
    '~/assets/login/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '~/assets/login/fonts/Linearicons-Free-v1.0.0/icon-font.min.css',
    '~/assets/login/vendor/animate/animate.css',
    '~/assets/login/vendor/css-hamburgers/hamburgers.min.css',
    '~/assets/login/vendor/animsition/css/animsition.min.css',
    '~/assets/login/vendor/select2/select2.min.css',
    '~/assets/login/vendor/daterangepicker/daterangepicker.css',
    '~/assets/login/css/util.css',
    '~/assets/login/css/main.css',
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
    // '@nuxtjs/auth'
  ],
  axios: {
    baseURL: 'http://localhost:8000',
    // credentials: true
  },
    

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // 'nuxt-sanctum-auth'
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
  },

  // nuxtSanctumAuth: {
  //   token: true, // set true to use jwt-token auth instead of cookie. default is false
  //   baseUrl: 'http://localhost:3000',
  //   endpoints: {
  //     csrf: '/sanctum/csrf-cookie',
  //     login: '/login',
  //     logout: '/logout',
  //     user: '/profile'
  //   },
  //   csrf: {
  //     headerKey: 'X-XSRF-TOKEN',
  //     cookieKey: 'XSRF-TOKEN',
  //     tokenCookieKey: 'nuxt-sanctum-auth-token'
  //   },
  //   redirects: {
  //     home: '/dashboard',
  //     login: '/login',
  //     logout: '/'
  //   }
  // }

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'http://localhost:8000', // Ganti dengan URL server Laravel Anda
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
        },
        tokenRequired: true,
        tokenType: 'Bearer '
      },
    },
  },

  // auth: {
  //   strategies: {
  //     laravelSanctum: {
  //       provider: 'laravel/sanctum',
  //       url: 'http://localhost:8000',
  //       endpoints:{
  //         login:{
  //           url:'/login'
  //         }
  //       }
  //     },
  //   }
  // },
  // axios:{
  //   baseURL: 'http://localhost:8000',
  //   credentials:true,
  // }
}