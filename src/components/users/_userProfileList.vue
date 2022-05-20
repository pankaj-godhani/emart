<template>
  <card
    class="no-border-card"
    body-classes="px-0 pb-1 py-3"
    footer-classes="pb-2"
  >
    <div>
      <div class="text-center mb-4">
        <div v-if="user.userImg">
          <img :src="url+user.userImg" class="rounded" style="height: 125px; width: 125px" :alt="user.firstName">
        </div>
        <div v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="125" height="125" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
        </div>
      </div>
      <div class="row px-6">
        <div class="col">
          <h4 class="text-dark">First Name</h4>
          <label class="form-control-label">{{ user.firstName }}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">Middle Name</h4>
          <label class="form-control-label">{{ user.middleName }}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">Last Name</h4>
          <label class="form-control-label">{{ user.lastName }}</label>
        </div>

      </div>
      <div class="row px-6 mt-4">
        <div class="col">
          <h4 class="text-dark">Address</h4>
          <label class="form-control-label">{{ user.address_Line1 }} {{user.address_Line2}}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">Email</h4>
          <label class="form-control-label">{{ user.email }}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">Mobile Number</h4>
          <label class="form-control-label">{{ user.mobileNumber }}</label>
        </div>

      </div>
      <div class="row px-6 mt-4">
        <div class="col">
          <h4 class="text-dark">Vendor Type</h4>
          <label class="form-control-label">{{ user.vendorType }}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">Role</h4>
          <label class="form-control-label">{{ user.isAdmin?'Admin':'User' }}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">Status</h4>
          <label :class="user.isActive?'px-3 form-control-label p-1 rounded bg-success text-white':'px-3 form-control-label p-1 rounded bg-danger text-white'">
            {{ user.isActive?'Active':'InActive' }}
          </label>
        </div>
      </div>
      <div class="row px-6 mt-4">
        <div class="col">
          <h4 class="text-dark">PAN Number Document</h4>
          <label :class="user.panDocument?'form-control-label':'form-control-label text-xl'">
            <a v-if="user.panDocument" :href="url+user.panDocument" download>PAN Number File</a>
            <span v-else class="text-sm">PAN no not available</span>
          </label>
        </div>
        <div class="col">
          <h4 class="text-dark">Payment Terms</h4>
          <label :class="user.paymentTerms?'form-control-label':'form-control-label text-xl'">{{ user.paymentTerms?user.paymentTerms:'-' }}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">Shipping Terms</h4>
          <label :class="user.shippingTerms?'form-control-label':'form-control-label text-xl'">{{ user.shippingTerms?user.shippingTerms:'-' }}</label>
        </div>
      </div>
      <div class="row px-6 mt-4">
        <div class="col">
          <h4 class="text-dark">GST Document</h4>
          <!--          <label :class="user.GST?'form-control-label':'form-control-label text-xl'">{{ user.GST?user.GST:'-' }}</label>-->
          <label :class="user.gstDocument?'form-control-label':'form-control-label text-xl'">
            <a v-if="user.gstDocument" :href="url+user.gstDocument" download>GST File</a>
            <span v-else class="text-sm">GST certificate not available</span>
          </label>
        </div>
        <div class="col">
          <h4 class="text-dark">Cancelled Cheque</h4>
          <label :class="user.cancelledCheque?'form-control-label':'form-control-label text-xl'">
            <a v-if="user.cancelledCheque" :href="url+user.cancelledCheque" download>Cancelled Cheque File</a>
            <span v-else class="text-sm">Cancelled cheque not available</span>
          </label>
        </div>
        <div class="col">
          <h4 class="text-dark">Certificate of incorporation</h4>
          <label :class="user.certiOfIncorporation?'form-control-label':'form-control-label text-xl'">
            <a v-if="user.certiOfIncorporation" :href="url+user.certiOfIncorporation" download>Certificate of Incorporation File</a>
            <span v-else class="text-sm">Certificate not available</span>
          </label>
        </div>
      </div>
      <div class="row px-6 mt-4">
        <div class="col-md-4">
          <h4 class="text-dark">Pan Number</h4>
          <label class="form-control-label">{{ user.panNo?user.panNo:'-' }}</label>
        </div>
        <div class="col-md-4">
          <h4 class="text-dark">GST Number</h4>
          <label class="form-control-label">{{ user.GST?user.GST:'-' }}</label>
        </div>
      </div>
      <h2 class="px-6 mt-4">Bank Details :</h2>
      <div class="row px-6 mt-4">
        <div class="col">
          <h4 class="text-dark">Bank Name</h4>
          <label :class="user.bankName?'form-control-label':'form-control-label text-xl'">{{ user.bankName?user.bankName:'-' }}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">Account Number</h4>
          <label class="form-control-label">{{ user.accountNumber }}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">IFSC Code</h4>
          <label :class="user.IFSCCode?'form-control-label':'form-control-label text-xl'">{{ user.IFSCCode?user.IFSCCode:'-' }}</label>
        </div>
      </div>
    </div>
  </card>
</template>

<script>

import axios from "axios";

export default {
  data(){
    return{
      id:this.$route.params.id,
      user:{},
      url:"https://oyster-app-s2gc3.ondigitalocean.app",
    }
  },
  mounted() {
    this.getUser();
  },
  methods:{
    getUser(){
      axios.get(`api/auth/user/${this.id}`)
        .then(response=>{
          this.user=response.data[0];
        });
    },
  },

}
</script>
