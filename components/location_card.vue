<template>
  <v-card light id="locationcard">
    <v-card-title primary-title>
      <div>
        <div class="idkey">{{locationData.id}}</div>
        <!--<h3 class="mb-0 mt-2">-->
          <!--{{locationData.latitude}},-->
          <!--{{locationData.longitude}}-->
        <!--</h3>-->
      </div>
    </v-card-title>
    <gmap-map
      :options="{styles: gmapStyles}"
      :center="{ lng: locationData.longitude, lat: locationData.latitude }"
      :zoom="13"
      map-type-id="terrain"
      style="width: 100%; height: 150px"
    >
      <gmap-marker
        :position="{ lng: locationData.longitude, lat: locationData.latitude }"
      />
    </gmap-map>
    <v-card-text>
      <div>{{locationData.address}}
      </div>
    </v-card-text>
    <v-card-actions class="roboto">
      <v-spacer/>
      <v-tooltip bottom>
        <v-btn flat icon color="primary" slot="activator"
               @click.native.stop="deleteLocation(locationData.id)"
               class="">
          <v-icon>delete</v-icon>
        </v-btn>
        <span>Eliminar Ubicacion?</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn flat icon color="primary"
               class="" slot="activator"
               @click.native.stop="onEditLocation(locationData)">
          <v-icon>mode_edit</v-icon>
        </v-btn>
        <span>Editar?</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import gmapsStyles from '~/assets/gmaps_styles'

export default {
  name: 'LocationCard',
  props: {
    locationData: Object,
    onDelete: Function,
    onEdit: Function
  },
  data () {
    return {
      gmapStyles: gmapsStyles
    }
  },
  methods: {
    onEditLocation (data) {
      if (this.onEdit) {
        this.onEdit(data)
      }
    },
    deleteLocation (id) {
      if (this.onDelete) {
        this.onDelete(id)
      }
    }
  }
}
</script>


<style lang="stylus">

.idkey
  font-size 9px
</style>
