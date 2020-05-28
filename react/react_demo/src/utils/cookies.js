import Cookies from 'js-cookie';
export const getToken = () => {
    const token = Cookies.get('token');
    return token || false;
}

export const setToken = (token, expires = 1) => {
    if (!token) removeCookie('token');
    Cookies.set('token', token, {expires});
}

// common
export const removeCookie = (name) => {
    Cookies.remove(name);
}