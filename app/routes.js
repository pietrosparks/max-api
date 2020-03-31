const config = require('../config')
const controllers = require('./controllers')

module.exports.registerRoutes = (app) => {
  app.use('/api', controllers.starwars)
}

module.exports.registerErrorHandlers = (app) => {
  app.use(function(err, req, res, next) {
    console.error(err.message)
    res.status(err.status || 500)
    res.render('500', {
      message: err.message,
      error: config.env === 'development' ? err : {}
    })
  })
}
