<template>
  <div>
    <progress value="0" max="100" id="uploader">0%</progress>
    <input type="file" value="upload" id="fileButton" />
  </div>
</template>
<style>
body {
  display: flex;
  min-height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#uploader {
  -webkit-appearance: none;
  appearance: none;
  width: 50%;
  margin-bottom: 10px;
}
</style>
