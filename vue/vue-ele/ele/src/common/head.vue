<template>
	<div class="header">
		<header>
			<router-link :to="{name:'search',params:{latitude:latitude,longitude:longitude}}" v-if="showSearch">
				<span>搜索</span>
			</router-link>
			<router-link :to="-1" v-else>
				<span>&lt;</span>
			</router-link>
			<router-link to="/"><strong>{{title}}</strong></router-link>
			<div>
				<router-link to="/">登录</router-link>|
				<router-link to="/">注册</router-link>
			</div>	
		</header>
	</div>
</template>
<script>
	export default {
		data () {
			return {

			}
		},
		props: ['showSearch','title','latitude','longitude']
	}
</script>
<style scoped>
	.header{
	
		height: .8rem;
		background: #3190e8;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	.header header {
		height: 100%;
		color: white;
			display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 .1rem;
	}
	.header strong {
		width: 4rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		    text-align: center;
	}
	.footer li:first-child {color: red}
</style>