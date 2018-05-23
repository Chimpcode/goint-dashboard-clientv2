<template>
  <v-card light>
    <div :class="[ 'image-content', color]">
      <img :src="promoInfo.image" width="100%" height="100%"/>
    </div>
    <div class="info-content">
      <v-card-title primary-title>
      <div>
          <div class="created-at">{{promoInfo.createdAt | prettyDate}}</div>
          <h3 class="headline mb-0 mt-2">{{promoInfo.title}}</h3>
          <div>{{promoInfo.description}}
          </div>
      </div>
      </v-card-title>
      <v-card-actions class="roboto">
        <v-tooltip bottom>
            <v-btn flat color="primary" slot="activator">
            <v-icon>local_activity</v-icon> &nbsp; {{promoInfo.stock}}
            </v-btn>
            <span>Stock de cupones</span>
        </v-tooltip>
        <v-tooltip bottom>
            <v-btn flat color="primary" slot="activator">
            <v-icon>event</v-icon> &nbsp; {{promoInfo.expireAt}}
            </v-btn>
            <span>Fecha de Vencimiento</span>
        </v-tooltip>
        <v-spacer/>

        <v-dialog v-model="activateSwitchDialog" max-width="500px">
          <v-card>
            <v-card-title>
              Estas seguro que deseas activar/desactivar la promocion ?
            </v-card-title>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary" flat @click.native.stop="toggleActivationPost(promoInfo.id)">SI</v-btn>
              <v-btn color=""
                     flat
                     @click.stop="() => {activateSwitchDialog=false; promoInfo.isActive = !promoInfo.isActive }">NO</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-switch :hide-details="true"
                  color="primary"
                  @click.native.stop="activateSwitchDialog = true"
                  :label="promoInfo.isActive===true?'Activo':'Desactivo'"
                  v-model="promoInfo.isActive"></v-switch>
        <v-btn flat color="primary" @click.native.stop="onEditMode">EDITAR</v-btn>

        <!--<v-dialog v-model="deleteDialog" max-width="500px">-->
          <!--<v-btn flat color="primary" slot="activator">Eliminar</v-btn>-->
          <!--<v-card>-->
            <!--<v-card-title>-->
              <!--Estas seguro que deseas eliminar esta promocion?-->
            <!--</v-card-title>-->
            <!--<v-card-actions>-->
              <!--<v-spacer/>-->
              <!--<v-btn color="primary" flat @click.stop="deletePost(promoData.id)">Eliminar</v-btn>-->
              <!--<v-btn color="" flat @click.stop="deleteDialog=false">Close</v-btn>-->
            <!--</v-card-actions>-->
          <!--</v-card>-->
        <!--</v-dialog>-->
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { toggleActivationPostMut } from '~/apollo/posts'

export default {
  name: 'PromoCard',
  props: {
    color: String,
    promoData: Object
  },
  filters: {
    prettyDate (isodate) {
      if (!isodate) return ''
      let date = new Date(isodate)
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
  },
  computed: {
    promoInfo () {
      return {
        id: this.promoData.id,
        image: this.promoData.image,
        createdAt: this.promoData.createdAt,
        description: this.promoData.description,
        expireAt: new Date(this.promoData.expireAt).toISOString().substring(0, 10),
        title: this.promoData.title,
        isActive: this.promoData.isActive,
        stock: this.promoData.stock
      }
    }
  },
  data () {
    return {
      deleteDialog: false,
      activateSwitchDialog: false,
      location_items: {
        1: 'ZONA 1',
        2: 'ZONA 2',
        3: 'ZONA 3'
      }
    }
  },
  methods: {
    toggleActivationPost (promoId) {
      this.$apollo.mutate({
        mutation: toggleActivationPostMut,
        variables: {
          id: promoId,
          isActive: this.promoInfo.isActive
        }
      }).then(data => {
        let messageChunk = this.promoInfo.isActive === true ? 'Activada' : 'Desactivada'
        this.$store.commit('setSnackbarMessage', 'Promocion ' + messageChunk)
        this.activateSwitchDialog = false
      })
    },
    deletePost () {
    },
    onEditMode () {
      this.$emit('on-edit-mode', this.promoInfo)
    }
  }
}
</script>


<style lang="stylus">

.created-at
  font-size 9px
.info-content
  margin-left 200px
.image-content
  position absolute
  top 0px
  width 200px
  height 100%
  left 0px
</style>
