<template>
  <div id="login">
    <v-app>
      <v-layout row wrap class="cc-container">
        <v-flex xs12 sm5>
          <div class="r-side-content">
            <v-container>
              <v-layout row>
                <v-flex xs8 offset-xs2 sm8 offset-sm2 class="text-xs-center translate-middle mb-3">

                  <img class="mt-4 mb-5 pb-4 hidden-sm-and-down" src="../assets/logo_goint.png" width="50%"/>
                  <img class="mt-4 mb-5 hidden-md-and-up" src="../assets/logo_goint.png" width="120"/>

                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    :rules="emailRules"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    :append-icon="pass_v ? 'visibility' : 'visibility_off'"
                    @click:append="() => (pass_v = !pass_v)"
                    v-model="password"
                    :type="pass_v ? 'password' : 'text'"
                  ></v-text-field>

                  <v-btn color="primary" class="white--text" light @click.native.stop="processLogin" :disabled="isLoginLoading">
                    {{ isLoginLoading?'Loading':'Login!' }}
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 class="text-xs-center signup-link">
                  <nuxt-link to="/register">¿No tienes cuenta? Créate uno.</nuxt-link>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 class="text-xs-center forgot-link">
                  <nuxt-link to="/forgotpassword">Recuperar Contraseña</nuxt-link>
                </v-flex>
              </v-layout>
            </v-container>
            <chimpcode-banner class="chimpcode-banner"/>
          </div>
        </v-flex>
        <v-flex xs12 sm7>
          <div class="l-side-content">
          </div>
        </v-flex>
        <v-dialog v-model="errorDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="subheading">Error al iniciar sesion</v-card-title>
            <v-card-text>{{ errorMsg }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click.native="errorDialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
  import ChimpcodeBanner from '~/components/cc_banner'
  // import router from '@/router'
  export default {
    middleware: 'alreadyauth',
    components: {
      ChimpcodeBanner
    },
    //    beforeCreate () {
    //      if (this.$store.getters['auth/loggedIn']) {
    //        this.$router.push('/dashboard')
    //      }
    //    },
    data () {
      return {
        isLoginLoading: false,
        errorDialog: false,
        errorMsg: 'Email o contraseña no validos',
        password: '',
        pass_v: true,
        email: '',
        emailRules: [
          v => {
            return !!v || 'E-mail is required'
          },
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      async processLogin () {
        this.isLoginLoading = true
        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
        } catch (e) {
          this.errorMsg = e.response.data.error
          this.errorDialog = true
          console.log('===error ', e.response.data.error)
          console.log(this.$auth.loggedIn)
          this.password = ''
        } finally {
          this.isLoginLoading = false
        }
      }
    }
  }
</script>

<style lang="stylus">
  html, body, #app, #login
    height: 100vh

  .cc-container
    height: 100%

  .l-side-content
    min-height: 100%
    background-image: url(https://source.unsplash.com/sD1VpeflHBY/1500x1000)
    background-position: center center
    background-repeat: no-repeat
    background-attachment: fixed
    background-size: cover
    background-color: #FF3F54
    background-blend-mode: multiply

  .r-side-content
    background: white
    min-height: 100%

  /* .side-content{
    line-height: 50%;
  } */
  @media only screen and (min-width: 700px)
    .r-side-content
      padding-top: 54px

  @media only screen and (max-width: 767px)
    .l-side-content
      background-image:url(https://source.unsplash.com/sD1VpeflHBY/768x600)
    .translate-middle
      transform: translateY(50%)

  @media only screen and (max-width: 600px)
    .translate-middle
      transform: translateY(0%)

  @media only screen and (max-height: 700px)
    .translate-middle
      transform: translateY(0%)

  @media only screen and (min-height: 500px)
    .chimpcode-banner
      position absolute

  @media only screen and (max-height: 500px)
    .chimpcode-banner
      position relative

  .chimpcode-banner
    bottom 5px
    left 12px
  .forgot-link
    margin-top 12px

</style>
