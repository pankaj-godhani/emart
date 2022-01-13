<template>
  <card>
    <form>
      <div class="text-center mb-4">

        <div v-if="imageURL!=null">
          <img :src="imageURL" class="rounded" style="height: 125px; width: 125px" alt="100x100">
        </div>
        <div v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="125" height="125" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
        </div>

      </div>

      <div class="form-row justify-content-center">
        <div class="form-group col-md-5">
          <input  class="form-control"
                  type="file"
                  ref="file1"
                  @change="getImage"
                  accept="image/*"/>
        </div>
      </div>

      <div class="row pb-3">
        <div class="col-sm">
          <label class="form-control-label">Vendor Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Vendor Name"
            v-model="form.vendor_name"
          />
        </div>
        <div class="col-sm">
          <label class="form-control-label">First Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            v-model="form.firstName"
          />
        </div>
        <div class="col-sm">
          <label class="form-control-label">Middle Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Middle Name"
            v-model="form.middleName"
          />
        </div>
        <div class="col-sm">
          <label class="form-control-label">Last Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Last Name"
            v-model="form.lastName"
          />
        </div>

      </div>
      <div class="row pb-3">
        <div class="col-sm">
          <label class="form-control-label">Vendor Address Code</label>
          <input
            type="text"
            class="form-control"
            placeholder="Vendor Address Code"
            v-model="form.vendor_Address_code"
          />
        </div>
        <div class="col-sm">
          <label class="form-control-label">Address Line 1</label>
          <input
            type="text"
            class="form-control"
            placeholder="Address Line 1"
            v-model="form.address_Line1"
          />
        </div>
        <div class="col-sm">
          <label class="form-control-label">Address Line 2</label>
          <input
            type="text"
            class="form-control"
            placeholder="Address Line 2"
            v-model="form.address_Line2"
          />
        </div>
        <div class="col-sm">
          <label class="form-control-label">Postal Code</label>
          <input
            type="text"
            class="form-control"
            placeholder="Postal Code"
            v-model="form.postal_Code"
          />
        </div>

      </div>
      <div class="row pb-3">
        <div class="col-sm ">
          <label class="form-control-label">Vendor Code</label>
          <input
            type="text"
            class="form-control"
            placeholder="Vendor Code"
            v-model="form.vendor_Code"
          />
        </div>
        <div class="col-sm ">
          <label class="form-control-label" >Country ID</label>
          <select class="form-control" v-model="form.country_id" @change="getStates($event.target.value)">
            <option disabled selected value>Choose Country</option>
            <option v-for="country in countries" :key="country.key" :value="country.key">
              {{ country.value }}
            </option>
          </select>
        </div>
        <div class="col-sm ">
          <label class="form-control-label">State</label>
          <select class="form-control" v-model="form.state">
            <option disabled selected value>Choose State</option>
            <option v-for="state in states" :key="state.key" :value="state.value">
              {{ state.value }}
            </option>
          </select>
        </div>

        <div class="col-sm ">
          <label class="form-control-label">City</label>
          <input
            type="text"
            class="form-control"
            placeholder="City"
            v-model="form.city"
          />
        </div>


      </div>
      <div class="row pb-3">

        <div class="col-sm">
          <label class="form-control-label">E-mail</label>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            v-model="form.email"
          />
          <p class="text-danger text-xs" v-if="errMessage.email">{{ errMessage.email }}</p>
        </div>
        <div class="col-sm">
          <label class="form-control-label">Mobile Number</label>
          <input
            type="text"
            class="form-control"
            placeholder="Mobile Number"
            v-model="form.mobileNumber"
          />
          <p class="text-danger text-xs" v-if="errMessage.mobileNumber">{{ errMessage.mobileNumber }}</p>
        </div>
        <div class="col-sm">
          <h4 class="form-control-label">Status</h4>
          <select class="form-control" v-model="form.isActive">
            <option :value="true">Active</option>
            <option :value="false">Inactive</option>
          </select>
        </div>
        <div class="col-sm">
          <label class="form-control-label">Admin</label>
          <select class="form-control" v-model="form.isAdmin">
            <option disabled selected>Select Permission</option>
            <option :value="true">Admin</option>
            <option :value="false">User</option>
          </select>
        </div>

      </div>
      <div class="row pb-3">
        <div class="col-sm">
          <label class="form-control-label">PAN Number</label>
          <input
            type="text"
            class="form-control"
            placeholder="PAN Number"
            v-model="form.panNo"
          />
        </div>
        <div class="col-sm">
          <label class="form-control-label">GST</label>
          <input
            type="text"
            class="form-control"
            placeholder="GST"
            v-model="form.GST"
          />
        </div>
        <div class="col-sm ">
          <label class="form-control-label">Payment Terms</label>
          <input
            type="text"
            class="form-control"
            placeholder="Payment Terms"
            v-model="form.paymentTerms"
          />
        </div>
        <div class="col-sm">
          <label class="form-control-label">Shipping Terms</label>
          <input
            type="text"
            class="form-control"
            placeholder="Shipping Terms"
            v-model="form.shippingTerms"
          />
        </div>

      </div>

      <div class="row pb-3">
        <div class="col-sm-4">
          <label class="form-control-label">Vendor Type</label>
          <select class="form-control" v-model="form.vendorType">
            <option disabled selected value>Select Vendor Type</option>
            <option value="Farmer">Farmer</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Traders">Traders</option>
            <option value="Packhouse">Packhouse</option>
            <option value="Millers">Millers</option>
            <option value="Packaging house">Packaging house</option>
            <option value="Processors">Processors</option>
          </select>
        </div>
        <div class="col-sm-4">
          <label class="form-control-label">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="passWord"
          />
        </div>

      </div>
      <h3 class="mt-3"><b>Bank Details</b></h3>
      <div class="row pb-3">
        <div class="col-sm">
          <label class="form-control-label">Bank Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Bank Name"
            v-model="form.bankName"
          />
        </div>
        <div class="col-sm">
          <label class="form-control-label">Account Number</label>
          <input
            type="text"
            class="form-control"
            placeholder="Account Number"
            v-model="form.accountNumber"
          />
        </div>
        <div class="col-sm">
          <label class="form-control-label">IFSC Code</label>
          <input
            type="text"
            class="form-control"
            placeholder="IFSC Code"
            v-model="form.IFSCCode"
          />
        </div>


      </div>

      <div class="d-flex float-right">
        <div class="pr-2">
