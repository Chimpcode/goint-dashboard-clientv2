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
import { EventBus } from '~/bus/index'

export default {
  name: 'ClusterCard',
  props: {
    clusterData: Object
  },
  methods: {
    editClusterData () {
      this.$emit('on-edit-cluster', this.clusterData)
    },
    deleteSectorFunc (id) {
      EventBus.$emit('is-shot-loading', true)
      this.$graphito.call_mutation('deleteSector', { id: id })
        .then(res => {
          this.$emit('refresh-data', true)
          EventBus.$emit('is-shot-loading', false)
        }, err => {
          console.log(err)
          EventBus.$emit('is-shot-loading', false)
        })
    }
  }
}
</script>

<style lang="stylus">

</style>
