<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Debit Memo <b> > Add Debit Memo</b></h3>
          </div>
          <div class="col-lg-6 col-5 text-right"></div>
        </div>
        <ManageDebit></ManageDebit>
      </div>
    </div>
  </div>
</template>
<script>
import ManageDebit from "../../../components/invoices/debit/_manage";

export default {
  components: {
    ManageDebit,
  },
};
</script>

<style></style>
