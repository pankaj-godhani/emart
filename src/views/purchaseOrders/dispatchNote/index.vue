<template>
  <div class="content">

    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Dispatch Note</h3>
          </div>
          <div class="col-lg-6 col-5 text-right">
            <router-link :to="{name:'DispatchNoteCreate'}">
              <base-button type="default">Add Dispatch Note</base-button>
            </router-link>

          </div>

        </div>
        <DispatchNoteList></DispatchNoteList>

      </div>
    </div>
  </div>
</template>

<script>

import DispatchNoteList from "../../../components/purchaseOrders/dispatchNote/_list";


export default {
  components: {
    DispatchNoteList,
  },

};
</script>

<style></style>
