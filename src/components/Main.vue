<template>
  <div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div data-dismiss="modal" class="position-absolute" style="background-color: rgba(0,0,0,.5); z-index: -1; top: 0; right: 0; left: 0; bottom: 0;">
      </div>
      <div class="modal-dialog d-flex h-50 align-items-center" role="document">
        <div class="modal-content w-100">
          <div class="modal-body text-left">
            Sources: <br>
            <input type="checkbox" name="" id=""> Mtv <br>
            <input type="checkbox" name="" id=""> Verge <br>
            <input type="checkbox" name="" id=""> Polygon <br>
            <input type="checkbox" name="" id=""> Nat Geo <br>
            <input type="checkbox" name="" id=""> BBC <br><br>
            Links: <br>
            Juxtapoz
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div data-dismiss="modal" class="position-absolute" style="background-color: rgba(0,0,0,.5); z-index: -1; top: 0; right: 0; left: 0; bottom: 0;">
      </div>
      <div class="modal-dialog d-flex h-50 align-items-center" role="document">
        <div class="modal-content w-100">
          <p class="pt-2"> 
            <span class="fake-link" @click="toggleLogin = false;">Login</span> | <span class="fake-link" @click="toggleLogin = true;">Sign Up</span> | <span class="fake-link" @click="toggleLogin = true;">Forgot Password</span> 
          </p>
          <div v-if="!toggleLogin" class="modal-body text-left text-center">
            <div class="w-100 text-left">
              Username or Email
            </div>
            <input type="text" class="form-control mb-3">
            <div class="w-100 text-left">
              Password
            </div>
            <input type="text" class="form-control">
            <button class="btn btn-success form-control mt-4" data-dismiss="modal" @click="loggedIn = true; playHello()">
              Login
            </button>
          </div>
          <div v-else class="modal-body text-left text-center">
            <div class="w-100 text-left">
              Username or Email
            </div>
            <input type="text" class="form-control mb-3">
            <div class="w-100 text-left">
              Password
            </div>
            <input type="text" class="form-control">
            <button class="btn btn-success form-control mt-4" data-dismiss="modal" @click="loggedIn = true; playHello()">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->

    <div v-bind:class="{ 'nav-hidden': toggleNav }" class="bg-white border-top-grey fixed-top nav-custom pt-2 pb-2">
      <div class="container h-100">
        <div class="row h-100">
          <!-- Hide on Mobile -->
          <!-- <div class="col-md-3 header h-100 d-none d-md-block">
            <div class="h-100 d-flex align-items-center">
              <div data-toggle="modal" data-target="#exampleModal">
                <span class="fake-link">•••</span>
              </div>
            </div>
          </div> -->
          <div class="col-md-12 header d-flex align-items-center disable-scrollbar">
            <!-- <span class="pr-5"></span> -->
            <!-- <span class="ml-5 d-inline"></span> -->
            <!-- <div class="d-inline" style="width: 0px;">&nbsp;</div> -->
            <!-- <div class="w-100">123</div> -->
            <div style="margin: auto; white-space: nowrap;">
              <span v-for="(source, index) in sources" class="d-inline-block header-link" :key="index" @click="getArticles(source.slug)">{{ source.title }}</span>
              <!-- <span class="d-inline-block header-link" @click="getDesignboom()">DBOOM</span> -->
              <!-- |  -->
              <!-- <span class="d-inline header-link">
                <a href="https://juxtapoz.com" target="_blank">JUX</a>
              </span> -->
              <!-- <span class="d-inline header-link">
                TODOS
              </span> -->
              <!-- <span class="d-inline header-link">
                <a href="https://juxtapoz.com" target="_blank">OPTIONS</a>
              </span> -->
            </div>
            <!-- <span v-for="(source, index) in sources" class="d-inline" :key="index" @click="getArticles(source.slug)">{{ source.title }}</span>
              <span>
              <a href="https://juxtapoz.com" target="_blank">JUX</a>
            </span>

            <div class="d-inline" style="width: 200px;">&nbsp;</div> -->
            <!-- <span class="pr-2 d-inline"></span> -->
          </div>
          <!-- Hide on Mobile -->
          <!-- <div class="col-md-3 h-100 d-none d-md-block text-right w-100">
            <div class="h-100 w-100 d-flex align-items-center justify-content-end">
              <div v-if="!loggedIn">
                <div data-toggle="modal" data-target="#exampleModal2">
                  <span class="fake-link" @click="toggleLogin = false;">
                    Login
                  </span> | 
                  <span class="fake-link" @click="toggleLogin = true;">
                    Sign Up
                  </span>
                </div>
              </div>
              <div v-else class="h-100 p-1">
                Po R. <span style="font-size: 10px; position: relative; top: -2px; margin-left: 6px;">▼</span>
                <img src="/static/avatar.png" @click="loggedIn=false; playByebye()" class="fake-link ml-3 mr-2 h-100" alt="xNews" style="border-radius: 50px;"> 
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Start body -->
    <div v-if="!showNews" class="container mt-80 pt-4 pb-0 font-weight-bold py-5 mb-5" @click="showNews = !showNews;" style="font-size: 5rem;">
      Closed for the weekend! 
    </div>
    
    <div v-if="showNews" class="container mt-80 pt-4 pb-0">
      <div class="row pb-4" v-for="(item, index) in data" :key="index">
        <div class="col-md-12 pb-4">
          <div class="position-relative pb-50p w-100">
            <div class="content-ratio bg-black overflow-hidden rounded">
              <div class="content-main overflow-hidden">
                <img :src="item.urlToImage" class="w-100" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="bg-white rounded text-left">
            <div class="font-weight-bold text-uppercase">
              {{ item.title }}
            </div>
            <div class="pt-3 pb-1 mb-2">
              {{ item.description }}
            </div>
            <!-- <div class="pt-3 pb-1 mb-2">
              Fake Avatars...
              <div class="mt-2">
                <img src="/static/avatars/avatar-01.png" style="margin-right: -25px; max-height: 60px;" alt="">
                <img src="/static/avatars/avatar-01.png" style="margin-right: -25px; max-height: 60px;" alt="">
                <img src="/static/avatars/avatar-01.png" style="margin-right: -25px; max-height: 60px;" alt="">
                <img src="/static/avatars/avatar-01.png" style="margin-right: -25px; max-height: 60px;" alt="">
                <img src="/static/avatars/avatar-01.png" style="margin-right: -25px; max-height: 60px;" alt="">
                <img src="/static/avatars/avatar-01.png" style="margin-right: -25px; max-height: 60px;" alt="">
                
              </div>
            </div> -->
            <div class="w-100 mt-3 d-block">
              <span v-cloak>{{ convertDate(item.publishedAt) }}</span>
              <a :href="item.url" class="float-right" target="_blank">
                → Go to Story
                <!-- <button class="btn-dark w-100 py-2 font-weight-bold text-uppercase">→ Go to Story</button> -->
              </a>
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
      currTime: '',
      data: [
        null, null, null
      ],
      showNews: true,
      toggleLogin: true,
      loggedIn: false,
      scrollPos: 0,
      showOverlay: true,
      toggleNav: false,
      loaded: false,
      ttlProfits: 0,
      bankAccount: 0,
      searchText: '',
      currArticle: {
        title: '',
        description: '',
        url: ''
      },
      sources: [
        {
          name: 'MTV News',
          title: 'MTV',
          slug: 'mtv-news',
          visible: false
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
        // {
        //   name: 'Designboom',
        //   title: 'DBOOM',
        //   slug: 'dboom',
        //   visible: true
        // },
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

    this.initTime();

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
    convertDate(inputDate) {
      var date = new Date(inputDate);
      var weekday = ["Sunday", "Monday" ,"Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      return weekday[date.getDay()] + ' @ ' +  date.getHours() + ':' + date.getMinutes()
    },
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
          this.currArticle.url = this.data[ref].url
        }

        if (currScroll < self.$refs[1][0].offsetTop) {
          this.currArticle.title = this.data[0].title
          this.currArticle.description = this.data[0].description
          this.currArticle.url = this.data[0].url
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
      // alert('123'

      axios.get('https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?sources=' + source + '&apiKey=86fa2caa5dac471a98d05dfa2d141b6f', {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      })
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
    getDesignboom: function () {
      let self = this

      alert('123')
      self.data = [{}]

      axios.get('https://loving-mayer-d80a26.netlify.com/.netlify/functions/hello')
      .then(response => {
        let articles = response.data

        console.log(articles)

          self.currArticle.title = articles[0].title
          self.currArticle.description = articles[0].description


        articles.forEach(function (item, index) {
          Vue.set(self.data, index, item)
        })

        window.scrollTo(0, 0);
      })
    },
    initTime: function(){  
      let self = this
      setInterval(() => {
          let d = new Date().toLocaleTimeString();
          self.currTime = d;
      }, 1000);
    },
    cashOut () {
      let file = '/static/shazam.mp3'
      var audio = new Audio(file);
      audio.play();

      // this.bankAccount += this.ttlProfits
      // this.ttlProfits = 0;
    },
    playSound: function () {
      let file = '/static/cha-ching.mp3'
      var audio = new Audio(file);
      audio.play();

      // this.ttlProfits += 10;
    },
    playByebye: function () {
      let file = '/static/sound-byebye.mp3'
      var audio = new Audio(file);
      audio.play();
    },
    playHello: function () {
      let file = '/static/sound-hello.mp3'
      var audio = new Audio(file);
      audio.play();
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
.btn-dark {
    background-color: #007bff!important;
    border-radius: 50px;
    transition: .4s ease-in-out;
    color: #fff!important;
    border: none!important;
    box-shadow: none!important;
}

.btn-dark:hover, btn-dark:active, btn-dark:focus {
  cursor: pointer;
  box-shadow: 4px 4px 8px rgba(0,0,0,.25)!important;
}

.rotated {
  animation: rotation 5s infinite linear;
}


.rotated:hover {
  animation-play-state: paused;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

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

.header-link {
  /* margin-left: 10px;
  margin-right: 10px; */
  color: #111;
  /* margin: 4px 24px; */
  padding: 4px 24px;
  border-radius: 20px;
  /* background-color: #f7f7f7; */
}

.header-link:hover {
  /* margin: 0; */
  /* padding: 4px 24px; */
  cursor: pointer;
  background-color: #f7f7f7;
  transition: .05s ease;
  /* border-bottom: 2px solid #333; */
}

.header > .active {
  color: #333;
}

.h-99 {
  height: 75%!important;
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
  border-radius: 20px !important;
}

.rounded-top {
  border-radius: 20px 20px 0px 0px !important;
}

.rounded-bottom {
  border-radius: 0px 0px 20px 20px !important
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

.pl-100 {
  padding-left: 200px;
}

.pr-100 {
  padding-right: 200px;
}

/* Hide Horizontal Scrollbar */

.disable-scrollbar::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

.disable-scrollbar {
  padding-top: 8px;
  overflow-x: scroll;
  scrollbar-width: none; 
  -ms-overflow-style: none;
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
