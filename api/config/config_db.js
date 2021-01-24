const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const config = {
  uri: 'mongodb+srv://snake:98118972@cluster0.uz1lo.mongodb.net/<dbname>?retryWrites=true&w=majority',
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
}

mongoose.connection.on('open', () => {
  console.log('Successfully connected to database.')
})

mongoose.connection.on('error', () => {
  throw new Error('Could not connect to MongoDB.')
})

const connect = () => mongoose.connect(config.uri, config.options)

module.exports = connect
