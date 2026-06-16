import {
    // SALESORDERS_REQUEST,
    // SALESORDERS_SUCCESS, 
    // SALESORDERS_FAIL,
    GetAllSalesOrders_REQUEST,
    GetAllSalesOrders_SUCCESS,
    GetAllSalesOrders_FAIL,
    AddSalesOrdersDetails_REQUEST,
    AddSalesOrdersDetails_SUCCESS,
    AddSalesOrdersDetails_FAIL,
    GetSalesOrdersBySalesOrderId_REQUEST, 
    GetSalesOrdersBySalesOrderId_SUCCESS,
    GetSalesOrdersBySalesOrderId_FAIL,
    PutSalesOrdersDetails_REQUEST,
    PutSalesOrdersDetails_SUCCESS,
    PutSalesOrdersDetails_FAIL
    // DeleteSalesOrdersDetails_REQUEST,
    // DeleteSalesOrdersDetails_SUCCESS,
    // DeleteSalesOrdersDetails_FAIL       
} from '../Constants/constantsSalesOrders';

const initialState = {
    responseBody: [],
    loading: false,
    msg: null,
};

//Get all salesOrders
export const GetAllSalesOrders = (state = initialState, action) => {
    switch (action.type) {
        case GetAllSalesOrders_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetAllSalesOrders_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case GetAllSalesOrders_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}

// Add new salesOrders
export const AddSalesOrdersDetails = (state = initialState, action) => {
    switch (action.type) {
        case AddSalesOrdersDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case AddSalesOrdersDetails_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case AddSalesOrdersDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}

// Get salesOrders by id
export const GetSalesOrdersBySalesOrderId = (state = initialState, action) => {
    switch (action.type) {
        case GetSalesOrdersBySalesOrderId_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetSalesOrdersBySalesOrderId_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case GetSalesOrdersBySalesOrderId_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
}


// Put SalesOrders
export const PutSalesOrdersDetails = (state = initialState, action) => {
    switch (action.type) {
        case PutSalesOrdersDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case PutSalesOrdersDetails_SUCCESS:
            return {
                ...state,
                responseBody: action.payload,
                loading: false,
                msg: null,
            };
        case PutSalesOrdersDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload,
            };
        default:
            return state;
    }
};

// // Delete salesOrders details
// export const DeleteSalesOrdersDetails = (state = initialState, action) => {
//     switch (action.type) {
//         case DeleteSalesOrdersDetails_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case DeleteSalesOrdersDetails_SUCCESS:
//             return {
//                 ...state,
//                 responseBody: action.payload,
//                 loading: false,
//                 msg: null,
//             };
//         case DeleteSalesOrdersDetails_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload,
//             };
//         default:
//             return state;
//     }
// }