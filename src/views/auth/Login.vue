<template>
  <div>
    <!-- Header -->
    <div class="header  py-7 py-lg-8 pt-lg-9">
      <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7">

            <div class="card bg-secondary border-0 mb-0">
              <div class="bg-gradient bg-transparent text-center" style="border-radius:10px 10px 0px 0px">
                <img src="../../../public/img/e-metro.png" class="w-50 h-50 mt-2 px-2"  alt="Sidebar logo" />
              </div>
              <div class="card-header bg-gradient bg-transparent pb-2">
                <div class="text-muted text-left ">
                  <h1 style="color: #044e7f;">Welcome!</h1>
                  <h5 style="color: #044e7f;">Sign in to continue to admin</h5>
                </div>
              </div>
              <div class="card-body px-lg-5 py-lg-5">
                <p class="text-danger" style="font-weight: normal">{{errorMsg}}</p>
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

                  <div>
                    <label class="form-control-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      v-model="form.passWord"
                    />
                  </div>

                  <div class="text-center mt-4">
                    <button class="btn btn-default"

                    >Sign in</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <router-link :to="{name:'ForgetPassword'}" class="text-light">
                  <h5>Forgot password?</h5>
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
import { authMethods } from "../../state/helpers";

export default {
  data() {
    return {
      form: {
        email: "",
        passWord: "",
      },
      errorMsg: "",
    }
  },

  methods:{
    ...authMethods,

    submit(){
      this.logIn(this.form)
      .then(()=>{
         // this.$router.push( this.$route.query.redirectFrom || {name: 'Dashboard'} );
          this.$router.go({path:this.$route.query.redirectFrom} || {path: '/'});
      })
      .catch(()=>{
        this.errorMsg = "These credentials do not match our records.";
      })
    }
  }

}

</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(
    87deg, #aa7c44 0, #fbb140 100%) !important;
}
</style>
