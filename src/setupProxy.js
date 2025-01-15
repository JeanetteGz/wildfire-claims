module.exports = function(app) {
  app.use(function(req, res, next) {
    res.removeHeader('Content-Security-Policy');
    next();
  });
};