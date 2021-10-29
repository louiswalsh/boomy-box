<template>
  <div id="nav">
    <router-link to="/landing">Landing</router-link> |
    <router-link to="/generate">Generate</router-link> |

    <router-link to="/user">User</router-link>
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
