<template>
  <div class="content">
    <div class="container-fluid mt-3">
      <div>
        <div class="row align-items-center pb-2">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Vendor Payment Report</h3>
          </div>
<!--          <div class="col-lg-6 col-5 text-right">
            <router-link :to="{ name: 'PaymentCreate' }">
              <base-button type="default">Add Payment</base-button>
            </router-link>
          </div>-->
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
