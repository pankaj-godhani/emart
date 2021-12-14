<template>
  <card class="no-border-card"
        body-classes="px-0 pb-1 py-3"
        footer-classes="pb-2">
    <div class="pl-0">
      <Table>
        <template #thead>
          <tr>
            <th>Sr No</th>
            <th>PO Number</th>
            <th>PO Date</th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>EAN</th>
            <th>Product Name</th>
            <th>Quantity Purchased</th>
            <th>Quantity Returned</th>
            <th>Reason of Return</th>
            <th>Credit Note ID</th>
            <th>Remarks</th>
          </tr>
        </template>
        <template #tbody>
          <tr>

            <td>1</td>
            <td>rere</td>
            <td>ertr</td>
            <td>ertr</td>
            <td>retr</td>
            <td>etr</td>
            <td>erte</td>
            <td>reet</td>
            <td>rret</td>
            <td>rtry</td>
            <td>yghgj</td>
            <td>yhyt</td>
<!--            <td>
              <div class="d-flex">
                <div class="pr-2">
                  <router-link
                    :to="{ name: 'UserEdit', params: { id: data._id } }"
                  >
                    <button
                      type="button"
                      class="btn base-button btn-icon btn-fab btn btn-default btn-sm edit"
                    >
                      <i class="text-white ni ni-ruler-pencil"></i>
                    </button>
                  </router-link>
                </div>
                &lt;!&ndash;                <div>
                                  <button
                                    type="button"
                                    class="btn base-button btn-icon btn-fab btn-danger btn-sm remove btn-link"
                                    @click.prevent="destroy(data._id)"
                                  >
                                    <i class="text-white ni ni-fat-remove"></i>
                                  </button>
                                </div>&ndash;&gt;
              </div>
            </td>-->
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


  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
