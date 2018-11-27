<template>
  <div :class="b({}, hidden ? 'hidden' : '')">
    <div :class="b('title')">
      {{ title }}
    </div>
    <div :class="b('description')">
      {{ locale.description }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'currency-price-chart',

    props: {
      hidden: {
        type: Boolean,
        required: true
      }
    },

    data() {
      return {
        locale: {
          title: 'График',
          description: 'Последние изменения по данным CryptoCompare'
        }
      }
    },

    computed: {
      ...mapGetters('chart', ['convert', 'labels', 'values']),

      title() {
        const cnv = this.convert
        const strings = [this.locale.title]

        if (cnv.to) {
          strings.push(`${cnv.from} / ${cnv.to}`)
        }

        return strings.join(' ')
      }
    },

    methods: {}
  }
</script>

<style lang="stylus">
  .currency-price-chart
    margin-top 30px
</style>
