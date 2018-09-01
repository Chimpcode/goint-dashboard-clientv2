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
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Apellidos" v-model="company.lastname" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Correo" v-model="company.email" :rules="emailRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Password" type="password" v-model="company.password" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Repetir password" type="password" v-model="company.repassword" :rules="requiredRules"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <h3 class="grey--text text--darken-2">Datos de contacto</h3>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Telefono fijo" v-model="company.staticPhone" type="number" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Telefono movil" v-model="company.movilPhone" type="number" :rules="requiredRules"></v-text-field>
              </v-flex>
              <!--<v-flex xs12 sm6 class="pa-2">-->
              <!--<v-text-field label="Correo alternativo" v-model="company.movilPhone"></v-text-field>-->
              <!--</v-flex>-->
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <h3 class="grey--text text--darken-2">Datos de la empresa</h3>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Razon social" v-model="company.socialReason" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Nombre comercial" v-model="company.commercialName" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Link de pagina web" v-model="company.link" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Identificador fiscal (RUC, DNI, Carne de extranjería o RUT)" v-model="company.fiscalIdentity" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Direccion legal" v-model="company.legalAddress.address" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Codigo postal" v-model="company.legalAddress.postalCode" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Ciudad" v-model="company.legalAddress.city" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Provincia" v-model="company.legalAddress.province" :rules="requiredRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Pais" v-model="company.legalAddress.country" :rules="requiredRules"></v-text-field>
              </v-flex>
              <!--<v-flex xs12 sm6 class="pa-2">-->
                <!--<v-text-field label="Region" v-model="company.legalAddress.region" :rules="requiredRules"></v-text-field>-->
              <!--</v-flex>-->
              <v-flex xs12 sm6 class="pa-2">
                <v-text-field label="Correo para envio de factura" v-model="company.emailPayment" :rules="emailRules"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <div class="upgrade-container">
                  <v-btn color="primary"
                         class=""
                         @click.native.stop="$store.state.bombopaymentsdialog = !$store.state.bombopaymentsdialog">ESCOJE TU PLAN</v-btn>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn lg color="red darken-4"
                       :disabled="!isValidForm"
                       @click="createNewCompany"
                       class="white--text">REGISTRARSE</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
          <goint-payments :showInfoAlert="false" @onOptionSelected="onPlanSelected"></goint-payments>
        </v-container>
      </v-app>
    </div>
</template>

<script>
    import { createCompany } from '~/apollo/company'
    import GointPayments from '~/components/goint-payments'

    const requiredRule = v => !!v || 'Informacion requerida'

    export default {
      name: 'register',
      components: {GointPayments},
      data () {
        return {
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
        createNewCompany () {
          if (!this.$refs.form.validate()) {
            this.$store.commit('setSnackbarMessage', 'Form invalido')
            return
          }
          if (this.planSelected === null) {
            this.$store.commit('setSnackbarMessage', 'Escoja un plan para registrar la cuenta')
            return
          }
          const self = this
          const link = self.company.link || ''
          this.$apollo.mutate({
            mutation: createCompany,
            variables: {
              aboutUs: '',
              activePlanId: self.planSelected.id,
              commercialName: self.company.commercialName,
              email: self.company.email,
              link: link,
              ownerFullname: self.company.name + ' ' + self.company.lastname,
              staticPhone: self.company.staticPhone,
              movilPhone: self.company.movilPhone,
              ruc: self.company.fiscalIdentity,
              fiscalIdentity: self.company.fiscalIdentity,
              password: self.company.password,
              socialReason: self.company.socialReason,
              emailPayment: self.company.emailPayment,
              termsConditions: '',
              legalAddressRegion: '', // self.company.legalAddress.region,
              legalAddressAddress: self.company.legalAddress.address,
              legalAddressCity: self.company.legalAddress.city,
              legalAddressProvince: self.company.legalAddress.province,
              legalAddressCountry: self.company.legalAddress.country,
              legalAddressPostalCode: self.company.legalAddress.postalCode
            }
          }).then(companyCreated => {
            this.$store.commit('setSnackbarMessage', 'Cuenta creada')
            setTimeout(() => {
              this.$router.push('login')
            }, 3000)
          }).catch(err => {
            console.log(err)
            this.$store.commit('setSnackbarMessage', 'Ocurrio problemas al crear cuenta. Intenta mas tarde')
          })
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
