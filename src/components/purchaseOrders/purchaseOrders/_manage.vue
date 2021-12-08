<template>
  <card class="">
    <div class="container ct-example-row">
      <form>
        <div>
          <div>
            <div class="text-right">
              <button
                type="button"
                class="btn base-button btn-default"
                @click="downloadLabel "
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
                <label class="form-control-label">{{purchaseOrdersData.PrimaryBarCode }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Secondary Barcode </h4>
                <label class="form-control-label">{{purchaseOrdersData.secondaryBarcode }}</label>

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
                <label class="form-control-label">{{purchaseOrdersData.deliveryLocation }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Document Upload (Invoice/Packing Label/etc.)</h4>
                <label class="form-control-label">{{purchaseOrdersData.documentUpload }}</label>
              </div>
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
            <td>{{item.itemCode}}</td>
            <td>{{item.itemName}}</td>
            <td>{{item.HSNCode}}</td>
            <td>{{item.qty}}</td>
            <td>{{item.sellingPrice}}</td>
            <td>{{item.price}}</td>
            <td>{{item.totalCost}}</td>
            <td>{{item.GSTCode}}</td>
            <td>{{item.GSTInPer}}</td>
            <td>{{item.taxableAMT}}</td>
            <td>{{item.taxAMT}}</td>
            <td>{{item.discInPer}}</td>
            <td>{{item.discAMt}}</td>
            <td>{{item.CGSTInPer}}</td>
            <td>{{item.CGSTAMT}}</td>
            <td>{{item.SGSTInPer}}</td>
            <td>{{item.SGSTAMT}}</td>
            <td>{{item.IGSTInPer}}</td>
            <td>{{item.IGSTAMT}}</td>
            <td>{{item.GSTCess}}</td>
            <td>{{item.GstCessAmount}}</td>
            <td>{{item.taxAMT}}</td>

          </tr>
        </template>
      </Table>
    </div>
    <div  id="myPDF">
      <h1 class="px-4 mt-4 text-dark">e-metro</h1>
      <div class="d-flex">
        <h4 class="px-4 text-dark">PO Number :</h4>
        <span class="text-dark">{{purchaseOrdersData.PONumber}}</span>
      </div>
      <div class="d-flex">
        <h4 class="px-4 text-dark">PO Date : </h4>
        <span class="text-dark">{{changeDateFormat(purchaseOrdersData.PODate) }}</span>
      </div>
    </div>

  </card>
</template>

<script>

import axios from "axios";
import _ from "lodash";
import jsPDF from 'jspdf';
import examplePDF from "./examplePDF";
import html2pdf from 'html2pdf.js';
import {mapGetters} from "vuex";

/*import {
  BarcodeGeneratorComponent,
} from "@syncfusion/ej2-vue-barcode-generator";*/
//import VueBarcode from 'vue-barcode';


export default {
  components: {examplePDF, },
  props: ["id"],
  data() {
    return {
      options: {},
      barcodeValue: 'test',
      invisibleTable:false,
      imageURL: null,
      purchaseOrdersData:[],
      itemList:[],
      status: "",
      width: "200px",
      height: "150px",
      type: "Codabar",
      value: "123456789",
      mode: "SVG",
      displaytext: { text: 'BarcodeGenerator'},
    };
  },
  mounted(){
    this.fetch();
  },
  computed:{
    ...mapGetters('auth',{
      token:'getToken',
    }),
  },
  methods: {
    downloadLabel(){
      var element = document.getElementById('myPDF');
      html2pdf(element);
    },

    fetch() {
      axios
        .get(`api/purChaseOrder/get/${this.id}`,{
          headers: {
            'Authorization': this.token
          },
        })
        .then((response) => {
          this.purchaseOrdersData = _.merge(this.purchaseOrdersData, response.data[0]);
          this.itemList=this.purchaseOrdersData.itemList;
         // this.labelData= _.map(response.data[0], function square(n) {return n;});
          console.log( this.purchaseOrdersData.itemList);

        })
        .catch((error) => {
          this.error = error;
        });
    },

    update() {
      axios
        .put(`api/product/edit/${this.productDetails._id}`, this.productDetails,{
          headers: {
            'Authorization': this.token
          },
        })
        .then(() => {
          this.notification("Product Updated Successfully", "success");
          this.goBack();
        });
    },

  },
};
</script>
