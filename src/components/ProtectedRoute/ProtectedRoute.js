export default function ProtectedRoute(props) {

  function redirect() {
    props.redirect('/')
  }

  return props.loggedIn ? props.children : redirect();
}