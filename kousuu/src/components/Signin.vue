<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signIn">Signin</button>
    <p>You don't have an account?
      <router-link to="/signup">create account now!!</router-link>
    </p>
    <div class="mt-2">
      <button block variant="primary" @click="googleLogin">Google ログイン</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-alert */
import firebase from 'firebase'

export default {
  name: 'Signin',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        // eslint-disable-next-line
        (user) => {
          alert('Success!')
          this.$router.push('/')
        },
        (err) => {
          alert(err.message)
        },
      )
    },
    googleLogin() {
      // Using a popup.
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token.
        // const token = result.credential.accessToken
        // The signed-in user info.
        const { user } = result
        console.log(user)
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signin {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
