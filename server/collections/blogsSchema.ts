import { Schema } from 'mongoose'

const blogsCollectionHandler = (existingConnection: any) => {

    const postsSchema = new Schema({
      authorId:{
        type: String,
        required: true
      },
        authorImage:{
            type: String,
            required:true
        },
        authorName: String,
        postTime:{
            type: String,
            required: true
        },
        postInput:{
            type:String,
            required: true
        }
    })

    const memberSchema = new Schema({
        memberId: {
            type: Schema.Types.ObjectId,
            required: true
        }
    });

    const collectionSchema = new Schema({
      title:{
          type:String,
          required:true,
          unique:true
      },
      subject: {
        type:String,
        required: true
      },
      description:{
        type: String,
        required: true
      },
      image:String,
      posts:[postsSchema],
      members:[memberSchema],
      isPublic: {
        type: Boolean,
        required: true
      }
    }, { collection: 'blogs' });
  
    const CollectionModel = existingConnection.model('blogs', collectionSchema);
    return CollectionModel;
  };
  
export default blogsCollectionHandler