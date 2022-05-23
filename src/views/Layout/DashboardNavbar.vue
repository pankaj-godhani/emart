<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    style="background: #044e7f;"
    :class="{ 'bg-success navbar-dark': type === 'default' }"
  >
    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center ml-md-auto">
      <li class="nav-item d-xl-none">
        <!-- Sidenav toggler -->
        <div
          class="pr-3 sidenav-toggler"
          :class="{
            active: $sidebar.showSidebar,
            'sidenav-toggler-dark': type === 'default',
            'sidenav-toggler-light': type === 'light',
          }"
          @click="toggleSidebar"
        >
          <div class="sidenav-toggler-inner" :style="$sidebar.showSidebar?'margin-left:250px':'margin-left:250px:0px'">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>

    </ul>
    <ul class="navbar-nav align-items-center ml-auto ml-md-0">
      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <template v-slot:title-container>
          <a href="#" class="nav-link pr-0">
            <div class="media align-items-center" v-for="user in users" :key="user._id">
              <span v-if="user.userImg && loginUser._id === user._id" >
                <img :alt="user.firstName" :src="url+user.userImg"  class="avatar-sm rounded-circle" style="height: 40px; width: 40px"/>
              </span>
              <span v-else-if="loginUser._id===user._id" class="avatar avatar-sm rounded-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="125" height="125" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                 <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
               </svg>
              </span>
              <div class="media-body ml-2 d-none d-lg-block" v-if="loginUser._id===user._id">
                <span class="mb-0 text-sm font-weight-bold text-white">{{user.firstName}} {{user.lastName}}</span>
              </div>
            </div>
          </a>
        </template>

        <div class="dropdown-header noti-title">
          <h6 class="text-overflow m-0">Welcome!</h6>
        </div>
        <router-link :to="{name:'Profile',params:{id:loginUser._id}}" class="dropdown-item">
          <i class="ni ni-single-02"></i>
          <span>My profile</span>
        </router-link>
        <div class="dropdown-divider"></div>
        <router-link :to="{name: 'Logout'}"  class="dropdown-item">
          <i class="ni ni-user-run"></i>
          <span>Sign out</span>
        </router-link>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import BaseNav from "@/components/Navbar/BaseNav";
import axios from "axios";

export default {
  components: {
    BaseNav,
  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  data() {
    return {
      url:"https://oyster-app-s2gc3.ondigitalocean.app/",
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
      users:{}
    };
  },
  computed: {
    loginUser(){
      return this.$store.getters['auth/getUser'];
    },
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  mounted() {
    this.getUser();
  },
  methods: {

    getUser(){
      axios.get(`api/auth/user`)
        .then(response=>{
          this.users=response.data;
        });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
};
</script>
<style scoped>
/*.active{
  margin-left: 250px;
}*/
</style>
