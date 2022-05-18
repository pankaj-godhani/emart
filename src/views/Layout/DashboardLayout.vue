<template>
  <div class="wrapper">
    <!-- <notifications></notifications> -->
    <side-bar>
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Dashboard',
             path: '/dashboard',
            icon: 'ni ni-shop ',
          }"
        ></sidebar-item>

          <sidebar-item
            v-show="isAdmin"
            :link="{
            name: 'Users',
            path: '/users',
            icon: 'fa fa-user',
          }"
          ></sidebar-item>


           <sidebar-item
             v-if="isActive===true"
             :link="{
            name: 'MasterProducts',
            icon: 'fa fa-shopping-bag',
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
             v-if="isActive===true"
             :link="{
            name: 'Invoices',
            icon: 'fas fa-file-invoice ',
          }"
           >
                 <sidebar-item
                   :link="{ name: 'Invoice', path: '/invoices/invoice' }"
                 />
                 <sidebar-item
                   :link="{
                  name: 'Payment Report',
                  path: '/invoices/payment-report',
                }"
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
<!--                 <sidebar-item
                   :link="{
                  name: 'Outstanding Report',
                  path: '/invoices/vendorwise-outstanding-report',
                }"
                 />-->
           </sidebar-item>
           <sidebar-item
             v-if="isActive===true"
             :link="{
            name: 'PurchaseOrders',
            icon: 'fa fa-shopping-cart ',
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
      <div
        class="mx-auto rounded bg-danger text-white"
        style="width: 300px;text-align:center; font-family:'Lucida Console'; padding: 50px; margin-top: 170px;margin-bottom: 180px"
        v-if="isActive===false"
      >
       Sorry! Your status is inactive

      </div>
      <div v-if="isActive===true">
        <router-view></router-view>
      </div>


      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
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
export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  computed:{
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    },
    isActive(){
      return this.$store.getters['auth/getIsActive'];
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
  },
};
</script>
<style lang="scss"></style>
