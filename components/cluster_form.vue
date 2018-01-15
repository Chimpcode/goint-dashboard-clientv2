<template>
  <v-dialog v-model="isOpen" :width="typeDialog[kindForm]" persistent>
    <v-card>
      <v-card-text>
        <v-btn @click.native.stop="closeDialog" flat icon style="float: right;">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-title class="title"> Agregar Sector </v-card-title>
      <v-card-text>
        <v-text-field v-model="internalData.name" label="Nombre" name="sectorName"/>
        <v-select
          :items="allStores"
          v-model="internalData.stores"
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


    </v-card>
  </v-dialog>

</template>

<script>
  import { allStoresQuery } from '~/apollo/stores'
  export default {
    name: 'ClusterForm',
    props: {
      isOpen: Boolean,
      onClose: Function,
      onReturnData: Function
    },
    data () {
      return {
        state: false,
        internalData: {},
        allStores: []
      }
    }
  }
</script>

<style>

</style>
