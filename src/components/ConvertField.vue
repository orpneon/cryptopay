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
                    :rules="validateNumberField"
                    @input="maybeConvertCurrency"
                    ref="convertField"
                    solo
      />
    </v-flex>
  </v-layout>
</template>

<script>
  import { debounce } from 'underscore'
  import { validateNumberField } from '@/util/validators'
  import { mapActions, mapMutations } from 'vuex'

  const { clearConverted } = mapMutations(['clearConverted'])
  const { updateConverted } = mapActions(['updateConverted'])

  export default {
    name: 'convert-field',

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
            this.updateConverted(this.value)
          } else if (!convertField.valid || !this.value) {
            this.clearConverted()
          }

          this.lastValue = this.value
        })
      }, 300)
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
