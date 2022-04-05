<template>
  <div>
    <div>
      <BarcodeGenerator :value="2021001000000001" :width="2" :height="50"></BarcodeGenerator>
    </div>
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
        <tr v-for="(data, index) in schemeData" :key="data._id">
          <td>{{ index + 1 }}</td>
          <td>{{ data._id }}</td>
          <td>{{ data.schemaNumber }}
            <BarcodeGenerator :value="data.schemaNumber" :width="2" :height="50"></BarcodeGenerator>
          </td>
          <td>{{ data.schemaName }}
            <BarcodeGenerator :value="data.schemaName" :width="2" :height="50"></BarcodeGenerator>
          </td>
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

          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>
<script>
import axios from "axios";

export default {

  data() {
    return {
      schemeData: [],
    };
  },
  mounted() {
    this.fetchSchemes();
  },
  methods: {
    fetchSchemes() {
      axios
        .get("/api/schema/get")
        .then((response) => {
          this.schemeData = response.data;
         // console.log(this.schemeData);
        });
    },
  },
};
</script>

<style scoped>
.higher{
  z-index: 99999;
}
</style>
