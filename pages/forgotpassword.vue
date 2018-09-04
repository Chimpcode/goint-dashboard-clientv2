<template>
    <div id="register-page">
      <v-app>
        <v-container fluid class="header-container">
          <v-layout row wrap class="content-centered">
            <v-flex xs12>
              <v-layout row wrap class="pt-4 pb-4">
                <v-flex xs12>
                  <nuxt-link to="/login" class="white--text">Ir a Iniciar sesión</nuxt-link>
                </v-flex>
              </v-layout>

              <v-layout row wrap class="pt-3 pb-3">
                <v-flex xs12>
                  <h2 class="white--text"><a href=""></a> Afíliate a Goint</h2>
                  <v-divider class="white"></v-divider>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container class="mt-4">
          <v-layout row wrap>
            <v-flex xs12>
              <h3 class="grey--text text--darken-2">Datos Personales del representante legal</h3>
            </v-flex>
          </v-layout>
          <v-form v-model="isValidForm" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Nombres"  v-model="company.name" :rules="requiredRules"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12>
                <v-btn lg color="red darken-4"
                       :disabled="!isValidForm"
                       @click="forgotPassword"
                       class="white--text">RECUPERAR CONTRASEÑA</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-app>
    </div>
</template>

<script>
    // import { createCompany } from '~/apollo/company'
    import GointPayments from '~/components/goint-payments'

    const requiredRule = v => !!v || 'Informacion requerida'

    export default {
      name: 'register',
      components: {GointPayments},
      data () {
        return {
          processWaitingDialog: {
            show: false,
            isLoading: true,
            message: ''
          },
          planSelected: null,
          isValidForm: false,
          requiredRules: [requiredRule],
          emailRules: [
            requiredRule,
            v => /.+@.+/.test(v) || 'E-mail debe ser valido'
          ],
          company: { legalAddress: {} }
        }
      },
      methods: {
        onPlanSelected (plan) {
          this.planSelected = plan
        },
        forgotPassword () {
          if (!this.$refs.form.validate()) {
            this.$store.commit('setSnackbarMessage', 'Form invalido')
            return
          }
          this.processWaitingDialog.show = true
          this.processWaitingDialog.isLoading = true

          this.processWaitingDialog.message = 'Ocurrio problemas al crear cuenta. Intenta más tarde'
          this.processWaitingDialog.isLoading = false
        }
      }

    }
</script>

<style scoped lang="stylus">
.content-centered
  max-width 900px
  margin-left: auto
  margin-right: auto
.header-container
  background-image: url(https://source.unsplash.com/sD1VpeflHBY/600x200)
  background-position: center center
  background-repeat: no-repeat
  background-attachment: fixed
  background-size: cover
  background-color: #C12B35
  background-blend-mode: multiply
  /*background #C12B35*/
</style>
