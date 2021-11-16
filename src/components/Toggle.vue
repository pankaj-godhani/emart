<template>
  <div class="custom-control custom-switch">
    <input
      class="custom-control-input"
      type="checkbox"
      v-bind="$attrs"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
    />
    <label class="custom-control-label" :for="id">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  props: ["id", "value"],
  // inheritAttrs: false,
};
</script>
