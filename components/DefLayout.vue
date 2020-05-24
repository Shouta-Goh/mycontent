<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item href="/" :disabled="dialog" :loading="dialog" @click="dialog = true">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ホーム</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group prepend-icon="mdi-format-list-bulleted">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>カテゴリー</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(item, i) in tableItems" :key="i" :to="linkTo('categories', item)">
            <v-list-item-icon>
              <v-icon size="18">mdi-tag-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ item.fields.name }}</v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/person" nuxt :disabled="dialog" :loading="dialog" @click="dialog = true">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>プロフィール</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/purpose" nuxt :disabled="dialog" :loading="dialog" @click="dialog = true">
          <v-list-item-action>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ブログの目的</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/form" nuxt :disabled="dialog" :loading="dialog" @click="dialog = true">
          <v-list-item-action>
            <v-icon>mdi-email-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>お問い合わせ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-dialog v-model="dialog" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              Loading Now  . . .
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Shou's Programming Blog</v-toolbar-title>
    </v-app-bar>

    <!--ページ本体-->
    <v-content class="mb-4">
      <router-view />
      <transition name="fade">
        <div class="Page-Btn" v-show="scY > 300" @click="scrollTop">
          <v-icon class="up-icon" large>mdi-chevron-up</v-icon>
        </div>
      </transition>
    </v-content>

    <v-footer color="indigo">
      <span class="white--text">&copy; 2020 Shou</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: null,
    dialog: false,
    scTimer: 0,
    scY: 0
  }),
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 1000);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function() {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    scrollTop: function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  computed: {
    ...mapState(["categories"]),
    ...mapGetters(["linkTo"]),
    tableItems() {
      const categories = [];
      for (let i = 0; i < this.categories.length; i++) {
        const category = this.categories[i];
        if (category.fields.slug !== "introduction") categories.push(category);
      }
      return categories;
    }
  }
};
</script>

<style lang="scss" scoped>
.Page-Btn {
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 80px;
  height: 80px;
  line-height: 32px;
  text-align: center;
  border-radius: 50%;
  background: #5bc8ac;
}

@media screen and (max-width: 600px) {
  .Page-Btn {
    width: 50px;
    height: 50px;
  }
}

.Page-Btn-Icon {
  color: #fff;
  font-size: 16px;
}
.up-icon {
  width: 100%;
  height: 100%;
}
</style>