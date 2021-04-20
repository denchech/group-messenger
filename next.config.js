module.exports = {
  env: {
    HOST: process.env.HOST
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  async redirects () {
    return [
      {
        source: '/',
        destination: '/chats',
        permanent: true
      }
    ]
  }
}
