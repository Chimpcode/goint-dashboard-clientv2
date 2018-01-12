<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="isOpen" persistent max-width="80%">
        <v-card>
          <v-card-actions>
            <v-card-title class="headline">Imagenes subidas a la nube</v-card-title>
            <v-spacer></v-spacer>
            <!--Aqui se encuentra tu parte arostegui-->
            <v-btn style="background: linear-gradient(to right, #FF3056, #FF3056);" dark @click.native="dialogOpen = false">Contratar dise&Ntilde;o grafico</v-btn>
          </v-card-actions>
          <v-card-text>

            <scroller
              :on-refresh="refresh"
              :on-infinite="infinite">
              <!-- content goes here -->
            </scroller>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!--Aqui se encuentra tu parte arostegui-->
            <v-btn color="red darken-3" flat @click.native="closeDialog">Cerrar</v-btn>
            <v-btn color="red darken-3" flat @click.native="closeDialog">Escoger desde Galeria</v-btn>
            <v-btn color="red darken-3" flat @click.native="closeDialog">Subir Imagen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: {
      onChangeState: Function,
      isOpen: Boolean
    },
    mounted () {
      console.log(this.$store.state.auth.user)
      const ruc = this.$store.state.auth.user.ruc

      this.$http.get('http://13.90.253.208:9300/api/v1/i/' + ruc).then(response => {
        // get body data
        let newImages = []
        for (let i = 0; i < response.body.length; i++) {
          newImages.push({src: this.baseUri + response.body[i]})
        }
        this.images = newImages
        console.log(this.images)
      }, response => {
        // error callback
      })
    },
    data () {
      return {
        baseUri: 'http://13.90.253.208:9300/api/v1/i/',
        state: this.isOpen,
        images: []
      }
    },
    methods: {
      openDialog () {
        this.onChangeState(this.state)
      },
      closeDialog () {
        this.onChangeState(this.state)
        this.state = false
      }
    }
  }
</script>

<style>

</style>
