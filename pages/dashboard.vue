<template>
  <h1>
    Redirecting...
  </h1>
</template>

<script>
  export default {
    middleware: 'auth',
    mounted () {
      const user = this.$store.state['auth']['user']
      if (user.logged) {
        this.$router.push('/client/dashboard')
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style>

</style>
