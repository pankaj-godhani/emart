<template>
  <div>
    <base-header class="pb-6" type="">
      <!-- Card stats -->
      <div class="row mt-4 px-5" v-if="isAdmin===true">
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-user fa-2x text-success" aria-hidden="true"></i>
                </div>
                <div class="col-auto ">
                  <h2 class="font-weight-bold mb-0 text-center">{{userLen.totalUser}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Users
                  </h5>


                </div>
              </div>
<!--              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Users'}" class="text-nowrap ">See details</router-link>
              </h4>-->
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-user fa-2x text-success" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{userLen.activeUser}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Active Users
                  </h5>


                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">
                <div class="col mt-2">
                  <i class="fa fa-user fa-2x text-success" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{userLen.inActiveUser}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Inactive Users
                  </h5>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="isAdmin?'row justify-content-md-center':'row mt-4 justify-content-md-center'">
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-shopping-bag text-danger fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{productLen.totalProduct}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Products
                  </h5>


                </div>
              </div>
<!--              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Products'}" class="text-nowrap ">See details</router-link>
              </h4>-->
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-shopping-bag text-danger fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{productLen.last10DayProductDetail}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days Products
                  </h5>


                </div>
              </div>
<!--              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Products'}" class="text-nowrap ">See details</router-link>
              </h4>-->
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-cubes text-primary fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{schemeLen.totalSchema}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Schemes
                  </h5>


                </div>
              </div>
<!--              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Schemes'}" class="text-nowrap ">See details</router-link>
              </h4>-->
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-cubes text-primary fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{schemeLen.last10DaySchemaDetail}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days Schemes
                  </h5>


                </div>
              </div>
<!--              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'Schemes'}" class="text-nowrap ">See details</router-link>
              </h4>-->
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{purOrdersLen.totalPurchaseOrder}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Purchase orders
                  </h5>
                </div>
              </div>
<!--              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'PurchaseOrders'}" class="text-nowrap ">See details</router-link>
              </h4>-->
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{purOrdersLen.last10DayPurchaseOrderDetail}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days Purchase Orders
                  </h5>


                </div>
              </div>
<!--              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'PurchaseOrders'}" class="text-nowrap ">See details</router-link>
              </h4>-->
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-sticky-note fa-2x text-primary" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{disNoteLen.totalDespatch}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Dispatch Note
                  </h5>


                </div>
              </div>
<!--              <h4 class="mt-3 mb-0 ">
                <router-link :to="{name:'DispatchNote'}" class="text-nowrap ">See details</router-link>
              </h4>-->
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-sticky-note fa-2x text-primary" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{disNoteLen.last10DayDespatch}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days dispatch Note
                  </h5>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-credit-card fa-2x text-info" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{debitLen.totalDebit}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Debit Memo
                  </h5>


                </div>
              </div>
              <!--              <h4 class="mt-3 mb-0 ">
                              <router-link :to="{name:'DispatchNote'}" class="text-nowrap ">See details</router-link>
                            </h4>-->
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-credit-card fa-2x text-info" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{debitLen.last10DayDebitDetail}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days Debit Memo
                  </h5>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-credit-card fa-2x text-info" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{creditLen.totalCredit}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Credit Memo
                  </h5>


                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row mt-3 mb-3">

                <div class="col mt-2">
                  <i class="fa fa-credit-card fa-2x text-info" aria-hidden="true"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-center">{{creditLen.last10DayCreditDetail}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days Credit Memo
                  </h5>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row ">

                <div class="col mt-2">
                  <i class="fas fa-file-invoice text-warning fa-2x"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-right">{{invoiceLen.totalInvoice}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Total Invoice
                  </h5>


                </div>
              </div>
              <div class="float-right">
                <h2 class="font-weight-bold mb-0 mt-3 text-right">{{invoiceLen.sumOfTotalInvoice}}</h2>
                  <h5 class="text-uppercase text-muted mb-0 text-dark ">
                    Total Invoice value
                  </h5>

              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-md-6">
          <div class="card bg-gradient-white border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col mt-2">
                  <i class="fas fa-file-invoice text-warning fa-2x"></i>
                </div>
                <div class="col-auto">
                  <h2 class="font-weight-bold mb-0 text-right">{{invoiceLen.last10DayInvoice}}</h2>
                  <h5 class="card-title text-uppercase text-muted mb-0 text-dark">
                    Last 10 days invoice
                  </h5>


                </div>
              </div>
              <div class="float-right">
                <h2 class="font-weight-bold mb-0 mt-3 text-right">{{invoiceLen.sumOfDaysInvoice}}</h2>
                <h5 class="text-uppercase text-muted mb-0 text-dark ">
                  Total Invoice value of last 10 days
                </h5>

              </div>
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
      countList: "",
      userLen: "",
      productLen: "",
      schemeLen: "",
      invoiceLen: "",
      purOrdersLen: "",
      disNoteLen: "",
      creditLen: "",
      debitLen: "",
    }
  },

  computed:{
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    }
  },

  mounted() {
    this.fetchCount();
  },

  methods: {
    fetchCount(){
      axios.get(`api/auth/getCountDetail`)
        .then(response=>{
          console.log(response.data);
          if(this.isAdmin)
          {
            this.userLen = response.data.countList[0];
            this.disNoteLen = response.data.countList[1];
            this.invoiceLen = response.data.countList[2];
            this.productLen = response.data.countList[3];
            this.purOrdersLen = response.data.countList[4];
            this.schemeLen = response.data.countList[5];
            this.creditLen = response.data.countList[6];
            this.debitLen = response.data.countList[7];
          }
          else
          {
            this.disNoteLen = response.data.countList[0];
            this.invoiceLen = response.data.countList[1];
            this.productLen = response.data.countList[2];
            this.purOrdersLen = response.data.countList[3];
            this.schemeLen = response.data.countList[4];
            this.creditLen = response.data.countList[5];
            this.debitLen = response.data.countList[6];
          }

        });
    },
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
