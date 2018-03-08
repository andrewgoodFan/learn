<template>
	<div class="container">

		<header>
			<span @click="goback">&lt;</span>
			搜索
		</header>
			<form class="form" action="">
				<input type="text" v-model="val" placeholder="请输入商家或美食名称">
				<input type="button" value="提交" @click="find">
			</form>
			<ul v-show="showHistory">
				<li>搜索历史</li>
				<li class="history-item" v-for="(item,index) in historyList"><span>{{item}}</span><span @click="remove(index)">X</span></li>
			</ul>
			<div class="result-wrap" v-show="showResult">
				<p v-if="noResult">很抱歉，搜索无结果！</p>
				<ul class="result-list" v-else>
					<router-link tag="li" :to="{name:'takeout',params:{'latitude':latitude,'longitude':longitude}}" v-for="(item,index) in resultList">
						<h4>{{item.name}}</h4>
						<p>{{item.address}}</p>
					</router-link>
				</ul>
			</div>

			<foot :latitude="latitude" :longitude='longitude' :current="current"></foot>
	</div>
</template>
<script>
	import foot from '../../common/footer'
	import url from '../../common/http'
	export default {
		name: 'search',
		data () {
			return {
				val: '',
				current: 1,
				latitude: '',
				longitude: '',
				geohash: '',
				resultList: [],
				noResult: false,
				historyList: [],
				showHistory: false,
				showResult: false
			}
		},
		created(){
			let msg = this.$route.params
			this.latitude = sessionStorage.getItem('latitude')
			this.longitude =sessionStorage.getItem('longitude')
			this.geohash = msg.geohash
			console.log(sessionStorage.getItem('latitude'))
		},
		methods: {
			goback(){
				window.history.length>1?
				this.$router.go(-1):this.$router.push('/')
			},
			find () {
				if(this.val){
					this.showHistory = false
					this.showResult = true
					this.$ajax.get(url+'/v4/restaurants',{params:{
						geohash: this.geohash,
						keyword: this.val
					}}).then(res => {
						//console.log(res)
						this.resultList = res.data
						if(this.resultList.length<=0){
							this.noResult = true
						}else{
							this.noResult = false
						}
						this.historyList.push(this.val)
					})
				}
			},
			remove (index) {
				this.historyList.splice(index,1)
				if(this.historyList.length<=0){
					this.showHistory = false
				}
			}
		},
		watch: {
			val: function (newVal) {
				if(!newVal){
					this.showResult = false
					if(this.historyList.length>0){
						this.showHistory = true
					}
				}
			}
		},
		components:{
			foot
		}
	}
</script>
<style scoped>
	header {
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		color: white;
		background: #3190e8;
		font-size: .5rem;
		position: relative;
	}
	header span {
		position: absolute;
		left: .2rem;
		top: 0;
		display: block;
		height: 100%;
		font-size: .5rem;
		color: white;
		line-height: 1rem
	}
	.form {
		display: flex;
		padding: .3rem;
		justify-content: space-between;
	}
	.form input {display: block;font-size: .4rem;padding: .1rem}
	.form input[type="button"] {
		background: #3190e8;
		color: white;
		border:none;
		border-radius: .08rem
	}
	.history-item {
		display: flex;
		justify-content: space-between;
		padding: 0 .3rem;
		font-size: .3rem;
		line-height: 1.7
	}
	.result-list li {
		font-size: .26rem;
		line-height: 1.7;
		box-sizing: border-box;
		padding: 0 .3rem;
		margin: .2rem 0;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee
	}
	.result-list p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>