const dockerHost = (
  ( process.env.DOCKER_HOST || "tcp://0.0.0.0:80" )
    .match( /^\w+:\/\/([\d\w\.]+):(\d+)$/ ) || []
)[1];

module.exports = {
  port:                 1337,
  GITHUB_CLIENT_ID:     process.env.FRESHY_GH_ID,
  GITHUB_CLIENT_SECRET: process.env.FRESHY_GH_SECRET,
  GithubCallback:       '/callback',
  auth0Issuer:          'https://timbrio.auth0.com/',
  database:             process.env.FRESHY_DATABASE || `mongodb://${dockerHost}:27017/freshy`,
  dockerHost,
  host:                 process.env.FRESHY_HOST || 'localhost:1337',
  mode:                 process.env.NODE_ENV || 'development',
  protocol:             process.env.NODE_ENV === 'production' ? 'https://' : 'http://'
};
