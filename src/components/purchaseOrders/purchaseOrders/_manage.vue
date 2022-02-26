<template>
  <card class="">
    <div class="container ct-example-row">
      <form>
          <div>
            <div class="text-right">
              <button
                type="button"
                class="btn base-button btn-default"
                @click="downloadLabel('packingLabel') "
              >
                Packing Label
              </button>
              <button
                type="button"
                class="btn base-button btn-default"
                @click="downloadLabel('generatePackage')"
              >
                Generate Package
              </button>
            </div>
            <div class="row mt-4">
              <div class="col-md-4">
                <h4 class="text-dark">PO Number</h4>
                <label class="form-control-label">{{purchaseOrdersData.poNumber}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">PO Date</h4>
                <label class="form-control-label">{{changeDateFormat(purchaseOrdersData.poDate) }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Manufacturing SKU Number </h4>
                <label class="form-control-label">{{purchaseOrdersData.SKUCode }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Number of pieces in one Carton</h4>
                <label class="form-control-label">sdasd</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Primary Barcode</h4>
                <label class="form-control-label" id="primaryBar">{{purchaseOrdersData.PrimaryBarCode }}</label>
<!--                <svg id="barcodePri"></svg>-->
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Secondary Barcode </h4>
                <label class="form-control-label" id="secondaryBar">{{purchaseOrdersData.secondaryBarcode }}</label>
<!--                <svg id="barcodeSec"></svg>-->
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Buyer Margin</h4>
                <label class="form-control-label">{{ purchaseOrdersData.BuyerMarginPer }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Buyer Margin Amt</h4>
                <label class="form-control-label">{{purchaseOrdersData.buyerMarginAmt }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Billing Price</h4>
                <label class="form-control-label">{{purchaseOrdersData.billingPrice }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Tax Rate</h4>
                <label class="form-control-label">{{purchaseOrdersData.taxRate }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Delivery Location </h4>
                <label class="form-control-label">{{purchaseOrdersData.vendorAddress }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Document Upload (Invoice/Packing Label/etc.)</h4>
                <label class="form-control-label">{{purchaseOrdersData.documentUpload }}</label>
              </div>
            </div>
          </div>
      </form>
    </div>
    <div class="mt-4">
      <Table>
        <template #thead>
          <tr>
            <th>Item code</th>
            <th>Item Name</th>
            <th>HSN Code</th>
            <th>Quantity</th>
            <th>Selling Price </th>
            <th>Price</th>
            <th>Total Cost</th>
            <th>GST Code</th>
            <th>GST %</th>
            <th>Taxable Amount</th>
            <th>Tax Amount</th>
            <th>Disc %</th>
            <th>Disc Amount</th>
            <th>CGST %</th>
            <th>CGST Amount</th>
            <th>SGST/UGST %</th>
            <th>SGST/UGST Amount</th>
            <th>IGST %</th>
            <th>IGST Amount</th>
            <th>GST Cess</th>
            <th>GST Cess Amount</th>
            <th>Total Amount</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="item in itemList" :key="item.itemCode">
            <td>{{ item.itemCode }}</td>
            <td>{{ item.itemName }}</td>
            <td>{{ item.hsnCode }}</td>
            <td>{{ item.itemQuantityInCart }}</td>
            <td>{{ item.itemSellingPrice }}</td>
            <td>{{ item.itemPrice }}</td>
            <td>{{ item.totalCost }}</td>
            <td>{{ item.GSTCode }}</td>
            <td>{{ item.GSTInPer }}</td>
            <td>{{ item.taxableAMT }}</td>
            <td>{{ item.taxAMT }}</td>
            <td>{{ item.discInPer }}</td>
            <td>{{ item.discAMt }}</td>
            <td>{{ item.CGSTInPer }}</td>
            <td>{{ item.CGSTAMT }}</td>
            <td>{{ item.SGSTInPer }}</td>
            <td>{{ item.SGSTAMT }}</td>
            <td>{{ item.IGSTInPer }}</td>
            <td>{{ item.IGSTAMT }}</td>
            <td>{{ item.GSTCess }}</td>
            <td>{{ item.GstCessAmount }}</td>
            <td>{{ item.taxAMT }}</td>

          </tr>
        </template>
      </Table>
    </div>
    <div v-show="false">
      <div id="packingLabel">
        <PackingLabel :itemList="itemList" :purchaseOrdersData="purchaseOrdersData"></PackingLabel>
      </div>
    </div>
    <div v-show="false">
      <div id="generatePackage">
        <GeneratePackage :purchaseOrdersData="purchaseOrdersData"></GeneratePackage>
      </div>

    </div>




  </card>
</template>

<script>

import axios from "axios";
import _ from "lodash";
import html2pdf from "html2pdf.js";
import { mapGetters } from "vuex";
import GeneratePackage from "./generatePackage"
import PackingLabel from "./packingLabel"

var JsBarcode = require("jsbarcode");

export default {
  components: { GeneratePackage, PackingLabel },
  props: ["id"],
  data() {
    return {
      width: "200px",
      height: "150px",
      type: "Codabar",
      value: "123456789",
      mode: "SVG",
      options: {},
      barcodeValue: "test",
      imageURL: null,
      purchaseOrdersData: {
        PrimaryBarCode: "",
        secondaryBarcode: "",
      },
      itemList: [],
      status: "",
      visibleLabel:false,
      displaytext: { text: "BarcodeGenerator"},
    };
  },
  mounted() {
    this.fetch();
  },
  computed: {
    ...mapGetters("auth", {
      token: "getToken",
    }),
  },
  methods: {
    generateBarCode(payload) {
      JsBarcode(payload.id, payload.value, {
        format: "code128",
        displayValue: true,
        lineColor: "#24292e",
        width:2,
        height:40,
        fontSize: 20
      });
    },
    downloadLabel(id){
      var element = document.getElementById(id);
      html2pdf(element);
    },
    fetch() {
      axios
        .post(`api/purChaseOrder/serviceOrder`,{
          "code":this.id
        })
        .then((response) => {
          //console.log(response.data.result[0]);
          this.purchaseOrdersData = _.merge( this.purchaseOrdersData, response.data.result[0]);
          this.itemList = this.purchaseOrdersData.listOfItems;
          console.log(this.itemList);
          this.generateBarCode({id:"#barcodePri",value:this.purchaseOrdersData.PrimaryBarCode});
          this.generateBarCode({id:"#barcodeSec",value:this.purchaseOrdersData.secondaryBarcode});

        })
        .catch((error) => {
          this.error = error;
        });

    },
    /*fetch() {
      axios
        .get(`api/purChaseOrder/get/${this.id}`,{
          headers: {
            'Authorization': this.token
          },
        })
        .then((response) => {
          this.purchaseOrdersData = _.merge( this.purchaseOrdersData, response.data[0]);
          this.itemList = this.purchaseOrdersData.itemList;
          this.generateBarCode({id:"#barcodePri",value:this.purchaseOrdersData.PrimaryBarCode});
          this.generateBarCode({id:"#barcodeSec",value:this.purchaseOrdersData.secondaryBarcode});

        })
        .catch((error) => {
          this.error = error;
        });

    },*/
  },
};
</script>

<style scoped>
tr th{
  font-weight: bolder;
}
</style>
