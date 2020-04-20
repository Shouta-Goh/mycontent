<template>
  <v-container>
    <breadcrumbs :add-items="addBreads" />
    <v-row justify="center">
      <v-col cols="12" sm="9">
        <header class="article header">
          <v-row>
            <v-col>
              <v-img
                :src="setEyeCatch(post).url"
                :alt="setEyeCatch(post).title"
                :aspect-ratio="16/9"
              ></v-img>
            </v-col>
          </v-row>
        </header>

        <section class="body-container">
          <main class="wrapper">
            <div class="headline">
              <time class="tiny">{{ ( new Date(post.fields.publishDate)).toDateString() }}</time>
              <h1>{{ post.fields.title }}</h1>
            </div>

            <div class="copy">
              <div v-html="$md.render(post.fields.body)"></div>
            </div>
          </main>
        </section>
      </v-col>
      <v-col cols="12" sm="3">
        <CategoryList></CategoryList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CategoryList from "~/components/category-list.vue";
import { mapGetters } from "vuex";

export default {
  async asyncData({ payload, store, params, error }) {
    const post =
      payload ||
      (await store.state.posts.find(post => post.fields.slug === params.slug));

    if (post) {
      return { 
        post,
        category: post.fields.category
        }
    } else {
      return error({ statusCode: 400 });
    }
  },
  components: {
    CategoryList
  },
  computed: {
    ...mapGetters(["setEyeCatch", 'linkTo']),
    addBreads() {
      return [
        {
          icon: 'mdi-folder-outline',
          text: this.category.fields.name,
          to: this.linkTo('categories', this.category)
        }
      ]
    }
  }
};
</script>

<style>
.table-of-contents {
        background: #f3f3f3;
        border: 1px solid #ccc;
        padding: 5px 10px;
        width: fit-content;
}

.foreground .page-bar {
  border-bottom: 0;
}

.headline {
  padding: 0.2em 0 0;
}

.headline .tiny {
  font-size: 0.5em;
}

.headline h1 {
  font-size: 2em;
  line-height: 1.1em;
}

.copy {
  padding-bottom: 7em;
}

.copy *:not(div) {
  margin: 2em 0 1em;
}

.copy h3 {
  font-size: 1.35em;
}

.copy ul {
  margin: 0;
  padding-left: 1em;
  list-style: disc;
}

.copy li {
  margin: 0;
}
</style>
