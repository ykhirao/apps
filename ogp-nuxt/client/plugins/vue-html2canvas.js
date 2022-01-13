import Vue from 'vue'
import html2canvas from 'html2canvas'

const VueHtml2Canvas = {}
VueHtml2Canvas.install = function(Vue) {
  Vue.mixin({
    methods: {
      async $html2canvas(el, options = {}) {
        return await html2canvas(el, options)
      }
    }
  })
}

Vue.use(VueHtml2Canvas)
