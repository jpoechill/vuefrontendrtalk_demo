<template>
  <div>
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
                <span class="fake-link">XXX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 80px;"></div>
    <div v-for="(item, index) in data" :key="index" class="w-100 pb-5 mb-2 position-relative">
      <a :href="item.url" target="_blank">
        <div class="w-100 bg-primary position-relative" style="padding-bottom: 55%; background-size: cover;" v-bind:style="{ 'background-image': 'url(\'' + item.urlToImage + '\')' }">
          <div class="position-absolute">
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-left">
                  <span v-if="item.source" :style="{backgroundColor: getPastelColour()}" class="bg-pastel">
                    {{ item.source.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
      <div class="container mt-5">
        <div class="row pl-4 pr-4 pt-2 pb-2">
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
  border-bottom: 10px solid #eee;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
