<template>
  <div class="content">
    <div class="container-fluid mt-3">
      <div>
        <div class="row mb-2">
          <div class="col-sm">
            <h3 class="mb-2">Dispatch Note</h3>
          </div>
          <div class=" col-sm text-right">
            <router-link :to="{ name: 'DispatchNoteCreate' }">
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
