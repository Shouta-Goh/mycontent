<template>
  <v-card>
    <v-breadcrumbs :items="breadcrumbs">
      <template #item="props">
        <v-breadcrumbs-item :href="props.item.href">
          <v-icon v-if="props.item.icon" color="primary">{{ props.item.icon }}</v-icon>
          <span class="ml-1">{{ props.item.text }}</span>
        </v-breadcrumbs-item>
      </template>
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </v-card>
</template>

<script>
export default {
  props: {
    addItems: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data: () => ({
    items: [{ icon: "mdi-home", text: "ホーム", href: "/" }]
  }),
  computed: {
    breadcrumbs() {
      return this.items.concat(this.addItems);
    }
  }
};
</script>