import mongoose from 'mongoose'
import UserModel from '../model/userMessage.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const SignIn = async (req,res) => {

const {email,password} = req.body

try{
		const User = await UserModel.findOne({email:email})

		if(!User)
			return res.status(404).json({message:'User does not exist'})

		const Pass = await bcrypt.compare(password,User.password)

		if(!Pass)
			return res.status(404).json({message:'Invalid Credentials'})

		const token = jwt.sign({email:User.email,id:User._id},'coin',{expiresIn:'1h'})

		return res.status(200).json({result:User,token})
} 
catch(error)
{
	res.status(500).json({message:'Something went wrong'})
}
}

export const SignUp = async (req,res) => {

	const {email,password,Confirmpassword,FirstName,LastName} = req.body;
	

	try{
			const User = await UserModel.findOne({email:email})

			if(User)
				return res.status(404).json({message:'User already exist'})

			if(password !== Confirmpassword)
				return res.status(404).json({message:"passwords don't match"})

			const hashedPass = await bcrypt.hash(password,12)
			const name = `${FirstName} ${LastName}`

			const result = await UserModel.create({email,password:hashedPass,name:name})
			console.log(result)
			const token = jwt.sign({email:result.email,id:result._id},'coin',{expiresIn:'1h'})
			console.log(token)
			return res.status(200).json({result,token})

	}
	catch(error)
	{
		console.log("Hi")
		res.status(500).json({message:'Something went wrong'})
	}
}