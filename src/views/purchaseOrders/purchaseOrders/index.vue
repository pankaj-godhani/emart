<template>
  <div class="content">
    <div class="container-fluid mt-2">
      <div>
        <div>
            <h3 class="mb-2">Purchase Orders</h3>
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
