import {
    // SALESORDERITEMS_REQUEST,
    // SALESORDERITEMS_SUCCESS, 
    // SALESORDERITEMS_FAIL,
    GetAllSalesOrderItems_REQUEST,
    GetAllSalesOrderItems_SUCCESS,
    GetAllSalesOrderItems_FAIL,
    AddSalesOrderItemsDetails_REQUEST,
    AddSalesOrderItemsDetails_SUCCESS,
    AddSalesOrderItemsDetails_FAIL,
    GetSalesOrderItemsByItemId_REQUEST, 
    GetSalesOrderItemsByItemId_SUCCESS,
    GetSalesOrderItemsByItemId_FAIL,
    PutSalesOrderItemsDetails_REQUEST,
    PutSalesOrderItemsDetails_SUCCESS,
    PutSalesOrderItemsDetails_FAIL
    // DeleteSalesOrderItemsDetails_REQUEST,
    // DeleteSalesOrderItemsDetails_SUCCESS,
    // DeleteSalesOrderItemsDetails_FAIL       
} from '../Constants/constantsSalesOrderItems';

const initialState = {
    responseBody: [],
    loading: false,
    msg: null,
};

//Get all salesOrderItems
export const GetAllSalesOrderItems = (state = initialState, action) => {
    switch (action.type) {
        case GetAllSalesOrderItems_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetAllSalesOrderItems_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case GetAllSalesOrderItems_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}

// Add new salesOrderItems
export const AddSalesOrderItemsDetails = (state = initialState, action) => {
    switch (action.type) {
        case AddSalesOrderItemsDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case AddSalesOrderItemsDetails_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case AddSalesOrderItemsDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}

// Get salesOrderItems by id
export const GetSalesOrderItemsByItemId = (state = initialState, action) => {
    switch (action.type) {
        case GetSalesOrderItemsByItemId_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetSalesOrderItemsByItemId_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case GetSalesOrderItemsByItemId_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}


// Put SalesOrderItems
export const PutSalesOrderItemsDetails = (state = initialState, action) => {
    switch (action.type) {
        case PutSalesOrderItemsDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case PutSalesOrderItemsDetails_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case PutSalesOrderItemsDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
};

// // Delete salesrderItems details
// export const DeleteSalesOrderItemsDetails = (state = initialState, action) => {
//     switch (action.type) {
//         case DeleteSalesOrderItemsDetails_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case DeleteSalesOrderItemsDetails_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case DeleteSalesOrderItemsDetails_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }