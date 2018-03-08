<template>
	<div class="container">
		<header>
			<span class="goback">&lt;</span>
			<div class="main">
				<img :src="'http://cangdu.org:8001/img/'+headData.image_path" alt="">
				<div class="intro">
					<h4>{{headData.name}}</h4>
					<p>商家配送/分钟送达/{{headData.piecewise_agent_fee.tips}}</p>
					<p>公告：{{headData.promotion_info}}</p>
				</div>
			</div>
			<ul class="activity" v-if="headData.activities.length">
				<li v-for="(item,index) in headData.activities">
					<span class="icon"><i>{{item.icon_name}}</i><i>{{item.description}}</i></span>
					<span @click="showShade = !showShade">{{headData.activities.length}}个活动&gt;</span>
				</li>
			</ul>
			<span class="go-next">&gt;</span>
		</header>
		<p class="title">
			<span @click="foodFlag = true" :class="(foodFlag?'active': '')">商品</span>
			<span @click="foodFlag = false" :class="(foodFlag?'': 'active')">评价</span>
		</p>
		<div class="shop-wrap" ref="menuWrap">
			<ul class="shop-left">
				<li @click="selectMenu(index)" :class="{'menuActive':currentIndex==index}" v-for="(item,index) in foodList">{{item.name}}</li>
			</ul>
			<div class="shop-right" ref="shopWrap">
				<ul class="right-list">
					<li class="scroll" v-for="(item,index) in foodItems">
						<h4><strong>{{item.name}}</strong><span>{{item.description}}</span></h4>
						<div class="right-item" v-for="(food,key) in item.foods">
							<img :src="'http://cangdu.org:8001/img/'+food.image_path" alt="">
							<div>
								<h5>{{food.name}}</h5>
								<p>{{food.tips}}</p>
							</div>
							<div class="price">
								{{food.specfoods[0].price}}
								<p v-if="food.specfoods.length>1"><button @click="chooseSize(index,key)">選規格</button></p>
								<p v-else><button v-show="food.num" @click="food.num -= 1">-</button><span v-show="food.num">{{food.num}}</span><button @click="food.num += 1">+</button></p>
								
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="shade" v-show="showShade">
			<h4>{{headData.name}}</h4>
			<ul>
				<li v-for="(item,index) in headData.activities">
					<h5>{{item.name}}</h5>
					<p>{{item.description}}</p>
				</li>
			</ul>  
			<span class="close" @click="showShade = !showShade">X</span>
		</div>
		<div class="size-shade" v-if="foodItems[indexList[0]]" v-show="clickFlag">
			<div class="size">
				<h4>{{foodItems[indexList[0]].foods[indexList[1]].name}}</h4>
				<p>规格</p>
				<ul>
					<li @click="selectedPriceIndex = index" :class="selectedPriceIndex==index?'active': ''" v-for="(item,index) in foodItems[indexList[0]].foods[indexList[1]].specfoods">{{item.specs_name}}</li>
				</ul>
				<p  class="car-wrap"><span>￥{{foodItems[indexList[0]].foods[indexList[1]].specfoods[selectedPriceIndex].price}}</span><button @click="chooseFood">加入购物车</button></p>
				<span class="popclose" @click="clickFlag = !clickFlag">X</span>
			</div>
		</div>
		<buy-car :newNum="allSelectedNum" :allSelectedPrice="allSelectedPrice"></buy-car>	
	</div>
