<template>
	<div class="container">
		<header>
			<router-link to="/">&lt;</router-link>
			<strong>{{cityInfo.name}}</strong>
			<router-link to="/">切换城市</router-link>	
		</header>
		<div class="search">
			<form action="">
				<input class="text" type="text" placeholder="输入学校、商务楼、地址" v-model="val">
				<span class="reset" v-show="val?true:false" @click="reset">x</span>
				<div class="toast" v-if="showToast" @click.prevent="showToast = !showToast">
					<p>请填写此字段</p>
				</div>
				<input class="get" type="button" value="提交" @click.prevent="request">
			</form>
		</div>
		<div>
			<div class="history" v-show="show">
				<p>搜索历史</p>
				<ul>
					<li></li>
				</ul>
			</div>
			<div>
				<p v-if="result">很抱歉，搜索无结果</p>
				<ul class="search-list" v-else>
				<!-- <li>
					<h4>11111</h4>
					<p>222222</p>
				</li> -->
				<router-link tag="li" :to="'/takeout/'+item.geohash" v-for="(item,index) in searchList" :key="index">
					<h4>{{item.name}}</h4>
					<p>{{item.address}}</p>
				</router-link>
			</ul>
			</div>
			
		</div>
	</div>
</template>
<script>
	import url from '../common/http'
	export default {
		name: 'city',
		data () {
			return {
				cityInfo: {},
				val: '',
				searchList: [],
				show: true,
				result: false,
				showToast: false
			}
		},
		created() {
			var cityId = this.$route.params
			this.$ajax.get(url+'/v1/cities/'+cityId.id).then((res) => {
				this.cityInfo = res.data
			})
		},
		methods: {
			request () {
				if(this.val){
						this.$ajax.get(url+'/v1/pois',{
					params: {
						city_id:this.cityInfo.id,
						keyword: this.val,
						type: 'search'
					}
				}).then((res) => {
					this.show = false
					if(res.data.length){
						this.result = false
						this.searchList = res.data
						console.log(res)
					}else{
						this.result = true
					}
					
				})
			}else{
				this.showToast = !this.showToast
			}
			
			},
			reset () {
				this.val = ''
			},
			reserve (val) {
				val = !val
			}
		}
	}
</script>
<style scoped> 
	header {
		height: 1rem;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 .1rem;
		color: white;
		align-items: center;
		background:#3190e8;
		font-size: .28rem
	}
	header strong {font-weight: bold;}
	.search {padding: .2rem 0;position: relative;}
	.search .text {
		width: 66%;
		display: block;
		margin: 0 auto;
		line-height: .6rem;
		outline: none;
		box-sizing: border-box;
		padding: 0 .4rem 0 .1rem;
	}
	.toast {
		position: fixed;
		top: 1.84rem;
		left: 50%;
		transform: translate(-50%);
		background: rgba(1,1,1,.6);
		width: 3rem;
		line-height: .8rem;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: .5rem;
	}
	.reset {
		display: block;
		font-size: .4rem;
		line-height: 1.3;
		color: blue;
		text-align: center;
		position: absolute;
		top: .25rem;
		right: 1.45rem;
	}
	.search .get {
		width: 66%;
		display: block;
		margin: .2rem auto 0;
		height: .6rem;
		text-align: center;
		line-height: .6rem;
		background:#3190e8;
		border: none;
		border-radius: .05rem;
		color: white;
		font-size: .26rem;
		outline: none;
	}
	.history p {border-top: 1px solid #e4e4e4;border-bottom: 1px solid #e4e4e4;}
	.search-list li {
		box-sizing: border-box;
		padding: 0 .1rem;
		border-bottom: 1px solid #e4e4e4
	}
	.search-list h4 {
		font-size: .3rem;
		line-height:1.7; 
		margin-bottom:.1rem;
		font-weight: normal;
	}
	.search-list p {
		font-size: .24rem;
		line-height: 1.7
	}
</style>