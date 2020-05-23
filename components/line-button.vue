<template>
  <div>
    <v-icon large color="dark">mdi-arrow-down-bold</v-icon>
    <v-icon large color="dark">mdi-arrow-down-bold</v-icon>
    <br />
    <v-btn class="shiny pb-4" large rounded color="success" href="https://lin.ee/xbOIFl8">
      <v-icon class="ma-auto">mdi-message-outline</v-icon>LINE公式アカウント
    </v-btn>
  </div>
</template>

<style scoped>
.shiny {
  padding: 10px 20px;
  margin: 30px auto;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
}
.shiny::before {
  top: -100px;
  left: 0;
  width: 30px;
  height: 100%;
  animation: shiny 3s ease-in-out infinite;
}
@keyframes shiny {
  0% {
    -webkit-transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  80% {
    -webkit-transform: scale(0) rotate(45deg);
    opacity: 0.5;
  }
  81% {
    -webkit-transform: scale(4) rotate(45deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(50) rotate(45deg);
    opacity: 0;
  }
}
</style>