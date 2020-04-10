<template>
  <div>
    <breadcrumbs />
    <h1>{{ category.fields.name }}</h1>
    <div v-for="(post, i) in relatedPosts" :key="i">
      {{ post.fields.category.fields.name }},
      <nuxt-link :to="linkTo('blog',post)" >{{ post.fields.title }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(['linkTo']),
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category);
    }
  },
  async asyncData({ payload, store, params, error }) {
    const category =
      payload ||
      (await store.state.categories.find(
        cat => cat.fields.slug === params.slug
      ));

    if (category) {
      return { category };
    } else {
      return error({ statusCode: 400 });
    }
  }
};
</script>