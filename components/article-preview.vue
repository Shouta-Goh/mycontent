<template>
  <article>
    <v-hover v-slot:default="{ hover }">
    <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.fields.slug }}">
      <v-card 
      height="420"
      max-width="400"
      :elevation="hover ? 12 : 2">
        <v-img
          class="thumbnail"
          :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
          :srcset="`${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w`"
          sizes="(min-width: 1024px) 400px, 100vw"
        ></v-img>

        <v-card-title>
          <nuxt-link
            :to="{ name: 'blog-slug', params: { slug: post.fields.slug }}"
            class="title"
          >{{ post.fields.title }}</nuxt-link>
        </v-card-title>
        <v-card-text>{{ post.fields.description }}</v-card-text>

        <!--タグのリンク--><!--
        <div class="tags">
          <nuxt-link
            v-for="tag in post.fields.tags"
            :key="tag"
            :to="{ name: 'tags-tag', params: { tag: tag }}"
            class="tag"
          >{{ tag }}</nuxt-link>
        </div>-->
        <v-card-text>
          <time class="tiny date">{{ ( new Date(post.fields.publishDate)).toDateString() }}</time>
        </v-card-text>
      </v-card>
    </nuxt-link>
    </v-hover>
  </article>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<style>
.thumbnail {
  margin-bottom: 1em;
}

.date {
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
