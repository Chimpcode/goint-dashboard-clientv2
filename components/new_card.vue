<template>
  <div class="n-card">
    <v-card id="placecard" @click.native.stop="openForm" style="background-color: white">
      <v-card-title>
        <p class="py-3 mb-0 nexabold text-xs-center add-title"><span class="plus">+</span> Agregar {{ kindCard }}</p>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'NewCard',
  props: {
    kindCard: String,
    onOpen: Function
  },
  data () {
    return {}
  },
  methods: {
    openForm () {
      if (this.onOpen) {
        this.onOpen()
      }
    }
  }
}
</script>

<style lang="stylus">
.n-card
  cusor pointer


.add-title
  border 2px dashed #757575
  color #757575
  width 100%
  position relative
  top -2px

.add-title:hover
  color black
  border 2px dashed black

.add-title span:hover
  color black

.plus
  font-size 43px
  position relative
  top 10px
  right 9px
</style>
