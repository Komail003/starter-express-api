
const Mongoose = require('mongoose');


const UserData_Age_Pension = new Mongoose.Schema({

    UserEmail: {
        type: String
    },
    UserTracking_FK:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'UserTracking'
      },
    // Calculators Data  
    relationshipStatus: {
        type: String,
    },
    wifeDOB: {
        type: Date,
        require: false
    },
    husbandDOB: {
        type: Date,
    },
    home: { 
        type: Boolean,
        require: false
    },
    homeloan: {  
        type: Boolean,
        require: false
    },
    homeLoan: {   // input type  number with "L" capital in homeLoan
        type: Number,
    },
    husbandInvestmentLoan: {
        type: Number,
    },
    wifeInvestmentLoan: {
        type: Number,
        require: false
    },
    gift: {
        type: Boolean,
        require: false
    },
    giftExtended: {
        type: Number,
        require: false
    },

    // page #3

    husbandCars: {
        type: Number,
    },
    //Combined Field
    husbandHousehold: {
        type: Number,
    },
    husbandBoat: {
        type: Number,
    },
    husbandCaravan: {
        type: Number,
    },
    husbandOtherAssets: {
        type: Number,
    },

    //Combined Field
    // wife
    wifeCars: {
        type: Number,
        require: false
    },



    // page #3 end


    // page #4
    husbandSavingsAccounts: {
        type: Number,
    },
    husbandSuperAnnaution: {
        type: Number,
    },
    husbandPension: {
        type: Number,
    },
    husbandPortfolio: {
        type: Number,
    },
    husbandFunds: {
        type: Number,
    },
    // wife
    wifeSavingsAccounts: {
        type: Number,
        require: false
    },
    wifeSuperAnnaution: {
        type: Number,
        require: false
    },
    wifeFunds: {
        type: Number,
        require: false
    },
    wifePortfolio: {
        type: Number,
        require: false
    },
    wifePension: {
        type: Number,
        require: false
    },
    // page #4 end

    // page #5 
    ownOtherProperty: {
        type: Boolean,
        require: false
    },
    secondPropertyValue: {
        type: Number,
    },
    propertyLoan: {
        type: Boolean,
        require: false
    },
    secondPropertyLoan: {
        type: Number,
    },
    rentOptions: {
        type: Boolean,
        require: false
    },
    secondPropertyRentFrequency: {
        type: String
    },
    secondPropertyRentalIncome: {
        type: Number
    },
    secondPropertyAnnualExpense: {
        type: Number
    },
    gFatherIncomeStream: {
        type: Boolean,
        require: false
    },
    gFatherCurrentAccountValue: {
        type: Number
    },
    gFatherAnnualPension: {
        type: Number
    },
    gFatherAnnualDeductible: {
        type: Number
    },
    //wife
    wifeGFatherCurrentAccountValue: {
        type: Number,
        require: false
    },
    gFatherAnnualPensionWife: {
        type: Number,
        require: false
    },
    gFatherAnnualDeductibleWife: {
        type: Number,
        require: false
    },

    loanOnFunds:{
        type: Boolean,
        require: false
    },
    husbandInvestmentLoan:{
        type: Number
    },
    wifeInvestmentLoan:{
        type: Number
    },


    // page #5 end

    // page #6 
    yourOtherIncomeStream: {
        type: Boolean
    },
    yourAnnualPension: {
        type: Number
    },
    yourAnnualDeductible: {
        type: Number
    },
    yourAnnualPensionWife: {
        type: Number,
        require: false
    },
    yourAnnualDeductibleWife: {
        type: Number,
        require: false
    },
    // page #6 end

    // page #7
    workingIncome: {
        type: Boolean
    },
    grossSalary: {
        type: Number
    },
    grossSalaryWife: {
        type: Number,
        require: false
    },
    // page #7 end 


    // page #8
    otherIncomeOptions: {
        type: Boolean
    },
    overseasIncome: {
        type: Number
    },
    overseasIncomeWife: {
        type: Number,
        require: false
    },
    // page #8 end


    // page #9
    businessIncomeOptions: {
        type: Boolean
    },
    netAssets: {
        type: Number
    },
    netProfit: {
        type: Number
    },
    netAssetsWife: {
        type: Number,
        require: false
    },
    netProfitWife: {
        type: Number,
        require: false
    },

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

module.exports = Mongoose.model("UserData_Age_Pension", UserData_Age_Pension)