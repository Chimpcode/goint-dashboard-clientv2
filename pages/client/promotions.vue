<template>
  <v-container class="body" fluid>
    <!-- SEARCH BAR AND MENU ACTIONS -->
    <v-layout row wrap>
      <v-flex xs4>
        <v-text-field
          name="search"
          label="Buscar por titulo"
          append-icon="search"
          id="search"
          v-model="searchText"
          @click="active_state=states[0]"
        />
      </v-flex>
      <v-flex class="mt-2 ml-3" xs6>

        <v-btn flat color="dark"
               :class="active_state === states[0] ? 'red--text':''"
               @click="active_state=states[0]">
          <v-icon>view_list</v-icon>
          &nbsp;Promociones
        </v-btn>

        <v-btn flat color="dark"
               :class="active_state === states[1] || active_state === states[2] ? 'red--text':''"
               @click="onOpenEditAddPostView">
          <v-icon>{{active_state === states[2] ? 'mode_edit': 'note_add'}}</v-icon>
          &nbsp;{{active_state === states[2] ? 'Editar promocion': 'Nueva promocion'}}
        </v-btn>
        <!-- <v-btn flat color="dark" >
          <v-icon>delete</v-icon>
          &nbsp;Borrar
        </v-btn> -->
      </v-flex>
    </v-layout>

    <!-- CARDS CONTENT -->
    <v-layout row wrap class="mr-4">
      <v-flex xs12>

        <v-container fluid grid-list-md>

          <!-- LIST CARDS -->
          <v-layout row wrap v-if="active_state==='list'">
            <v-flex v-if="promocionesFiltered.length === 0" xs12 sm12 md9 v-for="(promo, index) in promociones" :key="index">
              <promo-card
                :color="colorvariants[index%5]"
                :promo-data="promo"
                @on-edit-mode="(_promo) => { postObjToEdit = promo; active_state=states[2] }"
                @on-delete="onCreateUpdatePost"/>
            </v-flex>
            <v-flex v-else xs12 sm12 md9 v-for="(promo, index) in promocionesFiltered" :key="index">
              <promo-card
                :color="colorvariants[index%5]"
                :promo-data="promo"
                @on-edit-mode="(_promo) => { postObjToEdit = promo; active_state=states[2] }"
                @on-delete="onCreateUpdatePost"/>
            </v-flex>

          </v-layout>

          <!-- ADD / EDIT VIEW -->
          <post-form
            v-if="active_state==='add' || active_state==='edit'"
            :is-new="active_state===states[1]? true : false"
            :postObj="postObjToEdit"
            @on-create-post="onCreateUpdatePost"
            @on-edit-post="onCreateUpdatePost">
          </post-form>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PromoCard from '~/components/promo_card'
  import PostForm from '~/components/post_form'
  import { EventBus } from '~/bus/index'
  import { allPostsQuery } from '~/apollo/posts'

  export default {
    middleware: 'auth',
    layout: 'dashboard',
    name: 'Promociones',
    components: {
      PromoCard, PostForm
    },
    methods: {
      onOpenEditAddPostView: function () {
        if (this.active_state === this.states[1] ||
          this.active_state === this.states[2]) {
          return true
        } else {
          this.active_state = this.states[1]
        }
        this.postObjToEdit = null
      },
      onCreateUpdatePost: function (newPost) {
        // this.promociones.push({
        //   createdAt: newPost.createdAt,
        //   title: newPost.title,
        //   description: newPost.description,
        //   availableCoupons: newPost.availableCoupons,
        //   finishDate: newPost.finishDate
        // })
        // console.log('onCreateUpdatePost')

        EventBus.$emit('is-short-loading', true)
        this.fetchDependencies().then(done => {
          EventBus.$emit('is-short-loading', false)
          this.active_state = 'list'
        }, err => {
          EventBus.$emit('is-short-loading', false)
          console.log(err)
        })
      },
      fetchDependencies () {
        return new Promise((resolve, reject) => {
          resolve(true)
          // this.$graphito.call_query('fetchAllPosts').then(res => {
          //   this.promociones = res.allPosts
          //   resolve(true)
          // }).catch(err => {
          //   reject(err)
          // })
        })
      }
    },
    computed: {
      searchText: {
        get () {
        },
        set (text) {
          let self = this
          if (text === '') {
            this.promocionesFiltered = []
          } else {
            this.promociones.map((item) => {
              if (item.title.includes(text)) {
                self.promocionesFiltered.push(item)
              }
            })
            console.log(self.promocionesFiltered)
          }
        }
      }
    },
    data () {
      return {
        states: ['list', 'add', 'edit'],
        location_selected: null,
        // active_state: 'list',
        active_state: 'list',
        postObjToEdit: null,

        timepicker_date: null,
        timepicker_menu: false,
        promocionesFiltered: [],
        promociones: [],
        colorvariants: ['teal', 'pink', 'blue', 'red', 'green']
      }
    },
    apollo: {
      promociones: {
        query: allPostsQuery,
        variables () {
          let companyId = this.$store.state.auth.user.id
          return {
            companyid: companyId
          }
        }
      }
    },
    created () {
      EventBus.$emit('is-loading', true)
      this.fetchDependencies().then(done => {
        EventBus.$emit('is-loading', false)
        console.log(done)
      }, err => {
        EventBus.$emit('is-loading', false)
        console.log(err)
      })
    }
  }
</script>

<style lang="stylus">

</style>
