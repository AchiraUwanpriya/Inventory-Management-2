import {
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
    // DeleteSalesOrderItemsDetails_FAIL,
}
from '../Constants/constantsSalesOrderItems';

import SalesOrderItemsService from '../Services/servicesSalesOrderItems';


export const GetAllSalesOrderItems = () => async (dispatch) => {
  dispatch({ type: GetAllSalesOrderItems_REQUEST });

  try {
    const { data } = await SalesOrderItemsService.GetAllSalesOrderItems();

    if (data.StatusCode === 200) {
      dispatch({
        type: GetAllSalesOrderItems_SUCCESS,
        payload: data.ResultSet, // ✅ correct → contains your 6 items
      });
    } else {
      dispatch({
        type: GetAllSalesOrderItems_FAIL,
        payload: "Failed to fetch sales order items",
      });
    }
  } catch (error) {
    dispatch({
      type: GetAllSalesOrderItems_FAIL,
      payload: error.message,
    });
  }
};
export const AddSalesOrderItemsDetails = (salesorderitem) => async (dispatch) => {
  dispatch({ type: AddSalesOrderItemsDetails_REQUEST });
  console.log("🚀 Dispatching AddSalesOrderItemsDetails with:", salesorderitem);

  try {
    const { data } = await SalesOrderItemsService.AddSalesOrderItemsDetails(salesorderitem);
    console.log("✅ AddSalesOrderItemsDetails API Response:", data);

    if (data.StatusCode === 200 && data.Result === "Success!!") {
      dispatch({
        type: AddSalesOrderItemsDetails_SUCCESS,
        payload: data.ResultSet || salesorderitem, // return the new item
      });
    } else {
      dispatch({
        type: AddSalesOrderItemsDetails_FAIL,
        payload: data.Message || "Failed to add sales order item",
      });
    }
  } catch (error) {
    const message =
      (error.response?.data?.message) ||
      error.message ||
      error.toString();
    console.error("🔥 AddSalesOrderItemsDetails Exception:", message);

    dispatch({
      type: AddSalesOrderItemsDetails_FAIL,
      payload: message,
    });
  }
};

export const GetSalesOrderItemsByItemId = () => async (dispatch) => {
    dispatch({
        type: GetSalesOrderItemsByItemId_REQUEST,
    });

    return await SalesOrderItemsService.GetSalesOrderItemsByItemId().then(
        (data) => {
            if (data.data.Status === 'Error') {
                dispatch({
                    type: GetSalesOrderItemsByItemId_SUCCESS,
                    payload: {
                        responseBody: data.data.ResultSet
                    },
                });
            } else {
                dispatch({
                    type: GetSalesOrderItemsByItemId_FAIL,
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
                type: GetSalesOrderItemsByItemId_FAIL,
                payload: {
                    msg: message,
                },
            });
            return Promise.reject();    
        }    
    );
};

export const PutSalesOrderItemsDetails = (salesorderitem) => async (dispatch) => {
    dispatch({
        type: PutSalesOrderItemsDetails_REQUEST,
    });

    return await SalesOrderItemsService.PutSalesOrderItemsDetails(salesorderitem).then(
        (data) => {
            if (data.data.Status === 'Error') {
                dispatch({
                    type: PutSalesOrderItemsDetails_SUCCESS,
                    payload: {
                        responseBody: data.data.ResultSet
                    },
                });
            } else {
                dispatch({
                    type: PutSalesOrderItemsDetails_FAIL,
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
                type: PutSalesOrderItemsDetails_FAIL,
                payload: {
                    msg: message,
                },
            });
            return Promise.reject();
        }
    );
};

// export const DeleteSalesOrderItemsDetails = () => async (dispatch) => {
//     dispatch({
//         type: DeleteSalesOrderItemsDetails_REQUEST,
//     });

//     return await SalesOrderItemsService.DeleteSalesOrderItemsDetails().then(
//         (data) => {
//             if (data.data.Status === 'Error') {
//                 dispatch({
//                     type: DeleteSalesOrderItemsDetails_SUCCESS,
//                     payload: {
//                         responseBody: data.data.ResultSet
//                     },
//                 });
//             } else {
//                 dispatch({
//                     type: DeleteSalesOrderItemsDetails_FAIL,
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
//                 type: DeleteSalesOrderItemsDetails_FAIL,
//                 payload: {
//                     msg: message,
//                 },
//             });
//             return Promise.reject();    
//         }    
//     );
// };