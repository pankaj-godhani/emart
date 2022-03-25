<template>
  <div>
    <!-- Header -->
    <div class="header  py-7 py-lg-8 pt-lg-9">

      <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-12 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
              <div class="bg-gradient bg-transparent text-center" style="border-radius:10px 10px 0px 0px">
                <img src="../../../public/img/e-metro.png" class="w-50 h-50 mt-2 px-2"  alt="Sidebar logo" />
              </div>
              <div class="card-header bg-gradient bg-transparent pb-2">
                <div class="text-muted text-left">
                  <h1 style="color: #044e7f;" >Welcome to Register!</h1>
                  <h5 style="color: #044e7f;">Sign up to continue to login</h5>
                </div>
              </div>
              <div class="card-body px-lg-5 py-lg-5">
                <form @submit.prevent="submit" >
<!--                  <div class="row pb-3">
                    <div class="col-sm">
                      <label class="form-control-label">Company Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Vendor Name"
                        v-model="form.vendor_name"
                      />
                      <p class="text-danger text-xs" >{{ errors['vendor_name'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                        v-model="form.firstName"
                      />
                      <p class="text-danger text-xs" >{{ errors['firstName'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                        v-model="form.lastName"
                      />
                      <p class="text-danger text-xs" >{{ errors['lastName'] }}</p>
                    </div>

                  </div>
                  <div class="row pb-3">
                    <div class="col-sm">
                      <label class="form-control-label">Address Line 1</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Address Line 1"
                        v-model="form.address_Line1"
                      />
                      <p class="text-danger text-xs" >{{ errors['address_Line1'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Address Line 2</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Address Line 2"
                        v-model="form.address_Line2"
                      />
                      <p class="text-danger text-xs" >{{ errors['address_Line2'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Postal Code</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Postal Code"
                        v-model="form.postal_Code"
                      />
                      <p class="text-danger text-xs" >{{ errors['postal_Code'] }}</p>
                    </div>

                  </div>
                  <div class="row pb-3">

                    <div class="col-sm ">
                      <label class="form-control-label" >Country ID</label>
                      <select class="form-control" v-model="form.country_id" @change="getStates($event.target.value)">
                        <option disabled selected value>Choose Country</option>
                        <option v-for="country in countries" :key="country.key" :value="country.key">
                          {{ country.value }}
                        </option>
                      </select>
                      <p class="text-danger text-xs" >{{ errors['country_id'] }}</p>
                    </div>
                    <div class="col-sm ">
                      <label class="form-control-label">State</label>
                      <select class="form-control" v-model="form.state">
                        <option disabled selected value>Choose State</option>
                        <option v-for="state in states" :key="state.key" :value="state.value">
                          {{ state.value }}
                        </option>
                      </select>
                      <p class="text-danger text-xs" >{{ errors['state'] }}</p>
                    </div>

                    <div class="col-sm ">
                      <label class="form-control-label">City</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="City"
                        v-model="form.city"
                      />
                      <p class="text-danger text-xs" >{{ errors['city'] }}</p>
                    </div>


                  </div>
                  <div class="row pb-3">
                    <div class="col-sm" v-show="false">
                      <label class="form-control-label">Vendor Code</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Vendor Code"
                        v-model="form.vendor_Code"
                        disabled
                      />
                      &lt;!&ndash;          <p class="text-danger text-xs" >{{ errors['vendor_Code'] }}</p>&ndash;&gt;
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">E-mail</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                        v-model="form.email"
                      />
                      <p class="text-danger text-xs">{{ errors['email'] ?errors['email']: errMessage.email }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Mobile Number</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Mobile Number"
                        v-model="form.mobileNumber"
                      />
                      <p class="text-danger text-xs">{{ errors['mobileNumber'] ?errors['mobileNumber']: errMessage.mobileNumber }}</p>
                    </div>
                    <div class="col-sm">
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
                      <p class="text-danger text-xs" >{{ errors['vendorType'] }}</p>
                    </div>

                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <label class="form-control-label">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="form.passWord"
                      />
                    </div>
                  </div>-->
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
                      <input
                        class="form-control"
                        type="file"
                        ref="file1"
                        @change="getImage"
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <div class="row pb-3">
                    <div class="col-sm">
                      <label class="form-control-label">Company Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Company Name"
                        v-model="form.vendor_name"
                      />
                      <p class="text-danger text-xs" >{{ errors['vendor_name'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                        v-model="form.firstName"
                      />
                      <p class="text-danger text-xs" >{{ errors['firstName'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Middle Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Middle Name"
                        v-model="form.middleName"
                      />
                      <p class="text-danger text-xs" >{{ errors['middleName'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                        v-model="form.lastName"
                      />
                      <p class="text-danger text-xs" >{{ errors['lastName'] }}</p>
                    </div>

                  </div>
                  <div class="row pb-3">
                    <div class="col-sm">
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
                      <p class="text-danger text-xs" >{{ errors['vendorType'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Address Line 1</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Address Line 1"
                        v-model="form.address_Line1"
                      />
                      <p class="text-danger text-xs" >{{ errors['address_Line1'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Address Line 2</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Address Line 2"
                        v-model="form.address_Line2"
                      />
                      <p class="text-danger text-xs" >{{ errors['address_Line2'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Postal Code</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Postal Code"
                        v-model="form.postal_Code"
                      />
                      <p class="text-danger text-xs" >{{ errors['postal_Code'] }}</p>
                    </div>

                  </div>
                  <div class="row pb-3">
                    <div class="col-sm " v-show="false">
                      <label class="form-control-label">Vendor Code</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Vendor Code"
                        v-model="form.vendor_Code"
                        disabled
                      />
                      <!--          <p class="text-danger text-xs" >{{ errors['vendor_Code'] }}</p>-->
                    </div>
                    <div class="col-sm ">
                      <label class="form-control-label" >Country ID</label>
                      <select class="form-control" v-model="form.country_id" @change="getStates($event.target.value)">
                        <option disabled selected value>Choose Country</option>
                        <option v-for="country in countries" :key="country.key" :value="country.key">
                          {{ country.value }}
                        </option>
                      </select>
                      <p class="text-danger text-xs" >{{ errors['country_id'] }}</p>
                    </div>
                    <div class="col-sm ">
                      <label class="form-control-label">State</label>
                      <select class="form-control" v-model="form.state">
                        <option disabled selected value>Choose State</option>
                        <option v-for="state in states" :key="state.key" :value="state.value">
                          {{ state.value }}
                        </option>
                      </select>
                      <p class="text-danger text-xs" >{{ errors['state'] }}</p>
                    </div>

                    <div class="col-sm ">
                      <label class="form-control-label">City</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="City"
                        v-model="form.city"
                      />
                      <p class="text-danger text-xs" >{{ errors['city'] }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">E-mail</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                        v-model="form.email"
                      />
                      <p class="text-danger text-xs">{{ errors['email'] ?errors.email:errMessage.email }}</p>
                    </div>

                  </div>
                  <div class="row pb-3">
                    <div class="col-sm">
                      <label class="form-control-label">Mobile Number</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Mobile Number"
                        v-model="form.mobileNumber"
                      />
                      <p class="text-danger text-xs">{{ errors['mobileNumber'] ?errors['mobileNumber']: errMessage.mobileNumber }}</p>
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="form.passWord"
                      />
                    </div>
                    <div class="col-sm">
                      <label class="form-control-label">PAN Number</label>
                      <input
                        class="form-control"
                        type="file"
                        ref="panFile"
                        @change="getImage"
                        accept="image/*"
                      />
                    </div>
                    <div class="col-sm-3">
                      <label class="form-control-label">GST</label>
                      <input
                        class="form-control"
                        type="file"
                        ref="gstFile"
                        @change="getImage"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div class="row pb-3">

                    <div class="col-sm-3">
                      <label class="form-control-label">Cancelled Cheque</label>
                      <input
                        class="form-control"
                        type="file"
                        ref="chequeFile"
                        @change="getImage"
                        accept="image/*"
                      />
                    </div>
                    <div class="col-sm-3">
                      <label class="form-control-label">Certificate of Incorporation</label>
                      <input
                        class="form-control"
                        type="file"
                        ref="certificateFile"
                        @change="getImage"
                        accept="image/*"
                      />
                    </div>
                    <div class="col-sm-3 ">
                      <label class="form-control-label">Payment Terms</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Payment Terms"
                        v-model="form.paymentTerms"
                      />
                    </div>
                    <div class="col-sm-3">
                      <label class="form-control-label">Shipping Terms</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Shipping Terms"
                        v-model="form.shippingTerms"
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
                      <p class="text-danger text-xs" >{{ errors['accountNumber'] }}</p>
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
                  <vue-recaptcha class="mt-4" sitekey="6Lc5XY0dAAAAAHH5yvVqDjP4aPVPXFRjeW0APlSt" @verify="mxVerify" @expired="mxExpire"></vue-recaptcha>
                  <div><p class="text-danger">{{ loginForm.pleaseTickRecaptchaMessage }}</p></div>
                  <div class="d-flex float-right">
                    <div class="text-center mt-4 px-2">
                      <router-link :to="{name:'Login'}">
                        <button class="btn btn-default"
                        >cancel</button>
                      </router-link>

                    </div>

                    <div class="text-center mt-4">
                      <button class="btn btn-default">Sign up</button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <router-link :to="{name:'Login'}" class="text-light">
                  <h5>Back to login</h5>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Page content -->

  </div>
</template>

<script>
import {authMethods} from "../../state/helpers";
import { VueRecaptcha } from 'vue-recaptcha';
import axios from "axios";
import SignupValidations from "../../services/SignupValidations";

export default {
  components: {VueRecaptcha},
  data() {
    return {
      recaptcha: null,
      status: "",
      errMobileNumber: "",
      errEmail: "",
      countries:[],
      states:[],
      errors:[],
      errMessage:"",
      system_Vendor_id: "",
      loginForm: {
        recaptchaVerified: false,
        pleaseTickRecaptchaMessage: ""
      },
      form: {
        firstName:"",
        middleName:"",
        lastName:"",
        mobileNumber:"",
        email: "",
        password: "",
        bankName: "",
        accountNumber: "",
        IFSCCode: "",
        paymentTerms: "",
        shippingTerms: "",
        panpicture: null,
        gstpicture: null,
        cancelledchequepic:null,
        coincorporation:null,
        vendorType: "",
        vendor_name: "",
        vendor_Address_code: "",
        address_Line1: "",
        address_Line2: "",
        postal_Code: "",
        country_id:"",
        state: "",
        city: "",
        vendor_Code: "",
        isAdmin:false,
        isActive:false,
        avatar:null,
      },

    }
  },
  mounted(){
    this.form.vendor_Code=Math.floor(Math.random() * 100000);
    this.getCountries();
  },
  methods: {
    ...authMethods,
    getImage() {
      this.form.file = this.$refs.file1.files.item(0);
      this.form.GST = this.$refs.gstFile.files.item(0);
      this.form.panNo = this.$refs.panFile.files.item(0);
      this.form.certiOfIncorporation = this.$refs.certificateFile.files.item(0);
      this.form.cancelledCheque = this.$refs.chequeFile.files.item(0);
      this.imageURL = URL.createObjectURL(this.form.file);
    },
    mxVerify() {
      this.loginForm.pleaseTickRecaptchaMessage = '';
      this.loginForm.recaptchaVerified = true;
    },
    mxExpire(){
      this.loginForm.recaptchaVerified = false;
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
    submit() {
      if (!this.loginForm.recaptchaVerified) {
        this.loginForm.pleaseTickRecaptchaMessage = 'Please verify that you are not a robot.';
        return true; // prevent form from submitting
      }
      else  {
        let validations =new SignupValidations(
          this.form.email,
          this.form.mobileNumber,
          this.form.postal_Code,
          this.form.accountNumber,
          this.form.vendor_name,
          this.form.firstName,
          this.form.lastName,
          this.form.address_Line1,
          this.form.address_Line2,
          this.form.country_id,
          this.form.state,
          this.form.city,
          this.form.vendorType,
        );
        this.errors= validations.checkValidations();
        console.log( this.errors);
        console.log( Object.keys(this.errors).length);
          if(Object.keys(this.errors).length){
            return this.errors;
          }
          else{
            console.log('createUser');
            axios.post(`api/auth/createUser`,{
              "firstName":this.form.firstName,
              "middleName":this.form.middleName,
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
                this.system_Vendor_id=response.data.data;
                this.store();
              })
              .catch(()=>{
                this.store();
              })
          }
      }
    },
    store(){
      const formData = new FormData();
      formData.append('firstName',this.form.firstName);
      formData.append('middleName',this.form.middleName);
      formData.append('lastName',this.form.lastName);
      formData.append('mobileNumber',this.form.mobileNumber);
      formData.append('email',this.form.email);
      formData.append('panpicture',this.form.panpicture);
      formData.append('gstpicture',this.form.gstpicture);
      formData.append('cancelledchequepic',this.form.cancelledchequepic);
      formData.append('coincorporation',this.form.coincorporation);
      formData.append('bankName',this.form.bankName);
      formData.append('accountNumber',this.form.accountNumber);
      formData.append('IFSCCode',this.form.IFSCCode);
      formData.append('paymentTerms',this.form.paymentTerms);
      formData.append('shippingTerms',this.form.shippingTerms);
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
      formData.append('passWord',this.form.passWord);
      formData.append('isAdmin',this.form.isAdmin);
      formData.append('isActive',this.form.isActive);
      formData.append('avatar',this.form.avatar);
      formData.append('system_Vendor_id',this.system_Vendor_id);
      axios.post(`api/auth/create`,formData,{
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response)=>{
          this.status = response.status;
          if(this.status===200)
          {
            this.notification('User created successfully','success');
            this.$router.push('/login');
          }
          else if(this.status===201)
          {
            this.form.vendor_Code=Math.floor(Math.random() * 100000);
            this.errMessage = response.data.message;
            console.log(this.errMessage);
          }
        })
        .catch(()=>{
          this.notification('Something went wrong','error');
        });
    },

  }
}

</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(
    87deg, #aa7c44 0, #fbb140 100%
  ) !important;
}
</style>
