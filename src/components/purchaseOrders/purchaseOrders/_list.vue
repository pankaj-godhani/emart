<template>

        <card
          class="no-border-card"
          body-classes="px-0 pb-1 py-3"
          footer-classes="pb-2"
        >
          <form>
            <div class="row px-2">
              <div class="col-3 pr-0 form-group">
                <div class="d-flex">
                  <label class="mt-2 px-1">From:</label>
                  <input type="date" class="form-control" placeholder="from" v-model="form.startDate">
                </div>
              </div>
              <div class="col-3 pr-0 form-group">
                <div class="d-flex">
                  <label class="mt-2 px-1">To:</label>
                  <input type="date" class="form-control" placeholder="to" v-model="form.endDate" @mouseout="fetchPurchaseOrders">
                </div>
              </div>
              <div class="col-2 pr-0">
                <input
                  type="text"
                  placeholder="PO Number"
                  class="form-control"
                  v-model="form.PONumber"
                />
              </div>
              <div class="col-1 pr-0">
                <button
                  class="btn base-button btn-default"
                  type="button"
                  @click="fetchPurchaseOrders"
                >
                  search
                </button>
              </div>
              <div class="col-1 pl-4">
                <button
                  class="btn base-button btn-default"
                  type="button"
                  @click="resetForm"
                >
                  reset
                </button>
              </div>
            </div>
          </form>
          <div class="pl-0" v-if="visible">
            <Table>
              <template #thead>
                <tr>
                  <th>Sr No</th>
                  <th>ID</th>
                  <th>PO Number</th>
                  <th>Date</th>
                  <th>No. of Items</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Payment received</th>
                  <th>Delivery Status</th>
                </tr>

              </template>
              <template #tbody>
                <tr v-for="(data,index) in purchaseOrdersData" :key="data._id">
                  <td>{{index+1}}</td>
                  <td>{{data._id}}</td>
                  <td>{{ data.PONumber }}</td>
                  <td>{{ data.Date }}</td>
                  <td>{{ data.NoOfItems }}</td>
                  <td>{{ data.value }}</td>
                  <td>{{ data.status }}</td>
                  <td>{{ data.paymentReceived }}</td>
                  <td>{{ data.deliveryStatus }}</td>
                </tr>

              </template>
            </Table>
          </div>
          <div v-else-if="status===201" class="text-center mt-4 text-dark">
            Data not found
          </div>
          <template v-slot:footer>
            <div
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <div class="">
                <p class="card-category">
                  Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
                </p>
              </div>
              <base-pagination
                class="pagination-no-border"
                v-model="pagination.currentPage"
                :per-page="pagination.perPage"
                :total="total"
              >
              </base-pagination>
            </div>
          </template>
        </card>

</template>
<script>

import BasePagination from "@/components/BasePagination";
import axios from "axios";
export default {
  components: {
    BasePagination,
  },
  data() {
    return {
      form:{
        startDate:'',
        endDate:'',
        PONumber:'',
      },
      purchaseOrdersData: [],
      visible:false,
      error:'',
      status:'',
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },

    };
  },
  mounted(){
    this.fetchPurchaseOrders();
  },
  methods: {
    fetchPurchaseOrders(){
      axios.get(`api/purChaseOrder/get`,{
        params:{
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          PONumber:this.form.PONumber
        }
      })
      .then(response=>{
        this.purchaseOrdersData=response.data;
        this.status=response.status;
        console.log(response.status);
        if(this.status==200){
          this.visible=true;
        }
        else if(this.status==201){
          this.visible=false;
        }
      });
    },
    resetForm(){
      this.form={};
      this.fetchPurchaseOrders();
    }
  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
