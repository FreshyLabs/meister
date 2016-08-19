export default {
  host:       'localhost:1337',
  mode:       process.env.NODE_ENV || 'development',
  protocol:   process.env.NODE_ENV === 'production' ? 'https://' : 'http://',
};
