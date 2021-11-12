<template>
  <card class="">
    <div class="container ct-example-row">
      <form @submit.prevent="fetch">
        <div class="d-flex justify-content-center">
          <div class="pt-2 px-2">
            <label class=" form-control-label">EAN Code : </label>
          </div>
         <div>
           <input
             class="form-control"
             name="text"
             placeholder="Enter EAN Code of Product"
             v-model="EANCode"
           />
         </div>
          <div class="px-2">
            <base-button type="default" native-type="submit">Submit</base-button>
          </div>
        </div>
<!--        <base-alert dismissible type="default" icon="ni ni-like-2" v-show="update">
          <strong>Product updated successfully</strong>
        </base-alert>-->
        <div>
          <div class="text-center mt-4" v-if="loading">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>

          </div>
          <div v-else-if="visibleProductDetails">
            <div class="row mt-4">
              <div class="col-md-4">
                <h4 class="text-dark">EAN Code</h4>
                <label class="form-control-label">{{productDetails.EANCode}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">HSN Code</h4>
                <label class="form-control-label">{{productDetails.HSNCode}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Product Name</h4>
                <label class="form-control-label">{{productDetails.productName}}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Brand Name</h4>
                <label class="form-control-label">{{productDetails.brandName}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Product Category</h4>
                <label class="form-control-label">{{productDetails.productCategory}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Mftr Article No/SKU Code</h4>
                <label class="form-control-label">{{productDetails.SKUCode}}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Self Life in Days</h4>
                <label class="form-control-label">{{productDetails.shelfLifeDays}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">UOM</h4>
                <label class="form-control-label">{{productDetails.UOM}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">UOM Conversion - PCS</h4>
                <label class="form-control-label">{{productDetails.UOMConversation}}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Quantity</h4>
                <label class="form-control-label">{{productDetails.quantity}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Date of Availability</h4>
                <label class="form-control-label">{{productDetails.dateOfAvailability}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Active</h4>
                <label class="form-control-label">{{productDetails.active}}</label>
              </div>

              <div class="w-100"></div>
            </div>
            <div class="row mt-3">

              <div class="col-sm">
                <h4 class=" text-dark">MRP</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter MRP of Product"
                  v-model="productDetails.MRP"
                  @keyup="calPercentage"
                />
              </div>
              <div class="col-sm">
                <h4 class=" text-dark">Selling Price</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Selling Price of Product"
                  v-model="productDetails.sellingPrice"
                />

              </div>
              <div class="col-sm">
                <h4 class=" text-dark">Remarks</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Remarks"
                  v-model="productDetails.remarks"
                />

              </div>

            </div>

            <div class="row mt-3">

              <div class="col-sm-4">
                <h4 class=" text-dark">Schemes</h4>
                <select class="form-control" id="exampleFormControlSelect1" v-model="productDetails.schemes">
                  <option selected="selected" >select scheme</option>
                  <option v-for="schemes in productDetails.schemaList ">{{schemes.schemaName}}</option>
<!--                  <option v-for="schemes in schemeData">{{ schemes.schemaName }}</option>-->
                </select>

              </div>
              <div class="col-sm-4">
                <h4 class=" text-dark">Percentage</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Margin of Product"
                  v-model="percentage"
                  @keyup="calPercentage"
                />
              </div>
              <div class="col-sm-4">
                <h4 class=" text-dark">Margin</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Margin of Product"
                  v-model="productDetails.margin"
                />
              </div>

            </div>

            <div class="text-center mt-4">
              <button type="button" class="btn base-button btn-default" @click="update">Save</button>
            </div>

          </div>
          <div v-else-if="status===201 ||error" class="text-center mt-4 text-dark">
            Data not found
          </div>
        </div>

      </form>

    </div>
  </card>
</template>

<script>

import axios from "axios";
import BaseAlert from "@/components/BaseAlert";
import {useToast} from 'vue-toastification';
export default {
  components: {BaseAlert},
  data(){
    return{
      imageURL:null,
      EANCode:'',
      productDetails:{
        schemaList:{},
        margin:'',
        MRP:'',
      },
      status:'',
      visibleProductDetails:false,
      error:'',
      loading:false,
      //schemeData:[],
      percentage:'',
    }
  },

  mounted(){
    //this.fetchSchemes();
  },

  methods:{
    calPercentage(){
      this.productDetails.margin=(this.productDetails.MRP*this.percentage)/100;
    },
   /* fetchSchemes(){
      axios.get("https://vuecrud78.herokuapp.com/api/schema/get")
        .then(response=>{
          this.schemeData=response.data;
          console.log(this.schemeData);
        });
    },*/

    fetch(){
      this.loading = true;
      axios.get(`http://localhost:9999/api/product/getProductDetails?`,{
        params: {
          EANCode: this.EANCode
        }
      })
      .then(response=>{
        this.productDetails=response.data[0];
        this.status=response.status
        console.log(this.status);
        if(this.status==200){
          this.visibleProductDetails=true;
        }
        else if(this.status==201){
          this.visibleProductDetails=false;
        }
      })
        .catch((error)=>{
          this.error=error;
          console.log(error,'hear');
          this.visibleProductDetails=false;
        })

      .finally(() => (this.loading = false));

    },

    update(){

      axios.put(`http://localhost:9999/api/product/edit/${this.productDetails._id}`,this.productDetails)
      .then(()=>{
        const toast = useToast();
        toast('Product updated Successfully', {
          hideProgressBar: true,
          icon: false,
          type:'success',
          closeButton: false,
          position: 'top-right',
          timeout:1500
        });
        this.$router.go(-1);
      });
    }

  }
};
</script>
