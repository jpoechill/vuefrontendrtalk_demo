<template>
  <div id="app">
    <Main/>
    <div class="container">
      <div class="row">
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
  font-size: 16px;
}

.modal-content {
  border-radius: 18px;
  padding: 10px;
  /* top: 80px; */
  border: 10px solid #eee;
}

.modal-dialog {
  top: 40px;
}

.modal-backdrop {
  /* background-color: #999; */
  display: none;
}



body {
  background: #eee;
}

.modal-open{
  overflow: visible !important;
  padding-right:0 !important;
  margin-top: 80px;
  margin-right: 0px;
}

.mt-80 {
  margin-top: 80px;
}

.overflow-hidden {
  overflow: hidden;
}

.position-absolute {
  position: absolute;
}

.position-relative {
  position: relative;
}

.pb-50p {
  padding-bottom: 52%;
}

.bg-black {
  background-color: black;
}

.font-weight-bold {
  font-weight: 900;
}

.content-ratio { 
  width: 100%;
  position: absolute; 
  padding-bottom: 52%;
}

.content-main {
  top: 50%;
  left: 50%;
  margin-right: -50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.bg-dark {
  background-color: grey;
}
</style>
