<template>
  <card class="">
    <div class="container ct-example-row">
      <form>
        <div>
          <div>
            <div class="row mt-4">
              <div class="col-md-4">
                <h4 class="text-dark">PO Number</h4>
                <label class="form-control-label">{{purchaseOrdersData.PONumber}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">PO Date</h4>
                <label class="form-control-label">{{changeDateFormat(purchaseOrdersData.PODate) }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">HSN Code</h4>
                <label class="form-control-label">{{purchaseOrdersData.HSNCode }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Item Name</h4>
                <label class="form-control-label">{{purchaseOrdersData.ItemName }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Primary Barcode</h4>
                <label class="form-control-label">{{purchaseOrdersData.PrimaryBarCode }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Manufacturing SKU Number </h4>
                <label class="form-control-label">{{purchaseOrdersData.SKUCode }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Purchase Qty</h4>
                <label class="form-control-label">{{purchaseOrdersData.purchaseQty }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Number of pieces in one Carton</h4>
                <label class="form-control-label">sdasd</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">MRP per piece</h4>
                <label class="form-control-label">{{purchaseOrdersData.MRP }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Buyer Margin</h4>
                <label class="form-control-label">dsfd</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Buyer Margin Amt</h4>
                <label class="form-control-label">{{purchaseOrdersData.buyerMarginAmt }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Biilling Price</h4>
                <label class="form-control-label">{{purchaseOrdersData.billingPrice }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Tax Rate</h4>
                <label class="form-control-label">{{purchaseOrdersData.taxRate }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">SGST Amt - 2.5%</h4>
                <label class="form-control-label">{{purchaseOrdersData.SGSTAmt }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">CGST Amt - 2.5%</h4>
                <label class="form-control-label">{{purchaseOrdersData.CGSTAmt }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">IGST Amt - 0% </h4>
                <label class="form-control-label">{{purchaseOrdersData.IGSTAmt }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Total Price</h4>
                <label class="form-control-label">{{purchaseOrdersData.totalPrice }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Secondary Barcode </h4>
                <label class="form-control-label">{{purchaseOrdersData.secondaryBarcode }}</label>
              </div>

              <div class="w-100 mt-4"></div>


              <div class="col-md-4">
                <h4 class="text-dark">Document Upload (Invoice/Packing Label/etc.)</h4>
                <label class="form-control-label">{{purchaseOrdersData.documentUpload }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Delivery Location </h4>
                <label class="form-control-label">{{purchaseOrdersData.deliveryLocation }}</label>
              </div>
              <div class="w-100"></div>
            </div>

            <div class=" mt-4">
              <button
                type="button"
                class="btn base-button btn-default"
                @click="update"
              >
                Packing Label
              </button>
              <button
                type="button"
                class="btn base-button btn-default"
                @click="update"
              >
                Generate Package
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </card>
</template>

<script>

import axios from "axios";
import _ from "lodash";

export default {
  components: {},
  props: ["id"],
  data() {
    return {
      imageURL: null,
      purchaseOrdersData:[],
      status: "",

    };
  },
  mounted(){
    this.fetch();
  },

  methods: {

    fetch() {
      axios
        .get(`api/purChaseOrder/get/${this.id}`)
        .then((response) => {
          console.log(response.data[0]);
          this.purchaseOrdersData = _.merge(this.purchaseOrdersData, response.data[0]);

        })
        .catch((error) => {
          this.error = error;
        });
    },

    update() {
      axios
        .put(`api/product/edit/${this.productDetails._id}`, this.productDetails)
        .then(() => {
          this.notification("Product Updated Successfully", "success");
          this.goBack();
        });
    },

  },
};
</script>
