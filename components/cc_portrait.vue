<template>
    <div class="potrait-container" @click="openGalaxy">
      <span class="shadow">CAMBIAR PORTADA</span>
      <img class="potrait-img" :src="imageUrl" alt="">
      <goint-galaxy :is-open="gointGalaxyIsOpen" :onChangeState="changedState"
                    typeImage="portrait"
                    @updatedImage="imageUrlUpdated"/>
    </div>
</template>

<script>
  import { updateHeaderPortrait } from '~/apollo/settings'
  import GointGalaxy from '~/components/goint_galaxy'

  export default {
    components: {
      GointGalaxy
    },
    props: {
      imageUrl: {
        type: String,
        default: '/img/placeholder_company_header_background.png'
      }
    },
    name: 'cc-portrait',
    data () {
      return {
        gointGalaxyIsOpen: false,
        companyid: this.$store.state.auth.user.id
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
      },
      imageUrlUpdated (imageUrl) {
        this.$apollo.mutate({
          mutation: updateHeaderPortrait,
          variables: {
            companyid: this.companyid,
            headerBackground: imageUrl
          }
        }).then(res => {})
      }
    }
  }
</script>

<style lang="stylus" scoped>
.potrait-img
  height: 200px;
  width: 400px
.shadow
  position: absolute
  top 0
  left 0
  background-color rgba(0, 0, 0, 0)
  width: 100%
  max-width: 400px
  height: 200px
  color: rgba(0, 0, 0, 0)
  text-align: center
  line-height: 200px
  text-transform: uppercase
.shadow:hover
  background-color rgba(0, 0, 0, 0.65)
  color: #fff
.potrait-container
  position relative
  max-width: 400px
  left 50%
  transform translateX(-50%)

</style>
