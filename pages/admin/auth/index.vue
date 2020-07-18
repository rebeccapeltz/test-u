<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model="email"
          >E-Mail Address</AppControlInput
        >
        <AppControlInput type="password" v-model="password"
          >Password</AppControlInput
        >
        <AppButton type="submit">{{
          isLogin ? "Login" : "Register"
        }}</AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin"
          >Switch to {{ isLogin ? "Register" : "Login" }}</AppButton
        >
      </form>
      <p>
        is authenticated: <span>{{ isAuthenticated }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

// CLIENT
export default {
  name: "AdminAuthPage",
  // layout: "admin",
  data() {
    return {
      isLogin: true,
      email: "rpeltz@gmail.com",
      password: "Blah7!",
      isLoggedIn: false
    };
  },
  computed: {
    fbAPIKey: function() {
      return process.env.fbAPIKey;
    },
    baseURL: function() {
      return process.env.BASE_URL;
    },
    // ...mapGetters(['isAuthenticated']),
   isAuthenticated(){
      return this.$store.getters.isAuthenticated;
    }
    // ...mapState({
    //   token: state => state.token
    // })
  },

  // watch: {
  //   isAuthenticated(value) {
  //     console.log("watching isAuthenticated", value);
  //   }
  // },

  created() {
    // set the initial value to be the same as the one in vuex
    // this.isLoggedIn = this.isAuthenticated;
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("authenticateUser", {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password,
          fbAPIKey: this.fbAPIKey,
          baseURL: this.baseURL
        })
        .then(() => {
          console.log("client auth success");
          this.$router.push("/admin");
        })
        .catch(error => {
          console.log("client fail", error);
        });
    }
  }
};
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
