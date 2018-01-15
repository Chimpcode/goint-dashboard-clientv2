<template>
  <no-ssr>
    <v-dialog v-model="isOpen" :width="'40%'" persistent>
      <v-card>
        <v-card-text>
          <v-btn @click.native.stop="closeDialog" flat icon style="float: right;">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-title class="title mb-4"> {{ editData? 'Editar' : 'Agregar' }} Ubicacion</v-card-title>
        <gmap-map
          :options="{styles: gmapStyles}"
          :center="center"
          :zoom="13"
          map-type-id="terrain"
          style="width: 100%; height: 300px"
        >
          <gmap-marker
            :position="editData?editData:currentLocation"
            :clickable="true"
            :draggable="true"
            @position_changed="updateMarker(currentLocation, $event)"
          />
        </gmap-map>
        <v-card-text>
          <div>
            <h5>{{currentLocation.lng}}, {{currentLocation.lat}}</h5>
          </div>
          <v-text-field v-model="currentLocation.address" label="Direccion" name="locationAddress"/>
        </v-card-text>
        <v-card-actions class="roboto">
          <v-spacer/>
          <v-tooltip bottom>
            <v-btn flat color="primary"
                   class="" slot="activator" @click.native.stop="createNewLocation">
              <v-icon>{{ editData? 'edit' : 'add' }}</v-icon>
              {{ editData? 'Editar' : 'Crear' }}
            </v-btn>
            <span>Crear?</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </no-ssr>

</template>

<script>
  import gmapsStyles from '~/assets/gmaps_styles'
  export default {
    name: 'LocationForm',
    props: {
      editData: Object,
      onClose: Function,
      onReturnData: Function,
      isOpen: Boolean
    },
    data () {
      return {
        currentLocation: {lat: -12.117992, lng: -77.030646},
        editedLocation: {},
        opened: false,
        gmapStyles: gmapsStyles,
        center: { lat: -12.117992, lng: -77.030646 }
      }
    },
    methods: {
      closeDialog: function () {
        if (this.onClose) {
          this.onClose()
        }
        this.opened = false
      },
      createNewLocation: function () {
        if (this.onReturnData) {
          this.onReturnData(this.currentLocation)
        }
      },
      updateMarker: function (object, event) {
        object.position = {
          lat: event.lat(),
          lng: event.lng()
        }
        this.currentLocation.lat = event.lat()
        this.currentLocation.lng = event.lng()
      },
      handleLocationError: function (browserHasGeolocation) {
        this.infomessage =
          (browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.')
      }
    },
    mounted: function () {
      let self = this
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          self.center.lat = pos.lat
          self.center.lng = pos.lng

          self.currentLocation.lat = pos.lat
          self.currentLocation.lng = pos.lng
        }, function () {
          self.handleLocationError(true)
        })
      } else {
        // Browser doesn't support Geolocation
        self.handleLocationError(false)
      }


    }
  }
</script>

<style lang="stylus">

</style>
