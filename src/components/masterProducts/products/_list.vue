<template>
  <card
    class="no-border-card"
    body-classes="px-0 pb-1 py-3"
    footer-classes="pb-2"
  >
    <form @submit.prevent="fetchProduct">
      <div class="row px-4">
        <div class="col-3 px-0 form-group">
          <div class="d-flex">
            <label class="mt-2 pr-1">From:</label>
            <input type="date" class="form-control" placeholder="from" v-model="form.startDate">
          </div>
        </div>
        <div class="col-3 pr-0 form-group">
          <div class="d-flex">
            <label class="mt-2 px-1">To:</label>
            <input type="date" class="form-control" placeholder="to" v-model="form.endDate" @mouseout="fetchProduct">
          </div>
        </div>
      </div>
      <div class="row px-4 pb-2">
        <div class="col-3 pl-5">
          <input
            type="text"
            class="form-control"
            placeholder="Product Name"
            aria-controls="datatables"
            v-model="form.productName"
            @keyup="fetchProduct"
          />
        </div>
        <div class="col-2 pl-0">
          <input
            class="form-control"
            placeholder="EAN Code"
            v-model="form.EANCode"
          />
        </div>
        <div class="col-2 pl-0">
          <input
            class="form-control"
            placeholder="SKU Code"
            v-model="form.SKUCode"
          />
        </div>
        <div class="col-1 pl-0">
          <base-button type="default" native-type="submit">Search</base-button>
        </div>
        <div class="col-1 pl-3">
          <button type="button" class="btn base-button btn-default" @click="resetForm">Reset</button>
        </div>

      </div>

    </form>

    <div v-if="visible">
      <Table>
        <template #thead>
          <tr>
            <th>Sr No</th>
<!--            <th>ID</th>-->
            <th>EAN Code</th>
            <th>HSN Code</th>
            <th>Date of Availability</th>
            <th>Brand Name</th>
            <th>Mftr Article No/SKU Code</th>
            <th>Product Category</th>
            <th>Product Name</th>
            <th>MRP</th>
            <th>Selling Price</th>
            <th>Margin</th>
            <th>Product Scheme</th>
            <th>Remarks</th>

          </tr>

        </template>
        <template #tbody>
          <tr v-for="(data,index) in productData" :key="data._id">
            <td>{{index+1}}</td>
<!--            <td>{{data._id}}</td>-->
            <td>{{ data.EANCode }}</td>
            <td>{{ data.HSNCode }}</td>
            <td>{{ data.dateOfAvailability }}</td>
            <td>{{ data.brandName }}</td>
            <td>{{ data.SKUCode }}</td>
            <td>{{ data.productCategory }}</td>
            <td>{{ data.productName }}</td>
            <td>{{ data.MRP }}</td>
            <td>{{ data.sellingPrice }}</td>
            <td>{{ data.margin }}</td>
            <td>{{ data.schemes }}</td>
            <td>{{ data.remarks }}</td>
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
import Card from "../../Cards/Card";
import axios from "axios";

export default {
  components: {
    Card,
    BasePagination,
  },

  data() {
    return {
      form:{
        productName:'',
        EANCode:'',
        SKUCode:'',
        startDate:'',
        endDate:'',
      },
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      productData:[],
      visible:false,
      status:'',
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    resetForm(){
      this.form={}
      this.fetchProduct();
    },

    fetchProduct(){
      axios.get(`api/product/get`,{
        params: {
          productName: this.form.productName,
          EANCode: this.form.EANCode,
          SKUCode: this.form.SKUCode,
          startDate: this.form.startDate,
          endDate: this.form.endDate,
        }
      })
      .then(response=>{
        this.productData=response.data;
        this.status=response.status;
        console.log(this.productData);
        if(this.status==200){
          this.visible=true;
        }
        else if(this.status==201){
          this.visible=false;
        }
      });
    }

  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
