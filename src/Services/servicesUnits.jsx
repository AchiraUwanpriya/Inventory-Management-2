import axios from "axios";
import Base_url from "../config";

// --- Units Services ---

// GET all units
export const GetAllUnits = async () => {
  try {
    const response = await axios.get(`${Base_url}/Units/GetAllUnits`);
    console.log("✅ GetAllUnits Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ GetAllUnits Error:", error);
    throw error;
  }
};

// GET unit by ID
export const GetUnitsByUnitId = async (id) => {
  try {
    const response = await axios.get(`${Base_url}/Units/GetUnitsByUnitId/${id}`);
    console.log("✅ GetUnitsByUnitId Response:", response.data);
    return response.data.ResultSet || [];
  } catch (error) {
    console.error("❌ GetUnitsByUnitId Error:", error);
    throw error;
  }
};

// ADD new unit
export const AddUnitsDetails = async (unit) => {
  try {
    const response = await axios.post(`${Base_url}/Units/AddUnitsDetails`, unit);
    console.log("✅ AddUnitsDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ AddUnitsDetails Error:", error);
    throw error;
  }
};

// UPDATE unit
export const PutUnitsDetails = async (unit) => {
  try {
    const response = await axios.post(`${Base_url}/Units/PutUnitsDetails`, unit);
    console.log("✅ PutUnitsDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ PutUnitsDetails Error:", error);
    throw error;
  }
};

// // DELETE unit
// export const DeleteUnitsDetails = async (id) => {
//   try {
//     const response = await axios.delete(`/Units/DeleteUnitsDetails/${id}`);
//     console.log("✅ DeleteUnitsDetails Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ DeleteUnitsDetails Error:", error);
//     throw error;
//   }
// };

export default {
  GetAllUnits,
  GetUnitsByUnitId,
  AddUnitsDetails,
  PutUnitsDetails,
  // DeleteUnitsDetails,
};
