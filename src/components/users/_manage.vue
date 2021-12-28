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

      <div class="row">
        <div class="col-sm pb-2">
          <label class="form-control-label">First Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            v-model="form.firstName"
          />
        </div>
        <div class="col-sm pb-2">
          <label class="form-control-label">Middle Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Middle Name"
            v-model="form.middleName"
          />
        </div>
        <div class="col-sm pb-2">
          <label class="form-control-label">Last Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Last Name"
            v-model="form.lastName"
          />
        </div>

      </div>
      <div class="row">
        <div class="col-sm pb-2">
          <label class="form-control-label">Address</label>
          <input
            type="text"
            class="form-control"
            placeholder="Address"
            v-model="form.address"
          />
        </div>
        <div class="col-sm pb-2">
          <label class="form-control-label">E-mail</label>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            v-model="form.email"
          />
        </div>
        <div class="col-sm pb-2">
          <label class="form-control-label">Mobile Number</label>
          <input
            type="text"
            class="form-control"
            placeholder="Mobile Number"
            v-model="form.mobileNumber"
          />
        </div>


      </div>
      <div class="row">
        <div class="col-sm pb-2">
          <label class="form-control-label">PAN Number</label>
          <input
            type="text"
            class="form-control"
            placeholder="PAN Number"
            v-model="form.panNo"
          />
        </div>
        <div class="col-sm pb-2">
          <h4 class="form-control-label">Status</h4>
          <select class="form-control" v-model="form.isActive">
            <option :value="true">Active</option>
            <option :value="false">Inactive</option>
          </select>
        </div>
        <div class="col-sm pb-2">
          <label class="form-control-label">Admin</label>
          <select class="form-control" v-model="form.isAdmin">
            <option disabled selected>Select Permission</option>
            <option :value="true">Admin</option>
            <option :value="false">User</option>
          </select>
        </div>

      </div>
      <div class="row">
        <div class="col-sm pb-2">
          <label class="form-control-label">Payment Terms</label>
          <input
            type="text"
            class="form-control"
            placeholder="Payment Terms"
            v-model="form.paymentTerms"
          />
        </div>
        <div class="col-sm pb-2">
          <label class="form-control-label">Shipping Terms</label>
          <input
            type="text"
            class="form-control"
            placeholder="Shipping Terms"
            v-model="form.shippingTerms"
          />
        </div>
        <div class="col-sm pb-2">
          <label class="form-control-label">GST</label>
          <input
            type="text"
            class="form-control"
            placeholder="GST"
            v-model="form.GST"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4 pb-2">
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
        <div class="col-sm-4 pb-2">
          <label class="form-control-label">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="form.passWord"
          />
        </div>

      </div>
      <h3 class="mt-3"><b>Bank Details</b></h3>
      <div class="row">
        <div class="col-sm pb-2">
          <label class="form-control-label">Bank Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Bank Name"
            v-model="form.bankName"
          />
        </div>
        <div class="col-sm pb-2">
          <label class="form-control-label">Account Number</label>
          <input
            type="text"
            class="form-control"
            placeholder="Account Number"
            v-model="form.accountNumber"
          />
        </div>
        <div class="col-sm pb-2">
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
          <router-link :to="{ name: 'Users' }">
            <base-button outline type="default">Cancel</base-button>
          </router-link>
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
      form: {
        firstName:'',
        middleName:'',
        lastName:'',
        address:'',
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
        passWord: '',
        isAdmin:false,
        isActive:false,
        file:null,
      },
    }
  },

  computed:{
    editing() {
      return !!this.id;
    },
   /* user(){
      return this.$store.getters['auth/getUser'];
    },*/
  },
  mounted(){
    if (this.editing) {
      this.fetch();
    }
    console.log(this.user);
    console.log(this.id);
  },

  methods:{
    ...authMethods,
    getImage() {
      this.form.file = this.$refs.file1.files.item(0);
      this.imageURL = URL.createObjectURL(this.form.file);
      console.log(this.form.file);
    },
    submit() {
      this.editing ? this.onUpdate() : this.store();
    },
    fetch(){
      axios.get(`api/auth/user/${this.id}`)
      .then(response=>{
        this.form=response.data[0];
        console.log(this.form);
      });
    },

    onUpdate(){
      const formData = new FormData();
      formData.append('firstName',this.form.firstName);
      formData.append('middleName',this.form.middleName);
      formData.append('lastName',this.form.lastName);
      formData.append('address',this.form.address);
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
      formData.append('passWord',this.form.passWord);
      formData.append('isAdmin',this.form.isAdmin);
      formData.append('isActive',this.form.isActive);
      formData.append('file',this.form.file);

      axios.put(`api/auth/edit/${this.id}`,formData,{
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response)=>{
          console.log(response);
          this.notification('User updated successfully','success');
          this.$router.go(-1);
        });
    },

    store(){
      const formData = new FormData();
      formData.append('firstName',this.form.firstName);
      formData.append('middleName',this.form.middleName);
      formData.append('lastName',this.form.lastName);
      formData.append('address',this.form.address);
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
      formData.append('passWord',this.form.passWord);
      formData.append('isAdmin',this.form.isAdmin);
      formData.append('isActive',this.form.isActive);
      formData.append('file',this.form.file);
        axios.post(`api/auth/create`,formData,{
          header: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response)=>{
        console.log(response);
        this.notification('User created successfully','success');
        this.goBack();
      })
        .catch(error=>{
          console.log(error,'error');
          if(this.form.email || this.form.mobileNumber){
            this.notification('Email or Mobile Number already exist.','error');
          }
          else
          {
            this.notification('Email or Mobile Number is required.','error');
          }

        });
    },
    /*changeStatus(){
      axios.put(`api/auth/changeActiveStatus/${this.id}`,{
        headers: {
          'Authorization': this.token
        },
      })
      .then(response=>{
        console.log(response);
        this.$router.go();
      })
    }*/
  }
};

</script>
