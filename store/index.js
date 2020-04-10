import { createClient } from "~/plugins/contentful.js";
import defaultEyeCatch from '~/assets/images/defaultEyeCatch.png'

const client = createClient();

export const state = () => ({
  posts: [],
  categories: []
})

export const getters = {
  setEyeCatch: () => (post) => {
    if (!!post.fields.heroImage && !!post.fields.heroImage.fields) return { url: `https:${post.fields.heroImage.fields.file.url}`, title: post.fields.heroImage.fields.title }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  draftChip: () => (post) => {
    if (!post.fields.publishDate) return 'draftChip'
  },
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },
  relatedPosts: state => (category) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id
      if (category.sys.id === catId) posts.push(state.posts[i])
    }
    return posts
  }
}

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },

  //setCategories(state, payload) {
  //  state.categories = payload
  //}
  setLinks(state, entries) {
    state.categories = []
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry.sys.contentType.sys.id === 'category') state.categories.push(entry)
    }
    state.categories.sort((a, b) => a.fields.sort - b.fields.sort)
  }
}

export const actions = {
  //posts
  async getPosts({ commit }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate',
      include: 1//追記
      /*
    }).then(res =>
      commit('setPosts', res.items)
    ).catch(console.error)
    */
   // 変更・追記
  }).then((res) => {
    commit('setLinks', res.includes.Entry)
    commit('setPosts', res.items)
  }).catch(console.error)
  },

  //catefories
  /*
  async getCategories({ commit }) {
    await client.getEntries({
      content_type: 'category',
      order: 'fields.sort'
    }).then(res =>
      commit('setCategories', res.items)
    ).catch(console.error)
  }
  */
}