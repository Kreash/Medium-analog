<template>
  <div>
    <div class="home">
      <b-icon
      icon="home"
      >
      </b-icon>
      Home
    </div>
    <writer-story/>
    <reader-story/>
    
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WriterStory from '@/components/WriterStory.vue'
import ReaderStory from '@/components/ReaderStory.vue'

@Component({
  components: {
    WriterStory, ReaderStory
  },
})
export default class Home extends Vue {}
</script>
