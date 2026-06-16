import axios from "axios";
import base_url from "../config";

// ✅ GET all products
export const GetAllProducts = async () => {
  try {
    const response = await axios.get(`${base_url}/Products/GetAllProducts`);
    console.log("✅ GetAllProducts Response:", response.data);
    return response.data.ResultSet || response.data || [];
  } catch (error) {
    console.error("❌ GetAllProducts Error:", error);
    throw error;
  }
};

// ✅ GET product by ID
export const GetProductsByProductId = async (id) => {
  try {
    const response = await axios.get(`${base_url}/Products/GetProductsByProductId/${id}`);
    console.log("✅ GetProductsByProductId Response:", response.data);
    return response.data.ResultSet || response.data || [];
  } catch (error) {
    console.error("❌ GetProductsByProductId Error:", error);
    throw error;
  }
};

// ✅ ADD new product (with image upload) - FIXED
export const AddProductsDetails = async (productData, file = null) => {
  try {
    const formData = new FormData();
    
    // Append all product data
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });
    
    // Append file if provided - use 'file' as parameter name to match backend
    if (file) {
      formData.append('file', file);
    }

    console.log("📦 AddProductsDetails FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post(`${base_url}/Products/AddProductsDetails`, formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000,
    });

    console.log("✅ AddProductsDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ AddProductsDetails Error:", error);
    throw error;
  }
};

// ✅ UPDATE existing product (with image upload) - FIXED
export const PutProductsDetails = async (productData, file = null) => {
  try {
    const formData = new FormData();
    
    // Append all product data
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });
    
    // Append file if provided
    if (file) {
      formData.append('file', file);
    }

    console.log("📦 PutProductsDetails FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post(`${base_url}/Products/PutProductsDetails`, formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000,
    });

    console.log("✅ PutProductsDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ PutProductsDetails Error:", error);
    throw error;
  }
};

// ✅ Generate direct product image URL (for <img src="">)
export const GetProductImageUrl = (productId) => {
  return `${base_url}/Products/PhotoPreview?ProductID=${productId}&t=${Date.now()}`;
};

// ✅ Optional: Keep blob version if needed for specific cases
export const GetProductImage = async (productId) => {
  try {
    const response = await axios.get(`${base_url}/Products/PhotoPreview`, {
      params: { ProductID: productId },
      responseType: "blob",
      headers: { Accept: "image/*" },
    });

    if (response.status === 200 && response.data) {
      const imageUrl = URL.createObjectURL(response.data);
      console.log("✅ GetProductImage URL:", imageUrl);
      return imageUrl;
    }

    console.warn("⚠️ No image data found for product:", productId);
    return null;
  } catch (error) {
    console.error("❌ GetProductImage Error:", error);
    return null;
  }
};

// ✅ Export all
export default {
  GetAllProducts,
  GetProductsByProductId,
  AddProductsDetails,
  PutProductsDetails,
  GetProductImage,
  GetProductImageUrl,
};