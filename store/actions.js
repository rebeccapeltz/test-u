export default {
  async authenticateUser({ dispatch, commit, getters, rootGetters }, authData) {
    console.log("authenticateUser store", authData);
    // login
    let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${authData.fbAPIKey}`;
    // register
    if (!authData.isLogin) {
      authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${authData.fbAPIKey}`;
    }
    console.log("URL:", authUrl);
    return this.$axios
      .$post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(result => {
        console.log(
          "result of authenticateUser" + JSON.stringify(result, null, 2)
        );
        debugger;
        commit("SET_TOKEN", result.idToken);
        // debugger
        console.log("login:", state.token);

        // Client
        localStorage.setItem("token", result.idToken);
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
        );
        // Server
        Cookie.set("jwt", result.idToken);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
        );

        // Log
        return this.$axios.$post(`${authData.baseURL}/track-data`, {
          data: "Authenticated!"
        });
      })
      .catch(e => console.log("Error in authenticate user", e));
  },
  async initAuth({ state, commit, rootstate }, req) {
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
      dispatch("logout");
      return;
    }
    commit("SET_TOKEN", token);
  },
  logout({ commit, dispatch, state }) {
    commit("CLEAR_TOKEN");
    // Server
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");

    // Client
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
    // return this.$axios.$post(`${process.env.BASE_URL}/track-logout`)
  }
};
