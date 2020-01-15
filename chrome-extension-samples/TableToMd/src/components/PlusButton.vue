<template>
  <span class="icon_wrap">
    <i class="icon_plus"></i>
  </span>
</template>

<script>
export default {
  name: "PlusButton"
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
.icon_plus {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}
.icon_plus:before,
.icon_plus:after {
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
.icon_plus:before {
  width: 5px;
  height: 20px;
  top: 0;
  left: 7px;
}
</style>
