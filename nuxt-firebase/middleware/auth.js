export default function({ store, error }) {
  if (!store.state.authUser) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}

// export default function({ store, redirect }) {
//   // ユーザーが認証されていないとき
//   if (!store.state.authenticated) {
//     return redirect('/login')
//   }
// }
