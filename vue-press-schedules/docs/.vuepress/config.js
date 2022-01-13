// const util = require('./util.js');
// const sidebar = util.createSideBar();

module.exports = {
  title: 'Film Life Tokyo',
  description: 'このサイトはフィルム写真を撮るためのサイトです。',
  themeConfig: {
    sidebar: 'auto',
    // navbar : false
    search: true,
    searchMaxSuggestions: 5,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'Blog', link: 'https://www.nxworld.net/' }
    ]
  },
}
