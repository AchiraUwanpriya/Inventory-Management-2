import {
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
    PutPurchaseOrdersDetails_FAIL,
} from '../Constants/constantsPurchaseOrders';

import PurchaseOrdersService from '../Services/servicesPurchaseOrders';

// ------------------ GET ALL ------------------
export const GetAllPurchaseOrders = () => async (dispatch) => {
    dispatch({ type: GetAllPurchaseOrders_REQUEST });

    return await PurchaseOrdersService.GetAllPurchaseOrders().then(
        (data) => {
            console.log("✅ GetAllPurchaseOrders Action Data:", data);

            if (data.StatusCode === 200) {
                dispatch({
  type: GetAllPurchaseOrders_SUCCESS,
  payload: data.ResultSet,  // just the array
});

            } else {
                dispatch({
                    type: GetAllPurchaseOrders_FAIL,
                    payload: { msg: data.Result || "Something went wrong" },
                });
            }
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GetAllPurchaseOrders_FAIL,
                payload: { msg: message },
            });
            return Promise.reject();
        }
    );
};

// ------------------ ADD ------------------
export const AddPurchaseOrdersDetails = (purchaseorder) => async (dispatch) => {
    dispatch({ type: AddPurchaseOrdersDetails_REQUEST });

    return await PurchaseOrdersService.AddPurchaseOrdersDetails(purchaseorder).then(
        (data) => {
            console.log("✅ AddPurchaseOrdersDetails Action Data:", data);

            if (data.Status === 'Success') {
                dispatch({
                    type: AddPurchaseOrdersDetails_SUCCESS,
                    payload: { responseBody: data.ResultSet },
                });
            } else {
                dispatch({
                    type: AddPurchaseOrdersDetails_FAIL,
                    payload: { msg: data.Message || "Something went wrong" },
                });
            }
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: AddPurchaseOrdersDetails_FAIL,
                payload: { msg: message },
            });
            return Promise.reject();
        }
    );
};

// ------------------ GET BY ID ------------------
export const GetPurchaseOrdersByPurchaseOrderId = (id) => async (dispatch) => {
    dispatch({ type: GetPurchaseOrdersByPurchaseOrderId_REQUEST });

    return await PurchaseOrdersService.GetPurchaseOrdersByPurchaseOrderId(id).then(
        (data) => {
            console.log("✅ GetPurchaseOrdersByPurchaseOrderId Action Data:", data);

            if (data.Status === 'Success') {
                dispatch({
                    type: GetPurchaseOrdersByPurchaseOrderId_SUCCESS,
                    payload: { responseBody: data.ResultSet },
                });
            } else {
                dispatch({
                    type: GetPurchaseOrdersByPurchaseOrderId_FAIL,
                    payload: { msg: data.Message || "Something went wrong" },
                });
            }
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GetPurchaseOrdersByPurchaseOrderId_FAIL,
                payload: { msg: message },
            });
            return Promise.reject();
        }
    );
};

// ------------------ UPDATE ------------------
export const PutPurchaseOrdersDetails = (purchaseorder) => async (dispatch) => {
    dispatch({ type: PutPurchaseOrdersDetails_REQUEST });

    return await PurchaseOrdersService.PutPurchaseOrdersDetails(purchaseorder).then(
        (data) => {
            console.log("✅ PutPurchaseOrdersDetails Action Data:", data);

            if (data.Status === 'Success') {
                dispatch({
                    type: PutPurchaseOrdersDetails_SUCCESS,
                    payload: { responseBody: data.ResultSet },
                });
            } else {
                dispatch({
                    type: PutPurchaseOrdersDetails_FAIL,
                    payload: { msg: data.Message || "Something went wrong" },
                });
            }
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: PutPurchaseOrdersDetails_FAIL,
                payload: { msg: message },
            });
            return Promise.reject();
        }
    );
};
