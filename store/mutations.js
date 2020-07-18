import initialState from './state';

export default {
  RESET_STORE: state => {
    Object.assign(state, initialState())
  },
  SET_AUTH_USER(state, { authUser }) {
    const { uid, email } = authUser;
    state.authUser = {
      uid,
      email
    } 
  },
  SET_TOKEN(state, token){
    state.token = token
  },
  CLEAR_TOKEN(state){
    state.token = null
  }

}