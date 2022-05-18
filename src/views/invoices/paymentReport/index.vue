<template>
  <div class="content">
    <div class="container-fluid mt-3">
      <div>
        <div class="row align-items-center pb-2">
        </div>
        <PaymentReportList></PaymentReportList>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentReportList from "../../../components/invoices/paymentReport/_list";

export default {
  components: {
    PaymentReportList,
  },
};
</script>

<style></style>
