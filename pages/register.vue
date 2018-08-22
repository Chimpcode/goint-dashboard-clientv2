<template>
    <div id="register-page">
      <v-app>
        <v-container>

          <v-layout row wrap class="pb-5">
            <v-flex xs12>
              <h2 class="grey--text text--darken-3">Afiliate a Goint</h2>
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
              <v-text-field label="Correo"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Password" type="password"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Repetir password" type="password"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <h3 class="grey--text text--darken-2">Datos de contacto</h3>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Telefono fijo"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Telefono movil"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Correo alternativo"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <h3 class="grey--text text--darken-2">Datos de la empresa</h3>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Razon social"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Nombre comercial"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Identificador fiscal"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Direccion legal"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Codigo postal"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Ciudad"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Pais"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="pa-2">
              <v-text-field label="Correo para envio de factura"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-btn lg color="red darken-4" class="white--text">REGISTRARSE</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-app>
    </div>
</template>

<script>
    export default {
      name: 'register'
    }
</script>

<style scoped lang="stylus">

</style>
