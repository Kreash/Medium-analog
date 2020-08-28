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
        <p class="control">
          <button class="button is-primary" @click="handleSubmit(submit)">Publish story</button>
        </p>
      </b-field>

      <section>
        <b-modal v-model="isComponentModalActive" has-modal-card :can-cancel="true">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">История успешно создана</p>
            </header>
            <footer class="modal-card-foot">
              <button
                class="button is-primary"
                type="button"
                @click="isComponentModalActive = false"
              >Accept</button>
            </footer>
          </div>
        </b-modal>
      </section>
    </section>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "Поле не должно быть пустым",
});

interface Story {
  claps: number;
  createdAt: string;
  description: string;
  id: number;
  title: string;
  updateAt: string;
  userId: number;
}

export default Vue.extend({
  props: {},
  data: () => ({
    isComponentModalActive: false,
    valid: true,
    title: "",
    description: "",
    returnId: 999,
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  methods: {
    submit() {
      this.createStory();
    },
    createStory() {
      if (this.valid) {
        firebase
          .database()
          .ref(`posts`)
          .once("value")
          .then((snapshot) => {
            const stories = snapshot.val();
            if (stories !== null) {
              const idArr = stories.map((story: Story) => {
                return story.id;
              });
              let previousKey = -1;
              for (const key in idArr) {
                if (previousKey + 1 !== +key) {
                  this.returnId = previousKey + 1;
                  break;
                }
                previousKey = +key;
                this.returnId = +key + 1;
              }
              this.cr();
            } else {
              this.returnId = 0;
              this.cr();
            }
          });
      }
    },
    cr() {
      firebase.database().ref(`/posts/${this.returnId}`).set({
        claps: 0,
        createdAt: Date.now(),
        description: this.description,
        id: this.returnId,
        title: this.title,
        updateAt: Date.now(),
        userId: 1,
      });
      this.isComponentModalActive = true;
      this.resetForm();
    },
    resetForm() {
      (this.title = ""), (this.description = "");
    },
  },
});
</script>