<template>

        <card
          class="no-border-card"
          body-classes="px-0 pb-1 py-3"
          footer-classes="pb-2"
        >
          <div>
            <div class="row px-4">
              <label class="mt-2">Filter:</label>
              <div class="col-2 pr-0">
                <base-input
                  name="date"
                  type="date"
                  value="2018-11-23"
                  id="example-date-input"
                />

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
            <el-table
              :data="queriedData"
              row-key="id"
              header-row-class-name="thead-light"
              @selection-change="selectionChange"
            >
              <el-table-column min-width="100" prop="index" label="Sr No"></el-table-column>
              <el-table-column min-width="170" prop="name"
                               label="Delivery Challan / Invoice No">
              </el-table-column>
              <el-table-column min-width="160" prop="job"
                               label="Date of Delivery Challan No">
              </el-table-column>
              <el-table-column min-width="140" prop="salary"
                               label="PO Number">
              </el-table-column>
              <el-table-column min-width="150" prop="salary"
                               label="PO Date">
              </el-table-column>
              <el-table-column min-width="180" prop="salary"
                               label="Number of Carton Loaded">
              </el-table-column>
              <el-table-column min-width="200" prop="salary"
                               label="Transporter Details">
              </el-table-column>
              <el-table-column min-width="200" prop="salary"
                               label="Driver Name">
              </el-table-column>
              <el-table-column min-width="200" prop="salary"
                               label="Driver Contact">
              </el-table-column>
              <el-table-column min-width="200" prop="salary"
                               label="Vehicle Number">
              </el-table-column>

              <el-table-column min-width="180px" align="right" label="Actions">
                <template v-slot:default="props">
                  <div class="d-flex">
                    <base-button
                      @click="handleLike(props.$index, props.row)"
                      class="like btn-link"
                      type="info"
                      size="sm"
                      icon
                    >
                      <i class="text-white ni ni-like-2"></i>
                    </base-button>
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
            </el-table>
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
    queriedData() {
      if (!this.searchQuery) {
        return this.pagedData;
      }
      let result = this.tableData.filter((row) => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });

      return result.slice(this.from, this.to);
    },
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
    handleLike(index, row) {
      const swalWithBootstrapButtons1 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-fill",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons1.fire({
        title: `You liked ${row.name}`,
      });
    },
    handleEdit(index, row) {
      const swalWithBootstrapButtons2 = swal.mixin({
        customClass: {
          confirmButton: "btn btn-info btn-fill",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons2.fire({
        title: `You want to edit ${row.name}`,
      });
    },
    handleDelete(index, row) {
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
