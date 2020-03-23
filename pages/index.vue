<template>
  <div>
    <!-- render data of the person -->
    <h1>{{ person.fields.name }}</h1>
    <!-- render blog posts -->
    <v-btn text small>Normal</v-btn>
    <!--
    <ul>
      <li v-for="(post,key) in posts" :key="key">
        {{ post.fields.title }}
        {{ post.fields.description }}
      </li>
    </ul>
    -->
    <ul>
      <li v-for="(post,key) in posts" :key="key">
    <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>Top 10 Australian beaches</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{ post.fields.title }}</v-card-subtitle>

    <v-card-text class="text--primary">
      {{ post.fields.description }}
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Share
      </v-btn>
    </v-card-actions>
  </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";

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
  }
};
</script>
