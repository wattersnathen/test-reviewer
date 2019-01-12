const routes = [
    require('./test.routes')
]

module.exports = (app) => {
    routes.forEach(router => {
        app.use(router)
    })
}