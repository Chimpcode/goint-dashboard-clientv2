<template>
  <nav class="navbar">
    <router-link id='top-item' :to="{ path: 'dashboard' }" :class="$route.name === 'Dashboard'? 'active':''">
      <cc-icon ccicon="send" :ccclass="['navbar-icon', 'main-icon']"/>
      <!-- <div class="navbar-label"> Dashb. </div> -->
    </router-link>
    <ul>
      <li :class="$route.name === 'Dashboard - Promociones'? 'active':''">
        <router-link class="navbar-items" :to="{ path: 'promotions' }">
          <cc-icon ccicon="send" :ccclass="['navbar-icon']"/>
          <div class="navbar-label"> Promo </div>
        </router-link>
      </li>
      <li :class="$route.name === 'Dashboard - Mis Tiendas'? 'active':''">
        <router-link class="navbar-items" :to="{ path: 'places' }">
          <cc-icon ccicon="place" :ccclass="['navbar-icon']"/>
          <div class="navbar-label"> Localiz. </div>
        </router-link>
      </li>
      <li :class="$route.name === 'Dashboard - Ajustes'? 'active':''">
        <router-link class="navbar-items" :to="{ path: 'settings' }">
          <cc-icon ccicon="settings" :ccclass="['navbar-icon']"/>
          <div class="navbar-label"> Ajustes </div>
        </router-link>
      </li>
    </ul>
    <router-link id="logout" class="" :to="{ path: 'login' }">
      <cc-icon ccicon="exit_to_app" :ccclass="['navbar-icon']"/>
      <div class="navbar-label"> Cerrar Session </div>
    </router-link>
  </nav>
</template>
<script>
import CcIcon from '~/components/CcIcon'

export default {
  name: 'Navbar',
  components: {
    CcIcon
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus">
.main-icon
  transform translate(2px, -5px) rotate(-45deg)

.main-icon
  color #C12B35 !important

.navbar
  position: fixed
  top: 0px
  left: 0px
  bottom: 0px
  width: 72px;
  // height: 100%
  background: none repeat scroll 0 0 #211915
  color: white
  padding: 20px 16px 20px 20px

.navbar a#top-item
  text-decoration:none;
  outline: 0
  font-style: normal

.navbar a#logout
  text-decoration:none;
  outline: 0
  font-style: normal

.navbar ul
  margin: 0
  padding: 0
  margin-top: 60px
  list-style-type: none;
.navbar ul li
  margin: 0
  padding: 0
  margin-top: 20px

.navbar ul a.
  margin: 0
  padding: 0
  margin-top: 20px
.navbar-items{
  outline: 0
  color: white
  text-decoration: none
}
.navbar-items:hover
  color: #F7F7F8

#top-item:hover, #logout:hover
  color: #F7F7F8

.navbar ul li
  border-radius: 4px
  text-align: center
  margin-left: -4px
  padding: 4px

.navbar ul li a
  color: #909090

.navbar-items > i:hover
  color: #F7F7FF
.navbar-items > i
  color: #909090

.navbar ul li.active a
  color: #F7F7FF
.active div
.active i
  color:#F7F7F8
.navbar-icon
  font-size: 32px !important
.navbar-label
  font-size: 12px
  margin-left: -3px

#logout
  position: absolute;
  bottom: 10px;
  color: #909090
#logout:hover
  color: #F7F7FF
</style>
