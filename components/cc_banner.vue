<template>
  <div class="banner">
    <a href="#">
      {{messagePartOne}}
      <i class="material-icons icon" 
        style="color: rgb(197, 11, 86); font-size: 20px;">favorite</i>
      {{messagePartTwo}}
    </a>
  </div>  
</template>

<script>
export default {
  name: 'ChimpcodeBanner',
  data () {
    return {
      messagePartOne: 'Made with ',
      messagePartTwo: ' by Chimpcode'
    }
  }
}
</script>


<style lang="stylus">
  .banner
    font-family "Quicksand"
  .banner a
    font-size 12px
    text-decoration none
    color dimgray
    font-weight bold
</style>
