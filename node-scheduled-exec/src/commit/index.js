require('dotenv').config();
const git = require('simple-git');
// const remote = `https://${USER}:${PASS}@${REPO}`;
const url = "https://github.com/ykhirao/write-code-everyday-bot";

var git_url = 'https://github.com/dotnsf/simple-git-sample.git';
var local_folder = 'work';


//. clone
git().clone(git_url, "src/commit/work");
