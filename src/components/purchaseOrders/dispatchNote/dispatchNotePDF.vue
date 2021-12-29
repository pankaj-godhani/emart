<template>
  <div class="mt-4">
    <h2 style="text-align: center;" class="text-dark">Dispatch Note details</h2>
    <div class="p-5">
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> Deliver Challan/Invoice No </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.DCNumber}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> PO Number </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.PONumber}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> PO Date </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{changeDateFormat(data.PODate)}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> No. of Carton Loaded </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.NumberOfCarton}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> Transporter Details </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.TransporterDetails}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> Driver Name </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.DriverName}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> Driver Contact </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.DriverContact}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> Vehicle Number </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.VehicleNumber}}
                  </span>
        </div>
      </div>

      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> e-Way Bill Number </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.eWayBillNumber}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> Total Number of Packages </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.totalNoOfPackages}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> Net Weight in kgs </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.netWeightInKgs}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> Gross Weight in kgs </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.grossWeightInKgs}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> Delivery Location </h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.deliveryLocation}}
                  </span>
        </div>
      </div>
      <div class="row">
        <div class="col-5"><h4 class="px-4 text-dark"> eMetro Representative ID</h4></div>
        <div class="col-2">
          <h4>:</h4>
        </div>
        <div class="col-5">
                  <span class="px-2 font-weight-400">
                    {{data.eMetroRepresentativeID}}
                  </span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props:['data']
}
</script>
