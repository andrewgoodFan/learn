<template>
	<ul class="footer">
		<router-link :class="(current==0?'active': '')" tag="li" :to="'/takeout/'+latitude+','+longitude">外卖</router-link>
		<router-link :class="(current==1?'active': '')" tag="li" :to="{name:'search',params:{latitude:latitude,longitude:longitude}}">搜索</router-link>
		<router-link :class="(current==2?'active': '')" tag="li" to="">订单</router-link>
		<router-link :class="(current==3?'active': '')" tag="li" to="">我的</router-link>
	</ul>
</template>
<script>
	export default {
		name: 'foot',
		data() {
			return {}
		},
		props: ['latitude','longitude','current']
	}
</script>
<style scoped>
	.footer {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		color: black;
		font-weight: bold;
		font-size: .4rem;
		background: white;
	}
	.footer li{
		flex: 1
	}
	.footer li.active {color: red}
</style>