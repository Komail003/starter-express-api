const Mongoose= require('mongoose');


const income_test_schema= new Mongoose.Schema({
	
	situation:{
		type: String
	},

	annual_income:{
		type: Number
	}

})

module.exports= Mongoose.model("commomwealth_income_test", income_test_schema)