<template>

  <div>
    <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2" >
      <div class="text-center mt-4" v-if="loading">
        <div class="spinner-border" role="status"></div>
      </div>
      <div v-else-if="visible">
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
              <td>{{data.invoice}}</td>
              <td>{{data.amount}}</td>
              <td>{{data.balance}}</td>

            </tr>

          </template>
        </Table>
      </div>
      <div v-else class="text-center py-5">
        Data not found
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
      visible:false,
    }
  },
  mounted() {
    this.fetch();
  },
  methods:{
    fetch(){
      this.loading = true;
      axios.post(`api/purChaseOrder/purchase_payment`,{
        "status":"OS"
      })
        .then(response=>{
          console.log(response.data.result);
          this.outstandingReportData = response.data.result;
          this.visible = true;
          this.loading = false;
        })
        .catch(()=>{
          this.loading = false;
        });
    }
  }
}
</script>

<style scoped>
tr th{
  font-size: 12px !important;
  font-weight: bold;
}
</style>
