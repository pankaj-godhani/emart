<template>
  <card class="">
    <div class="container ct-example-row">
      <form @submit.prevent="fetch">
        <div class="d-flex justify-content-center">
          <div class="pt-2 px-2">
            <label class="form-control-label">EAN Code : </label>
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
            <base-button type="default" native-type="submit"
              >Submit</base-button
            >
          </div>
        </div>
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
                <label class="form-control-label">{{ EANCode}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">HSN Code</h4>
                <label :class="productDetails.HSNCode?'form-control-label':'form-control-label text-xl'">{{ productDetails.HSNCode?productDetails.HSNCode:'-'}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Product Name</h4>
                <label class="form-control-label">{{ productDetails.item_name }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Brand Name</h4>
                <label :class="productDetails.brandName?'form-control-label':'form-control-label text-xl'">{{ productDetails.brandName? productDetails.brandName:'-'}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Product Category</h4>
                <label class="form-control-label">{{ productDetails.categoryName }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Mftr Article No/SKU Code</h4>
                <label class="form-control-label">{{ productDetails.item_code }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">UOM</h4>
                <label class="form-control-label">{{ productDetails.itemUomCode }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">UOM Conversion - PCS</h4>
                <label class="form-control-label">{{ productDetails.itemUomDescription }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Active</h4>
                <label class="form-control-label">True</label>
              </div>


              <div class="w-100 mt-4"></div>
              <div class="col-md-4">
                <h4 class="text-dark">Self Life in Days</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Self Life in Days of Product"
                  v-model="productDetails.shelfLifeDays"
                />
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Quantity</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Quantity of Product"
                  v-model="productDetails.quantity"
                />
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Date of Availability</h4>
                <input
                  class="form-control"
                  type="date"
                  name="date"
                  placeholder="Enter date of availability  of Product"
                  v-model="productDetails.dateOfAvailability"
                />
              </div>

              <div class="w-100"></div>
            </div>
            <div class="row mt-3">
              <div class="col-sm">
                <h4 class="text-dark">MRP</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter MRP of Product"
                  v-model="productDetails.item_mrp"
                  @keyup="calMargin"
                />
              </div>
              <div class="col-sm">
                <h4 class="text-dark">Transfer Price</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Selling Price of Product"
                  v-model="productDetails.sellingPrice"
                />
              </div>
              <div class="col-sm">
                <h4 class="text-dark">Remarks</h4>
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
                <div class="d-flex">
                  <h4 class="flex-grow-1 text-dark">Schemes</h4>
                  <a href="#" class=""
                        @click="visibleCard=true"
                        data-toggle="modal"
                        data-target="#myModal"
                  >
                    <h6 class="text-primary mt-1">Create Scheme</h6>
                  </a>
                </div>
                <select
                  class="form-control"
                  v-model="productDetails.schemes"
                >
                  <option disabled selected value>select scheme</option>
                  <option v-for="schemes in schemaList" :key="schemes._id">
                    {{ schemes.schemaName }}
                  </option>
                </select>
              </div>
              <div class="col-sm-4">
                <h4 class="text-dark">Percentage(%)</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Percentage for margin"
                  v-model="percentage"
                  @keyup="calMargin"
                />
              </div>
              <div class="col-sm-4">
                <h4 class="text-dark">Margin</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Margin of Product"
                  v-model="productDetails.margin"
                  @keyup="calPercentage"
                />
              </div>
            </div>
            <div v-if="visibleCard">
              <ManageScheme :EANCode="EANCode" :form="productDetails" @refresh="fetch" @close="visibleCard=false"></ManageScheme>
            </div>

            <div class="text-center mt-4">
              <button
                type="button"
                class="btn base-button btn-default"
                @click="store"
              >
                Save
              </button>
            </div>
          </div>
          <div
            v-else
            class="text-center mt-4 text-dark"
          >
           {{errMessage}}
          </div>
        </div>
      </form>
    </div>
  </card>
</template>

<script>

import axios from "axios";
import _ from "lodash";
import ManageScheme from "./_manageScheme"
import store from "../../../state/store";
//import {mapGetters} from "vuex";
export default {
  components: { ManageScheme },
  data() {
    return {
      imageURL: null,
      EANCode: "",
      visibleCard: false,
      errMessage: "",
      schemaList: [],
      productDetails: {
        id: "",
        shelfLifeDays: "",
        quantity: "",
        dateOfAvailability: "",
        schemes: "",
        margin: "",
        item_mrp: "",
        sellingPrice: "",
        remarks: "",
      },
      status: "",
      visibleProductDetails: false,
      error: "",
      loading: false,
      percentage: "",
    };
  },
  computed:{
    userID(){
      return store.getters['auth/getUserID'];
    }
  },
  methods: {
    calMargin(){
      this.productDetails.margin = (this.productDetails.item_mrp * this.percentage) / 100;
      this.productDetails.sellingPrice=this.productDetails.item_mrp-this.productDetails.margin;
    },
    calPercentage() {
      this.percentage=(this.productDetails.margin*100)/this.productDetails.item_mrp;
      this.productDetails.sellingPrice=this.productDetails.item_mrp-this.productDetails.margin;
    },
    fetchSchemes(){
      axios.get(`api/schema/getByEan/${this.EANCode}`)
      .then(response=>{
        this.schemaList = response.data
        console.log(response.data);
      })
    },
    fetch() {
      this.loading = true;
      axios.get(`api/product/getProductByEANCode/${this.EANCode}`)
      .then(response=>{
        if(response.data.length===0)
        {
          this.errMessage='No Match Found.';
          this.visibleProductDetails = false;
        }
        else if(response.data.length>1)
        {
          this.errMessage='No Exact Match Found.';
          this.visibleProductDetails = false;
        }
        else if(response.data.length===1)
        {
          this.productDetails=response.data[0];
          this.visibleProductDetails = true;
        }
        this.loading = false;
        this.fetchSchemes();
      });
    },

    store() {
      axios
        .post(`api/product/create`,
          {
                'userID':this.userID,
                'EANCode':this.EANCode,
                'HSNCode':this.productDetails.HSNCode,
                'brandName':this.productDetails.brandName,
                'netPTR':this.productDetails.netPTR,
                'priceApproval':this.productDetails.priceApproval,
                'productName':this.productDetails.item_name,
                'productCategory':this.productDetails.categoryName,
                'SKUCode':this.productDetails.item_code,
                'UOM':this.productDetails.itemUomCode,
                'UOMConversation':this.productDetails.itemUomDescription,
                'quantity':this.productDetails.quantity,
                'shelfLifeDays':this.productDetails.shelfLifeDays,
                'dateOfAvailability':this.productDetails.dateOfAvailability,
                'MRP':this.productDetails.item_mrp,
                'sellingPrice':this.productDetails.sellingPrice,
                'margin':this.productDetails.margin,
                'schemes':this.productDetails.schemes,
                'remarks':this.productDetails.remarks,
               })
        .then(() => {
          this.notification("Product Updated Successfully", "success");
          this.goBack();
        });
    },

  },
};
</script>
