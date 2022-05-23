<template>
  <div>
    <div v-show="selectAll || select" class="px-2 mb-2">
      <button
        class="btn btn-default"
        @click="approveProduct"
        v-if="priceApprovalValue.includes(false)"
      >
        approve
        <div
          v-if="loaderApprove"
          class="spinner-border spinner-border-sm"
          role="status"
        />
      </button>
      <button
        class="btn btn-default"
        @click="disApproveProduct"
        v-if="priceApprovalValue.includes(true)"
      >
        Disapprove
        <div
          v-if="loaderDisApprove"
          class="spinner-border spinner-border-sm"
          role="status"
        />
      </button>
    </div>
    <div>
      <card
        class="no-border-card"
        body-classes="px-0 pb-1 py-3"
        footer-classes="pb-2"
      >
        <form @submit.prevent="fetchProduct">
          <div class="d-flex flex-md-row mb-3">
            <div v-if="isAdmin === true" class="pl-1">
              <select
                class="form-control"
                @change="onChange($event)"
                v-model="form.userID"
                style="width: 150px"
              >
                <option disabled selected value>Select User</option>
                <option
                  v-for="data in UserData"
                  :key="data._id"
                  :value="data._id"
                >
                  {{ data.firstName }} {{ data.lastName }}
                </option>
              </select>
            </div>

            <div class="d-flex">
              <label class="mt-2 px-1">From:</label>
              <input
                id="minDate"
                type="date"
                class="form-control"
                style="width: 155px"
                placeholder="from"
                v-model="form.startDate"
              />
            </div>

            <div class="d-flex pl-1">
              <label class="mt-2 pr-1">To:</label>
              <input
                id="maxDate"
                type="date"
                class="form-control"
                style="width: 155px"
                placeholder="to"
                v-model="form.endDate"
              />
            </div>
            <div class="pl-1">
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
                style="width: 125px"
                v-model="form.productName"
                @keyup="fetchProduct"
              />
            </div>
            <div class="pl-1">
              <input
                class="form-control"
                placeholder="EAN Code"
                style="width: 100px"
                v-model="form.EANCode"
              />
            </div>
            <div class="pl-1">
              <input
                class="form-control"
                placeholder="SKU Code"
                style="width: 100px"
                v-model="form.SKUCode"
              />
            </div>
            <div class="d-flex float-right">
              <div class="pl-2">
                <base-button type="default" native-type="submit"
                  >Search</base-button
                >
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
          <div class="spinner-border" role="status"></div>
        </div>

        <div v-else-if="visible">
          <Table>
            <template v-slot:thead>
              <tr>
                <th v-show="isAdmin">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="getPriceApprovalValue"
                  />
                </th>
                <th>Sr No</th>
                <th v-show="isAdmin">Price Approval</th>
                <th>
                  EAN Code
                  <i
                    class="fa fa-caret-up fa-lg"
                    aria-hidden="true"
                    @click="orderTableData('EANCode', 'asc')"
                  ></i>
                  <i
                    class="fa fa-caret-down fa-lg"
                    aria-hidden="true"
                    @click="orderTableData('EANCode', 'desc')"
                  ></i>
                </th>
                <th>HSN Code</th>
                <th>
                  Date of Availability
                  <i
                    class="fa fa-caret-up fa-lg"
                    aria-hidden="true"
                    @click="orderTableData('dateOfAvailability', 'asc')"
                  ></i>
                  <i
                    class="fa fa-caret-down fa-lg"
                    aria-hidden="true"
                    @click="orderTableData('dateOfAvailability', 'desc')"
                  ></i>
                </th>
                <th>Created Date</th>
                <th>Brand Name</th>
                <th>Mftr Article No/SKU Code</th>
                <th>Product Category</th>
                <th>Product Name</th>
                <th>UOM</th>
                <th>UOM Conversion</th>
                <th>Shelf Life in Days</th>
                <th>MRP</th>
                <th>
                  Margin
                  <i
                    class="fa fa-caret-up fa-lg"
                    aria-hidden="true"
                    @click="orderTableData('margin', 'asc')"
                  ></i>
                  <i
                    class="fa fa-caret-down fa-lg"
                    aria-hidden="true"
                    @click="orderTableData('margin', 'desc')"
                  ></i>
                </th>
                <th>
                  Net PTR - Price to Retail
                  <i
                    class="fa fa-caret-up fa-lg"
                    aria-hidden="true"
                    @click="orderTableData('netPTR', 'asc')"
                  ></i>
                  <i
                    class="fa fa-caret-down fa-lg"
                    aria-hidden="true"
                    @click="orderTableData('netPTR', 'desc')"
                  ></i>
                </th>
                <th>Product Scheme</th>
                <th>Remarks</th>
                <th>Transfer Price</th>
              </tr>
            </template>
            <template v-slot:tbody>
              <tr v-for="(data, index) in pagedData" :key="data._id">
                <td v-show="isAdmin">
                  <input
                    type="checkbox"
                    :id="data._id"
                    :value="data._id"
                    v-model="selected"
                    @change="getPriceApprovalValue"
                  />
                </td>
                <td>{{ index + 1 + to - pagedData.length }}</td>
                <td v-show="isAdmin">
                  <!--                      <i :class="data.priceApproval?'fa fa-check fa-lg text-success':'fa fa-times fa-lg text-danger'" aria-hidden="true"></i>-->
                  <span
                    :class="
                      data.priceApproval
                        ? 'px-3 p-1 rounded bg-success text-white'
                        : 'px-3 p-1 rounded bg-danger text-white'
                    "
                  >
                    {{ data.priceApproval ? "Approved" : "Not approved" }}
                  </span>
                </td>
                <td>{{ data.EANCode }}</td>
                <td :class="data.HSNCode ? '' : 'text-lg text-center'">
                  {{ data.HSNCode ? data.HSNCode : "-" }}
                </td>
                <td
                  :class="data.dateOfAvailability ? '' : 'text-lg text-center'"
                >
                  {{
                    data.dateOfAvailability
                      ? changeDateFormat(data.dateOfAvailability)
                      : "-"
                  }}
                </td>
                <td :class="data.createdAt ? '' : 'text-lg text-center'">
                  {{ data.createdAt ? changeDateFormat(data.createdAt) : "-" }}
                </td>
                <td :class="data.brandName ? '' : 'text-lg text-center'">
                  {{ data.brandName ? data.brandName : "-" }}
                </td>
                <td :class="data.SKUCode ? '' : 'text-lg text-center'">
                  {{ data.SKUCode ? data.SKUCode : "-" }}
                </td>
                <td :class="data.productCategory ? '' : 'text-lg text-center'">
                  {{ data.productCategory ? data.productCategory : "-" }}
                </td>
                <td :class="data.productName ? '' : 'text-lg text-center'">
                  {{ data.productName ? data.productName : "-" }}
                </td>
                <td :class="data.UOM ? '' : 'text-lg text-center'">
                  {{ data.UOM ? data.UOM : "-" }}
                </td>
                <td :class="data.UOMConversation ? '' : 'text-lg text-center'">
                  {{ data.UOMConversation ? data.UOMConversation : "-" }}
                </td>
                <td :class="data.shelfLifeDays ? '' : 'text-lg text-center'">
                  {{ data.shelfLifeDays ? data.shelfLifeDays : "-" }}
                </td>
                <td :class="data.MRP ? '' : 'text-lg text-center'">
                  {{ data.MRP ? data.MRP : "-" }}
                </td>
                <td :class="data.margin ? '' : 'text-lg text-center'">
                  {{ data.margin ? data.margin.toFixed(2) : "-" }}
                </td>
                <td :class="data.netPTR ? '' : 'text-lg text-center'">
                  {{ data.netPTR ? data.netPTR : "-" }}
                </td>
                <td
                  v-if="data.schemes && typeof data.schemes === 'object'"
                  :class="data.schemes._id ? '' : 'text-lg text-center'"
                >
                  <span>
                    <router-link
                      :to="{
                        name: 'SchemesEdit',
                        params: { id: data.schemes._id },
                      }"
                    >
                      {{ data.schemes._id ? data.schemes.schemaName : "-" }}
                    </router-link>
                  </span>
                </td>
                <td v-else>-</td>
                <td :class="data.remarks ? '' : 'text-lg text-center'">
                  {{ data.remarks ? data.remarks : "-" }}
                </td>
                <td :class="data.sellingPrice ? '' : 'text-lg text-center'">
                  {{ data.sellingPrice ? data.sellingPrice.toFixed(2) : "-" }}
                </td>
              </tr>
            </template>
          </Table>
        </div>

        <div
          v-else-if="status !== 200 || error || loading"
          class="text-center py-5"
        >
          Data not found
        </div>

        <template v-slot:footer>
          <div
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class="">
              <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
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
import UserData from "../../../mixins/UserData";
import _ from "lodash";

