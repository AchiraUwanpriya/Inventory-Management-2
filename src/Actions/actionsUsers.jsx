import {
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
    DeleteUsersDetails_FAIL,
}
from '../Constants/constantsUsers';

import UsersService from '../Services/servicesUsers';

// export const GetAllUsers = () => async (dispatch) => {
//     dispatch({
//         type: GetAllUsers_REQUEST,
//     });

//     return await UsersService.GetAllUsers().then(
//         (data) => {
//             if (data.data.Status === 'Error') {
//                 dispatch({
//                     type: GetAllUsers_SUCCESS,
//                     payload: {
//                         responseBody: data.data.ResultSet
//                     },
//                 });
//             } else {
//                 dispatch({
//                     type: GetAllUsers_FAIL,
//                     payload: {
//                         msg: "Sorry, something went wrong. Please try again later.",
//                     },
//                 });
//             }
//             return Promise.resolve();
//         },
//         (error) => {
//             const message = 
//                 (error.response && 
//                     error.response.data && 
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();
//             dispatch({
//                 type: GetAllUsers_FAIL,
//                 payload: {
//                     msg: message,
//                 },
//             });
//             return Promise.reject();    
//         }    
//     );
// };


// export const AddUsersDetails = () => async (dispatch) => {
//     dispatch({
//         type: AddUsersDetails_REQUEST,
//     });

//     return await UsersService.AddUsersDetails().then(
//         (data) => {
//             if (data.data.Status === 'Error') {
//                 dispatch({
//                     type: AddUsersDetails_SUCCESS,
//                     payload: {
//                         responseBody: data.data.ResultSet
//                     },
//                 });
//             } else {
//                 dispatch({
//                     type: AddUsersDetails_FAIL,
//                     payload: {
//                         msg: "Sorry, something went wrong. Please try again later.",
//                     },
//                 });
//             }
//             return Promise.resolve();
//         },
//         (error) => {
//             const message = 
//                 (error.response && 
//                     error.response.data && 
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();
//             dispatch({
//                 type: AddUsersDetails_FAIL,
//                 payload: {
//                     msg: message,
//                 },
//             });
//             return Promise.reject();    
//         }    
//     );
// };

// export const GetUsersByUserId = () => async (dispatch) => {
//     dispatch({
//         type: GetUsersByUserId_REQUEST,
//     });

//     return await UsersService.GetUsersByUserId().then(
//         (data) => {
//             if (data.data.Status === 'Error') {
//                 dispatch({
//                     type: GetUsersByUserId_SUCCESS,
//                     payload: {
//                         responseBody: data.data.ResultSet
//                     },
//                 });
//             } else {
//                 dispatch({
//                     type: GetUsersByUserId_FAIL,
//                     payload: {
//                         msg: "Sorry, something went wrong. Please try again later.",
//                     },
//                 });
//             }
//             return Promise.resolve();
//         },
//         (error) => {
//             const message = 
//                 (error.response && 
//                     error.response.data && 
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();
//             dispatch({
//                 type: GetUsersByUserId_FAIL,
//                 payload: {
//                     msg: message,
//                 },
//             });
//             return Promise.reject();    
//         }    
//     );
// };

export const DeleteUsersDetails = () => async (dispatch) => {
    dispatch({
        type: DeleteUsersDetails_REQUEST,
    });

    return await UsersService.DeleteUsersDetails().then(
        (data) => {
            if (data.data.Status === 'Error') {
                dispatch({
                    type: DeleteUsersDetails_SUCCESS,
                    payload: {
                        responseBody: data.data.ResultSet
                    },
                });
            } else {
                dispatch({
                    type: DeleteUsersDetails_FAIL,
                    payload: {
                        msg: "Sorry, something went wrong. Please try again later.",
                    },
                });
            }
            return Promise.resolve();
        },
        (error) => {
            const message = 
                (error.response && 
                    error.response.data && 
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: DeleteUsersDetails_FAIL,
                payload: {
                    msg: message,
                },
            });
            return Promise.reject();    
        }    
    );
};