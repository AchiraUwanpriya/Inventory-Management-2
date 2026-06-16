// import CustomersService from '../Services/servicesCustomers';
// import {
//     GetAllCustomers_REQUEST,
//     GetAllCustomers_SUCCESS,
//     GetAllCustomers_FAIL,
//     AddCustomersDetails_REQUEST,
//     AddCustomersDetails_SUCCESS,
//     AddCustomersDetails_FAIL,
//     GetCustomersByCustomerId_REQUEST,
//     GetCustomersByCustomerId_SUCCESS,
//     GetCustomersByCustomerId_FAIL,
//     PutCustomersDetails_REQUEST,
//     PutCustomersDetails_SUCCESS,
//     PutCustomersDetails_FAIL
//     // DeleteCustomersDetails_REQUEST,
//     // DeleteCustomersDetails_SUCCESS,
//     // DeleteCustomersDetails_FAIL
// } from '../Constants/constantsCustomers';

// // ========================
// // Get All Customers
// // ========================
// export const GetAllCustomers = () => async (dispatch) => {
//     try {
//         dispatch({ type: GetAllCustomers_REQUEST });

//         const data = await CustomersService.GetAllCustomers();
//         console.log("✅ GetAllCustomers Response:", data);

//         if (data.Status === 'Success') {
//             dispatch({
//                 type: GetAllCustomers_SUCCESS,
//                 payload: data.ResultSet || [],
//             });
//         } else {
//             dispatch({
//                 type: GetAllCustomers_FAIL,
//                 payload: data.Message || "Failed to fetch customers",
//             });
//         }
//     } catch (error) {
//         console.error("❌ GetAllCustomers Error:", error);
//         dispatch({
//             type: GetAllCustomers_FAIL,
//             payload: error.message || "Failed to fetch customers",
//         });
//     }
// };

// // ========================
// // Add Customer
// // ========================
// export const AddCustomersDetails = (customer) => async (dispatch) => {
//     try {
//         dispatch({ type: AddCustomersDetails_REQUEST });

//         const data = await CustomersService.AddCustomersDetails(customer);
//         console.log("✅ AddCustomersDetails Response:", data);

//         if (data.Status === 'Success') {
//             dispatch({
//                 type: AddCustomersDetails_SUCCESS,
//                 payload: data.ResultSet || [],
//             });
//             dispatch(GetAllCustomers()); // refresh list
//         } else {
//             dispatch({
//                 type: AddCustomersDetails_FAIL,
//                 payload: data.Message || "Failed to add customer",
//             });
//         }
//     } catch (error) {
//         console.error("❌ AddCustomersDetails Error:", error);
//         dispatch({
//             type: AddCustomersDetails_FAIL,
//             payload: error.message || "Failed to add customer",
//         });
//     }
// };

// // ========================
// // Get Customer by ID
// // ========================
// export const GetCustomersByCustomerId = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: GetCustomersByCustomerId_REQUEST });

//         const data = await CustomersService.GetCustomersByCustomerId(id);
//         console.log("✅ GetCustomersByCustomerId Response:", data);

//         if (data.Status === 'Success') {
//             dispatch({
//                 type: GetCustomersByCustomerId_SUCCESS,
//                 payload: data.ResultSet || [],
//             });
//         } else {
//             dispatch({
//                 type: GetCustomersByCustomerId_FAIL,
//                 payload: data.Message || "Failed to fetch customer",
//             });
//         }
//     } catch (error) {
//         console.error("❌ GetCustomersByCustomerId Error:", error);
//         dispatch({
//             type: GetCustomersByCustomerId_FAIL,
//             payload: error.message || "Failed to fetch customer",
//         });
//     }
// };

// // ========================

// export const PutCustomersDetails = (customer) => async (dispatch) => {
//     dispatch({
//         type: PutCustomersDetails_REQUEST,
//     });

