<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <section>
      <ValidationProvider rules="required" vid="password" name="Password" v-slot="{ errors }">
        <b-field horizontal label="Title" :type="{ 'is-danger': errors[0], }">
          <b-input name="Title" expanded v-model="title"></b-input>
        </b-field>
      </ValidationProvider>
      <hr />

      <ValidationProvider rules="required" vid="password" name="Password" v-slot="{ errors }">
        <b-field horizontal label="Tell your story" :type="{ 'is-danger': errors[0],  }">
          <b-input type="textarea" v-model="description"></b-input>
        </b-field>
      </ValidationProvider>
      <hr />

      <b-field horizontal>
        <!-- Label left empty for spacing -->
        <p class="control">
          <button class="button is-primary" @click="handleSubmit(submit)">Edit story</button>
        </p>
      </b-field>
    </section>
  </ValidationObserver>
</template>


<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import store from "@/store";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { extend } from "vee-validate";
import { currentConfig } from "vee-validate/dist/types/config";

extend("required", {
  ...required,
  message: "Поле не должно быть пустым",
});

export default Vue.extend({
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    submit() {
      this.editStory();
    },
    editStory() {
      const currentStory = store.getters.getCurrentStory;
      console.log(currentStory);
      currentStory.title = this.title;
      currentStory.description = this.description;
      currentStory.updateAt = Date.now();
      firebase.database().ref(`/posts/${currentStory.id}`).set(currentStory);
      this.$router.push("/writer");
    },
  },
  created() {
    const story = store.getters.getCurrentStory;
    this.title = story.title;
    this.description = story.description;
  },

  components: {
    ValidationObserver,
    ValidationProvider,
  },
});
</script>