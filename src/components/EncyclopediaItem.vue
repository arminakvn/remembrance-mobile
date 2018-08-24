<template>
  <div class="item" v-bind:style="activeStyle()" >
    <div v-on:click="onClick" class="encyclopedia-item" v-bind:style="itemWidth()" >
      <div class="item-head" v-bind:style="headStyle()">
        <h2 class="text-id">{{ encyclopedia.spot_id }}</h2>
        <h1 class="text-head">{{ encyclopedia.event }}</h1>
      </div>
      <div class="item-body">
        <div class="date">
          <h3 class="text-date" v-html="formatDate"></h3>
          <h3 class="text-year" v-html="formatYear"></h3>
        </div>
        <p class="text-desc" v-bind:id="fixid"><span v-html="descWithLink"></span></p>
      </div>
        <!-- <sui-dimmer v-if="encyclopedia.event==this.$route.params.id" :active="true" :inverted="true"/>
        <sui-dimmer v-else active :inverted="true"/> -->

    </div>

  </div>

</template>

<script>
import LinkElement from '@/components/LinkElement.vue'
import moment from 'moment'
import * as $ from 'jquery'
import * as d3 from 'd3v4/build/d3.js'
window['jQuery'] = window['$'] = $;
let options = {
    container: '#app',
    easing: 'ease',
    offset: 0,
    cancelable: true,
    onStart: function(element) {
      // scrolling started
    },
    onDone: function(element) {
      // scrolling is done
    },
    onCancel: function() {
      // scrolling has been interrupted
    },
    x: false,
    y: true
}

