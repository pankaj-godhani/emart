<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    :class="{ 'bg-success navbar-dark': type === 'default' }"
  >
    <!-- Search form -->
<!--    <form
      class="navbar-search form-inline mr-sm-3"
      :class="{
        'navbar-search-light': type === 'light',
      }"
      id="navbar-search-main"
    >
&lt;!&ndash;      <div class="form-group mb-0">
        <div class="input-group input-group-alternative input-group-merge">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-search"></i></span>
          </div>
          <input class="form-control" placeholder="Search" type="text" />
        </div>
      </div>&ndash;&gt;
&lt;!&ndash;      <button
        type="button"
        class="close"
        data-action="search-close"
        data-target="#navbar-search-main"
        aria-label="Close"
      >
        <span aria-hidden="true">×</span>
      </button>&ndash;&gt;
    </form>-->
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
          <a href="#" class="nav-link pr-0" @click.prevent>
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" src="img/theme/team-4.jpg" />
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm font-weight-bold">{{user.firstName}} {{user.lastName}}</span>
              </div>
            </div>
          </a>
        </template>

        <div class="dropdown-header noti-title">
          <h6 class="text-overflow m-0">Welcome!</h6>
        </div>
        <a href="#!" class="dropdown-item">
          <i class="ni ni-single-02"></i>
          <span>My profile</span>
        </a>
        <a href="#!" class="dropdown-item">
          <i class="ni ni-settings-gear-65"></i>
          <span>Settings</span>
        </a>
        <a href="#!" class="dropdown-item">
          <i class="ni ni-calendar-grid-58"></i>
          <span>Activity</span>
        </a>
        <a href="#!" class="dropdown-item">
          <i class="ni ni-support-16"></i>
          <span>Support</span>
        </a>
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
import {mapGetters} from "vuex";

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
  computed: {
    ...mapGetters('auth',{
      user:'getUser',

    }),
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
    };
  },
  methods: {
    ...authMethods,
    doLogOut(){
      this.logOut()
        .then(response => {
          this.$router.push('/login');
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
