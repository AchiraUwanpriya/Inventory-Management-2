import axios from "axios";
import base_url from "../config";

export const StockTransactionsService = {
  // ✅ Get all stock transactions
  GetAllStockTransactions: async () => {
    console.log("📡 Fetching all stock transactions...");
    return axios.get(`${base_url}/StockTransactions/GetAllStockTransactions`);
  },

  // ✅ Get stock transactions by form type
  GetStockTransactionsByFormType: async (formType) => {
    console.log(`📡 Fetching stock transactions for FormType: ${formType}...`);
    return axios.get(`${base_url}/StockTransactions/GetStockTransactionsByFormType?TransactionType=${formType}`);
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
    
    // Map status from friendly text to codes expected by backend: Active -> A, Inactive -> I
    let statusVal = transaction.Status;
    if (statusVal === "Active" || statusVal === "A") {
      statusVal = "A";
    } else if (statusVal === "Inactive" || statusVal === "I") {
      statusVal = "I";
    }

    const params = {
      ProductID: transaction.ProductID,
      UserID: transaction.UserID,
      Quantity: transaction.Quantity,
      TransactionType: transaction.TransactionType || "IN",
      TransactiionDate: transaction.TransactiionDate || transaction.TransactionDate || new Date().toISOString().split('T')[0],
      Status: statusVal || "A",
    };

    if (transaction.OrderItemID) {
      params.OrderItemID = transaction.OrderItemID;
    }
    if (transaction.OrderItemType) {
      params.OrderItemType = transaction.OrderItemType;
    }
    if (transaction.FormTypeID) {
      params.FormTypeID = transaction.FormTypeID;
    }

    return axios.post(`${base_url}/StockTransactions/AddStockTransactionsDetails`, null, { params });
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
