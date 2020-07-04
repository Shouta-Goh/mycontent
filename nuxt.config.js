const {getConfigForKeys} = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
  'CTF_CMA_ACCESS_TOKEN',
  'CTF_PERSON_ID'
])
const {createClient} = require('./plugins/contentful')
const cdaClient = createClient(ctfConfig)
const cmaContentful = require('contentful-management')
const cmaClient = cmaContentful.createClient({
  accessToken: ctfConfig.CTF_CMA_ACCESS_TOKEN
})

const TITLE = 'Prog-LifeHack'
const DESC = 'プログラミングでの挫折を防げる、科学的に正しいライフハックを、すぐに試せるカタチで。'
const BASE_URL = 'https://prog-lifehack.com'
const OGIMG_URL = 'https://prog-lifehack.com/ogpimg.png'
const TWITTER_ID = '@shou_9648'

module.exports = {
  /*
   ** Headers of the page
   */
  /*
  env: {
    API_KEY
  },*/
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: ctfConfig.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID
  },
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    title: "Prog-LifeHack",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: DESC },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: BASE_URL },
      { hid: 'og:title', property: 'og:title', content: TITLE },
      { hid: 'og:site_name', property: 'og:site_name', content: TITLE },
      { hid: 'og:image', property: 'og:image', content: OGIMG_URL },
      //{ property: 'article:publisher', content: 'FacebookURL' },
      //{ property: 'fb:app_id', content: 'FacebookAppID' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: TWITTER_ID },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: false,
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  router: {
    middleware: [
      'getContentful'
    ]
  },
  
  vuetify: {
    /* module options */
  },

  plugins: [
    'plugins/components',
    'plugins/markdownit',
  ],
  
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    ['@nuxtjs/google-analytics',{
      id: 'UA-159302469-1'
    }]
  ],

  manifest: {
    name: TITLE,
    lang: 'ja',
    short_name: TITLE,
    title: TITLE,
    'og:title': TITLE,
    description: DESC,
    'og:description': DESC,
    background_color: '#3F51B5',
    theme_color: '#3F51B5',
    display: 'standalone',
  },
  
      // プッシュ通知
    oneSignal: {
      init: {
        appId: config.ONE_PUSH_APP_ID,
        allowLocalhostAsSecureOrigin: true,
        welcomeNotification: {
          disable: true
        }
      }
    },
  
  generate: {
    routes () {
      return Promise.all([
        // get all blog posts
        cdaClient.getEntries({
          'content_type': ctfConfig.CTF_BLOG_POST_TYPE_ID
        }),
        //get all categories
        cdaClient.getEntries({
          content_type: 'category'
        }),
        // get the blog post content type
        cmaClient.getSpace(ctfConfig.CTF_SPACE_ID)
          .then(space => space.getContentType(ctfConfig.CTF_BLOG_POST_TYPE_ID))
      ])
      .then(([entries,categories]) => {
        return [
          // map entries to URLs
          ...entries.items.map(entry =>{
            return { route :`/blog/${entry.fields.slug}`, payload: entry}
          }),
          //map categories to URLs
          ...categories.items.map((category) => {
            return { route: `categories/${category.fields.slug}`, payload: category }
          })
        ]
      })
    }
  },
};
