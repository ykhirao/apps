// app.js
import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";

export function createApp() {
  // ルーターインスタンスを作成します
  const router = createRouter();

  const app = new Vue({
    // ルーターをルートVueインスタンスに注入します
    router,
    render: h => h(App)
  });

  // アプリケーションとルーターの両方を返します
  return { app, router };
}
