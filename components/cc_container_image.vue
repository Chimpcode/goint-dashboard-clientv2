<template>
  <div class="image-container" :style="{'height': height} ">


  </div>
</template>

<script>
  export default {
    name: 'CcContainerImage',
    props: {
      model: String,
      height: String
    },
    data () {
      return {
        focused: false
      }
    },
    methods: {
    }
  }
</script>

<style>
.image-container {
  background-image: linear-gradient(-132deg, #FF7272 0%, #4EBAE0 100%);
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.20);
  border-radius: 4px;

  width: 100%;
}
</style>
