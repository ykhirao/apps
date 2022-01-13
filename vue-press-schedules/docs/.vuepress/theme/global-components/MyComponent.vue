<template>
  <div>
    あいうえお
    <p>{{message}}</p>
  </div>
</template>

<script>
// import users from "./data.json";
const axios = require("axios");

export default {
  name: "MyComponent",
  data() {
    return {
      message: "MyComponent!!"
    };
  },
  mounted: function() {
    console.log("mounted");
    const d = this.$page.frontmatter;
    console.log(`${d}`);
    // console.log(withBase);
  },

  beforeMount() {
    axios
      .get("/data/xxx.json")
      .then(response => {
        console.log(response);
        //  this.$data.items = response.data.data
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
