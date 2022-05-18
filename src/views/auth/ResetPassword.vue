<template>
  <div>
    <!-- Header -->
    <div class="header  py-7 py-lg-8 pt-lg-9">
      <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
              <div class="card-header bg-gradient-success bg-transparent pb-4">
                <div class="text-muted text-left mt-2">
                  <h3 class="text-black">Finally, choose a new password.</h3>
                </div>
                <div class="btn-wrapper text-center">

                </div>
              </div>
              <div class="card-body px-lg-5 py-lg-5">
                <p class="text-danger" style="font-weight: normal">{{confirmMag}}</p>
                <form @submit.prevent="submit" >
                  <div class="pb-2">
                    <label class="form-control-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      v-model="passWord"
                    />
                  </div>

                  <div>
                    <label class="form-control-label">Confirm Password</label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      v-model="confirmPass"
                    />
                  </div>
                  <div class="text-center mt-4">
                    <button class="btn btn-default"
                    >Reset Password</button>
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
              <div class="col-6 text-right ">
                <router-link :to="{name:'Register'}" class="text-light">
                  <h5>Create new account</h5>
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
import axios from "axios";

export default {
  name: 'reset-password',

  data() {
    return {
      id: this.$route.params.id,
      passWord: "",
      confirmPass: "",
      confirmMag: "",

    }
  },

  methods: {

    submit() {
      if(this.passWord===this.confirmPass){
        axios.put(`api/auth/edit/${this.id}`, {"passWord":this.passWord})
          .then(() => {
            this.$router.push({ name :"Login"});
            this.notification("Password changed successfully", "success");
          });
      }
      else{
        this.confirmMag='Password does not match.'
      }

    },
  }
}
</script>
