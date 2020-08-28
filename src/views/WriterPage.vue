<template>
  <div>
    <div v-if="!isLoading">
      <b-table
        :data="stories"
        ref="table"
        paginated
        per-page="10"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column field="story" width="40" sortable numeric v-slot="props">
          <writer-story @updateData="updateData" v-bind:story="props.row" />
        </b-table-column>
      </b-table>
    </div>
    <div v-else>
      <h1>Загрузка данных...</h1>
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
      isLoading: true,
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
            console.log(story.createdAt);
          });
          this.$data.stories = stories2;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getDataFromDatabase();
  },
});
</script>
