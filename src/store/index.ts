import Vue from 'vue'
import Vuex from 'vuex'
// import auth from './auth'
import firebase from 'firebase/app';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentStory: {},
    status: '',
    role: localStorage.getItem('role') || '',
    user: {title: '', description: '', role: ''}
  },
  mutations: {
    // eslint-disable-next-line
    auth_request(state){
      state.status = 'loading'
    },
    // eslint-disable-next-line
    auth_success(state, user) {
      state.status = 'success'
      state.user = user
    },
    // eslint-disable-next-line
    auth_error(state){
      state.status = 'error'
    },
    logout(state) {
      state.status = '',
      state.user = {title: '', description: '', role: ''},
      state.role = ''
      // console.log('logout complete: ', state.user)
    },
    // eslint-disable-next-line
    edit_story(state, story){
      state.currentStory = story
    }
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve) => {
        commit('auth_request');
        firebase.database().ref('/users')
        .orderByChild('login')
        .equalTo(user.email)
        .on('child_added', (snapshot) => {
          const user = snapshot.val()
          localStorage.setItem('role', user.role)
          // commit('auth_success', user)
          this.state.role = user.role
          resolve(user)

        })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('role')
        resolve()
      })
    },
    // getStories(){
    //   firebase.database().ref('posts').once('value').then((snapshot) => {
    //     const stories = snapshot.val()
    //   })
    // },
    editStory({commit}, story){
      commit('edit_story', story)
    }
  },
  modules: {
    // auth
  },
  getters: {
    authStatus: state => state.status,
    authRole: state => state.role,
    getCurrentStory: state => state.currentStory,
    // isLoggedIn: state => !!state.user
  }
})
