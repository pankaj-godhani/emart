<template>
  <div class="content">

    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Dispatch Note <b> > Add Dispatch Note </b></h3>
          </div>
          <div class="col-lg-6 col-5 text-right">

          </div>

        </div>
        <ManageDispatchNote></ManageDispatchNote>
      </div>
    </div>
  </div>
</template>
<script>

import ManageDispatchNote from "../../../components/purchaseOrders/dispatchNote/_manage";


export default {
  components: {
    ManageDispatchNote,
  },

};
</script>

<style></style>
