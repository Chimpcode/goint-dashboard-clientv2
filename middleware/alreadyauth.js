export default function ({ store, error }) {
  console.log('Redirecting...')
  if (store.getters['auth/loggedIn']) {
    if (process.browser) {
      window.location.href = '/dashboard'
    }
  }
}
