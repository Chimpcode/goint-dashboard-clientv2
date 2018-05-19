<template>
  <div id="dashboard">
    <v-app>
      <topbar :title="$nuxt.$route.name" @on-menu-btn-click="sidebar = !sidebar"/>
      <navbar/>
       <!--@on-info-submission="onSendSubmission" -->
      <sidebar-account :open="sidebar"
                       @update-sidebar-open="onSidebarChange"
                       transition="slide-x-transition"
      >
      </sidebar-account>

      <nuxt/>

      <v-snackbar
        :timeout="snackbar.timeout"
        right
        vertical
        v-model="isSnackbarOn"
      >
        {{ snackbarMessage }}
      </v-snackbar>

      <goint-payments></goint-payments>
    </v-app>

  </div>
</template>

<script>
  import Navbar from '~/components/navbar'
  import SidebarAccount from '~/components/sidebar_account'
  import Topbar from '~/components/topbar'
  import GointPayments from '~/components/goint-payments'

  export default {
    components: {
      Navbar,
      SidebarAccount,
      Topbar,
      GointPayments
    },
    computed: {
      isSnackbarOn: {
        get () {
          return this.$store.getters.isSnackbarOn
        },
        set (value) {
          this.$store.commit('snackbarOff')
        }
      },
      snackbarMessage () {
        return this.$store.getters.snackbarMsg
      }
    },
    data () {
      return {
        sidebar: false,
        snackbar: {
          timeout: 4000
        }
      }
    },
    methods: {
      onSidebarChange: function (value) {
        this.sidebar = value
      }
    }
  }
</script>

<style lang="stylus">
  #dashboard
    font-family : NexaLight
    margin-left : 72px
  // color: #cbcbcb
  // #dashboard > .body
  //   margin-left : 22px
</style>
