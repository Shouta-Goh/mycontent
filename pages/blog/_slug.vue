<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <header class="article header">
          <div class="foreground">
            <div class="page-bar wrapper">
              <a href="/" class="person-name">Back Home</a>
              <Navigation></Navigation>
            </div>
          </div>
          <v-row>
            <v-col>
              <v-img
                :src="setEyeCatch(post).url"
                :alt="setEyeCatch(post).title"
                :aspect-ratio="16/9"
                width="700"
                height="400"
                class="mx-auto"
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
            <v-card-text style="height: 64px;">
              <template v-if="post.fields.tags">
                <v-chip
                  v-for="(tag) in post.fields.tags"
                  :key="tag.sys.id"
                  to="#"
                  small
                  label
                  outlined
                  class="ma-1"
                >
                  <v-icon left size="18" color="grey">mdi-label</v-icon>
                  {{ tag.fields.name }}
                </v-chip>
              </template>
            </v-card-text>
            <div class="copy">
              <div v-html="$md.render(post.fields.body)"></div>
            </div>
          </main>
        </section>
      </v-col>
      <v-col cols="12" sm="3">
        <article-preview :post="post"></article-preview>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticlePreview from "~/components/article-preview.vue";
import { mapGetters } from 'vuex';

export default {
  async asyncData({ payload, store, params, error }) {
    const post = payload || await store.state.posts.find(post => post.fields.slug === params.slug)

    if (post) {
      return { post }
    } else {
      return error({ statusCode: 400 })
    }
  },
  components: {
    ArticlePreview
  },
  computed: {
    ...mapGetters(['setEyeCatch'])
  },
};
</script>

<style>
.foreground .page-bar {
  border-bottom: 0;
}

.headline {
  padding: 2em 0 0;
}

.headline .tiny {
  font-size: 0.5em;
}

.headline h1 {
  font-size: 2em;
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
