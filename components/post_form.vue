<template>
  <v-layout row wrap>
    <v-flex xs12 class="principal-title">
      Crear promocion
    </v-flex>
    <v-flex xs12>
      <p class="indications-section">Se requiere una imagen de tipo de archivo PNG. Con una resolución de 1620x700</p>
    </v-flex>
    <v-flex xs6 class="px-3">
      <v-layout row wrap>
        <v-flex xs12>

        </v-flex>
        <!-- image -->
        <v-flex xs12>
          <CcContainerImage
          :height="'140px'"
          @updatedImage="updateImage"
          :pastImg="dataPost.image"
          />
        </v-flex>

        <v-flex xs12>
          <CcTextInput v-model="dataPost.title" :name="'Título'" :type="'big'"/>
        </v-flex>
        <v-flex xs3>
          <CcTextInput v-model="dataPost.stock" :name="'Stock'" :type="'simple'" mode="number" :min="0"/>
        </v-flex>
        <v-flex xs4 offset-xs1>
          <CcTextInput v-model="dataPost.expireAt" :name="'Fecha de vencimiento'" :type="'simple'" mode="date"/>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs6 class="px-3">
      <v-layout row wrap>

        <v-flex xs12>
          <v-select
            :name="'Ubicacion'"
            v-bind:items="allStores"
            v-model="dataPost.locationByStoresIds"
            item-text="name"
            item-value="id"
            label="Select"
            single-line
            bottom
            multiple
            chips
          >
            <template slot="selection" slot-scope="data">
              <v-chip
                @input="data.parent.selectItem(data.item)"
                color="primary" text-color="white"
                class="chip--select-multi"
                :selected="data.selected"
                :disabled="data.disabled"
                :key="JSON.stringify(data.item)"
              >
                {{ data.item.name }}
              </v-chip>
            </template>
          </v-select>
        </v-flex>

        <v-flex xs12>
          <v-select
            v-bind:items="[]"
            v-model="dataPost.semiTags"
            label="Escribe los tags relacionados a tu promocion (presiona ENTER para agregar mas tags)"
            bottom
            chips
            tags
          >
            <template slot="selection" slot-scope="data">
              <v-chip
                @input="data.parent.selectItem(data.item)"
                color="primary" text-color="white"
                class="chip--select-multi"
                :selected="data.selected"
                :disabled="data.disabled"
                :key="JSON.stringify(data.item)"
              >
                {{ data.item }}
              </v-chip>
            </template>
          </v-select>
        </v-flex>

        <v-flex xs6>
          <CcRangeInput
          :name="'Rango de edad (1-99)'"
          :type="'simple'"
          :max="availableAge.max"
          :min="availableAge.min"
          v-model="dataPost.availableAge"
          />
        </v-flex>
        <v-flex xs6>
          <CcRangeInput
          :name="'Horario de disponibilidad (1h - 24h)'"
          :type="'simple'"
          :max="availableHour.max"
          :min="availableHour.min"
          v-model="dataPost.availableHour"
          />
        </v-flex>
        <v-flex xs6>
          <CcCheckBoxGroup
          :name="'Días activos'"
          :type="'simple'"
          :model="availableDays"
          v-model="dataPost.activeDays"
          :onChangeState="activeDaysChangeState"
          />

        </v-flex>
        <v-flex xs6>
          <CcCheckBoxGroup
          :name="'Genero'"
          :type="'simple'"
          :model="availableGender"
          v-model="dataPost.genders"
          :onChangeState="genderObjetiveChangeState"
          vertical
          />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <CcTextInput v-model="dataPost.description" :name="'Descripción'" :type="'big'" mode="textarea"/>
    </v-flex>
    <v-flex xs12>
      <CcTextInput v-model="dataPost.additionalConditions" :name="'Condiciones Adicionales'" :type="'big'" mode="textarea"/>
    </v-flex>

    <v-flex xs12>
      <v-btn color="primary" @click="createPost" v-if="postObj === null">CREAR</v-btn>
      <v-btn color="primary" @click="createPost" v-else>EDITAR</v-btn>
    </v-flex>
    <v-flex xs12 v-if="wrongData">
      <div>Completar los siguientes registros: {{invalidField}}</div>
    </v-flex>
  </v-layout>
</template>

<script>

import CcTextInput from '~/components/cc_textinput'
import CcContainerImage from '~/components/cc_container_image'
import CcRangeInput from '~/components/cc_range_input'
import CcCheckBoxGroup from '~/components/cc_checkbox_group'
import { allStoresQuery } from '~/apollo/stores'
import { addNewPostMut, updatePostMut } from '~/apollo/posts'

