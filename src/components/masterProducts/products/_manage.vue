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
              v-model="form.EANCode"
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
                <label class="form-control-label">{{
                  productDetails.EANCode
                }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">HSN Code</h4>
                <label class="form-control-label">{{
                  productDetails.HSNCode
                }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Product Name</h4>
                <label class="form-control-label">{{
                  productDetails.productName
                }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Brand Name</h4>
                <label class="form-control-label">{{
                  productDetails.brandName
                }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Product Category</h4>
                <label class="form-control-label">{{
                  productDetails.productCategory
                }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Mftr Article No/SKU Code</h4>
                <label class="form-control-label">{{
                  productDetails.SKUCode
                }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Self Life in Days</h4>
                <label class="form-control-label">{{
                  productDetails.shelfLifeDays
                }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">UOM</h4>
                <label class="form-control-label">{{
                  productDetails.UOM
                }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">UOM Conversion - PCS</h4>
                <label class="form-control-label">{{
                  productDetails.UOMConversation
                }}</label>
              </div>

              <div class="w-100 mt-4"></div>

              <div class="col-md-4">
                <h4 class="text-dark">Quantity</h4>
                <label class="form-control-label">{{
                  productDetails.quantity
                }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Date of Availability</h4>
                <label class="form-control-label">{{
                  productDetails.dateOfAvailability
                }}</label>
              </div>
              <div class="col-md-4">
                <h4 class="text-dark">Active</h4>
                <label class="form-control-label">{{
                  productDetails.active
                }}</label>
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
                        data-target="#add"
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
                  placeholder="Enter Margin of Product"
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
              <DataModal :title="'Add Scheme'">
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
                              v-model="form.EANCode"
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
                            <!--              <label class=" form-control-label">Active</label>-->
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
<!--                      <div class="d-flex float-right">
                        <div class="pr-2">
                          <router-link :to="{ name: 'Schemes' }">
                            <base-button outline type="default">Cancel</base-button>
                          </router-link>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="btn base-button btn-default"
                            data-dismiss="modal"
                            @click.prevent="update"
                            v-if="editing"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            class="btn base-button btn-default"
                            data-dismiss="modal"
                            @click.prevent="submit"
                            v-else
                          >
                            Submit
                          </button>
                        </div>

                      </div>-->
                    </form>
                  </div>
                </template>
                <template v-slot:footer>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
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
import { useToast } from "vue-toastification";
export default {
  components: {},
  data() {
    return {
      imageURL: null,

      visibleCard:false,
      productDetails: {
        margin: "",
        MRP: "",
      },
      form:{
        schemaName: "",
        date: "",
        productName: "",
        EANCode: "",
        quantity: "",
        freeQuantity: "",
        netPTR: "",
        UOM: "",
        discount: "",
        dateOfAvailability: "",
        nararation: "",
        active: true,
        schemaNumber: Math.floor(Math.random() * 100000),
      },
      status: "",
      visibleProductDetails: false,
      error: "",
      loading: false,
      //schemeData:[],
      percentage: "",
    };
  },

  mounted() {
    //this.fetchSchemes();
  },


  methods: {
    calPercentage() {
      this.productDetails.margin = (this.productDetails.MRP * this.percentage) / 100;
     // this.percentage=(this.productDetails.margin*100)/this.productDetails.MRP
    },
    notification(content, type) {
      const toast = useToast();
      toast(content, {
        hideProgressBar: true,
        icon: false,
        type: type,
        closeButton: false,
        position: "top-right",
        timeout: 1700,
      });
    },
    fetch() {
      this.loading = true;
      axios
        .get(`api/product/getProductDetails?`, {
          params: {
            EANCode: this.form.EANCode,
          },
        })
        .then((response) => {
          this.productDetails = response.data[0];
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
          this.notification("Uploaded Successfully", "success");
          this.$router.go(-1);
        });
    },
    storeScheme() {
      axios
        .post(`api/schema/create`, {
          schemaName: this.form.schemaName,
          date: this.form.date,
          productName: this.form.productName,
          EANCode: this.form.EANCode,
          quantity: this.form.quantity,
          freeQuantity: this.form.freeQuantity,
          netPTR: this.form.netPTR,
          UOM: this.form.UOM,
          discount: this.form.discount,
          validity: this.form.dateOfAvailability,
          nararation: this.form.nararation,
          active: this.form.active,
          schemaNumber: this.form.schemaNumber,
        })
        .then(() => {
          //this.$router.go(-1);
          this.notification("Scheme Uploaded Successfully", "success");
        })
        .catch((error) => {
          this.error = error;
          this.notification("Something went wrong", "error");
        });
    //  this.form = {};
    },
  },
};
</script>
