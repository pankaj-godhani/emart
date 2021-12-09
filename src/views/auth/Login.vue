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
          <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
              <div class="card-header bg-gradient-success bg-transparent pb-4">
                <div class="text-muted text-left mt-2">
                  <h1 class="text-black">Welcome!</h1>
                  <h5 class="text-black">Sign in to continue to admin</h5>
                </div>
                <div class="btn-wrapper text-center">

                </div>
              </div>
              <div class="card-body px-lg-5 py-lg-5">

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

<!--                  <base-checkbox
                  >Remember me</base-checkbox
                  >-->
                  <div class="text-center mt-4">
                    <button class="btn btn-default"
                    >Sign in</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <router-link to="/dashboard" class="text-light">
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
import {authMethods} from "../../state/helpers";

export default {
  data() {
    return {
      form: {
        email: '',
        passWord: '',
      }
    }
  },

  methods:{
    ...authMethods,

    submit(){
      console.log(this.form);
      this.logIn(this.form)
      .then(()=>{
        //this.$router.push( '/' );
        this.$router.go({
          path: "/",
          //force: true
        });
      });
    }
  }

}

</script>
