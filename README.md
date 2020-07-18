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


## scrimba on vuex module store
https://scrimba.com/p/pnyzgAP/cqKK4psq

```
  computed: mapState({
        a: state => state.a.count,
        b: state => state.b.count,
    })

    methods: mapActions('some/nested/module', [
        'foo' // thisfoo()
    ])
    ```