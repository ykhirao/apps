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

# .ssh/id_rsa の作成
echo ${SSH_KEY}
echo ${SSH_KEY} > ~/.ssh/id_rsa
sed -i -e "s#\\\\n#\n#g" ~/.ssh/id_rsa

# .ssh/id_rsa のアクセス制限
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/config
