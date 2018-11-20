if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb//<daresam>:<password12345>@ds249583.mlab.com:49583/dev-connect',
        secret: 'secret'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost:27017/dev-connect',
        secret: 'secret'
    }
}