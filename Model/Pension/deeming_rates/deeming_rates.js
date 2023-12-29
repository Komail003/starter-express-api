const Mongoose= require('mongoose');


const deeming_rates_schema= new Mongoose.Schema({
	
	

	first_deeming_rates:{
		type: Number
	},

	balance_deeming_rates:{
		type: Number
	}

})

module.exports= Mongoose.model("pension_deeming_rates", deeming_rates_schema)