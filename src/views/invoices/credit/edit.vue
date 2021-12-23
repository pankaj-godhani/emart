<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Credit Memo <b> > Edit</b></h3>
          </div>
          <div class="col-lg-6 col-5 text-right"></div>
        </div>
        <ManageCredit :id="id"></ManageCredit>
      </div>
    </div>
  </div>
</template>
<script>
import ManageCredit from "../../../components/invoices/credit/_manage";

export default {
  components: {
    ManageCredit,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style></style>
