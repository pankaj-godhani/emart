<template>

  <div>
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
          <input type="date" class="form-control" placeholder="from" v-model="dates.startDate">
          <input type="date" class="form-control" placeholder="to" v-model="dates.endDate">



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
      <base-button class="btn-primary" type="submit" >Submit</base-button>
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
        <tr v-for="(data,index) in schemeData" :key="data._id">
          <td>{{index+1}}</td>
          <td>{{data._id}}</td>
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
              <router-link :to="{name:'SchemesEdit',params: { id: data._id}}">
                <button type="button"
                        class="btn base-button btn-icon btn-fab btn btn-default btn-sm edit">
                  <i class="text-white ni ni-ruler-pencil"></i>
                </button>
              </router-link>
              <button type="button"
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
      <export-excel
        :data   = "schemeData">
        Download Data
      </export-excel>
    </button>
    <button type="button" class="btn base-button btn-default" @click="visibleCard=true" data-toggle="modal" data-target="#add">
      upload excel
    </button>
    <div v-if="visibleCard">
      <DataModal :title="('Upload Excel')" >
          <template v-slot:body>
            <div>
              <form>
                <input class="form-control"
                       type="file"
                       ref="file"
                       @change="handleFileUpload"
                       name="file">
              </form>
            </div>
          </template>
        <template v-slot:footer>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn base-button btn-default" data-dismiss="modal" @click="uploadExcel">
              upload
            </button>
        </template>
      </DataModal>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import flatPicker from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import DateRangePicker from 'vue2-daterange-picker'
import {useToast} from 'vue-toastification';
//you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components:{flatPicker,DateRangePicker},
  data(){
    return{
      visibleCard:false,
      excel:'',
      status:'',
      schemaName:'',
      schemeData:[],
      dates: {
        startDate:'',
        endDate:''
      }
    }
  },
  mounted() {
    this.fetchSchemes();
  },
  methods:{
    handleFileUpload() {
      this.excel = this.$refs.file.files[0];
    },
    notification(content,type){
      const toast = useToast();
      toast(content, {
        hideProgressBar: true,
        icon: false,
        type:type,
        closeButton: false,
        position: 'top-right',
        timeout:1500
      });
    },
    uploadExcel(){
        const formData = new FormData();
        formData.append("file", this.excel);
        axios.post("api/product/excelUpload",formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(response=>{
            this.status=response.status
            console.log(response.status);
            this.notification('Uploaded Successfully','success');
          })
        .catch(()=>{
          this.notification('EANCode already exist','error');
        });
      this.$refs.file.value = null;

    },
    fetchSchemes(){
      axios.get("/api/schema/get",{
        params:{
          startDate: this.dates.startDate,
          endDate: this.dates.endDate
        }
      })
        .then(response=>{
          this.schemeData=response.data;
        });
    },
    submit(){
     // const formData = new FormData();
      //formData.append('schemaName',this.schemaName);
      console.log(this.schemaName);
      axios.post(`/api/schema/create`,{'schemaName':this.schemaName}
      )
        .then(response => {
          console.log(response);
        })
        .catch(error =>{
          this.error=error;
          console.log(this.error);
        });

    },

  }
}
</script>
