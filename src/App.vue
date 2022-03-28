<template>
  <div id="app">
    <navbar></navbar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
#app {
      background: url("./assets/image/bg.jpeg");
      background-size: 100% 100%;
      height: 100%;
      width: 100%;
      top: 0;
      bottom: 0;
      position: fixed;
      overflow-x: hidden;
      overflow-y: scroll;
      filter: alpha(opacity=80);
    }
    /*半透明样式*/
    nav,
    footer {
      opacity: 0.6 !important;
    }

    #weather-float-he {
      opacity: 0.5 !important;
    }

    div {
      opacity: 0.98 !important;
    }
</style>
