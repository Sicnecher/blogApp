import { Router } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import { PROFILES, USERS } from '../app.js'

const router = Router();
const hashCount = 10
const apiKey = process.env.API_KEY

router.post('/authenticateUser', async (req, res) => {
    switch(req.body.headers.Authorization){
        case apiKey:
            const user = req.body.body.user;
        const foundUser = await USERS.findOne({ _id: user._id });
        if(foundUser){
            if (foundUser.username === user.username) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }
        }else{
            res.sendStatus(400);
        }
    break;
    default:
        res.sendStatus(404)
}
});

//API route to handle user info requests based on cookies and user id
router.post('/getUser', async (req: any, res: any) => {
    switch(req.body.headers.Authorization){
        case apiKey:
            if(req.body.body.userId){
                const userId = req.body.body.userId
                const user = await USERS.findOne({ _id: userId });
                const userImage = await PROFILES.findOne({ userId: userId });
                const newUser = await { ...user, image: userImage.image };
                res.send(newUser)
            }else{
                const user = req.cookies.user;
                const userImage = await PROFILES.findOne({ userId: user._id });
                const newUser = await { ...user, image: userImage.image };
                res.send(newUser)
            }
    break;
    default:
        res.sendStatus(400)
}
});

//API route to handle signIn form requests
router.post('/signIn', async (req: any, res: any) => {
  switch(req.body.headers.Authorization){
    case apiKey:
        const username = req.body.body.username;
        const password = req.body.body.password;
        const foundUser = await USERS.findOne({ username: username });
            if(foundUser){
                bcrypt.compare(password, foundUser.password, (err: Error | undefined, response: boolean) => {
                    if(response){
                        res.cookie('user', foundUser);
                        res.redirect('/');
                    }else{
                            res.sendStatus(400);
                        }
                    });
                }
                else {
                    res.sendStatus(400);
                }
            break;
        default:
            res.sendStatus(404);
    }
});

//API route to handle signUp form requests
router.post('/signUp', async (req, res) => {
    try {
      if (req.body.headers.Authorization === apiKey) {
        const form = req.body.body;
        const hash = await bcrypt.hash(form.password, hashCount);
  
        const newUser = new USERS({
          username: form.username,
          email: form.email,
          password: hash,
        });
  
        await newUser.save();
  
        const user = await USERS.findOne({ username: newUser.username });
  
        const response = new PROFILES({
          userId: user._id,
          image: '',
        });
  
        await response.save();
  
        res.send(user);
      } else {
        console.log(req.body.headers.Authorization, apiKey);
        res.sendStatus(400);
      }
    } catch (error: any) {
        if (error.message.includes('duplicate key') || error.message.includes('E11000')) {
            console.log('Duplicate key error');
            res.status(400).send('Duplicate key error');
          } else {
            console.log('Error:', error);
            res.sendStatus(400);
          }
    }
  });

  //API route to check user availibility for registeration validation checking
  router.get('/checkUsernameAvailability', async (req, res) => {
    try{
        switch(req.body.headers.Authorization){
            case apiKey:
                const { username } = req.query;
                const user = await USERS.findOne({ username });
                if (user) {
                res.json({ available: false });
                } else {
                res.json({ available: true });
                }
                break;
            default:
                console.log('access denied')
        }
    }catch(error: any){
        console.log(error.message)
    }
});

export default router