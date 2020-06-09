import axios from 'axios'
import VueCookie from 'vue-cookie'

// export default axios.create({
//   baseURL: 'http://localhost:5000',
//   headers: {
//     'X-Custom-Header': 'foobar',
//     Authorization: VueCookie.get('usertoken')
//   }
// })

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['Authorization'] = VueCookie.get('usertoken');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


axios.interceptors.request.use(config => {
  Object.assign(config.headers, {...config.headers, Authorization: VueCookie.get('usertoken')})
  return config;
});

export default axios;