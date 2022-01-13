<template>
  <div id="app">
    <div class="container">
      <img alt="Vue logo" src="./assets/logo.png" />
      <CarouselGallery msg="Welcome to Your Vue.js + TypeScript App" />
      <CarouselGallery2 msg="Welcome to Your Vue.js + TypeScript App" />
      <ImageTwo></ImageTwo>
      <VueCompareImage
        leftImage="https://picsum.photos/id/1050/1230/500"
        rightImage="https://picsum.photos/id/1000/1230/500"
      />;
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CarouselGallery from "./components/CarouselGallery.vue";
import CarouselGallery2 from "./components/CarouselGallery2.vue";
import ImageTwo from "src/components/ImageTwo.vue";
// eslint-disable-next-line
// moduleがtypescript対応してない場合
const VueCompareImage = require("vue-compare-image");

export default Vue.extend({
  name: "app",
  components: {
    CarouselGallery,
    CarouselGallery2,
    ImageTwo,
    VueCompareImage
  }
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
