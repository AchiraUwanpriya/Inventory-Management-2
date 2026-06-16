import axios from "axios";
import base_url from "../config";

export const StockTransactionsService = {
  // ✅ Get all stock transactions
  GetAllStockTransactions: async () => {
    console.log("📡 Fetching all stock transactions...");
    return axios.get(`${base_url}/StockTransactions/GetAllStockTransactions`);
  },

  // ✅ Toggle stock transaction status
  ToggleStockTransactionStatus: async (transactionId, status) => {
    console.log("📡 Toggling transaction status:", transactionId, status);
    return axios.post(`${base_url}/StockTransactions/ToggleStockTransactionStatus`, {
      TransactionID: transactionId,
      Status: status,
    });
  },

  // ✅ Add new stock transaction
  AddStockTransactionsDetails: async (transaction) => {
    console.log("📡 Adding transaction:", transaction);
    return axios.post(`${base_url}/StockTransactions/AddStockTransactionsDetails`, transaction);
  },

  // ✅ Update stock transaction
  PutStockTransactionsDetails: async (transaction) => {
    console.log("📡 Updating transaction:", transaction);
    return axios.post(`${base_url}/StockTransactions/PutStockTransactionsDetails`, transaction);
  },

  // ✅ Get transaction by ID
  GetStockTransactionsByTransactionId: async (id) => {
    console.log("📡 Fetching transaction by ID:", id);
    return axios.get(`${base_url}/StockTransactions/GetStockTransactionsByTransactionId/${id}`);
  },
};

export default StockTransactionsService;
