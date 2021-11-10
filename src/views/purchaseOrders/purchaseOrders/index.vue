<template>
  <div class="content">

    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">

          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Purchase Orders</h3>
          </div>

        </div>
        <PurchaseOrdersList></PurchaseOrdersList>

      </div>
    </div>
  </div>
</template>

<script>

import PurchaseOrdersList from "../../../components/purchaseOrders/purchaseOrders/_list";


export default {
  components: {
    PurchaseOrdersList,
  },

};
</script>

<style></style>
