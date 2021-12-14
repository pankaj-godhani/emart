<template>
  <card  class="no-border-card"
         body-classes="px-0 pb-1 py-3"
         footer-classes="pb-2"
  >
    <div class="pl-0">
      <Table>
        <template #thead>
          <tr>
            <th>Sr No</th>
            <th>Product Name</th>
            <th>Vendor Invoice Reference</th>
            <th>e-Metro PO Reference & Date</th>
            <th>Description</th>
            <th>Item Quantity</th>
            <th>HSN Code</th>
            <th>Unit Price</th>
            <th>Price Difference</th>
            <th>Tax Rate</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>IGST</th>
            <th>Amount</th>
          </tr>
        </template>
        <template #tbody>
          <tr>

            <td>1</td>
            <td>tyuy</td>
            <td>yyhj</td>
            <td>tyjuytu</td>
            <td>tyuytu</td>
            <td>tyutyu</td>
            <td>tyuty</td>
            <td>yujyy</td>
            <td>tyut</td>
            <td>yujyu</td>
            <td>yujiyji</td>
            <td>uyjyu</td>
            <td>yujiuy</td>
            <td>yujuj</td>
          </tr>
        </template>
      </Table>
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
import swal from "sweetalert2";
import users from "../../../views/Tables/users2";

export default {
  components: {
    BasePagination,
  },
  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
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
        perPage: 5,
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
