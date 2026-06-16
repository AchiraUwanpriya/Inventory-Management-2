import axios from 'axios';
//import Base_url from "../config";


// const GetAllUsers = async () => {
//     let config = {
//         method: 'get',
//         url: '/Users/GetAllUsers',
//     };
    
//     return axios.request(config).then((response) => {
//             return response;
//     });
// };

// const AddUsersDetails = async (user) => {
//     let config = {
//         method: 'post',
//         url: '/Users/AddUsersDetails',
//         data: user
//     };
    
//     return axios.request(config).then((response) => {
//             return response;
//     });
// };

// const GetUsersByUserId = async () => {
//     let config = {
//         method: 'get',
//         url: '/Users/GetUsersByUserId',
//     };
    
//     return axios.request(config).then((response) => {
//             return response;
//     });
// };

const DeleteUsersDetails = async () => {
    let config = {
        method: 'delete',
        url: '/Users/DeleteUsersDetails',
    };
    
    return axios.request(config).then((response) => {
            return response;
    });
};

export default {
    // GetAllUsers,  
    // AddUsersDetails,
    // GetUsersByUserId,
    DeleteUsersDetails
};