<template>

  <div>

      <div class="overflow-auto">
        <div class="table-responsive-sm">
          <table class="table table-striped overflow-auto">
            <thead class="border h-100">
              <slot name="thead"></slot>
            </thead>
            <tbody>
              <slot name="tbody"></slot>
            </tbody>
            <tfoot>
              <slot name="tfoot"></slot>
            </tfoot>
          </table>
        </div>

        <slot></slot>
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
