<template>
  <div id="app">
    <Main/>
    <div class="container pb-4">
      <div class="row pb-4">
        <div class="col-md-12 pb-2" style="text-align: center; font-size: 14px; margin-bottom: 4px;  margin-top: 10px;">
          <a href="http://rithfolio.com">
            <img src="/static/Po_logo.png" style="margin-right: 22px; width: 28px; height: 28px; margin-top: -20px;" alt="">
          </a>
          <a href="https://vuejs.org">
            <img src="https://vuejs.org/images/logo.png" style="margin-right: 22px; width: 28px; height: 28px; margin-top: -20px;" alt="">
          </a>
          <a href="http://newsapi.org">
            <img src="/static/NewsAPI.png" style="width: 24px; height: 24px; margin-top: -20px;" alt="">
          </a>
          <br>
          <div style="margin-top: 6px; font-weight: 300; font-size: 14px; font-family: Helvetica; margin-bottom: 4px;">
            An app by Po, via. <i>Rithfolio.com</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Main from './components/Main'

export default {
  name: 'App',
  components: {
    Main
  } 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 12px;
  font-size: 18px;
}
</style>
