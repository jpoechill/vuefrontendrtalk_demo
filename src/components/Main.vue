<template>
  <div>
    <div class="text-left fixed-bottom panel-info">
      <div class="text-left"><strong>curr profits</strong> <span class="float-right"><light>${{ ttlProfits }}</light></span></div>
      <!-- <div class="text-left"><strong>visits today</strong> <span class="float-right"><light>{{ counters.daily }}</light></span></div> -->
      <div class="text-left"><strong>visits this week</strong> <span class="float-right"><light>{{ counters.weekly }}</light></span></div>
      <div class="text-left"><strong>last seen</strong> <span class="float-right"><light>4 hours ago</light></span></div>
    </div>
    <div class="text-left fixed-bottom panel-bank-account">
      <div class="text-left"><strong>bank account</strong> <span class="float-right"><light>${{ bankAccount }}</light></span></div>
    </div>
    <div class="text-center panel-send-money fake-link" @click="playSound()">
      Pay Now
    </div>
    <div class="text-center panel-cash-out fake-link" @click="cashOut()">
      Cash Out
    </div>
    <div class="text-center panel-make-disappear fake-link" @click="cashOut()">
      Make Disappear
    </div>
    <!-- Start Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog d-flex h-50 align-items-center" role="document">
        <div class="modal-content w-100">
          <div class="modal-body text-left">
            Sources: <br>
            <input type="checkbox" name="" id=""> Source <br>
            <input type="checkbox" name="" id=""> Source <br>
            <input type="checkbox" name="" id=""> Source <br>
            <input type="checkbox" name="" id=""> Source <br>
            <input type="checkbox" name="" id=""> Source <br><br>
            Links: <br>
            Juxtapoz
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
    <div class="bg-white fixed-top nav-custom pt-2 pb-2">
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-md-2 h-100 d-none d-md-block">
            <div class="h-100 d-flex align-items-center">
              <a href="/" class="h-100 p-1">
                <img src="/static/logo.png" class="h-99 pt-1" alt="xNews">
              </a>
            </div>
          </div>
          <div class="col-md-8 header d-flex align-items-center justify-content-center">
            <span v-for="(source, index) in sources" :key="index" @click="getArticles(source.slug)">{{ source.title }}</span>
            <!-- <span class="pl-2 pr-2">| </span> -->
            <span>
              <a href="https://juxtapoz.com" target="_blank">JUX</a>
            </span>
          </div>
          <div class="col-md-2 header h-100 d-none d-md-block">
            <div class="h-100 d-flex align-items-center justify-content-end">
              <div data-toggle="modal" data-target="#exampleModal">
                <span class="fake-link">•••</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 80px;"></div>
    <div v-for="(item, index) in data" :key="index" class="w-100 pb-5 mb-2 position-relative">
      <!-- <a :href="item.url" target="_blank"> -->
        <transition name="fade" appear>
          <div class="w-100 bg-primary position-relative" style="min-height: 100%; padding-bottom: 55%; background-size: cover;" v-bind:style="{ 'background-image': 'url(\'' + item.urlToImage + '\')' }">
            <div class="position-absolute">
              <div class="container">
                <div class="row">
                  <div class="col-md-12 text-left">
                    <span v-if="item.source" :style="{ backgroundColor: getPastelColour() }" class="bg-pastel">
                      {{ item.source.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      <!-- </a> -->
      <div class="container mt-4">
        <div class="row pl-4 pr-4 pt-4 pb-2">
          <div class="offset-md-2 panel col-md-8 p-5">
            <div class="text-left" style="font-size: 20px; text-transform: uppercase; font-weight: 900;">
              <a :href="item.url" target="_blank">
                {{ item.title }} 
              </a>
              <br><br>
            </div>
            <div class="text-left">
              {{ item.description }} <br><br> <span class="fake-link" @click="scrollToTop()">↥</span>
              <br>
            </div>
          </div>
        </div>
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
      loaded: false,
      ttlProfits: 0,
      bankAccount: 0,
      searchText: '',
      sources: [
        {
          name: 'MTV News',
          title: 'MTV',
          slug: 'mtv-news',
          visible: true
        },
        {
          name: 'The Verge',
          title: 'VERGE',
          slug: 'the-verge',
          visible: true
        },
        {
          name: 'Polygon',
          title: 'POLYGON',
          slug: 'polygon',
          visible: true
        },
      ],
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

    this.loaded = true;

    console.log('123')
    // get visitor count
    //   day, week, month
    // add visitor count
    //   day, week, month
    // reset if necessary
  },
  // mounted: function() {
    // console.log(window)
    // this.$emit('hide.bs.modal,hidden.bs.modal')

    // console.log(this.$els)
    // console.log('123')
    // this.event = document.createEvent("HTMLEvents");
    // this.event.initEvent("ping", true, true);
    // this.$els.ping.addEventListener('ping', this.ping);
  // },
  methods: {
    getVisitors () {
      let self = this

      console.log(firebase)

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
    cashOut () {
      let file = '/static/shazam.mp3'
      var audio = new Audio(file);
      audio.play();

      this.bankAccount += this.ttlProfits
      this.ttlProfits = 0;
    },
    playSound: function () {
      let file = '/static/cha-ching.mp3'
      var audio = new Audio(file);
      audio.play();

      this.ttlProfits += 10;
    },
    getPastelColour: function () {
      return "hsl(" + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (85 + 10 * Math.random()) + '%)';
    },
    scrollToTop: function () {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style scoped>
textarea:focus, input:focus{
  outline: none;
}

.bg-white {
  background-color: #FFF;
  border-top: 10px solid #eee;
  padding: 20px;
}

.nav-custom {
  height: 80px;
  overflow: hidden;
}

.height-custom {
  height: 60px;
}

.header {
  font-family: 'Oswald', sans-serif;
  font-size: 1.3rem;
  word-spacing: 12px; 
  font-weight: 700;
}

.header span {
  margin-left: 10px;
  margin-right: 10px;
}

.header > span {
  color: #111;
  margin: 4px 24px;
  border-radius: 20px;
}

.header > span:hover {
  padding: 4px 24px;
  margin: 0;
  cursor: pointer;
  background-color: #f7f7f7;
  transition: .05s ease;
  /* border-bottom: 2px solid #333; */
}

.header > .active {
  color: #333;
}

.h-99 {
  height: 94%!important;
  padding-top: 6px!important;
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

.fake-link:hover {
  cursor: pointer;
}

.bg-pastel {
  color: #FFF;
  margin-top: 0px;
  font-weight: 900;
  position: absolute;
  padding-right: 8px;
  padding-left: 8px;
  font-size: 16px;
}

.panel {
  background-color: #fff;
  border-radius: 30px;
  /* border: 4px solid #ddd; */
  /* border-top-right-radius: 0px; */
}

.panel:hover {
  box-shadow: 0px 0px 0px 10px #e9e9e9;
  transition: .2s ease;
  /* border: 20px solid #ddd; */
  cursor: pointer;
  /* background-origin: border-box; */
}


strong {
  font-weight: 900;
}

light {
  font-weight: 200;
}

.panel-info {
  font-weight: 500;
  background-color: rgba(0, 0, 0, .4);
  /* padding: 10px 8%; */
  /* border-top: 1px solid rgb(238, 238, 238); */
  margin: 20px;
  display: block;
  width: 208px;
  padding: 10px 12px;
  color: #fff;
  /* border-radius: 10px; */
  font-size: 16px;
}

.panel-bank-account {
  font-weight: 500;
  background-color: rgba(0, 0, 0, .4);
  /* padding: 10px 8%; */
  /* border-top: 1px solid rgb(238, 238, 238); */
  margin: 20px;
  left: 228px;
  display: block;
  width: 208px;
  padding: 10px 12px;
  color: #fff;
  /* border-radius: 10px; */
  font-size: 16px;
}

.panel-send-money {
  font-weight: 500;
  /* background-color: rgba(0, 0, 0, .6); */
  margin: 20px;
  display: block;
  bottom: 120px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
  /* -webkit-box-shadow: 10px 10px 10px rgba(0, 0, 0, .5); */
  /* box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, .5); */
  /* border: 1px solid #ddd; */

  transition: .05s ease;
}

.panel-cash-out {
  font-weight: 500;
  /* background-color: rgba(0, 0, 0, .6); */
  margin: 20px;
  display: block;
  bottom: 60px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
  /* -webkit-box-shadow: 10px 10px 10px rgba(0, 0, 0, .5); */
  /* box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, .5); */
  /* border: 1px solid #ddd; */
  transition: .05s ease;
}

.panel-make-disappear {
  font-weight: 500;
  /* background-color: rgba(0, 0, 0, .6); */
  margin: 20px;
  display: block;
  bottom: 0px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
  /* -webkit-box-shadow: 10px 10px 10px rgba(0, 0, 0, .5); */
  /* box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, .5); */
  /* border: 1px solid #ddd; */
  transition: .05s ease;
}

.panel-send-money:hover, .panel-cash-out:hover, .panel-make-disappear:hover {
  box-shadow: 0px 0px 0px 10px #e9e9e9;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
