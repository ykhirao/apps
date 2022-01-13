<template>
  <div id="ponponpain">
    <h3>pͪoͣnͬpͣoͥnͭpͣa͡inͥ を支える技術</h3>
    <div>
      <span
        v-for="code in codes"
        :key="code.id"
        class="flex-span"
        @click="add(code.id)"
      >
        {{ code.val }}
      </span>
    </div>
    <div>
      <span class="flex-span" @click="del">del</span>
      <span class="flex-span" @click="clear">clear</span>
      <span class="flex-span" @click="addSpace">space</span>
      <span class="flex-span" @click="copy">copy</span>
    </div>
    <div class="show-text">
      {{ showText }}
    </div>
    <div>
      <input v-model="lowerText" type="text" class="input-lower" />
    </div>
    <div>
      <!-- コピー用 -->
      <input id="input-copy" type="text" class="input-copy" :value="showText" />
    </div>
    <div id="footer">
      <a href="https://qiita.com/ykhirao/items/9ca1fbd294883e06dbd6"
        >Qiita元記事はこちら</a
      >
    </div>
  </div>
</template>
<script>
import codes from './codes.js'
export default {
  name: 'Ponponpain',
  components: {},
  data() {
    return {
      lowerText: 'ponponpain',
      upperTextArray: [875, 870, 871, 873, 867, 875, 868, 873, 866, 867],
      codes: codes
    }
  },
  computed: {
    showText: function() {
      return this.lowerText
        .split('')
        .map((char, i) => {
          return `${char}${this.getCodeById(this.upperTextArray[i])}`
        })
        .join('')
    },
    showUpperText: function() {
      return this.upperTextArray
        .map(id => {
          return `  ${this.getCodeById(id)}`
        })
        .join('')
    }
  },
  methods: {
    removeAt: function(i) {
      this.lower.splice(i, 1)
    },
    add: function(i) {
      this.upperTextArray.push(i)
    },
    getCodeById(id) {
      const obj = this.codes.find(code => id === code.id)
      return obj ? obj.val : ''
    },
    del() {
      this.upperTextArray.splice(-1)
    },
    addSpace() {
      this.upperTextArray.push(0)
    },
    clear() {
      this.upperTextArray = []
    },
    copy() {
      const input = document.getElementById('input-copy')
      input.select()
      document.execCommand('Copy')
    }
  }
}
</script>
<style scoped>
#ponponpain {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 1.7rem;
  margin-right: auto; /* 1 */
  margin-left: auto; /* 1 */
  max-width: 960px; /* 2 */
  padding-right: 10px; /* 3 */
  padding-left: 10px; /* 3 */
}
ul {
  list-style: none;
}
.flex-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
}
.flex-span {
  padding: 0.3em 0.6em;
  line-height: 180%;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.flex-span:hover {
  background-color: chocolate;
}
.input-lower {
  text-align: center;
  padding: 0.2em 0.5em;
  font-size: 2em;
  width: 90%;
}
.show-text {
  font-size: 2.5em;
  padding: 0.4em;
}
.input-copy {
  position: fixed;
  right: 200%;
}
#footer {
  position: fixed;
  bottom: 0;
  font-size: 0.5em;
  margin-bottom: 1em;
}
</style>
