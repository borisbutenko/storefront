<template>
  <section class="b-gallery-three"
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    >
      <div class="b-gallery-three__wrap">
        <div class="b-gallery-three-block flex flex_center">
          <div class="b-gallery-three-block__item flex flex_center flex_columns"
               v-for="(item, index) in $sectionData.images" :key="index"
               v-styler:galleryItem="{el: $sectionData.images[index].preview, path: `$sectionData.images[${index}].preview`, type: 'galleryItem'}"
               :data-index="index"
               :style="$sectionData.images[index].preview.styles"
            >
            <div class="b-gallery-three-block__item-wrap">
              <a gallery-three-link="" :gallery-three-url="$sectionData.images[index].button.href" class="b-gallery-three-block__item-link"
                 v-styler:for="{ el: $sectionData.images[index].button, path:`$sectionData.images[${index}].button`, type: 'button'}"
                 :style="$sectionData.images[index].button.styles"
                 @dblclick="onClick(item, index)"
              >
              </a>
            </div>
            <div>
              <span class="b-gallery-three-block__item-title"
                v-styler:for="{ el: $sectionData.images[index].label, path:`$sectionData.images[${index}].label`, type: 'text' }"
                v-html="$sectionData.images[index].label.text"
                :style="$sectionData.images[index].label.styles"
                >
              </span>
            </div>
          </div>
        </div>
      </div>
      <div gallery-three-popup="" class="l-popup l-popup_flex" v-show="true === $sectionData.isShowPopup">
          <div gallery-three-popup-padd="" :style="$sectionData.popupStyles" class="l-popup__padd flex flex_columns">
              <div gallery-three-popup-close="" class="l-popup__close" v-bind:class="{'is-editable': $builder.isEditing}" @click.prevent="closePopup"></div>
              <div class="l-popup__logos">
                  <div class="b-logo" v-for="(logo, index) in $sectionData.logos"
                    v-bind:class="{'is-editable': $builder.isEditing}" :key="index"
                    v-styler:for="{ el: $sectionData.logos[index].element, path: `$sectionData.logos[${index}].element`, type: 'image' }"
                    :style="$sectionData.logos[index].element.styles"
                    >
                  </div>
              </div>
              <div gallery-three-popup-content="" class="l-popup__content flex flex_center" v-html="$sectionData.content"></div>
              <div class="b-gallery-three-btn-container">
                <span class="b-gallery-three-btn-container__button"
                      v-styler="$sectionData.button"
                      v-text="$sectionData.button.text"
                      :style="$sectionData.button.styles"
                  >
                  Начать игру
                </span>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'

const GALLERY_ITEM = {
  preview: types.Image,
  label: types.Text,
  button: types.Button
}

export default {
  name: 'Gallery3',
  cover: '/img/covers/gallery3.png',
  group: 'galleries',
  $schema: {
    mainStyle: types.StyleObject,
    button: types.Button,
    images: [
      _.merge({}, GALLERY_ITEM),
      _.merge({}, GALLERY_ITEM),
      _.merge({}, GALLERY_ITEM)
    ],
    defObj: {
      images: _.merge({}, GALLERY_ITEM)
    },
    logos: [
      {
        element: types.Logo
      }
    ],
    index: 0,
    isShowPopup: false,
    popupStyles: { width: 'auto', margin: '0' },
    url: 'https://gn652.cdn.gamenet.ru/TY0Xv2riHu/772iV/o_cDot3.png',
    content: ''
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    onClick (el, index) {
      let m = false
      let href = el.button.href
      let url = href !== '' ? href : this.$sectionData.url
      let c = ''
      this.$sectionData.content = c
      m = this.matchYoutubeUrl(url)
      if (m) {
        c = '<iframe id="content" width="100%" height="100%" src="https://www.youtube.com/embed/' + m + '?rel=0&amp;wmode=transparent&amp;autoplay=1&amp;enablejsapi=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
      } else {
        c = '<img id="content" width="100%"  height="100%" src="' + url + '"></img>'
      }
      this.$sectionData.content = c
      this.openPopup(this.$sectionData.content)
    },
    openPopup () {
      setTimeout(() => {
        this.setHeight()
      }, 100)
    },
    setHeight () {
      this.$sectionData.isShowPopup = true

      let el = document.getElementById('content')
      let ab = document.getElementById('artboard')
      let actualWidth = null
      let calcHeight = null
      let calcMargin = null

      actualWidth = undefined !== ab ? ab.clientWidth : el.clientWidth
      calcHeight = actualWidth * 0.5625
      calcMargin = (document.body.clientWidth - actualWidth) / 2
      el.style.height = calcHeight + 'px'

      if (undefined !== this.$sectionData.popupStyles) {
        this.$sectionData.popupStyles['width'] = actualWidth + 'px'
        this.$sectionData.popupStyles['margin'] = '0 ' + calcMargin + 'px'
      }
    },
    closePopup () {
      this.$sectionData.isShowPopup = false
      this.$sectionData.content = ''
    },
    matchYoutubeUrl (url) {
      let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      let matches = url.match(p)
      if (matches) {
        return matches[1]
      }
      return false
    }
  }
}
</script>

