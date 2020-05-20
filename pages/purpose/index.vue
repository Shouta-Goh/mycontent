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
              <time
                class="tiny"
              >{{ ( new Date(purposePosts[0].fields.publishDate)).toDateString() }}</time>
              <h1>{{ purposePosts[0].fields.title }}</h1>
            </div>

            <div class="copy">
              <div v-html="$md.render(purposePosts[0].fields.body)"></div>
              <v-icon large color="dark">mdi-arrow-down-bold</v-icon>
              <br>
              <v-btn class="shiny" large rounded color="success" href="https://lin.ee/xbOIFl8">
                <v-icon class="pb-5">mdi-message-outline</v-icon><span class="pb-4">LINE公式アカウント</span>
              </v-btn>
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
    ...mapGetters(["setEyeCatch", "linkTo", "purposePosts"]),
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
    }
  },
  components: {
    CategoryList
  }
};
</script>

<style lang="scss">
html {
  font-size: 62.5%;
}

body {
  font-size: 1.6em;
}

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
  font-size: 2.5em;
  line-height: 1.1em;
}

.copy {
  padding-bottom: 7em;
}

.copy *:not(div) {
  margin: 2em 0 1em;
}

.copy {
  h1 {
    font-size: 3.3rem;
  }
  p {
    font-size: 2.4rem;
  }

  img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
}

.copy ul {
  margin: 0;
  padding-left: 1em;
  list-style: disc;
}

.copy li {
  margin: 0;
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
  .area {
    position: static;
    text-align: center;
  }
  .intro {
    position: static;
    margin: auto;
    width: 100%;
    text-align: left;
  }
  .copy {
    h1 {
      font-size: 1.7rem;
    }
    p {
      font-size: 1.5rem;
    }
  }
}
</style>
