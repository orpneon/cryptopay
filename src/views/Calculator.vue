<template>
  <v-container :class="b()"
               fluid>
    <v-layout wrap
              justify-space-between>

      <v-flex :class="b('select-wrapper', 'from')"
              xs5
              d-flex>
        <span :class="b('select-label', 'align-end')">{{ locale.from }}</span>
        <v-select v-model="value.from"
                  :class="b('select', 'from')"
                  :items="options.from"
                  hide-details
                  solo/>
      </v-flex>

      <v-flex :class="b('swapper')">
        <v-icon size="48"
                dark>
          swap_horiz
        </v-icon>
      </v-flex>

      <v-flex :class="b('select-wrapper', 'to')"
              xs5
              d-flex>
        <span :class="b('select-label')">{{ locale.to }}</span>
        <v-select v-model="value.to"
                  :class="b(('select', 'to'))"
                  :items="options.to"
                  hide-details
                  solo/>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'crypto-calculator',

    data() {
      return {
        locale: {
          from: 'из',
          to: 'в'
        },
        value: {
          from: 'USD',
          to: 'BTC'
        },
        options: {
          from: [
            { text: 'US Dollar', value: 'USD' },
            { text: 'Euro', value: 'EUR' },
            { text: 'Ruble', value: 'RUR' }
          ],
          to: [
            { text: 'Bitcoin', value: 'BTC' },
            { text: 'Litecoin', value: 'LTC' },
            { text: 'Ethereum', value: 'ETH' }
          ]
        }
      }
    }
  }
</script>

<style lang="stylus">
  .crypto-calculator
    margin 40px 0

    &__swapper
      display flex
      justify-content center
      align-items flex-end
      cursor pointer
      width 48px

    &__select-wrapper
      flex-direction column

    &__select-label
      text-align center

</style>
