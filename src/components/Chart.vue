<template>
  <v-container :class="b({})"
               pa-4
               fluid>

    <div :class="b('title')">
      {{ title }}
    </div>

    <chart-tools/>

    <v-layout wrap
              column>
      <div v-for="(val, index) in labels"
           :key="index">
        <span>
          {{ labels[index] }} - {{ values[index] }}
        </span>
      </div>
    </v-layout>

  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ChartTools from '@/components/ChartTools.vue'

  export default {
    name: 'currency-price-chart',
    components: { ChartTools },

    data() {
      return {
        locale: {
          title: 'График'
        }
      }
    },

    computed: {
      ...mapGetters('chart', ['convert', 'labels', 'values']),

      title() {
        const cnv = this.convert

        return `${this.locale.title} ${cnv.from} / ${cnv.to}`
      }
    }
  }
</script>

<style lang="stylus">
  .currency-price-chart
    margin-top 30px
    background-color #fff
    color rgba(0, 0, 0, .87)
    transition height .3s ease-in

    &__title
      font-size 24px
      margin-top 10px
      text-align center

</style>
