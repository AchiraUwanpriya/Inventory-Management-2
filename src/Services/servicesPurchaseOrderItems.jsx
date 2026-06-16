import axios from "axios";
import base_url from "../config";

// --- Purchase Order Items Services ---
export const PurchaseOrderItemsService = {
  GetAllPurchaseOrderItems: async () => {
    try {
      const response = await axios.get(`${base_url}/PurchaseOrderItems/GetAllPurchaseOrderItems`);
      console.log("✅ GetAllPurchaseOrderItems Response:", response.data);
      return response;
    } catch (error) {
      console.error("❌ GetAllPurchaseOrderItems Error:", error);
      throw error;
    }
  },

  AddPurchaseOrderItemsDetails: async (purchaseorderitem) => {
    try {
      const response = await axios.post(
        `${base_url}/PurchaseOrderItems/AddPurchaseOrderItemsDetails`,
        purchaseorderitem
      );
    console.log("✅ GetAllPurchaseOrderItems Response:", response.data);
console.log("Result:", response.data.Result);
console.log("ResultSet:", response.data.ResultSet);

      return response;
    } catch (error) {
      console.error("❌ AddPurchaseOrderItemsDetails Error:", error);
      throw error;
    }
  },

  GetPurchaseOrderItemsByItemId: async (id) => {
    try {
  const response = await axios.get(`${base_url}/PurchaseOrderItems/GetPurchaseOrderItemsByItemId/${id}`);
      console.log(`✅ GetPurchaseOrderItemsByItemId(${id}) Response:`, response.data);
      return response;
    } catch (error) {
      console.error(`❌ GetPurchaseOrderItemsByItemId(${id}) Error:`, error);
      throw error;
    }
  },

 PutPurchaseOrderItemsDetails: async (purchaseorderitem) => {
  try {
    const response = await axios.post(
      `${base_url}/PurchaseOrderItems/PutPurchaseOrderItemsByItemId/${purchaseorderitem.ItemID}`,
      purchaseorderitem
    );
    
    console.log("✅ PutPurchaseOrderItemsDetails Response:", response.data);
    return response;
  } catch (error) {
    console.error("❌ PutPurchaseOrderItemsDetails Error:", error);
    throw error;
  }
},


  // Optional: Delete function
  // DeletePurchaseOrderItemsDetails: async (id) => {
  //   try {
  //     const response = await axios.delete(`/PurchaseOrderItems/DeletePurchaseOrderItemsDetails/${id}`);
  //     console.log("✅ DeletePurchaseOrderItemsDetails Response:", response.data);
  //     return response;
  //   } catch (error) {
  //     console.error("❌ DeletePurchaseOrderItemsDetails Error:", error);
  //     throw error;
  //   }
  // }
};

export default PurchaseOrderItemsService;
