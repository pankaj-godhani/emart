<template>
  <card  class="no-border-card"
         body-classes="px-0 pb-1 py-3"
         footer-classes="pb-2"
  >
    <div class="text-center mt-4" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="pl-0" v-else-if="visible">
      <Table>
        <template #thead>
          <tr>
            <th>Sr No</th>
            <th>Product Name</th>
            <th>Vendor Invoice Reference & Date</th>
            <th>e-Metro PO Reference & Date</th>
            <th>Description</th>
            <th>Item Quantity</th>
            <th>HSN Code</th>
            <th>Unit Price</th>
            <th>Tax Rate</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>IGST</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="(data,index) in debitData" :key="data._id">
            <td>{{ index+1 }}</td>
            <td>{{ data.productName }}</td>
            <td>{{changeDateFormat(data.vendorInvoiceRef_Date) }}</td>
            <td>{{ changeDateFormat(data.eMetroPoRef_Date) }}</td>
            <td>{{ data.description }}</td>
            <td>{{ data.itemQuantity }}</td>
            <td>{{ data.HSNCode }}</td>
            <td>{{ data.unitPrice }}</td>
            <td>{{ data.taxRate }}</td>
            <td>{{ data.CGST }}</td>
            <td>{{ data.SGST }}</td>
            <td>{{ data.IGST }}</td>
            <td>{{ data.amount }}</td>
            <td>
              <div class="d-flex">
                <div class="pr-2">
                  <router-link
                    :to="{ name: 'DebitEdit', params: { id: data._id } }"
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
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <div v-else-if="status===201||error" class="text-center mt-4">
      Data not found
    </div>
    <template v-slot:footer>
      <div
        class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
      >
        <div class="">
          <p class="card-category">
            Showing {{ from +1}} to {{ to }} of {{ total }} entries
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
  <div v-if="confirmModal">
    <DataModal :title="('Delete Debit Memo')" @close="confirmModal=false">
      <template v-slot:body>
        <div><span>Are you sure you want to delete this record?</span></div>
        <div class="float-right">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="confirmModal=false"
          >
            Close
          </button>
          <button
            type="button"
            class="btn base-button btn-default"
            data-dismiss="modal"
            @click="destroy"
          >
            Delete It
          </button>
        </div>
      </template>
    </DataModal>
  </div>
</template>
<script>


import BasePagination from "@/components/BasePagination";
import axios from "axios";

export default {
  components: {
    BasePagination,
  },
  computed: {
    pagedData() {
      return this.debitData.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.visible ? this.pagination.perPage * (this.pagination.currentPage - 1) : (-1);
    },
    total() {
      return this.visible ? this.debitData.length : 0;
    },
  },
  data() {
    return {
      pagination: {
        perPage: 7,
        currentPage: 1,
        total: 0,
      },
      debitData: [],
      status: "",
      visible: false,
      loading: false,
      confirmModal: false,
      deleting: null,
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    confirmDelete(type) {
      this.confirmModal = true;
      this.deleting = type;
    },
    fetch(){
      this.loading = true;
      axios.get(`api/debitMemo/getAllUserDebitMemo`)
        .then(response=>{
          console.log(response);
          this.debitData = response.data;
          this.status = response.status;
          console.log(this.status);
          if(this.status===200){
            this.visible=true;
          }
          else{
            this.visible=false;
          }
          this.loading = false
        })
      .catch((error)=>{
        this.error=error;
        this.visible=false;
        this.loading = false
      });
    },
    destroy(){
      axios.delete(`api/debitMemo/removeUserDebitMemo/${this.deleting._id}`)
        .then(()=>{
          this.fetch();
          this.deleting = null;
          this.confirmModal = false;
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
