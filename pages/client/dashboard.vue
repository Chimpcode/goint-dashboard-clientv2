<template>
  <div>
    <v-container>
    <h1> Bienvenido {{ $store.state.auth.user.name }} </h1>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <!--<v-card>-->
          <!--<v-card-title class="subheader">Ultimos registro de visualizaciones</v-card-title>-->
          <!--<div id="myDiv"></div>-->
        <!--</v-card>-->
      </v-flex>      
    </v-layout>
    </v-container>
  </div>
</template>

<script>
  // import {chart} from '~/plugins/toastui'
  export default {
    middleware: 'auth',
    layout: 'dashboard',
    data () {
      return {}
    },
    methods: {
      date (date) {
        let y = date.getFullYear()
        let m = `${date.getMonth() + 1}`.padStart(2, '0')
        let d = `${date.getDate()}`.padStart(2, '0')
        return `${y}-${m}-${d}`
      }
    },
    mounted () {
      // let xdata = [
      //   this.date((new Date((new Date()).getTime() - 8 * 24 * 60 * 60 * 1000))),
      //   this.date((new Date((new Date()).getTime() - 4 * 24 * 60 * 60 * 1000))),
      //   this.date((new Date((new Date()).getTime() - 2 * 24 * 60 * 60 * 1000))),
      //   this.date((new Date()))
      // ]
      // var Plotly = require('../../static/plotly_dependencies')
      // var trace1 = {
      //   x: xdata,
      //   y: [10, 15, 13, 17],
      //   type: 'scatter'
      // }
      //
      // var data = [trace1]
      // let layout = {
      //   xaxis: {
      //     type: 'date'
      //   },
      //   yaxis: {
      //     title: 'Visualizaciones'
      //   }
      // }
      // Plotly.newPlot('myDiv', data, layout)

      // if (process.client) {
      //   let container = document.getElementById('myDiv')
      //   let data = {
      //     categories: ['cate1', 'cate2', 'cate3'],
      //     series: [
      //       {
      //         name: 'Legend1',
      //         data: [20, 30, 50]
      //       },
      //       {
      //         name: 'Legend2',
      //         data: [40, 40, 60]
      //       },
      //       {
      //         name: 'Legend3',
      //         data: [60, 50, 10]
      //       },
      //       {
      //         name: 'Legend4',
      //         data: [80, 10, 70]
      //       }
      //     ]
      //   }
      //   let options = {
      //     chart: {
      //       width: 500,
      //       height: 400,
      //       title: 'Chart Title'
      //     },
      //     yAxis: {
      //       title: 'Y Axis Title'
      //     },
      //     xAxis: {
      //       title: 'X Axis Title'
      //     }
      //   }
      //   chart.barChart(container, data, options)
      // }
    }
  }
</script>

<style>

</style>

