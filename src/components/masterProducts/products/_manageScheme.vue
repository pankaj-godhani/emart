<template>
  <div>
      <DataModal :title="'Add Scheme'" @close="$emit('close')">
      <template v-slot:body>
        <div class="container ct-example-row">
          <form>
            <div>
              <h3><b>Group Heading 1</b></h3>
              <div class="row mt-3">
                <div class="col-sm">
                  <label class="form-control-label">Scheme Name</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Scheme Name"
                    v-model="form_new.schemaName"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">Date</label>
                  <input class="form-control" type="date" v-model="form_new.date"/>
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <label class="form-control-label">EAN Code</label>
                  <input
                    class="form-control"
                    placeholder="Enter EAN Code"
                    v-model="EANCode"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">Product Name</label>
                  <input
                    class="form-control"
                    placeholder="Enter Product Name"
                    v-model="form_new.productName"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <label class="form-control-label">Quantity</label>
                  <input
                    class="form-control"
                    placeholder="Enter Quantity"
                    v-model="form_new.quantity"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">Free Quantity</label>
                  <input
                    class="form-control"
                    placeholder="Enter Free Quantity"
                    v-model="form_new.freeQuantity"
                  />
                </div>
              </div>
            </div>
            <div class="mt-4">
              <h3><b>Group Heading 2</b></h3>
              <div class="row mt-3">
                <div class="col-sm">
                  <label class="form-control-label">Net PTR</label>
                  <input
                    class="form-control"
                    placeholder="Enter Net PTR"
                    v-model="form_new.netPTR"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">UOM</label>
                  <input
                    class="form-control"
                    placeholder="Enter UOM"
                    v-model="form_new.UOM"
                  />
                </div>

              </div>
              <div class="row mt-4">
                <div class="col-sm">
                  <label class="form-control-label">Discount</label>
                  <input
                    class="form-control"
                    placeholder="Enter Discount"
                    v-model="form_new.discount"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">Validity</label>
                  <input
                    class="form-control"
                    type="date"
                    v-model="form_new.dateOfAvailability"
                  />
                </div>

              </div>
              <div class="row mt-4">
                <div class="col-sm">
                  <label class="form-control-label">Narration</label>
                  <input
                    class="form-control"
                    placeholder="Enter Narration"
                    v-model="form_new.nararation"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">Scheme Number</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Scheme Number-Auto Generated"
                    v-model="form_new.schemaNumber"
                    disabled
                  />
                </div>

              </div>
              <div class="row mt-4">
                <div class="col-sm">
                  <div class="pl-4">
                    <div class="custom-control custom-switch">
                      <input
                        type="checkbox"
                        class="custom-control-input pr-0"
                        id="customSwitch1"
                        v-model="form_new.active"
                      />
                      <label class="custom-control-label" for="customSwitch1">Active</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$emit('close')"
        >
          Close
        </button>
        <button
          type="button"
          class="btn base-button btn-default"
          data-dismiss="modal"
          @click.prevent="storeScheme"
        >
          Save
        </button>
      </template>
    </DataModal>
  </div>

</template>

<script>
import axios from "axios";
//import {mapGetters} from "vuex";
import store from "../../../state/store";

export default {
  name: "_manageScheme",
  props:['EANCode','form'],
  data(){
    return{
      status:"",
      EANCode_new:this.EANCode,
      form_new:this.form,
    }
  },
  emits:['refresh'],

  computed:{
    userID(){
      return store.getters['auth/getUserID']
    },
  },
  mounted(){
    this.form_new.schemaNumber=Math.floor(Math.random() * 100000);
  },
  methods:{
    storeScheme() {

      axios.post(`api/schema/create`, {
          userID:this.userID,
          schemaName: this.form_new.schemaName,
          date: this.form_new.date,
          productName: this.form_new.productName,
          EANCode: this.EANCode_new,
          quantity: this.form_new.quantity,
          freeQuantity: this.form_new.freeQuantity,
          netPTR: this.form_new.netPTR,
          UOM: this.form_new.UOM,
          discount: this.form_new.discount,
          validity: this.form_new.dateOfAvailability,
          nararation: this.form_new.nararation,
          active: this.form_new.active,
          schemaNumber: this.form_new.schemaNumber,
        })
        .then((response) => {
          this.status=response.status;
          if(this.status==200){
            this.notification("Scheme Uploaded Successfully", "success");
          }
          else if(this.status==201){
            this.notification(""+response.data.message, "error");
          }
          this.$emit('refresh');
          this.$emit('close');
        })
        .catch((error) => {
          this.error = error;
          this.notification("Something went wrong", "error");
          this.$emit('refresh');
          this.$emit('close');
        });
    },
  }
}
</script>

<style scoped>

</style>
