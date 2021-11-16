<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Invoices</h3>
          </div>
          <div class="col-lg-6 col-5 text-right">
            <base-button type="default">Add Invoice</base-button>
          </div>
        </div>
        <InvoiceList></InvoiceList>
      </div>
    </div>
  </div>
</template>

<script>
import InvoiceList from "../../../components/invoices/invoice/_list";

export default {
  components: {
    InvoiceList,
  },
};
</script>

<style></style>
