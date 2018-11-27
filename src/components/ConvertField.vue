<template>
  <v-layout :class="b()"
            wrap
            mt-4
            justify-center>
    <v-flex :class="b('wrapper')"
            md6
            sm8
            xs10>
      <v-text-field v-model="value"
                    :placeholder="locale.placeholder"
                    :error-messages="validityError"
                    @input="maybeConvertCurrency"
                    type="text"
                    solo
      />
    </v-flex>
  </v-layout>
</template>

<script>
  import { debounce } from 'underscore'
  import { validateNumberField } from '@/util/validators'
  import { mapActions } from 'vuex'

  export default {
    name: 'convert-field',

    data() {
      return {
        locale: {
          placeholder: 'Укажите сумму',
          validityError: 'Неверный формат'
        },

        value: null,
        validityError: [],
        validityFn: () => {}
      }
    },

    beforeMount() {
      this.validityFn = validateNumberField(this.locale.validityError)
    },

    methods: {
      ...mapActions('converter', ['updateConverted', 'clearConverted']),

      maybeConvertCurrency: debounce(function(val) {
        this.checkValidity(val)

        this.$nextTick(() => {
          const isValid = this.validityError.length === 0

          if (isValid && this.value) {
            this.updateConverted(this.value)
          } else {
            this.clearConverted()
          }
        })
      }, 300),

      checkValidity(val) {
        const result = this.validityFn(val)
        this.validityError = result !== true ? result : []
      }
    }
  }
</script>

<style lang="stylus">
  .convert-field

    &__wrapper
      .error--text
        color #FFEA00 !important

      .v-input.error--text
        .v-input__slot
          border 1px solid #FF5252 !important

</style>
