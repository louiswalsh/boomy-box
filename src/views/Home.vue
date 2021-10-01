<template>
  <div class="home">
    <h1>Spotify Authorization example</h1>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
h1 {
  text-decoration: underline;
}
</style>
