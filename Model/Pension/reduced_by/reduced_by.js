const Mongoose= require('mongoose');


const reduced_by_schema= new Mongoose.Schema({
	
	dividing_factor:{
		type: Number
	},

	reduction_rate:{
		type: Number
	}

})

module.exports= Mongoose.model("pension_reduced_by", reduced_by_schema)