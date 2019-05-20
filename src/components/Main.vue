<template>
  <div class="hello">
    <div class="container fixed-top" style="width: 100%; background-color: #FFF; padding-top: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee; padding-left: 8%; padding-right: 8%; margin: 0 0 0 0px">
      <div class="row">
        <div class="col-md-2 text-left font-special">
          <a href="/"><i>
            <img src="/static/logo.png" class="w-25" alt="xNews">
          </i></a>
        </div>
        <div class="col-md-8 header" style="word-spacing: 12px; font-weight: 700;">
          <span class="active" @click="getArticles('mtv-news')">MTV</span>
          <span @click="getArticles('the-verge')">VERGE</span>
          <span @click="getArticles('polygon')">POLYGON</span> | 
          <span>
            <a href="https://juxtapoz.com" target="_blank">JUX</a>
          </span>
        </div>
        <div class="col-md-2 text-right font-special">
          <a href="/"><i>
            <img src="/static/pr-logo.png" class="w-25" alt="PR Logo">
          </i></a>
        </div>
      </div>
    </div>
    <div class="container" style="margin-top: 59px; width: 100%; padding: 0px;">
      <div class="row" style="margin: 0px;">
        <div class="col-md-12 text-center pb-4" style="padding: 0px;" v-for="(item, index) in data" :key="index">
          <div style="width: 100%; padding-bottom: 55%; background-color: #CCC; position: relative;">
            <a :href="item.url" target="_blank">
              <div style="position: absolute; z-index: 1; top: 0; bottom: 0; left: 0; right: 0; overflow: hidden; background-size: cover;" v-bind:style="{ 'background-image': 'url(\'' + item.urlToImage + '\')' }">
              </div>
              <div style="position: absolute; z-index: 100;">
                <div class="container">
                  <div class="row">
                    <div class="offset-md-1 col p-0 text-left">
                      <span v-if="item.source" :style="{backgroundColor: getPastelColour()}" class="bg-light">
                        {{ item.source.name }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <br>
          <!--  -->
          <div class="container">
            <div class="row">
              <div class="offset-md-2 col-md-8">
                <div class="text-left" style="font-size: 20px; text-transform: uppercase; font-weight: 900;">
                  <a :href="item.url" target="_blank">
                    {{ item.title }} 
                  </a>
                  <br><br>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="offset-md-2 col-md-8">
                <div class="text-left">
                  {{ item.description }} <br><br> ↥
                </div><br><br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container fixed-bottom text-uppercase pb-4" style="width: 100%; font-size: 18px; font-weight: 500; background-color: #FFF; padding-top: 10px; padding-bottom: 10px; border-top: 1px solid #eee; padding-left: 8%; padding-right: 8%; margin: 0 0 0 0px">
      <div class="row">
        <div class="col-md-4 text-center">
          Last seen: 4 hours ago
        </div>
        <div class="col-md-4 text-center">
          Visits today: {{ counters.daily }}
        </div>
        <div class="col-md-4 text-center">
          Visits this week: {{ counters.weekly }}
        </div>
        <!-- <div class="col-md-3 text-center">
          Visits this month: {{ counters.monthly }}
        </div> -->
        <!-- <div class="col-md-3 text-center">
        All-time: {{ counters.allTime }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

import firebase from './firebaseInitConfig.js'

export default {
  name: 'Main',
  data () {
    return {
      API_Key: '86fa2caa5dac471a98d05dfa2d141b6f',
      data: [],
      searchText: '',
      counters: {
        daily: '',
        monthly: '',
        weekly: '',
        allTime: ''
      }
    }
  },
  created () {
    this.getArticles('mtv-news')
  },
  mounted() {
    this.getVisitors();
    this.updateCounts();

    // get visitor count
    //   day, week, month
    // add visitor count
    //   day, week, month
    // reset if necessary
  },
  methods: {
    getVisitors () {
      let self = this

      firebase.firestore.collection('counters').doc('values').get()
        .then(function(querySnapshot) {
          let fbData = querySnapshot.data()

          self.counters.daily = fbData.daily
          self.counters.weekly = fbData.weekly
          self.counters.monthly = fbData.monthly
          self.counters.allTime = fbData.allTime
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        }
      );
    },
    updateCounts() {
      // get current day, week, month
      let self = this
      let date = new Date();
      let month = date.getMonth();

      let ref = firebase.firestore.collection('counters').doc('values')

      ref.get()
      .then(function(querySnapshot) {
        let fbData = querySnapshot.data()

        console.log('Trace')

        ref.update({
          daily: fbData.daily + 1,
          weekly: fbData.weekly + 1,
          monthly: fbData.monthly + 1,
          allTime: fbData.allTime + 1,
        })
      })
    },
    exeSearch: function () {
      let self = this
      let searchTerm = this.searchText
      self.data = [{}]

      axios.get('https://newsapi.org/v2/everything?q=' + searchTerm + '&apiKey=86fa2caa5dac471a98d05dfa2d141b6f')
      .then(response => {
        let articles = response.data.articles

        articles.forEach(function (item, index) {
          Vue.set(self.data, index, item)
        })
      })
    
      this.searchText = ''
    },
    getArticles: function (source) {
      let self = this
      self.data = [{}]

      axios.get('https://newsapi.org/v2/everything?sources=' + source + '&apiKey=86fa2caa5dac471a98d05dfa2d141b6f')
      .then(response => {
        let articles = response.data.articles

        articles.forEach(function (item, index) {
          Vue.set(self.data, index, item)
        })

        window.scrollTo(0, 0);
      })
    },
    getPastelColour: function () {
      return "hsl(" + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (85 + 10 * Math.random()) + '%)';
    }
  }
}
</script>

<style scoped>
textarea:focus, input:focus{
  outline: none;
}

.header {
  font-family: 'Oswald', sans-serif;
  font-size: 1.3rem;
}

.header > span, .header > span > a{
  color: #bbb;
}

.header > span:hover {
  cursor: pointer;
  border-bottom: 2px solid #333;
}

.header > .active {
  color: #333;
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
  color: #111;
}

a:hover {
  text-decoration: none;
}

.font-special {
  font-family: 'Bitter', serif;
}

.bg-light {
  color: #FFF;
  margin-top: 0px;
  font-weight: 900;
  position: absolute;
  padding-right: 8px;
  padding-left: 8px;
  font-size: 16px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
