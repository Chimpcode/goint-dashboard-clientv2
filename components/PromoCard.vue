<template>
  <v-card light>
    <div :class="[ 'image-content', color]">
      <img :src="promoData.image" width="100%" height="100%"/>
    </div>
    <div class="info-content">
      <v-card-title primary-title>
      <div>
          <div class="created-at">{{promoData.createdAt}}</div>
          <h3 class="headline mb-0 mt-2">{{promoData.title}}</h3>
          <div>{{promoData.description}}
          </div>
      </div>
      </v-card-title>
      <v-card-actions class="roboto">
        <v-tooltip bottom>
            <v-btn flat color="primary" slot="activator">
            <v-icon>local_activity</v-icon> &nbsp; {{promoData.stock}}
            </v-btn>
            <span>Cupones restantes</span>
        </v-tooltip>
        <v-tooltip bottom>
            <v-btn flat color="primary" slot="activator">
            <v-icon>event</v-icon> &nbsp; {{promoData.finishDate}}
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
              <v-btn color="primary" flat @click.native.stop="toggleActivationPost(promoData)">SI</v-btn>
              <v-btn color="" flat @click.stop="() => {activateSwitchDialog=false; promoData.isActive = !promoData.isActive}">NO</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-switch :hide-details="true" color="primary" @click.native.stop="activateSwitchDialog = true" :label="promoData.isActive?'Activo':'Desactivo'" v-model="promoData.isActive"></v-switch>
        <v-btn flat color="primary" @click.native.stop="onEditMode">EDITAR</v-btn>

        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-btn flat color="primary" slot="activator">Eliminar</v-btn>
          <v-card>
            <v-card-title>
              Estas seguro que deseas eliminar esta promocion?
            </v-card-title>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary" flat @click.stop="deletePost">Eliminar</v-btn>
              <v-btn color="" flat @click.stop="deleteDialog=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { EventBus } from '~/bus/index'

export default {
  name: 'PromoCard',
  props: {
    color: String,
    promoData: Object
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
    toggleActivationPost () {
      EventBus.$emit('is-short-loading', true)
      this.$graphito.call_mutation('updatePost', { id: this.promoData.id, isActive: this.promoData.isActive })
        .then(res => {
          EventBus.$emit('is-short-loading', false)
          this.activateSwitchDialog = false
        }, err => {
          console.log(err)
          EventBus.$emit('is-short-loading', false)
          this.activateSwitchDialog = false
        })
    },
    onEditMode: function () {
      this.$emit('on-edit-mode', true)
    },
    deletePost: function () {
      this.$graphito.call_mutation('deletePost', { id: this.promoData.id })
        .then(res => {
          this.$emit('on-delete', true)
          this.deleteDialog = false
        }, err => {
          console.log(err)
          this.deleteDialog = false
        })
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
