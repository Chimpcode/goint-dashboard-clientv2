<template>
  <v-container>
    <v-layout row wrap class="mt-4">
      <v-flex xs12>
        <p class="subheader">Logo de la empresa</p>
      </v-flex>
      <v-flex xs12 class="text-xs-center" v-if="company !== null">
        <cc-avatar
          :image-url="company.logoImage">
        </cc-avatar>
      </v-flex>
      <v-flex xs12>
        <p class="subheader">Detalles de la empresa</p>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="outline-box table-info pb-4">
      <v-flex xs12 class="px-3 py-2 info-color-text">
        <v-icon class="info-color-text">info</v-icon>
        Informacion Actual de tu empresa. Estos datos no son editadables por el momento.
      </v-flex>
      <table class="ml-4">
        <tbody class="text-xs-left info-color-text">
          <tr v-for="(item, k) in companyInfo" :key="k+'item-company-data'" :class="[`field-company-data field-${k}`]">
            <td class="pr-3">{{ companyFields[k] }}:</td>
            <td>{{item}}</td>
          </tr>
        </tbody>
      </table>
      <!-- <v-flex xs12 class="text-xs-left info-color-text" v-for="(item, k) in companyInfo" :key="k+'item-company-data'">
        <div :class="[`field-company-data field-${k}`]">{{ `${companyFields[k]} : ${item}` }}</div>
      </v-flex> -->
    </v-layout>
    <v-layout row wrap class="mt-4" v-for="(item, index) in []" :key="index">
      <v-flex sm8 xs11 class="pr-4 pt-1">
        <p>{{ item.label }}</p>
      </v-flex>
      <v-flex sm4 xs1>
        <v-switch color="primary" v-model="item.value"></v-switch>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-4" v-if="company !== null">
      <v-flex xs12>
        <v-text-field
          name="input-1"
          label="Terminos y Condiciones de las promociones"
          textarea
          v-model="editableCompany.termsConditions"
          color="primary"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn @click.native.stop="updateCompanyData">ACTUALIZAR DATOS</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <p class="subheader">Categoria seleccionada</p>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6 class="py-3">
        <v-select
          label="Categorias"
          v-bind:items="categories"
          v-model="categories_selected"
          item-text="name"
          item-value="id"
          chips
          color="primary"
          hint="Que servicios ofrece a sus clientes?"
          persistent-hint
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn color="primary" @click.native.stop="updateCompanyCategory">ACTUALIZAR CATEGORIAS <v-icon class="pl-1">save</v-icon></v-btn>
      </v-flex>
    </v-layout>
    <v-layout class="pb-5 pt-5"></v-layout>
    <!-- <v-layout row wrap>
      <v-flex sm2 xs4 class="pr-4 pt-3">
        <p>ABCDEFGH</p>
      </v-flex>
      <v-flex sm4 xs4>
        <v-menu open-on-hover bottom offset-y>
          <v-btn color="primary" slot="activator">{{ menu1_selected }}</v-btn>
          <v-list light>
            <v-list-tile v-for="item in menu1_items" :key="item.title" @click="menu1_selected = item.title">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout> -->

  </v-container>
</template>

