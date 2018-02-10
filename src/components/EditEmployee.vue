<template lang="pug">
  div(id="edit-employee" class="container")
    h4 Edit Employee
    div(class="row")
      form(@submit.prevent="updateEmployee" class="col s12")
        div(class="row")
          div(class="input-field col s12")
            input(type="text" v-model="employee_id" disabled required)
            label(class="active") Employee ID #
        div(class="row")
          div(class="input-field col s12")
            input(type="text" v-model="name" required)
            label(class="active") Name
        div(class="row")
          div(class="input-field col s12")
            input(type="text" v-model="dpt" required)
            label(class="active") Departement
        div(class="row")
          div(class="input-field col s12")
            input(type="text" v-model="position" required)
            label(class="active") Position
        button(type="submit" class="btn teal darken-1") Submit
        router-link(to="/" class="btn red darken-1") Cancel
</template>

<script>
import db from '@/firebase-init'

export default {
  name: 'edit-employee',
  data () {
    return {
      employee_id: null,
      name: null,
      dpt: null,
      position: null
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('employees').where('employee_id', '==', to.params.employee_id).get()
      .then(querySnapshop => {
        querySnapshop.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id
            vm.name = doc.data().name
            vm.dpt = doc.data().dpt
            vm.position = doc.data().position
          })
        })
      })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
        .then(querySnapshop => {
          querySnapshop.forEach(doc => {
            this.employee_id = doc.data().employee_id
            this.name = doc.data().name
            this.dpt = doc.data().dpt
            this.position = doc.data().position
          })
        })
    },
    updateEmployee () {
      db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
        .then(querySnapshop => {
          querySnapshop.forEach(doc => {
            doc.ref.update({
              employee_id: this.employee_id,
              name: this.name,
              dpt: this.dpt,
              position: this.position
            })
            .then(() => {
              this.$router.push({ name: 'view-employee', params: { employee_id: this.employee_id } })
            })
          })
        })
    }
  }
}
</script>