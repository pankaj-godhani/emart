<template>

        <card
          class="no-border-card"
          body-classes="px-0 pb-1 py-3"
          footer-classes="pb-2"
        >

            <div class="row px-4">
              <label class="mt-2">Filter:</label>
              <div class="col-2 pr-0 form-group">

                <flat-picker

                  :config="{ allowInput: true, mode: 'range' }"
                  class="form-control datepicker"
                  v-model="date"
                >
                </flat-picker>

              </div>
              <div class="col-2 pr-0">
                <base-input
                  type="search"
                  clearable
                  placeholder="Scheme Id"
                  v-model="searchQuery"
                  aria-controls="datatables"
                >
                </base-input>
              </div>
            </div>

            <div class="pl-0">
<!--              <el-table
                :data="schemeData"
                row-key="id"
                header-row-class-name="thead-light"
                @selection-change="selectionChange"
              >
                <el-table-column  min-width="100" prop="index" label="Sr No"></el-table-column>
                <el-table-column min-width="150" prop="schemaNumber"
                                 label="Scheme No">
                </el-table-column>
                <el-table-column min-width="150" prop="schemaName"
                                 label="Scheme Name">
                </el-table-column>
                <el-table-column min-width="120" prop="date"
                                 label="Date">
                </el-table-column>
                <el-table-column min-width="150" prop="EANCode"
                                 label="EAN Code">
                </el-table-column>
                <el-table-column min-width="150" prop="productName"
                                 label="Product Name">
                </el-table-column>
                <el-table-column min-width="150" prop="quantity"
                                 label="Quantity">
                </el-table-column>
                <el-table-column min-width="150" prop="UOM"
                                 label="UOM">
                </el-table-column>
                <el-table-column min-width="150" prop="freeQuantity"
                                 label="Free Quantity">
                </el-table-column>
                <el-table-column min-width="150" prop="discount"
                                 label="Discount">
                </el-table-column>
                <el-table-column min-width="150" prop="netPTR"
                                 label="Net PTR">
                </el-table-column>
                <el-table-column min-width="150" prop="nararation"
                                                    label="Narration">
                </el-table-column>
                <el-table-column min-width="150" prop="validity"
                                 label="Validity">
                </el-table-column>
                <el-table-column min-width="150" prop="active"
                                 label="Active">
                </el-table-column>
                <el-table-column min-width="180px" align="right" label="Actions">
                  <template v-slot:default="props">
                    <div class="d-flex">
                      <base-button
                        @click="handleEdit(props.$index, props.row)"
                        class="edit"
                        type="warning"
                        size="sm"
                        icon
                      >
                        <i class="text-white ni ni-ruler-pencil"></i>
                      </base-button>
                      <base-button
                        @click="handleDelete(props.$index, props.row)"
                        class="remove btn-link"
                        type="danger"
                        size="sm"
                        icon
                      >
                        <i class="text-white ni ni-fat-remove"></i>
                      </base-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>-->
              <Table>
                <template #thead>
                  <tr>
                    <th>Sr No</th>
                    <th>ID</th>
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
                  <tr v-for="(data,index) in schemeData" :key="data._id">
                    <td>{{index+1}}</td>
                    <td>{{data._id}}</td>
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
                        <router-link :to="{name:'SchemesEdit',params: { id: data._id}}">
                          <button type="button"
                                  class="btn base-button btn-icon btn-fab btn btn-default btn-sm edit">
                            <i class="text-white ni ni-ruler-pencil"></i>
                          </button>
                        </router-link>
                        <button type="button"
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
<!--          <ConfirmModal v-model="confirmModal"
                        :title="('Delete Category',
                        { model_name: 'Category',model:('Category')})"
                        :description="('Are you sure you want to delete this record?')"
                        :confirm-text="('Delete It!')"
                        @confirmed="destroy"
          ></ConfirmModal>-->
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
import flatPicker from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';

import BasePagination from "@/components/BasePagination";
//import swal from "sweetalert2";
import users from "../../../views/Tables/users2";
import axios from 'axios';

export default {
  components: {
    BasePagination,
    flatPicker,
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption,
    [ElTable.name]: ElTable,
    [ElInput.name]: ElInput,
    [ElTableColumn.name]: ElTableColumn,
  },
  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    /***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     */

    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    },
  },
  data() {
    return {
      date:null,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      propsToSearch: ["name", "email"],
      tableData: users,
      fuseSearch: null,
      searchedData: [],
      schemeData:[],
      confirmModal: false,
      deleting: null,
    };
  },
  mounted() {
    this.fetchSchemes();
  },
  methods: {
    fetchSchemes(){
      axios.get("https://vuecrud78.herokuapp.com/api/schema/get")
      .then(response=>{
        this.schemeData=response.data;
        console.log(this.schemeData);
      });
    },
    confirmDelete(type) {
      this.confirmModal = true;
      this.deleting = type;
    },
    destroy(id) {
      axios.delete(`https://vuecrud78.herokuapp.com/api/schema/delete/`+id)
        .then(response => {
          console.log(response);
          this.fetchSchemes();
          this.deleting = null;
        });
    },
   /* handleEdit(index, row) {
      const swalWithBootstrapButtons2 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-info btn-fill",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons2.fire({
        title: `You want to edit ${row.name}`,
      });
    },*/
    /*handleDelete(index, row) {
      const swalWithBootstrapButtons3 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-fill",
          cancelButton: "btn btn-danger btn-fill",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons3
        .fire({
          title: "Are you sure?",
          text: `You won't be able to revert this!`,
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.value) {
            this.deleteRow(row);
            swalWithBootstrapButtons3.fire({
              title: "Deleted!",
              text: `You deleted ${row.name}`,
            });
          }
        });
    },
    deleteRow(row) {
      let indexToDelete = this.tableData.findIndex(
        (tableRow) => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },*/
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
