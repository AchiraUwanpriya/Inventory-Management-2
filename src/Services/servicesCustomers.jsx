import axios from "axios";
import base_url from "../config";

// ✅ GET all customers
export const GetAllCustomers = async () => {
  try {
    const response = await axios.get(`${base_url}/Customers/GetAllCustomers`);
    console.log("✅ GetAllCustomers Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ GetAllCustomers Error:", error);
    throw error;
  }
};

// ✅ GET customer by ID
export const GetCustomersByCustomerId = async (id) => {
  try {
    const response = await axios.get(`${base_url}/Customers/GetCustomersByCustomerId/${id}`);
    console.log("✅ GetCustomersByCustomerId Response:", response.data);
    return response.data.ResultSet || [];
  } catch (error) {
    console.error("❌ Error fetching customer:", error);
    throw error;
  }
};

// ✅ ADD new customer
export const AddCustomersDetails = async (customer) => {
  try {
    const response = await axios.post(`${base_url}/Customers/AddCustomersDetails`, customer);
    console.log("✅ AddCustomersDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding customer:", error);
    throw error;
  }
};

// ✅ UPDATE customer
export const PutCustomersDetails = async (customer) => {
  try {
    const response = await axios.post(`${base_url}/Customers/PutCustomersDetails`, customer);
    console.log("✅ PutCustomersDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating customer:", error);
    throw error;
  }
};

// ✅ Export all functions as default object
export default {
  GetAllCustomers,
  GetCustomersByCustomerId,
  AddCustomersDetails,
  PutCustomersDetails,
};
