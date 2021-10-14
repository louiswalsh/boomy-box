<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: {
     NavBar
   }
};
</script>

<style>
#app {
  font-family: "objektiv-mk2", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-image: url("./assets/pngs/starry_background_fixed.png");
  height: 100vh;
}
h2 {
  padding: 20px;
}
</style>
