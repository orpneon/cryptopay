<template>
  <div :class="b()"
       mt-5>
    <span :class="b('amount')">{{ amount }} {{ convert.from }} = </span>
    <span :class="b('converted')">{{ convertedResult }} {{ convert.to }}</span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  const { convertedResult, amount, convert } = mapGetters(['convertedResult', 'amount', 'convert'])

  export default {
    name: 'convert-result',

    computed: {
      amount,
      convert,
      convertedResult
    }
  }
</script>

<style lang="stylus">
  .convert-result
    font-size 30px
    text-align center

    &__converted
      font-weight bold
</style>
