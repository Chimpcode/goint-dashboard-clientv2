<template>
  <div id="places">
    <v-layout row wrap>
      <v-flex xs6 sm4>
        <div
          class="ma-2 pa-2">
          <span class="title-header">Puntos de ubicacion</span>
        </div>
      </v-flex>
      <v-flex xs6 sm4>
        <div
          class="ma-2 pa-2">
          <span class="title-header">Tiendas</span>
        </div>
      </v-flex>
      <v-flex xs6 sm4>
        <div
          class="ma-2 pa-2">
          <span class="title-header">Sectores</span>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row style="height: 85vh;">

      <v-flex xs6 sm4 class="overflowy">
        <location-card
          class="ma-2"
          :location-data="location"
          @on-edit-location="editLocation"
          @refresh-data="refreshData"
          v-for="(location, i) in locations"
          :key="i"
        />
        <new-card
          class="ma-2"
          kind-card="ubicacion"
          @on-open-form="openForm"/>
      </v-flex>
      <v-flex xs6 sm4 class="overflowy">
        <place-card
          class="ma-2"
          :place-data="store"
          v-for="(store, i) in stores"
          @on-edit-store="editStore"
          @refresh-data="refreshData"
          :key="i"/>
        <new-card
          class="ma-2"
          kind-card="tienda"
          @on-open-form="openForm"/>
      </v-flex>
      <v-flex xs6 sm4 class="overflowy">
        <cluster-card
          class="ma-2"
          :cluster-data="group"
          @on-edit-cluster="editCluster"
          @refresh-data="refreshData"
          v-for="(group, i) in groups"
          :key="i"/>
        <new-card
          class="ma-2"
          kind-card="sector"
          @on-open-form="openForm"/>
      </v-flex>
    </v-layout>
    <LocationForm
      :kind-form="openFormTrigger"
      :editData="editData"
      :locations="locations"
      :stores="stores"
      @refresh-data="refreshData"
      @on-close-dialog="onCloseLocationForm"
      @on-create-location="onCreateLocation"
      @on-create-cluster="onCreateCluster"
      @on-create-store="onCreateStore">
    </LocationForm>
  </div>
</template>

<script>
  import PlaceCard from '~/components/StoreCard'
  import LocationCard from '~/components/LocationCard'
  import ClusterCard from '~/components/ClusterCard'
  import NewCard from '~/components/NewCard'
  import LocationForm from '~/components/LocationForm'
  import { EventBus } from '~/bus/index'

  export default {
    middleware: 'auth',
    layout: 'dashboard',
    name: 'Places',
    components: {
      PlaceCard, LocationCard, ClusterCard, NewCard, LocationForm
    },
    data () {
      return {
        editData: undefined,
        openFormTrigger: '',
        locations: [
        ],
        stores: [
        ],
        groups: [
        ]
      }
    },
    methods: {
      editCluster (clusterData) {
        this.openFormTrigger = 'sector'
        this.editData = clusterData
      },
      editStore (storeData) {
        this.openFormTrigger = 'tienda'
        this.editData = storeData
      },
      editLocation (storeLocation) {
        this.openFormTrigger = 'ubicacion'
        this.editData = storeLocation
      },
      openForm: function (kindForm) {
        // console.log('click places', kindForm)
        this.editData = undefined
        this.openFormTrigger = kindForm
      },
      onCloseLocationForm: function (closeValue) {
        this.openFormTrigger = ''
      },
      onCreateCluster: function (newCluster) {
        // console.log(newCluster)
        this.groups.push({
          id: newCluster.id,
          name: newCluster.name,
          stores: newCluster.tiendas
        })
      },
      onCreateStore: function (newStore) {
        // console.log(newStore)
        this.stores.push({
          id: newStore.id,
          name: newStore.name,
          description: newStore.description,
          locations: newStore.positions
        })
      },
      onCreateLocation: function (newLocation) {
        // console.log(newLocation)
        this.locations.push({
          id: newLocation.id,
          address: newLocation.address,
          position: newLocation.position
        })
      },
      fetchDependencies () {
        return new Promise((resolve, reject) => {
          this.$graphito.call_query('fetchAllLocations')
            .then(res => {
              this.locations = res.allLocations.map(location => {
                location.position = {}
                location.position.lat = location.latitude
                location.position.lng = location.longitude
                return location
              })
              return this.$graphito.call_query('fetchAllStores')
            }).then(res => {
              this.stores = res.allStores
              return this.$graphito.call_query('fetchAllSectors')
            }).then(res => {
              this.groups = res.allSectors
              resolve(true)
            }).catch(err => { reject(err) })
        })
      },
      refreshData () {
        EventBus.$emit('is-loading', true)
        this.fetchDependencies().then(res => {
          EventBus.$emit('is-loading', false)
        }, err => {
          console.log(err)
          EventBus.$emit('is-loading', false)
        })
      }
    },
    created () {
      this.refreshData()
    }
  }
</script>

<style lang="stylus">

  // body, html
  //   height: 100%

  #places
    position relative
    overflow-x auto

  .title-header
    font-size 18px
    font-weight bold
    position relative
    top 9px

  .overflowy
    overflow-y auto
</style>
