import {
    // PURCHASEORDERS_REQUEST,
    // PURCHASEORDERS_SUCCESS, 
    // PURCHASEORDERS_FAIL,
    GetAllPurchaseOrders_REQUEST,
    GetAllPurchaseOrders_SUCCESS,
    GetAllPurchaseOrders_FAIL,
    AddPurchaseOrdersDetails_REQUEST,
    AddPurchaseOrdersDetails_SUCCESS,
    AddPurchaseOrdersDetails_FAIL,
    GetPurchaseOrdersByPurchaseOrderId_REQUEST, 
    GetPurchaseOrdersByPurchaseOrderId_SUCCESS,
    GetPurchaseOrdersByPurchaseOrderId_FAIL,
    PutPurchaseOrdersDetails_REQUEST,
    PutPurchaseOrdersDetails_SUCCESS,
    PutPurchaseOrdersDetails_FAIL
    // DeletePurchaseOrdersDetails_REQUEST,
    // DeletePurchaseOrdersDetails_SUCCESS,
    // DeletePurchaseOrdersDetails_FAIL       
} from '../Constants/constantsPurchaseOrders';

const initialState = {
    responseBody: [],
    loading: false,
    msg: null,
};

//Get all purchaseOrders
export const GetAllPurchaseOrders = (state = initialState, action) => {
    switch (action.type) {
        case GetAllPurchaseOrders_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetAllPurchaseOrders_SUCCESS:
  return {
    ...state,
    responseBody: action.payload,  // now this is guaranteed to be the array
    loading: false,
    msg: null,
  };


        case GetAllPurchaseOrders_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}

// Add new purchaseOrders
export const AddPurchaseOrdersDetails = (state = initialState, action) => {
    switch (action.type) {
        case AddPurchaseOrdersDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case AddPurchaseOrdersDetails_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case AddPurchaseOrdersDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}

// Get purchaseOrders by id
export const GetPurchaseOrdersByPurchaseOrderId = (state = initialState, action) => {
    switch (action.type) {
        case GetPurchaseOrdersByPurchaseOrderId_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetPurchaseOrdersByPurchaseOrderId_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case GetPurchaseOrdersByPurchaseOrderId_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}


// Put PurchaseOrders
export const PutPurchaseOrdersDetails = (state = initialState, action) => {
    switch (action.type) {
        case PutPurchaseOrdersDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case PutPurchaseOrdersDetails_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case PutPurchaseOrdersDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
};

// // Delete purchaseOrders details
// export const DeletePurchaseOrdersDetails = (state = initialState, action) => {
//     switch (action.type) {
//         case DeletePurchaseOrdersDetails_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case DeletePurchaseOrdersDetails_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case DeletePurchaseOrdersDetails_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }