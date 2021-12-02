<template>
  <div>

    <p>{{showModal}}</p>
    <button
      type="button"
      class="btn base-button btn-default"
      @click="showModal=!showModal"
    >
    show modal
    </button>
    <div v-if="showModal" class="animate__animated animate__bounceIn higher">

      <div class="">
        <ExampleModal v-if="showModal">
          <template v-slot:title>
            Add Scheme
          </template>
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

                      />
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Date</label>
                      <input class="form-control" type="date"/>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <label class="form-control-label">EAN Code</label>
                      <input
                        class="form-control"
                        placeholder="Enter EAN Code"

                      />
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Product Name</label>
                      <input
                        class="form-control"
                        placeholder="Enter Product Name"

                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <label class="form-control-label">Quantity</label>
                      <input
                        class="form-control"
                        placeholder="Enter Quantity"
                      />
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Free Quantity</label>
                      <input
                        class="form-control"
                        placeholder="Enter Free Quantity"
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
                      />
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">UOM</label>
                      <input
                        class="form-control"
                        placeholder="Enter UOM"
                      />
                    </div>

                  </div>
                  <div class="row mt-4">
                    <div class="col-sm">
                      <label class="form-control-label">Discount</label>
                      <input
                        class="form-control"
                        placeholder="Enter Discount"

                      />
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Validity</label>
                      <input
                        class="form-control"
                        type="date"

                      />
                    </div>

                  </div>
                  <div class="row mt-4">
                    <div class="col-sm">
                      <label class="form-control-label">Narration</label>
                      <input
                        class="form-control"
                        placeholder="Enter Narration"

                      />
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Scheme Number</label>
                      <input
                        class="form-control"
                        placeholder="Scheme Number-Auto Generated"
                      />
                    </div>

                  </div>
                  <div class="row mt-4">
                    <div class="col-sm">
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

              </form>
            </div>
          </template>
        </ExampleModal>
      </div>
    </div>

    <div >
<!--      <ExampleModal v-if="showModal">
        <template v-slot:title>
          Add Scheme
        </template>
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

                    />
                  </div>
                  <div class="col-sm">
                    <label class="form-control-label">Date</label>
                    <input class="form-control" type="date"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm">
                    <label class="form-control-label">EAN Code</label>
                    <input
                      class="form-control"
                      placeholder="Enter EAN Code"

                    />
                  </div>
                  <div class="col-sm">
                    <label class="form-control-label">Product Name</label>
                    <input
                      class="form-control"
                      placeholder="Enter Product Name"

                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm">
                    <label class="form-control-label">Quantity</label>
                    <input
                      class="form-control"
                      placeholder="Enter Quantity"
                    />
                  </div>
                  <div class="col-sm">
                    <label class="form-control-label">Free Quantity</label>
                    <input
                      class="form-control"
                      placeholder="Enter Free Quantity"
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
                    />
                  </div>
                  <div class="col-sm">
                    <label class="form-control-label">UOM</label>
                    <input
                      class="form-control"
                      placeholder="Enter UOM"
                    />
                  </div>

                </div>
                <div class="row mt-4">
                  <div class="col-sm">
                    <label class="form-control-label">Discount</label>
                    <input
                      class="form-control"
                      placeholder="Enter Discount"

                    />
                  </div>
                  <div class="col-sm">
                    <label class="form-control-label">Validity</label>
                    <input
                      class="form-control"
                      type="date"

                    />
                  </div>

                </div>
                <div class="row mt-4">
                  <div class="col-sm">
                    <label class="form-control-label">Narration</label>
                    <input
                      class="form-control"
                      placeholder="Enter Narration"

                    />
                  </div>
                  <div class="col-sm">
                    <label class="form-control-label">Scheme Number</label>
                    <input
                      class="form-control"
                      placeholder="Scheme Number-Auto Generated"
                    />
                  </div>

                </div>
                <div class="row mt-4">
                  <div class="col-sm">
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

            </form>
          </div>
        </template>
        <template v-slot:footer>
          <button
            type="button"
            class="btn btn-secondary"
            @click="showModal=!showModal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn base-button btn-default"
          >
            Save
          </button>
        </template>
      </ExampleModal>-->
    </div>

    <form @submit="submit">
      <!--      <label>Scheme Name</label> <input class="form-control" type="text" v-model="schemaName"/>-->
      <div class="row px-4">
        <label class="mt-2">Filter:</label>
        <div class="col-3 pr-0 form-group">
          <!--          <flat-picker
            :config="{ allowInput:true,mode:'range',}"
            class="form-control datepicker"
            v-model="dates[0]"
          >
          </flat-picker>-->
          <input
            type="date"
            class="form-control"
            placeholder="from"
            v-model="dates.startDate"
          />
          <input
            type="date"
            class="form-control"
            placeholder="to"
            v-model="dates.endDate"
          />

          <!--          <DateRangePicker></DateRangePicker>-->

          <!--          <date-range-picker
            :startDate="params.startDate"
            :endDate="params.endDate"
          >
          </date-range-picker>-->
        </div>

        <div class="col-2 pr-0">
          <button
            class="btn base-button btn-default"
            type="button"
            @click="fetchSchemes"
          >
            search
          </button>
        </div>
      </div>
      <base-button class="btn-primary" type="submit">Submit</base-button>
    </form>
    <Table>
      <template #thead>
        <tr>
          <th>Sr No</th>
          <th>ID</th>
          <th>Scheme No</th>
          <th>Scheme Name</th>
          <th>Date</th>
          <th>EAN Code</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>UOM</th>
          <th>Free Quantity</th>
          <th>Discount</th>
          <th>Net PTR</th>
          <th>Narration</th>
          <th>Validity</th>
          <th>Active</th>
          <th>Action</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="(data, index) in schemeData" :key="data._id">
          <td>{{ index + 1 }}</td>
          <td>{{ data._id }}</td>
          <td>{{ data.schemaNumber }}</td>
          <td>{{ data.schemaName }}</td>
          <td>{{ data.date }}</td>
          <td>{{ data.EANCode }}</td>
          <td>{{ data.productName }}</td>
          <td>{{ data.quantity }}</td>
          <td>{{ data.UOM }}</td>
          <td>{{ data.freeQuantity }}</td>
          <td>{{ data.discount }}</td>
          <td>{{ data.netPTR }}</td>
          <td>{{ data.nararation }}</td>
          <td>{{ data.validity }}</td>
          <td>{{ data.active }}</td>
          <td>
            <div class="">
              <router-link
                :to="{ name: 'SchemesEdit', params: { id: data._id } }"
              >
                <button
                  type="button"
                  class="btn base-button btn-icon btn-fab btn btn-default btn-sm edit"
                >
                  <i class="text-white ni ni-ruler-pencil"></i>
                </button>
              </router-link>
              <button
                type="button"
                class="btn base-button btn-icon btn-fab btn-danger btn-sm remove btn-link"
                @click.prevent="destroy(data._id)"
              >
                <i class="text-white ni ni-fat-remove"></i>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </Table>
    <button type="button" class="btn base-button btn-default">
      <export-excel :data="schemeData"> Download Data </export-excel>
    </button>
    <button
      type="button"
      class="btn base-button btn-default"
      @click="visibleCard = true"
      data-toggle="modal"
      data-target="#add"
    >
      upload excel
    </button>
    <div v-if="visibleCard">
      <DataModal :title="'Upload Excel'">
        <template v-slot:body>
          <div>
            <form>
              <input
                class="form-control"
                type="file"
                ref="file"
                @change="handleFileUpload"
                name="file"
              />
            </form>
          </div>
        </template>
        <template v-slot:footer>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn base-button btn-default"
            data-dismiss="modal"
            @click="uploadExcel"
          >
            upload
          </button>
        </template>
      </DataModal>

    </div>


  </div>
