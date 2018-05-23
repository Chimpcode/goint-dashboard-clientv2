<template>
  <div @click="openGalaxy">
    <div class="image-container" ref="imgContainer"  :style="{'height': height}">
      <img ref="img" :src="url" height="100%" alt="">
    </div>
    <goint-galaxy :is-open="gointGalaxyIsOpen" :onChangeState="changedState" @updatedImage="updateImage"/>
  </div>
</template>

<script>
  import GointGalaxy from '~/components/goint_galaxy'

  export default {
    components: {
      GointGalaxy
    },
    name: 'CcContainerImage',
    props: {
      height: String,
      pastImg: String
    },
    watch: {
      pastImg: function (newVal, oldVal) {
        // if (this.pastImg !== undefined) {
        if (newVal !== undefined) {
          this.$refs.imgContainer.style.background = 'black'
          this.$refs.img.src = newVal
        }
        // }
      }
    },
    data () {
      return {
        url: '',
        focused: false,
        gointGalaxyIsOpen: false
      }
    },
    methods: {
      changedState (prevState) {
        this.gointGalaxyIsOpen = prevState
      },
      openGalaxy () {
        console.log('clicked')
        this.gointGalaxyIsOpen = true
      },
      updateImage (url) {
        this.$refs.img.src = url
        this.$refs.imgContainer.style.background = 'white'
        this.$emit('updatedImage', url)
      }
    }
  }
</script>

<style>
.image-container {
  text-align: center;
  background-image: linear-gradient(-132deg, #FF7272 0%, #4EBAE0 100%);
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.20);
  border-radius: 4px;

  width: 100%;
}
</style>
