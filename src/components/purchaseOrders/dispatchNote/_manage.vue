<template>
  <card>
    <div class="container ct-example-row">
      <form action="">
        <div>
          <h3><b>Group Heading 1</b></h3>
          <div class="row mt-3">

            <div class="col-sm">
              <label class=" form-control-label">Deliver Challan / Invoice No</label>
              <base-input
                name="text"
                placeholder="Enter Scheme Name"
              ></base-input>
            </div>
            <div class="col-sm">
              <label class=" form-control-label">Date of Deliver Challan/Invoice No</label>
              <base-input
                name="date"
                type="date"
                value="2018-11-23"
                id="example-date-input"
              />

            </div>
            <div class="col-sm">
              <label class=" form-control-label">PO Number</label>
              <base-input
                name="text"
                placeholder="Enter Product Name"
              ></base-input>
            </div>

          </div>
          <div class="row">

            <div class="col-4">
              <label class=" form-control-label">PO Date</label>
              <base-input
                name="date"
                type="date"
                value="2018-11-23"
                id="example-date-input"
              />
            </div>

          </div>
        </div>
        <div class="mt-4">
          <h3><b>Group Heading 2</b></h3>
          <div class="row mt-3">

            <div class="col-sm">
              <label class=" form-control-label">No of Carton Loaded</label>
              <base-input
                name="text"
                placeholder="Enter No of Carton Loaded"
              ></base-input>
            </div>
            <div class="col-sm">
              <label class=" form-control-label">Transporter Details</label>
              <base-input
                name="text"
                placeholder="Enter Transporter Details"
              ></base-input>

            </div>
            <div class="col-sm">
              <label class=" form-control-label">Driver Name</label>
              <base-input
                name="text"
                placeholder="Enter Driver Name"
              ></base-input>
            </div>

          </div>
          <div class="row">

            <div class="col-sm">
              <label class=" form-control-label">Driver Contact</label>
              <base-input
                name="text"
                placeholder="Enter Driver Contact"
              ></base-input>
            </div>
            <div class="col-sm">
              <label class=" form-control-label">Vehicle Number</label>
              <base-input
                name="text"
                placeholder="Enter Vehicle Number"
              ></base-input>

            </div>
            <div class="col-sm">
              <label class=" form-control-label"> Delivery Location</label>
              <base-input
                name="text"
                placeholder="Enter Delivery Location"
              ></base-input>
              </div>

            </div>

          </div>
          <div class="row">
            <div class="col-4" >
              <label class=" form-control-label">eMetro Representative ID</label>
              <base-input
                name="text"
                placeholder="Enter eMetro Representative ID"
              ></base-input>
            </div>
          </div>



        <div class="text-right">
          <base-button outline type="default">Cancel</base-button>
          <base-button type="default">Submit</base-button>
        </div>


      </form>

    </div>
  </card>
</template>

<script>
import DropzoneFileUpload from "../../Inputs/DropzoneFileUpload";
import FileInput from "../../Inputs/FileInput";
import BaseSwitch from "../../BaseSwitch";
export default {
  components: {BaseSwitch, FileInput, DropzoneFileUpload},
  data(){
    return{
      inputs: {
        file: [],
      },
    }
  },
  methods:{
    filesChange(files) {
      this.inputs.file = files;
    },
  }
};
</script>
