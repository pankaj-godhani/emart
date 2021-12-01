<template>
  <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
    <div>

      <Table>
        <template v-slot:thead>
          <tr>
            <th>Sr. No</th>
            <th>PO Number</th>
            <th>PO Date</th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>total no. of Packages</th>
            <th>Net Weight in Kgs</th>
            <th>Invoice Value</th>
            <th>CGST Value</th>
            <th>SGST Value</th>
            <th>IGST Value</th>
            <th>Payment Received</th>
            <th>Action</th>
          </tr>
        </template>

        <template v-slot:tbody>
          <tr v-for="(data,index) in invoiceData" :key="data._id">
            <td>{{index+1}}</td>
            <td>{{data.PONumber}}</td>
            <td>{{data.PODate}}</td>
            <td>{{data.invoiceNumber}}</td>
            <td>{{data.invoiceDate}}</td>
            <td>{{data.NoOfPackages}}</td>
            <td>{{data.netWeight}}</td>
            <td>{{data.invoiceValue}}</td>
            <td>{{data.CGSTValue}}</td>
            <td>{{data.SGSTValue}}</td>
            <td>{{data.IGSTValue}}</td>
            <td>{{data.paymentReceived}}</td>
            <td>
              <div class="d-flex">
                <div class="pr-2">
                  <router-link
                    :to="{ name: 'InvoiceEdit', params: { id: data._id } }"
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
import  axios from "axios";

export default {
  components: {
    BasePagination,

  },
  /*computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    /!***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     *!/
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
  },*/
  data() {
    return {
      invoiceData:[],
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },

    };
  },
  mounted(){
    this.fetch();
  },

  methods: {
    fetch(){
      axios.get(`api/invoice/get`)
      .then((response)=>{
        this.invoiceData=response.data
        console.log(this.invoiceData);
      });
    }
  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
