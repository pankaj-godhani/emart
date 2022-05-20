<template>
  <div>
    <card
      class="no-border-card"
      body-classes="px-0 pb-1 py-3"
      footer-classes="pb-2"
    >
      <form>
        <div class="d-flex flex-row mb-3">
          <div class="px-2">
            <input
              type="text"
              placeholder="PO Number"
              class="form-control"
              v-model="form.code"
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
        <div class="spinner-border" role="status"></div>
      </div>
      <div class="pl-0" v-else-if="visible">
        <Table>
          <template #thead>
            <tr>
              <th>Sr No</th>
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
            <tr  v-for="(data, index) in pagedData" @click="goToData(data.poNumber)" :key="data.poNumber">
              <td>{{ index + 1 + to - pagedData.length }}</td>
              <td :class="data.poDate?'':'text-xl'">{{ data.poDate?changeDateFormat(data.poDate):'-'}}</td>
              <td>{{ data.poNumber }}</td>
              <td>{{ data.totalPurchaseItems }}</td>
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
      <div v-else-if="status === 201 || error" class="text-center py-5">
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
        code: "",
      },
      purchaseOrdersData: [],
      visible: false,
      error: "",
      status: "",
      loading: false,
      pagination: {
        perPage: 7,
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

    fetchPurchaseOrders(){
      this.loading=true;
      axios.post(`api/purChaseOrder/serviceOrder`,{
        'code':this.form.code
      })
      .then((response)=>{
        this.purchaseOrdersData = response.data.result;
        this.loading=false;
        this.visible=true;
      })
      .catch((error)=>{
        this.error = error;
        this.loading = false;
        this.visible = false;
      })
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
