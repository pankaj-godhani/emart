<template>
  <card class="no-border-card"
        body-classes="px-0 pb-1 py-3"
        footer-classes="pb-2">
    <div class="text-center mt-4" v-if="loading">
      <div class="spinner-border" role="status"></div>
    </div>
    <div class="pl-0" v-else-if="visible">
      <Table>
        <template #thead>
          <tr>
            <th>Sr No</th>
            <th>PO Number</th>
            <th>PO Date</th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>EAN</th>
            <th>Product Name</th>
            <th>Quantity Purchased</th>
            <th>Quantity Returned</th>
            <th>Remarks</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="(data,index) in pagedData" :key="index">
            <td>{{index+1}}</td>
            <td>{{data.gstGrRef}}</td>
            <td>{{ changeDateFormat(data.poDate) }}</td>
            <td :class="data.docRef?'':'text-center text-lg'">{{data.docRef?data.docRef:'-'}}</td>
            <td :class="data.docDate?'':'text-center text-lg'">{{data.docDate?data.docDate:'-'}}</td>
            <td></td>
            <td>{{data.itemName}}</td>
            <td>{{data.grQty}}</td>
            <td>{{data.prQty}}</td>
            <td :class="data.remarks?'':'text-center text-lg'">{{ data.remarks?data.remarks:'-' }}</td>

          </tr>
        </template>
      </Table>
    </div>
    <div v-else-if="error" class="text-center py-5">
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
import users from "../../../views/Tables/users2";
import axios from "axios";

export default {
  components: {
    BasePagination,
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["name", "email"],
      tableData: users,
      fuseSearch: null,
      searchedData: [],
      purchaseReturnData:[],
      loading:false,
      visible:false,
      error:'',
    };
  },
  computed: {
    pagedData() {
      return this.purchaseReturnData.slice(this.from, this.to);
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
      return this.visible ? this.purchaseReturnData.length : 0;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch(){
      this.loading = true;
      axios.get(`api/purChaseOrder/purchase_return`)
      .then(response=>{
        this.purchaseReturnData = response.data.result;
        this.loading = false;
        this.visible = true;
      })
      .catch(error=>{
        this.error=error;
      })
    }

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
