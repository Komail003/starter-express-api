const Mongoose = require('mongoose');


const UserData_CSHC = new Mongoose.Schema({

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
    husbandDividendIncome: {
        type: Number,
        require: false
    },
    wifeDividendIncome: {
        type: Number,
        require: false
    },
    husbandFunds: {
        type: Number,
    },
    wifeFunds: {
        type: Number,
        require: false
    },
    husbandInterest: {
        type: Number,
    },
    wifeInterest: {
        type: Number,
        require: false
    },
    UserTracking_FK:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'UserTracking'
      },
    // page #3

    rentOptions: {
        type: Boolean,  
        require: false
    },
    //Combined Field
    rentFrequency: {
        type: String,
    },
    secondPropertyRentalIncome: {
        type: Number,
    },
    secondPropertyAnnualExpense: {
        type: Number,
    },
    // page #3 end

    // page #4
    yourOtherIncomeStream: {   
        type: Boolean,
    },
    yourAnnualPension: {
        type: Number,
    },
    yourAnnualPensionWife: {
        type: Number,
    },
    // page #4 end

    // page #5 
    workingIncome: {  
        type: Boolean,
        require: false
    },
    grossSalary: {
        type: Number,
    },
    grossSalaryWife: {
        type: Number,
        require: false
    },
    // page #5 end

    // page #6 
    otherIncomeOptions: { 
        type: Boolean
    },
    overseasIncome: {
        type: Number
    },
    overseasIncomeWife: {
        type: Number
    },
    
    // page #6 end

    // page #7
    accountBasedPensionOptions: {
        type: Boolean,
        require: false
    },
    husbandPensionAccountBased: {
        type: Number
    },
    wifePensionAccountBased: {
        type: Number,
        require: false
    },
    // page #7 end 







    //Result Data
    totalIncome: {
        type: Number
    },
    threshold: {
        type: Number
    },
    //Result Data

    savingAccountsClient: {
        type: Array
    },
    savingAccountsWife: {
        type: Array
    },
    sharePortfolioClient: {
        type: Array
    },
    sharePortfolioWife: {
        type: Array
    },
    
})

module.exports = Mongoose.model("UserData_CSHC", UserData_CSHC)