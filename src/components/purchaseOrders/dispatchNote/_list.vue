<template>
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
              <th>ID</th>
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
            <tr v-for="(data, index) in dispatchNoteData" :key="data._id">
              <td>{{ index + 1 }}</td>
              <td>{{ data._id }}</td>
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
          :total="pagination.total"
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
    fetchDispatchNote() {
      axios.get(`api/desPatchNote/get`,{
        params: {
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          DCNumber: this.form.DCNumber,
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
