require('simple-git')()
  .add('./*')
  .commit("first commit!")
  .addRemote('origin', 'https://github.com/ykhirao/write-code-everyday-bot/')
  .push(['-u', 'origin', 'master'], () => console.log('done'));
