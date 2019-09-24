#!/usr/bin/env bash

# macから実行させない
if [ "$(uname)" == 'Darwin' ]; then
  OS='Mac'
  echo "macなので実行せずに終了します。"
  exit 1
fi

# .ssh ディレクトリの作成
mkdir -p ~/.ssh

# .ssh/known_hosts への github.com の登録
ssh-keyscan -H github.com >> ~/.ssh/known_hosts

# .ssh/config の作成
cp -f ./config ~/.ssh/config

# .ssh/github_actions の作成
echo ${SSH_KEY} > ~/.ssh/github_actions
sed -i -e "s#\\\\n#\n#g" ~/.ssh/github_actions

# .ssh/github_actions のアクセス制限
chmod 600 ~/.ssh/github_actions
chmod 600 ~/.ssh/config
