<template>
  <v-container class="grey lighten-5">
    <breadcrumbs :add-items="addBreads" />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <header class="article header">
          <v-row>
            <v-col>
              <v-img
                :src="setEyeCatch(post).url"
                :alt="setEyeCatch(post).title"
                :aspect-ratio="16/9"
                class="mx-sm-10"
                style="border-radius: 10px;"
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
              <LineButton></LineButton>
            </div>
          </main>
        </section>
      </v-col>
      <v-col cols="12" md="4">
        <CategoryList></CategoryList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CategoryList from "~/components/category-list.vue";
import LineButton from "~/components/line-button.vue";
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
    CategoryList,
    LineButton
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

<style lang="scss">
.table-of-contents {
  background: #f3f3f3;
  border: 1px solid #ccc;
  padding: 5px 10px;
  width: fit-content;
  a {
    font-size: 1.5rem;
  }
}

.foreground .page-bar {
  border-bottom: 0;
}

.headline {
  padding: 0.2em 0 0;
  .tiny {
    font-size: 0.5em;
    padding: 0.2em 0 0;
    color: gray;
  }
  h1 {
    position: relative;
    padding: 0 0 5px 0;
    border-bottom: #bfbfbf dotted 1px;
  }
  h1:first-letter {
    font-size: 42px;
    color: #6088c6;
  }
}

.copy *:not(div) {
  margin: 2em 0 1em;
}

.copy {
  padding-bottom: 7em;
  h2 {
    font-size: 1.35em;
    padding: 6px 10px;
    border-left: 8px solid #6088c6;
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
      font-size: 2.5rem;
    }
  }
  ol {
    li {
      padding: 6px 0;
      border-bottom: 4px solid #ccc;
      color: #333;
      line-height: 1.5;
      position: relative;
      font-size: 2.5rem;
    }
    li:before {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      width: 100px;
      height: 4px;
      background-color: #6088c6;
      z-index: 2;
    }
  }
  img {
    width: 70%;
    max-width: 70%;
    height: auto;
    margin: 0 30px;
    border-radius: 10px;
  }
}

.shiny {
  padding: 10px 20px;
  margin: 30px auto;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
}
.shiny::before {
  top: -180px;
  left: 0;
  width: 30px;
  height: 100%;
  animation: shiny 3s ease-in-out infinite;
}
@keyframes shiny {
  0% {
    -webkit-transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  80% {
    -webkit-transform: scale(0) rotate(45deg);
    opacity: 0.5;
  }
  81% {
    -webkit-transform: scale(4) rotate(45deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(50) rotate(45deg);
    opacity: 0;
  }
}

@media screen and (max-width: 600px) {
  .copy {
    h2 {
      font-size: 1.6rem;
    }
    p {
      font-size: 1.3rem;
    }
    img {
      margin: 0;
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>
