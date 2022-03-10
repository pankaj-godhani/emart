<template>
  <div>
    <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">

      <div class="text-center mt-4" v-if="loading">
        <div class="spinner-border" role="status"></div>
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
            <tr v-for="data in pagedData" :key="data.vendorId">
              <td>{{data.vendorCode}}</td>
              <td>{{data.invoice}}</td>
              <td>{{data.gst}}</td>
              <td>{{data.vendorName}}</td>
              <td>{{changeDateFormat(data.paymentDate)}}</td>
              <td>{{data.paymentMode}}</td>
              <td>{{data.amount}}</td>
              <td>{{data.remarks}}</td>
            </tr>
          </template>
        </Table>
      </div>
      <div v-else-if=" error" class="text-center py-5">
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
    fetch(){
      this.loading = true;
      axios.post(`api/purChaseOrder/purchase_payment`,{
        "status":""
      })
        .then((response)=>{
          console.log(response);
          this.paymentReportData=response.data.result;
          this.status = response.status;
          this.visible=true;
          this.loading = false;
        })
        .catch((error)=>{
          this.error=error;
          this.visible=false;
          this.loading = false;
        });
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
