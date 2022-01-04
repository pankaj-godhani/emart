<template>

  <div>
    <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2" >
      <div class="text-center mt-4" v-if="loading">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else>
        <Table>
          <template v-slot:thead>
            <tr>
              <th>Vendor Code</th>
              <th>Vendor Name</th>
              <th>Invoice Total</th>
              <th>Payment Total</th>
              <th>Balance Total</th>

            </tr>
          </template>

          <template v-slot:tbody>
            <tr v-for="data in outstandingReportData" :key="data._id">
              <td>{{data.vendorCode}}</td>
              <td>{{data.vendorName}}</td>
              <td>{{data.invoiceTotal}}</td>
              <td>{{data.paymentTotal}}</td>
              <td>{{data.balanceTotal}}</td>
              <!--              <td>
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
                                    data-toggle="modal"
                                    data-target="#myModal"
                                    @click.prevent="confirmDelete(data)"
                                  >
                                    <i class="text-white ni ni-fat-remove"></i>
                                  </button>
                                </div>
                              </div>
                            </td>-->
            </tr>

          </template>
        </Table>
      </div>
    </card>
  </div>

</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      outstandingReportData: [],
      loading:false,
    }
  },
  mounted() {
    this.fetch();
  },
  methods:{
    fetch(){
      this.loading = true;
      axios.get(`api/vendorPaymentReport/getOutStandingReport`)
        .then(response=>{
          this.outstandingReportData = response.data;
          console.log(response.data);
        })
        .finally(()=>(this.loading = false));
    }
  }
}
</script>

<style scoped>
tr th{
  font-weight: bolder;
}
</style>
