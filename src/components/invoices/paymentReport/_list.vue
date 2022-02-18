<template>
  <div>
    <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">

      <div class="text-center mt-4" v-if="loading">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else-if="visible">
        <Table>
          <template v-slot:thead>
            <tr>
              <th>Vendor Code</th>
              <th>Invoice Number</th>
              <th>Vendor GSTIN</th>
              <th>Vendor Name</th>
              <th>Payment Date</th>
              <th>Payment Mode</th>
              <th>Amount</th>
              <th>Remarks</th>
            </tr>
          </template>

          <template v-slot:tbody>
            <tr v-for="data in pagedData" :key="data._id">
              <td>{{data.userId._id}}</td>
              <td>{{data.invoiceNumber}}</td>
              <td>{{data.userId.GST}}</td>
              <td>{{data.userId.firstName}} {{data.userId.lastName}}</td>
              <td>{{changeDateFormat(data.paymentDate)}}</td>
              <td>{{data.paymentMode}}</td>
              <td>{{data.amount}}</td>
              <td>{{data.Remarks}}</td>
<!--              <td>
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
                      data-toggle="modal"
                      data-target="#myModal"
                      @click.prevent="confirmDelete(data)"
                    >
                      <i class="text-white ni ni-fat-remove"></i>
                    </button>
                  </div>
                </div>
              </td>-->
            </tr>

          </template>
        </Table>

      </div>
      <div v-else-if="status!==200 || error" class="text-center py-5">
        Data not found
      </div>
      <template v-slot:footer>
        <div
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
        >
          <div class="">
            <p class="card-category">
              Showing {{ from +1 }} to {{ to }} of {{ total }} entries
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
  </div>
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
        userID: "",
      },

      visible: false,
      loading: false,
      confirmModal: false,
      deleting: null,
      status: "",
      error: "",
      paymentReportData:[],
      pagination: {
        perPage: 7,
        currentPage: 1,
        total: 0,
      },

    };
  },
  computed: {
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    },
    pagedData() {
      return this.paymentReportData.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.visible ? this.pagination.perPage * (this.pagination.currentPage - 1) : (-1)
    },
    total() {
      return this.visible ? this.paymentReportData.length : 0;
    },
  },

  mounted(){
    this.fetch();
  },

  methods: {
    confirmDelete(type) {
      this.confirmModal = true;
      this.deleting = type;
    },
    resetForm() {
      this.form = {};
      this.fetch();
    },
    onChange(){
      console.log(event.target.value);
      this.fetch();
    },
    fetch(){
      this.loading = true;
      axios.get(`api/vendorPaymentReport/getPaymentList`)
        .then((response)=>{
          console.log(response);
          this.paymentReportData=response.data;
          this.status = response.status;
          if(this.status===200){
            this.visible=true;
          }
          else if(this.status===201){
            this.visible=false;
          }
          this.loading = false;
        })
        .catch((error)=>{
          this.error=error;
          this.visible=false;
          this.loading = false;
        });
    },
    destroy(){
      axios.delete(`api/invoice/delete/${this.deleting._id}`)
        .then(()=>{
          this.fetch();
          this.deleting = null;
          this.confirmModal = false;
        })
    },
  },
};
</script>

<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
tr th{
  font-size: 12px !important;
  font-weight: bold;
}
</style>
