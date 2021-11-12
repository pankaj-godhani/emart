<template>
  <card>
    <div class="container ct-example-row">
      <form @submit="submit" ref='textareaform'>
        <div>
          <h3><b>Group Heading 1</b></h3>
          <div class="row mt-3">

            <div class="col-sm form-group">
              <label class=" form-control-label">Scheme Name</label>
              <input
                v-model="model.schemaName"
                class="form-control"
                type="text"
                placeholder="Scheme Name"
              />
            </div>
            <div class="col-sm">
              <label class=" form-control-label">Date</label>
              <input
                class="form-control"
                type="date"
                v-model="model.date"
              />

            </div>
            <div class="col-sm">
              <label class=" form-control-label">EAN Code</label>
              <input
                class="form-control"
                placeholder="Enter EAN Code"
                v-model="model.EANCode"
                @keyup="fetchEANCode"
              />
            </div>

          </div>
          <div class="row ">

            <div class="col-sm">
              <label class=" form-control-label">Product Name</label>
              <input
                class="form-control"
                placeholder="Enter Product Name"
                v-model="model.productName"
              />
            </div>
            <div class="col-sm">
              <label class=" form-control-label">Quantity</label>
              <input
                class="form-control"
                placeholder="Enter Quantity"
                v-model="model.quantity"
              />

            </div>
            <div class="col-sm">
              <label class=" form-control-label">Free Quantity</label>
              <input
                class="form-control"
                placeholder="Enter Free Quantity"
                v-model="model.freeQuantity"
              />

            </div>

          </div>
        </div>
        <div class="mt-4">
          <h3><b>Group Heading 2</b></h3>
          <div class="row mt-3">

            <div class="col-sm">
              <label class=" form-control-label">Net PTR</label>
              <input
                class="form-control"
                placeholder="Enter Net PTR"
                v-model="model.netPTR"
              />
            </div>
            <div class="col-sm">
              <label class=" form-control-label">UOM</label>
              <input
                class="form-control"
                placeholder="Enter UOM"
                v-model="model.UOM"
              />

            </div>
            <div class="col-sm">
              <label class=" form-control-label">Discount</label>
              <input
                class="form-control"
                placeholder="Enter Discount"
                v-model="model.discount"
              />
            </div>

          </div>
          <div class="row mt-4">

            <div class="col-sm">
              <label class=" form-control-label">Validity</label>
              <input
                class="form-control"
                type="date"
                v-model="model.dateOfAvailability"
              />
            </div>
            <div class="col-sm">
              <label class=" form-control-label">Narration</label>
              <input
                class="form-control"
                placeholder="Enter Narration"
                v-model="model.nararation"
              />

            </div>
            <div class="col-sm">
              <!--              <label class=" form-control-label">Active</label>-->
              <div class="mt-5 pl-5">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input pr-0" id="customSwitch1" v-model="model.active">
                  <label class="custom-control-label" for="customSwitch1">Active</label>
                </div>


              </div>

            </div>

          </div>
          <div class="row mt-3">
            <div class="col-4" >
              <label class=" form-control-label">Scheme Number</label>
              <input
                class="form-control"
                placeholder="Scheme Number-Auto Generated"
                v-model="model.schemaNumber"
              />
            </div>
          </div>
        </div>

        <div class="text-right">
          <router-link :to="{name:'Schemes'}"><base-button outline type="default">Cancel</base-button></router-link>
<!--          <base-button outline type="default">Cancel</base-button>-->
          <button
            type="button"
            class="btn btn-secondary bg-dark text-white"
            data-dismiss="modal"
            @click.prevent="update"
            v-if="editing"
          >Save</button>
          <button
            type="button"
            class="btn btn-secondary bg-dark text-white"
            data-dismiss="modal"
            @click.prevent="submit"
            v-else
          >Submit</button>

        </div>


      </form>

    </div>
  </card>


</template>

<script>

import axios from 'axios';

//import BaseButton from "../../BaseButton";
import _ from 'lodash';
export default {
  components: {  },
  props: ['id'],
  data(){
    return{
      model:{
        schemaName : '',
        date : '',
        productName : '',
        EANCode : '',
        quantity : '',
        freeQuantity : '',
        netPTR : '',
        UOM : '',
        discount : '',
        dateOfAvailability : '',
        nararation : '',
        active : true,
        schemaNumber : Math.floor(Math.random()*100000),
      }

    }
  },
  mounted() {
    if (this.editing) {
      this.fetch();
    }

  },
  methods:{
    fetch() {
      axios.get(`http://localhost:9999/api/schema/get/${this.id}`)
        .then(response => {
          // eslint-disable-next-line no-undef
          console.log(response.data[0]);
          this.model = _.merge(this.model,response.data[0]);
        });
    },
    submit() {
      this.editing ? this.update() : this.store();
    },

    fetchEANCode(){
      axios.get(`http://localhost:9999/api/product/getProductDetails?`,{
        params: {
          EANCode: this.model.EANCode
        }
      }).then(response=>{
        console.log(response.data[0])
        this.model = _.merge(this.model,response.data[0]);
      })
      .catch(error=>{
        console.log(error,'scheme');
        if(error){
          //this.model={};
        }
      });
    },

    store(){
      axios.post(`https://vuecrud78.herokuapp.com/api/schema/create`,{
        'schemaName':this.model.schemaName,
        'date':this.model.date,
        'productName':this.model.productName,
        'EANCode':this.model.EANCode,
        'quantity':this.model.quantity,
        'freeQuantity':this.model.freeQuantity,
        'netPTR':this.model.netPTR,
        'UOM':this.model.UOM,
        'discount':this.model.discount,
        'validity':this.model.dateOfAvailability,
        'nararation':this.model.nararation,
        'active':this.model.active,
        'schemaNumber':this.model.schemaNumber,
      })
        .then(response => {
          console.log(response);
          this.$router.go(-1);
        })
        .catch(error =>{
          console.log( error);
        });
      this.model={};


    },
    update() {
      axios.put(`https://vuecrud78.herokuapp.com/api/schema/edit/${this.id}`, this.model)
        .then(response => {
          console.log(response);
          this.$router.go(-1);
        });
    },

  },
  computed: {
    editing() {
      return !!this.id;
    }
  }
};
</script>
