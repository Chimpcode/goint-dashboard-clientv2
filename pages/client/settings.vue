<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6 class="py-3">
        <v-select
          label="Categorias"
          v-bind:items="categories"
          v-model="categories_selected"
          multiple
          chips
          color="primary"
          hint="Que servicios ofrece a sus clientes?"
          persistent-hint
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
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
    </v-layout>
    <v-layout row wrap class="mt-4" v-for="(item, index) in switch_items" :key="index">
      <v-flex sm8 xs11 class="pr-4 pt-1">
        <p>{{ item.label }}</p>
      </v-flex>
      <v-flex sm4 xs1>
        <v-switch color="primary" v-model="item.value"></v-switch>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    layout: 'dashboard',
    data () {
      return {
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
        menu1_selected: 'ABC',
        categories_selected: [],
        categories: [
          'Restaurantes', 'Bares y Discotecas', 'Entretenimiento',
          'Belleza y Spa', 'Productos', 'Servicios'
        ]
      }
    }
  }
</script>

<style lang="stylus">
  #Settings
    margin-left : 72px
    font-family : NexaLight
  // color: #cbcbcb
</style>
