module.exports = (app) => {
    const auth = require('./auth.routes')
    app.use('/auth', auth)

    const cars = require('./cars.routes')
    app.use('/cars', cars)

    const category = require('./category.routes')
    app.use('/category', category)

    const tag = require('./tags.routes');
    app.use('/tag', tag)
}