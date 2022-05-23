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
                </div>
                <div class="btn-wrapper text-center">

                </div>
              </div>
              <div class="card-body px-lg-5 py-lg-5">
                <p class="text-success" style="font-weight: normal">{{ success }}</p>
                <form @submit.prevent="submit" >
                  <div class="pb-2">
                    <label class="form-control-label">E-mail</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email"
                      v-model="form.email"
                    />
                  </div>

                  <div class="text-center mt-4">
                    <button class="btn btn-default"
                    >Send reset password link</button>
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
  name: 'forgot-password',

  data() {
    return {
      form: {
        email: '',
      },
      success: null,
    }
  },

  methods: {
    submit() {
      axios.post(`api/auth/forgetPassword`, this.form)
        .then(response => {
          this.success=response.data.message;
          this.notification("Reset link sent successfully","success");
          this.form={}
        })
      .catch(()=>{
        this.notification("User not fount or something went wrong.","error");
      });
    },
  }
}
</script>
