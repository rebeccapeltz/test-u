import Vuex from 'vuex'
import Cookie from 'js-cookie'
import localStorage from 'localStorage'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: null,
      uploadedVideos: []
    }),
    mutations: {
      setVideos(state, videos) {
        console.log("mutation set video",videos)
        state.uploadedVideos = videos
      },
      addVideo(state, video) {
        state.uploadedVideos.push(video)
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, { res }) {
        console.log('in nuxtServerInit')
        try {
          const data = await this.$axios.$get(
            'https://res.cloudinary.com/u-tube/video/list/u-tube.json'
          )
          console.log(JSON.stringify(data, null, 2))
          const videosArray = []
          for (const resourse of data.resources) {
            videosArray.push(resourse)
          }
          console.log(JSON.stringify(videosArray, null, 2))
          console.log("calling commit on videosArray")
          vuexContext.commit('setVideos', videosArray)
        } catch (error) {
          console.log('errrrrrrrrr', error)
        }
      },
      // setVideos(vuexContext, videos) {
      //   console.log("action setVideos")
      //   vuexContext.commit('setVideos', videos)
      // },
      authenticateUser(vuexContext, authData) {
        console.log('authenticateUser store', authData)
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`
        if (!authData.isLogin) {
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`
        }
        console.log('URL:', authUrl)
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            console.log(
              'result of authenticateUser' + JSON.stringify(result, null, 2)
            )
            vuexContext.commit('setToken', result.idToken)
            localStorage.setItem('token', result.idToken)
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            )
            Cookie.set('jwt', result.idToken)
            Cookie.set(
              'expirationDate',
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            )
            console.log('login:', this.getters.isAuthenticated)
            return this.$axios.$post(`${process.env.BASE_URL}/api/track-data`, {
              data: 'Authenticated!'
            })
          })
          .catch(e => console.log('Error in authenticate user', e))
      },
      initAuth(vuexContext, req) {
        let token
        let expirationDate
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.token != null
      },
      getUploadedVideos(state) {
        console.log("getters upLoadedVideos", state.uploadedVideos)
        return state.upLoadedVideos
      }
    }
  })
}

export default createStore
