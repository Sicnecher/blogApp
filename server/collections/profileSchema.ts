import { Schema } from 'mongoose';

const profileCollectionHandler = (existingConnection: any) => {
    const collectionSchema = new Schema({
      userId:{
        type: Schema.Types.ObjectId,
        required: true
      },
      image: String
    },{ collection: 'profiles' });
  
    const CollectionModel = existingConnection.model('profiles', collectionSchema);
    return CollectionModel;
  };

export default profileCollectionHandler