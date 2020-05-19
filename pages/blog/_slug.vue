<template>
  <v-container class="grey lighten-5">
    <breadcrumbs :add-items="addBreads" />
    <v-row justify="center">
      <v-col cols="12" md="9">
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
      <v-col cols="12" md="3">
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
      };
    } else {
      return error({ statusCode: 400 });
    }
  },
  components: {
    CategoryList
  },
  computed: {
    ...mapGetters(["setEyeCatch", "linkTo"]),
    addBreads() {
      return [
        {
          icon: "mdi-folder-outline",
          text: this.category.fields.name,
          to: this.linkTo("categories", this.category)
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
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
  .tiny {
    font-size: 0.5em;
  }
  h1 {
    font-size: 2em;
    line-height: 1.1em;
  }
}

.copy *:not(div) {
  margin: 2em 0 1em;
}

.copy {
  padding-bottom: 7em;
  h1 {
    font-size: 1.35em;
    padding: 6px 10px;
    border-left: 8px solid #29b6b7;
    color: #333;
    line-height: 1.5;
    background-color: #f5f5f5;
  }
  ul {
    margin: 0;
    padding-left: 1em;
    list-style: disc;
    li {
      margin: 0;
    }
  }
  ol {
    li {
      padding: 6px 0;
      border-bottom: 4px solid #ccc;
      color: #333;
      line-height: 1.5;
      position: relative;
    }
    li:before {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      width: 100px;
      height: 4px;
      background-color: #3498db;
      z-index: 2;
    }
  }
}
</style>
