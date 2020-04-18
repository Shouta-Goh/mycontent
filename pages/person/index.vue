<template>
  <v-container>
    <breadcrumbs :add-items="addBreads" />

    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <header class="article header">
            <v-row>
              <v-col>
                <v-img
                  class="thumbnail"
                  :src="setPersonEyeCatch(person[0]).url"
                  :alt="setPersonEyeCatch(person[0]).title"
                  :aspect-ratio="1/1"
                  max-height="300"
                  width="400"
                ></v-img>
              </v-col>
            </v-row>
          </header>

          <section class="body-container">
            <main class="wrapper">
              <div class="headline">
                <h1>{{ person[0].fields.title }}</h1>
              </div>

              <div class="copy">
                <div v-html="$md.render(person[0].fields.body)"></div>
              </div>
            </main>
          </section>
        </v-col>
        <v-col cols="12" sm="4">
          <CategoryList></CategoryList>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import CategoryList from "~/components/category-list.vue";
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["person"]),
    ...mapGetters(["setPersonEyeCatch"]),
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
    }
  },
  components: {
    CategoryList
  },
};
</script>

<style>

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
