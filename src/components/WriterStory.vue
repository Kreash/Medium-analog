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
        <div class="card-footer-item">
          <p>Создано: {{story.createdAt | date}}</p>
        </div>
        <div class="card-footer-item">
          <b-icon icon="file-edit-outline"></b-icon>
          <a @click="editStory" class="card-footer-item">Изменить</a>
        </div>
        <div class="card-footer-item">
          <b-icon icon="trash-can"></b-icon>
          <a @click="deleteStory" class="card-footer-item">Удалить</a>
        </div>
      </footer>
    </div>
    <hr />
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
      const time = new Date(date).toISOString()
      return time.slice(0, 10) + ' ' + time.slice(11, 16);
    },
  },
  methods: {
    editStory() {
      this.$store
        .dispatch("editStory", this.story)
        .then(() => {
          this.$router.push("/edit-story");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteStory() {
      const storyId = this.story.id;
      firebase.database().ref(`/posts/${storyId}`).remove();
      this.$emit("updateData");
    },
  },
});
</script>