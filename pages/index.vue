<template>
  <div>
      <v-container fluid>
        <ul style="list-style: none;">
          <v-row justify="center">
            <li v-for="(post,key) in posts" :key="key">
              <v-col>
                <article-preview :post="post"></article-preview>
              </v-col>
            </li>
          </v-row>
        </ul>
      </v-container>
  </div>
</template>

<script>
import ArticlePreview from "~/components/article-preview.vue";
import { mapState } from 'vuex'

export default {
  components: {
    ArticlePreview
  },
  computed: {
    ...mapState(['posts']),
  },
};
</script>