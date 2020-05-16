<template>
  <v-container class="grey lighten-5">
    <breadcrumbs :add-items="addBreads" />
    <v-row justify="center">
      <v-col cols="12" md="9">
        <header class="article header">
          <v-row>
            <v-col>
              <v-img
                :src="setEyeCatch(purposePosts[0]).url"
                :alt="setEyeCatch(purposePosts[0]).title"
                :aspect-ratio="16/9"
              ></v-img>
            </v-col>
          </v-row>
        </header>

        <section class="body-container">
          <main class="wrapper">
            <div class="headline">
              <time class="tiny">{{ ( new Date(purposePosts[0].fields.publishDate)).toDateString() }}</time>
              <h1>{{ purposePosts[0].fields.title }}</h1>
            </div>

            <div class="copy">
              <div v-html="$md.render(purposePosts[0].fields.body)"></div>
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
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    CategoryList
  },
  computed: {
    ...mapGetters(["setEyeCatch", 'linkTo',"purposePosts"]),
    addBreads() {
      return [
        {
          icon: "mdi-tag-outline",
          text: "なぜブログ作成したのか？",
          to: "/purpose",
          disabled: true,
          iconColor: "grey"
        }
      ];
    },
    purposePosts() {
      return this.$store.getters.purposePosts();
    },
  },
  components: {
    CategoryList
  }
};
</script>

<style>
strong {
  text-decoration: underline red;
  color: black;
}

em {
  text-decoration: underline blue;
  color: gray;
}

box {
  background: yellow;
}

h1 {
  font-size: 1.5rem;
}

p {
  font-size: 1.0rem;
}

.table-of-contents {
  background: #f3f3f3;
  border: 1px solid #ccc;
  padding: 5px 10px;
  width: fit-content;
}

.headline {
  padding: 2em 0 0;
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
  font-size:1.4rem;
}

.copy p {
  font-size: 1.4rem;
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
