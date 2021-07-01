import axios from 'axios'

let userLogin = async (email,password,role) =>{
    try {
        console.log("here in user login")
        let response = await axios.post('http://localhost:5000/auth/signin',{
            email : email ,
            password : password,
            role :  role
        })
        return response
    }
    catch(error) {
        console.log(error)
    }
}

// let userProfile = async (id) =>{
//     try {
//         console.log("here in user profile")
//         let response = await axios.get(`http://localhost:5000/farmer/profile/${id}`);
//         return response
//     }
//     catch(error) {
//         console.log(error)
//     }
// }

export {
    userLogin,
    // userProfile
}