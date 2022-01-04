<template>
  <div>
      <div  v-show="selectAll || select" class="px-2 mb-2">
        <button class="btn btn-default" @click="approveProduct">approve</button>
        <button class="btn btn-default" @click="disApproveProduct">Disapprove</button>
      </div>
      <div>
        <card
          class="no-border-card"
          body-classes="px-0 pb-1 py-3"
          footer-classes="pb-2"
        >
          <div >
            <form @submit.prevent="fetchProduct">
              <div class="d-flex flex-row mb-3">

                <div v-if="isAdmin===true" class="pl-1">
                  <select class="form-control " @change="onChange($event)" v-model="form.userID" style="width:150px;">
                    <option disabled selected value>Select User</option>
                    <option v-for="data in UserData" :key="data._id" :value="data._id">
                      {{data.firstName}} {{data.lastName}}
                    </option>
                  </select>

                </div>

                <div class="d-flex ">
                  <label class="mt-2 px-1">From:</label>
                  <input
                    type="date"
                    class="form-control"
                    style="width:155px;"
                    placeholder="from"
                    v-model="form.startDate"
                  />
                </div>

                <div class="d-flex pl-1">
                  <label class="mt-2 pr-1">To:</label>
                  <input
                    type="date"
                    class="form-control "
                    style="width:155px;"
                    placeholder="to"
                    v-model="form.endDate"
                    @mouseout="fetchProduct"
                  />
                </div>
                <div class="pl-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Product Name"
                    style="width:125px;"
                    v-model="form.productName"
                    @keyup="fetchProduct"
                  />
                </div>
                <div class=" pl-1">
                  <input
                    class="form-control"
                    placeholder="EAN Code"
                    style="width:100px;"
                    v-model="form.EANCode"
                  />
                </div>
                <div class="pl-1">
                  <input
                    class="form-control"
                    placeholder="SKU Code"
                    style="width:100px;"
                    v-model="form.SKUCode"
                  />
                </div>
                <div class="d-flex float-right">
                  <div class="pl-2">
                    <base-button type="default" native-type="submit">Search</base-button>
                  </div>
                  <div class="pl-1">
                    <button
                      type="button"
                      class="btn base-button btn-default"
                      @click="resetForm"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div class="text-center mt-4" v-if="loading">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div v-else-if="visible">
              <Table>
                <template v-slot:thead>
                  <tr>
                    <th v-show="isAdmin"><input type="checkbox" v-model="selectAll"></th>
                    <th >Sr No</th>
                    <th v-show="isAdmin">Price Approval</th>
                    <th>EAN Code
                      <i class="fa fa-caret-up fa-lg" aria-hidden="true" @click="orderTableData('EANCode','asc')"></i>
                      <i class="fa fa-caret-down fa-lg" aria-hidden="true" @click="orderTableData('EANCode','desc')"></i>
                    </th>
                    <th>HSN Code</th>
                    <th>Date of Availability
                      <i class="fa fa-caret-up fa-lg" aria-hidden="true" @click="orderTableData('dateOfAvailability','asc')"></i>
                      <i class="fa fa-caret-down fa-lg" aria-hidden="true" @click="orderTableData('dateOfAvailability','desc')"></i>
                    </th>
                    <th>Brand Name</th>
                    <th>Mftr Article No/SKU Code</th>
                    <th>Product Category</th>
                    <th>Product Name</th>
                    <th>UOM</th>
                    <th>UOM Conversion</th>
                    <th>Shelf Life in Days</th>
                    <th>MRP</th>
                    <th>Margin
                      <i class="fa fa-caret-up fa-lg" aria-hidden="true" @click="orderTableData('margin','asc')"></i>
                      <i class="fa fa-caret-down fa-lg" aria-hidden="true" @click="orderTableData('margin','desc')"></i>
                    </th>
                    <th>Net PTR - Price to Retail
                      <i class="fa fa-caret-up fa-lg" aria-hidden="true" @click="orderTableData('netPTR','asc')"></i>
                      <i class="fa fa-caret-down fa-lg" aria-hidden="true" @click="orderTableData('netPTR','desc')"></i>
                    </th>
                    <th>Product Scheme</th>
                    <th>Remarks</th>
                    <th>Selling Price</th>
                  </tr>
                </template>
                <template v-slot:tbody>
                  <tr v-for="(data, index) in pagedData" :key="data._id">
                    <td v-show="isAdmin"><input type="checkbox" :id="data._id" :value="data._id" v-model="selected"></td>
                    <td>{{ index + 1 }}</td>
                    <td v-show="isAdmin">
                      <i :class="data.priceApproval?'fa fa-check fa-lg text-success':'fa fa-times fa-lg text-danger'" aria-hidden="true"></i>
                    </td>
                    <td>{{ data.EANCode }}</td>
                    <td>{{ data.HSNCode }}</td>
                    <td>{{ changeDateFormat(data.dateOfAvailability)}}</td>
                    <td>{{ data.brandName }}</td>
                    <td>{{ data.SKUCode }}</td>
                    <td>{{ data.productCategory }}</td>
                    <td>{{ data.productName }}</td>
                    <td>{{ data.UOM }}</td>
                    <td>{{ data.UOMConversation }}</td>
                    <td>{{ data.shelfLifeDays }}</td>
                    <td>{{ data.MRP }}</td>
                    <td>{{ data.margin }}</td>
                    <td>{{data.netPTR}}</td>
                    <td>{{ data.schemes }}</td>
                    <td>{{ data.remarks }}</td>
                    <td>{{ data.sellingPrice }}</td>

                  </tr>
                </template>
              </Table>
            </div>
            <div v-else-if="status === 201||error" class="text-center mt-4 text-dark">
              Data not found
            </div>

          </div>

          <template v-slot:footer>
            <div
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <div class="">
                <p class="card-category">
                  Showing {{ from +1}} to {{ to }} of {{ total }} entries
                </p>
              </div>
              <base-pagination
                class="pagination-no-border"
                v-model="pagination.currentPage"
                :per-page="pagination.perPage"
                :total="total"
              >
              </base-pagination>
            </div>
          </template>
        </card>
      </div>

  </div>

