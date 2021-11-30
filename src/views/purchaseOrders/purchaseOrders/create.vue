<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Purchase Orders </h3>
          </div>
          <div class="col-lg-6 col-5 text-right"></div>
        </div>
        <ManagePurchaseOrders :id="id"></ManagePurchaseOrders>
      </div>
    </div>
  </div>
</template>
<script>
import ManagePurchaseOrders from "../../../components/purchaseOrders/purchaseOrders/_manage";

export default {
  components: {
    ManagePurchaseOrders,
  },
  data(){
    return{
      id: this.$route.params.id,
    }
  }
};
</script>

<style></style>
