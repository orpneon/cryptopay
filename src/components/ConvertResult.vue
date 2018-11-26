<template>
  <div :class="b()"
       mt-5>
    <span :class="b('amount')">{{ amount }} {{ convert.from }} = </span>
    <span :class="b('converted')">
      {{ convertedResult }} {{ convert.to }}
      <v-icon :class="b('changed-icon', changedIcon)">{{ changedIcon }}</v-icon>
    </span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  const { convertedResult, amount, convert, changed } = mapGetters([
    'convertedResult',
    'amount',
    'convert',
    'changed'
  ])

  export default {
    name: 'convert-result',

    computed: {
      amount,
      convert,
      changed,
      convertedResult,

      changedIcon() {
        return this.changed < 0 ? 'call_received' : 'call_made'
      }
    }
  }
</script>

<style lang="stylus">
  .convert-result
    font-size 30px
    text-align center

    &__converted
      font-weight bold

    &__changed-icon
      font-size 30px
      padding-bottom 3px

      &.call_received
        color #EF5350
      &.call_made
        color #66BB6A

  @media only screen and (max-width: 960px)
    .convert-result
      font-size 24px

      &__changed-icon
        font-size 24px
        padding-bottom 2px

</style>
