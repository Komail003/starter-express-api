const Mongoose= require('mongoose');


const admin_schema= new Mongoose.Schema({
	
	email:{
		type: String
	},

	password:{
		type: String
	},

	name:{
		type: String
	},

	designation:{
		type: String
	},

	role:{
		type: String,
		default:"622437",
	}

})

module.exports= Mongoose.model("super_admin", admin_schema)