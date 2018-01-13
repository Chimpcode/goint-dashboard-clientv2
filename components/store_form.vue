<template>
  <v-dialog v-model="isOpen" :width="typeDialog[kindForm]" persistent>
    <v-card>
      <v-card-text>
        <v-btn @click.native.stop="closeDialog" flat icon style="float: right;">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-text>
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
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'StoreForm'
  }
</script>

<style>

</style>
