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
        ></location-card>
        <new-card
          class="ma-2"
          :onClick="openNewLocation"></new-card>
      </v-flex>
      <v-flex xs6 sm4 class="overflowy">
        <place-card
          class="ma-2"
          :place-data="store"
          v-for="(store, i) in allStores"
          :key="i"></place-card>
        <new-card
          class="ma-2"
          :onClick="openNewStore"></new-card>
      </v-flex>
      <v-flex xs6 sm4 class="overflowy">
        <cluster-card
          class="ma-2"
          :cluster-data="group"
          v-for="(group, i) in allSectors"
          :key="i"></cluster-card>
        <new-card
          class="ma-2"
          @on-open-form="openNewSector"></new-card>
      </v-flex>
    </v-layout>

    <LocationForm
      :isOpen="locationFormIsOpen"
      :onClose="()=>{locationFormIsOpen = false}"
    >

    </LocationForm>
  </div>
</template>

<script>
  import PlaceCard from '~/components/store_card'
  import LocationCard from '~/components/location_card'
  import ClusterCard from '~/components/cluster_card'
  import NewCard from '~/components/new_card'
  import LocationForm from '~/components/location_form'

  import {allLocationsQuery} from '~/apollo/locations'
  import {allStoresQuery} from '~/apollo/stores'
  import {allSectorsQuery} from '~/apollo/sectors'

  export default {
    middleware: 'auth',
    layout: 'dashboard',
    name: 'Places',
    components: {
      PlaceCard, LocationCard, ClusterCard, NewCard, LocationForm
    },
    data () {
      return {
        locationFormIsOpen: false,
        openFormTrigger: '',
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
      openNewLocation () {
        console.log('opening location form')
        this.locationFormIsOpen = true
      },
      openNewStore () {
      },
      openNewSector () {
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
