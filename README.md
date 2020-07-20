# server-side

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## firebase local emulator

https://firebase.google.com/docs/functions/local-emulator

export GOOGLE_APPLICATION_CREDENTIALS=path to json
firebase emulators:start

## Deploy to Heroku
https://www.youtube.com/watch?v=nngsKhTb2BA


https://medium.com/@ale_colombo/deploy-nuxt-js-app-on-heroku-531a935bce90

heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production

https://dashboard.heroku.com/apps/cld-u-tube

```bash
git push heroku master
```
