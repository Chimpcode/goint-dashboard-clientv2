<template>
<transition name="slide">
  <div id="sidebar" v-if="isOpen === true">
    <div>
      <div class="close-icon">
        <v-btn flat icon @click.native.stop="updateSidebar"><v-icon>cancel</v-icon></v-btn>
      </div>
      <profile-box class="py-4">
      </profile-box>
      <div class="body-status">
        <p class="type-account-label nexalight text-xs-left">Tipo de cuenta</p>
        <p class="type-account-value nexalight text-xs-center mb-5">REGULAR</p>
        <p class="nexabold text-xs-center"> Promociones Disponibles: 4 </p>
        <p class="nexabold text-xs-center"> Sedes Disponibles: 4 </p>
        <p class="nexabold text-xs-center"> Promociones Activas: 4 </p>
      </div>
    </div>

  </div>
</transition>
</template>

<script>
import ProfileBox from '../components/ProfileBox'

export default {
  name: 'SidebarAccount',
  components: {
    ProfileBox
  },
  props: {
    open: { type: Boolean, default: true }
  },
  data () {
    return {
      inputs: [
        {label: 'Nombres'}, {label: 'Email'}, {label: 'Telefono'}
      ],
      skills: [
      ]
    }
  },
  computed: {
    isOpen: function () {
      return this.open
    }
  },
  methods: {
    updateSidebar: function (event) {
      this.$emit('update-sidebar-open', false)
    },
    emit_snackbar: function (message) {
      this.$emit('on-info-submission', message)
    }
  }
}
</script>

<style lang="stylus">
#sidebar
  font-family: Quicksand,Roboto,serif
  position: fixed
  width: 300px
  top: 0px
  bottom: 0px
  right: 0px

  z-index: 9999
  background: white

.body-status
  padding 16px
.type-account-label
  font-size 10px
.type-account-value
  font-size 16px
  padding: 10px 10px;
  background: #90a2ce;
  border-radius: 40px;
.brand-font
  font-family: Quicksand,Roboto,serif
.close-icon
  position absolute
  top 1px
  left 0px
  z-index 100
.close-icon i
  color: #FF3851 !important
.sidebar-title
  font-family: Quicksand,Roboto,serif
  color: #b9b9b99e
  font-size:18px
  text-align: center
  margin: 18px

.emphasis
  font-family: Quicksand,Roboto,serif
  color: #ffffffa6
  font-weight: 600

.input-sidebar label
  font-size: 12px

.input-sidebar input
  font-family: Quicksand,Roboto,serif
.checkbox-item
  padding-top: 0px
.label-item
  font-size: 16px
  font-weight: 500
  color: #b9b9b99e

.slide-enter-active
  transition: all .1s ease
.slide-leave-active
  transition: all .4s ease
.slide-enter, .slide-leave-to
  transform: translateX(300px)

</style>