export default {
  name: 'EncyclopediaItem',
  props: ["encyclopedia","mstyle"],
  // components: {
  //   LinkElement
  // },
  data () {
    return {
      // we have a local value that represents the user's selected region
      currentSpot: null//this.$parent.currentSpot,
    }},
    watch: {
  '$route.params.id': {
    handler () {
      this.currentSpot = this.$route.params.id;
      // let val = 
      let val = this.activeStyle();
      // this.mstyle = this.activeStyle();   
      this.$emit('updatemstyle', this.currentSpot)
    },
    immediate: true,
  },
},
   methods: {
    sanitizeTitle: function(title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
      // Letter "d"
      slug = slug.replace(/đ/gi, 'd');
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, '');
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, '-');
      
      return slug;
    },
    onClick: function(event){
      // console.log(this.encyclopedia.title)
      this.$router.push(this.encyclopedia.event)
    },
    activeStyle: function() {
      // console.log("active this",this)
      if (this.encyclopedia.event == this.currentSpot){
        return {
          // display: `none`,
          '-webkit-transition': 'all 1s',/* Safari */
          transition: 'all 1s',
          // 'transition-delay': '0.5s',
          'transition-timing-function': 'ease',
          //visibility: `visible`,
          // transition: transform ease;
          transform: 'rotate(0deg)',
          '-webkit-transform': 'rotate(0deg)',
          '-o-transform': 'rotate(0deg)',
          '-webkit-transform-origin-x': '0vw',
          opacity: 1,
          // top: `${this.$parent.mainItemsStyles['top']}px`,
          // top: `10vh`,
          top: `0vh`,
          position: `absolute`
        }
      } else {
        if (+this.$props.encyclopedia.id == +this.$props.encyclopedia.style_param - 1){
        // console.log(+this.$props.encyclopedia.id)
        return {
          '-webkit-transition': 'all 1s',/* Safari */
          transition: 'all 1s',
          'transition-delay': '0.1s',
          'transition-timing-function': 'ease',
          // display: `none`,
          opacity: 0,
          // visibility: `visible`,
          // visibility: `hidden`,
          // top: `-5px`,
          top: `0vh`,
          position: `absolute`,
          transform: 'rotate(-180deg)',
          '-webkit-transform': 'rotate(-180deg)',
          '-o-transform': 'rotate(-180deg)',
          '-webkit-transform-origin-x': '0vw'
          // transform: 'rotate(-45deg)',
          // '-webkit-transform': 'rotate(-45deg)',
          // '-o-transform': 'rotate(-45deg)',
          // '-webkit-transform-origin-x': '-15vw'
        }
      } else if (+this.$props.encyclopedia.id == +this.$props.encyclopedia.style_param + 1) {
         return {
          '-webkit-transition': 'all 1s',/* Safari */
          transition: 'all 1s',
          'transition-delay': '0.1s',
          'transition-timing-function': 'ease',
          // display: `none`,
          opacity: 0,
          // visibility: `visible`,
          // visibility: `hidden`,
          // top: `${this.$parent.mainItemsStyles['top']}px`,
          // top: `25vh`,
          top: `0vh`,
          position: `absolute`,
          transform: 'rotate(180deg)',
          '-webkit-transform': 'rotate(180deg)',
          '-o-transform': 'rotate(180deg)',
          '-webkit-transform-origin-x': '0vw'
          // transform: 'rotate(45deg)',
          // '-webkit-transform': 'rotate(45deg)',
          // '-o-transform': 'rotate(45deg)',
          // '-webkit-transform-origin-x': '-10vw'
        }
      }

      else {
        return {
          // '-webkit-transition': 'all 1s',/* Safari */
          // transition: 'all 1s',
          // 'transition-timing-function': 'ease',
          // display: `none`,
          opacity: 0,
          // visibility: `hidden`,
          // top: `${this.$parent.mainItemsStyles['top']}px`,
          // top: `25vh`,
          top: `0vh`,
          transform: 'rotate(180deg)',
          '-webkit-transform': 'rotate(180deg)',
          '-o-transform': 'rotate(180deg)',
          '-webkit-transform-origin-x': '0vw'
        }
      }
        
      }
    },
    itemWidth: function() {
      let r_img = this.$parent.$parent.$parent.r_img;
      console.log(r_img);
      return {
        width: `${r_img}px`
      }
    },
    headStyle: function() {
      let r_img = this.$parent.$parent.$parent.r_img;
      let style = this.$parent.$parent.fixStyle;
      let top_offset = parseInt(style.top, 10)-13;
      return {
        'margin-top': `${top_offset}px`,
        height: `${r_img}px`
      }
    }
  },
  computed: {
    slug_event: function() {
      var slug = this.sanitizeTitle(this.$props.encyclopedia.event);
      return slug;
    },
    slug_spot: function() {
      var slug = this.sanitizeTitle(this.$props.encyclopedia.spot);
      return slug;
    },
    // id: function (){
    //   return this.encyclopedia.id
    // },

    fixid: function (){
      return "fix"+this.encyclopedia.id;
    },
    descWithLink: function() {
      if (this.$props.encyclopedia.description.indexOf(this.$props.encyclopedia.link) > 0){
        let  index = this.$props.encyclopedia.description.indexOf(this.$props.encyclopedia.link);
        const spanStart = '<a href="'+this.$props.encyclopedia.linkText+'"> ';
        const spanEnd = '</a>';
        let newDesc = [this.$props.encyclopedia.description.slice(0, index), spanStart, this.$props.encyclopedia.description.slice(index, index+this.$props.encyclopedia.link.length), spanEnd, this.$props.encyclopedia.description.slice(index+this.$props.encyclopedia.link.length)].join('');
        return newDesc
      } else {
        return this.$props.encyclopedia.description
      }
    },
    formatDate: function(){
      return moment(this.$props.encyclopedia.date, 'MM/DD/YYYY').format('MMM DD');
    },
    formatYear: function(){
      return moment(this.$props.encyclopedia.date, 'MM/DD/YYYY').format('YYYY');
    },
    // itemStyle: function() {
    //   // console.log(this.$props.encyclopedia.id, this.$props.encyclopedia.style_param)
    //   if (+this.$props.encyclopedia.id == +this.$props.encyclopedia.style_param - 1){
    //     // console.log(+this.$props.encyclopedia.id)
    //     return {
    //       // display: `none`,
    //       visibility: `hidden`,
    //       // top: `0px`,
    //       top: `-100vh`,
    //       position: `absolute`
    //     }
    //   } else if (+this.$props.encyclopedia.id == +this.$props.encyclopedia.style_param + 1) {
    //      return {
    //       // display: `none`,
    //       visibility: `hidden`,
    //       // top: `${this.$parent.mainItemsStyles['top']}px`,
    //       top: `100vh`,
    //       position: `absolute`
    //     }
    //   } else {
    //     return {
    //       // display: `block`,
    //       visibility: `visible`,
    //       // top: `${this.$parent.mainItemsStyles['top'] / 2}px`,
    //       top: `0vh`,
    //       position: `absolute`
    //     }
    //   }
    // }
  },
  mounted: function(){
    let self = this;



    // this.currentSpot = this.$route.params.id
    this.$nextTick(function () {
      self.$parent.$parent.appendTimeline();
      // console.log(self.$route.params.id);
      self.$parent.$parent.rotateTimeline(self.$route.params.id);
      //  this.mstyle = this.activeStyle();

      
    })
    // const self = this;
    // console.log(self);
    // let element = self.$el
    // let cancelScroll = this.$scrollTo(element, 4, options)
    // let d3el = d3.select("#"+self.slug_event)
    // // console.log(d3el)
    // let formatedDate = self.formatDater(self.$props.encyclopedia.date)
    // // console.log(formatedDate)
    // // d3el.remove("text")
    // d3el.append("text").text("")
    // d3el.text(function(){
    //   return formatedDate;
    // })


    // let t = d3.transition()
    // .duration(1750)
    // .ease(d3.easeLinear);


    // let d3spotel = d3.select("#fix"+self.encyclopedia.id)
    // // console.log(d3spotel)
    // // d3spotel.style("opacity",.4)
    // // d3spotel.transition(t);
    // t.select("#fix"+self.encyclopedia.id).style("opacity",1)
// to cancel scrolling you can call the returned function
    // cancelScroll()
  }

}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
} */
/* ul {
  list-style-type: none;
  padding: 0;
} */
/* li {
  display: inline-block;
  margin: 0 10px;
} */
.item {
  opacity: 0;
}
.snap-item{
  /* -webkit-scroll-snap-coordinate: 0vw -10vh;
  -ms-scroll-snap-coordinate: 0vw -10vh;
  scroll-snap-coordinate: 0vw -10vh; */
}

