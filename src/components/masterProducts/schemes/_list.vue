<template>
  <div>
    <div>
      <card
        class="no-border-card"
        body-classes="px-0 pb-1 py-3"
        footer-classes="pb-2"
      >
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
                @mouseout="fetchSchemes"
              />
            </div>
            <div class="px-2">
              <input
                type="text"
                placeholder="Scheme Id"
                class="form-control"
                v-model="form.schemaNumber"
              />
            </div>
            <div class="pl-2">
              <button
                class="btn btn-default"
                type="button"
                @click="fetchSchemes"
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
          <div class="spinner-border" role="status"></div>
        </div>
        <div v-else-if="visibleScheme">
          <Table>
            <template v-slot:thead>
              <tr>
                <th>Sr No</th>
                <th>Scheme No</th>
                <th>Scheme Name</th>
                <th>Date</th>
                <th>EAN Code</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>UOM</th>
                <th>Free Quantity</th>
                <th>Discount</th>
                <th>Net PTR</th>
                <th>Narration</th>
                <th>Validity</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </template>
            <template v-slot:tbody>
              <tr v-for="(data, index) in pagedData" :key="data._id">

                <td>{{ index + 1 }}</td>
                <td>{{ data.schemaNumber }}</td>
                <td>{{ data.schemaName }}</td>
                <td>{{ changeDateFormat(data.date) }}</td>
                <td>{{ data.EANCode }}</td>
                <td>{{ data.productName }}</td>
                <td>{{ data.quantity }}</td>
                <td>{{ data.UOM }}</td>
                <td>{{ data.freeQuantity }}</td>
                <td>{{ data.discount }}</td>
                <td>{{ data.netPTR }}</td>
                <td>{{ data.nararation }}</td>
                <td>{{ changeDateFormat(data.validity) }}</td>
                <td>{{ data.active }}</td>
                <td>
                  <div class="d-flex">
                    <div class="pr-2">
                      <router-link
                        :to="{ name: 'SchemesEdit', params: { id: data._id } }"
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
        <div v-else-if="status!==200||error" class="text-center py-5">
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

    <div v-if="confirmModal">
      <DataModal :title="('Delete Scheme')" @close="confirmModal=false">
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
  </div>

</template>
<script>
import BasePagination from "@/components/BasePagination";
import axios from "axios";
import UserData from "../../../mixins/UserData";
import DataModal from "../../dataModal";

export default {
  mixins: [UserData],
  components: {
    DataModal,
    BasePagination,
  },
  computed: {
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    },
    pagedData() {
      return this.schemeData.slice(this.from, this.to);
    },

    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.visibleScheme ? this.pagination.perPage * (this.pagination.currentPage - 1) : (-1);
    },
    total() {
      return this.visibleScheme ? this.schemeData.length : 0;
    },
  },
  data() {
    return {
      currentPage:1,
      visibleScheme: false,
      error: "",
      status: "",
      form: {
        startDate: "",
        endDate: "",
        schemaNumber: "",
        userID: "",
      },

      pagination: {
        perPage: 7,
        currentPage: 1,
        total: 0,
      },
      schemeData: [],
      confirmModal: false,
      deleting: null,
      loading:false,
    };
  },
  mounted() {
    this.fetchSchemes();
  },
  methods: {
    confirmDelete(type) {
      this.confirmModal = true;
      this.deleting = type;
    },
    onChange(){
      console.log(event.target.value);
      this.fetchSchemes();
    },
    fetchSchemes() {
      this.loading = true;
      axios
        .get(`api/schema/get`, {
          params: {
            startDate: this.form.startDate,
            endDate: this.form.endDate,
            schemaNumber: this.form.schemaNumber,
            userID: this.form.userID,
          }
        })
        .then((response) => {
          this.schemeData = response.data;
          this.status = response.status;
          if(this.status===200){
            this.visibleScheme = true;
          }
          else{
            this.visibleScheme = false;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.error=error;
          this.visibleScheme = false;
          this.loading = false;
        });
    },

    resetForm() {
      this.form = {};
      this.fetchSchemes();
    },

    destroy() {
      axios.delete(`api/schema/delete/${this.deleting._id}`)
        .then(() => {
        this.fetchSchemes();
        this.deleting = null;
        this.confirmModal = false;
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
