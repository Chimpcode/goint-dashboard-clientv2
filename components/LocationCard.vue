<template>
  <v-card light id="locationcard">
    <v-card-title primary-title>
    <div>
        <div class="idkey">{{locationData.id}}</div>
        <h3 class="headline mb-0 mt-2">
          {{locationData.position.lat}},
           {{locationData.position.lng}}
        </h3>
        <div>{{locationData.address}}
        </div>
    </div>
    </v-card-title>
    <v-card-actions class="roboto">
      <v-spacer/>
      <v-tooltip bottom>
          <v-btn flat icon color="primary" slot="activator"
                 @click.native.stop="deleteLocation(locationData.id)"
          class="">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Eliminar Ubicacion?</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn flat icon color="primary"
               class="" slot="activator"
               @click.native.stop="onEditLocation">
          <v-icon>mode_edit</v-icon>
        </v-btn>
        <span>Editar?</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import { EventBus } from '~/bus/index'

export default {
  name: 'LocationCard',
  props: {
    locationData: Object
  },
  data () {
    return {
    }
  },
  methods: {
    onEditLocation () {
      this.$emit('on-edit-location', this.locationData)
    },
    deleteLocation (id) {
      EventBus.$emit('is-shot-loading', true)
      this.$graphito.call_mutation('deleteLocation', { id: id })
        .then(res => {
          this.$emit('refresh-data', true)
          EventBus.$emit('is-shot-loading', false)
        }, err => {
          console.log(err)
          EventBus.$emit('is-shot-loading', false)
        })
    }
  }
}
</script>


<style lang="stylus">

.idkey
  font-size 9px
</style>
