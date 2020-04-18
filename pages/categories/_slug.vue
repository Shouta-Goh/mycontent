<template>
  <div>
    <v-container>
      <breadcrumbs :add-items="addBreads" />
      <h1>{{ category.fields.name }}</h1>

      <div v-for="(post, i) in relatedPosts" :key="i">
        <v-img
          class="thumbnail"
          :src="setEyeCatch(post).url"
          :alt="setEyeCatch(post).title"
          :aspect-ratio="16/9"
          max-height="200"
          width="400"
        ></v-img>
        <nuxt-link :to="linkTo('blog',post)">{{ post.fields.title }}</nuxt-link>
        <div v-for="(tags, i) in post.fields.category.fields.tags" :key="i">{{ tags.fields.name }}</div>
        <br />ーーーーーーーーーーーー
      </div>
      <categoryList></categoryList>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import categoryList from "~/components/category-list";

export default {
  computed: {
    ...mapState(["categories"]),
    ...mapGetters(["setEyeCatch", "draftChip", "linkTo"]),
    addBreads() {
      return [
        {
          icon: "mdi-tag-outline",
          text: "カテゴリー一覧",
          to: "/categories",
          disabled: true,
          iconColor: "grey"
        }
      ];
    },
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category);
    },

    tableItems() {
      const categories = [];
      for (let i = 0; i < this.categories.length; i++) {
        const category = this.categories[i];
        categories.push(category);
      }
      return categories;
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
  },
  components: {
    categoryList
  }
};
</script>