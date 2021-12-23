<template>
  <div class="content">
    <div class="container-fluid mt-2">
      <div>
        <div>
            <h3 class="mb-2">Dispatch Note</h3>
        </div>
        <div class="float-right">
          <router-link :to="{ name: 'DispatchNoteCreate' }">
            <base-button type="default">Add Dispatch Note</base-button>
          </router-link>
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
