import {
  GetAllProducts_REQUEST,
  GetAllProducts_SUCCESS,
  GetAllProducts_FAIL,
  AddProductsDetails_REQUEST,
  AddProductsDetails_SUCCESS,
  AddProductsDetails_FAIL,
  GetProductsByProductId_REQUEST,
  GetProductsByProductId_SUCCESS,
  GetProductsByProductId_FAIL,
  PutProductsDetails_REQUEST,
  PutProductsDetails_SUCCESS,
  PutProductsDetails_FAIL,
  GetProductImage_REQUEST,
  GetProductImage_SUCCESS,
  GetProductImage_FAIL,
} from "../Constants/constantsProducts";
import ProductsService from "../Services/servicesProducts";

// Helper for consistent error handling
const getErrorMessage = (error) => {
  return error.response?.data?.message || error.message || "Operation failed";
};

// ================== GET ALL PRODUCTS ==================
export const GetAllProducts = () => async (dispatch) => {
  dispatch({ type: GetAllProducts_REQUEST });
  try {
    const data = await ProductsService.GetAllProducts();
    dispatch({ type: GetAllProducts_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GetAllProducts_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

// ================== GET PRODUCT BY ID ==================
export const GetProductsByProductId = (id) => async (dispatch) => {
  if (!id) {
    dispatch({
      type: GetProductsByProductId_FAIL,
      payload: "Product ID is required",
    });
    return;
  }

  dispatch({ type: GetProductsByProductId_REQUEST });
  try {
    const data = await ProductsService.GetProductsByProductId(id);
    dispatch({ type: GetProductsByProductId_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GetProductsByProductId_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

// ================== ADD PRODUCT WITH IMAGE ==================
export const AddProductsDetails = (productData, file = null) => async (dispatch) => {
  dispatch({ type: AddProductsDetails_REQUEST });
  try {
    const response = await ProductsService.AddProductsDetails(productData, file);
    
    if (response.StatusCode === 200) {
      dispatch({ type: AddProductsDetails_SUCCESS, payload: response });
      dispatch(GetAllProducts()); // refresh list
      return Promise.resolve(response);
    } else {
      const errorMessage = response.Result || "Failed to add product";
      dispatch({ type: AddProductsDetails_FAIL, payload: errorMessage });
      return Promise.reject(new Error(errorMessage));
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: AddProductsDetails_FAIL, payload: errorMessage });
    return Promise.reject(new Error(errorMessage));
  }
};

// ================== UPDATE PRODUCT WITH IMAGE ==================
export const PutProductsDetails = (productData, file = null) => async (dispatch) => {
  dispatch({ type: PutProductsDetails_REQUEST });
  try {
    const response = await ProductsService.PutProductsDetails(productData, file);
    
    if (response.StatusCode === 200) {
      dispatch({ type: PutProductsDetails_SUCCESS, payload: response });
      dispatch(GetAllProducts()); // refresh list
      return Promise.resolve(response);
    } else {
      const errorMessage = response.Result || "Failed to update product";
      dispatch({ type: PutProductsDetails_FAIL, payload: errorMessage });
      return Promise.reject(new Error(errorMessage));
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: PutProductsDetails_FAIL, payload: errorMessage });
    return Promise.reject(new Error(errorMessage));
  }
};

// ================== GET PRODUCT IMAGE ==================
export const GetProductImage = (productId) => async (dispatch) => {
  if (!productId) {
    dispatch({
      type: GetProductImage_FAIL,
      payload: "Product ID is required",
    });
    return Promise.resolve(null);
  }

  dispatch({ type: GetProductImage_REQUEST });
  try {
    const imageUrl = await ProductsService.GetProductImage(productId);
    if (imageUrl) {
      dispatch({
        type: GetProductImage_SUCCESS,
        payload: { productId, imageUrl }
      });
      return Promise.resolve(imageUrl);
    } else {
      dispatch({
        type: GetProductImage_FAIL,
        payload: `Image not found for product ${productId}`,
      });
      return Promise.resolve(null);
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: GetProductImage_FAIL,
      payload: errorMessage,
    });
    return Promise.resolve(null);
  }
};

// ================== GET PRODUCT IMAGE URL (Utility function) ==================
export const GetProductImageUrl = (productId) => {
  return ProductsService.GetProductImageUrl(productId);
};