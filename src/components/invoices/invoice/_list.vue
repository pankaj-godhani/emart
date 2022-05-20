<template>
  <div>

    <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">

      <form>
        <div class="d-flex flex-row mb-3">
          <div class="pl-1" v-if="isAdmin===true">
            <select class="form-control" @change="onChange($event)" v-model="form.userID" style="width:150px;">
              <option disabled selected value>Select User</option>
              <option v-for="data in UserData" :key="data._id" :value="data._id">
                {{data.firstName}} {{data.lastName}}
              </option>
            </select>
          </div>
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
          <div class="pl-2">
            <button
              class="btn base-button btn-default"
              type="button"
              @click="fetch"
            >
              search
            </button>
          </div>
          <div class="pl-1">
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
      <div class="text-center mt-4" v-if="loading">
        <div class="spinner-border" role="status"></div>
      </div>
      <div v-else-if="visible">
        <Table>
          <template v-slot:thead>
            <tr>
              <th>Sr. No</th>
              <th>PO Number</th>
              <th>PO Date</th>
              <th>Invoice Number</th>
              <th>Invoice Date</th>
              <th>Invoice Value</th>
              <th>CGST Value</th>
              <th>SGST Value</th>
              <th>IGST Value</th>
              <th>Action</th>
            </tr>
          </template>

          <template v-slot:tbody>
            <tr v-for="(data,index) in pagedData" :key="data._id">
              <td>{{index +1+ to -pagedData.length}}</td>
              <td>{{data.PONumber}}</td>
              <td :class="data.PODate?'':'text-xl'">{{data.PODate?changeDateFormat(data.PODate):'-'}}</td>
              <td>{{data.invoiceNumber}}</td>
              <td :class="data.invoiceDate?'':'text-xl'">{{data.invoiceDate?changeDateFormat(data.invoiceDate):'-'}}</td>
              <td>{{data.invoiceValue}}</td>
              <td>{{data.CGSTValue}}</td>
              <td>{{data.SGSTValue}}</td>
              <td>{{data.IGSTValue}}</td>
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
    <div v-if="confirmModal">
      <DataModal :title="('Delete Invoice')" @close="confirmModal=false">
        <template v-slot:body>
          <div><p>Are you sure you want to delete this record?</p></div>
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
  </div>

</template>
<script>

import BasePagination from "@/components/BasePagination";
import  axios from "axios";
import UserData from "../../../mixins/UserData";

export default {
  mixins: [UserData],
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
      invoiceData:[],
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
      return this.visible ? this.pagination.perPage * (this.pagination.currentPage - 1) : (-1)
    },
    total() {
      return this.visible ? this.invoiceData.length : 0
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
      axios.get(`api/invoice/get`,{
        params:{
          startDate:this.form.startDate,
          endDate:this.form.endDate,
          invoiceNumber:this.form.invoiceNumber,
          userID: this.form.userID,
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
