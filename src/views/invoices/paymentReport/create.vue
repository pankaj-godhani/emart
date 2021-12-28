<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Payment <b> > Add Payment</b></h3>
          </div>
          <div class="col-lg-6 col-5 text-right"></div>
        </div>
        <ManagePaymentReport></ManagePaymentReport>
      </div>
    </div>
  </div>
</template>
<script>
import ManagePaymentReport from "../../../components/invoices/paymentReport/_manage";

export default {
  components: {
    ManagePaymentReport,
  },
};
</script>

<style></style>
