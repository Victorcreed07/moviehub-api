import express from 'express'
import { getData } from '../controllers/post.js'
import { getAdata } from '../controllers/post.js'
import { postData } from '../controllers/post.js'
import { updateData } from '../controllers/post.js'
import { deleteData } from '../controllers/post.js'
import { likeData } from '../controllers/post.js'
import { searchData } from '../controllers/post.js'
import { CommentData } from '../controllers/post.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/',getData);

router.post('/',auth,postData);
router.patch('/:id',auth,updateData);
router.delete('/:id',auth,deleteData);
router.patch('/:id/likepost',auth,likeData);
router.post('/:id/comment',auth,CommentData);
router.get('/search',searchData);
router.get('/:id',getAdata);

export default router