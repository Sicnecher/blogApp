import Cookies from "js-cookie"

//disconnection function
const disconnect = async () => {
    try{
        Cookies.remove('user')
        window.location.href='/'
    }catch(error){
        console.log(error)
    }
}

export { disconnect }