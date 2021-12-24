<template>
  <card>
    <div class="container ct-example-row">
      <form @submit.prevent="submit">
        <div>
          <h3><b>Group Heading 1</b></h3>
          <div class="row mt-3">
            <div class="col-sm">
              <label class="form-control-label"
                >Deliver Challan / Invoice No</label
              >
              <input
                v-model="form.DCNumber"
                type="text"
                class="form-control"
                placeholder="Enter Deliver Challan No"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label"
                >Date of Deliver Challan/Invoice No</label
              >
              <input
                v-model="form.DateOfDeliverChallan"
                type="date"
                class="form-control"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">PO Number</label>
              <input
                v-model="form.PONumber"
                type="text"
                class="form-control"
                placeholder="PO Number"
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-4">
              <label class="form-control-label">PO Date</label>
              <input
                v-model="form.PODate"
                type="date"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="mt-4">
          <h3><b>Group Heading 2</b></h3>
          <div class="row mt-3">
            <div class="col-sm">
              <label class="form-control-label">No of Carton Loaded</label>
              <input
                v-model="form.NumberOfCarton"
                type="text"
                class="form-control"
                placeholder="Enter No of Carton Loaded"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Transporter Details</label>
              <input
                v-model="form.TransporterDetails"
                type="text"
                class="form-control"
                placeholder="Enter Transporter Details"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Driver Name</label>
              <input
                v-model="form.DriverName"
                type="text"
                class="form-control"
                placeholder="Enter Driver Name"
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-sm">
              <label class="form-control-label">Driver Contact</label>
              <input
                v-model="form.DriverContact"
                type="text"
                class="form-control"
                placeholder="Enter Driver Contact"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Vehicle Number</label>
              <input
                v-model="form.VehicleNumber"
                type="text"
                class="form-control"
                placeholder="Enter Vehicle Number"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label"> Delivery Location</label>
              <input
                v-model="form.deliveryLocation"
                type="text"
                class="form-control"
                placeholder="Enter Delivery Location"
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-sm">
              <label class="form-control-label">Total No. of Packages</label>
              <input
                class="form-control"
                placeholder="Enter Total No. of Packages"
                v-model="form.totalNoOfPackages"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Net Weight in Kgs</label>
              <input
                class="form-control"
                placeholder="Enter Net Weight"
                v-model="form.netWeightInKgs"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Gross Weight in Kgs</label>
              <input
                class="form-control"
                placeholder="Enter Gross Weight"
                v-model="form.grossWeightInKgs"
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-4">
              <label class="form-control-label">eMetro Representative ID</label>
              <input
                v-model="form.eMetroRepresentativeID"
                type="text"
                class="form-control"
                placeholder="Enter eMetro Representative ID"
              />
            </div>
          </div>
        </div>

        <div class="d-flex float-right">
          <div class="pr-2">
            <router-link :to="{ name: 'DispatchNote' }">
              <base-button outline type="default">Cancel</base-button>
            </router-link>
          </div>
          <div>
            <button
              type="button"
              class="btn base-button btn-default"
              data-dismiss="modal"
              @click.prevent="update"
              v-if="editing"
            >
              Save
            </button>
            <button
              type="button"
              class="btn base-button btn-default"
              data-dismiss="modal"
              @click.prevent="submit"
              v-else
            >
              Submit
            </button>
          </div>

        </div>

      </form>
    </div>
  </card>
</template>

<script>

import axios from "axios";
import _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  components: {},
  props: ["id"],
  data() {
    return {
      error: "",
      form: {
        DCNumber: "",
        DateOfDeliverChallan: "",
        PONumber: "",
        PODate: "",
        NumberOfCarton: "",
        TransporterDetails: "",
        DriverName: "",
        DriverContact: "",
        VehicleNumber: "",
        totalNoOfPackages: "",
        netWeightInKgs: "",
        grossWeightInKgs: "",
        deliveryLocation: "",
        eMetroRepresentativeID: "",
      },
    };
  },
  mounted() {
    if (this.editing) {
      this.fetch();
    }
  },
  computed: {
    ...mapGetters('auth',{
      userID:'getUserID',
    }),
    editing() {
      return !!this.id;
    },
  },
  methods: {
    fetch() {
      axios.get(`api/desPatchNote/get/${this.id}`)
        .then((response) => {
        this.form = _.merge(this.form, response.data[0]);
      });
    },
    submit() {
      this.editing ? this.update() : this.store();
    },
    store() {
      axios
        .post(`api/desPatchNote/create`, {
          userID:this.userID,
          DCNumber: this.form.DCNumber,
          DateOfDeliverChallan: this.form.DateOfDeliverChallan,
          PONumber: this.form.PONumber,
          PODate: this.form.PODate,
          NumberOfCarton: this.form.NumberOfCarton,
          TransporterDetails: this.form.TransporterDetails,
          DriverName: this.form.DriverName,
          DriverContact: this.form.DriverContact,
          VehicleNumber: this.form.VehicleNumber,
          totalNoOfPackages: this.form.totalNoOfPackages,
          netWeightInKgs: this.form.netWeightInKgs,
          grossWeightInKgs: this.form.grossWeightInKgs,
          deliveryLocation: this.form.deliveryLocation,
          eMetroRepresentativeID: this.form.eMetroRepresentativeID,
        })
        .then(() => {
          this.goBack();
          this.notification("Dispatch Note added Successfully","success");
        })
        .catch((error) => {
          this.error = error;
          this.notification("Something went Wrong","error");
        });
      this.form = {};
    },

    update() {
      axios.put(`api/desPatchNote/edit/${this.id}`, this.form)
        .then(() => {
        this.goBack();
        this.notification("Dispatch Note updated Successfully","success");
      });
    },
  },
};
</script>
