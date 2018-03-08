<template>
	<div class="car-wrap">
		<div class="car-logo">
			<span></span>
			<span v-show="num" class="car-num">{{num}}</span>
		</div>
		<div class="car-price">
			<strong>￥{{price.toFixed(2)}}</strong>
			<em>配送费￥5</em>
		</div>
		<div class="car-post">
			<button v-if="num">去结算</button>
			<p v-else>还差￥20起送</p>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'car',
		data(){
			return {
				//重写props副本
				 num: this.newNum,
				 price: this.allSelectedPrice
			}
		},
		props: ['newNum','allSelectedPrice'],
		watch: {
			newNum(val){
				this.num = val
			},
			allSelectedPrice(val){
				this.price = val
			}
		}
	}
</script>
<style scoped>
	.car-wrap {height: 1rem;width: 100%;position: fixed;left: 0;bottom: 0;display: flex;;justify-content: space-between;box-sizing: border-box;padding: 0 0 0 .2rem;background: #3d3d3f}
	.car-logo {border-radius: 50%;width: .8rem;height: .8rem;border: .1rem solid #eee;position: relative;top: -.3rem;background: inherit;box-sizing: border-box;}
	.car-num {line-height: 100%;text-align: center;padding: .16rem;background: red;border-radius: 50%;position: absolute;top: -.2rem;right: -.2rem;color: white}
	.car-price strong {font-size: .5rem;color: white;line-height: 1.2;display: block;}
	.car-price em {font-style: normal;line-height: 100%;color: white;font-size: .24rem}
	.car-post {line-height: 1rem;color: white;font-size: .4rem;text-align: center;width: 3rem}
	.car-post button {height: 100%;border: none;background: green;width: 100%;color: white;display: block}
</style>