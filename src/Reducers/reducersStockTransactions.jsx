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
} from "../Constants/constantsStockTransactions";

// Separate initial states for each reducer
const initialListState = {
  responseBody: [],
  loading: false,
  msg: null,
};

const initialSingleState = {
  responseBody: null,
  loading: false,
  msg: null,
};

const initialAddState = {
  responseBody: null,
  loading: false,
  msg: null,
};

// Get all stock transactions
export const GetAllStockTransactionsReducer = (state = initialListState, action) => {
  switch (action.type) {
    case GetAllStockTransactions_REQUEST:
      return { ...state, loading: true, msg: null };
    case GetAllStockTransactions_SUCCESS:
      return { ...state, loading: false, responseBody: action.payload, msg: null };
    case GetAllStockTransactions_FAIL:
      return { ...state, loading: false, msg: action.payload?.msg || action.payload };
    default:
      return state;
  }
};

// Add stock transactions - FIXED: Don't update responseBody with added item
export const AddStockTransactionsReducer = (state = initialAddState, action) => {
  switch (action.type) {
    case AddStockTransactionsDetails_REQUEST:
      return { ...state, loading: true, msg: null };
    case AddStockTransactionsDetails_SUCCESS:
      // Only return success status, don't store the added transaction
      return { ...state, loading: false, responseBody: null, msg: null };
    case AddStockTransactionsDetails_FAIL:
      return { ...state, loading: false, msg: action.payload.msg };
    default:
      return state;
  }
};

// Get stock transaction by ID
export const GetStockTransactionsByTransactionIdReducer = (state = initialSingleState, action) => {
  switch (action.type) {
    case GetStockTransactionsByTransactionId_REQUEST:
      return { ...state, loading: true, msg: null };
    case GetStockTransactionsByTransactionId_SUCCESS:
      return { ...state, loading: false, responseBody: action.payload, msg: null };
    case GetStockTransactionsByTransactionId_FAIL:
      return { ...state, loading: false, msg: action.payload.msg };
    default:
      return state;
  }
};

// Update stock transactions
export const PutStockTransactionsReducer = (state = initialSingleState, action) => {
  switch (action.type) {
    case PutStockTransactionsDetails_REQUEST:
      return { ...state, loading: true, msg: null };
    case PutStockTransactionsDetails_SUCCESS:
      return { ...state, loading: false, responseBody: action.payload, msg: null };
    case PutStockTransactionsDetails_FAIL:
      return { ...state, loading: false, msg: action.payload.msg };
    default:
      return state;
  }
};