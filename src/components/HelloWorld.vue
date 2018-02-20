<template>
  <div class="hello">
    <div class="container" style="margin-bottom: 10px;">
      <div class="row">
        <div class="col-md-2 text-left">
          FrontendR
        </div>
        <div class="col-md-8">
          <span @click="getArticles">
            MTV
          </span> | 
          <span>
            THEVERGE
          </span> | 
          <span>
            RECODE
          </span> | 
          <span>
            POLYGON
          </span> |
          <span>
            BBC
          </span> | 
          <span>
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
        <div class="col-md-4 text-center" v-for="item in data">
            <div style="font-size: 12px; margin-bottom: 8px;">{{ item.source.name }}</div>
            <img :src="item.urlToImage" style="width: 100%; height: auto" alt="">
            <!-- {{ item }} --> <br><br>
            <div style="width: 80%; text-transform: uppercase; font-weight: 600; margin: auto;">
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

  },
  methods: {
    getArticles: function () {
      let self = this
      alert('Hello!')
      axios.get(`https://newsapi.org/v2/everything?sources=the-verge&apiKey=86fa2caa5dac471a98d05dfa2d141b6f`)
      .then(response => {
        // JSON responses are automatically parsed.
        // Vue.set(self.data, response.data) =
        // self.data.push('1231231')
        self.data = self.data.concat(response.data.articles)

        // console.log(self.data)
        console.log(response.data.articles)
        // console.log(typeof response.data.sources)
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
