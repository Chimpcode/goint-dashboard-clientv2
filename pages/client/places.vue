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
          v-for="(location, i) in allLocations"
          :key="i"
          :onDelete="deleteLocation"
        ></location-card>
        <new-card
          class="ma-2"
          :onClick="openNewLocationForm"></new-card>
      </v-flex>
      <v-flex xs6 sm4 class="overflowy">
        <place-card
          class="ma-2"
          :place-data="store"
          v-for="(store, i) in allStores"
          :key="i"
          :onDelete="deleteStore"
        ></place-card>
        <new-card
          class="ma-2"
          :onClick="openNewStoreForm"></new-card>
      </v-flex>
      <v-flex xs6 sm4 class="overflowy">
        <SectorCard
          class="ma-2"
          :cluster-data="group"
          v-for="(group, i) in allSectors"
          :key="i"
          :onDelete="deleteSector"
        ></SectorCard>
        <new-card
          class="ma-2"
          :onClick="openNewSectorForm"></new-card>
      </v-flex>
    </v-layout>

    <LocationForm
      :isOpen="locationFormIsOpen"
      :onClose="() => {locationFormIsOpen = false}"
      :onReturnData="createNewLocation"
    />

    <StoreForm
      :isOpen="storeFormIsOpen"
      :onClose="() => {storeFormIsOpen = false}"
      :onReturnData="createNewStore"
      />

    <SectorForm
      :isOpen="sectorFormIsOpen"
      :onClose="() => {sectorFormIsOpen = false}"
      :onReturnData="createNewSector"
    />

  </div>
</template>

<script>
  import PlaceCard from '~/components/store_card'
  import LocationCard from '~/components/location_card'
  import SectorCard from '~/components/sector_card'
  import NewCard from '~/components/new_card'

  import LocationForm from '~/components/location_form'
  import StoreForm from '~/components/store_form'
  import SectorForm from '~/components/sector_form'

  import {allLocationsQuery, addNewLocationMut, deleteLocationMut, editLocationMut} from '~/apollo/locations'
  import {allStoresQuery, addNewStoreMut, deleteStoreMut} from '~/apollo/stores'
  import {allSectorsQuery, addNewSectorMut, deleteSectorMut} from '~/apollo/sectors'

//  import gql from 'graphql-tag'

  export default {
    middleware: 'auth',
    layout: 'dashboard',
    name: 'Places',
    components: {
      PlaceCard, LocationCard, SectorCard, NewCard, LocationForm, StoreForm, SectorForm
    },
    data () {
      return {
        locationFormIsOpen: false,
        storeFormIsOpen: false,
        sectorFormIsOpen: false,
        allLocations: [
        ],
        allStores: [
        ],
        allSectors: [
        ]
      }
    },
    apollo: {
      allLocations: allLocationsQuery,
      allStores: allStoresQuery,
      allSectors: allSectorsQuery
    },
    methods: {
      openNewLocationForm () {
        console.log('opening location form')
        this.locationFormIsOpen = true
      },
      openNewStoreForm () {
        console.log('opening store form', this.storeFormIsOpen)
        this.storeFormIsOpen = true
      },
      openNewSectorForm () {
        console.log('opening sector form', this.sectorFormIsOpen)
        this.sectorFormIsOpen = true
      },
      createNewLocation (data) {
        console.log(data)
        this.$apollo.mutate({
          mutation: addNewLocationMut,
          variables: data,
          update: (store, { data: {createLocation} }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: allLocationsQuery })
            data.allLocations.push(createLocation)
            store.writeQuery({ query: allLocationsQuery, data })
            this.locationFormIsOpen = false
          }
        })
      },
      deleteLocation (id) {
        console.log(id)
        this.$apollo.mutate({
          mutation: deleteLocationMut,
          variables: {'id': id},
          update: (store, { data: {deleteLocation} }) => {
            // Read the data from our cache for this query.
            let data = store.readQuery({ query: allLocationsQuery })
            console.log(data)
            data.allLocations = data.allLocations.filter((el) => {
              return el.id !== deleteLocation.id
            })
            console.log(data)
            store.writeQuery({ query: allLocationsQuery, data })
            this.locationFormIsOpen = false
          }
        })
      },
      createNewStore (data) {
        console.log(data)
        this.$apollo.mutate({
          mutation: addNewStoreMut,
          variables: data,
          update: (store, { data: {createStore} }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: allStoresQuery })
            data.allStores.push(createStore)
            store.writeQuery({ query: allStoresQuery, data })
            this.storeFormIsOpen = false
          }
        })
      },
      deleteStore (id) {
        console.log(id)
        this.$apollo.mutate({
          mutation: deleteStoreMut,
          variables: {'id': id},
          update: (store, { data: {deleteStore} }) => {
            // Read the data from our cache for this query.
            let data = store.readQuery({ query: allStoresQuery })
            console.log(data)
            data.allStores = data.allStores.filter((el) => {
              return el.id !== deleteStore.id
            })
            console.log(data)
            store.writeQuery({ query: allStoresQuery, data })
            this.storeFormIsOpen = false
          }
        })
      },
      createNewSector (data) {
        console.log(data)
        this.$apollo.mutate({
          mutation: addNewSectorMut,
          variables: data,
          update: (store, { data: {createSector} }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: allSectorsQuery })
            data.allSectors.push(createSector)
            store.writeQuery({ query: allSectorsQuery, data })
            this.sectorFormIsOpen = false
          }
        })
      },
      deleteSector (id) {
        console.log(id)
        this.$apollo.mutate({
          mutation: deleteSectorMut,
          variables: {'id': id},
          update: (store, { data: {deleteSector} }) => {
            // Read the data from our cache for this query.
            let data = store.readQuery({ query: allSectorsQuery })
            console.log(data)
            data.allSectors = data.allSectors.filter((el) => {
              return el.id !== deleteSector.id
            })
            console.log(data)
            store.writeQuery({ query: allSectorsQuery, data })
            this.sectorFormIsOpen = false
          }
        })
      },
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