</template>
<script>
		import url from '../../common/http'
		import BScroll from 'better-scroll'
		import buyCar from '../../common/car'
	  export default {
	  	name: 'shop',
	  	data () {
	  		return {
	  			headData: {},  
	  			showShade: false,
	  			foodFlag: true,
	  			foodList: [],
	  			timer: '',
	  			foodScroll: '',
	  			menuScroll: '',
	  			heightList: [],
	  			scrollY: 0,
	  			flag: true,
	  			clickFlag: false,
	  			indexList: [],
	  			selectedPriceIndex: 0,
	  			firstName: {
	  				tip: false
	  			}
	  		}
	  	},
	  	created() {
	  		//获取商铺详情
	  		this.$ajax.get(url+'/shopping/restaurant/'+this.$route.params.id).then((res) => {
	  			this.headData = res.data
	  		
	  		})
	  		//获取食物列表
	  		this.$ajax.get(url+'/shopping/v2/menu',{params: {
	  			restaurant_id: this.$route.params.id
	  		}}).then((res) => {
	  			this.foodList = res.data
	  			//console.log(this.foodList)
	  			this.$nextTick(() => {
	  					this.calculateHeight()
	  			this.initScroll()
	  			})
	  			
	  		})
	  	},
	  	computed: {
	  		currentIndex () {
	  					for(let i=0;i<this.heightList.length;i++){
	  				let height1 = this.heightList[i]
	  				let height2 = this.heightList[i+1]
	  			
	  				if( !height2 || (this.scrollY >= height1 && this.scrollY < height2 )){
	  					return i
	  				}
	  			}
	  			return 0
	  			},
	  			foodItems () {
	  				for(let i=0;i<this.foodList.length;i++){
	  					for(let j=0;j<this.foodList[i].foods.length;j++){
	  						this.$set(this.foodList[i].foods[j],'num',0)
	  					}
	  				}
	  			return this.foodList
	  			},
	  			allSelectedNum () {
	  				var num = 0;
	  				this.foodItems.forEach((todo,index) => {
	  					todo.foods.forEach((item,key) => {
	  						num += item.num
	  						//num[1] += item.num*item.price
	  						//console.log(item.price)
	  						//console.log(item)
	  					})
	  				})
	  				//console.log(num)
	  				return num
	  			},
	  			allSelectedPrice() {
	  				var price = 0;
	  				this.foodItems.forEach((todo,index) => {
	  					//console.log(todo)
	  					todo.foods.forEach((item,key) => {
	  						//console.log(item.specfoods.length)
	  						if(item.specfoods.length>1){
									//price += item.specfoods[this.selectedPriceIndex].price*item.num
									//console.log(item.specfoods[this.selectedPriceIndex])
									if(item.specfoods[this.selectedPriceIndex]){
										price += item.specfoods[this.selectedPriceIndex].price*item.num
										//console.log(price)
									}
	  						}else {
	  							console.log(item.specfoods[0].price)
	  							console.log(item.num)
	  							price += item.specfoods[0].price*item.num
	  						}
	  					})
	  				})
	  				//console.log(price)
	  				return price
	  			}
	  	},
	  	methods: {
	  		initScroll () {
	  			//初始化
	  			this.foodScroll = new BScroll(this.$refs.shopWrap,{
	  				scrollY: true,
	  				click: true,
	  				probeType: 3
	  			})
	  				this.menuScroll = new BScroll(this.$refs.menuWrap,{
	  				scrollY: true,
	  				click: true
	  			})
	  			//設置滾動監

	  				this.foodScroll.on('scroll',(pos) => {
	  				this.scrollY = Math.abs(Math.round(pos.y))
	  			})

	  		
	  		},
	  		calculateHeight () {
	  		
	  			let aLi = Array.from(this.$refs.shopWrap.children[0].children)
	  			
	  			let height = 0
	  			aLi.forEach((item,index) => {
	  				this.heightList.push(item.offsetTop)
					})
			
	  		},
	  		selectMenu (index,event) {

	  			//if(!event._constructed){return}
	  				let arr1 = this.$refs.shopWrap.getElementsByTagName('li')
	  				let el = arr1[index]
	  				 this.foodScroll.scrollToElement(el, 100);

	  			// this.currentIndex = index
	  			// this.flag = false
	  			// this.foodScroll.scrollTo(0,-this.heightList[index],400)

	  		},
	  		 chooseSize (index,key) {
	  		 		this.firstName.tip = !this.firstName.tip
	  		 		this.selectedPriceIndex = 0
	  		 		this.clickFlag = !this.clickFlag
	  		 		this.indexList = []
	  		 		this.indexList.push(index)
	  		 		this.indexList.push(key)

	  		 		//console.log(this.foodItems[this.indexList[0]].foods[this.indexList[1]].specfoods)
	  		 },
	  		 //选择规格计数
	  		 chooseFood(){
	  		 	this.foodItems[this.indexList[0]].foods[this.indexList[1]].num += 1;
	  		 }
	  	},
	  	components: {
	  		buyCar
	  	},
	  	watch: {
	  		'firstName.tip':function(val){
	  			console.log(val)
	  		}
	  	}
	  }
