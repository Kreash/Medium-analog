<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h1>Medium Analog</h1>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div>
          <h1>role: {{role}}</h1>
        </div>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div>
          <b-icon icon="magnify"></b-icon>
        </div>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div>
          <b-icon icon="bookmark-multiple-outline"></b-icon>
        </div>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div>
          <b-icon icon="bell-outline"></b-icon>
        </div>
      </b-navbar-item>
      <b-navbar-dropdown label="More">
        <b-navbar-item href="/new-story">New story</b-navbar-item>
        <b-navbar-item href="/writer">Stories</b-navbar-item>
        <b-navbar-item href="#">Profile</b-navbar-item>
        <b-navbar-item @click="logout()">Sign out</b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      role: this.$store.getters.authRole,
    };
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
});
</script>