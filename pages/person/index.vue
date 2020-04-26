<template>
  <v-container>
    <breadcrumbs :add-items="addBreads" />
    <v-row justify="center">
      <v-col cols="12">
        <header class="article header">
          <v-row>
            <v-col>
              <v-img
                :src="setEyeCatch(personPosts[0]).url"
                :alt="setEyeCatch(personPosts[0]).title"
                :aspect-ratio="16/9"
              ></v-img>
            </v-col>
          </v-row>
        </header>

        <section class="body-container">
          <main class="wrapper">
            <div class="headline">
              <time class="tiny">{{ ( new Date(personPosts[0].fields.publishDate)).toDateString() }}</time>
              <h1>{{ personPosts[0].fields.title }}</h1>
            </div>

            <div class="copy">
              <div v-html="$md.render(personPosts[0].fields.body)"></div>
            </div>
          </main>
        </section>
      </v-col>
      <v-col cols="12">
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
    ...mapGetters(["setEyeCatch", 'linkTo',"personPosts"]),
    addBreads() {
      return [
        {
          icon: "mdi-tag-outline",
          text: "自己紹介",
          to: "/person",
          disabled: true,
          iconColor: "grey"
        }
      ];
    },
    personPosts() {
      return this.$store.getters.personPosts();
    },
  },
  components: {
    CategoryList
  }
};
</script>

<style>
strong {
  color: #FF0011;
  font-weight: bold;
}

em {
  text-decoration: underline blue;
  color: gray;
}

box {
  background: #fdff7d;
}

primary {
  color: #1971FF;
}

.table-of-contents {
  background: #f3f3f3;
  border: 1px solid #ccc;
  padding: 5px 10px;
  width: fit-content;
  margin:auto;
}

.headline {
  padding: 2em 0 0;
  text-align: center;
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
  text-align: center;
}

.copy *:not(div) {
  margin: 2em 0 1em;
}

.copy h3 {
  font-size: 1.35em;
}

.copy p {
  font-size: 1.0em;
}

.copy img {
  width:100%;
  max-width: 600px;
  max-height: 400px;
}

.copy ul {
  margin: 0;
  padding-left: 1em;
  list-style: disc;
}

.copy li {
  margin: 0;
  font-size: 1.0em;
}
</style>
