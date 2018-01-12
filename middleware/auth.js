export default function ({ store, error }) {
  if (this.$store.getters['auth/loggedIn']) {
    error({
      message: 'You are not logged',
      statusCode: 403
    })
  }
}
