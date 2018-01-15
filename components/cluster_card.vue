<template>
  <v-card light id="placecard">
    <v-card-title primary-title>
    <div>
        <h3 class="headline mb-0">{{clusterData.name}}</h3>
    </div>
    </v-card-title>
    <v-card-text>
        <h5>Tiendas: </h5>
        <div class="black--text" v-for="(tienda, i) in clusterData.stores" :key="i">
          <span>{{tienda.name}}</span>
        </div>
    </v-card-text>
    <v-card-actions class="roboto">
      <v-spacer/>
      <v-tooltip bottom>
          <v-btn flat icon color="primary" slot="activator"
                 @click.native.stop="deleteSectorFunc(clusterData.id)"
          class="">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Eliminar Ubicacion?</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn flat icon color="primary" @click.native.stop="editClusterData"
        class="" slot="activator">
          <v-icon>mode_edit</v-icon>
        </v-btn>
        <span>Editar?</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ClusterCard',
  props: {
    clusterData: Object,
    onDelete: Function
  },
  methods: {
    editClusterData () {
    },
    deleteSectorFunc (id) {
      if (this.onDelete) {
        this.onDelete(id)
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