.encyclopedia-item{
  /* padding: 20px 60px 20px 20px; */
  padding-left: 20px;
  width: 50vh;
  height: 100vh;
}

.item-head{
  /*position: absolute;
  top: 0vh;
  height: 50vh;*/
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.item-body{
 /* position: absolute;
  top: 50vh;*/
  padding-right: 20px;
}

.text-id{
  /*align-self: flex-end;*/
  margin-bottom: 0px;
  text-transform: lowercase;
  font-size: 20px;
  /*padding-bottom: 20px;*/
}

.text-head{
  /*align-self: flex-end;*/
  font-size: 34px;
  letter-spacing: 2px;
  text-transform: lowercase;
  line-height: 1;
  margin-top: 0px;
}

.date{
  width: 100%;
  display: inline-block;
}

.text-date{
  float: left;
  text-align: left;
  margin-bottom: 0px;
  font-size: 20px;
  font-weight: normal;
  text-transform: uppercase;
  /* font-family: 'Adobe Caslon Pro', serif;
  font-size: 18px;
  margin-top: 0px;
  margin-bottom: 2px; */
}

.text-year{
  float: right;
  text-align: right;
  margin-top: 0px;
  font-size: 20px;
  font-weight: bold;
}

p{
  width: 90%;
  display: inline-block;
  /* font-family: sans-serif; */
  font-size: 20px;
  line-height: 1.2;
  margin-top: 2px;
  margin-bottom: 0px;
}
</style>
