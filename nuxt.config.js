const pkg = require('./package')
const bodyParser = require('body-parser')
require('dotenv').config()

module.exports = {
  mode: 'universal',
  target: 'server',

  /*
  ** Headers of the page
  */
  head: {
    title: 'u tube',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My cool Web Development Blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fa923f', height: '4px', duration: 5000 },
  loadingIndicator: {
    name: 'circle',
    color: '#fa923f'
  },

  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/api': {
      target: 'https://test-u-git-master.rebeccapeltz.vercel.app',
      pathRewrite: {
        '^/api' : '/'
        }
      }
  },
  axios: {
    baseURL: process.env.PROD_URL || 'http://localhost:3000' ,
    credentials: false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },
  env: {
    fbBaseUrl: process.env.FB_BASE_URL || 'https://test-u-242d7.firebaseio.com',
    fbAPIKey: process.env.FIREBASE_KEY || '',
    BASE_URL: process.env.PROD_URL || 'http://localhost:3000'
  },
  pageTransition: {
    name: 'fade',
    mode: 'out-in' 
  },
  // router: {
  //   middleware: 'log'
  // }
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ]
}
