
<script lang="ts">
import firebase from 'firebase/app';
import Vue from "vue";
export default Vue.extend({
  methods: {
    getStories() {
      firebase.database()
        .ref("posts")
        .once("value")
        .then((snapshot) => {
          const stories = snapshot.val();
        });
    },
  },
});
</script>
