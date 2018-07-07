
if(process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://daresam:password@ds127851.mlab.com:27851/shopping-list'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost:27017/shoppinglist'
    }
}