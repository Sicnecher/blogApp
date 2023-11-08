
  interface createBlogValues {
    title: string;
    subject: string;
    description: string;
    isPublic: boolean;
    image?: File | null
  };

  interface PostFormValues {
    postInput: string;
  };

  interface Post {
    authorId:string;
    authorImage: string;
    authorName:String;
    postTime: string;
    postInput: string;
  };

  interface Blog {
    title: string;
    subject: string;
    description: string;
    isPublic: boolean;
    _id: string;
    image: string;
    posts: Post[];
}

  interface User{
    username:string,
    email:string,
    password:string,
    image:string,
    _id:string
  };

  interface SignInFormValues {
    username: string;
    password: string;
  };

  interface SignUpFormValues {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
};

interface UploadImage{
  image:string | null
}

interface blogsMainQuery{
  isPublic?: boolean,
  members?: {
    $elemMatch: 
    {
      memberId: string
    }
  }
}

 export type { createBlogValues, PostFormValues, Blog, User, Post, SignInFormValues, SignUpFormValues, UploadImage, blogsMainQuery }