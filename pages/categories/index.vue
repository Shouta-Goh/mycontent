<template>
  <v-container class="grey lighten-5">
    <breadcrumbs :add-items="addBreads" />
    <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item v-for="(item, i) in categoryItems" :key="i" fill-dot>
        <v-card :color="categoryColor(item)">
          <v-card-title class="title">{{item.fields.name}}</v-card-title>
          <v-card-text class="white text--primary pt-3">
            <div v-html="$md.render(item.fields.definition)"></div>
          </v-card-text>
          <v-card-actions class="white">
            <v-btn
              :color="categoryColor(item)"
              class="mx-0"
              outlined
              :to="linkTo('categories', item)"
            >Button</v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
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
    },
    categoryColor() {
      return category => {
        switch (category.fields.name) {
          case "Programming":
            return "indigo";
          case "Marketing":
            return "#236244";
          case "Mind":
            return "primary";
          default:
            return "grey darken-3";
        }
      };
    }
  },
};
</script>