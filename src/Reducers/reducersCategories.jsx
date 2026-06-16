import {
    GetAllCategories_REQUEST,
    GetAllCategories_SUCCESS,
    GetAllCategories_FAIL,
    AddCategoriesDetails_REQUEST,
    AddCategoriesDetails_SUCCESS,
    AddCategoriesDetails_FAIL,
    GetCategoriesByCategoryId_REQUEST, 
    GetCategoriesByCategoryId_SUCCESS,
    GetCategoriesByCategoryId_FAIL,
    PutCategoriesDetails_REQUEST,
    PutCategoriesDetails_SUCCESS,
    PutCategoriesDetails_FAIL
} from '../Constants/constantsCategories';

const initialState = {
    responseBody: [],
    loading: false,
    msg: null,
};

// Get all categories
export const GetAllCategories = (state = initialState, action) => {
    switch (action.type) {
        case GetAllCategories_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetAllCategories_SUCCESS:
            return {
                ...state,
                loading: false,
                responseBody: action.payload.responseBody,
                msg: ""
            };
        case GetAllCategories_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload.msg,
            };
        default:
            return state;
    }
}

// Add new categories
export const AddCategoriesDetails = (state = initialState, action) => {
    switch (action.type) {
        case AddCategoriesDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case AddCategoriesDetails_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: action.payload.responseBody || "Category added successfully!",
            };
        case AddCategoriesDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload.msg,
            };
        default:
            return state;
    }
}

// Get categories by id
export const GetCategoriesByCategoryId = (state = initialState, action) => {
    switch (action.type) {
        case GetCategoriesByCategoryId_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetCategoriesByCategoryId_SUCCESS:
            return {
                ...state,
                loading: false,
                responseBody: action.payload.responseBody,
                msg: null,
            };
        case GetCategoriesByCategoryId_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload.msg,
            };
        default:
            return state;
    }
}

// Put Categories 
export const PutCategoriesDetails = (state = initialState, action) => {
    switch (action.type) {
        case PutCategoriesDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case PutCategoriesDetails_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: action.payload.responseBody || "Category updated successfully!",
            };
        case PutCategoriesDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload.msg,
            };
        default:
            return state;
    }
};