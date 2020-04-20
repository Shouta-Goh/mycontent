<template>
  <div>
    <breadcrumbs :add-items="addBreads" />

    <v-container>
      <ul style="list-style: none;">
        <v-row justify="center">
          <li v-for="(category,key) in categories" :key="key">
            <v-col>
              <v-card
                width="350"
                height="100%"
                v-ripple
                :elevation="hover ? 12 : 2"
              >{{ category.fields.name }}</v-card>
            </v-col>
          </li>
        </v-row>
      </ul>
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
    }
  }
};
</script>
