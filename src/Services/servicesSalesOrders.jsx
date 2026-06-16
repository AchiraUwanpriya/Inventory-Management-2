import axios from 'axios';
import base_url from "../config"; // ✅ Added base_url import

const GetAllSalesOrders = async () => {
  let config = {
    method: 'get',
    url: `${base_url}/SalesOrders/GetAllSalesOrders`, // ✅ Added base_url
  };

  return axios.request(config)
    .then((response) => {
      console.log('✅ GetAllSalesOrders Response:', response.data);
      return response;
    })
    .catch((error) => {
      console.error('❌ GetAllSalesOrders Error:', error);
      throw error;
    });
};

const AddSalesOrdersDetails = async (salesorder) => {
  let config = {
    method: 'post',
    url: `${base_url}/SalesOrders/AddSalesOrdersDetails`, // ✅ Added base_url
    data: salesorder,
  };

  return axios.request(config)
    .then((response) => {
      console.log('✅ AddSalesOrdersDetails Response:', response.data);
      return response;
    })
    .catch((error) => {
      console.error('❌ AddSalesOrdersDetails Error:', error);
      throw error;
    });
};

const GetSalesOrdersBySalesOrderId = async () => {
  let config = {
    method: 'get',
    url: `${base_url}/SalesOrders/GetSalesOrdersBySalesOrderId`, // ✅ Added base_url
  };

  return axios.request(config)
    .then((response) => {
      console.log('✅ GetSalesOrdersBySalesOrderId Response:', response.data);
      return response;
    })
    .catch((error) => {
      console.error('❌ GetSalesOrdersBySalesOrderId Error:', error);
      throw error;
    });
};

const PutSalesOrdersDetails = async (salesorder) => {
  return axios.post(`${base_url}/SalesOrders/PutSalesOrdersDetails`, salesorder) // ✅ Added base_url
    .then((response) => {
      console.log('✅ PutSalesOrdersDetails Response:', response.data);
      return response;
    })
    .catch((error) => {
      console.error('❌ PutSalesOrdersDetails Error:', error);
      throw error;
    });
};

// const DeleteSalesOrdersDetails = async () => {
//   let config = {
//     method: 'delete',
//     url: `${base_url}/SalesOrders/DeleteSalesOrdersDetails`, // ✅ Added base_url
//   };

//   return axios.request(config)
//     .then((response) => {
//       console.log('✅ DeleteSalesOrdersDetails Response:', response.data);
//       return response;
//     })
//     .catch((error) => {
//       console.error('❌ DeleteSalesOrdersDetails Error:', error);
//       throw error;
//     });
// };

export default {
  GetAllSalesOrders,
  AddSalesOrdersDetails,
  GetSalesOrdersBySalesOrderId,
  PutSalesOrdersDetails,
  // DeleteSalesOrdersDetails
};


// import axios from "axios";
// import base_url from "../config";

// // ✅ GET all sales orders
// export const GetAllSalesOrders = async () => {
//   try {
//     const response = await axios.get(`${base_url}/SalesOrders/GetAllSalesOrders`);
//     console.log("✅ GetAllSalesOrders Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ GetAllSalesOrders Error:", error);
//     throw error;
//   }
// };

// // ✅ GET sales order by ID
// export const GetSalesOrdersBySalesOrderId = async (id) => {
//   try {
//     const response = await axios.get(`${base_url}/SalesOrders/GetSalesOrdersBySalesOrderId/${id}`);
//     console.log("✅ GetSalesOrdersBySalesOrderId Response:", response.data);
//     return response.data.ResultSet || [];
//   } catch (error) {
//     console.error("❌ Error fetching sales order:", error);
//     throw error;
//   }
// };

// // ✅ ADD new sales order
// export const AddSalesOrdersDetails = async (salesOrder) => {
//   try {
//     const response = await axios.post(`${base_url}/SalesOrders/AddSalesOrdersDetails`, salesOrder);
//     console.log("✅ AddSalesOrdersDetails Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error adding sales order:", error);
//     throw error;
//   }
// };

// // ✅ UPDATE sales order (POST used instead of PUT)
// export const PutSalesOrdersDetails = async (salesOrder) => {
//   try {
//     const response = await axios.post(`${base_url}/SalesOrders/PutSalesOrdersDetails`, salesOrder);
//     console.log("✅ PutSalesOrdersDetails Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error updating sales order:", error);
//     throw error;
//   }
// };

// // ✅ Export all as default
// export default {
//   GetAllSalesOrders,
//   GetSalesOrdersBySalesOrderId,
//   AddSalesOrdersDetails,
//   PutSalesOrdersDetails,
// };
