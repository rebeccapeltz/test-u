export default function(context) {
  console.log("[Middleware] Check Auth");
  // debugger
  context.store.dispatch("initAuth", context.req);
}
