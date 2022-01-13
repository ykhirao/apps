// entry-server.js
import { createApp } from "./app";

export default context => {
  // 非同期のルートフックまたはコンポーネントが存在する可能性があるため、
  // 描画する前にすべての準備が整うまでサーバーが待機できるように
  // プロミスを返します
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    // サーバーサイドのルーターの場所を設定します
    router.push(context.url);

    // ルーターが非同期コンポーネントとフックを解決するまで待機します
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 一致するルートがない場合、404で拒否します
      if (!matchedComponents.length) {
        reject({ code: 404 });
      }

      // プロミスは描画できるようにアプリケーションインスタンスを解決するべきです
      resolve(app);
    }, reject);
  });
};
