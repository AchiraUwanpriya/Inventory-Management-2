import {
  GetAllUnits_REQUEST,
  GetAllUnits_SUCCESS,
  GetAllUnits_FAIL,
  AddUnitsDetails_REQUEST,
  AddUnitsDetails_SUCCESS,
  AddUnitsDetails_FAIL,
  PutUnitsDetails_REQUEST,
  PutUnitsDetails_SUCCESS,
  PutUnitsDetails_FAIL,
  DeleteUnitsDetails_REQUEST,
  DeleteUnitsDetails_SUCCESS,
  DeleteUnitsDetails_FAIL,
} from '../Constants/constantsUnits';

import UnitsService from '../Services/servicesUnits';

// Get all units
export const GetAllUnits = () => async (dispatch) => {
  dispatch({ type: GetAllUnits_REQUEST });
  try {
    const res = await UnitsService.GetAllUnits();
    if (res.StatusCode === 200 && Array.isArray(res.ResultSet)) {
      dispatch({ type: GetAllUnits_SUCCESS, payload: res.ResultSet });
    } else {
      dispatch({ type: GetAllUnits_FAIL, payload: "Failed to fetch units." });
    }
  } catch (error) {
    const msg = (error.response?.data?.message) || error.message || error.toString();
    dispatch({ type: GetAllUnits_FAIL, payload: msg });
  }
};

// Add new unit
export const AddUnitsDetails = (unitData) => async (dispatch) => {
  dispatch({ type: AddUnitsDetails_REQUEST });
  try {
    const res = await UnitsService.AddUnitsDetails(unitData);
    if (res.StatusCode === 200 && Array.isArray(res.ResultSet)) {
      dispatch({ type: AddUnitsDetails_SUCCESS, payload: res.ResultSet });
    } else {
      dispatch({ type: AddUnitsDetails_FAIL, payload: "Failed to add unit." });
    }
  } catch (error) {
    const msg = (error.response?.data?.message) || error.message || error.toString();
    dispatch({ type: AddUnitsDetails_FAIL, payload: msg });
  }
};

// Update unit
export const PutUnitsDetails = (unitData) => async (dispatch) => {
  dispatch({ type: PutUnitsDetails_REQUEST });
  try {
    const res = await UnitsService.PutUnitsDetails(unitData);
    if (res.StatusCode === 200 && res.ResultSet) {
      dispatch({ type: PutUnitsDetails_SUCCESS, payload: res.ResultSet });
    } else {
      dispatch({ type: PutUnitsDetails_FAIL, payload: "Failed to update unit." });
    }
  } catch (error) {
    const msg = (error.response?.data?.message) || error.message || error.toString();
    dispatch({ type: PutUnitsDetails_FAIL, payload: msg });
  }
};

// Delete unit
export const DeleteUnitsDetails = (id) => async (dispatch) => {
  dispatch({ type: DeleteUnitsDetails_REQUEST });
  try {
    const res = await UnitsService.DeleteUnitsDetails(id);
    if (res.StatusCode === 200) {
      dispatch({ type: DeleteUnitsDetails_SUCCESS, payload: id });
    } else {
      dispatch({ type: DeleteUnitsDetails_FAIL, payload: "Failed to delete unit." });
    }
  } catch (error) {
    const msg = (error.response?.data?.message) || error.message || error.toString();
    dispatch({ type: DeleteUnitsDetails_FAIL, payload: msg });
  }
};
