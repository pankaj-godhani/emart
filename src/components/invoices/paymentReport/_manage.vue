<template>
  <card>
    <div class="container ct-example-row">
      <form>
        <div v-if="invoiceValue===0" class="text-success"><h3 class="font-weight-400 text-success pb-4">You don't have any payment left for this invoice.</h3></div>
        <div>
          <div class="row">
            <div class="d-flex col-sm-5">
              <label class=" mt-2" style="width: 150px"> Invoice Number :</label>
              <div class="wrapper">
                <select  class="form-control" onfocus='this.size=5;' onblur='this.size=1;' onchange='this.size=1; this.blur();' @change="onChange()" v-model="form.invoiceNumber" >
                  <option disabled selected value>Select</option>
                  <option v-for="invoice in invoiceNumbers" :key="invoice" :value="invoice" >{{invoice}}</option>
                </select>
              </div>

            </div>
            <div class="d-flex col-sm">
              <label style="width: 150px" class="mt-2"> Payment Value : </label>
              <div>
                <input type="text" class="form-control" style="width: 200px" v-model="form.amount"/>
                <p v-if="invoiceValue || errorMsg" class="text-warning text-xs">Payment value should not be more then {{invoiceValue}}</p>
              </div>
            </div>
          </div>
          <div class="row mt-4">

            <div class="d-flex col-sm-5">
              <label style="width: 150px" class="mt-2"> Payment Mode : </label>
              <select class="form-control" style="width: 200px;" v-model="form.paymentMode" >
                <option disabled selected value>Select</option>
                <option value="online">online</option>
                <option value="cheque">cheque</option>
              </select>
            </div>
            <div class="d-flex col-sm-5">
              <label style="width: 150px" class="mt-2"> Remarks : </label>
              <input type="text" class="form-control" style="width: 200px" v-model="form.Remarks"/>
            </div>
          </div>
        </div>
        <div class="d-flex mt-4 justify-content-center">

            <router-link :to="{ name: 'PaymentReport' }" class="px-2">
              <base-button outline type="default">Cancel</base-button>
            </router-link>
          <button class="btn btn-default" @click.prevent="onSubmit">Submit</button>
        </div>
      </form>

    </div>
  </card>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      invoiceNumbers:[],
      invoiceValue:"",
      errorMsg:false,
      form:{
        invoiceNumber:"",
        amount: "",
        paymentMode:"",
        Remarks:"",
      },

    }
  },
  mounted() {
    this.getInvoiceNumber();
  },
  methods:{
    onChange(){
      let value = event.target.value;
      axios.get(`api/invoice/getInvoiceValue/${value}`)
        .then(response=>{
          this.invoiceValue = response.data.invoiceValue;
        })
    },
    getInvoiceNumber(){
      axios.get(`api/invoice/getInvoiceNumList`)
        .then(response=>{
          this.invoiceNumbers = response.data;
        })
    },
    onSubmit(){
      if(this.form.amount===""){
        this.notification('Please enter payment amount','error');
      }
      else if(this.form.paymentMode===""){
        this.notification('Please select Payment Mode','error');
      }
      else if(this.form.amount<=this.invoiceValue ){
        axios.post(`api/vendorPaymentReport/create`,this.form)
          .then(()=>{
            this.goBack();
          });
      }
      else{
        this.errorMsg = true;
        this.notification('Payment value should not be more then '+this.invoiceValue,'error');
      }

    }
  }
}
</script>

<style scoped>
.wrapper{
  width:200px;


}
</style>
