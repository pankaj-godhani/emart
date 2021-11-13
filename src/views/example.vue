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
    <button type="button" class="btn base-button btn-default" @click="openCard" data-toggle="modal" data-target="#add">
      upload excel
    </button>
    <div >
      <DataModal :title="('Upload Excel')" v-if="visibleCard">
          <template v-slot:body>
            <div>
              <form>
                <input class="form-control" type="file" ref="file" name="file">
              </form>
            </div>
          </template>
        <template v-slot:footer>
          <div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn base-button btn-default" data-dismiss="modal" @click="uploadExcel">
              upload
            </button>
          </div>
        </template>
      </DataModal>
    </div>



    <!-- Modal -->
<!--    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>-->

  </div>
</template>
<script>
import axios from "axios";
import flatPicker from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components:{flatPicker,DateRangePicker},
  data(){
    return{
      visibleCard:false,
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
    openCard(){
      this.visibleCard=true;
    },
    uploadExcel(){
      this.visibleCard=false;
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
          console.log(this.schemeData);
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
          console.log( error);
        });

    }
  }
}
</script>
