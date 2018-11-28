<template>
  <v-container :class="b({})"
               pa-4
               fluid>

    <div :class="b('title')">{{ title }}</div>
    <chart-tools/>
    <line-chart :chart-data="chartData"
                :options="chartOptions"/>

  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ChartTools from '@/components/ChartTools.vue'
  import LineChart from '@/components/LineChart.vue'

  export default {
    name: 'currency-price-chart',
    components: { ChartTools, LineChart },

    data() {
      const currency = this.$store.state.chart.convert.from

      return {
        locale: {
          title: 'График'
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: false },
          tooltips: {
            callbacks: {
              label: tooltipItem => `${tooltipItem.yLabel} ${currency}`
            },
            custom: tooltip => {
              if (!tooltip) return
              tooltip.displayColors = false
            }
          },
          scales: {
            xAxes: [{
              display: false
            }]
          }
        }
      }
    },

    computed: {
      ...mapGetters('chart', ['convert', 'labels', 'values']),
      ...mapGetters('converter', { converter: 'convert' }),

      title() {
        const cnv = this.convert
        return `${this.locale.title} ${cnv.from} / ${cnv.to}`
      },

      chartData() {
        return {
          labels: this.labels,
          datasets: [{
            backgroundColor: 'transparent',
            pointBorderWidth: 5,
            borderColor: this.$vuetify.theme.primary,
            data: this.values
          }]
        }
      }
    },

    beforeMount() {
      this.$store.dispatch('chart/updateConvertCurrency', this.converter.to)
    }
  }
</script>

<style lang="stylus">
  .currency-price-chart
    margin-top 30px
    background-color #fff
    color rgba(0, 0, 0, .87)

    &__title
      font-size 24px
      margin 10px 0 20px
      text-align center

</style>
