<template>
  <card>
    <div class="container ct-example-row">
      <form>
        <div v-if="invoiceValue===0" class="text-success"><h3 class="font-weight-400 text-success pb-4">You don't have any payment left for this invoice.</h3></div>
        <div>
          <div class="row">
            <div class="d-flex col-sm-5">
              <label class=" mt-2" style="width: 150px"> Invoice Number :</label>
              <select class="form-control" style="width: 200px" @change="onChange()" v-model="form.invoiceNumber">
                <option disabled selected value>Select</option>
                <option v-for="invoice in invoiceNumbers" :key="invoice" :value="invoice">{{invoice}}</option>
              </select>
            </div>
            <div class="d-flex col-sm">
              <label style="width: 150px" class="mt-2"> Payment Value : </label>
              <div>
                <input type="text" class="form-control" style="width: 200px" v-model="form.amount"/>
                <p v-if="invoiceValue || errorMsg" class="text-warning text-xs">Payment value sholud not be more then {{invoiceValue}}</p>
              </div>
            </div>
          </div>
          <div class="row mt-4">

            <div class="d-flex col-sm-5">
              <label style="width: 150px" class="mt-2"> Payment Mode : </label>
              <select class="form-control" style="width: 200px" v-model="form.paymentMode">
                <option disabled selected value>Select</option>
                <option value="online">online</option>
                <option value="check">check</option>
              </select>
            </div>
            <div class="d-flex col-sm-5">
              <label style="width: 150px" class="mt-2"> Remarks : </label>
              <input type="text" class="form-control" style="width: 200px" v-model="form.Remarks"/>
            </div>
          </div>
<!--          <div class="row mt-4">
            <div class="d-flex col-sm">
              <label style="width: 150px" class="mt-2"> Remarks : </label>
              <input type="text" class="form-control" style="width: 200px" v-model="form.remarks"/>
            </div>
          </div>-->
        </div>
        <div class="mt-4 text-center">
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
     // console.log(event.target.value);
      let value = event.target.value;
      axios.get(`api/invoice/getInvoiceValue/${value}`)
        .then(response=>{
          this.invoiceValue = response.data.invoiceValue;
          console.log(this.invoiceValue);
        })
    },
    getInvoiceNumber(){
      axios.get(`api/invoice/getInvoiceNumList`)
        .then(response=>{
          this.invoiceNumbers = response.data;
          console.log(response.data);
        })
    },
    onSubmit(){
      if(this.form.amount<=this.invoiceValue){
        axios.post(`api/vendorPaymentReport/create`,this.form)
          .then(response=>{
            console.log(response);
            this.goBack();
          });
      }
      else if(this.form.paymentMode===""){
        this.notification('Please selct Payment Mode','error');
      }
      else{
        this.errorMsg = true;
        this.notification('Payment value sholud not be more then '+this.invoiceValue,'error');
      }

    }
  }
}
</script>