<script>
  import CcAvatar from '~/components/cc_avatar.vue'
  // import {logoImage} from '~/apollo/settings'
  import { companyQuery, addCompanyCategory, removeCompanyCategory, updateCompany } from '~/apollo/company'
  import { allCategoriesQuery } from '~/apollo/category'

  export default {
    // just for func
    middleware: 'auth',
    components: {
      CcAvatar
    },
    layout: 'dashboard',
    apollo: {
      categories: {
        query: allCategoriesQuery,
        result ({data, loading, networkStatus}) {
          this.syncCategories++
          if (this.syncCategories === 2) {
            const categories = data.categories
            let currentCategory = null
            if (this.company === null) {
              return
            }
            if (this.company.categories.length === 0) {
              return false
            }
            let currentId = this.company.categories[0].id
            categories.map(cat => {
              if (cat.id === currentId) {
                currentCategory = cat
              }
            })
            if (currentCategory !== null) {
              this.categories_selected = currentCategory.id
            }
          }
        }
      },
      company: {
        query: companyQuery,
        variables () {
          let companyId = this.$store.state.auth.user.id
          console.log(companyId)
          return {
            companyid: companyId
          }
        },
        result ({ data, loading, networkStatus }) {
          this.syncCategories++
          this.editableCompany = Object.assign({}, data.company)
          if (this.syncCategories === 2) {
            const categories = this.categories
            let currentCategory = null
            if (data.company.categories.length === 0) {
              return false
            }
            let currentId = data.company.categories[0].id

            categories.map(cat => {
              if (cat.id === currentId) {
                currentCategory = cat
              }
            })
            if (currentCategory !== null) {
              this.categories_selected = currentCategory.id
            }
          }
        }
      }
    },
    computed: {
      companyInfo () {
        if (this.company === null) {
          return {}
        }
        return {
          commercialName: this.company.commercialName,
          createdAt: this.date(this.company.createdAt),
          email: this.company.email,
          legalAddress: this.legalAddress(this.company.legalAddress),
          movilPhone: this.company.movilPhone,
          ruc: this.company.ruc,
          socialReason: this.company.socialReason
        }
      }
    },
    methods: {
      date (isodate) {
        const date = (new Date(isodate))
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      },
      legalAddress (legalAddr) {
        return `direccion: ${legalAddr.address}, ${legalAddr.city}`
      },
      updateCompanyData () {
        const self = this
        this.$apollo.mutate({
          mutation: updateCompany,
          variables: {
            companyid: self.company.id,
            termsConditions: self.editableCompany.termsConditions
          }
        }).then(company => {
          // self.company.termsConditions = company.termsConditions
          this.$store.commit('setSnackbarMessage', 'Data updated')
        }).catch(err => {
          console.log(err)
          this.$store.commit('setSnackbarMessage', 'Something went wrong. Try again')
        })
      },
      updateCompanyCategory () {
        const self = this
        const category = this.categories_selected
        if (self.company.categories.length === 0) {
          this.$apollo.mutate({
            mutation: addCompanyCategory,
            variables: {
              companyid: self.company.id,
              categoryid: category
            }
          }).then(data => {
            console.log('addCompanyCategory', data)
            // this.categories_selected = category
            this.$store.commit('setSnackbarMessage', 'Category added')
          }).catch(err => {
            console.log(err)
            this.$store.commit('setSnackbarMessage', 'Something went wrong. Try again')
          })
        } else {
          this.$apollo.mutate({
            mutation: removeCompanyCategory,
            variables: {
              companyid: self.company.id,
              categoryid: self.company.categories[0].id
            }
          }).then(data => {
            console.log('removeCompanyCategory', data)
            return this.$apollo.mutate({
              mutation: addCompanyCategory,
              variables: {
                companyid: self.company.id,
                categoryid: category
              }
            })
          }).then(data => {
            console.log('addCompanyCategory', data)
            this.$store.commit('setSnackbarMessage', 'Category updated')
          }).catch(err => {
            console.log(err)
            this.$store.commit('setSnackbarMessage', 'Something went wrong. Try again')
          })
        }
      }
    },
    data () {
      return {
        company: null,
        editableCompany: null,
        companyFields: {
          'commercialName': 'Nombre comercial',
          'createdAt': 'Fecha de creacion',
          'legalAddress': 'Direccion',
          'socialReason': 'Razon Social',
          'ruc': 'EUC',
          'movilPhone': 'Telefono movil',
          'email': 'Email'
        },
        switch_items: [
          { id: '1', label: 'ABCDEFGHIJKLMNOPQRSTUVWZYZ', value: false },
          { id: '1', label: 'ABCDEFGHIJKLMNOPQRSTUVWZYZ', value: true },
          { id: '1', label: 'ABCDEFGHIJKLABCDEFGHIJKLMNOPQRSTUVWZYZ', value: false },
          { id: '1', label: 'ABCDEFGHIJKLABCDEFGHIJKLMNOPQRSTUVWZYZ', value: true },
          { id: '1', label: 'ABCDEFGHIJKLABCDEFGHIJKLMNOPQRSTUVWZYZ', value: false }
        ],
        menu1_items: [
          { title: 'Click Me 1' },
          { title: 'Click Me 2' },
          { title: 'Click Me 3' },
          { title: 'Click Me 4' }
        ],
        syncCategories: 0, // 2 is trigger
        menu1_selected: 'ABC',
        categories_selected: null,
        categories: []
      }
    }
  }
</script>

<style lang="stylus">
  #Settings
    margin-left : 72px
    font-family : NexaLight
  // color: #cbcbcb
  .avatar-hover:hover
    background-color black
  .field-company-data
    padding-bottom 8px
    padding-left 24px
    font-size 14px
  .field-commercialName
    font-size 18px
    padding-bottom 8px
    font-weight 600
  .field-createdAt
    font-size 12px

  .outline-box
    border  1px solid #2196f3 !important
  .info-color-text
    color #2196f3 !important
  .table-info
    margin-left auto
    margin-right auto
    display: inline-block
</style>