<style lang="sass" scoped="scoped">
@import '../../../assets/sass/_flex.sass'

.b-gallery-three
  display: flex
  align-items: center
  padding: 1rem
  &.is-editable
   // resize: vertical
   // overflow: hidden
  @media only screen and (max-width: 768px)
    &
      height: auto !important
  &__wrap
    margin: 0 auto
    max-width: 160rem
    width: 80%
  &__subtitle
    margin-bottom: 0
    font-weight: 400

  &-block
    margin-bottom: 1rem
    margin-right: -2rem
    flex-wrap: wrap
    .is-mobile &
      margin-right: 0
    @media only screen and (max-width: 460px)
      &
        margin-right: 0
    &__item
      width: 20rem
      min-width: 10rem
      margin: 1rem
      &.is-editable
       // resize: both
       // overflow: hidden
       &:active
         border: dotted #333 1px
      &-wrap
        width: 100%
        min-width: 5rem
        min-height: 17rem
        padding: 1rem
        cursor: pointer
        position: relative
        display: flex
        align-items: center
        justify-content: center
        &.is-editable
          // resize: both
          // overflow: hidden
      .is-tablet &
        width: 50%
      .is-mobile &
        width: 100%
        padding: 0 0 2rem 0
      @media only screen and (max-width: 768px)
        &
          width: 50%
      @media only screen and (max-width: 460px)
        &
          width: 100%
          padding: 0 0 2rem 0
      &-wrap:hover &-content
        background: linear-gradient(135deg, rgba(204, 204, 204, 0.1) 0%, rgba(161, 161, 161, 0.1) 100%)
      &-title
        font-size: 1.6rem
        line-height: 1.4
        color: #000
        padding: 0 2rem
        display: block
        &::selection, & ::selection
          color: #ff0
          background: #000
      &-link
        display: block
        width: 10rem
        height: 10rem
        margin: 0
        z-index: 100
        background-image: url(https://gn779.cdn.gamenet.ru/TY0Xv2riHu/75YKm/o_1lNeRV.png)
        background-size: cover
        transition: all 200ms
        &:hover
          transform: scale(1.2) rotate(-120deg)
  &-btn-container
    text-align: center
    position: relative
    z-index: 100
    margin: 2rem 0
    &__button
      position: relative
      padding: 2rem 4rem
      font-size: 2rem
      line-height: 2rem
      background-color: #fff
      color: #000
      margin: 0 auto
      border: 0
      margin-bottom: 0
      display: flex
      width: 30rem
      min-width: 10rem
      align-items: center
      justify-content: center
      -webkit-transition: 100ms
      transition: 100ms
      @media only screen and (max-width: 768px)
        &
          width: 20rem
      &:hover
        background-color: #fcff00
      &.is-editable
        // resize: both
        // overflow: hidden

.l-popup__logos
  margin: 2rem 0
  width: 100%
  text-align: center
.l-popup
  display: none
  position: fixed
  justify-content: center
  align-items: center
  top: 0
  right: 0
  left: 0
  bottom: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.8)
  z-index: 99999
  cursor: pointer
  &_flex
    display: -webkit-box
    display: -ms-flexbox
    display: flex
  &__padd
    position: relative
    height: 100%
    justify-content: center
    align-items: center
.l-popup__content
  border: 5px solid #fcff00
  background-color: #000
  max-width: 90%
  max-height: 90%
  overflow: hidden
  cursor: auto
  transition: all 200ms
.l-popup__content iframe
  display: block
  width: 100%
  height: 100%
.l-popup__content_video
  width: 70%
.l-popup__close
  position: absolute
  top: 1rem
  right: 1rem
  width: 5rem
  height: 5rem
  &.is-editable
    top: 10rem
.l-popup__close:before, .l-popup__close:after
  content: ''
  position: absolute
  top: 23px
  width: 50px
  height: 3px
  background-color: #fcff00
.l-popup__close:before
  -webkit-transform: rotate(-45deg)
  transform: rotate(-45deg)
.l-popup__close:after
  -webkit-transform: rotate(45deg)
  transform: rotate(45deg)

.b-logo
  display: inline-block
  margin: 1rem auto
  text-align: center
  width: 20rem
  height: 20rem
  .is-editable &
    resize: both
    overflow: hidden
  .is-mobile &
    margin: 1rem auto
    height: auto
  @media only screen and (max-width: 540px)
    &
      margin: 1rem auto
      height: auto

</style>
