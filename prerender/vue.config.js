const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
  configureWebpack: config => {
    // プロダクトモードでのみ追加
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          // ★ Prerender SPA Plugin を登録
          new PrerenderSPAPlugin({
            // 出力先 dist や www など
            staticDir: path.join(__dirname, "dist"),
            // 生成したいページ
            routes: ["/", "/about", "/note", "/note/1"]
          })
        ]
      };
    }
  }
};
