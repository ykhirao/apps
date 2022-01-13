// function createSideBar() {
//   const fs = require('fs');

//   var docsRootDir = "./docs/.vuepress"
//   var dirs = fs.readdirSync(docsRootDir).filter((f) => {
//     return fs.existsSync(docsRootDir + "/" + f)
//       && fs.statSync(docsRootDir + "/" + f).isDirectory()
//       && !['theme'].includes(f);
//   })
//   console.log(dirs)
//   var sidebarArray = dirs.map((dir) => {
//     console.log(dir);
//     const children = fs.readdirSync(docsRootDir + "/" + dir).map((childDir) => { return "/" + childDir });
//     return {
//       title: dir,
//       path: dir,
//       collapsable: true,
//       sidebarDepth: 2,
//       children: [...children, '/'],
//     }
//   })
//   return sidebarArray;
// }
// console.log(createSideBar())

// module.exports = {
//   createSideBar,
// }
