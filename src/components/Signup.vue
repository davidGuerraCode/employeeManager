<template lang="pug">
  div
    div.container
      div.row
        div(class="col s12 m8 offset-m2")
          div(class="login card-panel white grey-text text-darken-2 center")
            h3 Sign Up
            form
              div(class="input-field")
                i(class="material-icons prefix") email
                input(type="text" id="email" v-model="user.email")
                label(class="grey-text text-darken-2" for="email") Email
              div.input-field
                i(class="material-icons prefix") lock
                input(type="password" id="password" v-model="user.password")
                label(class="grey-text text-darken-2" for="password") Password
              button(class="btn teal white-text" @click="signUp") Sign up
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signup',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signUp (event) {
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(user => {
          console.log(`Cuenta registrada para ${user.email}`)
          this.$router.go({ path: this.$router.path })
        })
        .catch(err => new Error(err))
      event.preventDefault()
    }
  }
}
</script>
