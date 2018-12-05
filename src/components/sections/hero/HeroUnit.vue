<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn675.cdn.stg.gamenet.ru/0/7K0Jf/o_15rRBx.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '110px',
        'height': '64px'
      }
    }
  },
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '4.8rem',
        'color': '#ffffff'
      }
    }
  },
  {
    element: {
      text: 'An sincerity so extremity he additions. Her yet there truth merit.' +
      '<div>Mrs all projecting favourable now unpleasing. Son law garden chatty temper</div>' +
      '<div>Oh children provided to mr elegance marriage strongly.</div>',
      styles: {
        'font-family': 'Lato',
        'font-size': '2rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    }
  },
  {},
  {
    element: {
      text: 'Call to Action',
      styles: {
        'background-color': '#FF6D64',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '352px',
        'height': '64px',
        'border-radius': '2px'
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn987.cdn.stg.gamenet.ru/0/7K0NZ/o_1zKuK8.png)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    }
  },
  components: _.merge({}, C_CUSTOM),
  edited: true
}

export default {
  name: 'HeroUnit',
  cover: '/img/covers/hero-unit.png',
  group: 'Hero',
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: [
      {
        name: 'Logo',
        element: types.Logo,
        type: 'image',
        class: 'b-logo'
      },
      {
        name: 'Title',
        element: types.Title,
        type: 'text',
        class: 'b-title'
      },
      {
        name: 'Description',
        element: types.Text,
        type: 'text',
        class: 'b-text'
      },
      {
        name: 'Delimiter',
        element: types.Delimiter,
        type: 'delimiter',
        class: 'b-delimiter'
      },
      {
        name: 'Button',
        element: types.Button,
        type: 'button',
        class: 'b-button-test'
      }
    ]
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    onAddElement (element) {
      element.element.removable = true
      this.$section.data.components.push(element)
    }
  },
  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
  }
}
</script>

<template>
  <section
    class="b-hero"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <sandbox
      class="b-sandbox"
      ref="sandbox"
      path="$sectionData.container"
      direction="column"
      >
      <elements-list @addEl="onAddElement"></elements-list>
      <component class="b-hero-component" v-for="(component, index) in $sectionData.components"
        v-if="$sectionData.components.length !== 0"
        :is="component.name"
        :key="index"
        :href="$sectionData.components[index].element.href"
        v-html="$sectionData.components[index].element.text"
        :style="$sectionData.components[index].element.styles"
        :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
        v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
        >
      </component>
    </sandbox>
  </section>
</template>

<style lang="sass" scoped>
$h: 100vh
.b-hero
  position: relative
  width: 100%
  min-height: #{$h}
  margin: 0
  padding: 1rem
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  transition: background 200ms
  &.is-editable
    min-height: calc(#{$h} - 7.2rem)
  &-component
    margin: 1.2rem
.b-delimiter
  height: 2rem
  .is-mobile &,
  .is-tablet &
    display: none
  @media only screen and (max-width: 768px)
    &
      display: none
.b-logo
  margin: 0 0 5.5rem
.b-title
  color: rgb(255, 255, 255)
  font-style: normal
  font-weight: 800
  line-height: 6.7rem
  font-size: 4.8rem
  text-align: center
  letter-spacing: 0.15em
  text-transform: uppercase
  margin: 0 0 2rem
  .is-mobile &,
  .is-tablet &
    font-size: 2rem !important
    line-height: 4rem
  @media only screen and (max-width: 768px)
    &
      font-size: 2rem !important
      line-height: 4rem
.b-text
  color: rgba(255, 255, 255, 0.3)
  font-size: 2rem
  line-height: 4rem
  text-align: center
  .is-mobile &,
  .is-tablet &
    font-size: 1.4rem !important
    line-height: 2rem
  @media only screen and (max-width: 768px)
    &
      font-size: 1.4rem !important
      line-height: 2rem
.b-button
  color: #fff
  font-family: Lato
  font-style: normal
  font-weight: bold
  line-height: 3.2rem
  font-size: 1.6rem
  text-align: center
  letter-spacing: 0.28em
  text-transform: uppercase
  width: 35.2rem
  height: 6.4rem
  background: #FF6D64
  box-shadow: 0 2.4rem 4.4rem rgba(0, 0, 0, 0.15)
  .is-mobile &,
  .is-tablet &
    width: 80%
  @media only screen and (max-width: 768px)
    &
      width: 80%
.b-sandbox
  height: 100%
  min-height: 20rem
  justify-content: center
  align-items: center
  flex-direction: column
</style>