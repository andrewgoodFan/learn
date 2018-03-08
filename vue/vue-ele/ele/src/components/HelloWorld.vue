<template>
 <div class="container">
   <div class="head">
     <h1><a href="javascript:;">ele.me</a></h1>
     <div>
       <a href="javascript:;">登录</a>|
       <a href="javascript:;">注册</a>
     </div>
   </div>
   <div class="gps">
     <p><span>当前定位城市</span><i>定位不准时，请在城市列表中选择</i></p>
     <div>
      <router-link class="gps-btn" :to="'/city/'+guessCity.id">
       <strong>{{guessCity.name}}</strong><i>&gt;</i>
     </router-link>
   </div>  
   </div>
   <div class="host">
     <h2>热门城市</h2>
     <ul>
       <router-link tag="li" :to="'/city/'+item.id" v-for="(item,key) in hotList" :key="item.id">{{item.name}}</router-link>
     </ul>
   </div>
   <div class="word" v-for="(newItem,index1) of newList" :key="index1">
     <h2>{{index1}}</h2>
     <ul>
       <router-link tag="li" :to="'/city/'+item.id" v-for="(item,index) in newItem" :key="index">{{item.name}}</router-link>
     </ul>
   </div>
 </div>
</template>

<script>
import url from '../common/http'
export default {
  name: 'HelloWorld',
  data () {
    return {
      guessCity: '',
      hotList: [],
      classifyList: []
    }
  },
  created (){
    console.log(url)
    var that= this;
   this.$ajax.get(url+'/v1/cities',{
    params: {
      type: 'guess'
    }
   }).then(function(res){
    that.guessCity = res.data
    console.log(res.data)
   })
   this.$ajax.get(url+'/v1/cities',{
    params: {
      type: 'hot'
    }
   }).then((res) => {
    this.hotList = res.data
      //console.log(this.hotList)
   })
   this.$ajax.get(url+'/v1/cities',{
    params: {
      type: 'group'
    }
   }).then((res) => {
    console.log(res.data)
    this.classifyList = res.data
   })
  },
  computed: {
    newList () {
      var arr = Object.keys(this.classifyList).sort();
      var newList = {}
      for(let i =0;i<arr.length;i++){
        newList[arr[i]] = this.classifyList[arr[i]]
      }
      return newList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
i{font-style: normal;color: black}
a{text-decoration: none;}
li{list-style: none;}
.container {padding-top: 1rem;background: #eeeeee}
.head {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 .1rem;
  color: white;
  height: .8rem;
  align-items: center;
  background:#3190e8;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  
}
.head a {color: white;font-size: .3rem;}
.gps p {
  display:flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: .1rem .2rem;
  font-size: .28rem;
  border-bottom: 1px solid #eee;
  background: white
}
.gps div {
  height: .6rem;
   border-bottom: 1px solid #eee;
   background: white
}
.gps div .gps-btn {
  height: 100%;
  display: flex;
  justify-content: space-between;
   align-items: center;
   box-sizing: border-box;
   padding: 0 .2rem;
   font-size: .28rem
}
.gps .gps-btn strong {color:#3190e8 }
h2 {padding-left: .2rem;line-height: .6rem;font-size: .28rem}
.host ul,.word ul {
  border-top: 1px solid #e4e4e4;
  display: flex;
  flex-wrap: wrap;
  background: white
}
.host ul li,.word ul li {
  width: 25%;
  height: 1rem;
  box-sizing: border-box;
  border-bottom: .01rem solid #e4e4e4;
  border-right: .01rem solid #e4e4e4;
  text-align: center;
  line-height: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.word {margin: .2rem 0;border-top: 1px solid #e4e4e4;background: white}
</style>
