const Mongoose= require('mongoose');


const deemed_income_thresholds_schema= new Mongoose.Schema({
	
	

	situation:{
		type: String
	},

	first_deemed:{
		type: Number
	},
	first_rate:{
		type: Number
	},

	over_deemed:{
		type: Number
	},
	over_rate:{
		type: Number
	}

})

module.exports= Mongoose.model("pension_deemed_income_thresholds", deemed_income_thresholds_schema)