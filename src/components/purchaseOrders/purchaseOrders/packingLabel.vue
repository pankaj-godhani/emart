<template>
  <div>
    <h1 class="px-4 mt-4 text-dark">e-metro</h1>
    <div class="row">
      <div class="col-sm-7">
        <div>
          <h4 class="px-4 text-dark">Primary Barcode : <svg id="barcodePri"></svg></h4>
        </div>
        <div>
          <h4 class="px-4 text-dark">PO Number : <span class="px-2 font-weight-400">{{ purchaseOrdersData.PONumber }}</span></h4>
        </div>
        <div>
          <h4 class="px-4 text-dark">PO Date :<span class="px-2 font-weight-400">{{ changeDateFormat(purchaseOrdersData.PODate) }}</span> </h4>

        </div>
        <div >
          <h4 class="px-4 text-dark" v-for="(item,index) in itemList" :key="item.itemCode">
            Line Item :{{index+1}}
            <span class="px-2 font-weight-400">{{ item.itemName }}</span>
          </h4>
        </div>
        <div>
          <h4 class="px-4 text-dark">Secondary Barcode : <svg id="barcodeSec"></svg></h4>
        </div>
      </div>
      <div class="col">
        <div>
          <h4 class="px-4 text-dark">Bill to Address :
            <span class="px-2 font-weight-400">
                47,Bhaktinandan Society 47,Bhaktinandan Society 47,Bhaktinandan Society 47,Bhaktinandan Society
              </span>
          </h4>
        </div>
        <div class="mt-6">
          <h4 class="px-4 text-dark">Ship to Address :
            <span class="px-2 font-weight-400">
                47,Bhaktinandan Society 47,Bhaktinandan Society 47,Bhaktinandan Society 47,Bhaktinandan Society
              </span>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['itemList','purchaseOrdersData']
}
</script>
