<template>
  <span class="icon_wrap">
    <i class="icon_minus"></i>
  </span>
</template>

<script>
export default {
  name: "MinusButton"
};
</script>

<style scoped>
.icon_wrap {
  display: inline-block;
  padding: 4px;
  background-color: #ffffff;
  border: #333 solid 1px;
  border-radius: 4px;
  line-height: 0.8;
}
.icon_minus {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}
.icon_minus:before {
  display: block;
  content: "";
  background-color: #333;
  border-radius: 10px;
  position: absolute;
  width: 20px;
  height: 5px;
  top: 7px;
  left: 0;
}
</style>
