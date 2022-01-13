<template>
  <div class="container">
    <div class="timer">
      <div class="time">
        {{ formatTime }}
      </div>
      <button v-if="!timerOn" @click="start">Start</button>
      <button v-if="timerOn" @click="stop">Stop</button>
    </div>
  </div>
</template>

<script>
// @see https://qiita.com/moriwm77/items/5d5430c80cfccd5fb397
export default {
  name: 'Timer',
  data() {
    return {
      min: 59,
      sec: 59,
      time: 15 * 60, // sec
      timerOn: false,
      timerObj: null
    }
  },
  computed: {
    formatTime: function() {
      const timeStrings = [this.min.toString(), this.sec.toString()].map(
        function(str) {
          if (str.length < 2) {
            return '0' + str
          } else {
            return str
          }
        }
      )
      return timeStrings[0] + ':' + timeStrings[1]
    }
  },
  methods: {
    count: function() {
      this.time--
      console.log(this.time)
      if (this.sec <= 0 && this.min >= 1) {
        this.min--
        this.sec = 59
      } else if (this.sec <= 0 && this.min <= 0) {
        this.complete()
      } else {
        this.sec--
      }
    },

    start: function() {
      const self = this
      this.timerObj = setInterval(function() {
        self.count()
      }, 1000)
      this.timerOn = true // timerがOFFであることを状態として保持
    },

    stop: function() {
      clearInterval(this.timerObj)
      this.timerOn = false // timerがOFFであることを状態として保持
    },

    complete: function() {
      clearInterval(this.timerObj)
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.time {
  font-size: 20em;
}
</style>
