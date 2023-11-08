import { Router } from 'express';
import { BLOGS, USERS, PROFILES } from '../app.js'
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
const apiKey = process.env.API_KEY

//API to handle image uploads for blogs and users
router.patch('/uploadImg', async (req, res) => {
    try{
        switch(req.body.headers.Authorization){
            case apiKey:
                const {key, file} = req.body.body
                const query = { _id: key }
                const update = {
                    $set: { image: file }
                }
                const blog = await BLOGS.findOneAndUpdate(query, update, { new: true })
                const user = await USERS.findOne(query)
                if(blog){
                    res.sendStatus(200);
                }else if(user){
                    const profile = await PROFILES.findOneAndUpdate({userId: query._id}, update, { new: true })
                    res.sendStatus(200);
                }else{
                    res.status(400).json({ message: 'incorrect document id' })
                }
                break;
                default:
                    res.status(400).json({ message: 'Invalid authorization' });
        }
    }catch(error){
        console.log(error)
        res.sendStatus(413)
    }
});

export default router