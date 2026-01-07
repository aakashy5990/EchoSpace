import express from 'express'
import { addThought, getThought } from '../controllers/ThoughtControllers.js';

const thoughtRouter = express.Router();

thoughtRouter.post('/addthought', addThought);
thoughtRouter.get('/getthought', getThought);

export default thoughtRouter;