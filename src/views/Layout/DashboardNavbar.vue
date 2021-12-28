<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    :class="{ 'bg-success navbar-dark': type === 'default' }"
  >

    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center ml-md-auto">

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
              <span v-if="user.userImg && loginUser.email===user.email" class="avatar avatar-sm rounded-circle">
                <img :alt="user.firstName" :src="url+user.userImg" />
              </span>
              <span v-else-if="loginUser.email===user.email" class="avatar avatar-sm rounded-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="125" height="125" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                 <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
               </svg>
              </span>
              <div class="media-body ml-2 d-none d-lg-block" v-if="loginUser.email===user.email">
                <span class="mb-0 text-sm font-weight-bold">{{user.firstName}} {{user.lastName}}</span>
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
        <a  class="dropdown-item" @click="doLogOut">
          <i class="ni ni-user-run"></i>
          <span>Logout</span>
        </a>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import BaseNav from "@/components/Navbar/BaseNav";
import { authMethods} from '../../state/helpers';
//import {mapGetters} from "vuex";
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
      url:"https://vuecrud-etj2v.ondigitalocean.app",
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
    ...authMethods,
    doLogOut(){
      this.logOut()
        .then(() => {
          this.$router.push('/login');
        });
    },
    getUser(){
      axios.get(`api/auth/user`)
        .then(response=>{
          this.users=response.data;
          //console.log(response.data);
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
