<template>
  <div>
    <v-dialog v-model="isOpen" :width="typeDialog[kindForm]" persistent>
      <v-card>
        <v-card-text>
          <v-btn @click.native.stop="closeDialog" flat icon style="float: right;">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-text>

        <template v-if="kindForm === 'ubicacion'">
          <v-card-title class="title mb-4"> {{ editData === undefined ? 'Agregar' : 'Editar' }} Ubicacion &nbsp;<span class="green--text">{{infomessage}}</span></v-card-title>
          <gmap-map
            :options="{styles: styles}"
            :center="center"
            :zoom="13"
            map-type-id="terrain"
            style="width: 100%; height: 300px"
          >
            <gmap-marker
              :position="locationForm.position"
              :clickable="true"
              :draggable="true"
              @position_changed="updateMarker(locationForm, $event)"
            />
          </gmap-map>
          <v-card-text>
            <div>
              <h5>{{locationForm.position.lng}}, {{locationForm.position.lat}}</h5>
            </div>
            <v-text-field v-model="locationForm.address" label="Direccion" name="locationAddress"/>
          </v-card-text>
          <v-card-actions class="roboto">
            <v-spacer/>
            <v-tooltip bottom>
              <v-btn flat color="primary"
                     class="" slot="activator" @click.native.stop="createNewLocation">
                <v-icon>{{ editData === undefined ? 'add' : 'edit' }}</v-icon>
                {{ editData === undefined ? 'Crear' : 'Editar' }}
              </v-btn>
              <span>Crear?</span>
            </v-tooltip>
          </v-card-actions>
        </template>

        <template v-if="kindForm === 'tienda'">
          <v-card-title class="title"> {{ editData === undefined ? 'Agregar' : 'Editar' }} Tienda &nbsp;<span class="green--text">{{infomessage}}</span></v-card-title>
          <v-card-text>
            <v-text-field v-model="tiendaForm.name" label="Nombre" name="tiendaName"/>
            <v-text-field v-model="tiendaForm.description" label="Descripcion" name="tiendaDescription"/>
            <v-select
              :items="locations"
              v-model="tiendaForm.locations"
              multiple
              chips
              autocomplete
              label="Inserte ubicaciones"
              item-value="id"
              item-text="address"
            />
          </v-card-text>
          <v-card-actions class="roboto">
            <v-spacer/>
            <v-tooltip bottom>
              <v-btn flat color="primary"
                     class="" slot="activator" @click.native.stop="createNewStore">
                <v-icon>{{ editData === undefined ? 'add' : 'edit' }}</v-icon>
                {{ editData === undefined ? 'Crear' : 'Editar' }}
              </v-btn>
              <span>Crear?</span>
            </v-tooltip>
          </v-card-actions>
        </template>


        <template v-if="kindForm === 'sector'">
          <v-card-title class="title"> {{ editData === undefined ? 'Agregar' : 'Editar' }} Sector &nbsp;<span class="green--text">{{infomessage}}</span></v-card-title>
          <v-card-text>
            <v-text-field v-model="sectorForm.name" label="Nombre" name="sectorName"/>
            <v-select
              :items="stores"
              v-model="sectorForm.stores"
              multiple
              chips
              autocomplete
              label="Inserte tiendas"
              item-value="id"
              item-text="name"
            />
          </v-card-text>
          <v-card-actions class="roboto">
            <v-spacer/>

            <v-btn flat color="primary"
                   class="" @click.native.stop="createNewCluster">
              <v-icon>{{ editData === undefined ? 'add' : 'edit' }}</v-icon>
              {{ editData === undefined ? 'Crear' : 'Editar' }}
            </v-btn>
          </v-card-actions>
        </template>


      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { EventBus } from '~/bus/index'

  export default {
    name: 'LocationForm',
    props: {
      kindForm: String,
      editData: { type: Object, default: undefined },
      locations: Array,
      stores: Array
    },
    computed: {
      isOpen: {
        get: function () {
          // console.log('kindform', this.kindForm)
          if (this.kindForm === '' || this.kindForm === undefined) {
            return false
          }
          return true
        },
        set: function (newValue) {
          return newValue
        }
      },
      sectorForm: {
        get: function () {
          if (this.editData === undefined) {
            return { name: '' }
          } else {
            return this.editData
          }
        },
        set: function (value) {
          this.editData.name = value.name
          this.editData.stores = value.stores
        }
      },
      tiendaForm: {
        get: function () {
          if (this.editData === undefined) {
            return { name: '', description: '' }
          } else {
            return this.editData
          }
        }
      },
      locationForm: {
        get: function () {
          if (this.editData === undefined) {
            return { address: '', position: {lat: -12.117992, lng: -77.030646} }
          } else {
            return this.editData
          }
        }
      }
    },
    data () {
      return {
        infomessage: '',
        center: { lat: -12.117992, lng: -77.030646 },
        styles: [
          {
            'featureType': 'administrative.locality',
            'elementType': 'all',
            'stylers': [
              {
                'hue': '#ff0200'
              },
              {
                'saturation': 7
              },
              {
                'lightness': 19
              },
              {
                'visibility': 'on'
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'saturation': '-3'
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#748ca3'
              }
            ]
          },
          {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [
              {
                'hue': '#ff0200'
              },
              {
                'saturation': -100
              },
              {
                'lightness': 100
              },
              {
                'visibility': 'simplified'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [
              {
                'hue': '#ff0200'
              },
              {
                'saturation': '23'
              },
              {
                'lightness': '20'
              },
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'poi.school',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#ffdbda'
              },
              {
                'saturation': '0'
              },
              {
                'visibility': 'on'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [
              {
                'hue': '#ff0200'
              },
              {
                'saturation': '100'
              },
              {
                'lightness': 31
              },
              {
                'visibility': 'simplified'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#f39247'
              },
              {
                'saturation': '0'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'labels',
            'stylers': [
              {
                'hue': '#008eff'
              },
              {
                'saturation': -93
              },
              {
                'lightness': 31
              },
              {
                'visibility': 'on'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'color': '#ffe5e5'
              },
              {
                'saturation': '0'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'labels',
            'stylers': [
              {
                'hue': '#bbc0c4'
              },
              {
                'saturation': -93
              },
              {
                'lightness': -2
              },
              {
                'visibility': 'simplified'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'labels.text',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'geometry',
            'stylers': [
              {
                'hue': '#ff0200'
              },
              {
                'saturation': -90
              },
              {
                'lightness': -8
              },
              {
                'visibility': 'simplified'
              }
            ]
          },
          {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [
              {
                'hue': '#e9ebed'
              },
              {
                'saturation': 10
              },
              {
                'lightness': 69
              },
              {
                'visibility': 'on'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [
              {
                'hue': '#e9ebed'
              },
              {
                'saturation': -78
              },
              {
                'lightness': 67
              },
              {
                'visibility': 'simplified'
              }
            ]
          }
        ], // styles here ],
        typeDialog: {
          sector: '40%',
          tienda: '40%',
          ubicacion: '85%'
        }
        // sectorForm: {
        //   name: ''
        // },
        // tiendaForm: {
        //   name: '',
        //   description: ''
        // },
        // locationForm: {
        //   address: '',
        //   position: {lat: -12.122369, lng: -77.030339}
        // },
        // these are goint to be fetched
        // locations: [],
        // stores: []
      }
    },
    methods: {
      closeDialog: function () {
        this.$emit('on-close-dialog', false)
        this.infomessage = ''
        if (this.editData === undefined) {
          // cluster
          this.sectorForm.name = ''
          // store
          this.tiendaForm.name = ''
          this.tiendaForm.description = ''
          // location
          this.locationForm.address = ''
        }
      },
      createNewCluster: function () {
        let self = this
        if (this.editData === undefined) {
          EventBus.$emit('is-short-loading', true)

          console.log(self.sectorForm.stores)
          self.$graphito.call_mutation('createSector',
            {
              name: self.sectorForm.name,
              storesIds: self.sectorForm.stores
            }
          ).then(res => {
            EventBus.$emit('is-short-loading', false)
            EventBus.$emit('snackbar-message', 'Dato creado')
            this.infomessage = 'Nuevo sector ha sido creado'

            console.log(res)
            this.sectorForm.id = res.createSector.id
            this.$emit('on-create-cluster', this.sectorForm)
          }, err => {
            console.log(err)
            EventBus.$emit('is-short-loading', false)
            // EventBus.$emit('snackbar-message', err)
          })
        } else {
          let self = this
          EventBus.$emit('is-short-loading', true)
          if (this.kindForm === 'sector') {
            this.$graphito.call_mutation('updateSector', {
              id: self.editData.id,
              name: self.editData.name,
              storesIds: self.editData.stores
            })
              .then(res => {
                this.infomessage = 'Sector editado'
                EventBus.$emit('is-short-loading', false)
                this.$emit('refresh-data', true)
              }).catch(err => {
                console.log(err)
                EventBus.$emit('is-short-loading', false)
              })
          }
        }
      },
      createNewStore: function () {
        let self = this
        if (this.editData === undefined) {
          EventBus.$emit('is-short-loading', true)

          self.$graphito.call_mutation('createStore',
            {
              name: self.tiendaForm.name,
              description: self.tiendaForm.description,
              locationsIds: self.tiendaForm.positions
            }
          ).then(res => {
            EventBus.$emit('is-short-loading', false)
            EventBus.$emit('snackbar-message', 'Dato creado')
            this.infomessage = 'Nueva tienda ha sido creada'

            this.tiendaForm.id = res.createStore.id
            this.$emit('on-create-store', this.tiendaForm)
          }, err => {
            console.log(err)
            EventBus.$emit('is-short-loading', false)
            // EventBus.$emit('snackbar-message', err)
          })
        } else {
          let self = this
          EventBus.$emit('is-short-loading', true)
          if (this.kindForm === 'tienda') {
            this.$graphito.call_mutation('updateStore', {
              id: self.editData.id,
              name: self.editData.name,
              description: self.editData.description,
              locationsIds: self.editData.locations
            })
              .then(res => {
                this.infomessage = 'Tienda editada'
                EventBus.$emit('is-short-loading', false)
                this.$emit('refresh-data', true)
              }).catch(err => {
                console.log(err)
                EventBus.$emit('is-short-loading', false)
              })
          }
        }
      },
      createNewLocation: function () {
        let self = this
        if (this.editData === undefined) {
          EventBus.$emit('is-short-loading', true)

          self.$graphito.call_mutation('createLocation',
            {
              longitude: self.locationForm.position.lng,
              latitude: self.locationForm.position.lat,
              address: self.locationForm.address
            }
          ).then(res => {
            EventBus.$emit('is-short-loading', false)
            // EventBus.$emit('snackbar-message', 'Dato creado')
            this.infomessage = 'Nueva ubicacion ha sido creada'

            this.locationForm.id = res.createLocation.id
            this.$emit('on-create-location', this.locationForm)
          }, err => {
            console.log(err)
            EventBus.$emit('is-short-loading', false)
            // EventBus.$emit('snackbar-message', err)
          })
        } else {
          let self = this
          // console.log(self.editData)
          EventBus.$emit('is-short-loading', true)
          if (this.kindForm === 'ubicacion') {
            this.$graphito.call_mutation('updateLocation', {
              id: self.editData.id,
              address: self.editData.address,
              longitude: self.editData.position.lng,
              latitude: self.editData.position.lat
            })
              .then(res => {
                this.infomessage = 'Localizacion editada'
                EventBus.$emit('is-short-loading', false)
                this.$emit('refresh-data', true)
              }).catch(err => {
                console.log(err)
                EventBus.$emit('is-short-loading', false)
              })
          }
        }
      },
      updateMarker: function (object, event) {
        object.position = {
          lat: event.lat(),
          lng: event.lng()
        }
      },
      handleLocationError: function (browserHasGeolocation) {
        this.infomessage =
          (browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.')
      }
    },
    ready: function () {
      // var infoWindow = new google.maps.InfoWindow({map: map});

      var self = this
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }

          // infoWindow.setPosition(pos)
          // infoWindow.setContent('Location found.')
          self.center.lat = pos.lat
          self.center.lng = pos.lng

          self.locationForm.position.lat = pos.lat
          self.locationForm.position.lng = pos.lng
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
