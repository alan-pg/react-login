const Mongoose = require('mongoose')

const schema = new Mongoose.Schema({
    name: String,
    email: String,
    password: String,    
}, {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: { 
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
          }
    },
    versionKey: false,
})

module.exports = Mongoose.model('Users', schema)