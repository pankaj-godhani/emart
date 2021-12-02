<template>
  <div class=" rounded mx-auto modal-container" style="z-index: 2147483647" v-show="show">
      <div class="modal-header border-bottom">
       <span>
            <h5 class="modal-title">
              <slot name="title"></slot>
            </h5>
          </span>
        <button type="button" class="close" @click="show=!show">
          <span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body border-bottom">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
  </div>


</template>

<script>
export default {
  name: "exampleModal",
  data(){
    return{
      show:true
    }
  }
}
</script>

<style scoped>

.fade-enter-active {
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}

.fade-enter {
  opacity: 0;
}
.modal-container{
  top: 50%;
  left: 50%;
  width: 800px;
  box-shadow: 0 0 10px black;
  transform: translate(-60%, -15%);
  background-color: white;
  position: absolute;
  z-index: 9999;

}
.modal-body {
  width: 800px;
  height: 400px;
  overflow: auto;
}

</style>
