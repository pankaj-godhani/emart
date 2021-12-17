<template>
  <div>
    <div class="mb-2" v-if="isAdmin===true">
      <select class="form-control w-25" @change="onChange($event)" v-model="form.userID">
        <option disabled value="0" selected>Select User</option>
        <option v-for="data in UserData" :key="data._id" :value="data._id">
          {{data.firstName}} {{data.lastName}}
        </option>
      </select>
    </div>
    <card
      class="no-border-card"
      body-classes="px-0 pb-1 py-3"
      footer-classes="pb-2"
    >
      <div>
        <form>
          <div class="d-flex flex-row mb-3">
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
            <div class="px-2">
              <button
                class="btn base-button btn-default"
                type="button"
                @click="fetchDispatchNote"
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
            <template #thead>
              <tr>
                <th>Sr No</th>
                <th>Deliver Challan/Invoice No</th>
                <th>Date of Deliver Challan No</th>
                <th>PO Number</th>
                <th>PO Date</th>
                <th>No. of Carton Loaded</th>
                <th>Transporter Details</th>
                <th>Driver Name</th>
                <th>Driver Contact</th>
                <th>Vehicle Number</th>
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
                <td>
                  <div class="d-flex">
                    <div class="pr-2">
                      <button
                        type="button"
                        class="btn base-button btn-icon btn-fab btn btn-default btn-sm edit"
                        @click="downloadLabel(data._id)"
                      >
                        Print
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
        <div v-else-if="visible === false||error" class="text-center mt-4 text-dark">
          Data not found
        </div>
        <div v-show="false">
          <div v-for="data in pagedData" :key="data._id" :id="data._id" class="mt-4">
            <h2 style="text-align: center;" class="text-dark">Dispatch Note details</h2>
            <div class="p-5">
              <h4 class="px-4 text-dark"> Deliver Challan/Invoice No :
                <span class="px-2 font-weight-400">
                {{data.DCNumber}}
              </span>
              </h4>
              <h4 class="px-4 text-dark">Date of Deliver Challan No :
                <span class="px-2 font-weight-400">
                {{ changeDateFormat(data.DateOfDeliverChallan) }}
              </span>
              </h4>
              <h4 class="px-4 text-dark">PO Number :
                <span class="px-2 font-weight-400">
                {{ data.PONumber }}
              </span>
              </h4>
              <h4 class="px-4 text-dark">PO Date :
                <span class="px-2 font-weight-400">
                {{ changeDateFormat(data.PODate) }}
              </span>
              </h4>
              <h4 class="px-4 text-dark">No. of Carton Loaded :
                <span class="px-2 font-weight-400">
                {{ data.NumberOfCarton }}
              </span>
              </h4>
              <h4 class="px-4 text-dark">Transporter Details :
                <span class="px-2 font-weight-400">
                {{ data.TransporterDetails }}
              </span>
              </h4>
              <h4 class="px-4 text-dark">Driver Name :
                <span class="px-2 font-weight-400">
                {{ data.DriverName }}
              </span>
              </h4>
              <h4 class="px-4 text-dark">Driver Contact :
                <span class="px-2 font-weight-400">
                {{ data.DriverContact }}
              </span>
              </h4>
              <h4 class="px-4 text-dark">Vehicle Number :
                <span class="px-2 font-weight-400">
                {{ data.VehicleNumber }}
              </span>
              </h4>
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
              Showing {{ from }} to {{ to }} of {{ total }} entries
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
  </div>

</template>
<script>
import BasePagination from "@/components/BasePagination";
import axios from "axios";
import html2pdf from "html2pdf.js";
import UserData from "../../../mixins/UserData";


export default {
  mixins: [UserData],
  components: {
    BasePagination,
  },
  computed: {
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    },
    pagedData() {
      return this.dispatchNoteData.slice(this.from-1, this.to);
    },

    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.visible ? this.pagination.perPage * (this.pagination.currentPage - 1)+1 : 0;
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
      deleting: null,
      visible:false,
    };
  },
  mounted() {
    this.fetchDispatchNote();
  },

  methods: {
    onChange(){
      console.log(event.target.value);
      this.fetchDispatchNote();
    },
    downloadLabel(id){
      var element = document.getElementById(id);
      html2pdf(element);
    },
    fetchDispatchNote() {
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
        if(this.status==200){
          this.visible=true;
        }
        else if(this.status==201){
          this.visible=false;
        }
      })
      .catch((error)=>{
        this.error=error;
        this.visible=false;
      });
    },
    destroy(id) {
      axios.delete(`api/desPatchNote/delete/` + id).then(() => {
        this.fetchDispatchNote();
        this.deleting = null;
      });
    },
    resetForm() {
      this.form = {};
      this.fetchDispatchNote();
    },
  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
