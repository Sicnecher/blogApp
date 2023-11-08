import { API } from './dotenv.API';
import axios from 'axios';
import { SignUpFormValues, SignInFormValues } from '../interfaces';

//API to handle the sign in process
const signInAPI = async (values: SignInFormValues) => {
    try{
        const response = await axios.post(`API/users/signIn`, {
            headers: {
                Authorization: API.KEY
            },
            body: values
        })
        if(response.status == 200){
            window.location.href='/'
        }
    }catch(error){
        console.log(error)
        throw error
    }
}

//API to handle the sign up process
const signUpAPI = async (values: SignUpFormValues) => {
    try{
        const response = await axios.post(`API/users/signUp`, {
            headers:{
                Authorization: API.KEY
            },
            body: values
        })

        if(response.status == 200){
            return response
        }
    }catch(error){
        console.log(error)
        throw error
    }
}

//saved function to turn image into Base64
function convertBase64(file: File){
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
};

const UploadImageAPI = async (key: string | undefined, data: { file: unknown | string } | undefined ) => {
   try{
    if(data){ 
    const response = await axios.patch('/API/general/uploadImg', {
        headers:{
            Authorization: API.KEY
        },
        body: {
            file: data.file,
            key: key
        }
    });
    if(response.status === 200){
        return true
    }
}
}catch(error){
    console.log(error)
    return false
}};

export {signInAPI, signUpAPI, convertBase64, UploadImageAPI }