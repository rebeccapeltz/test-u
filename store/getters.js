export default {
  isAuthenticated: state => {
    try {
      return state.token !== null;
    } catch {
      return false;
    }
  }
}
