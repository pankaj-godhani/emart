<template>

        <card
          class="no-border-card"
          body-classes="px-0 pb-1 py-3"
          footer-classes="pb-2"
        >
          <div>
            <form>
              <div class="row px-2">
                <div class="col-3 pr-0 form-group">
                  <div class="d-flex">
                    <label class="mt-2 px-1">From:</label>
                    <input type="date" class="form-control" placeholder="from">
                  </div>
                </div>
                <div class="col-3 pr-0 form-group">
                  <div class="d-flex">
                    <label class="mt-2 px-1">To:</label>
                    <input type="date" class="form-control" placeholder="to">
                  </div>
                </div>
                <div class="col-2 pr-0">
                  <input
                    type="text"
                    placeholder="DC Number"
                    class="form-control"
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
            <div >
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
                  </tr>

                </template>
                <template #tbody>
                  <tr v-for="(data,index) in productData" :key="data._id">
                    <td>{{index+1}}</td>
                    <td>{{data._id}}</td>
                    <td>{{ data.EANCode }}</td>
                    <td>{{ data.HSNCode }}</td>
                    <td>{{ data.dateOfAvailability }}</td>
                    <td>{{ data.brandName }}</td>
                    <td>{{ data.SKUCode }}</td>
                    <td>{{ data.productCategory }}</td>
                    <td>{{ data.productName }}</td>
                    <td>{{ data.MRP }}</td>
                    <td>{{ data.sellingPrice }}</td>
                  </tr>

                </template>
              </Table>
            </div>
            <div class="text-center mt-4 text-dark">
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
                :total="total"
              >
              </base-pagination>
            </div>
          </template>
        </card>

</template>
<script>
import {
  ElTable,
  ElTableColumn,
  ElSelect,
  ElOption,
  ElInput,
} from "element-plus";

import BasePagination from "@/components/BasePagination";
import swal from "sweetalert2";
import users from "../../../views/Tables/users2";

export default {
  components: {
    BasePagination,

    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption,
    [ElTable.name]: ElTable,
    [ElInput.name]: ElInput,
    [ElTableColumn.name]: ElTableColumn,
  },
  data() {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["name", "email"],
      tableData: users,
      fuseSearch: null,
      searchedData: [],
    };
  },
  methods: {

  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
