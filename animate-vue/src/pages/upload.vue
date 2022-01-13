<template>
  <div class="upload">
    <h1>This is an upload page</h1>
    <Chart class="chart" />
    <a href="" id="downloadlink">download</a>
    <div @click="stop">stop</div>
    <div @click="start">start</div>
    <div @click="upload">upload</div>
    <sample class="chart1" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Chart from '@/components/Chart.vue'
import sample from '@/components/examples/sample.vue'
import axios from 'axios'
require('dotenv').config()

console.log()

declare var MediaRecorder: any
interface CanvasElement extends HTMLCanvasElement {
  captureStream(): void
}

@Component({ components: { Chart, sample } })
export default class Upload extends Vue {
  name: string = 'upload'
  email: string = ''
  recorder: any = {}
  blobUrl: string = ''
  videoBlob: Blob = new Blob()

  mounted() {
    this.initRecorder()
  }
  upload() {
    let url = `https://www.googleapis.com/youtube/v3/videos&key=${process.env.VUE_APP_KEY}&part=snippet`
    // url = 'http://localhost:8081/upload'
    var params = new FormData()

    params.append('file', this.videoBlob, 'video.webm')
    axios
      .post(url, params)
      .then(function(response) {
        // 成功時
        console.log(response)
      })
      .catch(function(error) {
        // エラー時
      })
  }
  initRecorder() {
    //canvasの取得
    const canvas = <CanvasElement>document.querySelector('.chart1 #bar-chart')
    if (!canvas) return
    canvas.style.backgroundColor = 'white'
    const stream = <any>canvas.captureStream()
    let recorder: any = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    })

    recorder.ondataavailable = (e: any) => {
      console.log('ondataavailable')
      var anchor = <HTMLAnchorElement>document.getElementById('downloadlink')

      var videoBlob = new Blob([e.data], { type: e.data.type })
      const blobUrl = window.URL.createObjectURL(videoBlob)
      anchor.download = 'movie.webm'
      anchor.href = blobUrl
      anchor.style.display = 'block'
      this.videoBlob = videoBlob
    }
    this.recorder = recorder
    this.recorder.start()
  }
  start(event: Event) {
    event.preventDefault()
    console.log('START!')

    if (this.recorder) {
      this.recorder.start()
    }
  }
  stop(event: Event) {
    console.log('STOP!')
    event.preventDefault()

    if (this.recorder) {
      this.recorder.stop()
    }
  }
}
</script>
<style lang="stylus" scoped>

.chart
  width 300px
  background-color white
</style>
