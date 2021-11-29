<template>
  <card
    class="no-border-card"
    body-classes="px-0 pb-1 py-3"
    footer-classes="pb-2"
  >
    <form @submit.prevent="fetchProduct">
      <div class="d-flex flex-row mb-3">
        <div class="pl-2"><label class="mt-2 pr-1">From:</label></div>
        <div>
          <input
            type="date"
            class="form-control"
            placeholder="from"
            v-model="form.startDate"
          />
        </div>
        <div><label class="mt-2 pl-2">To:</label></div>
        <div class="px-2">
          <input
            type="date"
            class="form-control"
            placeholder="to"
            v-model="form.endDate"
            @mouseout="fetchProduct"
          />
        </div>
        <div class="px-2">
          <input
            type="text"
            class="form-control"
            placeholder="Product Name"
            aria-controls="datatables"
            v-model="form.productName"
            @keyup="fetchProduct"
          />
        </div>
        <div class="px-2">
          <input
            class="form-control"
            placeholder="EAN Code"
            v-model="form.EANCode"
          />
        </div>
        <div class="px-2">
          <input
            class="form-control"
            placeholder="SKU Code"
            v-model="form.SKUCode"
          />
        </div>
        <div class="d-flex float-right">
          <div class="pl-3">
            <base-button type="default" native-type="submit">Search</base-button>
          </div>
          <div class="px-2">
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
    <div v-if="visible">
      <Table>
        <template #thead>
          <tr>
            <th>Sr No</th>
            <!--            <th>ID</th>-->
            <th>EAN Code</th>
            <th>HSN Code</th>
            <th>Date of Availability</th>
            <th>Brand Name</th>
            <th>Mftr Article No/SKU Code</th>
            <th>Product Category</th>
            <th>Product Name</th>
            <th>UOM</th>
            <th>UOM Conversion</th>
            <th>Shelf Life in Days</th>
            <th>MRP</th>
            <th>Margin</th>
            <th>Net PTR - Price to Retail</th>
            <th>Product Scheme</th>
            <th>Remarks</th>
            <th>Price Approval</th>
            <th>Selling Price</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="(data, index) in pagedData" :key="data._id">
            <td>{{ index + 1 }}</td>
            <!--            <td>{{data._id}}</td>-->
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
            <td>net ptr</td>
            <td>{{ data.schemes }}</td>
            <td>{{ data.remarks }}</td>
            <td>price approval</td>
            <td>{{ data.sellingPrice }}</td>



          </tr>
        </template>
      </Table>
    </div>
    <div v-else-if="status === 201||error" class="text-center mt-4 text-dark">
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
</template>
<script>
import BasePagination from "@/components/BasePagination";
import Card from "../../Cards/Card";
import axios from "axios";

export default {
  components: {
    Card,
    BasePagination,
  },
  computed: {
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
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      if(this.productData.length > 0)
      {
        return this.productData.length
      }
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
      },
      pagination: {
        perPage: 8,
        currentPage: 1,
        total: 0,
      },
      productData: [],
      visible: false,
      status: "",
      error: "",
    };
  },

  mounted() {
    this.fetchProduct();
  },
  methods: {
    resetForm() {
      this.form = {};
      this.fetchProduct();
    },
    fetchProduct() {
      axios
        .get(`api/product/get`, {
          params: {
            productName: this.form.productName,
            EANCode: this.form.EANCode,
            SKUCode: this.form.SKUCode,
            startDate: this.form.startDate,
            endDate: this.form.endDate,
          },
        })
        .then((response) => {
          this.productData = response.data;
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
        });
    },
  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
