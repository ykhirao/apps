<template>
  <div class="home">
    <ul>
      <li>
        <router-link to="upload">Upload page</router-link>
      </li>
      <li>
        <router-link to="signup">Signup page</router-link>
      </li>

      <li>
        <router-link to="signin">Signin page</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
