<template>
  <div class="content">
    <div class="container-fluid mt-3">
      <div>
        <div class="row align-items-center pb-2">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Credit Memo</h3>
          </div>
          <div class="col-lg-6 col-5 text-right">
            <router-link :to="{ name: 'CreditCreate' }">
              <base-button type="default">Add Credit Memo</base-button>
            </router-link>
          </div>
        </div>
        <DebitCreditList></DebitCreditList>
      </div>
    </div>
  </div>
</template>

<script>
import DebitCreditList from "../../../components/invoices/credit/_list";

export default {
  components: {
    DebitCreditList,
  },
};
</script>

<style></style>
