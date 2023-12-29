const Mongoose= require('mongoose');


const adviser_theme_schema= new Mongoose.Schema({
	
	

	color :{
		type: String
	},

	name :{
		type: String
	},

	ImageUrl :{
		type: String
	},

	Email :{
		type: String
	},

	Website :{
		type: String
	},

	Adviser_Fk:{
		type:Mongoose.Schema.Types.ObjectId,
        ref: 'adviser'
	},

	Phone :{
		type: String
	},

	AppPassword :{
		type: String
	},

	SmtpHost :{
		type: String
	},

	SmtpMail :{
		type: String
	},

	CompanyName :{
		type: String
	},

	SmtpPort :{
		type: Number
	},

	SmtpSecure1:{
		type: String
	}
	


})

module.exports= Mongoose.model("adviser_theme", adviser_theme_schema)