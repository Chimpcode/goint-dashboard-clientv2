<template>
    <div id="register-page">
      <v-app>
        <v-container>

          <v-layout row wrap class="pb-5">
            <v-flex xs12>
              <h2 class="red--text text--darken-4">Afiliate a Goint</h2>
              <v-divider class="red darken-4"></v-divider>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12>
              <h3 class="grey--text text--darken-2">Datos Personales del representante legal</h3>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Nombres"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Apellidos"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Correo" v-model="company.email"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Password" type="password" v-model="company.password"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Repetir password" type="password" v-model="company.repassword"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <h3 class="grey--text text--darken-2">Datos de contacto</h3>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Telefono fijo" v-model="company.staticPhone"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Telefono movil" v-model="company.movilPhone"></v-text-field>
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
              <v-text-field label="Razon social" v-model="company.socialReason"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Nombre comercial" v-model="company.commercialName"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Link de pagina web" v-model="company.link"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Identificador fiscal" v-model="company.fiscalIdentity"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Direccion legal" v-model="company.legalAddress.address"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Codigo postal" v-model="company.legalAddress.postalCode"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Ciudad" v-model="company.legalAddress.city"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Provincia" v-model="company.legalAddress.province"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Pais" v-model="company.legalAddress.country"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Region" v-model="company.legalAddress.region"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Correo para envio de factura" v-model="company.emailPayment"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-btn lg color="red darken-4"
                     v-on:click="createNewCompany()"
                     class="white--text">REGISTRARSE</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-app>
    </div>
</template>

<script>
    import { createCompany } from '~/apollo/company'

    export default {
      name: 'register',
      data () {
        return {
          company: { legalAddress: {} }
        }
      },
      methods: {
        createNewCompany () {
          const self = this
          const link = self.company.link || ''
          this.$apollo.mutate({
            mutation: createCompany,
            variables: {
              aboutUs: '',
              commercialName: self.company.commercialName,
              email: self.company.email,
              link: link,
              staticPhone: self.company.staticPhone,
              movilPhone: self.company.movilPhone,
              ruc: self.company.fiscalIdentity,
              fiscalIdentity: self.company.fiscalIdentity,
              password: self.company.password,
              socialReason: self.company.socialReason,
              emailPayment: self.company.emailPayment,
              termsConditions: '',
              legalAddressRegion: self.company.legalAddress.region,
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

</style>
