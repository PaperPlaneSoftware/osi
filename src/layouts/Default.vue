<template>
  <div class="app">
    <!-- header -->
    <b-navbar class="px-5">
      <b-navbar-brand to="/">
        <!-- <g-link to="/"> -->
        <logo class="logo" />
        <span class="title ml-3">Open Science Initiative</span>
        <!-- </g-link> -->
      </b-navbar-brand>
      <b-navbar-nav class="d-flex align-items-center ml-auto">
        <b-nav-item to="/what">What is OSI?</b-nav-item>
        <b-nav-item-dropdown text="Write" right>
          <b-nav-item to="/post/new">Notebook Entry</b-nav-item>
          <b-nav-item to="/post/new">Journal Paper</b-nav-item>
        </b-nav-item-dropdown>
        <b-nav-item to="signin">Sign In</b-nav-item>
        <b-nav-item>
          <b-button class="get-started">Get Started</b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <!-- body -->
    <slot />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Vue from "vue";
import Logo from "~/assets/svgs/logo.svg";

export default Vue.extend({
  components: {
    Logo,
  },
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/custom.scss";

.navbar {
  background-color: $primary;
  border-bottom: 1px solid $black;

  .logo {
    width: 2.4em;
    height: 2.4em;
  }

  // .title {
  // }

  // .get-started {
  //   background-color: $black;
  //   color: $white;
  //   border-color: $black;
  // }
}
</style>
