import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentStory: {},
    status: '',
    role: localStorage.getItem('role') || '',
  },
  mutations: {
    login(state, role) {
      state.role = role
    },
    logout(state) {
      state.role = ''
    },
    // eslint-disable-next-line
    edit_story(state, story) {
      state.currentStory = story
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve) => {
        firebase.database().ref('/users')
          .orderByChild('login')
          .equalTo(user.email)
          .on('child_added', (snapshot) => {
            const user = snapshot.val()
            localStorage.setItem('role', user.role)
            commit('login', user.role)
            // this.state.role = user.role
            resolve(user)

          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('role')
        resolve()
      })
    },
    editStory({ commit }, story) {
      commit('edit_story', story)
    }
  },
  modules: {},
  getters: {
    authRole: state => state.role,
    getCurrentStory: state => state.currentStory,
  }
})
