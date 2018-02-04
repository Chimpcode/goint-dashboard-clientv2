<template>
  <v-layout row wrap>
    <v-flex xs12 class="principal-title">
      Crear promocion
    </v-flex>
    <v-flex xs6 class="px-3">
      <v-layout row wrap>
        <v-flex xs12>

        </v-flex>
        <!-- image -->
        <v-flex xs12>
          <CcContainerImage
          :height="'140px'"
          />
        </v-flex>

        <v-flex xs12>
          <CcTextInput :model="dataPost.title" :name="'Título'" :type="'big'"/>
        </v-flex>
        <v-flex xs3>
          <CcTextInput :model="dataPost.stock" :name="'Stock'" :type="'simple'"/>
        </v-flex>
        <v-flex xs4 offset-xs1>
          <CcTextInput :model="dataPost.expireAt" :name="'Fecha de vencimiento'" :type="'simple'"/>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs6 class="px-3">
      <v-layout row wrap>
        <v-flex xs12>
          <CcTextInput :model="dataPost.places" :name="'Ubicacion'" :type="'simple'"/>
        </v-flex>
        <v-flex xs12>
          <CcTextInput :model="dataPost.tags" :name="'Tags'" :type="'simple'"/>
        </v-flex>
        <v-flex xs6>
          <CcRangeInput
          :name="'Rango de edad'"
          :type="'simple'"
          />
        </v-flex>
        <v-flex xs6>
          <CcRangeInput
          :name="'Horario de disponibilidad'"
          :type="'simple'"
          />
        </v-flex>
        <v-flex xs6>
          <CcCheckBoxGroup
          :name="'Días activos'"
          :type="'simple'"
          :model="availableDays"
          :onChangeState="activeDaysChangeState"
          />

        </v-flex>
        <v-flex xs6>
          <CcCheckBoxGroup
          :name="'Genero'"
          :type="'simple'"
          :model="availableGender"
          :onChangeState="genderObjetiveChangeState"
          vertical
          />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <CcTextInput :model="dataPost.description" :name="'Descripción'" :type="'big'"/>
    </v-flex>
  </v-layout>
</template>

<script>

import CcTextInput from '~/components/cc_textinput'
import CcContainerImage from '~/components/cc_container_image'
import CcRangeInput from '~/components/cc_range_input'
import CcCheckBoxGroup from '~/components/cc_checkbox_group'

export default {
  name: 'PostForm',
  components: { CcTextInput, CcContainerImage, CcRangeInput, CcCheckBoxGroup },
  props: {
  },
  data () {
    return {
      dataPost: {},
      availableDays: {
        'L': {name: 'L', value: false},
        'M': {name: 'M', value: false},
        'X': {name: 'X', value: false},
        'J': {name: 'J', value: false},
        'V': {name: 'V', value: false},
        'S': {name: 'S', value: false},
        'D': {name: 'D', value: false}
      },
      availableGender: {
        'male': {name: 'Varon', value: false},
        'female': {name: 'Mujer', value: false},
      }
    }
  },
  methods: {
    activeDaysChangeState (data) {
      this.availableDays = data
    },
    genderObjetiveChangeState (data) {
      this.availableGender = data
    }
  }
}
</script>

<style>
.principal-title {
  font-family: NexaBold;
  font-size: 26px;
  color: #444444;
}
</style>
