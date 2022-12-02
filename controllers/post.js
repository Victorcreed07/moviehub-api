import PostModel from '../model/postMessage.js'
import mongoose from 'mongoose'

export const getData = async (req,res) => {

	const {page} = req.query
	if(page === null || page === undefined)
		{
			page = 1
		}
	const limit = 6
	const startindex = (Number(page)-1) * limit // where we start at each page
try{
	const total = await PostModel.countDocuments({});
	const data = await PostModel.find().sort({_id:-1}).limit(limit).skip(startindex)
	//we find and sort according to latest documents and skip everything before start index 
	
	res.status(200).json({data:data,currentPage:Number(page),totalPages:Math.ceil(total/limit)})

}
catch(error){

	res.status(409).json({message:error})

}

}


export const getAdata = async (req,res) => {

	const {id} = req.params

	try{
		// if(!mongoose.Types.ObjectId.isValid(id)) return res.status(405).send('No postss with that id');
		const data = await PostModel.findById(id)

		res.status(200).json(data)
	}
	catch(error)
	{
		res.status(409).json({message:error})
	}
}



export const  postData = async (req,res) => {

const data = req.body;
const modeldata = new PostModel({...data,creator:req.userid,createdAt: new Date().toISOString()})

try{
	await modeldata.save()
	res.status(200).json(modeldata)
}
catch(error){

res.status(409).json({message:error})
}

}


export const updateData = async (req,res) => {

	const {id} = req.params
	const body = req.body
	console.log(id)
	console.log(body)
	if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

	const updatedData =  await PostModel.findByIdAndUpdate(id,body,{new:true})
	res.json(updatedData)
	
	
	
}

export const deleteData  = async (req,res) => {

	const {id} = req.params
if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
	console.log(id)
	await PostModel.findByIdAndRemove(id);

	res.json({message:`${id} successfully deleted`})

}

export const likeData = async (req,res) => {

	if(!req.userid)
		return res.status(400).send('You are not allowed to Like')
	console.log(req.userid)
	const {id} = req.params
	if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

	const Post = await PostModel.findById(id)

	const findOne = Post.likes.findIndex((id)=> id === String(req.userid))

	if(findOne === -1)
		{
			Post.likes.push(req.userid)
		}
		else
			{
				console.log('Hello')
				Post.likes = Post.likes.filter((id) => id !== String(req.userid))
			}

	const likedData = await PostModel.findByIdAndUpdate(id,Post,{new:true})
	res.json(likedData)

}


export const CommentData = async (req,res) => {

 const {id} = req.params
const finalcomment = req.body
// console.log(finalcomment)
console.log(Object.keys(finalcomment)[0])
const post = await PostModel.findById(id)

post.comments.push(Object.keys(finalcomment)[0])

const updatedcomment = await PostModel.findByIdAndUpdate(id,post,{new:true})

res.status(200).json(updatedcomment)

}

export const searchData = async( req,res) => {

	const {search,tags} = req.query
	console.log(search)
	console.log(tags)
	try{
		const title= new RegExp(search,'i') //i ignore case
		const posts = await PostModel.find({ $or:[{title},{tags:{$in:tags.split(',')}}]})
		// $or and $in are mongodb queries learn by googling
		// find either title or by tags
		res.json(posts)
	}
	catch(error)
	{
		res.status(409).json({message:error})
	}
}