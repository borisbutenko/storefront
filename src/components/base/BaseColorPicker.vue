<script>
import { Sketch } from 'vue-color'
export default {
  name: 'BaseColorPicker',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    Sketch
  },
  props: {
    value: {
      default: 'rgba(0,0,0,1)'
    },
    showTextValue: {
      type: Boolean,
      default: true
    },
    label: {
      type: String
    }
  },
  watch: {
    value (value) {
      this.pickerValue = this.getPreparedValue(this.value)
    }
  },
  data () {
    return {
      expanded: false,
      pickerValue: this.getPreparedValue(this.value)
    }
  },
  methods: {
    getPreparedValue (value) {
      if (typeof value === 'object' && !!value.rgba) {
        const color = Object.values(value.rgba).toString()
        return `rgba(${color})`
      }
      return value
    },
    changeColor (color) {
      this.$emit('change', color)
    }
  }
}
</script>

<template>
  <div class="b-picker" :class="{ 'full': showTextValue }">
    <base-label v-if="label">
      {{label}}
    </base-label>
    <div class="b-picker__value-string" @click="expanded = !expanded">
      <div class="b-picker__circle" :style="{ 'background-color': pickerValue.rgba || pickerValue }"></div>
      <div class="b-picker__text">
        {{ pickerValue.rgba || pickerValue || 'Choose color' }}
      </div>
      <div class="b-picker__arrow" :class="{ 'b-picker__arrow--turn': expanded}">
        <icon-base name="arrowDropDown" width="6" color="#888888" />
      </div>
    </div>

    <div class="b-picker__palette" v-show="expanded">
      <Sketch :value="pickerValue" @input="changeColor"></Sketch>
    </div>
  </div>
</template>

<style lang="sass" scoped="">
  .b-picker
    font-size: 1.6rem
    padding: 0.5rem 0
    position: relative
    width: 100%
    &__value-string
      display: flex
      align-items: center
      width: 100%
      justify-content: space-between
      cursor: pointer
    &__circle
      width: 1.8rem
      height: 1.8rem
      border-radius: 50%
      border: 2px solid #FFFFFF
      box-sizing: border-box
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2)
      flex-shrink: 0
    &__text
      display: none
      color: #272727
      margin-left: .8rem
      flex-grow: 2
    &.full
      border-bottom: 1px solid rgba(136, 136, 136, .25)
      .b-picker__text
        display: block
    &__palette
      position: absolute
      bottom: -302px
      left: -2.2rem
      z-index: 10
    &__arrow
      transition: .3s ease-out
      &--turn
        transform: rotate(180deg)
</style>
