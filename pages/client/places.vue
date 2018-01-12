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
          v-for="(location, i) in allLocations"
          :key="i"
        ></location-card>
        <new-card
          class="ma-2"
          kind-card="ubicacion"
          :onOpen="openForm"></new-card>
      </v-flex>
      <v-flex xs6 sm4 class="overflowy">
        <place-card
          class="ma-2"
          :place-data="store"
          v-for="(store, i) in allStores"
          @on-edit-store="editStore"
          @refresh-data="refreshData"
          :key="i"></place-card>
        <new-card
          class="ma-2"
          kind-card="tienda"
          @on-open-form="openForm"></new-card>
      </v-flex>
      <v-flex xs6 sm4 class="overflowy">
        <cluster-card
          class="ma-2"
          :cluster-data="group"
          @on-edit-cluster="editCluster"
          @refresh-data="refreshData"
          v-for="(group, i) in allSectors"
          :key="i"></cluster-card>
        <new-card
          class="ma-2"
          kind-card="sector"
          @on-open-form="openForm"></new-card>
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
  import PlaceCard from '~/components/store_card'
  import LocationCard from '~/components/location_card'
  import ClusterCard from '~/components/cluster'
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
        editData: undefined,
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
