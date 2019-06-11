<template>
  <div>
    <!-- <div class="text-left fixed-bottom panel-info-count">
      <div class="text-center"><strong>${{ ttlProfits }}</strong></div>
    </div>
    <div class="text-left fixed-bottom panel-info">
      <div class="text-left"><strong>curr profits</strong> <span class="float-right"><light>${{ ttlProfits }}</light></span></div>
      <div class="text-left"><strong>visits this week</strong> <span class="float-right"><light>{{ counters.weekly }}</light></span></div>
      <div class="text-left"><strong>last seen</strong> <span class="float-right"><light>4 hours ago</light></span></div>
    </div>
    <div class="text-left fixed-bottom panel-bank-account">
      <div class="text-left"><strong>innovation points</strong> <span class="float-right"><light>${{ bankAccount }}</light></span></div>
      <div class="text-left"><strong>bank account</strong> <span class="float-right"><light>${{ bankAccount }}</light></span></div>
    </div>

    <div class="text-center panel-send-money-01 fake-link" @click="playSound()">
      Happy Customer
    </div>
    <div class="text-center panel-send-money-02 fake-link" @click="playSound()">
      Very Happy Customer
    </div>
    <div class="text-center panel-send-money-03 fake-link" @click="playSound()">
      Burp
    </div>
    <div class="text-center panel-send-money-04 fake-link" @click="playSound()">
      Pay $10,000
    </div>
    <div class="text-center panel-send-money-05 fake-link" @click="playSound()">
      Innovate
    </div>
    <div class="text-center panel-send-money-06 fake-link" @click="playSound()">
      Sketch
    </div>
    <div class="text-center panel-send-money-07 fake-link" @click="playSound()">
      Prototype
    </div>
    <div class="text-center panel-send-money-08 fake-link" @click="playSound()">
      Design
    </div>
    <div class="text-center panel-cash-out fake-link" @click="cashOut()">
      Cash Out
    </div>
    <div class="text-center panel-make-disappear fake-link" @click="cashOut()">
      Make Disappear
    </div> -->
     <!-- <div class="text-left fixed-bottom panel-info-count">
      <div class="text-center"><strong>í {{ ttlProfits }}</strong></div>
    </div> -->
    <!-- <div class="text-center panel-cash-out fake-link" @click="playSound()">
      Innovate
    </div>
    <div class="text-center panel-make-disappear fake-link" @click="cashOut()">
      Cash Out
    </div> -->
    <!-- <div class="text-left fixed-bottom panel-info-custom">
      lorem4
      <div class="text-center"><strong>í {{ ttlProfits }}</strong></div>
    </div> -->
    <!-- Start Modal -->
    <!-- Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, quidem. -->
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
    <div v-bind:class="{ 'nav-hidden': toggleNav }" class="bg-white border-top-grey fixed-top nav-custom pt-2 pb-2">
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
    <!-- <div style="margin-top: 80px;"></div> -->
    <transition name="fade" appear>
      <div class="position-absolute fixed-bottom" v-show="showOverlay">
        <div class="container">
          <div class="row">
            <div class="offset-md-3 col-md-6 mb-4 rounded bg-white op-9">
              <transition name="fade" mode="in-out" :key="currArticle">
                <div>
                <div class="text-left" style="font-size: 20px; text-transform: uppercase; font-weight: 900;">
                  {{ currArticle.title }}
                </div>
                <div class="text-left mt-3 pb-2">
                  {{ currArticle.description }}
                  <span class="fake-link float-right" @click="scrollToTop()">↥</span>
                </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div v-for="(item, index) in data" @click="toggleClick()" :key="index" :ref="index" class="w-100 position-relative">
      <!-- <a :href="item.url" target="_blank"> -->
        <!-- <transition name="fade" appear> -->
          <div class="polygon w-100 bg-primary position-relative" style="min-height: 100%; padding-bottom: 70%; background-size: cover; background-position: center; " v-bind:style="{ 'background-image': 'url(\'' + item.urlToImage + '\')' }">
            <!-- <div class="position-absolute">
              <div class="container">
                <div class="row">
                  <div class="col-md-12 text-left">
                    <span v-if="item.source" :style="{ backgroundColor: getPastelColour() }" class="bg-pastel">
                      {{ item.source.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        <!-- </transition> -->
      <!-- </a> -->
      <!-- <div class="container mt-4">
        <div class="row pl-4 pr-4 pt-4 pb-2">
          <div class="offset-md-2 panel col-md-8 p-5">
            <a :href="item.url" target="_blank">
              <div>
                <div class="text-left" style="font-size: 18px; text-transform: uppercase; font-weight: 900;">
                  {{ item.title }} 
                  <br><br>
                </div>
                <div class="text-left">
                  {{ item.description }} <br><br> <span class="fake-link" @click="scrollToTop()">↥</span>
                  <br>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div> -->
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
      scrollPos: 0,
      showOverlay: true,
      toggleNav: false,
      loaded: false,
      ttlProfits: 0,
      bankAccount: 0,
      searchText: '',
      currArticle: {
        title: '',
        description: ''
      },
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
  deactivate () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.getVisitors();
    this.updateCounts();

    this.loaded = true;

    window.addEventListener('scroll', this.handleScroll);
    // console.log('123')
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
    handleScroll () {
      let prevScroll = this.scrollPos
      let currScroll = window.scrollY
      
      // if (currScroll <= prevScroll) {
      //   this.toggleNav = !this.toggleNav
      // }

      if (currScroll <= prevScroll) {
        // console.log('Going up')
        this.toggleNav = false;

        // this.showOverlay = false
      } else {
        // console.log('Going down')
        this.toggleNav = true;

        // this.showOverlay = true
      }

      // for (let i in this.$refs) {
      //   console.log(this.$refs['0'].getBoundingClientRect().top)
      // }

      // console.log(this.$refs['0'][0].offsetTop)
      // if (this.$refs['0'] !== 'undefined') {
      //   console.log(this.$refs['z0'][0].offsetTop)
      // }

      let self = this

      let curr = null

      this.scrollPos = window.scrollY

      let scrollPos = this.scrollPos

      for (let ref in self.$refs) {
        // if (this.scrollPos > this.$refs[ref].offsetTop && this.scrollPos < (this.$refs[ref].offsetTop + this.$refs[ref].offsetHeight)) {
        //   curr = this.$refs[ref]

        //   console.log('curr: ' + curr)
        // }
        // console.log(self.$refs[ref][0].offsetTop)

        let itemTop = self.$refs[ref][0].offsetTop
        let itemHeight = self.$refs[ref][0].offsetHeight
        
        if (currScroll > itemTop && currScroll < (itemTop + itemHeight)) {
          this.currArticle.title = this.data[ref].title
          this.currArticle.description = this.data[ref].description
        }

        if (currScroll < self.$refs[1][0].offsetTop) {
          this.currArticle.title = this.data[0].title
          this.currArticle.description = this.data[0].description
        }
        console.log(currScroll)
        // console.log(ref)

        // console.log(self.$refs['0'][0].offsetTop)
        // if (currScroll < (self.$refs[0][0].offsetTop + self.$refs[0][0].offsetHeight + 80)) {
        //   this.currArticle.title = this.data['0'].title
        //   this.currArticle.description = this.data['0'].description
        // }
        // console.log('scroll' + this.scrollPos)
      }

      // for (let i in this.$refs) {
      //   console.log(this.$refs['0'])
      // }
      // console.log('scroll: ' + this.scrollPos)

      // // item y top
      // if (this.$refs['1'] !== 'undefined') {
      //   console.log(this.$refs['z1'])
      // }
      
      // console.log('innerHeight: ' + window.innerHeight)

      // console.log('refs: ' + this.$refs)


      // console.log(this.scrollPos)

      // console.log(this.scrollPos, window.scrollY)
    },
    toggleClick () {
      // // console.log('Click')
      this.showOverlay = !this.showOverlay;
      this.toggleNav = !this.toggleNav
    },
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


          self.currArticle.title = articles[0].title
          self.currArticle.description = articles[0].description


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
  padding: 20px;
}

.border-top-grey {
  border-top: 10px solid #eee;
}

.nav-custom {
  height: 80px;
  overflow: hidden;
  transition: .24s ease-in-out;
}

.nav-hidden {
  top: -100px;
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

.op-9 {
  opacity: 1;
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

.panel-info-custom {
  font-weight: 500;
  background-color: rgba(0, 0, 0, .4);
  /* padding: 10px 8%; */
  /* border-top: 1px solid rgb(238, 238, 238); */
  margin: 20px 20px;
  display: block;
  width: 300px;
  padding: 10px 12px;
  color: #fff;
  border-radius: 30px;
  font-size: 80px;
}

.panel-info-count {
  font-weight: 500;
  background-color: rgba(0, 0, 0, .4);
  /* padding: 10px 8%; */
  /* border-top: 1px solid rgb(238, 238, 238); */
  margin: 20px 20px;
  display: block;
  width: 300px;
  padding: 10px 12px;
  color: #fff;
  border-radius: 30px;
  font-size: 80px;
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
  border-radius: 20px;
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
  margin: 20px;
  display: block;
  bottom: 200px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
  transition: .05s ease;
}

.panel-send-money-01 {
  font-weight: 500;
  margin: 20px;
  display: block;
  bottom: 309px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
  transition: .05s ease;
}

.panel-send-money-02 {
  font-weight: 500;
  margin: 20px;
  display: block;
  bottom: 246px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
  transition: .05s ease;
}

.panel-send-money-03 {
  font-weight: 500;
  margin: 20px;
  display: block;
  bottom: 182px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
  transition: .05s ease;
}

.panel-send-money-04 {
  font-weight: 500;
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
  transition: .05s ease;
}

.panel-send-money-05 {
  font-weight: 500;
  margin: 20px;
  display: block;
  bottom: 370px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
  transition: .05s ease;
}

.panel-send-money-06 {
  font-weight: 500;
  margin: 20px;
  display: block;
  bottom: 430px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
  transition: .05s ease;
}

.panel-send-money-07 {
  font-weight: 500;
  margin: 20px;
  display: block;
  bottom: 490px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
  transition: .05s ease;
}


.panel-send-money-08 {
  font-weight: 500;
  margin: 20px;
  display: block;
  bottom: 550px;
  right: 0px;
  padding: 10px 30px;
  color: #333;
  font-size: 16px;
  position: fixed;
  border-radius: 100px;
  background: #fff;
  font-weight: 700;
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

.polygon {
  -webkit-clip-path: polygon(0 14%, 100% 0%, 100% 86%, 0% 100%);
  clip-path: polygon(0 14%, 100% 0%, 100% 86%, 0% 100%);
  margin-top: -130px;
}

.vh-100 {
  height: 100vh;
}

.rounded {
  border-radius: 20px;
}

.panel-send-money-01:hover, 
.panel-send-money-02:hover, 
.panel-send-money-03:hover, 
.panel-send-money-04:hover,
.panel-send-money-05:hover,
.panel-send-money-06:hover,
.panel-send-money-07:hover,
.panel-send-money-08:hover {
  box-shadow: 0px 0px 0px 10px #e9e9e9;
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
