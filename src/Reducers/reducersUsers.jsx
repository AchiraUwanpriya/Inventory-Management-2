import {
    // USERS_REQUEST,
    // USERS_SUCCESS, 
    // USERS_FAIL,
    // GetAllUsers_REQUEST,
    // GetAllUsers_SUCCESS,
    // GetAllUsers_FAIL,
    // AddUsersDetails_REQUEST,
    // AddUsersDetails_SUCCESS,
    // AddUsersDetails_FAIL,
    // GetUsersByUserId_REQUEST, 
    // GetUsersByUserId_SUCCESS,
    // GetUsersByUserId_FAIL,
    DeleteUsersDetails_REQUEST,
    DeleteUsersDetails_SUCCESS,
    DeleteUsersDetails_FAIL       
} from '../Constants/constantsUsers';

const initialState = {
    responseBody: [],
    loading: false,
    msg: null,
};

// //Get all users
// export const GetAllUsers = (state = initialState, action) => {
//     switch (action.type) {
//         case GetAllUsers_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case GetAllUsers_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case GetAllUsers_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }

// // Add new users
// export const AddUsersDetails = (state = initialState, action) => {
//     switch (action.type) {
//         case AddUsersDetails_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case AddUsersDetails_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case AddUsersDetails_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }

// // Get users by id
// export const GetUsersByUserId = (state = initialState, action) => {
//     switch (action.type) {
//         case GetUsersByUserId_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case GetUsersByUserId_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case GetUsersByUserId_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }


// Delete users details
export const DeleteUsersDetails = (state = initialState, action) => {
    switch (action.type) {
        case DeleteUsersDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case DeleteUsersDetails_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case DeleteUsersDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}