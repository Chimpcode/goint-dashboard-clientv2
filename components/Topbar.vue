<template>
  <div id="topbar" class="elevation-4">
    <div>
      {{title}}
      <v-btn flat icon class="menu-btn" color="black" @click.native.stop="onClickMenuBtn">
        <v-icon>menu</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import CcIcon from './CcIcon'

export default {
  name: 'Topbar',
  components: {
    CcIcon
  },
  props: {
    title: String
  },
  methods: {
    onClickMenuBtn: function () {
      this.$emit('on-menu-btn-click', true)
    }
  }
}
</script>

<style lang="stylus">
#topbar
  background-color white
  color black
  width 100%
  height 72px
  line-height 48px
  padding 12px
#topbar div
  font-weight bold
  font-size 18px
.menu-btn
  float right
</style>
