<template>
  <v-dialog v-model="isOpen" :width="typeDialog[kindForm]" persistent>
    <v-card>
      <v-card-text>
        <v-btn @click.native.stop="closeDialog" flat icon style="float: right;">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-text>

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


    </v-card>
  </v-dialog>

</template>

<script>
  export default {
    name: 'ClusterForm',

  }
</script>

<style>

</style>
