<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="isOpen" persistent max-width="80%">
        <v-card>
          <v-card-actions>
            <v-card-title class="headline">Imagenes subidas a la nube</v-card-title>
            <v-spacer></v-spacer>

            <v-btn style="background: linear-gradient(to right, #FF3056, #FF3056);" dark @click.native="dialogOpen = false">Contratar dise&Ntilde;o grafico</v-btn>
          </v-card-actions>
          <v-card-text>

            <v-flex xs12>
              <v-layout row wrap>
                <v-flex
                  xs4
                  v-for="(n, i) in images"
                  :key="i+'-image'"
                >
                  <v-card flat tile>
                    <v-card-media
                      :src="n.src"
                      height="150px"
                      @click="selectImageAsProfile(i)"
                    >
                    </v-card-media>
                    <div :class="[ i === imageSelected? 'selected-image':''  ]" v-if="imageSelected !== undefined"></div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <!--<scroller-->
              <!--:on-refresh="refresh"-->
              <!--:on-infinite="infinite">-->
              <!--&lt;!&ndash; content goes here &ndash;&gt;-->
            <!--</scroller>-->

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!--Aqui se encuentra tu parte arostegui-->
            <v-btn color="red darken-3" flat @click.native="closeDialog">Cerrar</v-btn>
            <v-btn color="red darken-3" flat @click.native="chooseFromDialog">Escoger desde Galeria</v-btn>
            <v-btn color="red darken-3" flat @click.native="submitFile">
              <v-icon>file_upload</v-icon>
              Subir Imagen
            </v-btn>
            <input ref="inputFile" name="myFile" type="file" style="display: none;" @change="atChangeInputFile">
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  // <!-- updateLogoImage -->
  import {updateLogoImage} from '~/apollo/settings'

  export default {
    props: {
      onChangeState: Function,
      isOpen: Boolean
    },
    mounted () {
      // console.log(this.$store.state.auth.user)
      this.ruc = this.$store.state.auth.user.ruc
      let ruc = this.ruc
      this.refreshImages(ruc)
    },
    data () {
      return {
        baseUri: 'http://13.90.253.208:9300/api/v1/i/',
        state: this.isOpen,
        images: [],
        ruc: '',
        companyid: this.$store.state.auth.user.id,
        imageSelected: undefined
      }
    },
    methods: {
      openDialog () {
        this.onChangeState(this.state)
      },
      closeDialog () {
        this.onChangeState(this.state)
        this.state = false
      },
      submitFile () {
        this.$refs.inputFile.click()
      },
      atChangeInputFile () {
        // console.log(this.$refs.inputFile.files)
        //  create form to send file
        let formData = new FormData()
        formData.append('image', this.$refs.inputFile.files[0])

        let request = new XMLHttpRequest()
        request.open('POST', 'http://13.90.253.208:9300/api/v1/i/' + this.ruc)
        request.send(formData)

        this.refreshImages(this.ruc)
      },
      refreshImages (ruc) {
        this.$http.get('http://13.90.253.208:9300/api/v1/i/' + ruc).then(response => {
          // get body data
          let newImages = []
          for (let i = 0; i < response.body.length; i++) {
            newImages.push({src: this.baseUri + response.body[i]})
          }
          this.images = newImages
          // console.log(this.images)
        }, err => {
          // error callback
          console.log(err)
        })
      },
      chooseFromDialog () {
        if (this.$route.path !== '/client/promotions') {
          //  make update of logoImage of Company and close dialog
          if (this.imageSelected !== undefined) {
            let imageUrl = this.images[this.imageSelected].src
            //  make mutation
            this.$apollo.mutate({
              mutation: updateLogoImage,
              variables: {
                companyid: this.companyid,
                logoImage: imageUrl
              }
            }).then(res => {
              this.closeDialog()
            })
          }
        } else {
          // CLIENT/PROMOTIONS
          if (this.imageSelected !== undefined) {
            let imageUrl = this.images[this.imageSelected].src
            //  make mutation
            this.$emit('updatedImage', imageUrl)
            this.closeDialog()
          }
        }
      },
      selectImageAsProfile (i) {
        console.log('click')
        this.imageSelected = i
      }
    }
  }
</script>

<style lang="stylus">
  .selected-image
    position: absolute;
    top: 0;
    width: 100%;
    height: 150px;
    left: 0;
    background: rgba(0, 0, 0, 0.5)
</style>
