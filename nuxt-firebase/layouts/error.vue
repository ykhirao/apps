<template>
  <div class="container">
    <h1>{{ error.statusCode }}</h1>
    <p v-if="error.statusCode === 404">
      ページが見つかりません
    </p>
    <p v-else-if="error.statusCode === 403">
      アクセスできません
    </p>
    <p v-else>
      エラーが発生しました
    </p>
    <div>
      <nuxt-link to="/">homeへ戻る</nuxt-link>
    </div>
    <div>
      <a @click="$router.go(-1)">前の画面へ戻る</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>
