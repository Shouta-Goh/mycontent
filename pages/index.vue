<template>
  <div>
    <v-img v-bind:src="require('@/assets/images/header.png')" width="100%" :aspect-ratio="4/1"></v-img>
    <v-container class="grey lighten-5">
      <v-row justify="center">
        <h1 class="main-title">新着記事</h1>
      </v-row>

      <ul>
        <v-row justify="center">
          <li v-for="(post,key) in PostsData.slice(0,6)" :key="key">
            <v-col>
              <v-lazy
                v-model="isActive"
                :options="{
                 threshold: .5
                }"
                min-height="200"
                transition="slide-x-transition"
              >
                <article-preview :post="post"></article-preview>
              </v-lazy>
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
            :disabled="false"
            :loading="false"
            @click="dialog = true"
          >
            <v-icon left>mdi-format-list-bulleted</v-icon>カテゴリー一覧へ
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
        <h1 class="main-title">プロフィール</h1>
      </v-row>
      <v-row>
        <v-col offset-sm="2" class="area">
          <v-avatar class="mx-auto avater" size="250">
            <v-img
              :src="setPersonEyeCatch(person[0]).url"
              :alt="setPersonEyeCatch(person[0]).title"
              height="250"
              width="250"
              id="first"
            ></v-img>
          </v-avatar>
          <v-card class="intro sa sa--down">
            <v-card-title class="intro-title">{{ person[0].fields.title }}</v-card-title>
            <v-card-text class="text--primary" style="padding-bottom:0;">
              <div v-html="$md.render(person[0].fields.shortBio)"></div>
              <v-icon large color="dark">mdi-arrow-down-bold</v-icon>
            </v-card-text>
            <v-card-actions class="d-block">
              <v-btn
                class="ma-2"
                tile
                outlined
                color="success"
                to="/person"
                nuxt
                :disabled="dialog"
                :loading="dialog"
                @click="dialog = true"
              >
                <v-icon left>mdi-account-circle</v-icon>プロフィールへ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="divier"></v-divider>
      <v-row justify="center">
        <h1 class="main-title">ブログを作った理由</h1>
      </v-row>
      <v-row>
        <v-col offset-sm="6" class="area">
          <v-avatar tile class="sa sa--down" size="350">
            <v-img
              :src="setEyeCatch(purposePosts[0]).url"
              :alt="setEyeCatch(purposePosts[0]).title"
              height="300"
              width="300"
            ></v-img>
          </v-avatar>
          <v-card class="intro2 sa sa--rl">
            <v-card-title class="intro-title">{{ purposePosts[0].fields.title }}</v-card-title>
            <v-card-text class="text--primary" style="padding-bottom:0;">
              <div v-html="$md.render(purposePosts[0].fields.description)"></div>
              <v-icon large color="dark">mdi-arrow-down-bold</v-icon>
            </v-card-text>
            <v-card-actions class="d-block">
              <v-btn
                class="ma-2"
                tile
                outlined
                color="success"
                to="/purpose"
                nuxt
                :disabled="dialog"
                :loading="dialog"
                @click="dialog = true"
              >
                <v-icon left>mdi-pencil</v-icon>ブログの目的へ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArticlePreview from "~/components/article-preview.vue";
import categoryList from "~/components/category-list";
import { mapState, mapGetters } from "vuex";

if (process.browser) {
  var scrollAnimationElm = document.querySelectorAll(".sa");
  var scrollAnimationFunc = function() {
    for (var i = 0; i < scrollAnimationElm.length; i++) {
      var triggerMargin = 200;
      if (
        window.innerHeight >
        scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin
      ) {
        scrollAnimationElm[i].classList.add("show");
      }
    }
  };
  window.addEventListener("load", scrollAnimationFunc);
  window.addEventListener("scroll", scrollAnimationFunc);
}

export default {
  data() {
    return {
      dialog: false,
      isActive: false,
      positionY: 0,
      positions: {
        first: 0,
        second: 0
      }
    };
  },
  watch: {
    //dailog監視
    dialog(val) {
      if (!val) return;
      setTimeout(() => (this.dialog = false), 4000);
    },
    //scrollY軸の範囲判定
    positionY(to, from) {
      const scrollOffset = to + 100;
      let el;
      //second要素のtopが50いかになったら
      if (this.positions.first <= scrollOffset) {
        el = document.getElementById("first");
        //animationクラスを付与
        el.setAttribute("class", "animation");
      }
      if (this.positions.second <= scrollOffset) {
        el = document.getElementById("second");
        //animationクラスを付与
        el.setAttribute("class", "animation");
      }
    }
  },
  //id="second"が付与された要素Y軸を、dataのsecondに代入
  mounted() {
    window.addEventListener("scroll", this.checkScroll);

    this.positions = {
      first: document.getElementById("first").getBoundingClientRect().top,
      second: document.getElementById("second").getBoundingClientRect().top
    };

    this.positionY++;
  },
  methods: {
    //Y軸を取得(this.positionY = window.scrollYのみでもOK)
    checkScroll() {
      this.positionY = window.scrollY ? window.scrollY : window.pageYOffset;
    }
  },
  components: {
    ArticlePreview,
    categoryList
  },
  computed: {
    ...mapState(["posts", "person"]),
    ...mapGetters(["setPersonEyeCatch", "setEyeCatch", "purposePosts"]),
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
    },
    purposePosts() {
      return this.$store.getters.purposePosts();
    }
  }
};
</script>

<style lang="scss" scoped>
.main-title {
  text-decoration: underline blue;
  font-size: 36px;
  color: #373f49;
  margin-bottom: 30px;
}

.intro-title {
  display:block;
  font-weight: bold;
  font-size: 24px;
}

ul {
  list-style: none;
  padding-left: 0;
}

.divier {
  margin-top: 50px;
  margin-bottom: 50px;
}

#first {
  opacity: 0;
  transition: all 1000ms;
  transform: translate(-100px, 0);
  &.animation {
    opacity: 1;
    transform: translate(0, 0);
  }
}

.area {
  position: relative;
  min-height: 450px;
  margin-bottom: 100px;
}

.intro {
  position: absolute;
  opacity: 0.9;
  width: 60%;
  top: 20%;
  left: 20%;
  bottom: 0%;
}

.intro2 {
  position: absolute;
  opacity: 0.9;
  width: 90%;
  top: 20%;
  left: -75%;
}

.sa {
  opacity: 0;
  transition: all 1000ms;
  &.show {
    opacity: 1;
    transform: translate(0, 0);
  }
}

.sa--rl {
  transform: translate(100px, 0);
}

.sa--down {
  transform: translate(0, -100px);
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
  }
  .intro2 {
    position: static;
    margin: auto;
    width: 100%;
  }

  .sa--rl {
    transform: translate(0, -100px);
  }
}
</style>