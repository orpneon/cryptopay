<template>
  <v-layout :class="b()"
            wrap
            justify-space-between>

    <v-flex :class="b('wrapper', 'from')"
            sm5
            xs4
            d-flex>
      <span :class="b('label', 'align-end')">{{ locale.from }}</span>
      <v-select v-model="convert.from"
                :class="b('select', 'from')"
                :items="currencies.from"
                @change="forceUpdateConversion"
                hide-details
                solo/>
    </v-flex>

    <v-flex :class="b('swapper')">
      <v-icon @click.native="swapConversion"
              size="48"
              dark>
        swap_horiz
      </v-icon>
    </v-flex>

    <v-flex :class="b('wrapper', 'to')"
            sm5
            xs4
            d-flex>
      <span :class="b('label')">{{ locale.to }}</span>
      <v-select v-model="convert.to"
                :class="b(('select', 'to'))"
                :items="currencies.to"
                @change="forceUpdateConversion"
                hide-details
                solo/>
    </v-flex>

  </v-layout>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  const { currencies, convert } = mapGetters(['currencies', 'convert'])
  const { swapConvert } = mapMutations(['swapConvert'])
  const { updateConverted } = mapActions(['updateConverted'])

  export default {
    name: 'currency-select',

    data() {
      return {
        locale: {
          from: 'из',
          to: 'в'
        }
      }
    },

    computed: {
      currencies,
      convert
    },

    methods: {
      updateConverted,
      swapConvert,

      swapConversion() {
        this.swapConvert()
        this.$nextTick(this.forceUpdateConversion)
      },

      forceUpdateConversion() {
        this.updateConverted()
      }
    }
  }
</script>

<style lang="stylus">
  .currency-select
    &__swapper
      display flex
      justify-content center
      align-items flex-end
      cursor pointer
      width 48px

    &__wrapper
      flex-direction column

    &__label
      text-align center

</style>
