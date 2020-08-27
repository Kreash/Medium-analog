<template>
  <div>
    <div class="home">
      <b-icon icon="home"></b-icon>Home
    </div>
    <div v-for="story in stories" :key="story.id">
      <reader-story v-bind:story="story" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReaderStory from "@/components/ReaderStory.vue";
import firebase from 'firebase/app';

export default Vue.extend({
  data(){
    return {
      stories: [],
    }
  },
  components: {
    ReaderStory,
  },
  methods: {
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
          this.$data.stories = stories2;
        });
    },
  },
  created() {
    this.getDataFromDatabase();
  }
})
</script>
