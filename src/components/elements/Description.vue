<template>
    <div class="b-text is-editable">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Description'
}
</script>

<style lang="sass" scoped>
.b-text
  color: #000
  font-family: Helvetica, Arial, sans-serif
  position: relative
  text-align: center
  font-size: 1.4rem
  line-height: 1.4
  display: block
  max-width: 100rem
  margin: 1.6rem
  &::selection, & ::selection
    color: #ff0
    background: #000
</style>
