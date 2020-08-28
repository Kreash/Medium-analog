<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
  <section>
    <button  class="button is-primary" 
      @click="isComponentModalActive = true">
      Sign in
    </button>

    <b-modal v-model="isComponentModalActive" has-modal-card :can-cancel="true">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
        </header>
        <section class="modal-card-body">
          
          <ValidationProvider
          rules="required|email"
          name="Email"
          v-slot="{ errors, valid }"
          >
          <b-field
          label="Email"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          >
            <b-input type="email" v-model="loginData.email" placeholder="Your email"></b-input>
          </b-field>
          </ValidationProvider>

          <ValidationProvider
          rules="required"
          vid="password"
          name="Password"
          v-slot="{ errors, valid }"
          >
          <b-field
          label="Password"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          >
            <b-input
              type="password"
              v-model="loginData.password"
              password-reveal
              placeholder="Your password"
            ></b-input>
          </b-field>
          </ValidationProvider>

        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button " @click="isComponentModalActive = false">Close</button>
          <button class="button is-primary is-success" @click="handleSubmit(submit)">Login</button>
        </footer>
      </div>
    </b-modal>
  </section>
  </ValidationObserver>
</template>

<script >
import Vue from "vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { extend } from 'vee-validate';

extend("required", {
  ...required,
  message: "Поле не должно быть пустым"
});

extend("email", {
  ...email,
  message: "Введите корректный Email"
});

export default Vue.extend({
  data() {
    return {
      loginData: {
        email: 'writer@mail.com',
        password: '123456'
      },
      isComponentModalActive: false,
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  methods: {
    submit(){
      this.login(this.loginData);
    },
    login(loginData){
      const formData = {
        email: loginData.email,
        password: loginData.password
      }
        this.$store.dispatch('login', formData).then((user) => {
          this.$router.push('/' + user.role)
        }).catch (err => {
          console.log(err)
        }) 
      this.isComponentModalActive = false;
    }
  }
});
</script>