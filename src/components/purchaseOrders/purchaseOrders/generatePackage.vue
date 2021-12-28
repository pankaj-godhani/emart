<template>
  <div>
    <div class="row mt-4 px-4">
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
        <label class="form-control-label" id="primaryBar">{{purchaseOrdersData.PrimaryBarCode }}</label>
        <!--                <svg id="barcodePri"></svg>-->
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">Secondary Barcode </h4>
        <label class="form-control-label" id="secondaryBar">{{purchaseOrdersData.secondaryBarcode }}</label>
        <!--                <svg id="barcodeSec"></svg>-->
      </div>

      <div class="w-100 mt-4"></div>

<!--      <div class="col-md-4">
        <h4 class="text-dark">Buyer Margin</h4>
        <label class="form-control-label">{{ purchaseOrdersData.BuyerMarginPer }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">Buyer Margin Amt</h4>
        <label class="form-control-label">{{purchaseOrdersData.buyerMarginAmt }}</label>
      </div>-->
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
</template>

<script>
export default {
  props:['purchaseOrdersData']
}
</script>
