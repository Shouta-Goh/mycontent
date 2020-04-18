<template>
  <article>
    <v-hover v-slot:default="{ hover }">
      <nuxt-link :to="linkTo('blog', post)" class="link">
        <v-card width="430" height="500" :elevation="hover ? 12 : 2">
          <v-img
            class="thumbnail"
            :src="setEyeCatch(post).url"
            :alt="setEyeCatch(post).title"
            :aspect-ratio="16/9"
            max-height="250"
            max-width="500"
          >
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

          <v-card-title class="title">{{ post.fields.title }}</v-card-title>
          
          <v-card-text>
            {{ post.fields.description }}
            <span :is="draftChip(post)" />
          </v-card-text>
          
          <v-card-subtitle> 
            <time class="tiny date">{{ ( new Date(post.fields.publishDate)).toDateString() }}</time>
          </v-card-subtitle>
        </v-card>
      </nuxt-link>
    </v-hover>
  </article>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["posts"]),
    ...mapGetters(["setEyeCatch", "draftChip", "linkTo"]),
    categoryColor() {
      return category => {
        switch (category.fields.name) {
          case "Programming":
            return "#C73A31";
          case "Marketing":
            return "#236244";
          case "コラム":
            return "primary";
          default:
            return "grey darken-3";
        }
      };
    }
  },
  props: ["post"]
};
</script>

<style>
.thumbnail {
  margin-bottom: 1em;
}

.date {
}

.link {
  text-decoration: none;
}

.title {
  text-decoration: none;
  font-size: 22px;
  color: #373f49;
}

.tags {
  padding: 1em 0;
  margin-bottom: 2em;
}

.tag:link,
.tag:visited {
  color: #a0a0a0;
  text-decoration: none;
  display: inline-block;
  padding: 0.33333rem 0.5rem;
  line-height: 1;
  border-radius: 2px;
  border: 1px solid #a0a0a0;
  margin-right: 0.5em;
}

.tag:active,
.tag:hover,
.tag:focus {
  color: #606060;
  border-color: #606060;
}
</style>
