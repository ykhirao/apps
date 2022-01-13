import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'LightroomShare',
      paths: ['user'],
      storage: window.sessionStorage
    })(store)
  })
}
