import Http from './server';
class API extends Http {
    /**
     *@name 登录
     * @param {*} data
     * @returns result 
     * @memberof API
     */
    async login (data) {
        try {
            let result = await this.request('post', '/login', data);
            return result;
        } catch (err) {
            throw err;
        }
    }
    async regester (data) {
        try {
            let result = await this.request('post', '/regester', data);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default new API();