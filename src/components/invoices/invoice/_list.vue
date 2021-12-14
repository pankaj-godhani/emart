<template>
  <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">

    <form>
      <div class="d-flex flex-row mb-3">
        <div class="pl-2"><label class="mt-2 pr-1">From:</label></div>
        <div>
          <input
            type="date"
            class="form-control"
            placeholder="from"
            v-model="form.startDate"
          />
        </div>
        <div><label class="mt-2 pl-2">To:</label></div>
        <div class="px-2">
          <input
            type="date"
            class="form-control"
            placeholder="to"
            v-model="form.endDate"
            @mouseout="fetch"
          />
        </div>
        <div class="px-2">
          <input
            type="text"
            placeholder="Invoice Number"
            class="form-control"
            v-model="form.invoiceNumber"
          />
        </div>
        <div class="px-2">
          <button
            class="btn base-button btn-default"
            type="button"
            @click="fetch"
          >
            search
          </button>
        </div>
        <div>
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

    <div v-if="visible">
      <Table>
        <template v-slot:thead>
          <tr>
            <th>Sr. No</th>
            <th>PO Number</th>
            <th>PO Date</th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>total no. of Packages</th>
            <th>Net Weight in Kgs</th>
            <th>Invoice Value</th>
            <th>CGST Value</th>
            <th>SGST Value</th>
            <th>IGST Value</th>
            <th>Payment Received</th>
            <th>Action</th>
          </tr>
        </template>

        <template v-slot:tbody>
          <tr v-for="(data,index) in pagedData" :key="data._id">
            <td>{{index+1}}</td>
            <td>{{data.PONumber}}</td>
            <td>{{changeDateFormat(data.PODate)}}</td>
            <td>{{data.invoiceNumber}}</td>
            <td>{{changeDateFormat(data.invoiceDate)}}</td>
            <td>{{data.NoOfPackages}}</td>
            <td>{{data.netWeight}}</td>
            <td>{{data.invoiceValue}}</td>
            <td>{{data.CGSTValue}}</td>
            <td>{{data.SGSTValue}}</td>
            <td>{{data.IGSTValue}}</td>
            <td>2546</td>
            <td>
              <div class="d-flex">
                <div class="pr-2">
                  <router-link
                    :to="{ name: 'InvoiceEdit', params: { id: data._id } }"
                  >
                    <button
                      type="button"
                      class="btn base-button btn-icon btn-fab btn btn-default btn-sm edit"
                    >
                      <i class="text-white ni ni-ruler-pencil"></i>
                    </button>
                  </router-link>
                </div>
                <div>
                  <button
                    type="button"
                    class="btn base-button btn-icon btn-fab btn-danger btn-sm remove btn-link"
                    @click.prevent="destroy(data._id)"
                  >
                    <i class="text-white ni ni-fat-remove"></i>
                  </button>
                </div>
              </div>
            </td>
          </tr>

        </template>
      </Table>

    </div>
    <div v-else-if="status!==200 || error" class="text-center mt-4">
      Data not found
    </div>
    <template v-slot:footer>
      <div
        class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
      >
        <div class="">
          <p class="card-category">
            Showing {{ from }} to {{ to }} of {{ total }} entries
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
import  axios from "axios";

export default {
  components: {
    BasePagination,
  },
  data() {
    return {
      form: {
        startDate: "",
        endDate: "",
        invoiceNumber: "",
      },

      visible: false,
      status: "",
      error: "",
      invoiceData:[],
      pagination: {
        perPage: 8,
        currentPage: 1,
        total: 0,
      },

    };
  },
  computed: {
    pagedData() {
      return this.invoiceData.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      if(this.visible===true){
        return this.pagination.perPage * (this.pagination.currentPage - 1)+1;
      }
      else{
        return 0;
      }

    },
    total() {
     if(this.visible===true){
       return this.invoiceData.length;
     }
     else{
       return 0;
     }
    },
  },

  mounted(){
    this.fetch();
  },

  methods: {
    resetForm() {
      this.form = {};
      this.fetch();
    },
    fetch(){
      axios.get(`api/invoice/get`,{
        params:{
          startDate:this.form.startDate,
          endDate:this.form.endDate,
          invoiceNumber:this.form.invoiceNumber,
        },
      })
      .then((response)=>{
        this.invoiceData=response.data;
        this.status = response.status;
        if(this.status===200){
          this.visible=true;
        }
        else if(this.status===201){
          this.visible=false;
        }
      })
      .catch((error)=>{
        this.error=error;
        this.visible=false;
      });
    },
    destroy(id){
      axios.delete(`api/invoice/delete/`+id,)
      .then(()=>{
        this.fetch();
      })
    },
  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
