<template>
  <div id="app">
    <TableToMd />
  </div>
</template>

<script>
import TableToMd from "./components/TableToMd";

export default {
  name: "app",
  components: {
    TableToMd
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  color: #2c3e50;
}
body {
  min-width: 600px;
  min-height: 400px;
  background-color: whitesmoke;
}
</style>
