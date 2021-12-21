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
      <div class="row mt-4" v-if="isAdmin===true">
        <div  class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fa fa-user fa-2x text-success" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Users
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{userLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Users'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fa fa-user fa-2x text-success" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Active Users
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{productLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Users'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fa fa-user fa-2x text-success" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Inactive Users
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{productLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Users'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>

      </div>
      <div class="row mt-4">
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fa fa-shopping-bag text-danger fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Products
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{productLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Products'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fa fa-shopping-bag text-danger fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days Products
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{productLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Products'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fa fa-cubes text-primary fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Schemes
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{schemeLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Schemes'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>

      </div>
      <div class="row mt-4">
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fa fa-cubes text-primary fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days Schemes
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{schemeLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Schemes'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fas fa-file-invoice text-warning fa-2x"></i>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Invoice
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{productLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Invoice'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fas fa-file-invoice text-warning fa-2x"></i>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days invoice
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{schemeLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Invoice'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>

      </div>
      <div class="row mt-4">
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
<!--                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag-fill text-success" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                  </svg>-->
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Purchase orders
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{schemeLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'PurchaseOrders'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days Purchase Orders
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{productLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'PurchaseOrders'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-card-heading text-info" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                    <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/>
                  </svg>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                   Total Dispatch Note
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{schemeLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'DispatchNote'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>

      </div>
      <div class="row mt-4">
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">

                <div class="col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-card-heading text-info" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                    <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/>
                  </svg>
                </div>
                <div class="col-auto">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days dispatch Note
                  </h5>
                  <h2 class="font-weight-bold mb-0 text-center">{{schemeLen}}</h2>

                </div>
              </div>
              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'DispatchNote'}" class="text-nowrap ">See details</router-link>
              </h4>
            </div>
          </div>
        </div>

      </div>
    </base-header>

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
