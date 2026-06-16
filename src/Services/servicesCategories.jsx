
import axios from "axios";
import base_url from "../config";

// --- Category Services ---

// GET all categories
export const GetAllCategories = async () => {
  try {
    const response = await axios.get(`${base_url}/Categories/GetAllCategories`);
    console.log("✅ GetAllCategories Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ GetAllCategories Error:", error);
    throw error;
  }
};

// GET category by ID
export const GetCategoriesByCategoryId = async (id) => {
  try {
    const response = await axios.get(`${base_url}/Categories/GetCategoriesByCategoryId/${id}`);
    console.log("✅ GetCategoriesByCategoryId Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ GetCategoriesByCategoryId Error:", error);
    throw error;
  }
};

// ADD new category
export const AddCategoriesDetails = async (category) => {
  try {
    const response = await axios.post(`${base_url}/Categories/AddCategoriesDetails`, category);
    console.log("✅ AddCategoriesDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ AddCategoriesDetails Error:", error);
    throw error;
  }
};

// UPDATE category
export const PutCategoriesDetails = async (category) => {
  try {
    const response = await axios.post(`${base_url}/Categories/PutCategoriesDetails`, category);
    console.log("✅ PutCategoriesDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ PutCategoriesDetails Error:", error);
    throw error;
  }
};

export default {
  GetAllCategories,
  GetCategoriesByCategoryId,
  AddCategoriesDetails,
  PutCategoriesDetails,
};