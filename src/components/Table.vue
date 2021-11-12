<template>

  <div class="flex flex-col">
    <div class="">
      <div class="d-inline-block w-100 shadow overflow-auto rounded-lg border-bottom  bg-white">
        <div class="table-responsive-lg">
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


