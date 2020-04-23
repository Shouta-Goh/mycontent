import { createClient } from "~/plugins/contentful.js";
import defaultEyeCatch from '~/assets/images/defaultEyeCatch.png'

const client = createClient();

export const state = () => ({
  posts: [],
  categories: [],
  person: []
})

export const getters = {
  setEyeCatch: () => (post) => {
    if (!!post.fields.heroImage && !!post.fields.heroImage.fields) return { url: `https:${post.fields.heroImage.fields.file.url}`, title: post.fields.heroImage.fields.title }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  setPersonEyeCatch: () => (person) => {
    if (!!person.fields.image && !!person.fields.image.fields) return { url: `https:${person.fields.image.fields.file.url}`, title: person.fields.image.fields.title }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  setCategoriesEyeCatch: () => (categories) => {
    if (!!categories.fields.image && !!categories.fields.image.fields) return { url: `https:${categories.fields.image.fields.file.url}`, title: categories.fields.image.fields.title }
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
  },
  personPosts: state => () => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].fields.slug === 'profile') posts.push(state.posts[i])
    }
    return posts
  },
  purposePosts: state => () => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].fields.slug === 'purpose') posts.push(state.posts[i])
    }
    return posts
  },
}

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setLinks(state, entries) {
    state.categories = []
    state.person = []
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry.sys.contentType.sys.id === 'category') state.categories.push(entry)
      if (entry.sys.contentType.sys.id === 'person') state.person.push(entry)      
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
      include: 1
    }).then((res) => {
      commit('setLinks', res.includes.Entry)
      commit('setPosts', res.items)
    }).catch(console.error)
  },
}