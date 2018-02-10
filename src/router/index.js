import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'

import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Nav Guards
router.beforeEach((to, from, next) => {
  // Verificar requiresAuth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verificar si NO esta logueado
    if (!firebase.auth().currentUser) {
      // Redireccionar a vista signIn
      next({
        path: '/signin',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Continuar con la requiresAuth
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Verificamos si el usuario esta logueado
    if (firebase.auth().currentUser) {
      // Redireccionar a la vista principal
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
