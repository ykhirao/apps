// ステップ 1: Vue インスタンスを作成
const Vue = require("vue");
const app = new Vue({
  template: `<div>Hello World</div>`
});

// ステップ 2: レンダラを作成
const renderer = require("vue-server-renderer").createRenderer();

// ステップ 3: Vue インスタンスを HTML に描画
renderer.renderToString(app, (err, html) => {
  if (err) throw err;
  console.log(html);
  // => <div data-server-rendered="true">hello world</div>
});

// 2.5.0+ 以降, コールバックが渡されない場合、Promiseを返す:
renderer
  .renderToString(app)
  .then(html => {
    console.log(html);
  })
  .catch(err => {
    console.error(err);
  });
