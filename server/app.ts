import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
import cors from 'cors';
import userCollection from './collections/userSchema.js';
import blogsCollection from './collections/blogsSchema.js';
import profileCollection from './collections/profileSchema.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = process.env.MONGODB_URI || '';

//mongoose connection
mongoose.connect(db)
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
const USERS = userCollection(mongoose.connection)
const BLOGS = blogsCollection(mongoose.connection)
const PROFILES = profileCollection(mongoose.connection)

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//three different API routes
import userRoutes from './routes/users.js';
import blogRoutes from './routes/blogs.js';
import generalRoutes from './routes/general.js';

//app use
app.use(
  express.json(),
  express.static(path.join(__dirname, '..', '..', 'my-ts-app', 'build')),
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  cookieParser()
);

//error handeling in the case of image upload being too big
app.use((err: any, req: any, res: any, next: any) => {
  if (err.type === 'entity.too.large') {
    res.sendStatus(413)
  } else {
    next(err);
  }
});

app.use('/API/users', userRoutes);
app.use('/API/blogs', blogRoutes);
app.use('/API/general', generalRoutes)

export { USERS, BLOGS, PROFILES, app, cookieParser }

app.get('*', (req: any, res: any) => {

  res.sendFile(path.join(__dirname, '..', '..', 'my-ts-app', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Connected successfully to port ' + PORT);
});