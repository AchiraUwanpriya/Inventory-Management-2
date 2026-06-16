import {
  AddSuppliersDetails_REQUEST,
  AddSuppliersDetails_SUCCESS,
  AddSuppliersDetails_FAIL,
  GetAllSuppliers_REQUEST,
  GetAllSuppliers_SUCCESS,
  GetAllSuppliers_FAIL,
  PutSuppliersDetails_REQUEST,
  PutSuppliersDetails_SUCCESS,
  PutSuppliersDetails_FAIL,
} from "../Constants/constantsSuppliers";

import SuppliersService from "../Services/servicesSuppliers";

export const GetAllSuppliers = () => async (dispatch) => {
  dispatch({ type: GetAllSuppliers_REQUEST });
  try {
    const { data } = await SuppliersService.GetAllSuppliers();
    if (data.StatusCode === 200) {
      dispatch({ type: GetAllSuppliers_SUCCESS, payload: data.ResultSet });
    } else {
      dispatch({ type: GetAllSuppliers_FAIL, payload: "Failed to fetch suppliers" });
    }
  } catch (error) {
    dispatch({ type: GetAllSuppliers_FAIL, payload: error.message });
  }
};

export const AddSuppliersDetails = (supplier) => async (dispatch) => {
  dispatch({ type: AddSuppliersDetails_REQUEST });
  try {
    const { data } = await SuppliersService.AddSuppliersDetails(supplier);
    if (data.StatusCode === 200) {
      dispatch({ type: AddSuppliersDetails_SUCCESS, payload: supplier });
      dispatch(GetAllSuppliers());
    } else {
      dispatch({ type: AddSuppliersDetails_FAIL, payload: "Failed to add supplier" });
    }
  } catch (error) {
    dispatch({ type: AddSuppliersDetails_FAIL, payload: error.message });
  }
};

export const PutSuppliersDetails = (supplier) => async (dispatch) => {
  dispatch({ type: PutSuppliersDetails_REQUEST });
  try {
    const { data } = await SuppliersService.PutSuppliersDetails(supplier);
    if (data.StatusCode === 200) {
      dispatch({ type: PutSuppliersDetails_SUCCESS, payload: supplier });
      dispatch(GetAllSuppliers());
    } else {
      dispatch({ type: PutSuppliersDetails_FAIL, payload: "Failed to update supplier" });
    }
  } catch (error) {
    dispatch({ type: PutSuppliersDetails_FAIL, payload: error.message });
  }
};
