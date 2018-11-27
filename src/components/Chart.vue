<template>
  <div :class="b()">
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

    asyncData({ store, route }) {
      const market = route.params.market

      return store.dispatch('chart/updateConvertMarket', market)
    },

    data() {
      return {
        locale: {
          title: 'График',
          description: 'Последние изменения по данным bittrex.com'
        }
      }
    },

    computed: {
      ...mapGetters('chart', ['market']),

      title() {
        const title = this.locale.title
        const market = this.market

        if (market) {
          return `${title} ${market.replace('-', '/')}`
        }

        return title
      }
    },

    beforeMount() {
      window.onbeforeunload = () => {
        this.$router.push('/')
      }
    },

    destroyed() {
      window.onbeforeunload = null
    }
  }
</script>

<style lang="stylus">
  .currency-price-chart
    margin-top 30px
</style>
