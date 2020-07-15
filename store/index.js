import Vuex from "vuex";
import Cookie from "js-cookie";
import localStorage from "localStorage";

const createStore = () => {
  return new Vuex.Store({
    state: {
      // loadedPosts: [],
      token: null,
      // email: null
    },
    mutations: {
      // setPosts(state, posts) {
      //   state.loadedPosts = posts;
      // },
      // addPost(state, post) {
      //   state.loadedPosts.push(post);
      // },
      // editPost(state, editedPost) {
      //   const postIndex = state.loadedPosts.findIndex(
      //     post => post.id === editedPost.id
      //   );
      //   state.loadedPosts[postIndex] = editedPost;
      // },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      },
      // setEmail (state, email) {
      //   state.email = email
      // }
    },
    actions: {
    //   nuxtServerInit(vuexContext, context) {
    //     return context.app.$axios
    //       .$get("/posts.json")
    //       .then(data => {
    //         const postsArray = [];
    //         for (const key in data) {
    //           postsArray.push({ ...data[key], id: key });
    //         }
    //         vuexContext.commit("setPosts", postsArray);
    //       })
    //       .catch(e => context.error(e));
    //   },
    //   addPost(vuexContext, post) {
    //     const createdPost = {
    //       ...post,
    //       updatedDate: new Date()
    //     };
    //     return this.$axios
    //       .$post(
    //         "https://nuxt-blog.firebaseio.com/posts.json?auth=" +
    //           vuexContext.state.token,
    //         createdPost
    //       )
    //       .then(data => {
    //         vuexContext.commit("addPost", { ...createdPost, id: data.name });
    //       })
    //       .catch(e => console.log(e));
    //   },
    //   editPost(vuexContext, editedPost) {
    //     return this.$axios
    //       .$put(
    //         "https://nuxt-blog.firebaseio.com/posts/" +
    //           editedPost.id +
    //           ".json?auth=" +
    //           vuexContext.state.token,
    //         editedPost
    //       )
    //       .then(res => {
    //         vuexContext.commit("editPost", editedPost);
    //       })
    //       .catch(e => console.log(e));
    //   },
    //   setPosts(vuexContext, posts) {
    //     vuexContext.commit("setPosts", posts);
    //   },
      authenticateUser(vuexContext, authData) {
        console.log("authenticateUser store",authData)
        let authUrl =
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`
        if (!authData.isLogin) {
          authUrl =
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`
        }
        console.log("URL:", authUrl)
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            console.log("result of authenticateUser" + JSON.stringify(result,null,2))
            vuexContext.commit("setToken", result.idToken);
            // vuexContext.commit("setEmail",result.email)
            localStorage.setItem("token", result.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            );
            Cookie.set("jwt", result.idToken);
            Cookie.set(
              "expirationDate",
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            );
            // debugger;
            console.log("login:",this.getters.isAuthenticated)
            return this.$axios.$post(`${BASE_URL}/track-data`, {data: 'Authenticated!'})
          })
          .catch(e => console.log("Error in authenticate user", e));
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
        // return this.$axios.$post(`${BASE_URL}/track-logout`)
      }
    },
    getters: {
    //   loadedPosts(state) {
    //     return state.loadedPosts;
    //   },
      isAuthenticated(state) {
        return state.token != null;
      },
      // getEmail(state) {
      //   return state.email || 'no user'
      // }
    }
  });
};

export default createStore;
