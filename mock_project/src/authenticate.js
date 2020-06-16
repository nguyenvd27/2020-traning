import VueCookie from 'vue-cookie'
import axios from './callApi/Api'

const isAuth = () => {
  return new Promise((resolve, reject) => {
    // const check = 
    if(VueCookie.get('usertoken') === null){
      reject('false')
    }
    else {
      axios.post('/api/authenticate',
        {
          token: VueCookie.get('usertoken')
        }
      ).then((res) => {
        if(res.data.message == 'false'){
          reject('false')
        }else{
          resolve('true')
        }
      }).catch((err) => {
        reject('false')
      })
    }
  })
}

export {isAuth}