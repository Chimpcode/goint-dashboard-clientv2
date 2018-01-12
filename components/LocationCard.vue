<template>
  <md-card id="locationcard">
    <md-card-header>
      <div class="md-title">
          <div class="idkey">{{locationData.id}}</div>
          <h3 class="headline mb-0 mt-2">
            {{locationData.position.lat}},
             {{locationData.position.lng}}
          </h3>
          <div>{{locationData.address}}
          </div>
      </div>
    </md-card-header>
    <md-card-actions class="roboto">

      <md-tooltip md-direction="bottom">
          <md-button flat icon color="primary" slot="activator"
                 @click.native.stop="deleteLocation(locationData.id)"
          class="">
            <md-icon>delete</md-icon>
          </md-button>
          <span>Eliminar Ubicacion?</span>
      </md-tooltip>

      <md-tooltip md-direction="bottom">
        <md-button flat icon color="primary"
               class="" slot="activator"
               @click.native.stop="onEditLocation">
          <md-icon>mode_edit</md-icon>
        </md-button>
        <span>Editar?</span>
      </md-tooltip>
    </md-card-actions>
  </md-card>
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