//     return await CustomersService.PutCustomersDetails(customer).then(
//         (data) => {
//             if (data.data.Status === 'Error') {
//                 dispatch({
//                     type: PutCustomersDetails_SUCCESS,
//                     payload: {
//                         responseBody: data.data.ResultSet
//                     },
//                 });
//             } else {
//                 dispatch({
//                     type: PutCustomersDetails_FAIL,
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
//                 type: PutCustomersDetails_FAIL,
//                 payload: {
//                     msg: message,
//                 },
//             });
//             return Promise.reject();
//         }
//     );
// };

// // // Delete Customer
// // // ========================
// // export const DeleteCustomersDetails = (id) => async (dispatch) => {
// //     try {
// //         dispatch({ type: DeleteCustomersDetails_REQUEST });

// //         const data = await CustomersService.DeleteCustomersDetails(id);
// //         console.log("✅ DeleteCustomersDetails Response:", data);

// //         if (data.Status === 'Success') {
// //             dispatch({
// //                 type: DeleteCustomersDetails_SUCCESS,
// //                 payload: data.ResultSet || [],
// //             });
// //             dispatch(GetAllCustomers()); // refresh list
// //         } else {
// //             dispatch({
// //                 type: DeleteCustomersDetails_FAIL,
// //                 payload: data.Message || "Failed to delete customer",
// //             });
// //         }
// //     } catch (error) {
// //         console.error("❌ DeleteCustomersDetails Error:", error);
// //         dispatch({
// //             type: DeleteCustomersDetails_FAIL,
// //             payload: error.message || "Failed to delete customer",
// //         });
// //     }
// // };
import CustomersService from '../Services/servicesCustomers';
import {
  GetAllCustomers_REQUEST,
  GetAllCustomers_SUCCESS,
  GetAllCustomers_FAIL,
  AddCustomersDetails_REQUEST,
  AddCustomersDetails_SUCCESS,
  AddCustomersDetails_FAIL,
  PutCustomersDetails_REQUEST,
  PutCustomersDetails_SUCCESS,
  PutCustomersDetails_FAIL
} from '../Constants/constantsCustomers';

// Get All Customers
export const GetAllCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: GetAllCustomers_REQUEST });
    const data = await CustomersService.GetAllCustomers();
    console.log("✅ GetAllCustomers Response in Action:", data);

    if (data.StatusCode === 200) {
      // 🔑 Normalize: always pass the array only
      dispatch({
        type: GetAllCustomers_SUCCESS,
        payload: data.ResultSet || []
      });
    } else {
      dispatch({
        type: GetAllCustomers_FAIL,
        payload: data.Result || "Failed to fetch customers"
      });
    }
  } catch (error) {
    dispatch({ type: GetAllCustomers_FAIL, payload: error.message });
  }
};
// Add Customer
export const AddCustomersDetails = (customer) => async (dispatch) => {
  try {
    dispatch({ type: AddCustomersDetails_REQUEST });
    console.log("✅ Sending AddCustomersDetails payload:", customer);

    const data = await CustomersService.AddCustomersDetails(customer);
    console.log("✅ API Response from AddCustomersDetails:", data);

    if (data.StatusCode === 200) {
      // Use the returned object from API if available
      const addedCustomer = data.ResultSet ? data.ResultSet[0] : customer;

      dispatch({
        type: AddCustomersDetails_SUCCESS,
        payload: addedCustomer
      });

      dispatch(GetAllCustomers());
    } else {
      dispatch({
        type: AddCustomersDetails_FAIL,
        payload: data.Result || "Failed to add customer"
      });
    }
  } catch (error) {
    console.error("❌ Error in AddCustomersDetails:", error);
    dispatch({
      type: AddCustomersDetails_FAIL,
      payload: error.message
    });
  }
};



// Update Customer
export const PutCustomersDetails = (customer) => async (dispatch) => {
  try {
    dispatch({ type: PutCustomersDetails_REQUEST });
    const data = await CustomersService.PutCustomersDetails(customer);

    if (data.StatusCode === 200) {
      dispatch({ type: PutCustomersDetails_SUCCESS, payload: data });
      dispatch(GetAllCustomers()); // refresh list
    } else {
      dispatch({ type: PutCustomersDetails_FAIL, payload: data.Result });
    }
  } catch (error) {
    dispatch({ type: PutCustomersDetails_FAIL, payload: error.message });
  }
};
