<template>
    <v-dialog v-model="isOpen" :width="'60%'" persistent>
      <v-card>
        <v-card-text>
          <v-btn @click.native.stop="closeDialog" flat icon style="float: right;">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-title class="title"> Agregar nueva Tienda </v-card-title>
        <v-card-text>
          <v-text-field v-model="internalData.name" label="Nombre" name="tiendaName"/>
          <v-text-field v-model="internalData.description" label="Descripcion" name="tiendaDescription"/>
          <v-select
            :items="allLocations"
            v-model="internalData.locations"
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
                   class="" slot="activator" @click.native.stop="returnData(internalData)">
              <v-icon> add </v-icon>
              Crear
            </v-btn>
            <span>Crear?</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  import { allLocationsQuery } from '~/apollo/locations'

  export default {
    name: 'StoreForm',
    props: {
      isOpen: Boolean,
      onClose: Function,
      onReturnData: Function
    },
    data () {
      return {
        state: false,
        internalData: {},
        allLocations: []
      }
    },
    apollo: {
      allLocations: allLocationsQuery
    },
    methods: {
      closeDialog() {
        if (this.onClose) {
          this.onClose()
        }
      },
      returnData(data) {
        if (this.onReturnData) {
          this.onReturnData(data)
        }
      }
    }
  }
</script>

<style>

</style>
