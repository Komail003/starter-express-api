const Mongoose= require('mongoose');


const income_test_schema= new Mongoose.Schema({
	
	situation:{
		type: String
	},

	income_full_pension:{
		type: Number
	},

	income_part_pension:{
		type: Number
	},

	reduction_factor:{
		type: Number
	}

})

module.exports= Mongoose.model("pension_income_test", income_test_schema)