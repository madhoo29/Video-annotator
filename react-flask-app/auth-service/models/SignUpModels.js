const mongoose =require('mongoose')
// An interface that describes the properties
// that are required to create a new User
const signUpTemplate= new mongoose.Schema(
	{
		Name: {
			type: String,
			required: true,
		},
		ID:{
			type: String,
			required: true,
		},
		Role: {
			type: String,
			enum: ["instructor", "student"],
			default: "student",
			required: true,
		},
		Password: {
			type: String,
			required: true,
		}
	})

const User = mongoose.model('mytable',signUpTemplate)
module.exports=User;
