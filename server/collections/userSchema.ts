import { Schema } from 'mongoose';

const userCollectionHandler = (existingConnection: any) => {
    const collectionSchema = new Schema({
      username:{
          type:String,
          required:true,
          unique:true
      },
      email:{
          type:String,
          required:true
      },
      password:{
          type:String,
          required:true,
          unique:true
      }
    },{ collection: 'users' });
  
    const CollectionModel = existingConnection.model('users', collectionSchema);
    return CollectionModel;
  };

export default userCollectionHandler