</script>
<style scoped>
	::-webkit-scrollbar
	{
	    background: transparent;
	    border: none;
	    outline: none;
	}
	::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
		width: 0;
		height: 0;
      background: transparent;
  }
	.container {height: 100vh;overflow: hidden;}
	header {
		position: relative;
/*		height: 1rem;*/
		box-sizing: border-box;
		padding-top: .5rem;
		background: rgba(0,0,0,.6);
		color: white
	}
	.goback {
		position: absolute;
		top: 0;
		left: 0;
		line-height: .4rem;
		font-size: .38rem;
		color: white
	}
	.main {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.main img {
		display: block;
		width: 1.5rem;height: 1.5rem
	}
	.intro p {margin: .1rem 0}
	.go-next {
			position: absolute;
		top: 40%;
		right: .1rem;
		line-height: .4rem;
		font-size: .38rem;
		color: white
	}
	.activity li {
		display: flex;
		justify-content: space-between;
		padding: 0 .2rem;
		box-sizing: border-box;
		font-size: .28rem;
		line-height: 1.7
	}
	i {font-style: normal;}
	.icon i:first-child {
		display: inline-block;
		background: orange;
		margin-right: .2rem
	}
	.shade {position: fixed;left: 0;top: 0;width: 100%;height: 100%;text-align: center;background: rgba(0,0,0,.8);color: white;}
	.shade h4 {text-align: center;line-height: 1.7;font-size: .4rem;width: 100%;margin-top: .5rem}
	.shade ul {width: 100%;margin-top: 1rem}
	.close {display: block;width: 1.5rem;height: 1.5rem;position: absolute;bottom: .2rem;left: 50%;transform: translateX(-50%);border: 1px solid #eee;text-align: center;line-height: 1.5rem;font-size: .8rem;border-radius: 50%}
	.title {
		display: flex;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		font-size: .4rem;
		border-bottom: 1px solid #eee
	}
	.title span {flex:1;}
	.title span.active {text-decoration: underline;color: #3190e8}
	.shop-wrap {
		display: flex;
		justify-content: center;
		/*height: 100%*/
		height: calc(100vh - 3rem);
	}
	.shop-left {width: 30%;}
	.shop-left li {font-size: .4rem;text-align: center;line-height: 1.7;padding: .2rem 0;border-bottom: 1px solid #ededed;}
	.shop-right {width: 70%;overflow: auto;position: relative;}
	.right-list li{
		padding: .2rem 0;
	}
	.right-list h4 strong {
		font-size: 0.4rem;
    color: #666;
    font-weight: bold;
	}
	.right-list h4 span {
		font-size: 0.2rem;
    color: #999;
    width: 30%;
    overflow: hidden;
    margin-left: .2rem
	}
	.right-list img {width: 1.5rem;height: 1.5rem;display: block;margin: .2rem}
	.right-item {display: flex;font-size: .22rem;line-height: 1.5;flex-wrap: wrap;}
	.right-item h5 {font-size: .3rem;margin: .2rem 0}
	.menuActive {border-left: .3rem solid blue;background: white}
	.price {display: flex;align-items: center;justify-content: space-between;width: 100%;white-space: nowrap;box-sizing: border-box;padding-left: 1.7rem;}
	.price p {width: 100%;line-height: .5rem;display: flex;justify-content:flex-end;align-items: center;}
	.price button {height: .5rem;line-height: .5rem;text-align: center;display: block;margin: 0 .2rem}
	.size-shade {position: fixed;top: 0;left: 0;background: rgba(0,0,0,.6);width: 100%;height: 100%}
	.size {position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);background: white;padding: .3rem 0}
	.size h4 {text-align: center;line-height: 1.7;font-size: .3rem;}
	.size ul {display: flex;justify-content: center;}
	.size ul li {padding: .3rem 0;border: .01rem solid black;border-radius: .1rem;margin:.2rem;text-align: center;line-height: 100%;width: .6rem}
	.size ul li.active{border: .01rem solid blue}
	.size p {font-size: .24rem;}
	.popclose {position: absolute;top: .2rem;right: .2rem;font-size: .4rem;font-weight: bold;line-height: 1;color: black}
	.car-wrap {display: flex;justify-content: space-between;box-sizing: border-box;padding: 0 .3rem;margin-top: .4rem}
	.car-wrap span {color: red}
</style>
