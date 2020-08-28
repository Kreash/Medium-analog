<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{{story.title}}</p>
      </header>
      <div class="card-content">
        <div class="content">{{story.description}}</div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">Создано: {{story.createdAt | date}}</p>
        <div class="card-footer-item">
          <b-icon icon="hand-right"></b-icon>
          <a @click="clap" class="card-footer-item">Хлопки: {{story.claps}}</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
export default Vue.extend({
  props: {
    story: Object,
  },
  filters: {
    date: (date: number) => {
      const time = new Date(date).toISOString();
      return time.slice(0, 10) + " " + time.slice(11, 16);
    },
  },
  methods: {
    clap() {
      this.story.claps = this.story.claps + 1;
      firebase
        .database()
        .ref(`/posts/${this.story.id}/claps`)
        .set(this.story.claps);
    },
  },
});
</script>