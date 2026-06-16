import {
    // PURCHASEORDERITEMS_REQUEST,
    // PURCHASEORDERITEMS_SUCCESS, 
    // PURCHASEORDERITEMS_FAIL,
    GetAllPurchaseOrderItems_REQUEST,
    GetAllPurchaseOrderItems_SUCCESS,
    GetAllPurchaseOrderItems_FAIL,
    AddPurchaseOrderItemsDetails_REQUEST,
    AddPurchaseOrderItemsDetails_SUCCESS,
    AddPurchaseOrderItemsDetails_FAIL,
    GetPurchaseOrderItemsByItemId_REQUEST, 
    GetPurchaseOrderItemsByItemId_SUCCESS,
    GetPurchaseOrderItemsByItemId_FAIL,
    PutPurchaseOrderItemsDetails_REQUEST,
    PutPurchaseOrderItemsDetails_SUCCESS,
    PutPurchaseOrderItemsDetails_FAIL
    // DeletePurchaseOrderItemsDetails_REQUEST,
    // DeletePurchaseOrderItemsDetails_SUCCESS,
    // DeletePurchaseOrderItemsDetails_FAIL       
} from '../Constants/constantsPurchaseOrderItems';

const initialState = {
    responseBody: [],
    loading: false,
    msg: null,
};

//Get all purchaseOrderItems
export const GetAllPurchaseOrderItems = (state = initialState, action) => {
    switch (action.type) {
        case GetAllPurchaseOrderItems_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
case GetAllPurchaseOrderItems_SUCCESS:
  return {
    ...state,
    responseBody: action.payload, // ✅ correctly sets your 6 items
    loading: false,
    msg: null,
  };


        case GetAllPurchaseOrderItems_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}

// Add new purchaseOrderItems
export const AddPurchaseOrderItemsDetails = (state = initialState, action) => {
    switch (action.type) {
        case AddPurchaseOrderItemsDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
       case AddPurchaseOrderItemsDetails_SUCCESS:
  return {
    ...state,
    responseBody: [...state.responseBody, ...action.payload], // append
    loading: false,
    msg: null,
  };

        case AddPurchaseOrderItemsDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}

// Get purchaseOrderItems by id
export const GetPurchaseOrderItemsByItemId = (state = initialState, action) => {
    switch (action.type) {
        case GetPurchaseOrderItemsByItemId_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetPurchaseOrderItemsByItemId_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case GetPurchaseOrderItemsByItemId_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}


// Put PurchaseOrderItems
export const PutPurchaseOrderItemsDetails = (state = initialState, action) => {
    switch (action.type) {
        case PutPurchaseOrderItemsDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case PutPurchaseOrderItemsDetails_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case PutPurchaseOrderItemsDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
};

// // Delete purchaseOrderItems details
// export const DeletePurchaseOrderItemsDetails = (state = initialState, action) => {
//     switch (action.type) {
//         case DeletePurchaseOrderItemsDetails_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case DeletePurchaseOrderItemsDetails_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case DeletePurchaseOrderItemsDetails_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }