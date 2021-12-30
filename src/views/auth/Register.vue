<template>
  <div>
    <!-- Header -->
    <div class="header  py-7 py-lg-8 pt-lg-9">

      <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
              <div class="card-header bg-gradient-success bg-transparent pb-4">
                <div class="text-muted text-left mt-2">
                  <h1 class="text-black">Welcome to Register!</h1>
                  <h5 class="text-black">Sign up to continue to login</h5>
                </div>
                <div class="btn-wrapper text-center">

                </div>
              </div>
              <div class="card-body px-lg-5 py-lg-5">

                <form @submit.prevent="submit" >
                  <div class="pb-2">
                    <label class="form-control-label">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First Name"
                      v-model="form.firstName"
                    />
                  </div>
                  <div class="pb-2">
                    <label class="form-control-label">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last Name"
                      v-model="form.lastName"
                    />
                  </div>
                  <div class="pb-2">
                    <label class="form-control-label">Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mobile Number"
                      v-model="form.mobileNumber"
                    />
                    <p class="text-danger text-xs">{{ errMobileNumber }}</p>
                  </div>
                  <div class="pb-2">
                    <label class="form-control-label">E-mail</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email"
                      v-model="form.email"
                    />
                    <p class="text-danger text-xs">{{ errEmail }}</p>
                  </div>

                  <div class="pb-2">
                    <label class="form-control-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      v-model="form.passWord"
                    />
                  </div>

                  <div>

                  </div>
                  <vue-recaptcha sitekey="6Lc5XY0dAAAAAHH5yvVqDjP4aPVPXFRjeW0APlSt" @verify="mxVerify"></vue-recaptcha>
                  <div><p class="text-danger">{{ loginForm.pleaseTickRecaptchaMessage }}</p></div>
                  <div class="d-flex float-right">
                    <div class="text-center mt-4 px-2">
                      <router-link :to="{name:'Login'}">
                        <button class="btn btn-default"
                        >cancel</button>
                      </router-link>

                    </div>

                    <div class="text-center mt-4">
                      <button class="btn btn-default"
                      >Sign up</button>
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

export default {
  data() {
    return {
      recaptcha: null,
      status: "",
      errMobileNumber: "",
      errEmail: "",
      loginForm: {
        recaptchaVerified: false,
        pleaseTickRecaptchaMessage: ''
      },
      form: {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        passWord: '',
        isAdmin: false,
        isActive: false,
      },

    }
  },
  components: {VueRecaptcha},
  methods: {
    ...authMethods,
    mxVerify() {
      this.loginForm.pleaseTickRecaptchaMessage = '';
      this.loginForm.recaptchaVerified = true;

    },
    submit() {
      console.log(this.form);
      if (!this.loginForm.recaptchaVerified) {
        this.loginForm.pleaseTickRecaptchaMessage = 'Please verify that you are not a robot.';
        return true; // prevent form from submitting
      } else  {
        if(this.form.mobileNumber==="" ||this.form.email===""){
          this.errEmail="email is required.";
          this.errMobileNumber="mobile number is required."
        }
        else{
          axios.post(`api/auth/create`,this.form)
            .then((response)=>{
              this.status = response.status;
              console.log(response);
              if(this.status===201){
                this.errMobileNumber = response.data.message.mobileNumber;
                this.errEmail = response.data.message.email;
              }
              else{
                this.$router.push('/login');
              }
              //this.$router.push('/login');
            })
            .catch(error=>{
              console.log(error,'error from Register component');
            });
        }

      }
    }

  }
}

</script>
