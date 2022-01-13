# ogp-sample

> My superb Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


## nuxtへherokuをデプロイ

https://ja.nuxtjs.org/faq/heroku-deployment/

```shell
$ heroku config:set NPM_CONFIG_PRODUCTION=false

$ heroku config:set HOST=0.0.0.0
$ heroku config:set NODE_ENV=production
```

## 構成

![構成](https://res.cloudinary.com/yk/image/upload/v1571946071/ogp/heroku-opg.001_qfettx.jpg)
