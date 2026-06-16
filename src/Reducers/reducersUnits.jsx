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

const initialState = {
  units: [],
  loading: false,
  msg: null,
};

export const unitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GetAllUnits_REQUEST:
    case AddUnitsDetails_REQUEST:
    case PutUnitsDetails_REQUEST:
    case DeleteUnitsDetails_REQUEST:
      return { ...state, loading: true, msg: null };

    case GetAllUnits_SUCCESS:
      return { ...state, units: action.payload || [], loading: false, msg: null };

    case AddUnitsDetails_SUCCESS:
      return { ...state, units: [...state.units, ...action.payload], loading: false, msg: "Unit added successfully" };

    case PutUnitsDetails_SUCCESS:
      const updatedUnits = state.units.map(u =>
        u.U_UnitID === action.payload.U_UnitID ? action.payload : u
      );
      return { ...state, units: updatedUnits, loading: false, msg: "Unit updated successfully" };

    case DeleteUnitsDetails_SUCCESS:
      return { ...state, units: state.units.filter(u => u.U_UnitID !== action.payload), loading: false, msg: "Unit deleted successfully" };

    case GetAllUnits_FAIL:
    case AddUnitsDetails_FAIL:
    case PutUnitsDetails_FAIL:
    case DeleteUnitsDetails_FAIL:
      return { ...state, loading: false, msg: action.payload };

    default:
      return state;
  }
};
