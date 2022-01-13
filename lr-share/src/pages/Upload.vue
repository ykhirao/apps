<template>
  <div class="upload">
    <h1>Upload page</h1>
    <div class="image-container">
      <div class="image-text">
        <label for="file">
          <div>
            Add your Images!
            <br />Click me!
          </div>
          <input
            type="file"
            id="file"
            multiple
            accept="image/*"
            style="display:none;"
            @change="handleFiles"
          />
        </label>
      </div>
      <!-- <img src="@/assets/sample.jpeg" /> -->
      <!-- <img src="@/assets/sample2.jpeg" />   -->
      <img v-bind:src="image" v-for="image in images" v-bind:key="image" alt />
      <div v-if="this.images.length" class="image-text" @click="hundleUploadImages">
        <span>Save all files!</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Compressor from 'compressorjs'
import * as firebase from 'firebase/app'
import 'firebase/storage'

@Component
export default class Update extends Vue {
  images: string[] = [] // ["data:image/jpeg;base64,/XXXXXX"]
  mounted() {
    this.images.push(
      `data:image/jpeg;base64,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`
    )
  }
  hundleUploadImages(e: Event) {
    // this.$emit('emitting', this.images)
    var storageRef = firebase.storage().ref()
    // var mountainImagesRef = storageRef.child('images/mountains.jpg')
    this.images.forEach(image => {
      console.log(image)
      var mountainsRef = storageRef.child(
        `${Math.random()
          .toString(32)
          .substring(2)}.jpg`
      )
      mountainsRef.putString(image, 'data_url').then(function(snapshot) {
        console.log('Uploaded a blob or file!')
      })
    })
  }
  handleFiles(e: Event) {
    const images = this.images
    const files: FileList | null = (<HTMLInputElement>e.target).files

    if (files === null) return
    ;[...files].forEach((file: File) => {
      const payload: Compressor.Options = {
        quality: 0.8,
        maxWidth: 100,
        maxHeight: 100,
        mimeType: 'image/jpeg',
        success(blob: Blob): void {
          var reader = new FileReader()
          reader.onloadend = () => {
            const result = <string | ArrayBuffer | null>reader.result
            if (result instanceof ArrayBuffer || result === null) return
            images.push(result)
          }
          reader.readAsDataURL(blob)
        },
        error(err: Error): void {
          console.log(err.message)
        }
      }
      new Compressor(file, payload)
    })
  }
}
</script>
<style scoped lang="stylus">
.upload {
  display: flex;
  min-height: calc(100vh - 120px);
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 2em;
  }
}

.image-container {
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #eee;
  padding: 20px 30px;
  border-radius: 6px;

  img {
    height: 180px;
    width: 240px;
    object-fit: cover;
    border-radius: 1%;
    margin: 5px;
  }

  .image-text {
    height: 180px;
    width: 240px;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    margin: 5px;

    label {
      cursor: pointer;
    }

    span {
      cursor: pointer;
    }
  }
}
</style>
