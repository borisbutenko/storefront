<template>
  <div class="b-base-label"
    :class="{'b-base-label_error': hasError, 'b-base-label_focus': hasFocus}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    hasError: {
      type: Boolean,
      default: false
    },

    hasFocus: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
.b-base-label
  font-size: 1.4rem
  line-height: 1.7rem
  color: #747474
  margin-bottom: 0.8rem
  transition: color 0.1s ease
  display: flex
  align-items: center

  &_focus
    color: rgba(#747474, 0.5)

  &_error
    color: #FF3737

</style>
