<template>
  <v-container :class="b()"
               fluid>

    <currency-select/>

    <v-layout wrap
              mt-4
              justify-center>
      <v-flex :class="b('convert-field')"
              md6
              sm8
              xs10>
        <v-text-field v-model="value"
                      :placeholder="locale.placeholder"
                      :rules="validateNumberField"
                      @input="maybeConvertCurrency"
                      ref="convertField"
                      solo
        />
      </v-flex>
    </v-layout>

    <div v-if="convertedResult"
         :class="b('converted-result')">
      {{ convertedResult }}
    </div>

  </v-container>
</template>

<script>
  import { debounce } from 'underscore'
  import { validateNumberField } from '@/util/validators'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import CurrencySelect from '@/components/CurrencySelect.vue'

  const { clearConverted } = mapMutations(['clearConverted'])
  const { convertedResult } = mapGetters(['convertedResult'])
  const { updateConverted } = mapActions(['updateConverted'])

  export default {
    name: 'crypto-calculator',

    components: { CurrencySelect },

    data() {
      return {
        locale: {
          placeholder: 'Укажите сумму',
          validityError: 'Неверный формат'
        },

        value: null,
        lastValue: null
      }
    },

    computed: {
      convertedResult,

      validateNumberField() {
        return [validateNumberField(this.locale.validityError)]
      }
    },

    methods: {
      updateConverted,
      clearConverted,

      maybeConvertCurrency: debounce(function() {
        this.$nextTick(() => {
          const convertField = this.$refs.convertField
          const changed = this.value && this.value !== this.lastValue

          if (convertField.valid && changed) {
            this.lastValue = this.value
            this.updateConverted(this.value)
          } else if (!convertField.valid) {
            this.clearConverted()
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
    margin 30px 0

    &__convert-field
      .error--text
        color #FFEA00 !important

      .v-input.error--text
        .v-input__slot
          border 1px solid #FF5252 !important

</style>
