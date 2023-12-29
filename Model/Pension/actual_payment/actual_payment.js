const Mongoose= require('mongoose');


const actual_payment_schema= new Mongoose.Schema({
	
	

	situation:{
		type: String
	},

	per_fortnight:{
		type: Number
	},
	pharmaceutical_benefit:{
		type: Number
	},

	pension_payment:{
		type: Number
	},
	clean_energy_supplement:{
		type: Number
	}

})

module.exports= Mongoose.model("actual_payment", actual_payment_schema)