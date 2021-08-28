<template>
  <div id="app">
    <div v-if="(this.$store.state.isAuthenticated)">
      <div id="nav">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        |
        <span class="logout-btn" @click="logout">Logout</span>
      </div>
      <router-view/>
    </div>
    <div v-else>
      <Authpage />
    </div>
  </div>

</template>

<script>
import Authpage from "./components/Authpage";


export default {
  components: {Authpage},
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  beforeMount() {
     this.$store.dispatch('checkAuth')
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a, span {
  font-weight: bold;
  color: #2c3e50;
}
.logout-btn {
  cursor: pointer;
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
