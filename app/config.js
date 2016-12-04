export default {
  host:       process.env.FRESHY_HOST || 'localhost:1337',
  mode:       process.env.NODE_ENV || 'development',
  protocol:   process.env.NODE_ENV === 'production' ? 'http://' : 'http://',
};
