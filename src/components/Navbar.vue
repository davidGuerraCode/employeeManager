<template lang="pug">
  nav
    div(class="nav-wrapper bg")
      div(class="container")
        router-link(to="/" class="brand-logo") Employee Manager
        ul.right
          li(v-if="isSignIn") {{ currentUser }}
          li(v-if="isSignIn")
            router-link(to="/") Dashboard
          li(v-if="!isSignIn")
            router-link(to="/signin") Sign In
          li(v-if="!isSignIn")
            router-link(to="/signup") Sign Up
          li(v-if="isSignIn")
            button(class="btn" @click="signOut") Sign Out
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'navbar',
  data () {
    return {
      isSignIn: false,
      currentUser: false
    }
  },
  methods: {
    signOut () {
      firebase.auth().signOut().then(() => {
        this.$router.go({ path: this.$router.path })
      })
    }
  },
  created () {
    if (firebase.auth().currentUser) {
      this.isSignIn = true
      this.currentUser = firebase.auth().currentUser.email
    }
  }
}
</script>


<style scoped>
  .bg{
    background: linear-gradient(to right,#355C7D, #11998e, #355C7D)
  }
</style>