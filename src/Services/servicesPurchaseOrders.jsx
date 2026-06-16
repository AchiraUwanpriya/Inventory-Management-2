// src/Services/servicesPurchaseOrders.js
import axios from "axios";
import base_url from "../config";


//const API_BASE = "/PurchaseOrders"; // adjust if needed

// ✅ GET all purchase orders
export const GetAllPurchaseOrders = async () => {
  try {
    const response = await axios.get(`${base_url}/PurchaseOrders/GetAllPurchaseOrders`);
    console.log("✅ GetAllPurchaseOrders Response:", response.data);
    return response.data; // return full response
  } catch (error) {
    console.error("❌ Error fetching purchase orders:", error);
    throw error;
  }
};

// ✅ GET purchase order by ID
export const GetPurchaseOrdersByPurchaseOrderId = async (id) => {
  try {
    const response = await axios.get(
      `${base_url}/PurchaseOrders/GetPurchaseOrdersByPurchaseOrderId/${id}`
    );
    console.log("✅ GetPurchaseOrdersByPurchaseOrderId Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching purchase order by ID:", error);
    throw error;
  }
};

// ✅ ADD new purchase order
export const AddPurchaseOrdersDetails = async (purchaseorder) => {
  try {
    const response = await axios.post(
      `${base_url}/PurchaseOrders/AddPurchaseOrdersDetails`,
      purchaseorder
    );
    console.log("✅ AddPurchaseOrdersDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding purchase order:", error);
    throw error;
  }
};

// ✅ UPDATE purchase order
export const PutPurchaseOrdersDetails = async (purchaseorder) => {
  try {
    const response = await axios.post(
      `${base_url}/PurchaseOrders/PutPurchaseOrdersDetails`,
      purchaseorder
    );
    console.log("✅ PutPurchaseOrdersDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating purchase order:", error);
    throw error;
  }
};

export default {
  GetAllPurchaseOrders,
  GetPurchaseOrdersByPurchaseOrderId,
  AddPurchaseOrdersDetails,
  PutPurchaseOrdersDetails,
};
