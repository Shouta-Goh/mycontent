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
                <v-card-title>Shou</v-card-title>
                <v-card-text>
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
            <v-btn class="ma-2" tile color="success" href="https://lin.ee/xbOIFl8">
              <v-icon left>mdi-pencil</v-icon>LINE 公式アカウントへ
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
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    CategoryList
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
  },
  components: {
    CategoryList
  }
};
</script>

<style lang="scss">
strong {
  color: #ff0011;
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
  color: #1971ff;
}

.table-of-contents {
  background: #f3f3f3;
  border: 1px solid #ccc;
  padding: 5px 10px;
  width: fit-content;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 250px;
    li {
      list-style: none;
    }
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
  margin: 2em 0 1em;
}

.copies {
  h3 {
    font-size: 1.35em;
  }
  p {
    font-size: 1em;
  }
  img {
    width: 100%;
    max-width: 600px;
    max-height: 400px;
  }
  ul {
    margin: 0;
    padding-left: 1em;
    li {
      margin: 0;
      font-size: 1em;
      list-style: none;
    }
  }
}

.area {
  position: relative;
}

.thumnail {
  position: absolute;
}

.intro {
  position: absolute;
  top: 50%;
  left: 40%;
  background: rgb(191, 214, 223);
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
}
</style>
