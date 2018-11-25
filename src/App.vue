<template>
  <div id="app">
    <h1>Crypto Calculator</h1>
    <router-view/>
  </div>
</template>

<style lang="stylus">
  *
    background-repeat no-repeat
    margin 0
    padding 0

  body, html
    height 100%
    overflow hidden !important

  #app
    font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    height 100%
    overflow-x hidden
    overflow-y auto
    color #2c3e50
    background-color #f2f3f5

</style>
