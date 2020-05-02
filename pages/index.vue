<template>
  <div>
    <v-img v-bind:src="require('@/assets/images/summer.jpg')" width="100%" :aspect-ratio="6/1"></v-img>
    <v-container class="grey lighten-5">
      <v-row justify="center">
        <h1 class="main-title">新着記事</h1>
      </v-row>

      <ul>
        <v-row justify="center">
          <li v-for="(post,key) in PostsData.slice(0,6)" :key="key">
            <v-col>
              <article-preview :post="post"></article-preview>
            </v-col>
          </li>
        </v-row>
        <v-row justify="center">
          <v-btn
            class="ma-2"
            x-large
            tile
            outlined
            color="success"
            to="/categories"
            nuxt
            :disabled="dialog"
            :loading="dialog"
            @click="dialog = true"
          >
            <v-icon left>mdi-pencil</v-icon>Go Page
          </v-btn>
          <v-dialog v-model="dialog" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Please stand by
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </ul>

      <v-divider class="divier"></v-divider>
      <v-row justify="center">
        <h1 class="main-title">自己紹介</h1>
      </v-row>
      <v-row justify="center">
        <div class="d-flex flex-column flex-md-row box" v-scroll="handleScroll">
          <v-avatar tile class="mx-auto mr-md-12" size="300">
            <v-img
              class="mb-12"
              :src="setPersonEyeCatch(person[0]).url"
              :alt="setPersonEyeCatch(person[0]).title"
              max-height="400"
              width="400"
            ></v-img>
          </v-avatar>
          <article class="text-center text-md-left">
            <h2>{{ person[0].fields.title }}</h2>
            <div v-html="$md.render(person[0].fields.shortBio)"></div>
            <v-btn class="ma-2" tile outlined color="success" to="/person" nuxt>
              <v-icon left>mdi-pencil</v-icon>Go Page
            </v-btn>
          </article>
        </div>
      </v-row>

      <v-divider class="divier"></v-divider>
      <v-row justify="center">
        <h1 class="main-title">なぜブログを作ったのか？</h1>
      </v-row>
      <v-row justify="center">
        <div class="d-flex flex-column flex-md-row box" v-scroll="handleScroll">
          <v-avatar tile class="mx-auto mr-md-12" size="300">
            <v-img
              class="thumbnail mb-12"
              v-bind:src="require('@/assets/images/pc.jpg')"
              max-height="400"
              width="400"
            ></v-img>
          </v-avatar>
          <article class="text-center text-md-left">
            <h2>
              自分と同じ悩みを抱えた人へ、
              <br />人生を変えるキッカケを
            </h2>
            <v-btn class="ma-2" tile outlined color="success" to="/purpose" nuxt>
              <v-icon left>mdi-pencil</v-icon>Go Page
            </v-btn>
          </article>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArticlePreview from "~/components/article-preview.vue";
import categoryList from "~/components/category-list";
import { mapState, mapGetters } from "vuex";

export default {
  data () {
      return {
        dialog: false,
      }
    },

    watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 4000)
      },
    },
  components: {
    ArticlePreview,
    categoryList
  },
  computed: {
    ...mapState(["posts", "person"]),
    ...mapGetters(["setPersonEyeCatch"]),
    PostsData() {
      const posts = [];
      for (let i = 0; i < this.posts.length; i++) {
        if (
          this.posts[i].fields.slug !== "profile" &&
          this.posts[i].fields.slug !== "purpose"
        ) {
          posts.push(this.posts[i]);
        }
      }
      return posts;
    }
  },
  methods: {
    handleScroll: function(evt, el) {
      console.log(window.scrollY);
      if (window.scrollY > 50) {
        el.setAttribute(
          "style",
          "opacity: 1; transform: translate3d(-50px, 0, 0)"
        );
      }
      return window.scrollY > 100;
    }
  }
};
</script>

<style lang="scss">
.main-title {
  text-decoration: underline blue;
  font-size: 36px;
  color: #373f49;
  margin-bottom: 30px;
}

ul {
  list-style: none;
  padding-left: 0;
}

.divier {
  margin-top: 50px;
  margin-bottom: 50px;
}

.box {
  opacity: 0;
  transition: 1.5s all cubic-bezier(0.77, 0.2, 0.05, 1);
}
</style>