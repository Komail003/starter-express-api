const Mongoose= require('mongoose');


const assets_test_schema= new Mongoose.Schema({
	
	

	situation:{
		type: String
	},

	home_owner_full_pension:{
		type: Number
	},
	home_owner_part_pension:{
		type: Number
	},

	non_home_owner_full_pension:{
		type: Number
	},
	non_home_owner_part_pension:{
		type: Number
	}

})

module.exports= Mongoose.model("assets_test", assets_test_schema)