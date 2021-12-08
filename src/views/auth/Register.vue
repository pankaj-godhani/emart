<template>
  <div>
    <!-- Header -->
    <div class="header  py-7 py-lg-8 pt-lg-9">
      <!--      <div class="container">
              <div class="header-body text-center mb-7">
                <div class="row justify-content-center">
                  <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                    <h1 class="text-white">Welcome!</h1>

                  </div>
                </div>
              </div>
            </div>-->
      <!--      <div class="separator separator-bottom separator-skew zindex-100">
              <svg
                x="0"
                y="0"
                viewBox="0 0 2560 100"
                preserveAspectRatio="none"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  class="fill-default"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>-->
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
                  </div>
                  <div class="pb-2">
                    <label class="form-control-label">E-mail</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email"
                      v-model="form.email"
                    />
                  </div>

                  <div class="pb-2">
                    <label class="form-control-label">PassWord</label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      v-model="form.passWord"
                    />
                  </div>

                  <!--                  <base-checkbox
                                    >Remember me</base-checkbox
                                    >-->
                  <div>
                    <div class="g-recaptcha" :data-sitekey="your_site_key"></div>
<!--                    <vue-recaptcha
                      ref="invisibleRecaptcha"
                      @verify="onVerify"
                      @expired="onExpired"
                      size="invisible"
                      :sitekey="sitekey"
                    >
                    </vue-recaptcha>-->
                  </div>

                  <div class="text-center mt-4">
                    <button class="btn btn-default"
                    >Sign up</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <router-link to="/dashboard" class="text-light"
                ><small>Forgot password?</small></router-link
                >
              </div>
              <div class="col-6 text-right">
                <router-link to="/register" class="text-light"
                ><small>Create new account</small></router-link
                >
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
//import { VueRecaptcha } from 'vue-recaptcha';

export default {
  data() {
    return {
     // sitekey:'fgfdgdg',
      form: {

        firstName:'',
        lastName:'',
        mobileNumber:'',
        email: '',
        passWord: '',
        isAdmin:false,
      }
    }
  },
  components:{ },
  methods:{
    ...authMethods,
    onVerify: function (response) {
      console.log('Verify: ' + response)
    },
    onExpired: function () {
      console.log('Expired')
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset() // Direct call reset method
    },
    submit(){
      this.$refs.invisibleRecaptcha.execute();
      console.log(this.form);
      this.register(this.form)
        .then(()=>{
          this.$router.push(this.$route.query.redirectFrom || {name: 'Login'})
        });
    }
  }

}

</script>
