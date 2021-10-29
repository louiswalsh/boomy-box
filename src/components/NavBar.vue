<template>
  <div id="nav">
    <router-link to="/home">Home</router-link> |
    <router-link to="/generate">Generate</router-link> |

    <router-link to="/about">About</router-link>
  </div>
</template>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #d4d0f2;
}

#nav a.router-link-exact-active {
  color: #e53a58;
}
</style>
