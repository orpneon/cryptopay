<template>
  <div id="app">
    <header class="header">
      <h1 class="header__title">Калькулятор и конвертер криптовалют</h1>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
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

  #app
    font-family -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    height 100%
    overflow-x hidden
    overflow-y auto
    color #fff
    width 860px
    margin 72px auto 0

    .header
      text-align center

      &__title
        font-weight normal
        font-size 36px

</style>
