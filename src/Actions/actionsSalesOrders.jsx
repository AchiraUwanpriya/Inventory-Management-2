import {
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
    // DeleteSalesOrdersDetails_FAIL,
}
from '../Constants/constantsSalesOrders';

import SalesOrdersService from '../Services/servicesSalesOrders';

export const GetAllSalesOrders = () => async (dispatch) => {
    dispatch({ type: GetAllSalesOrders_REQUEST });

    try {
        const { data } = await SalesOrdersService.GetAllSalesOrders();

        if (data.StatusCode === 200 && data.ResultSet) {
            dispatch({
                type: GetAllSalesOrders_SUCCESS,
                payload: data.ResultSet, // ✅ send array directly
            });
        } else {
            dispatch({
                type: GetAllSalesOrders_FAIL,
                payload: "No sales orders found",
            });
        }
    } catch (error) {
        const message =
            (error.response?.data?.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: GetAllSalesOrders_FAIL,
            payload: message,
        });
    }
};


export const AddSalesOrdersDetails = (salesorder) => async (dispatch) => {
  dispatch({ type: AddSalesOrdersDetails_REQUEST });
  console.log("🚀 Dispatching AddSalesOrdersDetails with:", salesorder);

  try {
    const { data } = await SalesOrdersService.AddSalesOrdersDetails(salesorder);
    console.log("✅ AddSalesOrdersDetails API Response:", data);

    if (data.StatusCode === 200 && data.Result === "Success!!") {
      dispatch({
        type: AddSalesOrdersDetails_SUCCESS,
        payload: data.ResultSet || data,
      });
    } else {
      console.error("❌ AddSalesOrdersDetails failed:", data);
      dispatch({
        type: AddSalesOrdersDetails_FAIL,
        payload: data.Message || "Failed to add sales order",
      });
    }
  } catch (error) {
    const message =
      (error.response?.data?.message) ||
      error.message ||
      error.toString();
    console.error("🔥 AddSalesOrdersDetails Exception:", message);

    dispatch({
      type: AddSalesOrdersDetails_FAIL,
      payload: message,
    });
  }
};


export const GetSalesOrdersBySalesOrderId = () => async (dispatch) => {
    dispatch({
        type: GetSalesOrdersBySalesOrderId_REQUEST,
    });

    return await SalesOrdersService.GetSalesOrdersBySalesOrderId().then(
        (data) => {
            if (data.data.Status === 'Error') {
                dispatch({
                    type: GetSalesOrdersBySalesOrderId_SUCCESS,
                    payload: {
                        responseBody: data.data.ResultSet
                    },
                });
            } else {
                dispatch({
                    type: GetSalesOrdersBySalesOrderId_FAIL,
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
                type: GetSalesOrdersBySalesOrderId_FAIL,
                payload: {
                    msg: message,
                },
            });
            return Promise.reject();    
        }    
    );
};

export const PutSalesOrdersDetails = (salesorder) => async (dispatch) => {
    dispatch({
        type: PutSalesOrdersDetails_REQUEST,
    });

    return await SalesOrdersService.PutSalesOrdersDetails(salesorder).then(
        (data) => {
            if (data.data.Status === 'Error') {
                dispatch({
                    type: PutSalesOrdersDetails_SUCCESS,
                    payload: {
                        responseBody: data.data.ResultSet
                    },
                });
            } else {
                dispatch({
                    type: PutSalesOrdersDetails_FAIL,
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
                type: PutSalesOrdersDetails_FAIL,
                payload: {
                    msg: message,
                },
            });
            return Promise.reject();
        }
    );
};

// export const DeleteSalesOrdersDetails = () => async (dispatch) => {
//     dispatch({
//         type: DeleteSalesOrdersDetails_REQUEST,
//     });

//     return await SalesOrdersService.DeleteSalesOrdersDetails().then(
//         (data) => {
//             if (data.data.Status === 'Error') {
//                 dispatch({
//                     type: DeleteSalesOrdersDetails_SUCCESS,
//                     payload: {
//                         responseBody: data.data.ResultSet
//                     },
//                 });
//             } else {
//                 dispatch({
//                     type: DeleteSalesOrdersDetails_FAIL,
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
//                 type: DeleteSalesOrdersDetails_FAIL,
//                 payload: {
//                     msg: message,
//                 },
//             });
//             return Promise.reject();    
//         }    
//     );
// };