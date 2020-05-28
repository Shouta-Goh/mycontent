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
    title: "Prog-LifeHack",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "あなたのプログラミングを助ける、少しのキッカケ" }
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
    name: 'Prog-LifeHack',
    lang: 'ja',
    short_name: 'Prog-LifeHack',
    title: 'Prog-LifeHack',
    'og:title': 'Prog-LifeHack',
    description: 'あなたのプログラミングを助ける、少しのキッカケ',
    'og:description': 'あなたのプログラミングを助ける、少しのキッカケ',
    background_color: '#3F51B5',
    display: 'standalone',
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
