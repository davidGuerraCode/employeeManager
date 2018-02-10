<template>
  <div id="app">
    <navbar></navbar>
    <div class="conatiner">
      <router-view/>
    </div>
  </div>
</template>

<script>
import navbar from './components/Navbar'

export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style>
</style>