</template>
<script>
import 'animate.css';
import axios from "axios";
import ExampleModal from "./exampleModal";

import "flatpickr/dist/flatpickr.css";
import { useToast } from "vue-toastification";
import 'ant-design-vue/dist/antd.css';
export default {
  components: {ExampleModal},
  data() {
    return {
      index:0,
      showModal: false,
     items: ['jack', 'lucy'] ,
      visible:false,
      visibleCard: false,
      isModalVisible: false,
      excel: "",
      status: "",
      schemaName: "",
      schemeData: [],
      dates: {
        startDate: "",
        endDate: "",
      },
    };
  },
  mounted() {
    this.fetchSchemes();
  },
  methods: {
    selectChange(e){
      if(e.target.value=='Create Scheme'){
        this.visible=true;
      }
    },
    create(){
      this.$emit('model.create');
    },
    handleFileUpload() {
      this.excel = this.$refs.file.files[0];
    },
    notification(content, type) {
      const toast = useToast();
      toast(content, {
        hideProgressBar: true,
        icon: false,
        type: type,
        closeButton: false,
        position: "top-right",
        timeout: 1500,
      });
    },
    uploadExcel() {
      const formData = new FormData();
      formData.append("file", this.excel);
      axios
        .post("api/product/excelUpload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.status = response.status;
          console.log(response.status);
          this.notification("Uploaded Successfully", "success");
        })
        .catch(() => {
          this.notification("EANCode already exist", "error");
        });
      this.$refs.file.value = null;
    },
    fetchSchemes() {
      axios
        .get("/api/schema/get", {
          params: {
            startDate: this.dates.startDate,
            endDate: this.dates.endDate,
          },
        })
        .then((response) => {
          this.schemeData = response.data;
        });
    },
    submit() {

      console.log(this.schemaName);
      axios
        .post(`/api/schema/create`, { schemaName: this.schemaName })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.error = error;
          console.log(this.error);
        });
    },
  },
};
</script>

<style scoped>
.higher{
  z-index: 99999;
}
</style>
