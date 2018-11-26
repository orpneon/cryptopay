<template>
  <v-container :class="b()"
               fluid>
    <v-layout wrap
              justify-space-between>

      <v-flex :class="b('select-wrapper', 'from')"
              xs5
              d-flex>
        <span :class="b('select-label', 'align-end')">{{ locale.from }}</span>
        <v-select v-model="convert.from"
                  :class="b('select', 'from')"
                  :items="options.from"
                  hide-details
                  solo/>
      </v-flex>

      <v-flex :class="b('swapper')">
        <v-icon @click.native="swapSelects"
                size="48"
                dark>
          swap_horiz
        </v-icon>
      </v-flex>

      <v-flex :class="b('select-wrapper', 'to')"
              xs5
              d-flex>
        <span :class="b('select-label')">{{ locale.to }}</span>
        <v-select v-model="convert.to"
                  :class="b(('select', 'to'))"
                  :items="options.to"
                  hide-details
                  solo/>
      </v-flex>

    </v-layout>

    <v-layout wrap
              mt-4
              justify-center>
      <v-flex :class="b('convert-field')"
              xs6>
        <v-text-field v-model="value"
                      :placeholder="locale.placeholder"
                      :rules="validateNumberField"
                      @input="maybeConvertCurrency"
                      ref="convertField"
                      solo
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { debounce } from 'underscore'

  export default {
    name: 'crypto-calculator',

    data() {
      return {
        locale: {
          from: 'из',
          to: 'в',
          placeholder: 'Укажите сумму',
          validateError: 'Неверный формат'
        },
        convert: {
          from: 'USD',
          to: 'BTC'
        },
        options: {
          from: [
            { text: 'US Dollar', value: 'USD', decimalPrecision: 2 },
            { text: 'Euro', value: 'EUR', decimalPrecision: 2 },
            { text: 'Ruble', value: 'RUR', decimalPrecision: 2 }
          ],
          to: [
            { text: 'Bitcoin', value: 'BTC', decimalPrecision: 8 },
            { text: 'Litecoin', value: 'LTC', decimalPrecision: 8 },
            { text: 'Ethereum', value: 'ETH', decimalPrecision: 8 }
          ]
        },
        value: null,
        lastValue: null,
        validateNumberField: [
          function(val) {
            const checkRule = /^\d*\.?\d+$/

            if (checkRule.test(val) || !val) {
              return true
            }

            return this.locale.validateError
          }.bind(this)
        ]
      }
    },

    methods: {
      swapSelects() {
        Object.assign(this.options, {
          from: this.options.to,
          to: this.options.from
        })

        Object.assign(this.convert, {
          from: this.convert.to,
          to: this.convert.from
        })
      },

      maybeConvertCurrency: debounce(function() {
        this.$nextTick(() => {
          const convertField = this.$refs.convertField
          const changed = this.value !== this.lastValue

          if (convertField.valid && changed) {
            this.lastValue = this.value
            console.log('update')
          }
        })
      }, 300)
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

    &__convert-field
      .error--text
        color #FFEA00 !important

      .v-input.error--text
        .v-input__slot
          border 1px solid #FF5252 !important

</style>
