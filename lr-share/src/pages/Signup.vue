<template>
  <div class="signup">
    <h1>会員登録</h1>
    <b-field label="Email">
      <b-input type="email" maxlength="30" v-model="email"></b-input>
    </b-field>
    <b-field label="Password">
      <b-input type="password" password-reveal v-model="password"></b-input>
    </b-field>
    <b-button tag="input" native-type="submit" value="Submit!" @click="signUp" />
    <p>
      Do you have an account?
      <router-link to="/signin">sign in now!!</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Compressor from 'compressorjs'
import * as firebase from 'firebase/app'
import 'firebase/auth'

@Component
export default class Signup extends Vue {
  email: string = ''
  password: string = ''
  signUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential: firebase.auth.UserCredential) => {
        const user: firebase.User | null = userCredential.user

        this.$buefy.toast.open({
          message: 'ユーザーの作成に成功しました！',
          position: 'is-bottom',
          type: 'is-success'
        })
        // this.$router.push('/')
      })
      .catch(e => {
        this.$buefy.toast.open({
          duration: 5000,
          message: e.message,
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
  }
}
</script>
<style scoped lang="stylus">
.signup {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>