export default {
  name: 'PostForm',
  components: { CcTextInput, CcContainerImage, CcRangeInput, CcCheckBoxGroup },
  props: {
    postObj: Object
  },
  computed: {
    // dataPost: {
    // get () {
    //   console.log(this.postObj)
    // },
    // set (value) {
    //   console.log(value)
    // }
    // }
  },
  mounted () {
    if (this.postObj === null) {
      this.dataPost = { title: '', tags: '', targetPublic: {} }
    } else {
      let expireDate = new Date(((new Date(this.postObj.expireAt)).getTime() + 5 * 60 * 60 * 1000))

      const availableDays = this.postObj.targetPublic.availableDays
      const genders = this.postObj.targetPublic.gender
      const availableAge = [this.postObj.targetPublic.minAge, this.postObj.targetPublic.maxAge]
      const availableHour = [parseInt(this.postObj.targetPublic.lowerHour), parseInt(this.postObj.targetPublic.upperHour)]
      const additionalConditions = this.postObj.additionalConditions || ''

      this.dataPost = {
        id: this.postObj.id,
        title: this.postObj.title,
        description: this.postObj.description,
        additionalConditions: additionalConditions,
        expireAt: `${expireDate.getFullYear()}-${(expireDate.getMonth() + 1).toString().padStart(2, '0')}-${expireDate.getDate().toString().padStart(2, '0')}`,
        stock: this.postObj.stock,
        semiTags: this.postObj.tags.split(','),
        activeDays: availableDays,
        availableAge: availableAge,
        availableHour: availableHour,
        isActive: this.postObj.isActive,
        genders: genders,
        image: this.postObj.image,
        locationByStoresIds: this.postObj.locationByStores.map((item) => {
          return item.id
        })
      }
    }
  },
  data () {
    return {
      dataPost: { tags: '', targetPublic: {} },
      wrongData: false,
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
        'female': {name: 'Mujer', value: false}
      },
      availableAge: {
        max: 99,
        min: 1
      },
      availableHour: {
        max: 24,
        min: 1
      },
      availableStores: [],
      fieldsInDataPost: [
        {value: 'title', label: 'titulo'},
        {value: 'stock', label: 'stock'},
        {value: 'expireAt', label: 'Fecha de vencimiento'},
        {value: 'locationByStoresIds', label: 'Ubicaciones'},
        {value: 'semiTags', label: 'Tags'},
        {value: 'activeDays', label: 'Dias Activos'},
        {value: 'genders', label: 'Genero'},
        {value: 'description', label: 'Descripcion'},
        {value: 'availableHour', label: 'Horas activas'},
        {value: 'availableAge', label: 'Rango de edad'}
      ],
      invalidField: '',
      allStores: []
    }
  },
  apollo: {
    allStores: {
      query: allStoresQuery,
      variables () {
        let companyId = this.$store.state.auth.user.id
        return {
          companyid: companyId
        }
      }
    }
  },
  methods: {
    activeDaysChangeState (data) {
      this.availableDays = data
    },
    genderObjetiveChangeState (data) {
      this.availableGender = data
    },
    createPost () {
      console.log(this.dataPost)
      if (this.validateData()) {
        console.log('valid!')
        this.dataPost.upperHour = this.dataPost.availableHour[1].toString()
        this.dataPost.lowerHour = this.dataPost.availableHour[0].toString()
        this.dataPost.maxAge = this.dataPost.availableAge[1]
        this.dataPost.minAge = this.dataPost.availableAge[0]
        this.dataPost.availableDays = this.dataPost.activeDays
        this.dataPost.gender = this.dataPost.genders
        this.dataPost.tags = this.dataPost.semiTags.join(',')
        this.dataPost.stock = parseInt(this.dataPost.stock)
        this.dataPost.isActive = this.dataPost.isActive

        this.dataPost.byid = this.$store.state.auth.user.id

        let typeMutation = this.postObj === null ? addNewPostMut : updatePostMut
        this.$apollo.mutate({
          mutation: typeMutation,
          variables: this.dataPost,
          update: (store, { data: {createLocation} }) => {
            // Read the data from our cache for this query.
          }
        }).then((data) => {
          this.$store.commit('setSnackbarMessage', 'Promocion Creada/Actualizada')
        })
      } else {
      }
    },
    validateData () {
      for (var i = 0; i < this.fieldsInDataPost.length; i++) {
        if (!(this.fieldsInDataPost[i].value in this.dataPost)) {
          this.invalidField = this.fieldsInDataPost[i].label
          this.wrongData = true
          return false
        }
      }
      this.wrongData = false
      return true
    },
    updateImage (url) {
      this.dataPost.image = url
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
