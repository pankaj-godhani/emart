<template>

  <div class="flex flex-col">
    <div class="">

<!--      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill left-scroll" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle-fill right-scroll" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
      </svg>-->

      <div class="d-inline-block w-100 shadow overflow-auto rounded-lg border-bottom bg-white">

        <div class="table-responsive-lg ">

          <table class="table table-striped overflow-auto">
            <thead v-if="$slots.thead" class="border h-100">
              <slot name="thead"></slot>
            </thead>
            <tbody v-if="$slots.tbody">
              <slot name="tbody"></slot>
            </tbody>
            <tfoot v-if="$slots.tfoot">
              <slot name="tfoot"></slot>
            </tfoot>
          </table>
        </div>

        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  width: 630px;
  margin: auto;
  background: #eee;
  border: 1px solid black;
  padding: 20px 30px;
}

.scroll {
  font-size: 30px;
  color: black;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.scroll:hover {
  color: gray;
  cursor: pointer;
}
.left-scroll {
  position: relative;
  z-index: 10;
  left: -8px;
  top: 30px;
}
.right-scroll {
  position: relative;
  z-index: 10;
  left: 1040px;
  top: 30px;
}
</style>
