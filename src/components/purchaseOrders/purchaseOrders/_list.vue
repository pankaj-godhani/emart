<template>
  <div>

    <card
      class="no-border-card"
      body-classes="px-0 pb-1 py-3"
      footer-classes="pb-2"
    >
      <form>

        <div class="d-flex flex-row mb-3">
          <div class="pl-1" v-if="isAdmin===true">
            <select class="form-control" @change="onChange($event)" v-model="form.userID" style="width:150px;">
              <option disabled selected value>Select User</option>
              <option v-for="data in UserData" :key="data._id" :value="data._id">
                {{data.firstName}} {{data.lastName}}
              </option>
            </select>
          </div>
          <div class="pl-2"><label class="mt-2 pr-1">From:</label></div>
          <div class="px-1">
            <input
              type="date"
              class="form-control"
              placeholder="from"
              v-model="form.startDate"
            />
          </div>
          <div><label class="mt-2 pl-2">To:</label></div>
          <div class="px-2">
            <input
              type="date"
              class="form-control"
              placeholder="to"
              v-model="form.endDate"
              @mouseout="fetchPurchaseOrders"
            />
          </div>
          <div class="px-2">
            <input
              type="text"
              placeholder="PO Number"
              class="form-control"
              v-model="form.PONumber"
            />
          </div>
          <div class="pl-2">
            <button
              class="btn base-button btn-default"
              type="button"
              @click="fetchPurchaseOrders"
            >
              search
            </button>
          </div>
          <div class="pl-1">
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
      <div class="text-center mt-4" v-if="loading">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="pl-0" v-else-if="visible">
        <Table>
          <template #thead>
            <tr>
              <th>Sr No</th>
              <!--                  <th>ID</th>-->
              <th>Date</th>
              <th>PO Number</th>
              <th>No. of Items</th>
              <th>Value</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>EAN Code</th>
              <th>HSN Code</th>
              <th>Item Name</th>
              <th>Primary Barcode</th>
              <th>Mftr Article number/SKU code</th>
              <th>Purchase Quantity</th>
              <th>Case Quantity</th>
              <th>MRP</th>
              <th>Buyer Margin Percentage</th>
              <th>Buyer Margin Amt</th>
              <th>Billing Price</th>
              <th>Tax Rate</th>
              <th>SGST Amt - 2.5%</th>
              <th>CGST Amt - 2.5%</th>
              <th>IGST Amt - 0% for Domestic Items</th>
              <th>Total Price</th>
              <th>Secondary Barcode</th>
              <th>Packing Label</th>
              <th>Document Upload</th>
              <th>Delivery Location</th>
            </tr>
          </template>
          <template #tbody>
            <tr  v-for="(data, index) in purchaseOrdersData" @click="goToData(data._id)" :key="data._id">
              <td>{{ index + 1 }}</td>
              <td>{{ changeDateFormat(data.PODate)  }}</td>
              <td>{{ data.PONumber }}</td>
              <td>{{ data.NoOfItems }}</td>
              <td>{{ data.value }}</td>
              <td>{{ data.status }}</td>
              <td>{{ data.paymentStatus  }}</td>
              <td>{{ data.deliveryStatus }}</td>
              <td>{{ data.EANCode }}</td>
              <td>{{ data.HSNCode }}</td>
              <td>{{ data.ItemName }}</td>
              <td>{{ data.PrimaryBarCode }}</td>
              <td>{{ data.SKUCode }}</td>
              <td>{{ data.purchaseQty }}</td>
              <td>{{ data.caseQuantity }}</td>
              <td>{{ data.MRP }}</td>
              <td>{{ data.BuyerMarginPer }}</td>
              <td>{{ data.buyerMarginAmt }}</td>
              <td>{{ data.billingPrice }}</td>
              <td>{{ data.taxRate }}</td>
              <td>{{ data.SGSTAmt }}</td>
              <td>{{ data.CGSTAmt }}</td>
              <td>{{ data.IGSTAmt }}</td>
              <td>{{ data.totalPrice }}</td>
              <td>{{ data.secondaryBarcode }}</td>
              <td>{{ data.packingLabel }}</td>
              <td>{{ data.documentUpload }}</td>
              <td>{{ data.deliveryLocation }}</td>
            </tr>

          </template>
        </Table>
      </div>
      <div v-else-if="status === 201 || error" class="text-center mt-4 text-dark">
        Data not found
      </div>
      <template v-slot:footer>
        <div
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
        >
          <div class="">
            <p class="card-category">
              Showing {{ from +1}} to {{ to }} of {{ total }} entries
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
  </div>

</template>
<script>
import BasePagination from "@/components/BasePagination";
import axios from "axios";
import UserData from "../../../mixins/UserData";
//import {mapGetters} from "vuex";

export default {
  mixins: [UserData],
  components: {
    BasePagination,
  },
  data() {
    return {
      form: {
        startDate: "",
        endDate: "",
        PONumber: "",
        userID: "",
      },
      purchaseOrdersData: [],
      visible: false,
      error: "",
      status: "",
      loading: false,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
    };
  },
  computed: {
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    },
    pagedData() {
      return this.purchaseOrdersData.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.visible ? this.pagination.perPage * (this.pagination.currentPage - 1) : (-1);
    },
    total() {
      return this.visible ? this.purchaseOrdersData.length : 0;
    },
  },
  mounted() {
    this.fetchPurchaseOrders();
  },
  methods: {
    goToData(id) {
      this.$router.push({ name: 'PurchaseOrdersCreate', params: { id: id } });
    },
    onChange(){
      console.log(event.target.value);
      this.fetchPurchaseOrders();
    },
    fetchPurchaseOrders() {
      this.loading = true;
      axios.get(`api/purChaseOrder/get`, {
          params: {
            startDate: this.form.startDate,
            endDate: this.form.endDate,
            PONumber: this.form.PONumber,
            userID: this.form.userID,
          },
        })
        .then((response) => {
          this.purchaseOrdersData = response.data;
          this.status = response.status;
          if (this.status == 200) {
            this.visible = true;
          } else if (this.status == 201) {
            this.visible = false;
          }
          this.loading = false;
        })
        .catch((error)=>{
          this.error = error;
          this.visible=false;
          this.loading = false;
        });
    },
    resetForm() {
      this.form = {};
      this.fetchPurchaseOrders();
    },
  },
};
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
.btn-full {
  display: block; width: 100%; height: 100%;
}
tr th{
  font-size: 12px !important;
  font-weight: bold;
}
</style>
