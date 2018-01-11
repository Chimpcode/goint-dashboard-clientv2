<template>
  <v-card light id="placecard" @click.native.stop="openForm">
    <v-card-title primary-title>
      <p class="py-4 mb-0 nexabold text-xs-center add-title"><span class="plus">+</span> Agregar {{ kindCard }}</p>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'NewCard',
  props: {
    kindCard: String
  },
  data () {
    return {}
  },
  methods: {
    openForm: function () {
      this.$emit('on-open-form', this.kindCard)
    }
  }
}
</script>

<style lang="stylus">
.add-title
  border 4px dashed #757575
  color #757575
  width 100%
  position relative
  top -2px

.add-title:hover
  color black
  border 4px dashed black

.add-title span:hover
  color black

.plus
  font-size 43px
  position relative
  top 10px
  right 9px
</style>
