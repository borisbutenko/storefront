<template>
    <div class="uploader">
        <img v-bind:src="src" />
        <form>
            <input
                class="uploader-input"
                type="file"
                ref="uploader"
                @change="uploadImg"
                v-if="$builder.isEditing && mode === 'input'" />
        </form>
    </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'

export default {
  name: 'Uploader',
  inject: ['$builder', '$section'],
  props: {
    path: {
      type: String,
      required: true
    },
    mode: {
      default: 'input',
      type: String
    }
  },
  data: () => ({
    src: '',
    section: {}
  }),
  created () {
    this.section = this.$section.get(this.path)
    this.src = this.section.url
  },
  methods: {
    uploadImg: function (event) {
      let file = event.target.files || event.dataTransfer.files
      let self = this

      if (!file) {
        return
      }

      let request = new FormData()
      let $form = $(event.target).parent()

      request.append('file[]', file[0])
      request.append('method', 'storefront.upload')
      request.append('format', 'json')

      $form[0].reset()

      axios.post('http://images.stg.gamenet.ru/restapi', request)
        .then(function (response) {
          if (!response.hasOwnProperty('data') || !response['data'].hasOwnProperty('response') ||
                    !response['data']['response'].hasOwnProperty('data') ||
                    !Array.isArray(response['data']['response']['data'])) {
            return
          }

          const data = response['data']['response']['data'][0]

          self.src = self.section.url = data.src

          self.$section.set(self.path, self.section)
        }).catch(function (e) {
          console.warn(e)
        })
    }
  }
}
</script>

<style lang="sass">
.uploader
  position: relative
  cursor: pointer
  outline: none
  &-input
    position: absolute
    top: 0
    right: 1rem
    bottom: 1rem
    left: 0
    width: 100%
    opacity: 0
    z-index: 100
    cursor: pointer

  > img
    width: 100%
    display: inline-block
    height: 100%
    min-width: 1rem
    min-height: 1rem
    .is-mobile &
       height: auto
    @media only screen and (max-width: 540px)
      &
        height: auto
  &:hover
    box-shadow: 0 0 0 2px $color-green
</style>
