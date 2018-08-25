<template>
    <v-dialog v-model="isOpen" :width="'60%'" persistent>
      <v-card>
        <v-card-text>
          <v-btn @click.native.stop="closeDialog" flat icon style="float: right;">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-title class="title"> {{ internalData.edit?'Editar ':'Agregar nueva ' }} Tienda </v-card-title>
        <v-card-text>
          <v-text-field v-model="internalData.name" label="Nombre" name="tiendaName"/>
          <v-text-field v-model="internalData.description" label="Descripcion" name="tiendaDescription"/>
          <v-text-field v-model="internalData.businessHours" label="Horario de atencion" name="tiendaBusinessHours"/>

          <v-checkbox
            label="Ofrece Wifi el local"
            v-model="internalData.wifi"
            color="red"
          ></v-checkbox>
          <v-checkbox
            label="Tienda virtual"
            color="red"
            v-model="internalData.storeType"
          />
          <v-select
            :items="allLocations"
            v-model="internalData.location"
            chips
            label="Inserte ubicaciones"
            item-value="id"
            item-text="address"
          />
        </v-card-text>
        <v-card-actions class="roboto">
          <v-spacer/>
          <v-tooltip bottom>
            <v-btn flat color="primary" :disabled="disableCreate"
                   class="" slot="activator" @click.native.stop="returnData(internalData)">
              <v-icon v-if="!internalData.edit"> add </v-icon>
              {{ internalData.edit?'Editar':'Crear' }}
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
    computed: {
      internalData () {
        console.log(this.$store.state.placesForm.storeFormData)
        return this.$store.state.placesForm.storeFormData
      }
    },
    data () {
      return {
        state: false,
        allLocations: [],
        disableCreate: false
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
        }
      }
    },
    methods: {
      closeDialog () {
        if (this.onClose) {
          this.onClose()
        }
      },
      returnData (data) {
        if (data.name === '' || data.name === undefined) {
          this.$store.commit('setSnackbarMessage', 'Inserte un nombre a la nueva la tienda')
          return
        }
        this.disableCreate = true
        setTimeout(() => {
          this.disableCreate = false
        }, 2000)

        if (this.onReturnData) {
          this.onReturnData(data)
        }
      }
    }
  }
</script>

<style>

</style>
