const Mongoose= require('mongoose');


const income_test_schema= new Mongoose.Schema({
	
	situation:{
		type: String
	},

	weekly_income:{
		type: Number
	},

	eight_week_income:{
		type: Number
	}

})

module.exports= Mongoose.model("income_test", income_test_schema)