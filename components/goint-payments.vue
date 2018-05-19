<template>
    <div id="goint-payments">
        <v-dialog v-model="opened">
            <v-card>
              <v-card-text>
                <div class="option" id="option1" ref="option1" @click="selectOption('option1')">
                  <div class="name-plan">B&Aacute;SICO</div>
                  <div class="price-plan">s/ 20</div>
                  <div class="value-plan">10 LUGARES 1 SECTORES</div>
                </div>
                <div class="option" id="option2" ref="option2" @click="selectOption('option2')">
                  <div class="name-plan">ESTANDAR</div>
                  <div class="price-plan">s/ 30</div>
                  <div class="value-plan">20 LUGARES 2 SECTORES</div>
                </div>
                <div class="option" id="option3" ref="option3" @click="selectOption('option3')">
                  <div class="name-plan">PREMIUM</div>
                  <div class="price-plan">s/ 50</div>
                  <div class="value-plan">50 LUGARES 2 SECTORES</div>
                </div>

                <!-- <v-btn color="red lighten-3">
                  asdsad
                </v-btn>
                <v-btn color="blue lighten-3">PREMIUM</v-btn>
                <v-btn color="yellow lighten-3">PLATINUM</v-btn> -->
              </v-card-text>
              <cc-credit-card v-model="ccform"></cc-credit-card>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary">COMPRAR</v-btn>
                  <v-btn color="grey darken-3" class="white--text" @click.native.stop="closeDialog">CANCELAR</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import CcCreditCard from './cc-credit-card'

export default {
  name: 'GointPayments',
  components: {
    CcCreditCard
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
      ccform: {}
    }
  },
  methods: {
    closeDialog () {
      this.$store.state.bombopaymentsdialog = !this.$store.state.bombopaymentsdialog
    },
    selectOption (option) {
      const options = ['option1', 'option2', 'option3']
      options.map(_option => {
        document.getElementById(_option).classList.remove('option-selected')
      })
      document.getElementById(option).classList.add('option-selected')
    }
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

</style>

