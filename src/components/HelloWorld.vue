<template>
  <div class="hello">
    <div class="container" style="margin-bottom: 10px;">
      <div class="row">
        <div class="col-md-2 text-left">
          FrontendR
        </div>
        <div class="col-md-8 header">
          <span @click="getArticles('mtv-news')">
            MTV
          </span> | 
          <span @click="getArticles('the-verge')">
            THEVERGE
          </span> | 
          <span @click="getArticles('recode')">
            RECODE
          </span> | 
          <span @click="getArticles('polygon')">
            POLYGON
          </span> |
          <span @click="getArticles('bbc-news')">
            BBC
          </span> | 
          <span @click="getArticles('national-geographic')">
            NATGEO
          </span>
        </div>
        <div class="col-md-2 text-right">
          Search
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 text-center" v-for="item in data">
            <div style="font-size: 12px; margin-bottom: 8px;">{{ item.source.name }}</div>
            <div style="width: 100%; padding-bottom: 55%; background-color: #CCC; position: relative;">
              <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; overflow: hidden; background-size: cover;" v-bind:style="{ 'background-image': 'url(' + item.urlToImage + ')' }">
              </div>
            </div>
            <br><br>
            <div style="width: 80%; font-size: 16px; text-transform: uppercase; font-weight: 600; margin: auto;">
              {{ item.title }} 
            </div> <br>
            <div style="width: 80%; margin: auto;">
              {{ item.description }}
            </div><br><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      API_Key: '86fa2caa5dac471a98d05dfa2d141b6f',
      data: []
    }
  },
  created () {
    this.getArticles('mtv-news')
  },
  methods: {
    getArticles: function (source) {
      let self = this
      self.data = []

      axios.get('https://newsapi.org/v2/everything?sources=' + source + '&apiKey=86fa2caa5dac471a98d05dfa2d141b6f')
      .then(response => {
        let articles = response.data.articles

        articles.forEach(function (item, index) {
          console.log(index)
          Vue.set(self.data, index, item)
        })
      })
      .catch(e => {
        console.log(e)
        // this.errors.push(e)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header > span:hover {
  cursor: pointer;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
