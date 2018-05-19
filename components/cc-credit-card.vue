<template>
    <div class="cc-credit-card">
      <div class="title-form">Complete los datos para la compra</div>
      <div class="input-form-cc-container">
        <label for="">NUMERO DE CREDITO</label>
        <the-mask :mask="['#### #### #### ####']"
          placeholder="#### #### #### ####"
          class="cc input-form-cc" 
          v-model="cc" @input="emitValue"></the-mask>
      </div>
      <div class="fv-cvv">
        <div class="input-form-cc-container fv-container">
          <label for="">FECHA DE VENCIMIENTO</label>
          <the-mask :mask="['##/####']" 
            placeholder="MM/YYYY"
            class="fv input-form-cc" 
            v-model="fv" @input="emitValue"></the-mask>          
        </div>
        <div class="input-form-cc-container cvv-container">
          <label for="">CVV</label>
          <the-mask :mask="['###']" 
            class="cvv input-form-cc" 
            placeholder="CVV"
            v-model="cvv" 
            @input="emitValue"></the-mask>
        </div>
      </div>
    </div>
</template>

<script>
import {TheMask} from 'vue-the-mask'

export default {
  name: 'cc-credit-card',
  components: {TheMask},
  data () {
    return {
      cc: null,
      fv: null,
      cvv: null
    }
  },
  methods: {
    emitValue () {
      this.$emit('input', { cc: this.cc, fv: this.fv, cvv: this.cvv })
    }
  }
}
</script>

<style lang="stylus" scoped>
colorform = #C12B35
hovercolorform = black

.title-form
  color colorform
  text-transform uppercase
  font-size 14px
  font-weight bold
.cc-credit-card
  width 300px
  margin-left auto
  margin-right auto
  padding 18px 0px
.fv-cvv
  display flex;
  flex: nowrap
.fv
  width 80px

.input-form-cc
  font-size 16px
  width 100%
  outline none
  
.input-form-cc-container
  margin 4px 4px
  border-radius 8px
  border 2px solid colorform
  padding 8px 8px
  outline none
  transition border-color 1.5s ease
  // display inline-block
.input-form-cc-container label
  display: block
  color colorform
  font-size 10px
  transition color .5s ease
  
.fv-container
  display inline-block
  flex-grow 2
.cvv-container
  display inline-block
  flex-grow 1

.input-form-cc-container:hover
  border-color hovercolorform
.input-form-cc-container:hover label
  color hovercolorform
</style>
