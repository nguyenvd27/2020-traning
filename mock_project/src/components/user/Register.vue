<template>
  <div class="register-box">
    <div class="row" style="margin-left: 110px">
      <Language> </Language>
    </div>
  <div class="register-logo">
    <a><b>Admin</b>VDN</a>
  </div>

  <div class="card">
    <div class="card-body register-card-body">
      <p class="login-box-msg">{{$t('newRegister')}}</p>
      <div v-if="errorLength==1" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{$t('errorLength')}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div v-if="errorMatching==1" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{$t('errorMatching')}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div v-if="errorEmail==1" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{$t('errorEmail')}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <br>
      <form v-on:submit.prevent="register">
        <div class="input-group mb-3">
          <input type="text" class="form-control" required v-model="name" :placeholder="$t('name')">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="email" class="form-control" required v-model="email" :placeholder="$t('email')">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" required v-model="password" :placeholder="$t('password')">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" required v-model="confirmPassword" :placeholder="$t('confirmPassword')">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button class="btn btn-primary btn-block" type="submit">{{$t('register')}}</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

      <router-link to="/login" class="text-center">{{$t('haveMember')}}</router-link>
    </div>
    <!-- /.form-box -->
  </div><!-- /.card -->
</div>
</template>

<script>
import axios from '../../callApi/Api'
import Language from './Language'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorLength: 0,
      errorMatching: 0,
      errorEmail: 0
    }
  },
  methods: {
    register () {
      this.errorLength = 0
      this.errorMatching = 0
      this.errorEmail = 0
      
      if(this.password.length < 6 || this.confirmPassword.length < 6){
        this.errorLength = 1
      }else {
        if(this.password !== this.confirmPassword){
          this.errorMatching = 1
        }else {
          axios.post('/users/register',
            {
              name: this.name,
              email: this.email,
              password: this.password
            }
          ).then((res) => {
            if(res.data.error != null){
              this.errorEmail = 1
            }else {
              this.$router.push({ name: 'login', path: '/login' })
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      }
    }
  },
  components: {
    Language
  }
}
</script>
