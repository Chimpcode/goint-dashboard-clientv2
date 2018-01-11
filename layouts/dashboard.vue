<template>
  <div id="dashboard">
    <navbar/>
    <topbar :title="$route.name" @on-menu-btn-click="sidebar = !sidebar"/>
    <!-- @on-info-submission="onSendSubmission" -->
    <sidebar-account :open="sidebar"
                     @update-sidebar-open="onSidebarChange"
                     transition="slide-x-transition"
    >
    </sidebar-account>

    <nuxt/>

  </div>
</template>

<script>
  import Navbar from '~/components/Navbar'
  import SidebarAccount from '~/components/SidebarAccount'
  import Topbar from '~/components/Topbar'

  export default {
    components: {
      Navbar, Topbar, SidebarAccount
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
