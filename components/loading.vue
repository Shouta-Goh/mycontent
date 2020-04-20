<template lang="html">
  <div class="loading-page" v-if="loading">
    <v-container>
        <v-row>
            <v-col>
    <v-progress-circular
      :size="100"
      color="#3F51B5"
      indeterminate
    ></v-progress-circular>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}

.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255, 1);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 2;
}
</style>