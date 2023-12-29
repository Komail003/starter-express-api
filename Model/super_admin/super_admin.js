const Mongoose= require('mongoose');


const admin_schema= new Mongoose.Schema({
	
	email:{
		type: String
	},

	password:{
		type: String
	}

})

module.exports= Mongoose.model("super_admin", admin_schema)