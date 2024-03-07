const Mongoose = require('mongoose');


const UserTracking = new Mongoose.Schema({

    Scenario: {
        type: String
    },
    relationshipStatus: {
        type: String
    },

    clientFirstName: {
        type: String
    },
    clientSurname: {
        type: String
    },
    clientPreferredName: {
        type: String
    },
    clientDOB: {
        type: String
    },
    clientEmail: {
        type: String
    },
    clientPhone: {
        type: String
    },

    partnerFirstName: {
        type: String
    },
    partnerSurname: {
        type: String
    },
    partnerPreferredName: {
        type: String
    },
    partnerDOB: {
        type: String
    },
    partnerEmail: {
        type: String
    },
    partnerPhone: {
        type: String
    },
    

    Adviser_FK:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Advisers'
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
    isNotified: {
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