<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Invoices <b> > Add Invoice</b></h3>
          </div>
          <div class="col-lg-6 col-5 text-right"></div>
        </div>
        <ManageInvoice></ManageInvoice>
      </div>
    </div>
  </div>
</template>
<script>
import ManageInvoice from "../../../components/invoices/invoice/_manage";

export default {
  components: {
    ManageInvoice,
  },
};
</script>

<style></style>
