<template>
  <v-layout :class="b()"
            row
            justify-center
            wrap>
    <v-flex xs12
            d-flex
            :class="b('buttons-wrapper', 'py-2')">
      <v-btn-toggle v-model="chartPeriod"
                    :class="b('btn-group')"
                    mandatory>
        <v-btn v-for="period in periods"
               :key="period"
               :value="period"
               :class="b('button', 'white--text')"
               dark
               color="primary">
          {{ locale[period] }}
        </v-btn>
      </v-btn-toggle>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'chart-tools',

    data() {
      return {
        locale: {
          day: '24 часа',
          week: 'Неделя',
          month: 'Месяц'
        }
      }
    },

    computed: {
      ...mapGetters('chart', ['periods', 'period']),

      chartPeriod: {
        get() {
          return this.period
        },
        set(val) {
          this.updateConvertPeriod(val)
        }
      }
    },

    methods: {
      ...mapActions('chart', ['updateConvertPeriod'])
    }
  }
</script>

<style lang="stylus">
  .chart-tools

    &__btn-group
      box-shadow none
      justify-content center

    &__button
      margin 0 20px !important
      min-width 100px !important
      border none !important
      -webkit-border-radius 3px !important
      -moz-border-radius 5px  !important
      border-radius 5px !important

  @media only screen and (max-width: 960px)
    .chart-tools

      &__button
        margin 0 2px !important

</style>
