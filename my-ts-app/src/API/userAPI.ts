import axios from 'axios';
import { API } from './dotenv.API';
import Cookies from 'js-cookie'

//API to check if the user id exists in the system
const authenticateUser = async () => {
    try{
            const cookieValue: string | undefined = Cookies.get('user')
            if(!cookieValue){
                return false
            }else{
                const userResponse = await axios.post('API/users/getUser', {
                    headers:{
                        Authorization: API.KEY
                    },
                    body: {
                        userId: undefined
                    }
                })
                const response = await axios.post(`API/users/authenticateUser`, {
                    headers:{
                        Authorization: API.KEY
                    },
                    body: {user: userResponse.data}
                });
                if (response.status === 200) {
                    return true;
                } else {
                    throw new Error(`API request failed with status ${response.status}`);
              }
            }
    }catch(error){
        console.error('An error occurred:', error);
        throw error;
    }
}

//API to get different types of users based on user ids or cookie
const getUser = async (userId: string | undefined) => {
    try{
        const cookieValue = Cookies.get('user')
        if(!cookieValue){
            return undefined
        }else{
            const response = await axios.post('API/users/getUser', {
                headers:{
                    Authorization: API.KEY
                },
                body: {
                    userId: userId
                }
            });
            return response.data
        }
    }catch(error){
        console.log(error)
    }
}

//checks username availibility for registeration
const usernameAvailabilityAPI = async (username:string) => {
    try {
        const response: any = await axios.get(`/API/users/checkUsernameAvailability?username=${username}`, {
            headers: {
                Authorization: API.KEY
            }
        });
        const data = await response.data
        return data.available;
      } catch (error) {
        console.error('Error checking username availability:', error);
        return false;
      }
}

export {authenticateUser, getUser, usernameAvailabilityAPI}