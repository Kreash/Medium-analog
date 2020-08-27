<template>
  <div class="app-main-layout">
    <writer-navbar @click="isOpen = !isOpen" />


    <div class="columns">
      <div class="column"></div>
      <div class="column is-four-fifths">
        <main class="app-content">
          <div class="app-page">
            <router-view />
          </div>
        </main>
      </div>

      <div class="column"></div>
    </div>

    <div class="fixed-action-btn">
      <!-- <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>-->
    </div>
  </div>
</template>

<script lang="ts">
import WriterNavbar from "@/components/WriterNavbar.vue";
import Vue from "vue";

// import { Component, Prop } from 'vue-property-decorator';

export default Vue.extend({
  props: {},
  data: () => ({
    links: [
      { title: "Главное меню", url: "/" },
      { title: "Список риэлторов", url: "/realtors-list" },
      { title: "Новый риэлтор", url: "/realtor-create" },
    ],
  }),
  components: {
    WriterNavbar,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
