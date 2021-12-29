<template>
  <div>
    <h2 class="text-center text-dark border-bottom border-dark mt-4">Purchase Order Details</h2>
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
        <h4 class="text-dark">No of Items </h4>
        <label class="form-control-label" >{{purchaseOrdersData.NoOfItems }}</label>
      </div>

      <div class="w-100 mt-4"></div>
      <div class="col-md-4">
        <h4 class="text-dark">Value </h4>
        <label class="form-control-label">{{purchaseOrdersData.value }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">Status </h4>
        <label class="form-control-label">{{purchaseOrdersData.status }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">Payment Status</h4>
        <label class="form-control-label">{{purchaseOrdersData.paymentStatus }}</label>
      </div>
      <div class="w-100 mt-4"></div>
      <div class="col-md-4">
        <h4 class="text-dark">Delivery Status </h4>
        <label class="form-control-label">{{purchaseOrdersData.deliveryStatus }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">HSN Code</h4>
        <label class="form-control-label">{{purchaseOrdersData.HSNCode }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">EAN Code</h4>
        <label class="form-control-label" >{{purchaseOrdersData.EANCode }}</label>
      </div>
      <div class="w-100 mt-4"></div>
<!--      <div class="col-md-4">
        <h4 class="text-dark">Number of pieces in one Carton</h4>
        <label class="form-control-label">sdasd</label>
      </div>-->
      <div class="col-md-4">
        <h4 class="text-dark">Primary Barcode</h4>
        <label class="form-control-label" >{{purchaseOrdersData.PrimaryBarCode }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">Manufacturing SKU Number </h4>
        <label class="form-control-label">{{purchaseOrdersData.SKUCode }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">Purchase Quantity</h4>
        <label class="form-control-label">{{purchaseOrdersData.purchaseQty }}</label>
      </div>

      <div class="w-100 mt-4"></div>
      <div class="col-md-4">
        <h4 class="text-dark">Case Quantity </h4>
        <label class="form-control-label">{{purchaseOrdersData.caseQuantity }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">MRP</h4>
        <label class="form-control-label">{{ purchaseOrdersData.MRP }}</label>
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
        <h4 class="text-dark">SGST Amount - 2.5%</h4>
        <label class="form-control-label">{{purchaseOrdersData.SGSTAmt }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">CGST Amount - 2.5%</h4>
        <label class="form-control-label">{{purchaseOrdersData.CGSTAmt }}</label>
      </div>

      <div class="w-100 mt-4"></div>

      <div class="col-md-4">
        <h4 class="text-dark">IGST Amount - 0% FOR DOMESTIC ITEMS </h4>
        <label class="form-control-label">{{purchaseOrdersData.IGSTAmt }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">Total Price</h4>
        <label class="form-control-label">{{purchaseOrdersData.totalPrice }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">Secondary Barcode </h4>
        <label class="form-control-label" >{{purchaseOrdersData.secondaryBarcode }}</label>
      </div>
      <div class="w-100 mt-4"></div>

      <div class="col-md-4">
        <h4 class="text-dark">Delivery Location</h4>
        <label class="form-control-label" >{{purchaseOrdersData.deliveryLocation }}</label>
      </div>
      <div class="col-md-4">
        <h4 class="text-dark">Packing Label </h4>
        <label class="form-control-label" >{{purchaseOrdersData.packingLabel }}</label>
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
