<template>
    <div class="avatar-container" @click="openGalaxy">
      <span class="shadow"></span>
      <img class="avatar-img" :src="imageUrl" alt="">
      <goint-galaxy :is-open="gointGalaxyIsOpen" :onChangeState="changedState"></goint-galaxy>
    </div>
</template>

<script>
  import GointGalaxy from '~/components/GointGalaxy'

  export default {
    components: {
      GointGalaxy
    },
    props: {
      imageUrl: String
    },
    name: 'cc-avatar',
    data () {
      return {
        gointGalaxyIsOpen: false
      }
    },
    methods: {
      changedState (prevState) {
        console.log(this.gointGalaxyIsOpen)
        console.log(prevState)
        this.gointGalaxyIsOpen = prevState
      },
      openGalaxy () {
        console.log('clicked')
        this.gointGalaxyIsOpen = true
      }
    }
  }
</script>

<style lang="stylus" scoped>
.avatar-img
  width 150px
  border-radius: 50%
.shadow
  border-radius 50%
  position: absolute
  top 0
  left 0
  background-color rgba(0, 0, 0, 0)
  width: 100%
  height: 100%
.shadow:hover
  background-color rgba(0, 0, 0, 0.27)
.avatar-container
  position relative
  width 150px
  left 50%
  transform translateX(-50%)

</style>
