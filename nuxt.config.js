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
  loading: { color: '#C12B35' },
  /*
  ** Build configuration
  */
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/vue_google_maps',
    '~/plugins/vue_resource'
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    extractCSS: true,
    vendor: [
      'vuetify',
      'vue2-google-maps'
    ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
