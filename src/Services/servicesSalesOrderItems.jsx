import axios from 'axios';
import base_url from "../config";  // ✅ Added base_url import

const GetAllSalesOrderItems = async () => {
  let config = {
    method: 'get',
    url: `${base_url}/SalesOrderItems/GetAllSalesOrderItems`, // ✅ Added base_url
  };

  return axios.request(config)
    .then((response) => {
      console.log('✅ GetAllSalesOrderItems Response:', response.data);
      return response;
    })
    .catch((error) => {
      console.error('❌ GetAllSalesOrderItems Error:', error);
      throw error;
    });
};

const AddSalesOrderItemsDetails = async (salesorderitem) => {
  let config = {
    method: 'post',
    url: `${base_url}/SalesOrderItems/AddSalesOrderItemsDetails`, // ✅ Added base_url
    data: salesorderitem,
  };

  return axios.request(config)
    .then((response) => {
      console.log('✅ AddSalesOrderItemsDetails Response:', response.data);
      return response;
    })
    .catch((error) => {
      console.error('❌ AddSalesOrderItemsDetails Error:', error);
      throw error;
    });
};

const GetSalesOrderItemsByItemId = async () => {
  let config = {
    method: 'get',
    url: `${base_url}/SalesOrderItems/GetSalesOrderItemsByItemId`, // ✅ Added base_url
  };

  return axios.request(config)
    .then((response) => {
      console.log('✅ GetSalesOrderItemsByItemId Response:', response.data);
      return response;
    })
    .catch((error) => {
      console.error('❌ GetSalesOrderItemsByItemId Error:', error);
      throw error;
    });
};

const PutSalesOrderItemsDetails = async (salesorderitem) => {
  if (!salesorderitem.ItemID) {
    throw new Error("Item ID is required to update sales order item");
  }

  return axios.post(
    `${base_url}/SalesOrderItems/PutSalesOrderItemsDetails/${salesorderitem.ItemID}`, // ✅ Added base_url
    salesorderitem
  )
    .then((response) => {
      console.log('✅ PutSalesOrderItemsDetails Response:', response.data);
      return response;
    })
    .catch((error) => {
      console.error('❌ PutSalesOrderItemsDetails Error:', error);
      throw error;
    });
};

// ✅ Export functions
export default {
  GetAllSalesOrderItems,
  AddSalesOrderItemsDetails,
  GetSalesOrderItemsByItemId,
  PutSalesOrderItemsDetails,
  // DeleteSalesOrderItemsDetails
};
