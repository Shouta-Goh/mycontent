<template>
  <div>
    <!-- render data of the person -->
    <h1 class="text-center">{{ person.fields.name }}</h1>
    <!-- render blog posts -->
    
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
import { createClient } from "~/plugins/contentful.js";
import ArticlePreview from "~/components/article-preview.vue";

const client = createClient();

export default {
  // `env` is available in the context object
  asyncData({ env }) {
    return Promise.all([
      // fetch the owner of the blog
      client.getEntries({
        "sys.id": env.CTF_PERSON_ID
      }),
      // fetch all blog posts sorted by creation date
      client.getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: "-sys.createdAt"
      })
    ])
      .then(([entries, posts]) => {
        // return data that should be available
        // in the template
        return {
          person: entries.items[0],
          posts: posts.items
        };
      })
      .catch(console.error);
  },
  components: {
    ArticlePreview
  }
};
</script>