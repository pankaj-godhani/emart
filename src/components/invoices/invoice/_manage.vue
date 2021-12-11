<template>
  <card>
    <div class="container ct-example-row">
      <form @submit="submit">
        <div>
          <h3><b>Group Heading 1</b></h3>
          <div class="row mt-3">
            <div class="col-sm form-group">
              <label class="form-control-label">PO Number</label>
              <input
                class="form-control"
                placeholder="Enter PO Number"
                v-model="form.PONumber"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">PO Date</label>
              <input
                class="form-control"
                type="date"
                v-model="form.PODate"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Invoice Number</label>
              <input
                v-model="form.invoiceNumber"
                class="form-control"
                type="text"
                placeholder="Enter Invoice Number"
              />

            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <label class="form-control-label">Invoice Date</label>
              <input
                class="form-control"
                type="date"
                v-model="form.invoiceDate"
              />
            </div>
          </div>
        </div>
        <div class="mt-4">
          <h3><b>Group Heading 2</b></h3>
          <div class="row mt-3">
            <div class="col-sm">
              <label class="form-control-label">Total No. of Packages</label>
              <input
                class="form-control"
                placeholder="Enter Total No. of Packages"
                v-model="form.NoOfPackages"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Net Weight in Kgs</label>
              <input
                class="form-control"
                placeholder="Enter Net Weight"
                v-model="form.netWeight"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Gross Weight in Kgs</label>
              <input
                class="form-control"
                placeholder="Enter Gross Weight"
                v-model="form.grossWeight"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm-4">
              <label class="form-control-label">Invoice Value</label>
              <input
                class="form-control"
                type="text"
                v-model="form.invoiceValue"
                placeholder="Enter Invoice Value"
              />
            </div>
          </div>

        </div>
        <div class="mt-4">
          <h3><b>Group Heading 3</b></h3>
          <div class="row mt-3">
            <div class="col-4">
              <label class="form-control-label">CGST Value</label>
              <input
                class="form-control"
                placeholder="Enter CGST Value"
                v-model="form.CGSTValue"
              />
            </div>
            <div class="col-4">
              <label class="form-control-label">SGST Value</label>
              <input
                class="form-control"
                placeholder="Enter SGST Value"
                v-model="form.SGSTValue"
              />
            </div>
            <div class="col-4">
              <label class="form-control-label">IGST Value</label>
              <input
                class="form-control"
                placeholder="Enter IGST Value"
                v-model="form.IGSTValue"
              />
            </div>
          </div>
        </div>
        <div class="d-flex float-right mt-4">
          <div class="pr-2">
            <router-link :to="{ name: 'Schemes' }">
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
import _ from "lodash";
import {mapGetters} from "vuex";

export default {
  components: {},
  props: ["id"],
  data() {
    return {
      error: "",
      schemaNumber: Math.floor(Math.random() * 100000),
      form: {
        PONumber: "",
        PODate: "",
        invoiceNumber: "",
        invoiceDate: "",
        NoOfPackages: "",
        netWeight: "",
        grossWeight: "",
        invoiceValue: "",
        CGSTValue: "",
        SGSTValue: "",
        IGSTValue: "",
        paymentReceived: "",
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
      axios.get(`api/invoice/get/${this.id}`,).then((response) => {
        console.log(response.data[0]);
        this.form = _.merge(this.form, response.data[0]);
      });
    },
    submit() {
      this.editing ? this.update() : this.store();
    },

    store() {
      axios.post(`api/invoice/create`, {
        userID:this.userID,
        PONumber: this.form.PONumber,
        PODate: this.form.PODate,
        invoiceNumber: this.form.invoiceNumber,
        invoiceDate: this.form.invoiceDate,
        NoOfPackages: this.form.NoOfPackages,
        netWeight: this.form.netWeight,
        grossWeight: this.form.grossWeight,
        invoiceValue: this.form.invoiceValue,
        CGSTValue: this.form.CGSTValue,
        SGSTValue: this.form.SGSTValue,
        IGSTValue: this.form.IGSTValue,
        paymentReceived: this.form.paymentReceived,
      })
        .then((response) => {
          console.log(response);
          this.goBack();
          this.notification("Invoice added successfully", "success");
        })
        .catch((error) => {
          this.error = error;
          //this.goBack();
          this.notification("Something went wrong", "error");
        });
      this.form = {};
    },

    update() {
      axios.put(`api/invoice/edit/${this.id}`, this.form).then(() => {
        this.notification("Invoice updated successfully", "success");
        this.goBack();
      });
    },
  },
};
</script>
