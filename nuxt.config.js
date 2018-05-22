module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Goint',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Goint Dashboard' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons', rel: 'stylesheet' }
    ]
  },

  css: ['@/assets/styles/main_style.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#E84C55' },
  /*
  ** Build configuration
  */
  plugins: [
    '~/plugins/vue_google_maps',
    '~/plugins/vue_resource',
    { src: '~/plugins/toastui', ssr: false }
    
    // '~/plugins/vue_datetime'
    // '~/plugins/vue_image_lightbox'
    // '~/plugins/vue_fraction_grid',
  ],

  // Add apollo module
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/vuetify',
    '@nuxtjs/auth',
    '@nuxtjs/axios'

  ],
  axios: {
    credentials: false
  },
  auth: {
    user: {
      endpoint: 'http://13.90.253.208:9300/api/v1/dashboard',
      propertyName: 'company',
      resetOnFail: true,
      enabled: true,
      method: 'GET',
      appendToken: false
    },
    login: {
      endpoint: 'http://13.90.253.208:9300/api/v1/login',
      propertyName: 'token'
    },
    logout: {
      endpoint: 'http://13.90.253.208:9300/api/v1/logout',
      method: 'GET',
      paramTokenName: 'token',
      appendToken: false
    },
    token: {
      enabled: true,
      type: 'Bearer',
      localStorage: true,
      name: 'token',
      cookie: true,
      cookieName: 'token'
    }
  },
  vuetify: {
    theme: {
      primary: '#E84C55',
      lazy: '#cbcbcb'
    }
  },
  // Give apollo module options
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },

  // router: {
  //   middleware: [
  //     'auth', // If user not logged in, redirect to '/login' or to URL defined in redirect property
  //     'no-auth'
  //   ]
  // },

  build: {
    /*
    ** Run ESLint on save
    */

    extractCSS: true,
    vendor: [
      '~/plugins/vue_google_maps'
    ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // config.resolve.extensions = ['*', '.js', '.vue']
        // config.resolve.extensions.push('*')
        // config.resolve.extensions.push('.js')
        // config.resolve.extensions.push('.vue')
      }
    }
  }
}
