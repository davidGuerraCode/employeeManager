<template lang="pug">
  div(id="new-employee" class="container")
    h4 New Employee
    div(class="row")
      form(@submit.prevent="saveEmployee" class="col s12")
        div(class="row")
          div(class="input-field col s12")
            input(type="text" v-model="employee_id" required)
            label Employee ID #
        div(class="row")
          div(class="input-field col s12")
            input(type="text" v-model="name" required)
            label Name
        div(class="row")
          div(class="input-field col s12")
            input(type="text" v-model="dpt" required)
            label Departement
        div(class="row")
          div(class="input-field col s12")
            input(type="text" v-model="position" required)
            label Position
        button(type="submit" class="btn teal darken-1") Submit
        router-link(to="/" class="btn red darken-1") Cancel
</template>

<script>
import db from '@/firebase-init'

export default {
  name: 'new-employee',
  data () {
    return {
      employee_id: null,
      name: null,
      dpt: null,
      position: null
    }
  },
  methods: {
    saveEmployee () {
      db.collection('employees').add({
        employee_id: this.employee_id,
        name: this.name,
        dpt: this.dpt,
        position: this.position
      })
      .then(docRef => {
        this.$router.push('/')
      })
      .catch(err => {
        throw new Error(err)
      })
    }
  }
}
</script>