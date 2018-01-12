<template>
  <div id="profile-box" class="text-xs-center translate-left banner-background">
    <div>
      <v-icon class="primary--text" style="font-size:72px">person</v-icon>
    </div>
    <div>{{companyName}}</div>
    <div class="fix-align">
      {{socialReason}}
      <v-menu offset-y light>
        <v-icon slot="activator" class="lazy--text">arrow_drop_down</v-icon>
        <v-list light>
          <v-list-tile :to="{ name:'Login' }">
            <v-list-tile-title class="nexafont">SIGN OUT</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      companyName: this.$store.state.auth.user.name,
      socialReason: this.$store.state.auth.user.social_reason
    }
  }
}
</script>

<style lang="stylus">
#profile-box
  padding 12px 0px
  color white
.nexafont{
  font-family : NexaLight
}
.fix-align
  transform translate(15px, 0px)
// .translate-left
//   padding-right
.banner-background
  background #394562
</style>
