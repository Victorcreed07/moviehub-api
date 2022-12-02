import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import postroute from './routes/post.js'
import userroute from './routes/user.js'

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit:'30mb',extended:'true' }))
app.use(bodyParser.urlencoded({ limit:'30mb',extended:'true' }))
app.use(cors())

app.use('/post',postroute)
app.use('/user',userroute)




const port = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{
	useNewUrlParser:true,//just to avoid some warnings no big deal
	useUnifiedTopology:true
}).then(() => app.listen(port,() => {
	console.log('Database connected')
	console.log(`Server is listening on port ${port}`)})).
catch((e) => console.log(e))

// mongoose.set('useFindAndModify',false)