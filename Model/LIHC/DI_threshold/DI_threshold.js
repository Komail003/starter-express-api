const Mongoose= require('mongoose');


const DI_threshold_schema= new Mongoose.Schema({
	
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

module.exports= Mongoose.model("deemed_income_thresholds", DI_threshold_schema)