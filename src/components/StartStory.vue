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
          <p class="card-footer-item">Хлопки: {{story.claps}}</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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
});
</script>