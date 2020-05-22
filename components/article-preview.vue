<template>
  <article>
    <v-hover v-slot:default="{ hover }">
      <nuxt-link :to="linkTo('blog', post)" class="link">
        <v-card width="300" height="400" v-ripple :elevation="hover ? 12 : 2" :loading="loading">
          <v-img :src="setEyeCatch(post).url" :alt="setEyeCatch(post).title" :aspect-ratio="4/1">
            <v-card-text>
              <v-chip
                small
                dark
                :color="categoryColor(post.fields.category)"
                :to="linkTo('categories', post.fields.category)"
                class="font-weight-bold"
              >{{ post.fields.category.fields.name }}</v-chip>
            </v-card-text>
          </v-img>
          <v-card-title class="title text--primary">{{ post.fields.title }}</v-card-title>
          <v-card-subtitle>
            <time>
              {{ ( new Date(post.fields.publishDate)).toDateString() }}
              <span :is="draftChip(post)" />
            </time>
          </v-card-subtitle>
          <v-card-text class="text--primary">{{ post.fields.description }}</v-card-text>
        </v-card>
      </nuxt-link>
    </v-hover>
  </article>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import draftChip from "~/components/posts/draftChip";

export default {
  data: () => ({
    loading: false
  }),
  created() {
    this.$nextTick(() => {
      this.loading = true;
      setTimeout(() => (this.loading = false), 1000);
    });
  },
  computed: {
    ...mapState(["posts"]),
    ...mapGetters(["setEyeCatch", "draftChip", "linkTo"]),
    categoryColor() {
      return category => {
        switch (category.fields.name) {
          case "Programming":
            return "indigo";
          case "Marketing":
            return "green";
          case "Mind":
            return "orange darken-3";
          default:
            return "grey";
        }
      };
    }
  },
  components: {
    draftChip
  },
  props: ["post"]
};
</script>

<style scoped>
.link {
  text-decoration: none;
}

.title {
  font-size: 22px;
  color: #373f49;
}
</style>
