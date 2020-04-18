<template>
  <div>
    <breadcrumbs :add-items="addBreads" />

    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-card-title>
            
            <v-data-table
              :headers="headers"
              :items="tableItems"
              :search="search"
            >
              <template v-slot:item.fields.name="{ item }">
                <v-icon size="18">mdi-tag-outline</v-icon>
                <nuxt-link :to="linkTo('categories', item)">{{ item.fields.name }}</nuxt-link>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
    ]
  }),
  computed: {
    ...mapState(["categories"]),
    ...mapGetters(["linkTo"]),
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
    tableItems() {
      const categories = [];
      for (let i = 0; i < this.categories.length; i++) {
        const category = this.categories[i];
        categories.push(category);
      }
      return categories;
    }
  }
};
</script>