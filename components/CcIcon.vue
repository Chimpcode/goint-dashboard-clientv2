<template>
  <i :class="mclass">{{ccicon}}</i>
</template>

<script>
export default {
  name: 'CcIcon',
  props: {
    ccicon: String,
    ccclass: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
    }
  },
  computed: {
    mclass: function () {
      let self = this
      let classList = ['material-icons']

      for (var index = 0; index < self.ccclass.length; index++) {
        classList.push(self.ccclass[index])
      }

      return classList
    }
  }
}
</script>

<style lang="css">

</style>
