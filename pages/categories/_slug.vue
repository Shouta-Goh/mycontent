<template>
  <v-container>
    <breadcrumbs :add-items="addBreads" />
    <v-row>
      <v-col cols="12" md="9">
        <h1>{{ category.fields.name }}</h1>

        <div v-for="(post, i) in relatedPosts" :key="i">
          <nuxt-link :to="linkTo('blog', post)" class="link">
            <v-card outlined v-ripple height="150">
              <v-row no-gutters>
                <v-col cols="5">
                  <v-img
                    class="thumbnail"
                    :src="setEyeCatch(post).url"
                    :alt="setEyeCatch(post).title"
                    height="150"
                  ></v-img>
                </v-col>
                <v-col cols="7">
                  <v-card-title class="card-titles">{{ post.fields.title }}</v-card-title>
                  <v-card-subtitle>
                    <time>
                      {{ ( new Date(post.fields.publishDate)).toDateString() }}
                      <span
                        :is="draftChip(post)"
                      />
                    </time>
                  </v-card-subtitle>
                    <template v-if="post.fields.tags">
                      <v-chip
                        v-for="(tag) in post.fields.tags"
                        :key="tag.sys.id"
                        color="primary"
                        dark
                        small
                        label
                        outlined
                        class="ma-1 font-weight-bold"
                      >{{ tag.fields.name }}</v-chip>
                    </template>
                </v-col>
              </v-row>
            </v-card>
          </nuxt-link>
          <br />
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <CategoryList></CategoryList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CategoryList from "~/components/category-list";

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
    CategoryList
  }
};
</script>

<style>
.card-titles {
  font-size: 1.0em;
  line-height: 1.1em;
}
.link {
  text-decoration: none;
}
</style>