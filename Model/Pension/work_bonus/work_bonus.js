const Mongoose= require('mongoose');


const work_bonus_schema= new Mongoose.Schema({
	
	name:{
		type: String
	},
	work_bonus_fortnight:{
		type: Number
	},
	work_bonus_half_fortnight:{
		type: Number
	}

})

module.exports= Mongoose.model("pension_work_bonus", work_bonus_schema)