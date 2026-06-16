import {
  GetAllCustomers_REQUEST,
  GetAllCustomers_SUCCESS,
  GetAllCustomers_FAIL,
  AddCustomersDetails_REQUEST,
  AddCustomersDetails_SUCCESS,
  AddCustomersDetails_FAIL,
  GetCustomersByCustomerId_REQUEST,
  GetCustomersByCustomerId_SUCCESS,
  GetCustomersByCustomerId_FAIL,
  PutCustomersDetails_REQUEST,
  PutCustomersDetails_SUCCESS,
  PutCustomersDetails_FAIL
} from '../Constants/constantsCustomers';

const initialState = {
  loading: false,
  responseBody: [],
  msg: null,
};

// Get all customers
export const GetAllCustomers = (state = initialState, action) => {
  switch (action.type) {
    case GetAllCustomers_REQUEST:
      return { ...state, loading: true, msg: null };
    case GetAllCustomers_SUCCESS:
      return { ...state, loading: false, responseBody: action.payload, msg: null };
    case GetAllCustomers_FAIL:
      return { ...state, loading: false, responseBody: [], msg: action.payload };
    default:
      return state;
  }
};

// Add new customers
export const AddCustomersDetails = (state = initialState, action) => {
  switch (action.type) {
    case AddCustomersDetails_REQUEST:
      return { ...state, loading: true, msg: null };

    case AddCustomersDetails_SUCCESS:
      return {
        ...state,
        responseBody: [
          ...state.responseBody,
          action.payload // <- directly use the object
        ],
        loading: false,
        msg: "Customer added successfully"
      };

    case AddCustomersDetails_FAIL:
      return { ...state, loading: false, msg: action.payload };

    default:
      return state;
  }
};


// Get customers by id
export const GetCustomersByCustomerId = (state = initialState, action) => {
  switch (action.type) {
    case GetCustomersByCustomerId_REQUEST:
      return { ...state, loading: true, msg: null };
    case GetCustomersByCustomerId_SUCCESS:
      return { ...state, responseBody: action.payload, loading: false, msg: null };
    case GetCustomersByCustomerId_FAIL:
      return { ...state, loading: false, msg: action.payload };
    default:
      return state;
  }
};

// Put Customers
export const PutCustomersDetails = (state = initialState, action) => {
  switch (action.type) {
    case PutCustomersDetails_REQUEST:
      return { ...state, loading: true, msg: null };
    case PutCustomersDetails_SUCCESS:
      return { ...state, responseBody: action.payload, loading: false, msg: null };
    case PutCustomersDetails_FAIL:
      return { ...state, loading: false, msg: action.payload };
    default:
      return state;
  }
};



// // Delete customers details
// export const DeleteCustomersDetails = (state = initialState, action) => {
//     switch (action.type) {
//         case DeleteCustomersDetails_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case DeleteCustomersDetails_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case DeleteCustomersDetails_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }