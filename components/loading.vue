<template lang="html">
  <div class="loading-page" v-if="loading">
      <div class="text-center">
<v-container style="height: 400px;">
      <v-row
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="subtitle-1 text-center"
          cols="12"
        >
          Getting your file
    <v-progress-linear
      v-model="power"
      color="amber"
      height="25"
      reactive
    ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
      skill: 20,
      knowledge: 33,
      power: 78,
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
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255, 1.0);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 2;
}
</style>