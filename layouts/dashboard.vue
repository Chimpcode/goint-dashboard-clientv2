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

    </v-app>

  </div>
</template>

<script>
  import Navbar from '~/components/navbar'
  import SidebarAccount from '~/components/sidebar_account'
  import Topbar from '~/components/topbar'

  export default {
    components: {
      Navbar,
      SidebarAccount,
      Topbar
    },
    data () {
      return {
        sidebar: false
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
