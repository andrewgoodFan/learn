import {
	ADD_ADDRESS
} from './mutation-types'

export default {
	[ADD_ADDRESS](state,res) {
		state.latitude = res.data.latitude;
		state.longitude = res.data.longitude;
		console.log(state)
	}

}