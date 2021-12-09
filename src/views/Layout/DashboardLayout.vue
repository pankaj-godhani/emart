<template>
  <div class="wrapper">
    <!-- <notifications></notifications> -->
    <side-bar>
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Dashboard',
            path: '/',
            icon: 'ni ni-shop text-primary',
          }"
        ></sidebar-item>

        <div v-show="isAdmin">
          <sidebar-item
            :link="{
            name: 'Users',
            path: '/users',
            icon: 'ni ni-shop text-info',
          }"
          ></sidebar-item>
        </div>


        <sidebar-item
          :link="{
            name: 'MasterProducts',
            icon: 'ni ni-ungroup text-orange',
          }"
        >
          <sidebar-item
            :link="{ name: 'Products', path: '/master-products/products' }"
          />
          <sidebar-item
            :link="{ name: 'Schemes', path: '/master-products/schemes' }"
          />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Invoices',
            icon: 'ni ni-ui-04 text-info',
          }"
        >
          <sidebar-item
            :link="{ name: 'Invoice', path: '/invoices/invoice' }"
          />
          <sidebar-item
            :link="{
              name: 'Purchase Returns',
              path: '/invoices/purchase-returns',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Debit Memo',
              path: '/invoices/debit',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Credit Memo',
              path: '/invoices/credit',
            }"
          />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'PurchaseOrders',
            icon: 'ni ni-single-copy-04 text-pink',
          }"
        >
          <sidebar-item
            :link="{ name: 'Purchase Orders', path: '/purchase-orders' }"
          />
          <sidebar-item
            :link="{
              name: 'Dispatch Note',
              path: '/purchase-orders/dispatch-note',
            }"
          />
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <router-view></router-view>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
//import {mapGetters} from "vuex";
export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  computed:{
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    }
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }

    },
  },
  mounted() {

    this.initScrollbar();
    //this.forUser();
  },
};
</script>
<style lang="scss"></style>
