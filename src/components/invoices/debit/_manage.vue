<template>
  <card>
    <div class="container ct-example-row">
      <form @submit="submit" >

          <div class="row mt-4">
            <div class="col-sm">
              <label class="form-control-label">Product Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
                v-model="form.productName"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Vendor Invoice Reference</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Vendor Invoice Reference"
                v-model="form.vendorInvoiceRef"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">E Metro PO Reference</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter E Metro PO Reference"
                v-model="form.eMetroPoRef"
              />
            </div>

          </div>
          <div class="row mt-4">
            <div class="col-sm">
              <label class="form-control-label">Vendor Invoice Date</label>
              <input
                class="form-control"
                type="date"
                v-model="form.vendorInvoiceRef_Date"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">E Metro PO Date</label>
              <input
                class="form-control"
                type="date"
                v-model="form.eMetroPoRef_Date"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Description</label>
              <input
                type="text"
                class="form-control"
                placeholder="Description"
                v-model="form.description"
              />
            </div>

          </div>
          <div class="row mt-4">
            <div class="col-sm">
              <label class="form-control-label">Item Quantity</label>
              <input
                type="text"
                class="form-control"
                placeholder="Item Quantity"
                v-model="form.itemQuantity"
              />
              <p class="text-danger text-xs" >{{ errors['itemQuantity'] }}</p>
            </div>
            <div class="col-sm">
              <label class="form-control-label">HSN Code</label>
              <input
                type="text"
                class="form-control"
                placeholder="HSN Code"
                v-model="form.HSNCode"
              />
              <p class="text-danger text-xs" >{{ errors['HSNCode'] }}</p>
            </div>
            <div class="col-sm">
              <label class="form-control-label">Unit Price</label>
              <input
                type="text"
                class="form-control"
                placeholder="Unit Price"
                v-model="form.unitPrice"
              />
              <p class="text-danger text-xs" >{{ errors['unitPrice'] }}</p>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm">
              <label class="form-control-label">Tax Rate</label>
              <input
                type="text"
                class="form-control"
                placeholder="Tax Rate"
                v-model="form.taxRate"
              />
              <p class="text-danger text-xs" >{{ errors['taxRate'] }}</p>
            </div>
            <div class="col-sm">
              <label class="form-control-label">CGST</label>
              <input
                type="text"
                class="form-control"
                placeholder="CGST"
                v-model="form.CGST"
              />
              <p class="text-danger text-xs" >{{ errors['CGST'] }}</p>
            </div>
            <div class="col-sm">
              <label class="form-control-label">SGST</label>
              <input
                type="text"
                class="form-control"
                placeholder="SGST"
                v-model="form.SGST"
              />
              <p class="text-danger text-xs" >{{ errors['SGST'] }}</p>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm-4">
              <label class="form-control-label">IGST</label>
              <input
                type="text"
                class="form-control"
                placeholder="IGST"
                v-model="form.IGST"
              />
              <p class="text-danger text-xs" >{{ errors['IGST'] }}</p>
            </div>
            <div class="col-sm-4">
              <label class="form-control-label">Amount</label>
              <input
                type="text"
                class="form-control"
                placeholder="Amount"
                v-model="form.amount"
              />
              <p class="text-danger text-xs" >{{ errors['amount'] }}</p>
            </div>
          </div>

        <div class="d-flex mt-3 float-right">
          <div class="pr-2">
            <router-link :to="{ name: 'Debit' }">
              <base-button outline type="default">Cancel</base-button>
            </router-link>
          </div>
          <div>
            <button
              v-if="editing"
              type="button"
              class="btn base-button btn-default"
              @click.prevent="update"
            >
              Save
            </button>
            <button
              v-else
              type="button"
              class="btn base-button btn-default"
              @click.prevent="submit"
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
import store from "../../../state/store";
import CreditDebitValidations from "../../../services/CreditDebitValidations";

export default {
  props:['id'],
  data(){
    return{
      form:{
        productName: "",
        vendorInvoiceRef: "",
        vendorInvoiceRef_Date: "",
        eMetroPoRef_Date:"",
        eMetroPoRef: "",
        description: "",
        itemQuantity: "",
        HSNCode: "",
        unitPrice: "",
        taxRate: "",
        CGST: "",
        SGST: "",
        IGST: "",
        amount: ""
      },
      errors: [],
    }
  },
  mounted() {
    if (this.editing) {
      this.fetch();
    }
  },
  computed: {
    userID(){
      return store.getters['auth/getUserID'];
    },
    editing() {
      return !!this.id;
    },
  },
  methods:{
    submit() {
      this.editing ? this.update() : this.store();
    },
    fetch() {
      axios.get(`api/debitMemo/getAllUserDebitMemo/${this.id}`).then((response) => {
        this.form = _.merge(this.form, response.data[0]);
      });
    },
    checkValidation(){
      let validations = new CreditDebitValidations(
        this.form.itemQuantity,
        this.form.HSNCode,
        this.form.unitPrice,
        "",
        this.form.taxRate,
        this.form.CGST,
        this.form.SGST,
        this.form.IGST,
        this.form.amount
      );
      this.errors= validations.checkValidations();
    },
    store(){
      this.checkValidation();
      if( Object.keys(this.errors).length){
        return this.errors;
      }
      else{
        axios.post(`api/debitMemo/AddUserDebitMemo`,{
          'userID':this.userID,
          'productName':this.form.productName,
          'vendorInvoiceRef_Date':this.form.vendorInvoiceRef_Date,
          'eMetroPoRef_Date':this.form.eMetroPoRef_Date,
          'vendorInvoiceRef': this.form.vendorInvoiceRef,
          'eMetroPoRef': this.form.eMetroPoRef,
          'description':this.form.description,
          'itemQuantity':this.form.itemQuantity,
          'HSNCode':this.form.HSNCode,
          'unitPrice':this.form.unitPrice,
          'taxRate':this.form.taxRate,
          'CGST':this.form.CGST,
          'SGST':this.form.SGST,
          'IGST':this.form.IGST,
          'amount':this.form.amount
        })
          .then(()=>{
            this.goBack();
            this.notification('Debit Memo created successfully.','success');
          });
      }
    },
    update(){
      this.checkValidation();
      if( Object.keys(this.errors).length){
        return this.errors;
      }
      else{
        axios.put(`api/debitMemo/ChangeUserDebitMemo/${this.id}`,this.form)
          .then(()=>{
            this.goBack();
            this.notification('Debit Memo updated successfully.','success');
          });
      }
    }
  }
}
</script>
