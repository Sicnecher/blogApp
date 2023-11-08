import { Router } from 'express';
import { BLOGS, PROFILES } from '../app.js'
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
const apiKey = process.env.API_KEY

//API route to handle requests for different blogs based on requests
router.post('/getBlogs', async (req: any, res: any) => {
    try{
        switch(req.body.headers.Authorization){
            case apiKey:
                const queryParams = await req.query.query
                if(queryParams){
                    const publicBlogs = await BLOGS.find({
                        description: { $regex: new RegExp(queryParams, 'i') }
                        }).limit(20);
                    res.send(publicBlogs);
                }else{
                    const query = await req.body.body.query
                    console.log(query)
                    const publicBlogs = await BLOGS.find(query);
                    res.send(publicBlogs);
                }
              break;
         default:
        res.sendStatus(404)
      }
    }catch(error: any){
        console.log(error.message)
        res.sendStatus(400)
    }
});

//API route to handle blog creation
router.post('/createBlog', async (req: any, res: any) => {
    try{
        switch(req.body.headers.Authorization){
            case apiKey:
                const data = req.body.body
                const newBlog = await new BLOGS({
                    title:data.title,
                    subject:data.subject,
                    description:data.description,
                    isPublic: data.isPublic,
                    image:''
                });
                await newBlog.save()
                const response = await BLOGS.findOne({title: data.title});
                if(response){
                    res.json({ key: response._id })
                }
                break;
                default:
                    res.sendStatus(400)
        }
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
});

//API route to handle posts uploads
router.post('/uploadPost', async (req: any, res: any) => {
    try{
        switch(req.body.headers.Authorization){
            case apiKey:
                const {key, values} = req.body.body
                const userImage = await PROFILES.findOne({ userId: req.cookies.user._id });
                const minutes = new Date().getMinutes() < 10? '0'+ new Date().getMinutes() : new Date().getMinutes()
                const newPost = {
                    authorId:req.cookies.user._id,
                    authorImage:userImage.image,
                    authorName: req.cookies.user.username,
                    postTime: `${new Date().getHours()}:${minutes}`,
                    postInput: values.postInput
                }
                const filter = { _id: key }
                const update = {
                    $push: { posts: newPost }
                }
                const response = await BLOGS.findOneAndUpdate(filter, update, {new: true});
                if(!response){
                    res.status(400).json({ message: 'somthing went wrong' })
                }
                res.sendStatus(200)
                break;
                default:
                    console.log('access denied')
        }
    }catch(error){
        console.log(error)
        res.sendStatus(400)
    }
});

//API route to handle 'join' method
router.post('/addMember', async (req: any, res: any) => {
    try{
        switch(req.body.headers.Authorization){
            case apiKey:
                const userId = req.cookies.user._id
                const filter = req.body.body
                const update = {
                    $push: { members: { memberId: userId } }
                }
                const response = await BLOGS.findOneAndUpdate(filter, update, {new: true});
                if(!response){
                    res.status(400).json({ message: 'somthing went wrong' })
                }
                res.sendStatus(200)
                break;
                default:
                    console.log('access denied')
        }
    }catch(error){
        console.log(error)
        res.sendStatus(400)
    }
})

export default router