<template>
  <div id="app">
    
    <component :is="layout">
     <router-view/>
    </component>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WriterLayout from '@/layouts/WriterLayout.vue';
import StartLayout from '@/layouts/StartLayout.vue';
import ReaderLayout from '@/layouts/ReaderLayout.vue';

export default Vue.extend({
  name: 'App',

  computed: {
    layout() {
      return (this.$route.meta.layout || 'start') + '-layout'
    }
  },
  components: {
    WriterLayout, StartLayout, ReaderLayout
  },

  data: () => ({
    //
  }),
});
</script>



<style lang="scss">

</style>
