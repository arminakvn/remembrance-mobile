<template>
  <div class="home" id='home-d'>
    <home-view/>
  </div>
</template>

<script>

// @ is an alias to /src
import HomeView from '@/components/HomeView.vue'
import * as $ from 'jquery'
import * as d3 from 'd3v4/build/d3.js'
window['jQuery'] = window['$'] = $;
export default {
  name: 'home',
  components: {
    HomeView
  },
  data: function(){
    return {items:[]}
  },
  computed:{
    r_img_bk: function(){
      return Math.sqrt(Math.pow($(window)[0].screen.availHeight,2) + Math.pow($(window)[0].screen.availWidth, 2))
    },
    r_img: function(){
      // let availHeightorWidth = Math.max($(window)[0].screen.availHeight, $(window)[0].screen.availWidth)
      let r_img = $(window)[0].screen.availHeight / 2 //availHeightorWidth / 2
      return r_img
    }
  },
  methods:{
   
  },
  mounted(){
    var self = this;
      // const dateArr = [];
      d3.queue().defer(d3.csv,"data.csv").await(function(err,d){
        self.items = d
       
      })


  //  let self = this;
  //  console.log("fff",self,document)
  //  document.addEventListener('scroll', self.handleScroll);
   }
  
}
</script>
