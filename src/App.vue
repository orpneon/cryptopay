<template>
  <v-app id="app">
    <div class="header">
      <h1 class="header__title">Калькулятор и конвертер криптовалют</h1>
    </div>
    <router-view/>
  </v-app>
</template>

<style lang="stylus">
  *
    background-repeat no-repeat
    margin 0
    padding 0

  html
    background #136ebd url(https://www.cryptonator.com/ui/img/background-alt.svg) no-repeat fixed 50% 0

  html, body
    height 100%
    overflow hidden !important

  body
    overflow-y auto !important

  *:hover::-webkit-scrollbar-thumb
    background-color rgba(0, 0, 0, .5)

  ::-webkit-scrollbar
    border-radius 0
    background-color rgba(0, 0, 0, 0.08)
    height 5px
    width 5px

  ::-webkit-scrollbar-thumb
    border-radius 0
    background-color rgba(0, 0, 0, .2)

  #app
    font-family -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    height auto
    color #fff
    max-width 800px
    margin 0 auto
    background-color transparent

    .header
      text-align center
      margin-top 72px

      &__title
        font-weight normal
        font-size 36px

  @media only screen and (max-width: 960px)
    #app .header
      margin-top 24px

      &__title
        font-size 30px

</style>
