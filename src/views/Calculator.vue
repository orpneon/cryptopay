<template>
  <v-container :class="b()"
               fluid>

    <currency-select/>

    <convert-field/>

    <div v-if="convertedResult"
         :class="b('converted-result')">
      {{ convertedResult }}
    </div>

  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CurrencySelect from '@/components/CurrencySelect.vue'
  import ConvertField from '@/components/ConvertField.vue'

  const { convertedResult } = mapGetters(['convertedResult'])

  export default {
    name: 'crypto-calculator',

    components: { ConvertField, CurrencySelect },

    computed: {
      convertedResult
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
