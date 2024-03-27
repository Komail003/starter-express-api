const Mongoose = require('mongoose');


const UserData_LIHC = new Mongoose.Schema({

    UserEmail: {
        type: String
    },
    // Calculators Data  
    relationshipStatus: {
        type: String,
    },
    wifeDOB: {
        type: Date,
    },
    husbandDOB: {
        type: Date,
    },
    gift: {         // bool true or false
        type: Boolean,
        require: false
    },
    // giftExtended: {    // should be remove 
    //     type: String,
    //     require: false
    // },
    
    // fk
    UserTracking_FK:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'UserTracking'
      },

    //Page 2
    businessIncomeOptions: {     // bool true or false
        type: Boolean,
        require: false
    },
    //Page 2 End

    benefits: {     // bool true or false
        type: Boolean,
        require: false
    },
    centreLinkBenefits: {
        type: Number,
    },
    centreLinkBenefitsWife: {
        type: Number,
        require: false
    },
    // page #3

    //Combined Field
    husbandSavingsAccounts: {
        type: Number,
    },
    wifeSavingsAccounts: {
        type: Number,
        require: false
    },
    husbandSuperAnnaution: {
        type: Number,
    },
    wifeSuperAnnaution: {
        type: Number,
        require: false
    },
    // page #3 end

    // page #4
    husbandPension: {
        type: Number,
    },
    wifePension: {
        type: Number,
    },
    // page #4 end

    // page #5 
    husbandPortfolio: {
        type: Number,
    },
    wifePortfolio: {
        type: Number,
        require: false
    },
    // page #5 end

    // page #6 
    husbandFunds: {
        type: Number
    },
    wifeFunds: {
        type: Number,
        require: false
    },
    // page #6 end


    // page #7 
    rentOptions: {      // bool true or false
        type: Boolean,
        require: false
    },
    // page #7 end

    rentFrequency: {
        type: String
    },
    secondPropertyRentalIncome: {
        type: Number
    },
    secondPropertyAnnualExpense: {
        type: Number
    },
    yourOtherIncomeStream: {      // bool true or false
        type: Boolean,
        require: false
    },
    yourAnnualPension: {
        type: Number
    },
    yourAnnualPensionWife: {
        type: Number
    },
    yourAnnualDeductible: {
        type: Number
    },
    yourAnnualDeductibleWife: {
        type: Number
    },
    grossSalary: {
        type: Number
    },
    grossSalaryWife: {
        type: Number
    },
    workingIncome: {      // bool true or false
        type: Boolean,
        require: false
    },
    otherIncomeOptions: {     // bool true or false
        type: Boolean,
        require: false
    },
    overseasIncome: {
        type: Number
    },
    overseasIncomeWife: {
        type: Number
    },
    


    //Result Data
    totalIncome1: {
        type: Number
    },
    incomeThreshold1: {
        type: Number
    },
    //Result Data

})

module.exports = Mongoose.model("UserData_LIHC", UserData_LIHC)