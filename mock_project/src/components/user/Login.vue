<template>
  <div class="login-box">
    <div class="row" style="margin-left: 110px">
      <Language> </Language>
    </div>
    <div class="login-logo">
      <b>Admin</b>VDN
    </div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">{{$t('signinMsg')}}</p>
        <div v-if="error==1" class="alert alert-danger alert-dismissible fade show" role="alert">
          {{$t('incorrect')}}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form v-on:submit.prevent="login">
          <div class="input-group mb-3">
            <input type="email" name="email" class="form-control" required :placeholder="$t('email')" v-model="email">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input type="password" class="form-control" required :placeholder="$t('password')" v-model="password">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <button type="submit" class="btn btn-primary btn-block">{{$t('signin')}}</button>
          </div>
        </form>
        <div class="social-auth-links text-center mb-3">
          <p>- {{$t('or')}} -</p>
          <fb-signin-button
            :params="fbSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            {{$t('signinFb')}}
          </fb-signin-button>
        </div>

        <p class="mb-0">
          <router-link to="/register" class="text-center">{{$t('newRegister')}}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../callApi/Api";
import EventBus from "../EventBus";
import VueCookie from "vue-cookie";
import facebookLogin from 'facebook-login-vuejs';

import i18n from '../../config/i18n';

import Language from './Language'

export default {
  data() {
    return {
      error: 0,
      email: "",
      password: "",
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      }
    };
  },
  components: {
    facebookLogin,
    Language
  },
  methods: {
    login() {
      this.error = 0
      axios
      .post("/users/login", {
        email: this.email,
        password: this.password
      })
      .then(res => {
        if(res.data.token){
          // console.log(res.data.token);
          VueCookie.set("usertoken", res.data.token, { expires: '1h' });
          this.emitMethod();
          this.$router.push({ name: "homepage", path: "/" });
        }
        else {
          this.password = ""
          this.error = 1
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    emitMethod() {
      EventBus.$emit("logged-in", "loggedin");
    },

    onSignInSuccess (response) {
      FB.api('/me', { fields: 'id,name,email, picture' }, data => {
        console.log(`Facebook Name: , ${data.name}.`)
        console.log(`Facebook Email: , ${data.email}.`)
        console.log(`Facebook ID: , ${data.id}.`)
        console.log(`Facebook Avatar: , ${data.picture.data.url}.`)
        axios.post('users/oauth/facebook', {
          id: data.id,
          name: data.name,
          email: data.email,
          picture: data.picture.data.url
        })
        .then( res => {
          // console.log(res.data.token)
          VueCookie.set("usertoken", res.data.token, { expires: '1h' });
          this.emitMethod();
          this.$router.push({ name: "homepage", path: "/" });
        })
        .catch(err => {
          console.log(err);
        });
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
};
</script>
<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
.fb-signin-button:hover {
  cursor: pointer;
}
</style>