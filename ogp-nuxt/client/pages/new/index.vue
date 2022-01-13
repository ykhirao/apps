<template>
  <section class="container">
    <div id="message-ogp" ref="printMe" v-text="text"></div>
    <div>
      <textarea type="text" v-model="text" placeholder="本文" />
      <button @click="print">print</button>
      <button @click="submit">submit</button>
    </div>
    <div style="width:60%;">
      <img :src="src" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      src: '',
      text: 'ここに文字の入力をお願いします！\n改行も絵文字も可能！！！😂'
    }
  },
  methods: {
    async submit() {
      if (!this.src) {
        return
      }

      try {
        const response = await this.$axios.$post('/api/images', {
          img: this.src
        })
      } catch (e) {
        console.log(e.message)
      }
    },
    async print() {
      const el = this.$refs.printMe
      const canvas = await this.$html2canvas(el, { logging: false })
      this.src = canvas.toDataURL('image/jpeg', 0.85)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  text-align: center;
}

#message-ogp {
  width: 640px;
  min-height: 335px;
  /* font-size: 3em; */
  font-size: calc(100vw / 20);
  padding: 0.7em 1em;
  line-height: 1.1;
  white-space: pre-line; /* 改行記号の反映 */
  font-weight: bold;
  border: solid 3px #111;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
}

@media (max-width: 700px) {
  #message-ogp {
    width: 80vw;
    min-height: 50vw;
  }
}

textarea {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  background-image: none;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 0;
  color: inherit;
  font-family: inherit;
  font-size: 1em;
  height: 100px;
  padding: 0.4em 0.8em;
  width: 100%;
}

textarea:focus {
  border: 1px solid rgba(0, 0, 0, 0.32);
  box-shadow: none;
  outline: none;
}
</style>
