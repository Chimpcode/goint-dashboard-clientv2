<template>
    <div id="goint-payments">
        <v-dialog v-model="opened" max-width="800px">
            <v-card class="payment-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon fill="white" points="0,100 100,50 100,100"/>
              </svg>
              <v-card-title class="title">Subscripción y pagos</v-card-title>
              <v-card-text v-if="showInfoAlert">
                <v-alert :value="true" icon="info" outline color="primary">Adquiera a tiempo el paquete para su siguiente plan de publicidad.</v-alert>
              </v-card-text>
              <v-card-text class="plans-section">

                <div class="option" :id="'option' + option.id" :ref="'plan' + option.id" @click="selectOption(option)"
                  v-for="(option, i) in options" :key="i+'-option'">
                  <div class="name-plan">{{option.name}}</div>
                  <div class="price-plan">$ {{option.monthlyPrice}} / Tda.</div>
                  <div class="value-plan">Duracion {{option.duration}} dias</div>
                </div>
                <!-- <v-btn color="red lighten-3">
                  asdsad
                </v-btn>
                <v-btn color="blue lighten-3">PREMIUM</v-btn>
                <v-btn color="yellow lighten-3">PLATINUM</v-btn> -->
              </v-card-text>
              <v-card-text class="result">Compra: $ {{ optionSelected === null? 0 : optionSelected.monthlyPrice }}</v-card-text>
              <cc-credit-card class="cc-form" v-model="ccform"></cc-credit-card>
              <v-card-actions class="payment-actions">
                  <v-spacer></v-spacer>
                  <v-btn color="primary">COMPRAR</v-btn>
                  <v-btn color="grey darken-3" class="white--text" @click.native.stop="closeDialog">CANCELAR</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { plansQuery } from '~/apollo/company'
import CcCreditCard from './cc-credit-card'

export default {
  name: 'GointPayments',
  components: {
    CcCreditCard
  },
  props: {
    showInfoAlert: { type: Boolean, default: true }
  },
  computed: {
    opened: {
      get () {
        return this.$store.state.bombopaymentsdialog
      },
      set (value) {
        this.$store.state.bombopaymentsdialog = value
      }
    }
  },
  data () {
    return {
      ccform: {},
      optionSelected: null,
      options: [
      ]
    }
  },
  methods: {
    closeDialog () {
      this.$store.state.bombopaymentsdialog = !this.$store.state.bombopaymentsdialog
    },
    selectOption (option) {
      this.options.map(_option => {
        document.getElementById('option' + _option.id).classList.remove('option-selected')
      })
      document.getElementById('option' + option.id).classList.add('option-selected')
      this.optionSelected = option
      this.$emit('onOptionSelected', option)
    }
  },
  created () {
    const self = this
    this.$apollo.query({
      query: plansQuery
    }).then(res => {
      self.options = self.options.concat(res.data.plans)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="stylus" scoped>
.option
  display inline-block
  margin 4px 4px
  padding 20px 20px
  color black
  border 1px solid black
  border-radius 2px
  background #fff
  cursor pointer
  transition all .5s ease
// .option:hover
//   padding 18px 18px
// #option1
//   background #fff
// #option2
//   background #fff
// #option3
//   background #fff
.option-selected
  border-color #e84c55 
  background #e84c55
  color white
.name-plan
  font-size 14px
  font-weight bold
.price-plan
  font-size 28px
  text-align right
  font-weight bold
.value-plan
  font-size 14px
.plans-section
  text-align center
.title
  font-weight 600
  font-size 18px
  padding-top 40px
  padding-bottom 70px
  color white
svg
  position: absolute;
  top: 0px;
  width: 100%;
  height: 10vw;
  z-index 1
  background #e84c55
  // background-image: linear-gradient(#e84c55, #ff6126);
  /* set height to pixels if you want angle to change with screen width */
.payment-card
  position: relative;
  min-height: 300px;
.cc-form
.payment-actions
.plans-section
.title
  position relative
  z-index 2
.result
  text-align center
  font-size 18px
  font-weight 600
</style>
