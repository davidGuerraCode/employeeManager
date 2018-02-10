<template lang="pug">
div(class="container")
  div(id="dashboard")
    ul(class="collection with-header")
      li(class="collection-header")
        h4 Employees
      li(v-for="employee in employees" :key="employee.id" class="collection-item")
        div(class="chip") {{ employee.dpt }} 
        | {{ employee.employee_id }} : {{ employee.name }}
        router-link(:to="{ name: 'view-employee', params: { employee_id: employee.employee_id } }" class="secondary-content")
          i(class="fa fa-eye")
    div(class="fixed-action-btn")
      router-link(to="/new" class="btn-floating btn-large teal darken-2")
        i(class="fa fa-plus")
</template>

<script>
import db from '@/firebase-init'

export default {
  name: 'dashboard',
  data () {
    return {
      employees: []
    }
  },
  created () {
    db.collection('employees').orderBy('dpt').get().then(querySnapshop => {
      querySnapshop.forEach(doc => {
        const data = {
          'id': doc.id,
          'employee_id': doc.data().employee_id,
          'name': doc.data().name,
          'dpt': doc.data().dpt,
          'position': doc.data().position
        }
        this.employees.push(data)
      })
    })
  }
}
</script>
