import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk as reduxThunk } from "redux-thunk"; // ✅ Correct import



// ================== Categories ==================
import { 
  GetAllCategories,
  AddCategoriesDetails,
  GetCategoriesByCategoryId,
  PutCategoriesDetails,
} from "./Reducers/reducersCategories";

// ================== Units ==================
import { unitsReducer } from "./Reducers/reducersUnits";

// ================== Auth/Login ==================
import { authReducer } from './Reducers/authreducer';

// ================== Products ==================
import {
  GetAllProducts,
  AddProductsDetails,
  GetProductsByProductId,
  PutProductsDetails,

} from "./Reducers/reducersProducts";

// ================== Suppliers ==================
import {
  GetAllSuppliers,
  AddSuppliersDetails,
  GetSuppliersBySupplierId,
  PutSuppliersDetails,       
} from "./Reducers/reducersSuppliers";

// ================== Customers ==================
import { 
  GetAllCustomers,
  AddCustomersDetails,
  GetCustomersByCustomerId,
  PutCustomersDetails,
} from "./Reducers/reducersCustomers";

// ================== Purchase Orders ==================
import { 
  GetAllPurchaseOrders,
  AddPurchaseOrdersDetails,
  GetPurchaseOrdersByPurchaseOrderId,
  PutPurchaseOrdersDetails,
} from "./Reducers/reducersPurchaseOrders";

// ================== Purchase Order Items ==================
import { 
  GetAllPurchaseOrderItems,
  AddPurchaseOrderItemsDetails,
  GetPurchaseOrderItemsByItemId,
  PutPurchaseOrderItemsDetails,
} from "./Reducers/reducersPurchaseOrderItems";

// ================== Sales Orders ==================
import {
  GetAllSalesOrders,
  AddSalesOrdersDetails,
  GetSalesOrdersBySalesOrderId,
  PutSalesOrdersDetails,
  // DeleteSalesOrdersDetails, // optional
} from "./Reducers/reducersSalesOrders";

// ================== Sales Order Items ==================
import {
  GetAllSalesOrderItems,
  AddSalesOrderItemsDetails,
  GetSalesOrderItemsByItemId,
  PutSalesOrderItemsDetails,
  // DeleteSalesOrderItemsDetails, // optional
} from "./Reducers/reducersSalesOrderItems";

// ================== Stock Transactions ==================
import {
  GetAllStockTransactionsReducer,
  AddStockTransactionsReducer,
  GetStockTransactionsByTransactionIdReducer,
  PutStockTransactionsReducer,
} from "./Reducers/reducersStockTransactions";

// ================== Dummy Reducer ==================
const dummyReducer = (state = {}, action) => state;

// ================== Root Reducer ==================
const rootReducer = combineReducers({
  // 🔐 Authentication & Login
  auth: authReducer,

  // 📦 Categories
  categories: GetAllCategories,
  addCategories: AddCategoriesDetails,
  categoriesById: GetCategoriesByCategoryId || dummyReducer,
  putCategories: PutCategoriesDetails,

  // 📏 Units
  units: unitsReducer,

  // 🏷️ Products
  products: GetAllProducts,
  addProducts: AddProductsDetails,
  productsById: GetProductsByProductId || dummyReducer,
  putProducts: PutProductsDetails,

  // 🏢 Suppliers
  suppliers: GetAllSuppliers,
  addSuppliers: AddSuppliersDetails,
  suppliersById: GetSuppliersBySupplierId || dummyReducer,
  putSuppliers: PutSuppliersDetails,

  // 👥 Customers
  customers: GetAllCustomers,
  addCustomers: AddCustomersDetails,
  customersById: GetCustomersByCustomerId || dummyReducer,
  putCustomers: PutCustomersDetails,

  // 📥 Purchase Orders
  purchaseOrders: GetAllPurchaseOrders,
  addPurchaseOrders: AddPurchaseOrdersDetails,
  purchaseOrdersById: GetPurchaseOrdersByPurchaseOrderId || dummyReducer,
  putPurchaseOrders: PutPurchaseOrdersDetails,

  // 📦 Purchase Order Items
  purchaseOrderItems: GetAllPurchaseOrderItems,
  addPurchaseOrderItems: AddPurchaseOrderItemsDetails,
  purchaseOrderItemsById: GetPurchaseOrderItemsByItemId || dummyReducer,
  putPurchaseOrderItems: PutPurchaseOrderItemsDetails,

  // 📤 Sales Orders
  salesOrders: GetAllSalesOrders,
  addSalesOrders: AddSalesOrdersDetails,
  salesOrdersById: GetSalesOrdersBySalesOrderId || dummyReducer,
  putSalesOrders: PutSalesOrdersDetails,
  // deleteSalesOrders: DeleteSalesOrdersDetails || dummyReducer, // optional

  // 📋 Sales Order Items
  salesOrderItems: GetAllSalesOrderItems,
  addSalesOrderItems: AddSalesOrderItemsDetails,
  salesOrderItemsById: GetSalesOrderItemsByItemId || dummyReducer,
  putSalesOrderItems: PutSalesOrderItemsDetails,
  // deleteSalesOrderItems: DeleteSalesOrderItemsDetails || dummyReducer, // optional

  // 📊 Stock Transactions
  stockTransactions: GetAllStockTransactionsReducer,
  addStockTransactions: AddStockTransactionsReducer,
  stockTransactionsById: GetStockTransactionsByTransactionIdReducer,
  putStockTransactions: PutStockTransactionsReducer,
});

// ================== Store ==================
const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default store;