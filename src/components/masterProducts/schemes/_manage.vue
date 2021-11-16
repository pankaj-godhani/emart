<template>
  <card>
    <div class="container ct-example-row">
      <form @submit="submit" ref="textareaform">
        <div>
          <h3><b>Group Heading 1</b></h3>
          <div class="row mt-3">
            <div class="col-sm form-group">
              <label class="form-control-label">Scheme Name</label>
              <input
                v-model="form.schemaName"
                class="form-control"
                type="text"
                placeholder="Scheme Name"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Date</label>
              <input class="form-control" type="date" v-model="form.date" />
            </div>
            <div class="col-sm">
              <label class="form-control-label">EAN Code</label>
              <input
                class="form-control"
                placeholder="Enter EAN Code"
                v-model="form.EANCode"
                @keyup="fetchEANCode"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label class="form-control-label">Product Name</label>
              <input
                class="form-control"
                placeholder="Enter Product Name"
                v-model="form.productName"
              />
            </div>
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
            <div class="col-sm">
              <label class="form-control-label">Discount</label>
              <input
                class="form-control"
                placeholder="Enter Discount"
                v-model="form.discount"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm">
              <label class="form-control-label">Validity</label>
              <input
                class="form-control"
                type="date"
                v-model="form.dateOfAvailability"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Narration</label>
              <input
                class="form-control"
                placeholder="Enter Narration"
                v-model="form.nararation"
              />
            </div>
            <div class="col-sm">
              <!--              <label class=" form-control-label">Active</label>-->
              <div class="mt-5 pl-5">
                <div class="custom-control custom-switch">
                  <input
                    type="checkbox"
                    class="custom-control-input pr-0"
                    id="customSwitch1"
                    v-model="form.active"
                  />
                  <label class="custom-control-label" for="customSwitch1"
                    >Active</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-4">
              <label class="form-control-label">Scheme Number</label>
              <input
                class="form-control"
                placeholder="Scheme Number-Auto Generated"
                v-model="form.schemaNumber"
              />
            </div>
          </div>
        </div>

        <div class="text-right">
          <router-link :to="{ name: 'Schemes' }"
            ><base-button outline type="default"
              >Cancel</base-button
            ></router-link
          >
          <!--          <base-button outline type="default">Cancel</base-button>-->
          <button
            type="button"
            class="btn btn-secondary bg-dark text-white"
            data-dismiss="modal"
            @click.prevent="update"
            v-if="editing"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-secondary bg-dark text-white"
            data-dismiss="modal"
            @click.prevent="submit"
            v-else
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </card>
</template>

<script>
import axios from "axios";
import _ from "lodash";
export default {
  components: {},
  props: ["id"],
  data() {
    return {
      error: "",
      form: {
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
    };
  },
  mounted() {
    if (this.editing) {
      this.fetch();
    }
  },
  computed: {
    editing() {
      return !!this.id;
    },
  },
  methods: {
    fetch() {
      axios.get(`api/schema/get/${this.id}`).then((response) => {
        this.form = _.merge(this.form, response.data[0]);
      });
    },
    submit() {
      this.editing ? this.update() : this.store();
    },

    fetchEANCode() {
      axios
        .get(`api/product/getProductDetails?`, {
          params: {
            EANCode: this.form.EANCode,
          },
        })
        .then((response) => {
          this.form = _.merge(this.form, response.data[0]);
        })
        .catch((error) => {
          this.error = error;
        });
    },

    store() {
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
          this.$router.go(-1);
        })
        .catch((error) => {
          this.error = error;
        });
      this.form = {};
    },

    update() {
      axios.put(`api/schema/edit/${this.id}`, this.form).then(() => {
        this.$router.go(-1);
      });
    },
  },
};
</script>
