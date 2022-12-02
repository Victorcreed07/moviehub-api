import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

	// title:String,
	// message:String,
	// creator:String,
	// tags:[String],
	// selectedFile:String,
	// likeCount:{
	// 	type:String,
	// 	default:0
	// },
	// createdAt:{
	// 	type:Date,
	// 	default:new Date()
	// }

	name:{type:String,required:true},
	email:{type:String,required:true},
	password:{type:String,required:true},
	id:String
})

const UserModel = mongoose.model('UserModel',userSchema)

export default UserModel

