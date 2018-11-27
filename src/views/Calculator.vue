<template>
  <v-container :class="b()"
               fluid>

    <currency-select/>

    <convert-field/>

    <convert-result v-if="convertedResult"/>

    <chart v-if="convertedResult"
           :hidden="Boolean(convertedResult)"/>

  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  import CurrencySelect from '@/components/CurrencySelect.vue'
  import ConvertField from '@/components/ConvertField.vue'
  import ConvertResult from '@/components/ConvertResult.vue'
  import Chart from '@/components/Chart.vue'

  export default {
    name: 'crypto-calculator',

    components: { ConvertResult, ConvertField, CurrencySelect, Chart },

    computed: {
      ...mapGetters('converter', ['convertedResult'])
    }
  }
</script>

<style lang="stylus">
  .crypto-calculator
    -webkit-touch-callout none
    -webkit-user-select none
    -khtml-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none
    margin 30px 0

</style>
