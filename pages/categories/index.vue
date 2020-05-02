<template>
  <v-container class="grey lighten-5">
    <breadcrumbs :add-items="addBreads" />

    <v-list-item-group color="indigo" class="mt-5">
      <v-row no-gutters>
        <v-list-item v-for="(item, i) in categoryItems" :key="i" :to="linkTo('categories', item)">
          <v-col>
            <v-img
              :src="setCategoriesEyeCatch(item).url"
              :alt="setCategoriesEyeCatch(item).title"
              :aspect-ratio="16/9"
            ></v-img>
          </v-col>
          <v-col>{{ item.fields.definition }}</v-col>
        </v-list-item>
      </v-row>
    </v-list-item-group>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "カテゴリー",
        align: "left",
        value: "fields.name" //category.fields.name
      }
    ],
  }),
  computed: {
    ...mapState(["categories"]),
    ...mapGetters(["linkTo", "setCategoriesEyeCatch"]),
    addBreads() {
      return [
        {
          icon: "mdi-tag-outline",
          text: "カテゴリー一覧",
          to: "/categories",
          disabled: true,
          iconColor: "grey"
        }
      ];
    },
    categoryItems() {
      const categories = [];
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].fields.slug !== "introduction")
          categories.push(this.categories[i]);
      }
      return categories;
    }
  }
};
</script>