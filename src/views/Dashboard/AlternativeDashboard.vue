<template>
  <div>
    <base-header class="pb-6" type="">
<!--      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Alternative</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="fas fa-home"></i></router-link>
              </li>
              <li class="breadcrumb-item"><a href="#">Dashboards</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Alternative
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>-->
      <!-- Card stats -->
      <div class="row mt-4">
        <div v-if="isAdmin===true" class="col-xl-4 col-md-6">
          <div class="card bg-gradient-primary border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Users
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white">{{userLen}}</span>
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="30"
                  ></base-progress>
                </div>
<!--                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template v-slot:title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>-->
              </div>
              <p class="mt-3 mb-0 text-sm">
                <router-link :to="{name:'Users'}" class="text-nowrap text-white font-weight-600">See details</router-link>
              </p>
            </div>
          </div>
        </div>
        <div :class="isAdmin?'col-xl-4 col-md-6':'col-xl-6 col-md-6'">
          <div class="card bg-gradient-info border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Products
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white"
                    >{{productLen}}</span
                  >
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="50"
                  ></base-progress>
                </div>
<!--                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template v-slot:title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>-->
              </div>
              <p class="mt-3 mb-0 text-sm">
                <router-link :to="{name:'Products'}" class="text-nowrap text-white font-weight-600">See details</router-link>
              </p>
            </div>
          </div>
        </div>
        <div :class="isAdmin?'col-xl-4 col-md-6':'col-xl-6 col-md-6'">
          <div class="card bg-gradient-danger border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Schemes
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white"
                    >{{schemeLen}}</span
                  >
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="80"
                  ></base-progress>
                </div>
<!--                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template v-slot:title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>-->
              </div>
              <p class="mt-3 mb-0 text-sm">
                <router-link :to="{name:'Schemes'}" class="text-nowrap text-white font-weight-600">See details</router-link>
              </p>
            </div>
          </div>
        </div>

      </div>
      <div class="row mt-4">
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-primary border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Invoice
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white">{{invoiceLen}}</span>
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="30"
                  ></base-progress>
                </div>
<!--                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template v-slot:title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>-->
              </div>
              <p class="mt-3 mb-0 text-sm">
                <router-link :to="{name:'Invoice'}" class="text-nowrap text-white font-weight-600">See details</router-link>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-info border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                   Purchase Orders
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white"
                  >{{purOrdersLen}}</span
                  >
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="50"
                  ></base-progress>
                </div>
<!--                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template v-slot:title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>-->
              </div>
              <p class="mt-3 mb-0 text-sm">
                <router-link :to="{name:'PurchaseOrders'}" class="text-nowrap text-white font-weight-600">See details</router-link>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-danger border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Dispatch Note
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white"
                  >{{disNoteLen}}</span
                  >
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="80"
                  ></base-progress>
                </div>
<!--                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template v-slot:title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>-->
              </div>
              <p class="mt-3 mb-0 text-sm">
                <router-link :to="{name:'DispatchNote'}" class="text-nowrap text-white font-weight-600">See details</router-link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </base-header>

<!--    <div class="container-fluid mt&#45;&#45;6">
      &lt;!&ndash;Charts&ndash;&gt;
      <div class="card-deck flex-column flex-xl-row">
        <card header-classes="bg-transparent">
          <template v-slot:header>
            <div class="row align-items-center">
              <div class="col">
                <h6 class="text-muted text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 mb-0">Sales value</h5>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <canvas :height="350" :id="salesChartID"></canvas>
          </div>
        </card>

        <card header-classes="bg-transparent">
          <template v-slot:header>
            <div class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <canvas :height="350" :id="ordersChartID"></canvas>
          </div>
        </card>
        &lt;!&ndash; Progress track list&ndash;&gt;
        <card>
          &lt;!&ndash; Card header &ndash;&gt;
          <template v-slot:header>
            <div class="row align-items-center">
              <div class="col-8">
                &lt;!&ndash; Surtitle &ndash;&gt;
                <h6 class="surtitle">5/23 projects</h6>
                &lt;!&ndash; Title &ndash;&gt;
                <h5 class="h3 mb-0">Progress track</h5>
              </div>
              <div class="col-4 text-right">
                <a href="#!" class="btn btn-sm btn-neutral">Action</a>
              </div>
            </div>
          </template>
          &lt;!&ndash; Card body &ndash;&gt;
          <progress-track-list :item-limit="5"></progress-track-list>
        </card>
      </div>
      &lt;!&ndash; End charts&ndash;&gt;

      &lt;!&ndash;Tables & Widgets&ndash;&gt;
      <div class="row">
        <div class="col-xl-8">
          <light-table :item-limit="5"></light-table>
        </div>
        <div class="col-xl-4">
          <vector-map-card></vector-map-card>
        </div>
      </div>
      &lt;!&ndash;End Tables & Widgets&ndash;&gt;

      &lt;!&ndash;Lists&ndash;&gt;
      <div class="card-deck flex-column flex-xl-row">
        &lt;!&ndash; Members list group card &ndash;&gt;
        <members-card :show-search="false"></members-card>
        &lt;!&ndash; Checklist &ndash;&gt;
        <task-list></task-list>
        &lt;!&ndash; Progress track &ndash;&gt;
        <card>
          &lt;!&ndash; Card header &ndash;&gt;
          <template v-slot:header>
            <h5 class="h3 mb-0">Progress track</h5>
          </template>
          &lt;!&ndash; Card body &ndash;&gt;
          <progress-track-list :item-limit="5"></progress-track-list>
        </card>
      </div>
      &lt;!&ndash;End lists&ndash;&gt;
    </div>-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      userLen: "",
      productLen: "",
      schemeLen: "",
      invoiceLen: "",
      purOrdersLen: "",
      disNoteLen: "",
    }
  },

  computed:{
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    }
  },

  mounted() {
    this.fetchUserLen();
    this.fetchProductLen();
    this.fetchSchemeLen();
    this.fetchInvoiceLen();
    this.fetchPurOrdersLen();
    this.fetchDisNoteLen();
  },

  methods: {
    fetchUserLen(){
      axios.get(`api/auth/getAllUser`)
        .then(response=>{
          this.userLen=response.data.userList.length;
        });
    },

    fetchProductLen(){
      axios.get(`api/product/get`)
        .then(response=>{
        this.productLen=response.data.length;
      });
    },

    fetchSchemeLen(){
      axios.get(`api/schema/get`)
        .then(response=>{
          this.schemeLen=response.data.length;
        });
    },

    fetchInvoiceLen(){
      axios.get(`api/invoice/get`)
        .then(response=>{
          this.invoiceLen=response.data.length;
        });
    },

    fetchPurOrdersLen(){
      axios.get(`api/purChaseOrder/get`)
        .then(response=>{
          this.purOrdersLen=response.data.length;
        });
    },

    fetchDisNoteLen(){
      axios.get(`api/desPatchNote/get`)
        .then(response=>{
          this.disNoteLen=response.data.length;
        });
    }
  }
}
</script>

<style></style>
