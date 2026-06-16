import axios from "axios";

import base_url from "../config";

export const GetAllSuppliers = async () => {
  try {
      const response = await axios.get(`${base_url}/Suppliers/GetAllSuppliers`);
    console.log("✅ GetAllSuppliers Response:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error fetching suppliers:", error);
    throw error;
  }
};

export const AddSuppliersDetails = async (supplier) => {
  try {
    const response = await axios.post(`${base_url}/Suppliers/AddSuppliersDetails`, supplier);
    console.log("✅ AddSuppliersDetails Response:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error adding supplier:", error);
    throw error;
  }
};

export const GetSuppliersBySupplierId = async (id) => {
  try {
    const response = await axios.get(`${base_url}/Suppliers/GetSuppliersBySupplierId/${id}`);
    console.log(`✅ GetSuppliersBySupplierId(${id}) Response:`, response.data);
    return response;
  } catch (error) {
    console.error(`❌ Error fetching supplier ${id}:`, error);
    throw error;
  }
};

// CHANGE FROM PUT TO POST (temporary fix)
export const PutSuppliersDetails = async (supplier) => {
  try {
    const response = await axios.post(`${base_url}/Suppliers/PutSuppliersDetails`, supplier);
    console.log("✅ PutSuppliersDetails Response:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error updating supplier:", error);
    throw error;
  }
};

export default {
  GetAllSuppliers,
  AddSuppliersDetails,
  GetSuppliersBySupplierId,
  PutSuppliersDetails,
};