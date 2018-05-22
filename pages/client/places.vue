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
          :onEdit="openLocationForm"
        ></location-card>
        <new-card
          class="ma-2"
          :onClick="openLocationForm"></new-card>
      </v-flex>
      <v-flex xs6 sm4 class="overflowy">
        <place-card
          class="ma-2"
          :place-data="store"
          v-for="(store, i) in allStores"
          :key="i"
          :onDelete="deleteStore"
          :onEdit="openStoreForm"
        ></place-card>
        <new-card
          class="ma-2"
          :onClick="openStoreForm"></new-card>
      </v-flex>
      <v-flex xs6 sm4 class="overflowy">
        <SectorCard
          class="ma-2"
          :cluster-data="group"
          v-for="(group, i) in allSectors"
          :key="i"
          :onEdit="openSectorForm"
          :onDelete="deleteSector"
        ></SectorCard>
        <new-card
          class="ma-2"
          :onClick="openSectorForm"></new-card>
      </v-flex>
    </v-layout>

    <LocationForm
      :isOpen="locationFormIsOpen"
      :onClose="() => {locationFormIsOpen = false}"
      :onReturnData="createEditNewLocation"
    />

    <StoreForm
      :isOpen="storeFormIsOpen"
      :onClose="() => {storeFormIsOpen = false}"
      :onReturnData="createEditNewStore"
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

  // editLocationMut
  import {allLocationsQuery, addNewLocationMut, updateLocationMut, deleteLocationMut} from '~/apollo/locations'
  import {allStoresQuery, addNewStoreMut, updateStoreMut, deleteStoreMut} from '~/apollo/stores'
  import {allSectorsQuery, addNewSectorMut, updateSectorMut, deleteSectorMut} from '~/apollo/sectors'

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
        ],
        companyId: this.$store.state.auth.user.id
      }
    },
    apollo: {
      allLocations: {
        query: allLocationsQuery,
        variables () {
          let companyId = this.$store.state.auth.user.id
          return {
            companyid: companyId
          }
        },
        update ({ allLocations }) {
          // The field is different from 'tasks'
          return allLocations
        }
      },
      allStores: {
        query: allStoresQuery,
        variables () {
          let companyId = this.$store.state.auth.user.id
          return {
            companyid: companyId
          }
        },
        update ({ allStores }) {
          // The field is different from 'tasks'
          return allStores
        }
      },
      allSectors: {
        query: allSectorsQuery,
        variables () {
          let companyId = this.$store.state.auth.user.id
          return {
            companyid: companyId
          }
        },
        update ({ allSectors }) {
          // The field is different from 'tasks'
          return allSectors
        }
      }
    },
    created () {
      // console.log(this.$store.state.auth.user.id)
      // this.companyId = this.$store.state.auth.user.id
      // this.$apollo.queries.allLocations
    },
    methods: {
      openLocationForm (clean) {
        if (clean) {
          this.$store.commit('placesForm/clean')
        }
        console.log('opening location form')
        this.locationFormIsOpen = true
      },
      openStoreForm (clean) {
        if (clean) {
          this.$store.commit('placesForm/clean')
        }
        console.log('opening store form', this.storeFormIsOpen)
        this.storeFormIsOpen = true
      },
      openSectorForm (clean) {
        if (clean) {
          this.$store.commit('placesForm/clean')
        }
        console.log('opening sector form', this.sectorFormIsOpen)
        this.sectorFormIsOpen = true
      },
      createEditNewLocation (data) {
        const userId = this.$store.state.auth.user.id
        data.byid = userId

        let query = null
        if (data.edit === true) {
          query = updateLocationMut
        } else {
          query = addNewLocationMut
        }

        console.log(data)
        this.$apollo.mutate({
          mutation: query,
          variables: data,
          update: (store, { data: {createLocation, updateLocation} }) => {
            // Read the data from our cache for this query.
            if (data.edit) {
              console.log('edit')
              this.locationFormIsOpen = false
            } else {
              const locationsQuery = { query: allLocationsQuery, variables: { companyid: userId } }
              const cached = store.readQuery(locationsQuery)
              cached.allLocations.push(createLocation)
              store.writeQuery({ ...locationsQuery, data: cached })
              this.locationFormIsOpen = false
            }
          }
        })
      },
      deleteLocation (id) {
        const userId = this.$store.state.auth.user.id
        console.log(id)
        this.$apollo.mutate({
          mutation: deleteLocationMut,
          variables: {'id': id},
          update: (store, { data: {deleteLocation} }) => {
            // Read the data from our cache for this query.
            const locationsQuery = { query: allLocationsQuery, variables: { companyid: userId } }
            let data = store.readQuery(locationsQuery)
            console.log(data)
            data.allLocations = data.allLocations.filter((el) => {
              return el.id !== deleteLocation.id
            })
            console.log(data)
            store.writeQuery({ ...locationsQuery, data })
            this.locationFormIsOpen = false
          }
        })
      },
      createEditNewStore (data) {
        const userId = this.$store.state.auth.user.id
        data.byid = userId

        let query = null
        if (data.edit === true) {
          query = updateStoreMut
        } else {
          query = addNewStoreMut
        }

        this.$apollo.mutate({
          mutation: query,
          variables: data,
          update: (store, { data: {createStore, updateStore} }) => {
            // Read the data from our cache for this query.
            if (data.edit) {
              console.log('edit')
              this.storeFormIsOpen = false
            } else {
              const storesQuery = { query: allStoresQuery, variables: { companyid: userId } }
              const cached = store.readQuery(storesQuery)
              cached.allStores.push(createStore)
              store.writeQuery({ ...storesQuery, data: cached })
              this.storeFormIsOpen = false
            }
          }
        })
      },
      deleteStore (id) {
        const userId = this.$store.state.auth.user.id
        console.log(id)
        this.$apollo.mutate({
          mutation: deleteStoreMut,
          variables: {'id': id},
          update: (store, { data: {deleteStore} }) => {
            const storesQuery = { query: allStoresQuery, variables: { companyid: userId } }
            const cached = store.readQuery(storesQuery)
            cached.allStores = cached.allStores.filter(store => {
              return store.id !== id
            })
            store.writeQuery({...storesQuery, data: cached})
          }
        })
      },
      createNewSector (data) {
        // updateSectorMut
        const userId = this.$store.state.auth.user.id
        data.byid = userId
        let query = null
        if (data.edit === true) {
          query = updateSectorMut
        } else {
          query = addNewSectorMut
        }

        console.log(data)
        this.$apollo.mutate({
          mutation: query,
          variables: data,
          update: (store, { data: {createSector, updateSector} }) => {
            // Read the data from our cache for this query.
            if (data.edit) {
              this.sectorFormIsOpen = false
            } else {
              const sectorsQuery = { query: allSectorsQuery, variables: { companyid: userId } }
              const cached = store.readQuery(sectorsQuery)
              cached.allSectors.push(createSector)
              store.writeQuery({ ...sectorsQuery, data: cached })
              this.sectorFormIsOpen = false
            }
          }
        })
      },
      deleteSector (id) {
        const userId = this.$store.state.auth.user.id
        console.log(id)
        this.$apollo.mutate({
          mutation: deleteSectorMut,
          variables: {'id': id},
          update: (store, { data: {deleteSector} }) => {
            // Read the data from our cache for this query.
            const sectorsQuery = { query: allSectorsQuery, variables: { companyid: userId } }
            let cached = store.readQuery(sectorsQuery)
            console.log(cached)
            cached.allSectors = cached.allSectors.filter((el) => {
              return el.id !== id
            })
            console.log(cached)
            store.writeQuery({ ...sectorsQuery, data: cached })
            this.sectorFormIsOpen = false
          }
        })
      }
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
