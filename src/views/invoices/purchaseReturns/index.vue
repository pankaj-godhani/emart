<template>
  <div class="content">
    <div class="container-fluid mt-3">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Purchase Returns</h3>
          </div>
        </div>
        <PurchaseReturnsList></PurchaseReturnsList>
      </div>
    </div>
  </div>
</template>

<script>
import PurchaseReturnsList from "../../../components/invoices/purchaseReturns/_list";

export default {
  components: {
    PurchaseReturnsList,
  },
};
</script>

<style></style>
