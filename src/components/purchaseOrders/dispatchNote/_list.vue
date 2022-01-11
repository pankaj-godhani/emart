<template>
  <div>

    <card
      class="no-border-card"
      body-classes="px-0 pb-1 py-3"
      footer-classes="pb-2"
    >
      <div>
        <form>
          <div class="d-flex flex-row mb-3">
            <div class="pl-1" v-if="isAdmin===true">
              <select class="form-control " @change="onChange($event)" v-model="form.userID" style="width:150px;">
                <option disabled selected value>Select User</option>
                <option v-for="data in UserData" :key="data._id" :value="data._id">
                  {{data.firstName}} {{data.lastName}}
                </option>
              </select>
            </div>
            <div class="pl-2"><label class="mt-2 pr-1">From:</label></div>
            <div class="px-1">
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
                @mouseout="fetchDispatchNote"
              />
            </div>
            <div class="px-2">
              <input
                type="text"
                placeholder="DC Number"
                class="form-control"
                v-model="form.DCNumber"/>
            </div>
            <div class="pl-2">
              <button
                class="btn btn-default"
                type="button"
                @click="fetchDispatchNote"
              >
                search
              </button>
            </div>
            <div class="pl-1">
              <button
                class="btn btn-default"
                type="button"
                @click="resetForm"
              >
                reset
              </button>
            </div>
          </div>
        </form>
        <div class="text-center mt-4" v-if="loading">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else-if="visible">
          <Table>
            <template #thead>
              <tr>
                <th>Sr No</th>
                <th sortable>Deliver Challan/Invoice No</th>
                <th>Date of Deliver Challan No</th>
                <th>PO Number</th>
                <th>PO Date</th>
                <th>No. of Carton Loaded</th>
                <th>Transporter Details</th>
                <th>Driver Name</th>
                <th>Driver Contact</th>
                <th>Vehicle Number</th>
                <th>e-Way bill Number</th>
                <th>Total No. of Packages</th>
                <th>Net Weight in Kgs</th>
                <th>Gross Weight in Kgs</th>
                <th>Delivery Location</th>
                <th>eMetro Representative ID</th>
                <th>Actions</th>
              </tr>
            </template>
            <template #tbody>
              <tr v-for="(data, index) in pagedData" :key="data._id">
                <td>{{ index + 1 }}</td>
                <td>{{ data.DCNumber }}</td>
                <td>{{ changeDateFormat(data.DateOfDeliverChallan) }}</td>
                <td>{{ data.PONumber }}</td>
                <td>{{ changeDateFormat(data.PODate) }}</td>
                <td>{{ data.NumberOfCarton }}</td>
                <td>{{ data.TransporterDetails }}</td>
                <td>{{ data.DriverName }}</td>
                <td>{{ data.DriverContact }}</td>
                <td>{{ data.VehicleNumber }}</td>
                <td>{{ data.eWayBillNumber }}</td>
                <td>{{ data.totalNoOfPackages }}</td>
                <td>{{ data.netWeightInKgs }}</td>
                <td>{{ data.grossWeightInKgs }}</td>
                <td>{{ data.deliveryLocation }}</td>
                <td>{{ data.eMetroRepresentativeID }}</td>
                <td>
                  <div class="d-flex">
                    <div class="pr-2">
                      <button
                        type="button"
                        class="btn base-button btn-icon btn-fab btn btn-default btn-sm edit"
                        @click="downloadLabel(data._id)"
                      >
                        <i class="fa fa-print fa-lg" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div class="pr-2">
                      <router-link
                        :to="{ name: 'DispatchNoteEdit', params: { id: data._id } }"
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
                        @click="confirmDelete(data)"
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
        <div v-else-if="status!==200||error" class="text-center mt-4 text-dark">
          Data not found
        </div>

        <div  v-show="showTemplate && loading===false">
          <div>
            <div v-for="data in dispatchNoteData" :key="data._id" :id="data._id">
              <DispatchNotePDF :data="data"></DispatchNotePDF>
            </div>
          </div>
        </div>
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
            :total="pagination.total"
          >
          </base-pagination>
        </div>
      </template>
    </card>
    <div v-if="confirmModal">
      <DataModal :title="('Delete Dispatch Note')" @close="confirmModal=false">
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
              class="btn btn-default"
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
import axios from "axios";
import html2pdf from "html2pdf.js";
import UserData from "../../../mixins/UserData";
import DispatchNotePDF from "./dispatchNotePDF";

export default {
  mixins: [UserData],
  components: {
    BasePagination,
    DispatchNotePDF,
  },
  computed: {
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    },
    pagedData() {
      return this.dispatchNoteData.slice(this.from, this.to);
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
      return this.visible ? this.dispatchNoteData.length : 0;
    },
  },
  data() {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      form: {
        startDate: "",
        endDate: "",
        DCNumber: "",
        userID: "",
      },
      dispatchNoteData: [],
      status: "",
      error: "",
      loading: false,
      confirmModal: false,
      showTemplate: false,
      deleting: null,
      visible: false,
    };
  },
  mounted() {
    this.fetchDispatchNote();
  },

  methods: {
    confirmDelete(type) {
      this.confirmModal = true;
      this.deleting = type;
    },
    onChange(){
      console.log(event.target.value);
      this.fetchDispatchNote();
    },
    downloadLabel(id){
      var element = document.getElementById(id);
      html2pdf(element);
    },
    fetchDispatchNote() {
      this.loading = true;
      axios.get(`api/desPatchNote/get`,{
        params: {
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          DCNumber: this.form.DCNumber,
          userID: this.form.userID,
        },
      }).then((response) => {
        this.dispatchNoteData = response.data;
        this.status=response.status;
        if(this.status===200){
          this.visible=true;
          console.log('status is 200');
        }
        else if(this.status===201){
          this.visible=false;
          console.log('status is 201');
        }
        console.log('outside');
        this.loading = false;
      })
      .catch((error)=>{
        this.error=error;
        this.visible=false;
        this.loading = false;
      });
    },
    destroy() {
      axios.delete(`api/desPatchNote/delete/${this.deleting._id}`)
        .then(() => {
        this.fetchDispatchNote();
        this.deleting = null;
        this.confirmModal=false;
      });
    },
    resetForm() {
      this.form = {};
      this.fetchDispatchNote();
    },
  },
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
tr th{
  font-weight: bolder;
}
</style>
