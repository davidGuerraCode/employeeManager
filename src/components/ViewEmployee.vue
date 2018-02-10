<template lang="pug">
  div(id="view-employee" class="container")
    ul(class="collection with-header")
      li(class="collection-header")
        h4 {{ name }}
      li(class="collection-item") Employee ID # : {{ employee_id }}
      li(class="collection-item") Departament: {{ dpt }}
      li(class="collection-item") Position: {{ position }}
    router-link(to="/" class="btn teal darken-1") Back
    button(@click="deleteEmployee" class="btn red darken-1") Delete
    div(class="fixed-action-btn")
      router-link(:to="{ name: 'edit-employee', params: { employee_id: employee_id } }" class="btn-floating btn-large teal darken-2")
        i(class="fa fa-pencil")
</template>

<script>
import db from '@/firebase-init'

export default {
  name: 'view-employee',
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
    deleteEmployee () {
      if (confirm('Are you sure?')) {
        db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
          .then(querySnapshop => {
            querySnapshop.forEach(doc => {
              doc.ref.delete()
              this.$router.push('/')
            })
          })
      }
    }
  }
}
</script>