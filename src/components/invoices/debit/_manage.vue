<template>
  <card>
    <div class="container ct-example-row">
      <form @submit="submit" >
        <div>
<!--          <h3><b>Group Heading 1</b></h3>-->
          <div class="row mt-3">
            <div class="col-sm form-group">
              <label class="form-control-label">Product Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
                v-model="form.productName"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Vendor Invoice Reference & Date</label>
              <input
                class="form-control"
                type="date"
                v-model="form.vendorInvoiceRef_Date"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">E Metro PO reference & Date</label>
              <input
                class="form-control"
                type="date"
                v-model="form.eMetroPoRef_Date"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label class="form-control-label">Description</label>
              <input
                type="text"
                class="form-control"
                placeholder="Description"
                v-model="form.description"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Item Quantity</label>
              <input
                type="text"
                class="form-control"
                placeholder="Item Quantity"
                v-model="form.itemQuantity"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">HSN Code</label>
              <input
                type="text"
                class="form-control"
                placeholder="HSN Code"
                v-model="form.HSNCode"
              />
            </div>
          </div>
        </div>
        <div class="mt-4">
<!--          <h3><b>Group Heading 2</b></h3>-->
          <div class="row mt-3">
            <div class="col-sm">
              <label class="form-control-label">Unit Price</label>
              <input
                type="text"
                class="form-control"
                placeholder="Unit Price"
                v-model="form.unitPrice"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Tax Rate</label>
              <input
                type="text"
                class="form-control"
                placeholder="Tax Rate"
                v-model="form.taxRate"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">CGST</label>
              <input
                type="text"
                class="form-control"
                placeholder="CGST"
                v-model="form.CGST"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm">
              <label class="form-control-label">SGST</label>
              <input
                type="text"
                class="form-control"
                placeholder="SGST"
                v-model="form.SGST"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">IGST</label>
              <input
                type="text"
                class="form-control"
                placeholder="IGST"
                v-model="form.IGST"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Amount</label>
              <input
                type="text"
                class="form-control"
                placeholder="Amount"
                v-model="form.amount"
              />
            </div>
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
import {mapGetters} from "vuex";
import _ from "lodash";

export default {
  props:['id'],
  data(){
    return{
      form:{},
    }
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
  methods:{
    submit() {
      this.editing ? this.update() : this.store();
    },
    fetch() {
      axios.get(`api/debitMemo/getAllUserDebitMemo/${this.id}`).then((response) => {
        console.log(response.data[0]);
        this.form = _.merge(this.form, response.data[0]);
      });
    },
    store(){
      axios.post(`api/debitMemo/AddUserDebitMemo`,this.form)
        .then(()=>{
          this.goBack();
          this.notification('Debit Memo created successfully.','success');
        })
    },
    update(){
      axios.put(`api/debitMemo/ChangeUserDebitMemo/${this.id}`,this.form)
        .then(()=>{
          this.goBack();
          this.notification('Debit Memo updated successfully.','success');
        })
    }
  }
}
</script>
