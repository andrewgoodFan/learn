<template>
	<div     class="container">
		<toast :toastMsg="showMsg" v-show="showToast"></toast>
		<head-top :title="titleData" :showSearch="search" :latitude="latitude" :longitude="longitude"></head-top>
		<ul class="top-list">
			<router-link tag="li" to="/" v-for="(item,index) in foodList" :key="index">
				<img :src="baseURI+item.image_url" alt="">
				<p>{{item.title}}</p>
			</router-link>
		</ul>
		<div class="siblings">
			<h4>附近商家</h4>
			<ul>
				<router-link class="shop-item" tag="li" :to="/shop/+geohash.geohash+'/'+item.id" v-for="(item,index) in shopList">
						<img :src="'http://cangdu.org:8001/img/'+item.image_path" alt="">
						<div class="item-right">
							<div>
								<h5>{{item.name}}</h5>
								<p class="evaluate"><span>{{item.rating}}</span>{{item.recent_order_num}}</p>
								<p>{{item.float_minimum_order_amount}}￥起送/{{item.piecewise_agent_fee.tips}}</p>
							</div>
							<div>
								<p class="support"><span v-for="(support,index) in item.supports">{{support.icon_name}}</span></p>
								<p>{{item.delivery_mode.text}}</p>
								<p>{{item.distance}}/{{item.order_lead_time}}</p>
							</div>
						</div>
				</router-link>
			</ul>
		</div>
		<foot :latitude="latitude" :longitude='longitude' :current="current"></foot>
	</div>  
</template>
<script>
	import headTop from '../../common/head'
	import toast from '../../common/toast'
	import foot from '../../common/footer'
	import url from '../../common/http'
	import {mapMutations} from 'vuex'
	export default {
		name: 'takeout',
		data () {
			return {
				geohash: {},
				titleData: {},
				foodList: [],
				baseURI: 'https://fuss10.elemecdn.com',
				search: true,
				longitude: '',
				latitude: '',
				shopList: [],
				showMsg: '正在加载中...',
				showToast: false,
				current: 0
			}  
		},
		components: {
			headTop,
			toast,
			foot
		},
		created () {
			this.showToast = ! this.showToast
			var _this = this;
			//根据参数准确定位地址
			this.geohash = this.$route.params
			this.$ajax.get(url+'/v2/pois/'+this.geohash.geohash).then((res) => {
				this.titleData = res.data.name
				this.longitude =res.data.longitude
				this.latitude = res.data.latitude
				sessionStorage.setItem('latitude',this.latitude)
				sessionStorage.setItem('longitude',this.longitude)
				this.ADD_ADDRESS(res)
				
			}).then(function(){
					console.log(_this.latitude+'--'+_this.longitude)
				//获取商铺列表
			_this.$ajax.get(url+'/shopping/restaurants',{
				params:{
					latitude:  _this.latitude,
					longitude: _this.longitude
				}
			}).then((res) => {
				console.log(res)
				_this.shopList = res.data
				_this.showToast =! _this.showToast
			})
			})
			//获取食品分类列表
			this.$ajax.get(url+'/v2/index_entry').then((res) => {
				this.foodList = res.data
			})
		},
		methods: {
			...mapMutations(['ADD_ADDRESS'])
		}
	}
</script>
<style scoped>
	.container {
		position: relative;
		padding-top: 1rem
	}
	.top-list {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.top-list li {
		width: 25%;
	}
	.top-list li img {
		width: 80%;
		display: block;
		margin: 0 auto;
	}
	.top-list p {
		text-align: center;
		line-height: 1.7;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.siblings h4 {font-size: .2rem;line-height: 1.7;color: black;margin: .2rem .2rem 0;}
	.shop-item {
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 .2rem;
		margin: .3rem 0;
		border-bottom: 1px solid #eee
	}
	.shop-item img {
		display: block;
		width: 1.5rem;
		height: 1.5rem;
		margin-right: .1rem
	}
	.item-right {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item-right h5 {
		font-size: .3rem;line-height: 1.7;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		max-width: 3rem
	}
	.item-right div:last-child {text-align: right;}
	.evaluate {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.evaluate span {color: #ff6000;margin-right: .2rem}
	.support span {margin: 0 .05rem}
</style>