import {
    // SUPPLIERS_REQUEST,
    // SUPPLIERS_SUCCESS, 
    // SUPPLIERS_FAIL,
    GetAllSuppliers_REQUEST,
    GetAllSuppliers_SUCCESS,
    GetAllSuppliers_FAIL,
    AddSuppliersDetails_REQUEST,
    AddSuppliersDetails_SUCCESS,
    AddSuppliersDetails_FAIL,
    GetSuppliersBySupplierId_REQUEST, 
    GetSuppliersBySupplierId_SUCCESS,
    GetSuppliersBySupplierId_FAIL,
    PutSuppliersDetails_REQUEST,
    PutSuppliersDetails_SUCCESS,
    PutSuppliersDetails_FAIL
    // DeleteSuppliersDetails_REQUEST,
    // DeleteSuppliersDetails_SUCCESS,
    // DeleteSuppliersDetails_FAIL       
} from '../Constants/constantsSuppliers';

// const initialState = {
//     responseBody: [],
//     loading: false,
//     msg: null,
// };

// //Get all suppliers
// export const GetAllSuppliers = (state = initialState, action) => {
//     switch (action.type) {
//         case GetAllSuppliers_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case GetAllSuppliers_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case GetAllSuppliers_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }
const initialState = {
  suppliers: [],
  loading: false,
  msg: null,
};

// export const GetAllSuppliers = (state = initialState, action) => {
//   switch (action.type) {
//     case GetAllSuppliers_REQUEST:
//       return { ...state, loading: true, msg: null };
//     case GetAllSuppliers_SUCCESS:
//       return {
//         ...state,
//         suppliers: action.payload,  // ✅ store in suppliers
//         loading: false,
//         msg: null,
//       };
//     case GetAllSuppliers_FAIL:
//       return { ...state, loading: false, msg: action.payload };
//     default:
//       return state;
//   }
// };

export const GetAllSuppliers = (state = initialState, action) => {
  switch (action.type) {
    case GetAllSuppliers_REQUEST:
      return { ...state, loading: true, msg: null };

    case GetAllSuppliers_SUCCESS:
      console.log("✅ Reducer received suppliers payload:", action.payload); // 👈 debug here
      return {
        ...state,
        suppliers: action.payload,  // ✅ store in suppliers
        loading: false,
        msg: null,
      };

    case GetAllSuppliers_FAIL:
      return { ...state, loading: false, msg: action.payload };

    default:
      return state;
  }
};


// Add new suppliers
// export const AddSuppliersDetails = (state = initialState, action) => {
//     switch (action.type) {
//         case AddSuppliersDetails_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case AddSuppliersDetails_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case AddSuppliersDetails_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }


export const AddSuppliersDetails = (state = initialState, action) => {
    switch (action.type) {
        case AddSuppliersDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case AddSuppliersDetails_SUCCESS:
            return {
                ...state,
                suppliers: [...state.suppliers, action.payload], // ✅ add new supplier to list
                loading: false,
                msg: null,
            };
        case AddSuppliersDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}

// Get suppliers by id
export const GetSuppliersBySupplierId = (state = initialState, action) => {
    switch (action.type) {
        case GetSuppliersBySupplierId_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetSuppliersBySupplierId_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case GetSuppliersBySupplierId_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}


// Put Suppliers
export const PutSuppliersDetails = (state = initialState, action) => {
    switch (action.type) {
        case PutSuppliersDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case PutSuppliersDetails_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case PutSuppliersDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
};

// // Delete suppliers details
// export const DeleteSuppliersDetails = (state = initialState, action) => {
//     switch (action.type) {
//         case DeleteSuppliersDetails_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case DeleteSuppliersDetails_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case DeleteSuppliersDetails_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }