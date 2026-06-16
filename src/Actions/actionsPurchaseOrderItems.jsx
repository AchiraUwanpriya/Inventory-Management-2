import {
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
    // DeletePurchaseOrderItemsDetails_FAIL,
}
from '../Constants/constantsPurchaseOrderItems';

import PurchaseOrderItemsService from '../Services/servicesPurchaseOrderItems';

export const GetAllPurchaseOrderItems = () => async (dispatch) => {
  dispatch({ type: GetAllPurchaseOrderItems_REQUEST });

  try {
    const { data } = await PurchaseOrderItemsService.GetAllPurchaseOrderItems();

    // ✅ Use correct success check
 if (data.StatusCode === 200) {
  dispatch({
    type: GetAllPurchaseOrderItems_SUCCESS,
    payload: data.ResultSet,   // ✅ Correct → contains your 6 items
  });
}
 else {
      dispatch({
        type: GetAllPurchaseOrderItems_FAIL,
        payload: "Failed to fetch purchase order items",
      });
    }
  } catch (error) {
    dispatch({
      type: GetAllPurchaseOrderItems_FAIL,
      payload: error.message,
    });
  }
};

export const AddPurchaseOrderItemsDetails = (purchaseorderitem) => async (dispatch) => {
  dispatch({ type: AddPurchaseOrderItemsDetails_REQUEST });

  try {
    const { data } = await PurchaseOrderItemsService.AddPurchaseOrderItemsDetails(purchaseorderitem);

    if (data.StatusCode === 200) {
      dispatch({
        type: AddPurchaseOrderItemsDetails_SUCCESS,
        payload: data.ResultSet, // return new item(s)
      });
    } else {
      dispatch({
        type: AddPurchaseOrderItemsDetails_FAIL,
        payload: "Failed to add purchase order item",
      });
    }
  } catch (error) {
    dispatch({
      type: AddPurchaseOrderItemsDetails_FAIL,
      payload: error.message,
    });
  }
};


export const GetPurchaseOrderItemsByItemId = () => async (dispatch) => {
    dispatch({
        type: GetPurchaseOrderItemsByItemId_REQUEST,
    });

    return await PurchaseOrderItemsService.GetPurchaseOrderItemsByItemId().then(
        (data) => {
            if (data.data.Status === 'Error') {
                dispatch({
                    type: GetPurchaseOrderItemsByItemId_SUCCESS,
                    payload: {
                        responseBody: data.data.ResultSet
                    },
                });
            } else {
                dispatch({
                    type: GetPurchaseOrderItemsByItemId_FAIL,
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
                type: GetPurchaseOrderItemsByItemId_FAIL,
                payload: {
                    msg: message,
                },
            });
            return Promise.reject();    
        }    
    );
};

export const PutPurchaseOrderItemsDetails = (purchaseorderitem) => async (dispatch) => {
    dispatch({
        type: PutPurchaseOrderItemsDetails_REQUEST,
    });

    return await PurchaseOrderItemsService.PutPurchaseOrderItemsDetails(purchaseorderitem).then(
        (data) => {
            if (data.data.Status === 'Error') {
                dispatch({
                    type: PutPurchaseOrderItemsDetails_SUCCESS,
                    payload: {
                        responseBody: data.data.ResultSet
                    },
                });
            } else {
                dispatch({
                    type: PutPurchaseOrderItemsDetails_FAIL,
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
                type: PutPurchaseOrderItemsDetails_FAIL,
                payload: {
                    msg: message,
                },
            });
            return Promise.reject();
        }
    );
};

// export const DeletePurchaseOrderItemsDetails = () => async (dispatch) => {
//     dispatch({
//         type: DeletePurchaseOrderItemsDetails_REQUEST,
//     });

//     return await PurchaseOrderItemsService.DeletePurchaseOrderItemsDetails().then(
//         (data) => {
//             if (data.data.Status === 'Error') {
//                 dispatch({
//                     type: DeletePurchaseOrderItemsDetails_SUCCESS,
//                     payload: {
//                         responseBody: data.data.ResultSet
//                     },
//                 });
//             } else {
//                 dispatch({
//                     type: DeletePurchaseOrderItemsDetails_FAIL,
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
//                 type: DeletePurchaseOrderItemsDetails_FAIL,
//                 payload: {
//                     msg: message,
//                 },
//             });
//             return Promise.reject();    
//         }    
//     );
// };