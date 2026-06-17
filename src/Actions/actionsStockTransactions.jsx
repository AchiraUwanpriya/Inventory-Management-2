import {
  GetAllStockTransactions_REQUEST,
  GetAllStockTransactions_SUCCESS,
  GetAllStockTransactions_FAIL,
  AddStockTransactionsDetails_REQUEST,
  AddStockTransactionsDetails_SUCCESS,
  AddStockTransactionsDetails_FAIL,
  GetStockTransactionsByTransactionId_REQUEST,
  GetStockTransactionsByTransactionId_SUCCESS,
  GetStockTransactionsByTransactionId_FAIL,
  PutStockTransactionsDetails_REQUEST,
  PutStockTransactionsDetails_SUCCESS,
  PutStockTransactionsDetails_FAIL,
  GetStockTransactionsByFormType_REQUEST,
  GetStockTransactionsByFormType_SUCCESS,
  GetStockTransactionsByFormType_FAIL,
} from "../Constants/constantsStockTransactions";

import StockTransactionsService from "../Services/servicesStockTransactions";

// In actionsStockTransactions.js - Add a dedicated toggle action
export const ToggleStockTransactionStatus = (transactionId, currentStatus) => async (dispatch) => {
  const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
  
  dispatch({ type: PutStockTransactionsDetails_REQUEST });
  try {
    const { data } = await StockTransactionsService.ToggleStockTransactionStatus(transactionId, newStatus);
    console.log("✅ ToggleStockTransactionStatus Response:", data);

    if (data.StatusCode === 200) {
      dispatch({ type: PutStockTransactionsDetails_SUCCESS, payload: data.ResultSet });
      
      // Refresh the list to get updated data
      dispatch(GetAllStockTransactions());
      
      return data.ResultSet;
    } else {
      dispatch({ type: PutStockTransactionsDetails_FAIL, payload: { msg: "Failed to toggle status" } });
      return Promise.reject("Failed to toggle status");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    dispatch({ type: PutStockTransactionsDetails_FAIL, payload: { msg: message } });
    return Promise.reject(message);
  }
};

// ===================== Get All Transactions =====================
export const GetAllStockTransactions = () => async (dispatch) => {
  dispatch({ type: GetAllStockTransactions_REQUEST });
  try {
    const { data } = await StockTransactionsService.GetAllStockTransactions();
    console.log("✅ GetAllStockTransactions Response:", data);

    if (data.StatusCode === 200) {
      dispatch({ type: GetAllStockTransactions_SUCCESS, payload: data.ResultSet });
      return data.ResultSet;
    } else {
      dispatch({ type: GetAllStockTransactions_FAIL, payload: { msg: "Something went wrong" } });
      return Promise.reject("Something went wrong");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: GetAllStockTransactions_FAIL, payload: { msg: message } });
    return Promise.reject(message);
  }
};

// ===================== Get Transactions by Form Type =====================
export const GetStockTransactionsByFormType = (formType) => async (dispatch) => {
  dispatch({ type: GetStockTransactionsByFormType_REQUEST });
  try {
    const { data } = await StockTransactionsService.GetStockTransactionsByFormType(formType);
    console.log(`✅ GetStockTransactionsByFormType (${formType}) Response:`, data);

    if (data.StatusCode === 200) {
      dispatch({ type: GetStockTransactionsByFormType_SUCCESS, payload: data.ResultSet });
      return data.ResultSet;
    } else {
      dispatch({ type: GetStockTransactionsByFormType_FAIL, payload: { msg: "Something went wrong" } });
      return Promise.reject("Something went wrong");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: GetStockTransactionsByFormType_FAIL, payload: { msg: message } });
    return Promise.reject(message);
  }
};

// ===================== Add Transaction =====================
export const AddStockTransactionsDetails = (transaction) => async (dispatch, getState) => {
  dispatch({ type: AddStockTransactionsDetails_REQUEST });
  try {
    const { data } = await StockTransactionsService.AddStockTransactionsDetails(transaction);
    console.log("✅ AddStockTransactions Response:", data);

    if (data.StatusCode === 200) {
      dispatch({ type: AddStockTransactionsDetails_SUCCESS, payload: data.ResultSet });
      return data.ResultSet;
    } else {
      dispatch({ type: AddStockTransactionsDetails_FAIL, payload: { msg: "Failed to add transaction" } });
      return Promise.reject("Failed to add transaction");
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({ type: AddStockTransactionsDetails_FAIL, payload: { msg: message } });
    return Promise.reject(message);
  }
};

// ===================== Get Transaction by ID =====================
export const GetStockTransactionsByTransactionId = (id) => async (dispatch) => {
  dispatch({ type: GetStockTransactionsByTransactionId_REQUEST });
  try {
    const { data } = await StockTransactionsService.GetStockTransactionsByTransactionId(id);
    console.log("✅ GetStockTransactionById Response:", data);

    if (data.StatusCode === 200) {
      dispatch({ type: GetStockTransactionsByTransactionId_SUCCESS, payload: data.ResultSet });
      return data.ResultSet;
    } else {
      dispatch({ type: GetStockTransactionsByTransactionId_FAIL, payload: { msg: "Failed to fetch transaction" } });
      return Promise.reject("Failed to fetch transaction");
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({ type: GetStockTransactionsByTransactionId_FAIL, payload: { msg: message } });
    return Promise.reject(message);
  }
};

// ===================== Update Transaction =====================
export const PutStockTransactionsDetails = (transaction) => async (dispatch) => {
  dispatch({ type: PutStockTransactionsDetails_REQUEST });
  try {
    const { data } = await StockTransactionsService.PutStockTransactionsDetails(transaction);
    console.log("✅ PutStockTransactions Response:", data);

    if (data.StatusCode === 200) {
      dispatch({ type: PutStockTransactionsDetails_SUCCESS, payload: data.ResultSet });
      return data.ResultSet;
    } else {
      dispatch({ type: PutStockTransactionsDetails_FAIL, payload: { msg: "Failed to update transaction" } });
      return Promise.reject("Failed to update transaction");
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({ type: PutStockTransactionsDetails_FAIL, payload: { msg: message } });
    return Promise.reject(message);
  }
};