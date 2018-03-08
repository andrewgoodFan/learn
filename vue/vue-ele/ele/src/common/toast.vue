<template>
	<div class="toast">
		<p>{{toastMsg}}</p>
	</div>
</template>
<script>
	export default {
		name: 'toast',
		data(){
			return {

			}
		},
		props:['toastMsg']
	}
</script>
<style scoped>
	.toast {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 2rem;height: 1rem;
		background: rgba(0,0,0,.9);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: .1rem
	}
	.toast p {
		text-align: center;
		color: white;
		font-size: .3rem;
		line-height: 100%
	}
</style>