<!--          <router-link :to="{ name: 'Profile' }">
            <base-button outline type="default" @click="goBack">Cancel</base-button>
          </router-link>-->
          <button class="btn btn-outline-default" @click.prevent="$router.go(-1)">Cancel</button>
        </div>
        <div>
          <button
            type="button"
            class="btn base-button btn-default"
            v-if="editing"
            @click.prevent="onUpdate"
          >
            Save
          </button>
          <button
            type="button"
            class="btn base-button btn-default"
            v-else
            @click.prevent="store"
          >
            Submit
          </button>
        </div>

      </div>
    </form>
  </card>
</template>

<script>
import axios from "axios";
//import {mapGetters} from "vuex";
import { authMethods } from "../../state/helpers";


export default {
  props:['id'],
  data(){
    return{
      //userData:[],
      imageURL: null,
      countries:[],
      states:[],
      status:'',
      errMessage:'',
      form: {
        firstName:'',
        middleName:'',
        lastName:'',
        mobileNumber:'',
        email: '',
        panNo: '',
        bankName: '',
        accountNumber: '',
        IFSCCode: '',
        paymentTerms: '',
        shippingTerms: '',
        GST: '',
        vendorType: '',
        vendor_name: '',
        vendor_Address_code: '',
        address_Line1: '',
        address_Line2: '',
        postal_Code: '',
        country_id:'',
        state: '',
        city: '',
        vendor_Code: '',
        system_vendor_id: '',
        isAdmin:false,
        isActive:false,
        file:null,
      },
      passWord: '',
      system_Vendor_id:'',
    }
  },

  computed:{
    editing() {
      return !!this.id;
    },
  },
  mounted(){
    this.getCountries();
    if (this.editing) {
      this.fetch();
    }
  },

  methods:{
    ...authMethods,
    getImage() {
      this.form.file = this.$refs.file1.files.item(0);
      this.imageURL = URL.createObjectURL(this.form.file);
    },
    submit() {
      this.editing ? this.onUpdate() : this.store();
    },
    fetch(){
      axios.get(`api/auth/user/${this.id}`)
      .then(response=>{
        console.log(response);
        this.form=response.data[0];
        this.form.state=this.getStates();
      });
    },
    getCountries(){
      axios.get(`api/auth/getCountry`)
      .then(response=>{
        this.countries = response.data;
      })
      .catch(e=>{
        console.log(e);
      })
    },
    getStates(){
      axios.get(`api/auth/getState/${this.form.country_id}`)
      .then(response=>{
        this.states = response.data;
      })
    },
    onUpdate(){
      const formData = new FormData();
      formData.append('firstName',this.form.firstName);
      formData.append('middleName',this.form.middleName);
      formData.append('lastName',this.form.lastName);
      formData.append('mobileNumber',this.form.mobileNumber);
      formData.append('email',this.form.email);
      formData.append('panNo',this.form.panNo);
      formData.append('bankName',this.form.bankName);
      formData.append('accountNumber',this.form.accountNumber);
      formData.append('IFSCCode',this.form.IFSCCode);
      formData.append('paymentTerms',this.form.paymentTerms);
      formData.append('shippingTerms',this.form.shippingTerms);
      formData.append('GST',this.form.GST);
      formData.append('vendorType',this.form.vendorType);
      formData.append('vendor_name',this.form.vendor_name);
      formData.append('vendor_Address_code',this.form.vendor_Address_code);
      formData.append('address_Line1',this.form.address_Line1);
      formData.append('address_Line2',this.form.address_Line2);
      formData.append('postal_Code',this.form.postal_Code);
      formData.append('country_id',this.form.country_id);
      formData.append('state',this.form.state);
      formData.append('city',this.form.city);
      formData.append('vendor_Code',this.form.vendor_Code);
      if(this.passWord!==""){
        formData.append('passWord',this.passWord);
      }
      formData.append('isAdmin',this.form.isAdmin);
      formData.append('isActive',this.form.isActive);
      formData.append('file',this.form.file);

      axios.put(`api/auth/edit/${this.id}`,formData,{
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(()=>{
          this.notification('User updated successfully','success');
          this.$router.go(-1);
        });
    },

    store(){
      axios.post(`api/auth/createUser`,{
          "firstName":this.form.firstName,
          "middleName":this.form.state,
          "lastName":this.form.lastName,
          "mobileNumber":this.form.mobileNumber,
          "email": this.form.email,
          "panNo": this.form.panNo,
          "bankName": this.form.bankName,
          "accountNumber": this.form.accountNumber,
          "IFSCCode": this.form.IFSCCode,
          "paymentTerms": this.form.paymentTerms,
          "shippingTerms": this.form.shippingTerms,
          "GST": this.form.GST,
          "vendorType": this.form.vendorType,
          "vendor_name": this.form.vendor_name,
          "vendor_Address_code": this.form.vendor_Address_code,
          "address_Line1": this.form.address_Line1,
          "address_Line2": this.form.address_Line2,
          "postal_Code": this.form.postal_Code,
          "country_id":this.form.country_id,
          "state": this.form.state,
          "city": this.form.city,
          "vendor_Code": this.form.vendor_Code,
        /*"vatNo": "",
        "cstNo": "",
        "gstNo": ""*/
      },)
      .then(response=>{
        console.log(response)
        this.system_Vendor_id=response.data.data;
        this.storeUser();
      })
       .catch(()=>{
        this.storeUser();
       })
    },

    storeUser(){
      const formData = new FormData();
      formData.append('firstName',this.form.firstName);
      formData.append('middleName',this.form.middleName);
      formData.append('lastName',this.form.lastName);
      formData.append('mobileNumber',this.form.mobileNumber);
      formData.append('email',this.form.email);
      formData.append('panNo',this.form.panNo);
      formData.append('bankName',this.form.bankName);
      formData.append('accountNumber',this.form.accountNumber);
      formData.append('IFSCCode',this.form.IFSCCode);
      formData.append('paymentTerms',this.form.paymentTerms);
      formData.append('shippingTerms',this.form.shippingTerms);
      formData.append('GST',this.form.GST);
      formData.append('vendorType',this.form.vendorType);
      formData.append('vendor_name',this.form.vendor_name);
      formData.append('vendor_Address_code',this.form.vendor_Address_code);
      formData.append('address_Line1',this.form.address_Line1);
      formData.append('address_Line2',this.form.address_Line2);
      formData.append('postal_Code',this.form.postal_Code);
      formData.append('country_id',this.form.country_id);
      formData.append('state',this.form.state);
      formData.append('city',this.form.city);
      formData.append('vendor_Code',this.form.vendor_Code);
      formData.append('passWord',this.passWord);
      formData.append('isAdmin',this.form.isAdmin);
      formData.append('isActive',this.form.isActive);
      formData.append('file',this.form.file);
     /* if(this.system_Vendor_id===null || this.system_Vendor_id==='')
      {
        return formData
      }
      else {
        return formData.append('system_Vendor_id',this.system_Vendor_id);
      }*/
      axios.post(`api/auth/create`,formData,{
          header: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response)=>{
          console.log(response);
          this.status = response.status;
          console.log(this.status)
          if(this.status===200)
          {
            this.notification('User created successfully','success');
            this.goBack();
          }
          else if(this.status===201)
          {
            this.errMessage = response.data.message;
          }
        //this.notification('User created successfully','success');

      })
        .catch(()=>{
          this.notification('Something went wrong','error');
        });
    },
  }
};

</script>
