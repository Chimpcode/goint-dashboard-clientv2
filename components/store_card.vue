<template>
  <v-card light draggable="true" id="placecard" ondragstart="drag(event)">
    <v-card-title primary-title>
      <div>
          <h3 class="headline mb-0">{{placeData.name}}</h3>
          <div>{{placeData.description}}
          </div>
      </div>
    </v-card-title>
    <v-card-text>
        <h5>Ubicacion: </h5>
        <div class="black--text" v-if="placeData.location !== null && placeData.location !== undefined">
          <span>{{placeData.location.address}}</span>
        </div>
        <div class="black--text" v-else>
          <span>(No tiene ubicacion)</span>
        </div>
    </v-card-text>
    <v-card-actions class="roboto">
      <v-spacer/>
      <v-tooltip bottom>
          <v-btn flat icon color="primary" slot="activator"
                 @click.native.stop="deleteStoreFunc(placeData.id)"
          class="">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Eliminar Ubicacion?</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn flat icon color="primary"
               class="" slot="activator"
               @click.native.stop="onEditStore">
          <v-icon>mode_edit</v-icon>
        </v-btn>
        <span>Editar?</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'StoreCard',
  props: {
    placeData: Object,
    onDelete: Function,
    onEdit: Function
  },
  methods: {
    drag: function (ev) {
      ev.dataTransfer.setData('Text', ev.target.id)
    },
    deleteStoreFunc (id) {
      if (this.onDelete) {
        this.onDelete(id)
      }
    },
    onEditStore () {
      const location = this.placeData.location === null ? null : this.placeData.location.id
      this.$store.state.placesForm.storeFormData = { ...this.placeData, location, edit: true }
      if (this.onEdit) {
        this.onEdit(false)
      }
    }
  }
}
</script>

<style lang="stylus">

.created-at
  font-size 9px
</style>
