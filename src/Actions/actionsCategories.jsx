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
  PutCategoriesDetails_FAIL,
} from '../Constants/constantsCategories';

import CategoriesService from '../Services/servicesCategories';

// --- GET ALL CATEGORIES ---
export const GetAllCategories = () => async (dispatch) => {
  dispatch({ type: GetAllCategories_REQUEST });

  try {
    const data = await CategoriesService.GetAllCategories();

    if (data.StatusCode === 200) {
      dispatch({
        type: GetAllCategories_SUCCESS,
        payload: { responseBody: data.ResultSet || [] }
      });
    } else {
      dispatch({
        type: GetAllCategories_FAIL,
        payload: { msg: data.Result || 'Something went wrong. Please try again later.' },
      });
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    dispatch({ type: GetAllCategories_FAIL, payload: { msg: message } });
  }
};

// --- ADD CATEGORY ---
export const AddCategoriesDetails = (category) => async (dispatch) => {
  dispatch({ type: AddCategoriesDetails_REQUEST });

  try {
    const data = await CategoriesService.AddCategoriesDetails(category);

    if (data.StatusCode === 200) {
      dispatch({
        type: AddCategoriesDetails_SUCCESS,
        payload: { responseBody: data.Result || [] },
      });
      // Refresh the categories list after adding
      dispatch(GetAllCategories());
    } else {
      dispatch({
        type: AddCategoriesDetails_FAIL,
        payload: { msg: data.Result || 'Something went wrong. Please try again later.' },
      });
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    dispatch({ type: AddCategoriesDetails_FAIL, payload: { msg: message } });
  }
};

// --- GET CATEGORY BY ID ---
export const GetCategoriesByCategoryId = (id) => async (dispatch) => {
  dispatch({ type: GetCategoriesByCategoryId_REQUEST });

  try {
    const data = await CategoriesService.GetCategoriesByCategoryId(id);

    if (data.StatusCode === 200) {
      dispatch({
        type: GetCategoriesByCategoryId_SUCCESS,
        payload: { responseBody: data.ResultSet || [] },
      });
    } else {
      dispatch({
        type: GetCategoriesByCategoryId_FAIL,
        payload: { msg: data.Result || 'Something went wrong. Please try again later.' },
      });
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    dispatch({ type: GetCategoriesByCategoryId_FAIL, payload: { msg: message } });
  }
};

// --- UPDATE CATEGORY ---
export const PutCategoriesDetails = (category) => async (dispatch) => {
  dispatch({ type: PutCategoriesDetails_REQUEST });

  try {
    const data = await CategoriesService.PutCategoriesDetails(category);

    if (data.StatusCode === 200) {
      dispatch({
        type: PutCategoriesDetails_SUCCESS,
        payload: { responseBody: data.Result || [] },
      });
      // Refresh the categories list after updating
      dispatch(GetAllCategories());
    } else {
      dispatch({
        type: PutCategoriesDetails_FAIL,
        payload: { msg: data.Result || 'Something went wrong. Please try again later.' },
      });
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    dispatch({ type: PutCategoriesDetails_FAIL, payload: { msg: message } });
  }
};

// export const DeleteCategoriesDetails = () => async (dispatch) => {
//     dispatch({
//         type: DeleteCategoriesDetails_REQUEST,
//     });

//     return await CategoriesService.DeleteCategoriesDetails().then(
//         (data) => {
//             if (data.data.Status === 'Error') {
//                 dispatch({
//                     type: DeleteCategoriesDetails_SUCCESS,
//                     payload: {
//                         responseBody: data.data.ResultSet
//                     },
//                 });
//             } else {
//                 dispatch({
//                     type: DeleteCategoriesDetails_FAIL,
//                     payload: {
//                         msg: "Sorry, something went wrong. Please try again later.",
//                     },
//                 });
//             }
//             return Promise.resolve();
//         },
//         (error) => {
//             const message = 
//                 (error.response && 
//                     error.response.data && 
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();
//             dispatch({
//                 type: DeleteCategoriesDetails_FAIL,
//                 payload: {
//                     msg: message,
//                 },
//             });
//             return Promise.reject();    
//         }    
//     );
// };