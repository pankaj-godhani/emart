<template>
  <card
    class="no-border-card"
    body-classes="px-0 pb-1 py-3"
    footer-classes="pb-2"
  >
    <form>
      <div class="row px-2">
        <div class="col-3 pr-0 form-group">
          <div class="d-flex">
            <label class="mt-2 px-1">From:</label>
            <input
              type="date"
              class="form-control"
              placeholder="from"
              v-model="form.startDate"
            />
          </div>
        </div>
        <div class="col-3 pr-0 form-group">
          <div class="d-flex">
            <label class="mt-2 px-1">To:</label>
            <input
              type="date"
              class="form-control"
              placeholder="to"
              v-model="form.endDate"
              @mouseout="fetchSchemes"
            />
          </div>
        </div>
        <div class="col-2 pr-0">
          <input
            type="text"
            placeholder="Scheme Id"
            class="form-control"
            v-model="form.schemaNumber"
          />
        </div>
        <div class="col-1 pr-0">
          <button
            class="btn base-button btn-default"
            type="button"
            @click="fetchSchemes"
          >
            search
          </button>
        </div>
        <div class="col-1 pl-4">
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

    <div class="pl-0" v-if="visibleScheme">
      <Table>
        <template #thead>
          <tr>
            <th>Sr No</th>
            <!--                    <th>ID</th>-->
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
        <template #tbody>
          <tr v-for="(data, index) in schemeData" :key="data._id">
            <td>{{ index + 1 }}</td>
            <!--                    <td>{{data._id}}</td>-->
            <td>{{ data.schemaNumber }}</td>
            <td>{{ data.schemaName }}</td>
            <td>{{ data.date }}</td>
            <td>{{ data.EANCode }}</td>
            <td>{{ data.productName }}</td>
            <td>{{ data.quantity }}</td>
            <td>{{ data.UOM }}</td>
            <td>{{ data.freeQuantity }}</td>
            <td>{{ data.discount }}</td>
            <td>{{ data.netPTR }}</td>
            <td>{{ data.nararation }}</td>
            <td>{{ data.validity }}</td>
            <td>{{ data.active }}</td>
            <td>
              <div class="">
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
                <button
                  type="button"
                  class="btn base-button btn-icon btn-fab btn-danger btn-sm remove btn-link"
                  @click.prevent="destroy(data._id)"
                >
                  <i class="text-white ni ni-fat-remove"></i>
                </button>
              </div>
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <div v-if="visibleScheme == false" class="text-center mt-4">
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
import axios from "axios";

export default {
  components: {
    BasePagination,
  },
  computed: {},
  data() {
    return {
      visibleScheme: false,
      form: {
        startDate: "",
        endDate: "",
        schemaNumber: "",
      },

      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      schemeData: [],
      confirmModal: false,
      deleting: null,
    };
  },
  mounted() {
    this.fetchSchemes();
  },
  methods: {
    fetchSchemes() {
      axios
        .get(`api/schema/get`, {
          params: {
            startDate: this.form.startDate,
            endDate: this.form.endDate,
            schemaNumber: this.form.schemaNumber,
          },
        })
        .then((response) => {
          this.schemeData = response.data;
          this.visibleScheme = true;
        })
        .catch(() => {
          this.visibleScheme = false;
        });
    },

    resetForm() {
      this.form = {};
      this.fetchSchemes();
    },

    confirmDelete(type) {
      this.confirmModal = true;
      this.deleting = type;
    },
    destroy(id) {
      axios.delete(`api/schema/delete/` + id).then(() => {
        this.fetchSchemes();
        this.deleting = null;
      });
    },

    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
