<script>
export default {
  props: {
    link: {
      type: String,
      required: true
    },
    target: {
      type: [String, Boolean]
    },
    hoverBgColor: {
      type: String
    },
    hoverTextColor: {
      type: String
    },
    animationClass: {
      type: String
    },
    expand: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      controlOpen: false,
      elLink: '',
      elTarget: '',
      bgHoverColor: '',
      textHoverColor: '',
      animationList: [
        { name: 'none', value: '' },
        { name: 'tada', value: 'ptah-a-tada' },
        { name: 'fade', value: 'ptah-a-fade' },
        { name: 'shake', value: 'ptah-a-shake' },
        { name: 'bounce', value: 'ptah-a-bounce' }
      ],
      animation: {}
    }
  },

  created () {
    this.elLink = this.link
    this.elTarget = !!this.target
    this.bgHoverColor = this.hoverBgColor
    this.textHoverColor = this.hoverTextColor
    this.animation = this.animationClass
    this.controlOpen = this.expand
  },

  watch: {
    elTarget (oldVal, newVal) {
      this.$emit('setOption', ['target', this.elTarget ? '_blank' : '_self'])
    },

    expand () {
      this.controlOpen = this.expand
    }
  },

  methods: {
    setUrl () {
      this.$emit('setOption', ['href', this.elLink])
    },

    changeBgColor () {
      this.$emit('setPseudo', { 'background-color': this.bgHoverColor.hex + '!important' })
    },

    changeTextColor () {
      this.$emit('setPseudo', { 'color': this.textHoverColor.hex + '!important' })
    },

    changeAinmation () {
      this.$emit('setClass', this.animation.value)
    },

    onClickTitle () {
      this.$emit('open', ['Link', !this.controlOpen])
    }
  }
}
</script>

<template>
  <div class="b-link-controls">
    <div class="b-link-controls__header" @click="onClickTitle">
      <span>Link</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen"  :hasOverflow="controlOpen">
      <div class="b-link-controls__control">
        <base-text-field v-model="elLink" label="URL" @input="setUrl" placeholder="Type link here"></base-text-field>
      </div>
      <div class="b-link-controls__control">
        <input type="checkbox" id="target" v-model="elTarget"> <label for="target">open in new window</label>
      </div>
      <div class="b-link-controls__control">
        <base-color-picker label="Background hover color" v-model="bgHoverColor" @change="changeBgColor"></base-color-picker>
      </div>
      <div class="b-link-controls__control">
        <base-color-picker label="Text hover color" v-model="textHoverColor" @change="changeTextColor"></base-color-picker>
      </div>
      <div class="b-link-controls__control">
        <base-select label="Animation" :options="animationList" v-model="animation" @input="changeAinmation"></base-select>
      </div>
    </base-dropdown>
  </div>
</template>

<style lang="sass" scoped>
  .b-link-controls
    &__header
      font-size: 1.6rem
      height: 3.2rem
      color: #272727
      display: flex
      align-items: center
      cursor: pointer
      i
        margin-left: 5px
        margin-bottom: -5px
        transform: rotate(180deg)
        &.dropped
          transform: rotate(0deg)
    &__control
      margin-top: 2.2rem
      input[type="checkbox"]
        position: relative
        bottom: -1px
      label
        color: #272727
        font-size: 1.6rem
</style>
