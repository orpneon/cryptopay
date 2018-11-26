<template>
  <div class="crypto-calculator">
    <v-select
      :options="options.currency"
      :searchable="false"
    />
    <v-select
      :options="options.crypto"
      :searchable="false"
    />
  </div>
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
          currency: 'USD',
          crypto: 'BTC'
        },
        options: {
          currency: [
            { label: 'US Dollar', value: 'USD' },
            { label: 'Euro', value: 'EUR' },
            { label: 'Ruble', value: 'RUR' }
          ],
          crypto: [
            { label: 'Bitcoin', value: 'BTC' },
            { label: 'Litecoin', value: 'LTC' },
            { label: 'Ethereum', value: 'ETH' }
          ]
        }
      }
    }
  }
</script>

<style lang="stylus">
  .crypto-calculator
    display flex
    justify-content space-between
    margin 40px 0

    .v-select
      min-width 300px
      margin 0 60px

      .dropdown-toggle
        background-color #fff

      .form-control
        line-height 36px

</style>
