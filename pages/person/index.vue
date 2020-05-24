<template>
  <v-container class="grey lighten-5">
    <breadcrumbs :add-items="addBreads" />
    <v-row justify="center">
      <v-col cols="12" md="9">
        <header class="article header">
          <v-row>
            <v-col class="area" offset-sm="2">
              <v-avatar size="300">
                <v-img
                  :src="setEyeCatch(personPosts[0]).url"
                  :alt="setEyeCatch(personPosts[0]).title"
                  max-height="300"
                  class="thumnail"
                ></v-img>
              </v-avatar>
              <v-card class="intro">
                <v-card-title style="font-size:2.5rem;">Shou</v-card-title>
                <v-card-text class="text--primary" style="font-size:1.2rem;">
                  初めまして！ Shouといいます
                  <br />今は現役SEとして会社に勤めながら
                  <br />
                  <span style="color:red;">自分らしい人生</span>のために
                  <br />フリーランスを目指しています。
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </header>

        <section class="body-container">
          <main class="wrapper">
            <div class="headline">
              <time class="tiny">{{ ( new Date(personPosts[0].fields.publishDate)).toDateString() }}</time>
              <h1>{{ personPosts[0].fields.title }}</h1>
            </div>

            <div class="copies">
              <div v-html="$md.render(personPosts[0].fields.body)"></div>
            </div>
            <v-icon large color="dark">mdi-arrow-down-bold</v-icon>
            <v-icon large color="dark">mdi-arrow-down-bold</v-icon>
            <br />
            <v-btn class="shiny" large rounded color="success" href="https://lin.ee/xbOIFl8">
              <v-icon>mdi-message-outline</v-icon>LINE公式アカウント
            </v-btn>
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
import LineButton from "~/components/line-button.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    CategoryList,
    LineButton
  },
  computed: {
    ...mapGetters(["setEyeCatch", "linkTo", "personPosts"]),
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
    }
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
  background: linear-gradient(transparent 60%, #eb8686 60%);
  font-weight: bold;
}

em {
  color: rgb(31, 31, 243);
  font-weight: bold;
}

box {
  background: #fdff7d;
}

.table-of-contents {
  background: #f3f3f3;
  border: 1px solid #ccc;
  padding: 2px 10px;
  width: fit-content;
  a {
    font-size: 1.5rem;
  }
}

.headline {
  padding: 2em 0 0;
  .tiny {
    font-size: 0.5em;
  }
  h1 {
    font-size: 2em;
    line-height: 1.1em;
  }
}

.copies *:not(div) {
  margin: 1em 0 1em;
}

.copies {
  h2 {
    font-size: 3.3rem;
  }
  p {
    font-size: 2.5rem;
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

.area {
  position: relative;
}

.intro {
  position: absolute;
  top: 50%;
  left: 40%;
  opacity: 0.9;
  width: 50%;
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
  .copies {
    h2 {
      font-size: 1.7rem;
    }
    p {
      font-size: 1.5rem;
    }
    img {
      margin: 0;
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>