export default {
  mixins: [UserData],
  components: {
    Card,
    BasePagination,
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
      selected: [],
      priceApprovalValue: [],
      productData: [],
      visible: false,
      loading: false,
      loaderApprove: false,
      loaderDisApprove: false,
      status: "",
      error: "",
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters["auth/getIsAdmin"];
    },
    select() {
      return this.selected.length ? true : false;
    },
    selectAll: {
      get: function () {
        return this.productData
          ? this.selected.length === this.productData.length
          : false;
      },
      set: function (value) {
        let selected = [];
        if (value) {
          this.productData.forEach(function (product) {
            selected.push(product._id);
          });
        }
        this.selected = selected;
      },
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
      return this.visible
        ? this.pagination.perPage * (this.pagination.currentPage - 1)
        : -1;
    },
    total() {
      return this.visible ? this.productData.length : 0;
    },
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    onChange() {
      console.log(event.target.value);
      this.fetchProduct();
    },
    validateDate() {
      let minDate = this.productData
        .map((e) => e.createdAt)
        .reduce(function (a, b) {
          return a < b ? a : b;
        });
      let maxDate = this.productData
        .map((e) => e.createdAt)
        .reduce(function (a, b) {
          return a > b ? a : b;
        });
      document.getElementById("minDate").setAttribute("min", minDate.split("T")[0]);
      document.getElementById("minDate").setAttribute("max", maxDate.split("T")[0]);
      document.getElementById("maxDate").setAttribute("min", minDate.split("T")[0]);
      document.getElementById("maxDate").setAttribute("max", maxDate.split("T")[0]);
    },
    orderTableData(name, type) {
      this.productData = _.orderBy(this.productData, [name], [type]);
    },
    getPriceApprovalValue() {
      let selectedIds = [];
      selectedIds = this.selected;
      let priceApprovalValue = [];
      for (let i = 0; i < selectedIds.length; i++) {
        this.productData.forEach(function (product) {
          if (selectedIds[i] === product._id) {
            priceApprovalValue.push(product.priceApproval);
          }
        });
      }
      this.priceApprovalValue = priceApprovalValue;
    },
    approveProduct() {
      this.loaderApprove = true;
      axios
        .put(`api/product/changeStatusPriceApproval`, {
          productIdList: this.selected,
          priceApproval: true,
        })
        .then(() => {
          this.loaderApprove = false;
          this.$router.go();
          this.notification("Product approved successfully", "success");
        })
        .catch(() => {
          this.loaderApprove = false;
          this.notification("Something went wrong, please try later.", "error");
        });
    },
    disApproveProduct() {
      this.loaderDisApprove = true;
      axios
        .put(`api/product/changeStatusPriceApproval`, {
          productIdList: this.selected,
          priceApproval: false,
        })
        .then(() => {
          this.loaderDisApprove = false;
          this.$router.go();
          this.notification("Product disapproved successfully", "success");
        })
        .catch(() => {
          this.loaderDisApprove = false;
          this.notification("Something went wrong, please try later.", "error");
        });
    },
    resetForm() {
      this.form = {};
      this.fetchProduct();
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
          this.status = response.status;
          this.validateDate();
          if (this.status === 200) {
            this.visible = true;
            this.loading = false;
          } else if (this.status === 201) {
            this.visible = false;
            this.loading = false;
          }
        })
        .catch((error) => {
          this.error = error;
          this.visible = false;
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
/*.col-md {
    padding: 0px 4px;
  }
  .col-md-2{
    padding: 0px 4px;
  }*/

[v-cloak] {
  display: none;
}
.no-border-card .card-footer {
  border-top: 0;
}
tr th {
  font-size: 12px !important;
  font-weight: bold;
}
</style>
