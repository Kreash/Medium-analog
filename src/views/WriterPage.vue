<template>
  <div>
    <div class="home">
      <b-icon icon="home"></b-icon>Home
    </div>
    <div v-for="story in stories" :key="story.id">
      <writer-story @updateData="updateData" v-bind:story="story" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WriterStory from "@/components/WriterStory.vue";
import firebase from "firebase/app";

export default Vue.extend({
  components: {
    WriterStory,
  },
  data() {
    return {
      stories: [],
    };
  },
  methods: {
    updateData() {
      this.getDataFromDatabase();
    },
    getDataFromDatabase() {
      firebase
        .database()
        .ref("posts")
        .once("value")
        .then((snapshot) => {
          const stories = snapshot.val();
          const stories2 = [];
          for (const key in stories) {
            stories2.push(stories[key]);
          }
          stories2.forEach((story) => {
            console.log(story.createdAt)
          });
          this.$data.stories = stories2;
        });
    },
  },
  created() {
    this.getDataFromDatabase();
  },
});
</script>
