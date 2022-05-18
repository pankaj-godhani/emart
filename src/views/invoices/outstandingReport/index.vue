<template>
  <div class="content">
    <div class="container-fluid mt-3">
      <div>
        <div class="row">
          <div>
            <h3 class="mb-2 col-sm">Vendor wise Outstanding Report </h3>
          </div>
        </div>

        <OutstandingReportList></OutstandingReportList>
      </div>
    </div>
  </div>
</template>

<script>
import OutstandingReportList from "../../../components/invoices/outstandingReport/_list";


export default {
  components: {
    OutstandingReportList,
  },

  data(){
    return{}
  },

};
</script>

<style></style>
