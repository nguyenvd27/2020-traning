import VueCookie from 'vue-cookie'
import axios from './callApi/Api'

const isAuth = () => {
  return new Promise((resolve, reject) => {
    const check = VueCookie.get('usertoken')
    if(check != null){
      axios.post('/api/authenticate',
        {
          token: check
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
    else {
      reject('false')
    }
  })
}

export {isAuth}