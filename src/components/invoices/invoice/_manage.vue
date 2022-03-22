<template>
  <card>
    <div class="container ct-example-row">
      <form @submit="submit">
        <div>
          <h3><b>Discount Scheme  1</b></h3>
          <div class="row mt-3">
            <div class="col-sm form-group">
              <label class="form-control-label">PO Number</label>
              <input
                class="form-control"
                placeholder="Enter PO Number"
                v-model="form.PONumber"
              />
              <p class="text-danger text-xs" >{{ errors['PONumber'] }}</p>
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
              <p class="text-danger text-xs" >{{ errors['invoiceNumber'] }}</p>
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
            <div class="col-sm-4">
              <label class="form-control-label">Invoice Value</label>
              <input
                class="form-control"
                type="text"
                v-model="form.invoiceValue"
                placeholder="Enter Invoice Value"
              />
              <p class="text-danger text-xs" >{{ errors['invoiceValue'] }}</p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <h3><b>Discount Scheme 3</b></h3>
          <div class="row mt-3">
            <div class="col-4">
              <label class="form-control-label">CGST Value</label>
              <input
                class="form-control"
                placeholder="Enter CGST Value"
                v-model="form.CGSTValue"
              />
              <p class="text-danger text-xs" >{{ errors['CGSTValue'] }}</p>
            </div>
            <div class="col-4">
              <label class="form-control-label">SGST Value</label>
              <input
                class="form-control"
                placeholder="Enter SGST Value"
                v-model="form.SGSTValue"
              />
              <p class="text-danger text-xs" >{{ errors['SGSTValue'] }}</p>
            </div>
            <div class="col-4">
              <label class="form-control-label">IGST Value</label>
              <input
                class="form-control"
                placeholder="Enter IGST Value"
                v-model="form.IGSTValue"
              />
              <p class="text-danger text-xs" >{{ errors['IGSTValue'] }}</p>
            </div>
          </div>
        </div>
        <div class="d-flex float-right mt-4">
          <div class="pr-2">
            <router-link :to="{ name: 'Invoice' }">
              <base-button outline type="default">Cancel</base-button>
            </router-link>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-default"
              data-dismiss="modal"
              @click.prevent="update"
              v-if="editing"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-default"
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
import InvoiceValidations from "../../../services/InvoiceValidations";

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
        invoiceValue: "",
        CGSTValue: "",
        SGSTValue: "",
        IGSTValue: "",
        paymentReceived: "",
      },
      errors:[],
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
        this.form = _.merge(this.form, response.data[0]);
      });
    },
    submit() {
      this.editing ? this.update() : this.store();
    },
    checkValidation(){
      let validation = new InvoiceValidations(
                                                this.form.PONumber,
                                                this.form.invoiceNumber,
                                                this.form.invoiceValue,
                                                this.form.CGSTValue,
                                                this.form.SGSTValue,
                                                this.form.IGSTValue
                                              );
      this.errors = validation.checkValidations();
    },
    store() {
      this.checkValidation();
      if( Object.keys(this.errors).length){
        return this.errors;
      }
      else{
        axios.post(`api/invoice/create`, {
          userID:this.userID,
          PONumber: this.form.PONumber,
          PODate: this.form.PODate,
          invoiceNumber: this.form.invoiceNumber,
          invoiceDate: this.form.invoiceDate,
          invoiceValue: this.form.invoiceValue,
          CGSTValue: this.form.CGSTValue,
          SGSTValue: this.form.SGSTValue,
          IGSTValue: this.form.IGSTValue,
          paymentReceived: this.form.paymentReceived,
        })
          .then(() => {
            this.goBack();
            this.notification("Invoice added successfully", "success");
          })
          .catch((error) => {
            this.error = error;
            this.notification("Invoice number should not be same or Something went wrong", "error");
          });
        this.form = {};
      }
    },

    update() {
      this.checkValidation();
      if( Object.keys(this.errors).length){
        return this.errors;
      }
      else{
        axios.put(`api/invoice/edit/${this.id}`, this.form).then(() => {
          this.notification("Invoice updated successfully", "success");
          this.goBack();
        });
      }
    },
  },
};
</script>