</template>
<script>
import BasePagination from "@/components/BasePagination";
import Card from "../../Cards/Card";
import axios from "axios";
import {authMethods} from "../../../state/helpers";
import UserData from "../../../mixins/UserData";
import _ from "lodash";
//import {mapGetters} from "vuex";
export default {
  mixins: [UserData],
  components: {
    Card,
    BasePagination,
  },
  computed: {
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    },
    select(){
      return this.selected.length ? true: false;
    },
    selectAll: {
      get: function () {
        return this.productData ? this.selected.length == this.productData.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.productData.forEach(function (product) {
            selected.push(product._id);
          });
        }
        this.selected = selected;
      }
    },
    pagedData() {
      return this.productData.slice(this.from, this.to);
    },

    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.visible ?this.pagination.perPage * (this.pagination.currentPage - 1) : (-1);
    },
    total() {
      return this.visible ? this.productData.length : 0;
    },
  },
  data() {
    return {
      form: {
        productName: "",
        EANCode: "",
        SKUCode: "",
        startDate: "",
        endDate: "",
        userID: "",
      },
      pagination: {
        perPage: 7,
        currentPage: 1,
        total: 0,
      },
      selected_option: true,
      selected:[],
      productData: [],

      visible: false,
      loading: false,
      status: "",
      error: "",
    };
  },

  mounted() {
    this.fetchProduct();
  },
  methods: {
    ...authMethods,
    onChange(){
      console.log(event.target.value);
      this.fetchProduct();
    },

    orderTableData(name,type){
     this.productData = _.orderBy( this.productData,[name],[type]);
      console.log(this.productData,'sort');
    },
    orderDesc(){
      this.productData = _.orderBy( this.productData,['dateOfAvailability'],['desc']);
      console.log(this.productData,'sort');
    },
    approveProduct(){
      axios.put(`api/product/changeStatusPriceApproval`,{
        "productIdList" : this.selected,
        "priceApproval" : true,
      },
      )
      .then(()=>{
        this.$router.go();
      });
    },
    disApproveProduct(){
      axios.put(`api/product/changeStatusPriceApproval`,{
          "productIdList" : this.selected,
          "priceApproval":false,
        },
      )
        .then(()=>{
          this.$router.go();
        });
    },
    resetForm() {
      this.form = {};
      this.fetchProduct();
      //this.$router.go();
    },
    fetchProduct() {
      this.loading = true;
      axios
        .get(`api/product/get`, {
          params: {
            productName: this.form.productName,
            EANCode: this.form.EANCode,
            SKUCode: this.form.SKUCode,
            startDate: this.form.startDate,
            endDate: this.form.endDate,
            userID: this.form.userID,
          },
        })
        .then((response) => {
          this.productData = response.data;
          console.log(this.productData);
          this.status = response.status;
          if (this.status == 200) {
            this.visible = true;
          } else if (this.status == 201) {
            this.visible = false;
          }
        })
        .catch((error)=>{
          this.error=error;
          this.visible=false;
        })
        .finally(() => (this.loading = false));;
    },
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.no-border-card .card-footer {
  border-top: 0;
}
tr th{
  font-size: 80%;
  font-weight: bold;
}
</style>
