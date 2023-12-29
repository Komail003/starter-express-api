const Mongoose = require('mongoose');


const UserTracking = new Mongoose.Schema({

    UserName: {
        type: String
    },
    UserEmail: {
        type: String
    },
    DateTime: {
        type: String
    },
    Calculator: {
        type: String
    },
    ReferredStatus: {
        type: Boolean,
        default: false,
        require: false
    },
    isDuplicated: {
        type: Boolean,
        default: false,
        require: false
    },
    Order: {
        type: Number,
        require: false
    },
    SoftDelete: {
        type: Boolean,
        default: false,
        require: false
    }
})

module.exports = Mongoose.model("UserTracking", UserTracking)