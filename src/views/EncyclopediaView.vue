<template>
  <div class="container" >
     

<!--
    instead of doing the following block using the vue item component,
    will use d3
    
 -->
  <div id="main-items" >
        <encyclopedia-item
        v-on:updatemstyle="metstyle()"
        v-for="item in encyclopedia"
        v-bind:encyclopedia="item"
        :key="item.id"
        
        > </encyclopedia-item>
  </div>
<div id="phantom-list" :style="phStyles"></div>


  </div>
</template>

<script>

import EncyclopediaItem from '@/components/EncyclopediaItem.vue'
import * as $ from 'jquery'
import * as d3 from 'd3v4/build/d3.js'
window['jQuery'] = window['$'] = $;

export default {
  name: 'encyclopedia',
  props:["timeline"],
  data(){
    return {
      mstyle: null
    }
  },
 
    
    
  methods: {
    metstyle: function(){
       console.log("mstyle in encyclo view but currently is just a place holder to see how this get s called becuase the child emits an event")
       
       
     }
   
  },
  components: {
    EncyclopediaItem,
  },
   mounted: function(){
    let self = this;
    // console.log("home",self.encyclopedia)
    let element = self.$el
    // console.log("elemnts", element);
    let d3all = d3.select(element);
    // console.log(d3all)
    // d3all.style("opacity",.4)
    // let cancelScroll = this.$scrollTo(element, 4, options)
    // let d3el = d3.select("#"+self.slug_event)
    // console.log(d3el)
    // let formatedDate = self.formatDater(self.$props.encyclopedia.date)
    // console.log(formatedDate)
    // d3el.remove("text")
    // d3el.append("text").text("")
    // d3el.text(function(){
    //   return formatedDate;
    // })

    // let t = d3.transition()
    // .duration(1750)
    // .ease(d3.easeLinear);


    // let d3spotel = d3.select("#fix"+self.encyclopedia.id)
    // console.log(d3spotel)
    // d3spotel.style("opacity",.4)
    // d3spotel.transition(t);
    // t.select("#fix"+self.encyclopedia.id).style("opacity",1)

// to cancel scrolling you can call the returned function
    // cancelScroll()
  },
   beforeMount(){
    //  const self = this;
      // someFunction()
      // console.log("before mount",self.encyclopedia)
     


   },
   computed: {
     
      phStyles: function(){
        // console.log("is phStyle",this.$parent)
        return {
        height: `${this.$parent.items.length * 500}px`,
        // position: 'relative'  
      }
        
      },
      mainItemsStyles: function(){
         //
        return {
          top: `${this.$parent.$parent.r_img}px`
        }

      },
       encyclopedia: function (){
            // console.log("this.$parent.items ",this.$parent.items, this.$parent)
            const this_item = this.$parent.items.filter((value, index, array) => {
              // console.log("this.$route.params.id; ",this.$route.params.id, value)
              return value.event == this.$route.params.id;
            })
            this.$parent.items.forEach(function(each){
              each["style_param"] = this_item[0]["id"];
            })
            
            // let three_items= [];
             return this.$parent.items;
            
              
            // return three_items;
       },
        encyclopediaph: function (){
            
     return this.$parent.items;
     }




   },
  //  created(){
  //  }
}
</script>
