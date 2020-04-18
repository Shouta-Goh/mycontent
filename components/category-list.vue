<template>
  <div>
    <v-card>
      <v-card-title>カテゴリー一覧</v-card-title>
      <v-list flat>
        <v-list-item-group color="indigo">
          <v-list-item v-for="(item, i) in tableItems" :key="i" :to="linkTo('categories', item)">
            <v-list-item-icon>
              <v-icon size="18">mdi-tag-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>{{ item.fields.name }}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["categories"]),
    ...mapGetters(["linkTo"]),
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