<template>
  <div v-html="$md.render(model)"></div>
</template>
<script>
import model from '~/assets/privacy.md'

export default {
  data() {
    return {
      model
    }
  }
}
</script>
