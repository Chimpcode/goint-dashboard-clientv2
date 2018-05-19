<template>
  <h1> Hello Client </h1>
</template>

<script>
  export default {
    middleware: 'auth',
    layout: 'dashboard',
    data () {
      return {}
    }
  }
</script>

<style>

</style>

