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
                    v-model="form.schemaName"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">Date</label>
                  <input class="form-control" type="date" v-model="form.date"/>
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
                    v-model="form.productName"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <label class="form-control-label">Quantity</label>
                  <input
                    class="form-control"
                    placeholder="Enter Quantity"
                    v-model="form.quantity"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">Free Quantity</label>
                  <input
                    class="form-control"
                    placeholder="Enter Free Quantity"
                    v-model="form.freeQuantity"
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
                    v-model="form.netPTR"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">UOM</label>
                  <input
                    class="form-control"
                    placeholder="Enter UOM"
                    v-model="form.UOM"
                  />
                </div>

              </div>
              <div class="row mt-4">
                <div class="col-sm">
                  <label class="form-control-label">Discount</label>
                  <input
                    class="form-control"
                    placeholder="Enter Discount"
                    v-model="form.discount"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">Validity</label>
                  <input
                    class="form-control"
                    type="date"
                    v-model="form.dateOfAvailability"
                  />
                </div>

              </div>
              <div class="row mt-4">
                <div class="col-sm">
                  <label class="form-control-label">Narration</label>
                  <input
                    class="form-control"
                    placeholder="Enter Narration"
                    v-model="form.nararation"
                  />
                </div>
                <div class="col-sm">
                  <label class="form-control-label">Scheme Number</label>
                  <input
                    class="form-control"
                    placeholder="Scheme Number-Auto Generated"
                    v-model="form.schemaNumber"
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
import {mapGetters} from "vuex";

export default {
  name: "_manageScheme",
  props:['EANCode','form'],
  data(){
    return{
      status:"",
      /*form:{
        schemaName: "",
        date: "",
        productName: "",
        quantity: "",
        freeQuantity: "",
        netPTR: "",
        UOM: "",
        discount: "",
        dateOfAvailability: "",
        nararation: "",
        active: true,
        schemaNumber: Math.floor(Math.random() * 100000),
      },*/
    }
  },
  emits:['refresh'],
 /* watch:{
    productDetails(){
      this.form=this.productDetails;
    },
  },*/
  computed:{
    ...mapGetters('auth',{
      token:'getToken',
    }),
  },
  mounted(){
    this.form.schemaNumber=Math.floor(Math.random() * 100000);
  },
  methods:{
    storeScheme() {

      axios
        .post(`api/schema/create`, {
          schemaName: this.form.schemaName,
          date: this.form.date,
          productName: this.form.productName,
          EANCode: this.EANCode,
          quantity: this.form.quantity,
          freeQuantity: this.form.freeQuantity,
          netPTR: this.form.netPTR,
          UOM: this.form.UOM,
          discount: this.form.discount,
          validity: this.form.dateOfAvailability,
          nararation: this.form.nararation,
          active: this.form.active,
          schemaNumber: this.form.schemaNumber,
        },
        {
            headers: {
              'Authorization': this.token
            },
        })
        .then((response) => {
          this.status=response.status;
          console.log(response);
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
      //  this.form = {};
    },
  }
}
</script>

<style scoped>

</style>
