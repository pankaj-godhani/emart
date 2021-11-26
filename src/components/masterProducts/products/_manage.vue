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
                <label class="form-control-label">{{ productDetails.EANCode }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">HSN Code</h4>
                <label class="form-control-label">{{ productDetails.HSNCode}}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Product Name</h4>
                <label class="form-control-label">{{ productDetails.productName }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Brand Name</h4>
                <label class="form-control-label">{{ productDetails.brandName }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Product Category</h4>
                <label class="form-control-label">{{ productDetails.productCategory }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Mftr Article No/SKU Code</h4>
                <label class="form-control-label">{{ productDetails.SKUCode }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Self Life in Days</h4>
                <label class="form-control-label">{{ productDetails.shelfLifeDays }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">UOM</h4>
                <label class="form-control-label">{{ productDetails.UOM }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">UOM Conversion - PCS</h4>
                <label class="form-control-label">{{ productDetails.UOMConversation }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Quantity</h4>
                <label class="form-control-label">{{ productDetails.quantity }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Date of Availability</h4>
                <label class="form-control-label">{{ productDetails.dateOfAvailability }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Active</h4>
                <label class="form-control-label">{{ productDetails.active }}</label>
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
                  v-model="productDetails.MRP"
                  @keyup="calPercentage"
                />
              </div>
              <div class="col-sm">
                <h4 class="text-dark">Selling Price</h4>
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
                  <option  value="" selected disabled >select scheme</option>
                  <option v-for="schemes in productDetails.schemaList" :key="schemes._id">
                    {{ schemes.schemaName }}
                  </option>
                </select>
              </div>
              <div class="col-sm-4">
                <h4 class="text-dark">Percentage</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Percentage for margin"
                  v-model="percentage"
                  @keyup="calPercentage"
                />
              </div>
              <div class="col-sm-4">
                <h4 class="text-dark">Margin</h4>
                <input
                  class="form-control"
                  name="text"
                  placeholder="Enter Margin of Product"
                  v-model="productDetails.margin"
                />
              </div>
            </div>
            <div v-if="visibleCard">
              <ManageScheme :EANCode="EANCode" @refresh="fetch"></ManageScheme>
            </div>

            <div class="text-center mt-4">
              <button
                type="button"
                class="btn base-button btn-default"
                @click="update"
              >
                Save
              </button>
            </div>
          </div>
          <div
            v-else-if="status === 201 || error"
            class="text-center mt-4 text-dark"
          >
            Data not found
          </div>
        </div>
      </form>
    </div>
  </card>
</template>

<script>

import axios from "axios";
import ManageScheme from "./_manageScheme"
export default {
  components: {ManageScheme},
  data() {
    return {
      imageURL: null,
      EANCode: "",
      visibleCard:false,
      productDetails: {
        schemes: "",
        margin: "",
        MRP: "",
      },
      status: "",
      visibleProductDetails: false,
      error: "",
      loading: false,
      percentage: "",
    };
  },

  methods: {
    selectedOption(e){
      if(e.target.value=='Create Scheme'){
       this.visibleCard=true;
      }
    },
    calPercentage() {
      this.productDetails.margin = (this.productDetails.MRP * this.percentage) / 100;
    },
    fetch() {
      this.loading = true;
      axios
        .get(`api/product/getProductDetails?`, {
          params: {
            EANCode: this.EANCode,
          },
        })
        .then((response) => {
          this.productDetails = response.data[0];
          this.percentage=(this.productDetails.margin*100)/this.productDetails.MRP;
          this.status = response.status;
          if (this.status == 200) {
            this.visibleProductDetails = true;
          } else if (this.status == 201) {
            this.visibleProductDetails = false;
          }

        })
        .catch((error) => {
          this.error = error;
          this.visibleProductDetails = false;
        })
        .finally(() => (this.loading = false));
    },

    update() {
      axios
        .put(`api/product/edit/${this.productDetails._id}`, this.productDetails)
        .then(() => {
          this.notification("Product Updated Successfully", "success");
          this.goBack();
        });
    },

  },
};
</script>
