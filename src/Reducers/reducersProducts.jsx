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
  GetProductImage_FAIL
} from '../Constants/constantsProducts';

const initialState = {
  responseBody: [],
  loading: false,
  msg: null,
  imageUrls: {} // Store image URLs by product ID
};

// Get all products
export const GetAllProducts = (state = initialState, action) => {
  switch (action.type) {
    case GetAllProducts_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case GetAllProducts_SUCCESS:
      return {
        ...state,
        responseBody: action.payload,
        loading: false,
        msg: null,
      };
    case GetAllProducts_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    default:
      return state;
  }
}

// Add new products
export const AddProductsDetails = (state = initialState, action) => {
  switch (action.type) {
    case AddProductsDetails_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case AddProductsDetails_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: "Product added successfully",
      };
    case AddProductsDetails_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    default:
      return state;
  }
}

// Get products by id
export const GetProductsByProductId = (state = initialState, action) => {
  switch (action.type) {
    case GetProductsByProductId_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case GetProductsByProductId_SUCCESS:
      return {
        ...state,
        responseBody: action.payload,
        loading: false,
        msg: null,
      };
    case GetProductsByProductId_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    default:
      return state;
  }
}

// Update products
export const PutProductsDetails = (state = initialState, action) => {
  switch (action.type) {
    case PutProductsDetails_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case PutProductsDetails_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: "Product updated successfully",
      };
    case PutProductsDetails_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    default:
      return state;
  }
};

// Product image reducer
export const GetProductImage = (state = initialState, action) => {
  switch (action.type) {
    case GetProductImage_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GetProductImage_SUCCESS:
      return {
        ...state,
        loading: false,
        imageUrls: {
          ...state.imageUrls,
          [action.payload.productId]: action.payload.imageUrl
        }
      };
    case GetProductImage_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    default:
      return state;
  }
};