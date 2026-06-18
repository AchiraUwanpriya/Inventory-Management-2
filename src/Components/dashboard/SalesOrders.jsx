// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { Plus, Search, Eye, X, Calendar, User, Package, DollarSign, FileText, Building2, AlertTriangle, Menu, Edit, Check, X as XIcon } from "lucide-react";
// import {
//   GetAllSalesOrders,
//   AddSalesOrdersDetails,
// } from "../../Actions/actionsSalesOrders";
// import { GetAllCustomers } from "../../Actions/actionsCustomers";
// import { GetAllProducts } from "../../Actions/actionsProducts";
// import { GetAllSalesOrderItems, AddSalesOrderItemsDetails } from "../../Actions/actionsSalesOrderItems";
// import { GetAllStockTransactions } from "../../Actions/actionsStockTransactions";
// import { GetAllPurchaseOrders } from "../../Actions/actionsPurchaseOrders";
// import { GetAllPurchaseOrderItems } from "../../Actions/actionsPurchaseOrderItems";

// const SalesOrders = () => {
//   const dispatch = useDispatch();

//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [statusFilter, setStatusFilter] = useState("All");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedOrderForView, setSelectedOrderForView] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   const [newOrder, setNewOrder] = useState({
//     SalesOrderID: "",
//     CustomerID: "",
//     OrderDate: new Date().toISOString().split('T')[0],
//     OrderStatus: "Pending",
//   });

//   const [localItems, setLocalItems] = useState([]);
//   const [newItem, setNewItem] = useState({
//     ProductID: "",
//     Quantity: "",
//     UnitPrice: "", // This will be manually entered
//   });

//   // Add new state for editing quantities
//   const [editingItemId, setEditingItemId] = useState(null);
//   const [editQuantity, setEditQuantity] = useState("");

//   // Searchable dropdown states
//   const [customerSearch, setCustomerSearch] = useState("");
//   const [productSearch, setProductSearch] = useState("");
//   const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
//   const [showProductDropdown, setShowProductDropdown] = useState(false);

//   // Real World Enterprise Application Color Theme
//   const colors = {
//     primaryDark: '#1e40af',
//     primary: '#3b82f6',
//     primaryLight: '#60a5fa',
//     secondaryDark: '#059669',
//     secondary: '#10b981',
//     secondaryLight: '#34d399',
//     success: '#10b981',
//     warning: '#f59e0b',
//     error: '#ef4444',
//     info: '#06b6d4',
//     dark: '#1f2937',
//     grayDark: '#374151',
//     gray: '#6b7280',
//     grayLight: '#9ca3af',
//     grayLighter: '#e5e7eb',
//     light: '#f9fafb',
//     white: '#ffffff',
//     blue: '#3b82f6',
//     green: '#10b981',
//     red: '#ef4444',
//     yellow: '#f59e0b',
//     purple: '#8b5cf6',
//     indigo: '#6366f1',
//     shadowDark: 'rgba(30, 64, 175, 0.2)',
//     shadowLight: 'rgba(16, 185, 129, 0.1)',
//     highlight: 'rgba(255, 255, 255, 0.9)',
//   };

//   // Redux states
//   const salesOrdersState = useSelector((state) => state.salesOrders, shallowEqual);
//   const customersState = useSelector((state) => state.customers, shallowEqual);
//   const productsState = useSelector((state) => state.products, shallowEqual);
//   const salesOrderItemsState = useSelector((state) => state.salesOrderItems, shallowEqual);
//   const stockTransactionsState = useSelector((state) => state.stockTransactions, shallowEqual);
//   const purchaseOrdersState = useSelector((state) => state.purchaseOrders, shallowEqual);
//   const purchaseOrderItemsState = useSelector((state) => state.purchaseOrderItems, shallowEqual);

//   const salesOrders = useMemo(
//     () => salesOrdersState?.responseBody || salesOrdersState?.salesOrders || [],
//     [salesOrdersState?.responseBody, salesOrdersState?.salesOrders]
//   );

//   const customers = useMemo(
//     () => customersState?.customers || customersState?.responseBody || [],
//     [customersState?.customers, customersState?.responseBody]
//   );

//   const products = useMemo(
//     () => productsState?.responseBody || productsState?.products || [],
//     [productsState?.responseBody, productsState?.products]
//   );

//   const salesOrderItems = useMemo(
//     () => salesOrderItemsState?.responseBody || salesOrderItemsState?.salesOrderItems || [],
//     [salesOrderItemsState?.responseBody, salesOrderItemsState?.salesOrderItems]
//   );

//   const stockTransactions = useMemo(
//     () => stockTransactionsState?.responseBody || stockTransactionsState?.stockTransactions || [],
//     [stockTransactionsState?.responseBody, stockTransactionsState?.stockTransactions]
//   );

//   const purchaseOrders = useMemo(
//     () => purchaseOrdersState?.responseBody || purchaseOrdersState?.purchaseOrders || [],
//     [purchaseOrdersState?.responseBody, purchaseOrdersState?.purchaseOrders]
//   );

//   const purchaseOrderItems = useMemo(
//     () => purchaseOrderItemsState?.responseBody || purchaseOrderItemsState?.purchaseOrderItems || [],
//     [purchaseOrderItemsState?.responseBody, purchaseOrderItemsState?.purchaseOrderItems]
//   );

//   const loading = salesOrdersState?.loading || salesOrderItemsState?.loading || false;

//   // Format number with thousand separators
//   const formatNumber = (number) => {
//     if (number === null || number === undefined || number === '') return '0';
//     const num = typeof number === 'string' ? parseFloat(number) : number;
//     if (isNaN(num)) return '0';

//     return new Intl.NumberFormat('en-IN', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(num);
//   };

//   // Format number without decimal places (for quantities)
//   const formatInteger = (number) => {
//     if (number === null || number === undefined || number === '') return '0';
//     const num = typeof number === 'string' ? parseInt(number) : number;
//     if (isNaN(num)) return '0';

//     return new Intl.NumberFormat('en-IN').format(num);
//   };

//   // Format date to show only date part (remove time)
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return dateString;

//     return date.toISOString().split('T')[0];
//   };

//   // Function to handle edit start
//   const handleEditStart = (productId, currentQuantity) => {
//     setEditingItemId(productId);
//     setEditQuantity(currentQuantity.toString());
//   };

//   // Function to handle edit save
//   const handleEditSave = (productId) => {
//     if (!editQuantity || Number(editQuantity) <= 0) {
//       setErrorMsg("❌ Quantity must be greater than 0");
//       setTimeout(() => setErrorMsg(""), 3000);
//       return;
//     }

//     // Check stock availability for the new quantity
//     if (!hasSufficientStock(productId, Number(editQuantity))) {
//       const currentStock = getCurrentStock(productId);
//       const productName = products.find(p => String(p.ProductID) === String(productId))?.ProductName || "Product";
//       setErrorMsg(`❌ Insufficient stock! ${productName} has only ${currentStock} units available`);
//       setTimeout(() => setErrorMsg(""), 5000);
//       return;
//     }

//     const updatedItems = localItems.map(item =>
//       String(item.ProductID) === String(productId)
//         ? { ...item, Quantity: Number(editQuantity) }
//         : item
//     );

//     setLocalItems(updatedItems);
//     setEditingItemId(null);
//     setEditQuantity("");
//   };

//   // Function to handle edit cancel
//   const handleEditCancel = () => {
//     setEditingItemId(null);
//     setEditQuantity("");
//   };

//   // Get current stock for a product (same logic as Overview page)
//   const getCurrentStock = (productId) => {
//     const productTransactions = stockTransactions.filter(st =>
//       String(st.ProductID || st.productId) === String(productId)
//     );

//     const stockInTransactions = productTransactions
//       .filter(st => (st.TransactionType || st.transactionType) === "IN")
//       .reduce((sum, st) => sum + (parseInt(st.Quantity) || parseInt(st.quantity) || 0), 0);

//     const stockOutTransactions = productTransactions
//       .filter(st => (st.TransactionType || st.transactionType) === "OUT")
//       .reduce((sum, st) => sum + (parseInt(st.Quantity) || parseInt(st.quantity) || 0), 0);

//     return Math.max(0, stockInTransactions - stockOutTransactions);
//   };

//   // Check if product has sufficient stock
//   const hasSufficientStock = (productId, quantity) => {
//     const currentStock = getCurrentStock(productId);
//     return currentStock >= quantity;
//   };

//   // Get purchase price for a product - FROM PURCHASE ORDER ITEMS
//   const getPurchasePrice = (productId) => {
//     if (!productId) return 0;

//     // First try to get from product data
//     const product = products.find(p =>
//       String(p.ProductID) === String(productId) ||
//       String(p.productId) === String(productId)
//     );

//     if (product) {
//       // Try different possible field names for purchase price in product data
//       const productPurchasePrice = product.PurchasePrice ||
//                                   product.PurchaseCost ||
//                                   product.UnitCost ||
//                                   product.CostPrice ||
//                                   product.Cost;
//       if (productPurchasePrice) return productPurchasePrice;
//     }

//     // If not found in product data, look in purchase order items
//     const purchaseItems = purchaseOrderItems.filter(item =>
//       String(item.ProductID) === String(productId)
//     );

//     if (purchaseItems.length > 0) {
//       // Get the most recent purchase price (assuming higher ItemID means more recent)
//       const sortedItems = purchaseItems.sort((a, b) =>
//         (Number(b.ItemID) || 0) - (Number(a.ItemID) || 0)
//       );

//       const mostRecentItem = sortedItems[0];
//       if (mostRecentItem && mostRecentItem.UnitPrice) {
//         return parseFloat(mostRecentItem.UnitPrice) || 0;
//       }
//     }

//     return 0;
//   };

//   useEffect(() => {
//     dispatch(GetAllSalesOrders());
//     dispatch(GetAllCustomers());
//     dispatch(GetAllProducts());
//     dispatch(GetAllSalesOrderItems());
//     dispatch(GetAllStockTransactions());
//     dispatch(GetAllPurchaseOrders());
//     dispatch(GetAllPurchaseOrderItems());
//   }, [dispatch]);

//   // Mobile responsiveness
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const getNextOrderId = () => {
//     if (!salesOrders || salesOrders.length === 0) return 1;
//     const maxId = Math.max(...salesOrders.map((o) => Number(o.SalesOrderID) || 0));
//     return maxId + 1;
//   };

//   const calculateTotalPrice = (quantity, unitPrice) => {
//     const qty = Number(quantity) || 0;
//     const price = Number(unitPrice) || 0;
//     return (qty * price);
//   };

//   const calculateOrderTotal = (items) => {
//     if (!items || items.length === 0) return 0;
//     const total = items.reduce((sum, item) => {
//       return sum + (Number(item.Quantity) || 0) * (Number(item.UnitPrice) || 0);
//     }, 0);
//     return total;
//   };

//   // Filtered customers for dropdown
//   const filteredCustomers = useMemo(() => {
//     return customers.filter(customer =>
//       customer.CustomerName.toLowerCase().includes(customerSearch.toLowerCase())
//     );
//   }, [customers, customerSearch]);

//   // Filtered products for dropdown
//   const filteredProducts = useMemo(() => {
//     return products.filter(product =>
//       product.ProductName.toLowerCase().includes(productSearch.toLowerCase())
//     );
//   }, [products, productSearch]);

//   const mergedOrders = useMemo(() => {
//     const merged = salesOrders.map((order) => {
//       const items = salesOrderItems
//         .filter((i) => String(i.SalesOrderID) === String(order.SalesOrderID))
//         .map((i) => {
//           const product = products.find((p) => String(p.ProductID) === String(i.ProductID));
//           return {
//             ...i,
//             productName: product ? product.ProductName : i.ProductID,
//             totalPrice: calculateTotalPrice(i.Quantity, i.UnitPrice)
//           };
//         });
//       return {
//         ...order,
//         items,
//         orderTotal: calculateOrderTotal(items)
//       };
//     });

//     return merged.sort((a, b) => {
//       const idA = Number(a.SalesOrderID) || 0;
//       const idB = Number(b.SalesOrderID) || 0;
//       return idB - idA;
//     });
//   }, [salesOrders, salesOrderItems, products]);

//   const filteredOrders = useMemo(() => {
//     return mergedOrders.filter((order) => {
//       const orderId = String(order.SalesOrderID || "");
//       const customerName = customers.find((c) => String(c.CustomerID) === String(order.CustomerID))?.CustomerName || "";

//       const matchesSearch = orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customerName.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesStatus = statusFilter === "All" || order.OrderStatus === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [mergedOrders, customers, searchTerm, statusFilter]);

//   const selectedOrderDetails = useMemo(() => {
//     if (!selectedOrderForView) return null;
//     return mergedOrders.find(order => String(order.SalesOrderID) === String(selectedOrderForView));
//   }, [selectedOrderForView, mergedOrders]);

//   // Handle customer selection
//   const handleCustomerSelect = (customerId, customerName) => {
//     setNewOrder({ ...newOrder, CustomerID: customerId });
//     setCustomerSearch(customerName);
//     setShowCustomerDropdown(false);
//   };

//   // Handle product selection - WITH purchase price and stock information
//   const handleProductSelect = (productId) => {
//     const selected = products.find((p) => String(p.ProductID) === String(productId));
//     if (selected) {
//       const purchasePrice = getPurchasePrice(productId);
//       const currentStock = getCurrentStock(productId);

//       setNewItem({
//         ...newItem,
//         ProductID: productId,
//         Quantity: "", // Keep quantity empty
//         UnitPrice: "", // Clear unit price - user must enter manually
//       });
//       setProductSearch(selected.ProductName);
//       setShowProductDropdown(false);

//       // Show purchase price and stock information
//       setSuccessMsg(`✅ Selected: ${selected.ProductName} | Purchase Price: Rs.${formatNumber(purchasePrice)} | Stock: ${currentStock} units`);
//       setTimeout(() => setSuccessMsg(""), 5000);
//     }
//   };

//   const handleAddLocalItem = (e) => {
//     e.preventDefault();
//     if (!newItem.ProductID || !newItem.Quantity || !newItem.UnitPrice) {
//       setErrorMsg("⚠️ Please select a product, enter quantity and unit sale price");
//       setTimeout(() => setErrorMsg(""), 3000);
//       return;
//     }

//     const qty = Number(newItem.Quantity);
//     const price = Number(newItem.UnitPrice) || 0;

//     if (qty <= 0) {
//       setErrorMsg("❌ Quantity must be greater than 0");
//       setTimeout(() => setErrorMsg(""), 3000);
//       return;
//     }

//     if (price <= 0) {
//       setErrorMsg("❌ Unit sale price must be greater than 0");
//       setTimeout(() => setErrorMsg(""), 3000);
//       return;
//     }

//     // Check stock availability
//     if (!hasSufficientStock(newItem.ProductID, qty)) {
//       const currentStock = getCurrentStock(newItem.ProductID);
//       const productName = products.find(p => String(p.ProductID) === String(newItem.ProductID))?.ProductName || "Product";
//       setErrorMsg(`❌ Insufficient stock! ${productName} has only ${currentStock} units available`);
//       setTimeout(() => setErrorMsg(""), 5000);
//       return;
//     }

//     const existingIndex = localItems.findIndex(
//       (it) => String(it.ProductID) === String(newItem.ProductID)
//     );
//     if (existingIndex >= 0) {
//       const updated = [...localItems];
//       const newTotalQty = Number(updated[existingIndex].Quantity) + qty;

//       // Check stock for updated quantity
//       if (!hasSufficientStock(newItem.ProductID, newTotalQty)) {
//         const currentStock = getCurrentStock(newItem.ProductID);
//         const productName = products.find(p => String(p.ProductID) === String(newItem.ProductID))?.ProductName || "Product";
//         setErrorMsg(`❌ Insufficient stock! ${productName} has only ${currentStock} units available`);
//         setTimeout(() => setErrorMsg(""), 5000);
//         return;
//       }

//       updated[existingIndex] = {
//         ...updated[existingIndex],
//         Quantity: newTotalQty,
//         UnitPrice: price,
//       };
//       setLocalItems(updated);
//     } else {
//       setLocalItems([
//         ...localItems,
//         { ProductID: newItem.ProductID, Quantity: qty, UnitPrice: price },
//       ]);
//     }

//     setNewItem({ ProductID: "", Quantity: "", UnitPrice: "" });
//     setProductSearch("");
//     setSuccessMsg("✅ Item added to order successfully!");
//     setTimeout(() => setSuccessMsg(""), 3000);
//   };

//   const handleRemoveLocalItem = (productId) => {
//     setLocalItems(localItems.filter((it) => String(it.ProductID) !== String(productId)));
//     // If we're removing an item that's being edited, cancel editing
//     if (editingItemId === productId) {
//       handleEditCancel();
//     }
//   };

//   const handleAddOrder = async (e) => {
//     e.preventDefault();
//     if (!newOrder.SalesOrderID || !newOrder.CustomerID || !newOrder.OrderDate) {
//       setErrorMsg("⚠️ Please fill all required fields");
//       setTimeout(() => setErrorMsg(""), 3000);
//       return;
//     }

//     if (!localItems || localItems.length === 0) {
//       setErrorMsg("❌ Please add at least one item to the order");
//       setTimeout(() => setErrorMsg(""), 3000);
//       return;
//     }

//     // Check stock for all items before creating order
//     for (const item of localItems) {
//       if (!hasSufficientStock(item.ProductID, item.Quantity)) {
//         const currentStock = getCurrentStock(item.ProductID);
//         const productName = products.find(p => String(p.ProductID) === String(item.ProductID))?.ProductName || "Product";
//         setErrorMsg(`❌ Cannot create order! ${productName} has only ${currentStock} units available, but you ordered ${item.Quantity}`);
//         setTimeout(() => setErrorMsg(""), 5000);
//         return;
//       }
//     }

//     const orderToAdd = {
//       SalesOrderID: newOrder.SalesOrderID,
//       CustomerID: newOrder.CustomerID,
//       OrderDate: newOrder.OrderDate,
//       OrderStatus: newOrder.OrderStatus || "Pending",
//     };

//     try {
//       await dispatch(AddSalesOrdersDetails(orderToAdd));

//       const currentMaxItemId = salesOrderItems && salesOrderItems.length > 0
//         ? Math.max(...salesOrderItems.map((i) => Number(i.ItemID) || 0))
//         : 0;

//       const addItemPromises = localItems.map((it, idx) => {
//         const nextItemID = (currentMaxItemId + idx + 1).toString();
//         const itemToAdd = {
//           ItemID: nextItemID,
//           SalesOrderID: orderToAdd.SalesOrderID,
//           ProductID: it.ProductID,
//           Quantity: String(it.Quantity),
//           UnitPrice: String(it.UnitPrice),
//           Status: "Active",
//         };
//         return dispatch(AddSalesOrderItemsDetails(itemToAdd));
//       });

//       await Promise.all(addItemPromises);
//       dispatch(GetAllSalesOrders());
//       dispatch(GetAllSalesOrderItems());
//       dispatch(GetAllStockTransactions());

//       setNewOrder({ SalesOrderID: "", CustomerID: "", OrderDate: new Date().toISOString().split('T')[0], OrderStatus: "Pending" });
//       setLocalItems([]);
//       setShowAddForm(false);
//       setCustomerSearch("");
//       setProductSearch("");
//       setEditingItemId(null);
//       setEditQuantity("");

//       setSuccessMsg("✅ Sales order created successfully!");
//       setTimeout(() => setSuccessMsg(""), 3000);
//     } catch (err) {
//       console.error("Add sales order error:", err);
//       setErrorMsg("❌ Failed to create sales order");
//       setTimeout(() => setErrorMsg(""), 3000);
//     }
//   };

//   const handleViewOrder = (orderId) => {
//     setSelectedOrderForView(orderId);
//     setShowViewModal(true);
//   };

//   // 3D Industrial CSS Styles with Mobile Responsiveness
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
//       padding: isMobile ? '16px' : '24px',
//       fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//     },
//     header: {
//       background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
//       padding: isMobile ? '24px 16px' : '32px',
//       borderRadius: isMobile ? '12px' : '16px',
//       marginBottom: isMobile ? '20px' : '28px',
//       boxShadow: `0 8px 32px ${colors.shadowDark}`,
//       border: `1px solid ${colors.highlight}`,
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     headerContent: {
//       position: 'relative',
//       zIndex: 2,
//       display: 'flex',
//       alignItems: 'center',
//       gap: isMobile ? '12px' : '20px',
//       flexDirection: isMobile ? 'column' : 'row',
//       textAlign: isMobile ? 'center' : 'left'
//     },
//     pageTitle: {
//       fontSize: isMobile ? '24px' : '36px',
//       fontWeight: '800',
//       color: colors.white,
//       margin: 0,
//       textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
//     },
//     pageSubtitle: {
//       fontSize: isMobile ? '14px' : '18px',
//       color: colors.highlight,
//       margin: isMobile ? '4px 0 0 0' : '6px 0 0 0',
//       fontWeight: '500'
//     },
//     successMsg: {
//       background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
//       color: colors.white,
//       padding: isMobile ? '14px 20px' : '18px 28px',
//       borderRadius: isMobile ? '8px' : '12px',
//       marginBottom: isMobile ? '20px' : '28px',
//       textAlign: 'center',
//       fontWeight: '600',
//       fontSize: isMobile ? '14px' : '16px',
//       boxShadow: `0 4px 16px ${colors.shadowLight}`,
//       border: `1px solid ${colors.highlight}`
//     },
//     errorMsg: {
//       background: `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`,
//       color: colors.white,
//       padding: isMobile ? '14px 20px' : '18px 28px',
//       borderRadius: isMobile ? '8px' : '12px',
//       marginBottom: isMobile ? '20px' : '28px',
//       textAlign: 'center',
//       fontWeight: '600',
//       fontSize: isMobile ? '14px' : '16px',
//       boxShadow: `0 4px 16px rgba(239, 68, 68, 0.3)`,
//       border: `1px solid ${colors.highlight}`
//     },
//     controls: {
//       display: 'flex',
//       gap: isMobile ? '16px' : '24px',
//       alignItems: 'center',
//       marginBottom: isMobile ? '20px' : '28px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       padding: isMobile ? '20px 16px' : '28px',
//       borderRadius: isMobile ? '12px' : '16px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}`,
//       border: `1px solid ${colors.highlight}`,
//       position: 'relative',
//       flexDirection: isMobile ? 'column' : 'row'
//     },
//     searchBox: {
//       position: 'relative',
//       display: 'flex',
//       alignItems: 'center',
//       flex: '1',
//       maxWidth: 'none',
//       width: '100%'
//     },
//     searchInput: {
//       padding: isMobile ? '14px 20px 14px 48px' : '18px 24px 18px 56px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isMobile ? '8px' : '12px',
//       fontSize: isMobile ? '16px' : '18px',
//       width: '100%',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     searchIcon: {
//       position: 'absolute',
//       left: isMobile ? '16px' : '24px',
//       color: colors.primary,
//       fontSize: isMobile ? '18px' : '20px'
//     },
//     filterSelect: {
//       padding: isMobile ? '14px 16px' : '18px 24px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isMobile ? '8px' : '12px',
//       fontSize: isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       cursor: 'pointer',
//       fontWeight: '600',
//       minWidth: isMobile ? '140px' : '180px',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       transition: 'all 0.3s ease',
//       marginLeft: isMobile ? '0' : 'auto',
//       width: isMobile ? '100%' : 'auto'
//     },
//     addButton: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
//       color: colors.white,
//       border: 'none',
//       borderRadius: isMobile ? '8px' : '12px',
//       padding: isMobile ? '14px 20px' : '18px 32px',
//       fontSize: isMobile ? '16px' : '18px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       boxShadow: `0 4px 16px ${colors.shadowDark}`,
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       width: isMobile ? '100%' : 'auto',
//       justifyContent: 'center'
//     },
//     modalOverlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: 'rgba(0, 0, 0, 0.8)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000,
//       padding: isMobile ? '10px' : '20px',
//       backdropFilter: 'blur(8px)'
//     },
//     modalContent: {
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       borderRadius: isMobile ? '12px' : '20px',
//       boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
//       width: '100%',
//       maxWidth: isMobile ? '100%' : '1400px',
//       maxHeight: isMobile ? '95vh' : '90vh',
//       overflow: 'auto',
//       border: `2px solid ${colors.highlight}`,
//       position: 'relative'
//     },
//     modalHeader: {
//       padding: isMobile ? '20px 16px' : '28px',
//       borderBottom: `2px solid ${colors.grayLighter}`,
//       background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     },
//     modalTitle: {
//       fontSize: isMobile ? '20px' : '26px',
//       fontWeight: '800',
//       color: colors.white,
//       margin: 0,
//       textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
//     },
//     closeButton: {
//       background: 'none',
//       border: 'none',
//       color: colors.white,
//       cursor: 'pointer',
//       padding: '10px',
//       borderRadius: '8px',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     modalBody: {
//       padding: isMobile ? '20px 16px' : '28px'
//     },
//     formGroup: {
//       marginBottom: isMobile ? '16px' : '24px'
//     },
//     label: {
//       display: 'block',
//       marginBottom: isMobile ? '8px' : '10px',
//       fontWeight: '700',
//       color: colors.dark,
//       fontSize: isMobile ? '14px' : '16px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     input: {
//       width: '100%',
//       padding: isMobile ? '12px 16px' : '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isMobile ? '8px' : '10px',
//       fontSize: isMobile ? '14px' : '16px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       boxSizing: 'border-box',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     select: {
//       width: '100%',
//       padding: isMobile ? '12px 16px' : '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isMobile ? '8px' : '10px',
//       fontSize: isMobile ? '14px' : '16px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       cursor: 'pointer',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500',
//       transition: 'all 0.3s ease'
//     },
//     dropdownContainer: {
//       position: 'relative',
//       width: '100%'
//     },
//     dropdown: {
//       position: 'absolute',
//       top: '100%',
//       left: 0,
//       right: 0,
//       backgroundColor: colors.white,
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isMobile ? '8px' : '10px',
//       maxHeight: '200px',
//       overflowY: 'auto',
//       zIndex: 1000,
//       boxShadow: `0 4px 12px rgba(0,0,0,0.1)`
//     },
//     dropdownItem: {
//       padding: isMobile ? '10px 12px' : '12px 16px',
//       cursor: 'pointer',
//       borderBottom: `1px solid ${colors.grayLighter}`,
//       transition: 'all 0.2s ease',
//       fontSize: isMobile ? '14px' : '16px'
//     },
//     itemCard: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: isMobile ? '12px' : '16px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isMobile ? '8px' : '10px',
//       marginBottom: isMobile ? '8px' : '12px',
//       backgroundColor: colors.light,
//       transition: 'all 0.3s ease'
//     },
//     itemGrid: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr auto',
//       gap: isMobile ? '8px' : '12px',
//       marginTop: isMobile ? '12px' : '16px'
//     },
//     buttonGroup: {
//       display: 'flex',
//       gap: isMobile ? '12px' : '16px',
//       justifyContent: 'flex-end',
//       marginTop: isMobile ? '24px' : '32px',
//       paddingTop: isMobile ? '16px' : '24px',
//       borderTop: `2px solid ${colors.grayLighter}`,
//       flexDirection: isMobile ? 'column' : 'row'
//     },
//     button: {
//       padding: isMobile ? '12px 20px' : '16px 28px',
//       border: 'none',
//       borderRadius: isMobile ? '8px' : '10px',
//       fontSize: isMobile ? '14px' : '16px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       boxShadow: `0 4px 16px ${colors.shadowDark}`,
//       width: isMobile ? '100%' : 'auto'
//     },
//     secondaryButton: {
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       color: colors.grayDark,
//       border: `2px solid ${colors.grayLighter}`
//     },
//     primaryButton: {
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
//       color: colors.white
//     },
//     tableContainer: {
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       borderRadius: isMobile ? '12px' : '16px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}`,
//       overflow: 'hidden',
//       border: `1px solid ${colors.highlight}`,
//       position: 'relative',
//       overflowX: isMobile ? 'auto' : 'hidden'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       minWidth: isMobile ? '600px' : 'auto'
//     },
//     tableHeader: {
//       background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`
//     },
//     tableHeaderCell: {
//       padding: isMobile ? '16px 12px' : '22px 20px',
//       textAlign: 'left',
//       fontWeight: '800',
//       fontSize: isMobile ? '12px' : '14px',
//       borderBottom: `3px solid ${colors.secondary}`,
//       color: colors.white,
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     tableRow: {
//       transition: 'all 0.3s ease',
//       borderBottom: `1px solid ${colors.grayLighter}`,
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`
//     },
//     tableCell: {
//       padding: isMobile ? '14px 12px' : '20px 20px',
//       fontSize: isMobile ? '12px' : '14px',
//       color: colors.dark,
//       fontWeight: '500',
//       wordWrap: 'break-word'
//     },
//     actionButton: {
//       padding: isMobile ? '8px 12px' : '10px 16px',
//       border: 'none',
//       borderRadius: isMobile ? '6px' : '8px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
//       color: colors.white,
//       boxShadow: `0 2px 8px ${colors.shadowDark}`,
//       margin: isMobile ? '0 2px' : '0 4px'
//     },
//     orderInfo: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
//       gap: isMobile ? '12px' : '20px',
//       marginBottom: isMobile ? '16px' : '24px',
//       padding: isMobile ? '16px' : '20px',
//       backgroundColor: colors.light,
//       borderRadius: isMobile ? '8px' : '12px',
//       border: `2px solid ${colors.grayLighter}`
//     },
//     infoItem: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: isMobile ? '6px' : '8px'
//     },
//     infoLabel: {
//       fontSize: isMobile ? '12px' : '14px',
//       color: colors.grayDark,
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     infoValue: {
//       fontSize: isMobile ? '16px' : '18px',
//       color: colors.dark,
//       fontWeight: '700'
//     },
//     sectionHeader: {
//       fontSize: isMobile ? '16px' : '18px',
//       fontWeight: '700',
//       color: colors.primaryDark,
//       marginBottom: isMobile ? '12px' : '16px',
//       paddingBottom: isMobile ? '6px' : '8px',
//       borderBottom: `2px solid ${colors.primaryLight}`,
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     stockInfo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       fontSize: isMobile ? '12px' : '14px',
//       marginTop: '4px'
//     },
//     itemsTable: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       marginTop: isMobile ? '12px' : '16px',
//       minWidth: isMobile ? '500px' : 'auto'
//     },
//     itemsTableHeader: {
//       background: `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`
//     },
//     itemsTableCell: {
//       padding: isMobile ? '12px 8px' : '16px 12px',
//       border: `1px solid ${colors.grayLighter}`,
//       textAlign: 'left',
//       fontSize: isMobile ? '12px' : '14px'
//     },
//     wideFormContainer: {
//       width: isMobile ? '100vw' : '95vw',
//       maxWidth: isMobile ? '100%' : '1600px',
//       margin: '0 auto'
//     },
//     priceInfo: {
//       fontSize: isMobile ? '12px' : '14px',
//       color: colors.gray,
//       marginTop: isMobile ? '6px' : '8px',
//       fontWeight: '600'
//     },
//     productInfoCard: {
//       marginTop: isMobile ? '8px' : '12px',
//       padding: isMobile ? '12px' : '16px',
//       backgroundColor: colors.info + '20',
//       border: `2px solid ${colors.info}30`,
//       borderRadius: isMobile ? '8px' : '10px',
//       fontSize: isMobile ? '12px' : '14px',
//       fontWeight: '600'
//     },
//     largeText: {
//       fontSize: isMobile ? '14px' : '16px',
//       fontWeight: '700'
//     },
//     mobileCard: {
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       borderRadius: '12px',
//       padding: '16px',
//       marginBottom: '12px',
//       boxShadow: `0 4px 12px ${colors.shadowDark}`,
//       border: `1px solid ${colors.highlight}`
//     },
//     mobileCardHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '12px',
//       paddingBottom: '8px',
//       borderBottom: `2px solid ${colors.primaryLight}`
//     },
//     mobileCardTitle: {
//       fontSize: '16px',
//       fontWeight: '700',
//       color: colors.primaryDark,
//       margin: 0
//     },
//     mobileCardContent: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px'
//     },
//     mobileCardRow: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '4px 0'
//     },
//     mobileCardLabel: {
//       fontSize: '12px',
//       color: colors.grayDark,
//       fontWeight: '600',
//       textTransform: 'uppercase'
//     },
//     mobileCardValue: {
//       fontSize: '14px',
//       fontWeight: '700',
//       color: colors.dark
//     }
//   };

//   // Mobile card view for orders
//   const MobileOrderCard = ({ order }) => {
//     const customerName = customers.find((c) => String(c.CustomerID) === String(order.CustomerID))?.CustomerName || order.CustomerID;

//     return (
//       <div style={styles.mobileCard}>
//         <div style={styles.mobileCardHeader}>
//           <h3 style={styles.mobileCardTitle}>Order #{order.SalesOrderID}</h3>
//           <button
//             style={styles.actionButton}
//             onMouseOver={(e) => {
//               e.target.style.transform = 'scale(1.1)';
//               e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = 'scale(1)';
//               e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
//             }}
//             onClick={() => handleViewOrder(order.SalesOrderID)}
//             title="View order details"
//           >
//             <Eye size={14} />
//           </button>
//         </div>
//         <div style={styles.mobileCardContent}>
//           <div style={styles.mobileCardRow}>
//             <span style={styles.mobileCardLabel}>Customer:</span>
//             <span style={styles.mobileCardValue}>{customerName}</span>
//           </div>
//           <div style={styles.mobileCardRow}>
//             <span style={styles.mobileCardLabel}>Date:</span>
//             <span style={styles.mobileCardValue}>{formatDate(order.OrderDate)}</span>
//           </div>
//           <div style={styles.mobileCardRow}>
//             <span style={styles.mobileCardLabel}>Total:</span>
//             <span style={{...styles.mobileCardValue, color: colors.secondary}}>
//               Rs. {formatNumber(order.orderTotal || 0)}
//             </span>
//           </div>
//           <div style={styles.mobileCardRow}>
//             <span style={styles.mobileCardLabel}>Items:</span>
//             <span style={styles.mobileCardValue}>
//               {order.items ? order.items.length : 0} items
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container}>
//       {/* Page Header */}
//       <div style={styles.header}>
//         <div style={styles.headerContent}>
//           <FileText size={isMobile ? 36 : 52} color={colors.white} />
//           <div>
//             <h1 style={styles.pageTitle}>SALES ORDERS MANAGEMENT</h1>
//             <p style={styles.pageSubtitle}>Manage sales orders and customer transactions across the system</p>
//           </div>
//         </div>
//       </div>

//       {/* Success/Error Message */}
//       {successMsg && (
//         <div style={styles.successMsg}>
//           {successMsg}
//         </div>
//       )}
//       {errorMsg && (
//         <div style={styles.errorMsg}>
//           {errorMsg}
//         </div>
//       )}

//       {/* Controls - Search, Filter and Add button */}
//       <div style={styles.controls}>
//         <div style={styles.searchBox}>
//           <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder="Search orders by ID or customer name..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             style={styles.searchInput}
//             onFocus={(e) => {
//               e.target.style.borderColor = colors.primary;
//               e.target.style.boxShadow = `inset 0 2px 8px ${colors.shadowLight}, 0 0 0 3px ${colors.shadowLight}`;
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = colors.grayLighter;
//               e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//             }}
//           />
//         </div>

//         <button
//           style={styles.addButton}
//           onMouseOver={(e) => {
//             e.target.style.transform = 'translateY(-2px) scale(1.02)';
//             e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
//             e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//           }}
//           onMouseOut={(e) => {
//             e.target.style.transform = 'translateY(0) scale(1)';
//             e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
//             e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
//           }}
//           onClick={() => {
//             setNewOrder({
//               SalesOrderID: getNextOrderId(),
//               CustomerID: "",
//               OrderDate: new Date().toISOString().split('T')[0],
//               OrderStatus: "Pending",
//             });
//             setLocalItems([]);
//             setNewItem({ ProductID: "", Quantity: "", UnitPrice: "" });
//             setShowAddForm(true);
//             setCustomerSearch("");
//             setProductSearch("");
//             setErrorMsg("");
//             setSuccessMsg("");
//             setEditingItemId(null);
//             setEditQuantity("");
//           }}
//         >
//           <Plus size={isMobile ? 20 : 24} /> CREATE SALES ORDER
//         </button>
//       </div>

//       {/* Sales Orders Table - Mobile Card View */}
//       {isMobile ? (
//         <div>
//           {loading ? (
//             <div style={{textAlign: 'center', padding: '40px', color: colors.primary}}>
//               <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
//                 <div style={{
//                   width: '24px',
//                   height: '24px',
//                   border: '3px solid #f0fdf4',
//                   borderTop: '3px solid #10b981',
//                   borderRadius: '50%',
//                   animation: 'spin 1s linear infinite'
//                 }}></div>
//                 <span style={{fontWeight: '600', fontSize: '16px'}}>Loading sales orders...</span>
//               </div>
//             </div>
//           ) : filteredOrders.length > 0 ? (
//             filteredOrders.map((order) => (
//               <MobileOrderCard key={order.SalesOrderID} order={order} />
//             ))
//           ) : (
//             <div style={{
//               textAlign: 'center',
//               padding: '40px',
//               color: colors.gray,
//               backgroundColor: colors.light,
//               borderRadius: '12px',
//               marginBottom: '16px',
//               border: `2px dashed ${colors.grayLighter}`
//             }}>
//               <FileText size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
//               <p style={{fontSize: '18px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No sales orders found</p>
//               <p style={{fontSize: '14px', margin: '8px 0 0 0'}}>Try adjusting your search criteria or filters</p>
//             </div>
//           )}
//         </div>
//       ) : (
//         /* Desktop Table View */
//         <div style={styles.tableContainer}>
//           <table style={styles.table}>
//             <thead style={styles.tableHeader}>
//               <tr>
//                 <th style={{...styles.tableHeaderCell, width: '20%'}}>Order ID</th>
//                 <th style={{...styles.tableHeaderCell, width: '30%'}}>Customer</th>
//                 <th style={{...styles.tableHeaderCell, width: '20%'}}>Order Date</th>
//                 <th style={{...styles.tableHeaderCell, width: '20%', textAlign: 'right'}}>Total Amount Rs. </th>
//                 <th style={{...styles.tableHeaderCell, width: '10%', textAlign: 'center'}}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} style={{...styles.tableCell, textAlign: 'center', padding: '60px'}}>
//                     <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
//                       <div style={{
//                         width: '28px',
//                         height: '28px',
//                         border: '3px solid #f0fdf4',
//                         borderTop: '3px solid #10b981',
//                         borderRadius: '50%',
//                         animation: 'spin 1s linear infinite'
//                       }}></div>
//                       <span style={{fontWeight: '600', color: colors.primary, fontSize: '18px'}}>Loading sales orders...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredOrders.length > 0 ? (
//                 filteredOrders.map((order) => {
//                   const customerName = customers.find((c) => String(c.CustomerID) === String(order.CustomerID))?.CustomerName || order.CustomerID;
//                   return (
//                     <tr
//                       key={order.SalesOrderID}
//                       style={styles.tableRow}
//                       onMouseOver={(e) => {
//                         e.currentTarget.style.background = `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`;
//                         e.currentTarget.style.transform = 'scale(1.01)';
//                       }}
//                       onMouseOut={(e) => {
//                         e.currentTarget.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
//                         e.currentTarget.style.transform = 'scale(1)';
//                       }}
//                     >
//                       <td style={{...styles.tableCell, fontWeight: '700', color: colors.primaryDark}}>#{order.SalesOrderID}</td>
//                       <td style={styles.tableCell}>
//                         <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
//                           <User size={18} color={colors.primary} />
//                           {customerName}
//                         </div>
//                       </td>
//                       <td style={styles.tableCell}>{formatDate(order.OrderDate)}</td>
//                       <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', color: colors.secondary}}>
//                         Rs. {formatNumber(order.orderTotal || 0)}
//                       </td>
//                       <td style={{...styles.tableCell, textAlign: 'center'}}>
//                         <div style={{display: 'flex', justifyContent: 'center', gap: '8px'}}>
//                           <button
//                             style={styles.actionButton}
//                             onMouseOver={(e) => {
//                               e.target.style.transform = 'scale(1.1)';
//                               e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//                               e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
//                             }}
//                             onMouseOut={(e) => {
//                               e.target.style.transform = 'scale(1)';
//                               e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
//                               e.target.style.boxShadow = `0 2px 8px ${colors.shadowDark}`;
//                             }}
//                             onClick={() => handleViewOrder(order.SalesOrderID)}
//                             title="View order details"
//                           >
//                             <Eye size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={5} style={{...styles.tableCell, textAlign: 'center', padding: '60px'}}>
//                     <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: colors.gray}}>
//                       <FileText size={72} color={colors.grayLight} />
//                       <p style={{fontSize: '20px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No sales orders found</p>
//                       <p style={{fontSize: '16px', margin: 0}}>Try adjusting your search criteria or filters</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Create Order Modal */}
//       {showAddForm && (
//         <div style={styles.modalOverlay}>
//           <div style={{...styles.modalContent, ...styles.wideFormContainer}}>
//             <div style={styles.modalHeader}>
//               <h3 style={styles.modalTitle}>CREATE SALES ORDER</h3>
//               <button
//                 style={styles.closeButton}
//                 onClick={() => {
//                   setShowAddForm(false);
//                   setErrorMsg("");
//                   setEditingItemId(null);
//                   setEditQuantity("");
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
//               >
//                 <X size={28} />
//               </button>
//             </div>

//             <div style={styles.modalBody}>
//               <form onSubmit={handleAddOrder}>
//                 <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '16px' : '20px', marginBottom: isMobile ? '20px' : '24px'}}>
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Order ID</label>
//                     <input
//                       type="text"
//                       value={newOrder.SalesOrderID}
//                       disabled
//                       style={{
//                         ...styles.input,
//                         backgroundColor: colors.grayLighter,
//                         color: colors.grayDark,
//                         cursor: 'not-allowed'
//                       }}
//                     />
//                   </div>

//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Order Date *</label>
//                     <input
//                       type="date"
//                       value={newOrder.OrderDate}
//                       onChange={(e) => setNewOrder({ ...newOrder, OrderDate: e.target.value })}
//                       required
//                       style={styles.input}
//                       onFocus={(e) => {
//                         e.target.style.borderColor = colors.primary;
//                         e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                       }}
//                       onBlur={(e) => {
//                         e.target.style.borderColor = colors.grayLighter;
//                         e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Searchable Customer Dropdown */}
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Customer *</label>
//                   <div style={styles.dropdownContainer}>
//                     <input
//                       type="text"
//                       placeholder="Type to search customers..."
//                       value={customerSearch}
//                       onChange={(e) => {
//                         setCustomerSearch(e.target.value);
//                         setShowCustomerDropdown(true);
//                       }}
//                       onFocus={() => setShowCustomerDropdown(true)}
//                       style={{
//                         ...styles.input,
//                         padding: isMobile ? '10px 14px' : '12px 16px',
//                         borderColor: !newOrder.CustomerID ? colors.error : colors.grayLighter
//                       }}
//                       onBlur={() => setTimeout(() => setShowCustomerDropdown(false), 200)}
//                     />

//                     {/* Customer Validation Message */}
//                     {!newOrder.CustomerID && (
//                       <div style={{
//                         color: colors.error,
//                         fontSize: isMobile ? '12px' : '14px',
//                         fontWeight: '600',
//                         marginTop: '8px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px'
//                       }}>
//                         <AlertTriangle size={isMobile ? 14 : 16} />
//                         Please select a customer to continue
//                       </div>
//                     )}

//                     {showCustomerDropdown && filteredCustomers.length > 0 && (
//                       <div style={styles.dropdown}>
//                         {filteredCustomers.map((customer) => (
//                           <div
//                             key={customer.CustomerID}
//                             style={styles.dropdownItem}
//                             onMouseOver={(e) => e.target.style.backgroundColor = colors.light}
//                             onMouseOut={(e) => e.target.style.backgroundColor = colors.white}
//                             onMouseDown={(e) => {
//                               e.preventDefault();
//                               handleCustomerSelect(customer.CustomerID, customer.CustomerName);
//                             }}
//                           >
//                             {customer.CustomerName}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Items Section */}
//                 <div style={styles.formGroup}>
//                   <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '8px' : '0', alignItems: isMobile ? 'flex-start' : 'center'}}>
//                     <label style={styles.label}>Order Items *</label>
//                     <div style={{fontSize: isMobile ? '12px' : '14px', color: colors.gray, fontStyle: 'italic'}}>
//                       Add items to create the order
//                     </div>
//                   </div>

//                   {/* Search Products Section */}
//                   <div style={{marginBottom: '24px', padding: isMobile ? '16px' : '20px', backgroundColor: colors.light, borderRadius: '10px', border: `2px solid ${colors.grayLighter}`}}>
//                     <h4 style={styles.sectionHeader}>Search & Add Products</h4>
//                     <div style={styles.itemGrid}>
//                       <div style={styles.dropdownContainer}>
//                         <input
//                           type="text"
//                           placeholder="Search products..."
//                           value={productSearch}
//                           onChange={(e) => {
//                             setProductSearch(e.target.value);
//                             setShowProductDropdown(true);
//                           }}
//                           onFocus={() => setShowProductDropdown(true)}
//                           style={{...styles.input, padding: isMobile ? '10px 14px' : '12px 16px'}}
//                           onBlur={() => setTimeout(() => setShowProductDropdown(false), 200)}
//                         />
//                         {showProductDropdown && filteredProducts.length > 0 && (
//                           <div style={styles.dropdown}>
//                             {filteredProducts.map((product) => {
//                               const purchasePrice = getPurchasePrice(product.ProductID);
//                               const currentStock = getCurrentStock(product.ProductID);
//                               return (
//                                 <div
//                                   key={product.ProductID}
//                                   style={styles.dropdownItem}
//                                   onMouseOver={(e) => e.target.style.backgroundColor = colors.light}
//                                   onMouseOut={(e) => e.target.style.backgroundColor = colors.white}
//                                   onMouseDown={(e) => {
//                                     e.preventDefault();
//                                     handleProductSelect(product.ProductID);
//                                   }}
//                                 >
//                                   <div style={{ fontWeight: '600', fontSize: isMobile ? '12px' : '14px' }}>{product.ProductName}</div>
//                                   <div style={{ fontSize: isMobile ? '11px' : '13px', color: colors.gray, fontWeight: '600', marginTop: '4px' }}>
//                                     Purchase Price: Rs.{formatNumber(purchasePrice)} | Stock: {currentStock} units
//                                   </div>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         )}
//                       </div>

//                       <input
//                         type="number"
//                         value={newItem.Quantity}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           if (value === '' || (Number(value) > 0 && Number(value) <= 10000)) {
//                             setNewItem({ ...newItem, Quantity: value });
//                           }
//                         }}
//                         placeholder="Quantity"
//                         min="1"
//                         max="10000"
//                         style={{...styles.input, padding: isMobile ? '10px 14px' : '12px 16px', fontSize: isMobile ? '12px' : '14px'}}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                       />

//                       {/* MANUAL UNIT PRICE INPUT - EDITABLE */}
//                       <input
//                         type="number"
//                         value={newItem.UnitPrice}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           if (value === '' || (Number(value) >= 0 && Number(value) <= 1000000)) {
//                             setNewItem({ ...newItem, UnitPrice: value });
//                           }
//                         }}
//                         placeholder="Enter Sale Price *"
//                         min="0"
//                         max="1000000"
//                         step="0.01"
//                         style={{
//                           ...styles.input,
//                           padding: isMobile ? '10px 14px' : '12px 16px',
//                           fontWeight: '600',
//                           fontSize: isMobile ? '12px' : '14px',
//                           color: newItem.UnitPrice ? colors.secondary : colors.gray,
//                           borderColor: newItem.UnitPrice ? colors.secondary : colors.grayLighter
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = newItem.UnitPrice ? colors.secondary : colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                       />

//                       <button
//                         type="button"
//                         style={{
//                           ...styles.button,
//                           ...styles.primaryButton,
//                           padding: isMobile ? '10px 14px' : '12px 16px',
//                           fontSize: isMobile ? '12px' : '14px',
//                           opacity: (!newItem.ProductID || !newItem.Quantity || !newItem.UnitPrice) ? 0.6 : 1,
//                           width: isMobile ? '100%' : 'auto'
//                         }}
//                         onMouseOver={(e) => {
//                           if (newItem.ProductID && newItem.Quantity && newItem.UnitPrice) {
//                             e.target.style.transform = 'translateY(-2px)';
//                           }
//                         }}
//                         onMouseOut={(e) => {
//                           e.target.style.transform = 'translateY(0)';
//                         }}
//                         onClick={handleAddLocalItem}
//                         disabled={!newItem.ProductID || !newItem.Quantity || !newItem.UnitPrice}
//                       >
//                         Add Item
//                       </button>
//                     </div>

//                     {/* Product Information when selected */}
//                     {newItem.ProductID && (
//                       <div style={styles.productInfoCard}>
//                         <div style={{ fontWeight: '600', marginBottom: '8px', fontSize: isMobile ? '13px' : '15px' }}>
//                           Selected Product: {products.find(p => String(p.ProductID) === String(newItem.ProductID))?.ProductName}
//                         </div>
//                         <div style={{ color: colors.grayDark, fontSize: isMobile ? '12px' : '14px', fontWeight: '600' }}>
//                           Purchase Price: Rs.{formatNumber(getPurchasePrice(newItem.ProductID))} | Current Stock: {getCurrentStock(newItem.ProductID)} units
//                         </div>
//                       </div>
//                     )}

//                     {/* Stock validation message */}
//                     {newItem.ProductID && newItem.Quantity && (
//                       <div style={styles.stockInfo}>
//                         {hasSufficientStock(newItem.ProductID, Number(newItem.Quantity)) ? (
//                           <div style={{ color: colors.success, display: 'flex', alignItems: 'center', gap: '8px', fontSize: isMobile ? '12px' : '14px', fontWeight: '600' }}>
//                             <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.success }}></div>
//                             Sufficient stock available ({getCurrentStock(newItem.ProductID)} units)
//                           </div>
//                         ) : (
//                           <div style={{ color: colors.error, display: 'flex', alignItems: 'center', gap: '8px', fontSize: isMobile ? '12px' : '14px', fontWeight: '600' }}>
//                             <AlertTriangle size={isMobile ? 14 : 16} />
//                             Insufficient stock! Only {getCurrentStock(newItem.ProductID)} units available
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* Price Help Text */}
//                     <div style={{
//                       marginTop: '12px',
//                       padding: isMobile ? '10px 12px' : '12px 16px',
//                       backgroundColor: colors.warning + '20',
//                       border: `1px solid ${colors.warning}30`,
//                       borderRadius: '8px',
//                       fontSize: isMobile ? '11px' : '13px',
//                       color: colors.dark,
//                       fontWeight: '600'
//                     }}>
//                       <strong>💡 Manual Price Entry:</strong> You must manually enter the sale price for each product.
//                       The purchase price is shown for reference only.
//                     </div>
//                   </div>

//                   {/* Current Order Items in Table Format with Edit Functionality */}
//                   {localItems.length > 0 ? (
//                     <div style={{ marginBottom: '16px' }}>
//                       <h4 style={styles.sectionHeader}>Current Order Items ({localItems.length})</h4>
//                       <div style={styles.tableContainer}>
//                         <table style={styles.itemsTable}>
//                           <thead style={styles.itemsTableHeader}>
//                             <tr>
//                               <th style={{...styles.tableHeaderCell, width: isMobile ? '30%' : '30%'}}>Product Name</th>
//                               <th style={{...styles.tableHeaderCell, width: isMobile ? '15%' : '15%', textAlign: 'center'}}>Quantity</th>
//                               <th style={{...styles.tableHeaderCell, width: isMobile ? '20%' : '20%', textAlign: 'right'}}>Unit Price</th>
//                               <th style={{...styles.tableHeaderCell, width: isMobile ? '20%' : '20%', textAlign: 'right'}}>Total Price</th>
//                               <th style={{...styles.tableHeaderCell, width: isMobile ? '15%' : '15%', textAlign: 'center'}}>Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {localItems.map((it) => {
//                               const productName = products.find((p) => String(p.ProductID) === String(it.ProductID))?.ProductName || it.ProductID;
//                               const totalPrice = calculateTotalPrice(it.Quantity, it.UnitPrice);
//                               const currentStock = getCurrentStock(it.ProductID);
//                               const hasStock = hasSufficientStock(it.ProductID, it.Quantity);
//                               const purchasePrice = getPurchasePrice(it.ProductID);
//                               const isEditing = editingItemId === it.ProductID;

//                               return (
//                                 <tr key={it.ProductID} style={{
//                                   ...styles.tableRow,
//                                   borderColor: hasStock ? colors.grayLighter : colors.error
//                                 }}>
//                                   <td style={styles.tableCell}>
//                                     <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px'}}>
//                                       <Package size={isMobile ? 14 : 16} color={colors.primary} />
//                                       <span style={{fontWeight: '600', fontSize: isMobile ? '12px' : '14px'}}>{productName}</span>
//                                     </div>
//                                     <div style={styles.priceInfo}>
//                                       Purchase Price: Rs.{formatNumber(purchasePrice)} | Stock: {currentStock} units
//                                     </div>
//                                     {!hasStock && (
//                                       <div style={{ ...styles.stockInfo, color: colors.error, marginTop: '8px', fontSize: isMobile ? '11px' : '13px', fontWeight: '600' }}>
//                                         <AlertTriangle size={isMobile ? 12 : 14} />
//                                         Warning: Only {currentStock} units in stock!
//                                       </div>
//                                     )}
//                                   </td>
//                                   <td style={{...styles.tableCell, textAlign: 'center', fontWeight: '600', fontSize: isMobile ? '12px' : '14px'}}>
//                                     {isEditing ? (
//                                       <div style={{display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center'}}>
//                                         <input
//                                           type="number"
//                                           value={editQuantity}
//                                           onChange={(e) => {
//                                             const value = e.target.value;
//                                             if (value === '' || (Number(value) > 0 && Number(value) <= 10000)) {
//                                               setEditQuantity(value);
//                                             }
//                                           }}
//                                           min="1"
//                                           max="10000"
//                                           style={{
//                                             width: isMobile ? '50px' : '60px',
//                                             padding: '4px 6px',
//                                             border: `2px solid ${colors.primary}`,
//                                             borderRadius: '4px',
//                                             fontSize: isMobile ? '11px' : '12px',
//                                             textAlign: 'center',
//                                             fontWeight: '600'
//                                           }}
//                                           autoFocus
//                                           onKeyPress={(e) => {
//                                             if (e.key === 'Enter') {
//                                               handleEditSave(it.ProductID);
//                                             }
//                                             if (e.key === 'Escape') {
//                                               handleEditCancel();
//                                             }
//                                           }}
//                                         />
//                                       </div>
//                                     ) : (
//                                       <div style={{display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center'}}>
//                                         <span>{formatInteger(it.Quantity)}</span>
//                                       </div>
//                                     )}
//                                   </td>
//                                   <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', fontSize: isMobile ? '12px' : '14px'}}>
//                                     Rs. {formatNumber(it.UnitPrice)}
//                                   </td>
//                                   <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '800', color: colors.secondary, fontSize: isMobile ? '13px' : '15px'}}>
//                                     Rs. {formatNumber(totalPrice)}
//                                   </td>
//                                   <td style={{...styles.tableCell, textAlign: 'center'}}>
//                                     <div style={{display: 'flex', justifyContent: 'center', gap: isMobile ? '2px' : '4px'}}>
//                                       {isEditing ? (
//                                         <>
//                                           <button
//                                             type="button"
//                                             style={{
//                                               ...styles.actionButton,
//                                               background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.secondaryDark} 100%)`,
//                                               padding: isMobile ? '4px 6px' : '5px 7px'
//                                             }}
//                                             onMouseOver={(e) => {
//                                               e.target.style.transform = 'scale(1.1)';
//                                               e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, #059669 100%)`;
//                                             }}
//                                             onMouseOut={(e) => {
//                                               e.target.style.transform = 'scale(1)';
//                                               e.target.style.background = `linear-gradient(135deg, ${colors.success} 0%, ${colors.secondaryDark} 100%)`;
//                                             }}
//                                             onClick={() => handleEditSave(it.ProductID)}
//                                             title="Save quantity"
//                                           >
//                                             <Check size={isMobile ? 10 : 11} />
//                                           </button>
//                                           <button
//                                             type="button"
//                                             style={{
//                                               ...styles.actionButton,
//                                               background: `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
//                                               padding: isMobile ? '4px 6px' : '5px 7px'
//                                             }}
//                                             onMouseOver={(e) => {
//                                               e.target.style.transform = 'scale(1.1)';
//                                               e.target.style.background = `linear-gradient(135deg, #f59e0b 0%, #b45309 100%)`;
//                                             }}
//                                             onMouseOut={(e) => {
//                                               e.target.style.transform = 'scale(1)';
//                                               e.target.style.background = `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`;
//                                             }}
//                                             onClick={handleEditCancel}
//                                             title="Cancel edit"
//                                           >
//                                             <XIcon size={isMobile ? 10 : 11} />
//                                           </button>
//                                         </>
//                                       ) : (
//                                         <>
//                                           <button
//                                             type="button"
//                                             style={{
//                                               ...styles.actionButton,
//                                               background: `linear-gradient(135deg, ${colors.info} 0%, #0369a1 100%)`,
//                                               padding: isMobile ? '4px 6px' : '5px 7px'
//                                             }}
//                                             onMouseOver={(e) => {
//                                               e.target.style.transform = 'scale(1.1)';
//                                               e.target.style.background = `linear-gradient(135deg, #0ea5e9 0%, #075985 100%)`;
//                                             }}
//                                             onMouseOut={(e) => {
//                                               e.target.style.transform = 'scale(1)';
//                                               e.target.style.background = `linear-gradient(135deg, ${colors.info} 0%, #0369a1 100%)`;
//                                             }}
//                                             onClick={() => handleEditStart(it.ProductID, it.Quantity)}
//                                             title="Edit quantity"
//                                           >
//                                             <Edit size={isMobile ? 10 : 11} />
//                                           </button>
//                                           <button
//                                             type="button"
//                                             style={{
//                                               ...styles.actionButton,
//                                               background: `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`,
//                                               padding: isMobile ? '4px 6px' : '5px 7px'
//                                             }}
//                                             onMouseOver={(e) => {
//                                               e.target.style.transform = 'scale(1.1)';
//                                               e.target.style.background = `linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)`;
//                                             }}
//                                             onMouseOut={(e) => {
//                                               e.target.style.transform = 'scale(1)';
//                                               e.target.style.background = `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`;
//                                             }}
//                                             onClick={() => handleRemoveLocalItem(it.ProductID)}
//                                             title="Remove item"
//                                           >
//                                             <X size={isMobile ? 10 : 11} />
//                                           </button>
//                                         </>
//                                       )}
//                                     </div>
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                             {/* Total Row */}
//                             <tr style={{...styles.tableRow, background: colors.light}}>
//                               <td colSpan={isMobile ? 2 : 3} style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', fontSize: isMobile ? '13px' : '15px'}}>
//                                 Order Total:
//                               </td>
//                               <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '800', color: colors.secondary, fontSize: isMobile ? '14px' : '16px'}}>
//                                 Rs. {formatNumber(calculateOrderTotal(localItems))}
//                               </td>
//                               <td style={styles.tableCell}></td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   ) : (
//                     <div style={{
//                       textAlign: 'center',
//                       padding: isMobile ? '24px' : '32px',
//                       color: colors.gray,
//                       backgroundColor: colors.light,
//                       borderRadius: '10px',
//                       marginBottom: '16px',
//                       border: `2px dashed ${colors.grayLighter}`
//                     }}>
//                       <Package size={isMobile ? 24 : 32} style={{ marginBottom: '12px', opacity: 0.5 }} />
//                       <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600' }}>No items added yet</div>
//                       <div style={{ fontSize: isMobile ? '12px' : '14px', marginTop: '4px' }}>Search and add products above</div>
//                     </div>
//                   )}
//                 </div>

//                 <div style={styles.buttonGroup}>
//                   <button
//                     type="button"
//                     style={{
//                       ...styles.button,
//                       ...styles.secondaryButton
//                     }}
//                     onMouseOver={(e) => {
//                       e.target.style.background = `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`;
//                       e.target.style.color = colors.white;
//                     }}
//                     onMouseOut={(e) => {
//                       e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
//                       e.target.style.color = colors.grayDark;
//                     }}
//                     onClick={() => {
//                       setShowAddForm(false);
//                       setErrorMsg("");
//                       setEditingItemId(null);
//                       setEditQuantity("");
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     style={{
//                       ...styles.button,
//                       ...styles.primaryButton,
//                       opacity: (localItems.length === 0 || !newOrder.CustomerID) ? 0.6 : 1
//                     }}
//                     onMouseOver={(e) => {
//                       if (localItems.length > 0 && newOrder.CustomerID) {
//                         e.target.style.transform = 'translateY(-2px)';
//                         e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//                       }
//                     }}
//                     onMouseOut={(e) => {
//                       e.target.style.transform = 'translateY(0)';
//                       e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
//                     }}
//                     disabled={localItems.length === 0 || !newOrder.CustomerID}
//                   >
//                     Create Order
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Order Modal */}
//       {showViewModal && selectedOrderDetails && (
//         <div style={styles.modalOverlay}>
//           <div style={{...styles.modalContent, ...styles.wideFormContainer}}>
//             <div style={styles.modalHeader}>
//               <h3 style={styles.modalTitle}>VIEW SALES ORDER #{selectedOrderDetails.SalesOrderID}</h3>
//               <button
//                 style={styles.closeButton}
//                 onClick={() => {
//                   setShowViewModal(false);
//                   setSelectedOrderForView(null);
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
//               >
//                 <X size={28} />
//               </button>
//             </div>

//             <div style={styles.modalBody}>
//               <div style={styles.orderInfo}>
//                 <div style={styles.infoItem}>
//                   <span style={styles.infoLabel}>Customer</span>
//                   <span style={styles.infoValue}>
//                     {customers.find(c => String(c.CustomerID) === String(selectedOrderDetails.CustomerID))?.CustomerName}
//                   </span>
//                 </div>
//                 <div style={styles.infoItem}>
//                   <span style={styles.infoLabel}>Order Date</span>
//                   <span style={styles.infoValue}>
//                     {selectedOrderDetails.OrderDate ?
//                       new Date(selectedOrderDetails.OrderDate).toISOString().split('T')[0]
//                       : 'N/A'
//                     }
//                   </span>
//                 </div>
//                 <div style={styles.infoItem}>
//                   <span style={styles.infoLabel}>Total Amount</span>
//                   <span style={{...styles.infoValue, color: colors.secondary}}>
//                     Rs. {formatNumber(selectedOrderDetails.orderTotal || 0)}
//                   </span>
//                 </div>
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Order Items</label>
//                 <div style={styles.tableContainer}>
//                   <table style={styles.table}>
//                     <thead style={styles.tableHeader}>
//                       <tr>
//                         <th style={{...styles.tableHeaderCell, width: '40%'}}>Item Name</th>
//                         <th style={{...styles.tableHeaderCell, width: '15%', textAlign: 'right'}}>Qty</th>
//                         <th style={{...styles.tableHeaderCell, width: '20%', textAlign: 'right'}}>Unit Price</th>
//                         <th style={{...styles.tableHeaderCell, width: '25%', textAlign: 'right'}}>Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedOrderDetails.items && selectedOrderDetails.items.map((item, idx) => {
//                         const purchasePrice = getPurchasePrice(item.ProductID);
//                         const currentStock = getCurrentStock(item.ProductID);
//                         return (
//                           <tr key={idx} style={styles.tableRow}>
//                             <td style={styles.tableCell}>
//                               <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px'}}>
//                                 <Package size={isMobile ? 14 : 16} color={colors.primary} />
//                                 <span style={{fontWeight: '600', fontSize: isMobile ? '12px' : '14px'}}>{item.productName}</span>
//                               </div>
//                               <div style={styles.priceInfo}>
//                                 Purchase Price: Rs.{formatNumber(purchasePrice)} | Current Stock: {currentStock} units
//                               </div>
//                             </td>
//                             <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', fontSize: isMobile ? '12px' : '14px'}}>
//                               {formatInteger(item.Quantity)}
//                             </td>
//                             <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', fontSize: isMobile ? '12px' : '14px'}}>
//                               Rs. {formatNumber(item.UnitPrice)}
//                             </td>
//                             <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '800', color: colors.secondary, fontSize: isMobile ? '13px' : '15px'}}>
//                               Rs. {formatNumber(item.totalPrice)}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                       {(!selectedOrderDetails.items || selectedOrderDetails.items.length === 0) && (
//                         <tr>
//                           <td colSpan={4} style={{...styles.tableCell, textAlign: 'center', color: colors.gray}}>
//                             No items found for this order
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                     {selectedOrderDetails.items && selectedOrderDetails.items.length > 0 && (
//                       <tfoot>
//                         <tr style={{...styles.tableRow, background: colors.light}}>
//                           <td colSpan={3} style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', fontSize: isMobile ? '13px' : '15px'}}>
//                             Total Amount:
//                           </td>
//                           <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '800', color: colors.secondary, fontSize: isMobile ? '14px' : '18px'}}>
//                             Rs. {formatNumber(selectedOrderDetails.orderTotal || 0)}
//                           </td>
//                         </tr>
//                       </tfoot>
//                     )}
//                   </table>
//                 </div>
//               </div>

//               <div style={styles.buttonGroup}>
//                 <button
//                   type="button"
//                   style={{
//                     ...styles.button,
//                     ...styles.secondaryButton
//                   }}
//                   onMouseOver={(e) => {
//                     e.target.style.background = `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`;
//                     e.target.style.color = colors.white;
//                   }}
//                   onMouseOut={(e) => {
//                     e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
//                     e.target.style.color = colors.grayDark;
//                   }}
//                   onClick={() => {
//                     setShowViewModal(false);
//                     setSelectedOrderForView(null);
//                   }}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SalesOrders;

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  Plus,
  Search,
  Eye,
  X,
  Calendar,
  User,
  Package,
  DollarSign,
  FileText,
  Building2,
  AlertTriangle,
  Menu,
  Edit,
  Check,
  X as XIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  GetAllSalesOrders,
  AddSalesOrdersDetails,
} from "../../Actions/actionsSalesOrders";
import { GetAllCustomers } from "../../Actions/actionsCustomers";
import { GetAllProducts } from "../../Actions/actionsProducts";
import {
  GetAllSalesOrderItems,
  AddSalesOrderItemsDetails,
} from "../../Actions/actionsSalesOrderItems";
import { GetAllStockTransactions } from "../../Actions/actionsStockTransactions";
import { GetAllPurchaseOrders } from "../../Actions/actionsPurchaseOrders";
import { GetAllPurchaseOrderItems } from "../../Actions/actionsPurchaseOrderItems";

const SalesOrders = () => {
  const dispatch = useDispatch();

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOrderForView, setSelectedOrderForView] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newOrder, setNewOrder] = useState({
    SalesOrderID: "",
    CustomerID: "",
    OrderDate: new Date().toISOString().split("T")[0],
    OrderStatus: "Pending",
  });

  const [localItems, setLocalItems] = useState([]);
  const [newItem, setNewItem] = useState({
    ProductID: "",
    Quantity: "",
    UnitPrice: "", // This will be manually entered
  });

  // Add new state for editing quantities
  const [editingItemId, setEditingItemId] = useState(null);
  const [editQuantity, setEditQuantity] = useState("");

  // Searchable dropdown states
  const [customerSearch, setCustomerSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  // Real World Enterprise Application Color Theme
  const colors = {
    primaryDark: "#1e40af",
    primary: "#3b82f6",
    primaryLight: "#60a5fa",
    secondaryDark: "#059669",
    secondary: "#10b981",
    secondaryLight: "#34d399",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#06b6d4",
    dark: "#1f2937",
    grayDark: "#374151",
    gray: "#6b7280",
    grayLight: "#9ca3af",
    grayLighter: "#e5e7eb",
    light: "#f9fafb",
    white: "#ffffff",
    blue: "#3b82f6",
    green: "#10b981",
    red: "#ef4444",
    yellow: "#f59e0b",
    purple: "#8b5cf6",
    indigo: "#6366f1",
    shadowDark: "rgba(30, 64, 175, 0.2)",
    shadowLight: "rgba(16, 185, 129, 0.1)",
    highlight: "rgba(255, 255, 255, 0.9)",
  };

  // Redux states
  const salesOrdersState = useSelector(
    (state) => state.salesOrders,
    shallowEqual,
  );
  const customersState = useSelector((state) => state.customers, shallowEqual);
  const productsState = useSelector((state) => state.products, shallowEqual);
  const salesOrderItemsState = useSelector(
    (state) => state.salesOrderItems,
    shallowEqual,
  );
  const stockTransactionsState = useSelector(
    (state) => state.stockTransactions,
    shallowEqual,
  );
  const purchaseOrdersState = useSelector(
    (state) => state.purchaseOrders,
    shallowEqual,
  );
  const purchaseOrderItemsState = useSelector(
    (state) => state.purchaseOrderItems,
    shallowEqual,
  );

  const salesOrders = useMemo(
    () => salesOrdersState?.responseBody || salesOrdersState?.salesOrders || [],
    [salesOrdersState?.responseBody, salesOrdersState?.salesOrders],
  );

  const customers = useMemo(
    () => customersState?.customers || customersState?.responseBody || [],
    [customersState?.customers, customersState?.responseBody],
  );

  const products = useMemo(
    () => productsState?.responseBody || productsState?.products || [],
    [productsState?.responseBody, productsState?.products],
  );

  const salesOrderItems = useMemo(
    () =>
      salesOrderItemsState?.responseBody ||
      salesOrderItemsState?.salesOrderItems ||
      [],
    [salesOrderItemsState?.responseBody, salesOrderItemsState?.salesOrderItems],
  );

  const stockTransactions = useMemo(
    () =>
      stockTransactionsState?.responseBody ||
      stockTransactionsState?.stockTransactions ||
      [],
    [
      stockTransactionsState?.responseBody,
      stockTransactionsState?.stockTransactions,
    ],
  );

  const purchaseOrders = useMemo(
    () =>
      purchaseOrdersState?.responseBody ||
      purchaseOrdersState?.purchaseOrders ||
      [],
    [purchaseOrdersState?.responseBody, purchaseOrdersState?.purchaseOrders],
  );

  const purchaseOrderItems = useMemo(
    () =>
      purchaseOrderItemsState?.responseBody ||
      purchaseOrderItemsState?.purchaseOrderItems ||
      [],
    [
      purchaseOrderItemsState?.responseBody,
      purchaseOrderItemsState?.purchaseOrderItems,
    ],
  );

  const loading =
    salesOrdersState?.loading || salesOrderItemsState?.loading || false;

  // Format number with thousand separators
  const formatNumber = (number) => {
    if (number === null || number === undefined || number === "") return "0";
    const num = typeof number === "string" ? parseFloat(number) : number;
    if (isNaN(num)) return "0";

    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Format number without decimal places (for quantities)
  const formatInteger = (number) => {
    if (number === null || number === undefined || number === "") return "0";
    const num = typeof number === "string" ? parseInt(number) : number;
    if (isNaN(num)) return "0";

    return new Intl.NumberFormat("en-IN").format(num);
  };

  // Format date to show only date part (remove time) - FIXED
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Handle different date formats
    let date;
    if (dateString.includes("T")) {
      // ISO format with time
      date = new Date(dateString);
    } else if (dateString.includes("-")) {
      // YYYY-MM-DD format
      date = new Date(dateString);
    } else {
      // Try parsing as is
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      // If date is invalid, return original string
      return dateString;
    }

    // Format to YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Function to handle edit start
  const handleEditStart = (productId, currentQuantity) => {
    setEditingItemId(productId);
    setEditQuantity(currentQuantity.toString());
  };

  // Function to handle edit save
  const handleEditSave = (productId) => {
    if (!editQuantity || Number(editQuantity) <= 0) {
      setErrorMsg("❌ Quantity must be greater than 0");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    // Check stock availability for the new quantity
    if (!hasSufficientStock(productId, Number(editQuantity))) {
      const currentStock = getCurrentStock(productId);
      const productName =
        products.find((p) => String(p.ProductID) === String(productId))
          ?.ProductName || "Product";
      setErrorMsg(
        `❌ Insufficient stock! ${productName} has only ${currentStock} units available`,
      );
      setTimeout(() => setErrorMsg(""), 5000);
      return;
    }

    const updatedItems = localItems.map((item) =>
      String(item.ProductID) === String(productId)
        ? { ...item, Quantity: Number(editQuantity) }
        : item,
    );

    setLocalItems(updatedItems);
    setEditingItemId(null);
    setEditQuantity("");
  };

  // Function to handle edit cancel
  const handleEditCancel = () => {
    setEditingItemId(null);
    setEditQuantity("");
  };

  // Get current stock for a product (same logic as Overview page)
  const getCurrentStock = (productId) => {
    const productTransactions = stockTransactions.filter(
      (st) => String(st.ProductID || st.productId) === String(productId),
    );

    const stockInTransactions = productTransactions
      .filter((st) => (st.TransactionType || st.transactionType) === "IN")
      .reduce(
        (sum, st) =>
          sum + (parseInt(st.Quantity) || parseInt(st.quantity) || 0),
        0,
      );

    const stockOutTransactions = productTransactions
      .filter((st) => (st.TransactionType || st.transactionType) === "OUT")
      .reduce(
        (sum, st) =>
          sum + (parseInt(st.Quantity) || parseInt(st.quantity) || 0),
        0,
      );

    return Math.max(0, stockInTransactions - stockOutTransactions);
  };

  // Check if product has sufficient stock
  const hasSufficientStock = (productId, quantity) => {
    const currentStock = getCurrentStock(productId);
    return currentStock >= quantity;
  };

  // Get purchase price for a product - FROM PURCHASE ORDER ITEMS
  const getPurchasePrice = (productId) => {
    if (!productId) return 0;

    // First try to get from product data
    const product = products.find(
      (p) =>
        String(p.ProductID) === String(productId) ||
        String(p.productId) === String(productId),
    );

    if (product) {
      // Try different possible field names for purchase price in product data
      const productPurchasePrice =
        product.PurchasePrice ||
        product.PurchaseCost ||
        product.UnitCost ||
        product.CostPrice ||
        product.Cost;
      if (productPurchasePrice) return productPurchasePrice;
    }

    // If not found in product data, look in purchase order items
    const purchaseItems = purchaseOrderItems.filter(
      (item) => String(item.ProductID) === String(productId),
    );

    if (purchaseItems.length > 0) {
      // Get the most recent purchase price (assuming higher ItemID means more recent)
      const sortedItems = purchaseItems.sort(
        (a, b) => (Number(b.ItemID) || 0) - (Number(a.ItemID) || 0),
      );

      const mostRecentItem = sortedItems[0];
      if (mostRecentItem && mostRecentItem.UnitPrice) {
        return parseFloat(mostRecentItem.UnitPrice) || 0;
      }
    }

    return 0;
  };

  useEffect(() => {
    dispatch(GetAllSalesOrders());
    dispatch(GetAllCustomers());
    dispatch(GetAllProducts());
    dispatch(GetAllSalesOrderItems());
    dispatch(GetAllStockTransactions());
    dispatch(GetAllPurchaseOrders());
    dispatch(GetAllPurchaseOrderItems());
  }, [dispatch]);

  // Mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getNextOrderId = () => {
    if (!salesOrders || salesOrders.length === 0) return 1;
    const maxId = Math.max(
      ...salesOrders.map((o) => Number(o.SalesOrderID) || 0),
    );
    return maxId + 1;
  };

  const calculateTotalPrice = (quantity, unitPrice) => {
    const qty = Number(quantity) || 0;
    const price = Number(unitPrice) || 0;
    return qty * price;
  };

  const calculateOrderTotal = (items) => {
    if (!items || items.length === 0) return 0;
    const total = items.reduce((sum, item) => {
      return sum + (Number(item.Quantity) || 0) * (Number(item.UnitPrice) || 0);
    }, 0);
    return total;
  };

  // Filtered customers for dropdown
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      customer.CustomerName.toLowerCase().includes(
        customerSearch.toLowerCase(),
      ),
    );
  }, [customers, customerSearch]);

  // Filtered products for dropdown
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.ProductName.toLowerCase().includes(productSearch.toLowerCase()),
    );
  }, [products, productSearch]);

  const mergedOrders = useMemo(() => {
    const merged = salesOrders.map((order) => {
      const items = salesOrderItems
        .filter((i) => String(i.SalesOrderID) === String(order.SalesOrderID))
        .map((i) => {
          const product = products.find(
            (p) => String(p.ProductID) === String(i.ProductID),
          );
          return {
            ...i,
            productName: product ? product.ProductName : i.ProductID,
            totalPrice: calculateTotalPrice(i.Quantity, i.UnitPrice),
          };
        });
      return {
        ...order,
        items,
        orderTotal: calculateOrderTotal(items),
      };
    });

    return merged.sort((a, b) => {
      const idA = Number(a.SalesOrderID) || 0;
      const idB = Number(b.SalesOrderID) || 0;
      return idB - idA;
    });
  }, [salesOrders, salesOrderItems, products]);

  const filteredOrders = useMemo(() => {
    return mergedOrders.filter((order) => {
      const orderId = String(order.SalesOrderID || "");
      const customerName =
        customers.find((c) => String(c.CustomerID) === String(order.CustomerID))
          ?.CustomerName || "";

      const matchesSearch =
        orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customerName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.OrderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [mergedOrders, customers, searchTerm, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const selectedOrderDetails = useMemo(() => {
    if (!selectedOrderForView) return null;
    return mergedOrders.find(
      (order) => String(order.SalesOrderID) === String(selectedOrderForView),
    );
  }, [selectedOrderForView, mergedOrders]);

  // Handle customer selection
  const handleCustomerSelect = (customerId, customerName) => {
    setNewOrder({ ...newOrder, CustomerID: customerId });
    setCustomerSearch(customerName);
    setShowCustomerDropdown(false);
  };

  // Handle product selection - WITH purchase price and stock information
  const handleProductSelect = (productId) => {
    const selected = products.find(
      (p) => String(p.ProductID) === String(productId),
    );
    if (selected) {
      const purchasePrice = getPurchasePrice(productId);
      const currentStock = getCurrentStock(productId);

      setNewItem({
        ...newItem,
        ProductID: productId,
        Quantity: "", // Keep quantity empty
        UnitPrice: "", // Clear unit price - user must enter manually
      });
      setProductSearch(selected.ProductName);
      setShowProductDropdown(false);

      // Show purchase price and stock information
      setSuccessMsg(
        `✅ Selected: ${selected.ProductName} | Purchase Price: Rs.${formatNumber(purchasePrice)} | Stock: ${currentStock} units`,
      );
      setTimeout(() => setSuccessMsg(""), 5000);
    }
  };

  const handleAddLocalItem = (e) => {
    e.preventDefault();
    if (!newItem.ProductID || !newItem.Quantity || !newItem.UnitPrice) {
      setErrorMsg(
        "⚠️ Please select a product, enter quantity and unit sale price",
      );
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    const qty = Number(newItem.Quantity);
    const price = Number(newItem.UnitPrice) || 0;

    if (qty <= 0) {
      setErrorMsg("❌ Quantity must be greater than 0");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    if (price <= 0) {
      setErrorMsg("❌ Unit sale price must be greater than 0");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    // Check stock availability
    if (!hasSufficientStock(newItem.ProductID, qty)) {
      const currentStock = getCurrentStock(newItem.ProductID);
      const productName =
        products.find((p) => String(p.ProductID) === String(newItem.ProductID))
          ?.ProductName || "Product";
      setErrorMsg(
        `❌ Insufficient stock! ${productName} has only ${currentStock} units available`,
      );
      setTimeout(() => setErrorMsg(""), 5000);
      return;
    }

    const existingIndex = localItems.findIndex(
      (it) => String(it.ProductID) === String(newItem.ProductID),
    );
    if (existingIndex >= 0) {
      const updated = [...localItems];
      const newTotalQty = Number(updated[existingIndex].Quantity) + qty;

      // Check stock for updated quantity
      if (!hasSufficientStock(newItem.ProductID, newTotalQty)) {
        const currentStock = getCurrentStock(newItem.ProductID);
        const productName =
          products.find(
            (p) => String(p.ProductID) === String(newItem.ProductID),
          )?.ProductName || "Product";
        setErrorMsg(
          `❌ Insufficient stock! ${productName} has only ${currentStock} units available`,
        );
        setTimeout(() => setErrorMsg(""), 5000);
        return;
      }

      updated[existingIndex] = {
        ...updated[existingIndex],
        Quantity: newTotalQty,
        UnitPrice: price,
      };
      setLocalItems(updated);
    } else {
      setLocalItems([
        ...localItems,
        { ProductID: newItem.ProductID, Quantity: qty, UnitPrice: price },
      ]);
    }

    setNewItem({ ProductID: "", Quantity: "", UnitPrice: "" });
    setProductSearch("");
    setSuccessMsg("✅ Item added to order successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleRemoveLocalItem = (productId) => {
    setLocalItems(
      localItems.filter((it) => String(it.ProductID) !== String(productId)),
    );
    // If we're removing an item that's being edited, cancel editing
    if (editingItemId === productId) {
      handleEditCancel();
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    if (!newOrder.SalesOrderID || !newOrder.CustomerID || !newOrder.OrderDate) {
      setErrorMsg("⚠️ Please fill all required fields");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    if (!localItems || localItems.length === 0) {
      setErrorMsg("❌ Please add at least one item to the order");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    // Check stock for all items before creating order
    for (const item of localItems) {
      if (!hasSufficientStock(item.ProductID, item.Quantity)) {
        const currentStock = getCurrentStock(item.ProductID);
        const productName =
          products.find((p) => String(p.ProductID) === String(item.ProductID))
            ?.ProductName || "Product";
        setErrorMsg(
          `❌ Cannot create order! ${productName} has only ${currentStock} units available, but you ordered ${item.Quantity}`,
        );
        setTimeout(() => setErrorMsg(""), 5000);
        return;
      }
    }

    const orderToAdd = {
      SalesOrderID: newOrder.SalesOrderID,
      CustomerID: newOrder.CustomerID,
      OrderDate: newOrder.OrderDate,
      OrderStatus: newOrder.OrderStatus || "Pending",
    };

    try {
      await dispatch(AddSalesOrdersDetails(orderToAdd));

      const currentMaxItemId =
        salesOrderItems && salesOrderItems.length > 0
          ? Math.max(...salesOrderItems.map((i) => Number(i.ItemID) || 0))
          : 0;

      const addItemPromises = localItems.map((it, idx) => {
        const nextItemID = (currentMaxItemId + idx + 1).toString();
        const itemToAdd = {
          ItemID: nextItemID,
          SalesOrderID: orderToAdd.SalesOrderID,
          ProductID: it.ProductID,
          Quantity: String(it.Quantity),
          UnitPrice: String(it.UnitPrice),
          Status: "Active",
        };
        return dispatch(AddSalesOrderItemsDetails(itemToAdd));
      });

      await Promise.all(addItemPromises);
      dispatch(GetAllSalesOrders());
      dispatch(GetAllSalesOrderItems());
      dispatch(GetAllStockTransactions());

      setNewOrder({
        SalesOrderID: "",
        CustomerID: "",
        OrderDate: new Date().toISOString().split("T")[0],
        OrderStatus: "Pending",
      });
      setLocalItems([]);
      setShowAddForm(false);
      setCustomerSearch("");
      setProductSearch("");
      setEditingItemId(null);
      setEditQuantity("");

      setSuccessMsg("✅ Sales order created successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Add sales order error:", err);
      setErrorMsg("❌ Failed to create sales order");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  const handleViewOrder = (orderId) => {
    setSelectedOrderForView(orderId);
    setShowViewModal(true);
  };

  // 3D Industrial CSS Styles with Mobile Responsiveness
  const styles = {
    container: {
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
      padding: isMobile ? "16px" : "24px",
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
      padding: isMobile ? "24px 16px" : "32px",
      borderRadius: isMobile ? "12px" : "16px",
      marginBottom: isMobile ? "20px" : "28px",
      boxShadow: `0 8px 32px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
      position: "relative",
      overflow: "hidden",
    },
    headerContent: {
      position: "relative",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "12px" : "20px",
      flexDirection: isMobile ? "column" : "row",
      textAlign: isMobile ? "center" : "left",
    },
    pageTitle: {
      fontSize: isMobile ? "24px" : "36px",
      fontWeight: "800",
      color: colors.white,
      margin: 0,
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    },
    pageSubtitle: {
      fontSize: isMobile ? "14px" : "18px",
      color: colors.highlight,
      margin: isMobile ? "4px 0 0 0" : "6px 0 0 0",
      fontWeight: "500",
    },
    successMsg: {
      background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
      color: colors.white,
      padding: isMobile ? "14px 20px" : "18px 28px",
      borderRadius: isMobile ? "8px" : "12px",
      marginBottom: isMobile ? "20px" : "28px",
      textAlign: "center",
      fontWeight: "600",
      fontSize: isMobile ? "14px" : "16px",
      boxShadow: `0 4px 16px ${colors.shadowLight}`,
      border: `1px solid ${colors.highlight}`,
    },
    errorMsg: {
      background: `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`,
      color: colors.white,
      padding: isMobile ? "14px 20px" : "18px 28px",
      borderRadius: isMobile ? "8px" : "12px",
      marginBottom: isMobile ? "20px" : "28px",
      textAlign: "center",
      fontWeight: "600",
      fontSize: isMobile ? "14px" : "16px",
      boxShadow: `0 4px 16px rgba(239, 68, 68, 0.3)`,
      border: `1px solid ${colors.highlight}`,
    },
    controls: {
      display: "flex",
      gap: isMobile ? "16px" : "24px",
      alignItems: "center",
      marginBottom: isMobile ? "20px" : "28px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: isMobile ? "20px 16px" : "28px",
      borderRadius: isMobile ? "12px" : "16px",
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
      position: "relative",
      flexDirection: isMobile ? "column" : "row",
    },
    searchBox: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      flex: "1",
      maxWidth: "none",
      width: "100%",
    },
    searchInput: {
      padding: isMobile ? "14px 20px 14px 40px" : "18px 24px 18px 48px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? "8px" : "12px",
      fontSize: isMobile ? "16px" : "18px",
      width: "100%",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: "all 0.3s ease",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: "500",
    },
    searchIcon: {
      position: "absolute",
      left: isMobile ? "8px" : "16px",
      color: colors.primary,
      fontSize: isMobile ? "18px" : "20px",
    },
    filterSelect: {
      padding: isMobile ? "14px 16px" : "18px 24px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? "8px" : "12px",
      fontSize: isMobile ? "16px" : "18px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: "pointer",
      fontWeight: "600",
      minWidth: isMobile ? "140px" : "180px",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      transition: "all 0.3s ease",
      marginLeft: isMobile ? "0" : "auto",
      width: isMobile ? "100%" : "auto",
    },
    addButton: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      border: "none",
      borderRadius: isMobile ? "8px" : "12px",
      padding: isMobile ? "14px 20px" : "18px 32px",
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: `0 4px 16px ${colors.shadowDark}`,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      width: isMobile ? "100%" : "auto",
      justifyContent: "center",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: isMobile ? "10px" : "20px",
      backdropFilter: "blur(8px)",
    },
    modalContent: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: isMobile ? "12px" : "20px",
      boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
      width: "100%",
      maxWidth: isMobile ? "100%" : "1400px",
      maxHeight: isMobile ? "95vh" : "90vh",
      overflow: "auto",
      border: `2px solid ${colors.highlight}`,
      position: "relative",
    },
    modalHeader: {
      padding: isMobile ? "20px 16px" : "28px",
      borderBottom: `2px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: isMobile ? "20px" : "26px",
      fontWeight: "800",
      color: colors.white,
      margin: 0,
      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
    },
    closeButton: {
      background: "none",
      border: "none",
      color: colors.white,
      cursor: "pointer",
      padding: "10px",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalBody: {
      padding: isMobile ? "20px 16px" : "28px",
    },
    formGroup: {
      marginBottom: isMobile ? "16px" : "24px",
    },
    label: {
      display: "block",
      marginBottom: isMobile ? "8px" : "10px",
      fontWeight: "700",
      color: colors.dark,
      fontSize: isMobile ? "14px" : "16px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      padding: isMobile ? "12px 16px" : "16px 20px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? "8px" : "10px",
      fontSize: isMobile ? "14px" : "16px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: "500",
    },
    select: {
      width: "100%",
      padding: isMobile ? "12px 16px" : "16px 20px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? "8px" : "10px",
      fontSize: isMobile ? "14px" : "16px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: "pointer",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    dropdownContainer: {
      position: "relative",
      width: "100%",
    },
    dropdown: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: colors.white,
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? "8px" : "10px",
      maxHeight: "200px",
      overflowY: "auto",
      zIndex: 1000,
      boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
    },
    dropdownItem: {
      padding: isMobile ? "10px 12px" : "12px 16px",
      cursor: "pointer",
      borderBottom: `1px solid ${colors.grayLighter}`,
      transition: "all 0.2s ease",
      fontSize: isMobile ? "14px" : "16px",
    },
    itemCard: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "12px" : "16px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? "8px" : "10px",
      marginBottom: isMobile ? "8px" : "12px",
      backgroundColor: colors.light,
      transition: "all 0.3s ease",
    },
    itemGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr auto",
      gap: isMobile ? "8px" : "12px",
      marginTop: isMobile ? "12px" : "16px",
    },
    buttonGroup: {
      display: "flex",
      gap: isMobile ? "12px" : "16px",
      justifyContent: "flex-end",
      marginTop: isMobile ? "24px" : "32px",
      paddingTop: isMobile ? "16px" : "24px",
      borderTop: `2px solid ${colors.grayLighter}`,
      flexDirection: isMobile ? "column" : "row",
    },
    button: {
      padding: isMobile ? "12px 20px" : "16px 28px",
      border: "none",
      borderRadius: isMobile ? "8px" : "10px",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: `0 4px 16px ${colors.shadowDark}`,
      width: isMobile ? "100%" : "auto",
    },
    secondaryButton: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      border: `2px solid ${colors.grayLighter}`,
    },
    primaryButton: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
    },
    tableContainer: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: isMobile ? "12px" : "16px",
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      overflow: "hidden",
      border: `1px solid ${colors.highlight}`,
      position: "relative",
      overflowX: isMobile ? "auto" : "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: isMobile ? "600px" : "auto",
    },
    tableHeader: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
    },
    tableHeaderCell: {
      padding: isMobile ? "16px 12px" : "22px 20px",
      textAlign: "left",
      fontWeight: "800",
      fontSize: isMobile ? "12px" : "14px",
      borderBottom: `3px solid ${colors.secondary}`,
      color: colors.white,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    tableRow: {
      transition: "all 0.3s ease",
      borderBottom: `1px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
    },
    tableCell: {
      padding: isMobile ? "14px 12px" : "20px 20px",
      fontSize: isMobile ? "12px" : "14px",
      color: colors.dark,
      fontWeight: "500",
      wordWrap: "break-word",
    },
    actionButton: {
      padding: isMobile ? "8px 12px" : "10px 16px",
      border: "none",
      borderRadius: isMobile ? "6px" : "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
      color: colors.white,
      boxShadow: `0 2px 8px ${colors.shadowDark}`,
      margin: isMobile ? "0 2px" : "0 4px",
    },
    orderInfo: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
      gap: isMobile ? "12px" : "20px",
      marginBottom: isMobile ? "16px" : "24px",
      padding: isMobile ? "16px" : "20px",
      backgroundColor: colors.light,
      borderRadius: isMobile ? "8px" : "12px",
      border: `2px solid ${colors.grayLighter}`,
    },
    infoItem: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "6px" : "8px",
    },
    infoLabel: {
      fontSize: isMobile ? "12px" : "14px",
      color: colors.grayDark,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    infoValue: {
      fontSize: isMobile ? "16px" : "18px",
      color: colors.dark,
      fontWeight: "700",
    },
    sectionHeader: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "700",
      color: colors.primaryDark,
      marginBottom: isMobile ? "12px" : "16px",
      paddingBottom: isMobile ? "6px" : "8px",
      borderBottom: `2px solid ${colors.primaryLight}`,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    stockInfo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: isMobile ? "12px" : "14px",
      marginTop: "4px",
    },
    itemsTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: isMobile ? "12px" : "16px",
      minWidth: isMobile ? "500px" : "auto",
    },
    itemsTableHeader: {
      background: `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`,
    },
    itemsTableCell: {
      padding: isMobile ? "12px 8px" : "16px 12px",
      border: `1px solid ${colors.grayLighter}`,
      textAlign: "left",
      fontSize: isMobile ? "12px" : "14px",
    },
    wideFormContainer: {
      width: isMobile ? "100vw" : "95vw",
      maxWidth: isMobile ? "100%" : "1600px",
      margin: "0 auto",
    },
    priceInfo: {
      fontSize: isMobile ? "12px" : "14px",
      color: colors.gray,
      marginTop: isMobile ? "6px" : "8px",
      fontWeight: "600",
    },
    productInfoCard: {
      marginTop: isMobile ? "8px" : "12px",
      padding: isMobile ? "12px" : "16px",
      backgroundColor: colors.info + "20",
      border: `2px solid ${colors.info}30`,
      borderRadius: isMobile ? "8px" : "10px",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "600",
    },
    largeText: {
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "700",
    },
    mobileCard: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "12px",
      boxShadow: `0 4px 12px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
    },
    mobileCardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
      paddingBottom: "8px",
      borderBottom: `2px solid ${colors.primaryLight}`,
    },
    mobileCardTitle: {
      fontSize: "16px",
      fontWeight: "700",
      color: colors.primaryDark,
      margin: 0,
    },
    mobileCardContent: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    mobileCardRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4px 0",
    },
    mobileCardLabel: {
      fontSize: "12px",
      color: colors.grayDark,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    mobileCardValue: {
      fontSize: "14px",
      fontWeight: "700",
      color: colors.dark,
    },
    // Pagination Styles
    paginationContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "16px" : "20px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderTop: `2px solid ${colors.grayLighter}`,
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "16px" : "0",
    },
    paginationInfo: {
      fontSize: isMobile ? "12px" : "14px",
      color: colors.grayDark,
      fontWeight: "600",
    },
    paginationControls: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "8px" : "12px",
    },
    pageButton: {
      padding: isMobile ? "8px 12px" : "10px 16px",
      border: `2px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.dark,
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: isMobile ? "12px" : "14px",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: isMobile ? "32px" : "40px",
    },
    activePageButton: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      borderColor: colors.primary,
    },
    pageSizeSelect: {
      padding: isMobile ? "8px 12px" : "10px 16px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "6px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.dark,
      fontWeight: "600",
      fontSize: isMobile ? "12px" : "14px",
      cursor: "pointer",
    },
  };

  // Mobile card view for orders
  const MobileOrderCard = ({ order }) => {
    const customerName =
      customers.find((c) => String(c.CustomerID) === String(order.CustomerID))
        ?.CustomerName || order.CustomerID;

    return (
      <div style={styles.mobileCard}>
        <div style={styles.mobileCardHeader}>
          <h3 style={styles.mobileCardTitle}>Order #{order.SalesOrderID}</h3>
          <button
            style={styles.actionButton}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
            }}
            onClick={() => handleViewOrder(order.SalesOrderID)}
            title="View order details"
          >
            <Eye size={14} />
          </button>
        </div>
        <div style={styles.mobileCardContent}>
          <div style={styles.mobileCardRow}>
            <span style={styles.mobileCardLabel}>Customer:</span>
            <span style={styles.mobileCardValue}>{customerName}</span>
          </div>
          <div style={styles.mobileCardRow}>
            <span style={styles.mobileCardLabel}>Date:</span>
            <span style={styles.mobileCardValue}>
              {formatDate(order.OrderDate)}
            </span>
          </div>
          <div style={styles.mobileCardRow}>
            <span style={styles.mobileCardLabel}>Total:</span>
            <span
              style={{ ...styles.mobileCardValue, color: colors.secondary }}
            >
              Rs. {formatNumber(order.orderTotal || 0)}
            </span>
          </div>
          <div style={styles.mobileCardRow}>
            <span style={styles.mobileCardLabel}>Items:</span>
            <span style={styles.mobileCardValue}>
              {order.items ? order.items.length : 0} items
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Pagination Component
  const Pagination = () => {
    const pageNumbers = [];
    const maxPageButtons = isMobile ? 3 : 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div style={styles.paginationContainer}>
        <div style={styles.paginationInfo}>
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length}{" "}
          orders
        </div>

        <div style={styles.paginationControls}>
          {/* Items per page selector */}
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            style={styles.pageSizeSelect}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>

          {/* First Page Button */}
          <button
            style={styles.pageButton}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            onMouseOver={(e) => {
              if (currentPage !== 1) {
                e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                e.target.style.color = colors.white;
              }
            }}
            onMouseOut={(e) => {
              if (currentPage !== 1) {
                e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                e.target.style.color = colors.dark;
              }
            }}
          >
            <ChevronsLeft size={16} />
          </button>

          {/* Previous Page Button */}
          <button
            style={styles.pageButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            onMouseOver={(e) => {
              if (currentPage !== 1) {
                e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                e.target.style.color = colors.white;
              }
            }}
            onMouseOut={(e) => {
              if (currentPage !== 1) {
                e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                e.target.style.color = colors.dark;
              }
            }}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((number) => (
            <button
              key={number}
              style={{
                ...styles.pageButton,
                ...(number === currentPage ? styles.activePageButton : {}),
              }}
              onClick={() => handlePageChange(number)}
              onMouseOver={(e) => {
                if (number !== currentPage) {
                  e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                  e.target.style.color = colors.white;
                }
              }}
              onMouseOut={(e) => {
                if (number !== currentPage) {
                  e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                  e.target.style.color = colors.dark;
                }
              }}
            >
              {number}
            </button>
          ))}

          {/* Next Page Button */}
          <button
            style={styles.pageButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            onMouseOver={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                e.target.style.color = colors.white;
              }
            }}
            onMouseOut={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                e.target.style.color = colors.dark;
              }
            }}
          >
            <ChevronRight size={16} />
          </button>

          {/* Last Page Button */}
          <button
            style={styles.pageButton}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            onMouseOver={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                e.target.style.color = colors.white;
              }
            }}
            onMouseOut={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                e.target.style.color = colors.dark;
              }
            }}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <FileText size={isMobile ? 36 : 52} color={colors.white} />
          <div>
            <h1 style={styles.pageTitle}>SALES ORDERS MANAGEMENT</h1>
            <p style={styles.pageSubtitle}>
              Manage sales orders and customer transactions across the system
            </p>
          </div>
        </div>
      </div>

      {/* Success/Error Message */}
      {successMsg && <div style={styles.successMsg}>{successMsg}</div>}
      {errorMsg && <div style={styles.errorMsg}>{errorMsg}</div>}

      {/* Controls - Search, Filter and Add button */}
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search orders by ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            onFocus={(e) => {
              e.target.style.borderColor = colors.primary;
              e.target.style.boxShadow = `inset 0 2px 8px ${colors.shadowLight}, 0 0 0 3px ${colors.shadowLight}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.grayLighter;
              e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
            }}
          />
        </div>

        {/* <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.filterSelect}
          onFocus={(e) => {
            e.target.style.borderColor = colors.primary;
            e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = colors.grayLighter;
            e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
          }}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select> */}

        <button
          style={styles.addButton}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px) scale(1.02)";
            e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
            e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
            e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
          }}
          onClick={() => {
            setNewOrder({
              SalesOrderID: getNextOrderId(),
              CustomerID: "",
              OrderDate: new Date().toISOString().split("T")[0],
              OrderStatus: "Pending",
            });
            setLocalItems([]);
            setNewItem({ ProductID: "", Quantity: "", UnitPrice: "" });
            setShowAddForm(true);
            setCustomerSearch("");
            setProductSearch("");
            setErrorMsg("");
            setSuccessMsg("");
            setEditingItemId(null);
            setEditQuantity("");
          }}
        >
          <Plus size={isMobile ? 20 : 24} /> CREATE SALES ORDER
        </button>
      </div>

      {/* Sales Orders Table - Mobile Card View */}
      {isMobile ? (
        <div>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: colors.primary,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    border: "3px solid #f0fdf4",
                    borderTop: "3px solid #10b981",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
                <span style={{ fontWeight: "600", fontSize: "16px" }}>
                  Loading sales orders...
                </span>
              </div>
            </div>
          ) : currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <MobileOrderCard key={order.SalesOrderID} order={order} />
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: colors.gray,
                backgroundColor: colors.light,
                borderRadius: "12px",
                marginBottom: "16px",
                border: `2px dashed ${colors.grayLighter}`,
              }}
            >
              <FileText
                size={48}
                style={{ marginBottom: "12px", opacity: 0.5 }}
              />
              <p
                style={{
                  fontSize: "18px",
                  margin: 0,
                  fontWeight: "700",
                  color: colors.grayDark,
                }}
              >
                No sales orders found
              </p>
              <p style={{ fontSize: "14px", margin: "8px 0 0 0" }}>
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
          {/* Pagination for Mobile */}
          {filteredOrders.length > 0 && <Pagination />}
        </div>
      ) : (
        /* Desktop Table View */
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={{ ...styles.tableHeaderCell, width: "20%" }}>
                  Order ID
                </th>
                <th style={{ ...styles.tableHeaderCell, width: "30%" }}>
                  Customer
                </th>
                <th style={{ ...styles.tableHeaderCell, width: "20%" }}>
                  Order Date
                </th>
                <th
                  style={{
                    ...styles.tableHeaderCell,
                    width: "20%",
                    textAlign: "right",
                  }}
                >
                  Total Amount Rs.{" "}
                </th>
                <th
                  style={{
                    ...styles.tableHeaderCell,
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      ...styles.tableCell,
                      textAlign: "center",
                      padding: "60px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "3px solid #f0fdf4",
                          borderTop: "3px solid #10b981",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
                      <span
                        style={{
                          fontWeight: "600",
                          color: colors.primary,
                          fontSize: "18px",
                        }}
                      >
                        Loading sales orders...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : currentOrders.length > 0 ? (
                currentOrders.map((order) => {
                  const customerName =
                    customers.find(
                      (c) => String(c.CustomerID) === String(order.CustomerID),
                    )?.CustomerName || order.CustomerID;
                  return (
                    <tr
                      key={order.SalesOrderID}
                      style={styles.tableRow}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`;
                        e.currentTarget.style.transform = "scale(1.01)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <td
                        style={{
                          ...styles.tableCell,
                          fontWeight: "700",
                          color: colors.primaryDark,
                        }}
                      >
                        #{order.SalesOrderID}
                      </td>
                      <td style={styles.tableCell}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <User size={18} color={colors.primary} />
                          {customerName}
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        {formatDate(order.OrderDate)}
                      </td>
                      <td
                        style={{
                          ...styles.tableCell,
                          textAlign: "right",
                          fontWeight: "700",
                          color: colors.secondary,
                        }}
                      >
                        Rs. {formatNumber(order.orderTotal || 0)}
                      </td>
                      <td style={{ ...styles.tableCell, textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                        >
                          <button
                            style={styles.actionButton}
                            onMouseOver={(e) => {
                              e.target.style.transform = "scale(1.1)";
                              e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
                              e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = "scale(1)";
                              e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                              e.target.style.boxShadow = `0 2px 8px ${colors.shadowDark}`;
                            }}
                            onClick={() => handleViewOrder(order.SalesOrderID)}
                            title="View order details"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      ...styles.tableCell,
                      textAlign: "center",
                      padding: "60px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                        color: colors.gray,
                      }}
                    >
                      <FileText size={72} color={colors.grayLight} />
                      <p
                        style={{
                          fontSize: "20px",
                          margin: 0,
                          fontWeight: "700",
                          color: colors.grayDark,
                        }}
                      >
                        No sales orders found
                      </p>
                      <p style={{ fontSize: "16px", margin: 0 }}>
                        Try adjusting your search criteria or filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination for Desktop */}
          {filteredOrders.length > 0 && <Pagination />}
        </div>
      )}

      {/* Create Order Modal */}
      {showAddForm && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, ...styles.wideFormContainer }}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>CREATE SALES ORDER</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowAddForm(false);
                  setErrorMsg("");
                  setEditingItemId(null);
                  setEditQuantity("");
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <X size={28} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <form onSubmit={handleAddOrder}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "16px" : "20px",
                    marginBottom: isMobile ? "20px" : "24px",
                  }}
                >
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Order ID</label>
                    <input
                      type="text"
                      value={newOrder.SalesOrderID}
                      disabled
                      style={{
                        ...styles.input,
                        backgroundColor: colors.grayLighter,
                        color: colors.grayDark,
                        cursor: "not-allowed",
                      }}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Order Date *</label>
                    <input
                      type="date"
                      value={newOrder.OrderDate}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, OrderDate: e.target.value })
                      }
                      required
                      style={styles.input}
                      onFocus={(e) => {
                        e.target.style.borderColor = colors.primary;
                        e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = colors.grayLighter;
                        e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                      }}
                    />
                  </div>
                </div>

                {/* Searchable Customer Dropdown */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Customer *</label>
                  <div style={styles.dropdownContainer}>
                    <input
                      type="text"
                      placeholder="Type to search customers..."
                      value={customerSearch}
                      onChange={(e) => {
                        setCustomerSearch(e.target.value);
                        setShowCustomerDropdown(true);
                      }}
                      onFocus={() => setShowCustomerDropdown(true)}
                      style={{
                        ...styles.input,
                        padding: isMobile ? "10px 14px" : "12px 16px",
                        borderColor: !newOrder.CustomerID
                          ? colors.error
                          : colors.grayLighter,
                      }}
                      onBlur={() =>
                        setTimeout(() => setShowCustomerDropdown(false), 200)
                      }
                    />

                    {/* Customer Validation Message */}
                    {!newOrder.CustomerID && (
                      <div
                        style={{
                          color: colors.error,
                          fontSize: isMobile ? "12px" : "14px",
                          fontWeight: "600",
                          marginTop: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <AlertTriangle size={isMobile ? 14 : 16} />
                        Please select a customer to continue
                      </div>
                    )}

                    {showCustomerDropdown && filteredCustomers.length > 0 && (
                      <div style={styles.dropdown}>
                        {filteredCustomers.map((customer) => (
                          <div
                            key={customer.CustomerID}
                            style={styles.dropdownItem}
                            onMouseOver={(e) =>
                              (e.target.style.backgroundColor = colors.light)
                            }
                            onMouseOut={(e) =>
                              (e.target.style.backgroundColor = colors.white)
                            }
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleCustomerSelect(
                                customer.CustomerID,
                                customer.CustomerName,
                              );
                            }}
                          >
                            {customer.CustomerName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Items Section */}
                <div style={styles.formGroup}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "8px" : "0",
                      alignItems: isMobile ? "flex-start" : "center", // ← ONLY ONE alignItems
                    }}
                  >
                    <label style={styles.label}>Order Items *</label>
                    <div
                      style={{
                        fontSize: isMobile ? "12px" : "14px",
                        color: colors.gray,
                        fontStyle: "italic",
                      }}
                    >
                      Add items to create the order
                    </div>
                  </div>

                  {/* Search Products Section */}
                  <div
                    style={{
                      marginBottom: "24px",
                      padding: isMobile ? "16px" : "20px",
                      backgroundColor: colors.light,
                      borderRadius: "10px",
                      border: `2px solid ${colors.grayLighter}`,
                    }}
                  >
                    <h4 style={styles.sectionHeader}>Search & Add Products</h4>
                    <div style={styles.itemGrid}>
                      <div style={styles.dropdownContainer}>
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={productSearch}
                          onChange={(e) => {
                            setProductSearch(e.target.value);
                            setShowProductDropdown(true);
                          }}
                          onFocus={() => setShowProductDropdown(true)}
                          style={{
                            ...styles.input,
                            padding: isMobile ? "10px 14px" : "12px 16px",
                          }}
                          onBlur={() =>
                            setTimeout(() => setShowProductDropdown(false), 200)
                          }
                        />
                        {showProductDropdown && filteredProducts.length > 0 && (
                          <div style={styles.dropdown}>
                            {filteredProducts.map((product) => {
                              const purchasePrice = getPurchasePrice(
                                product.ProductID,
                              );
                              const currentStock = getCurrentStock(
                                product.ProductID,
                              );
                              return (
                                <div
                                  key={product.ProductID}
                                  style={styles.dropdownItem}
                                  onMouseOver={(e) =>
                                    (e.target.style.backgroundColor =
                                      colors.light)
                                  }
                                  onMouseOut={(e) =>
                                    (e.target.style.backgroundColor =
                                      colors.white)
                                  }
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleProductSelect(product.ProductID);
                                  }}
                                >
                                  <div
                                    style={{
                                      fontWeight: "600",
                                      fontSize: isMobile ? "12px" : "14px",
                                    }}
                                  >
                                    {product.ProductName}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: isMobile ? "11px" : "13px",
                                      color: colors.gray,
                                      fontWeight: "600",
                                      marginTop: "4px",
                                    }}
                                  >
                                    Purchase Price: Rs.
                                    {formatNumber(purchasePrice)} | Stock:{" "}
                                    {currentStock} units
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <input
                        type="number"
                        value={newItem.Quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            value === "" ||
                            (Number(value) > 0 && Number(value) <= 10000)
                          ) {
                            setNewItem({ ...newItem, Quantity: value });
                          }
                        }}
                        placeholder="Quantity"
                        min="1"
                        max="10000"
                        style={{
                          ...styles.input,
                          padding: isMobile ? "10px 14px" : "12px 16px",
                          fontSize: isMobile ? "12px" : "14px",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                      />

                      {/* MANUAL UNIT PRICE INPUT - EDITABLE */}
                      <input
                        type="number"
                        value={newItem.UnitPrice}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            value === "" ||
                            (Number(value) >= 0 && Number(value) <= 1000000)
                          ) {
                            setNewItem({ ...newItem, UnitPrice: value });
                          }
                        }}
                        placeholder="Enter Sale Price *"
                        min="0"
                        max="1000000"
                        step="0.01"
                        style={{
                          ...styles.input,
                          padding: isMobile ? "10px 14px" : "12px 16px",
                          fontWeight: "600",
                          fontSize: isMobile ? "12px" : "14px",
                          color: newItem.UnitPrice
                            ? colors.secondary
                            : colors.gray,
                          borderColor: newItem.UnitPrice
                            ? colors.secondary
                            : colors.grayLighter,
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = newItem.UnitPrice
                            ? colors.secondary
                            : colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                      />

                      <button
                        type="button"
                        style={{
                          ...styles.button,
                          ...styles.primaryButton,
                          padding: isMobile ? "10px 14px" : "12px 16px",
                          fontSize: isMobile ? "12px" : "14px",
                          opacity:
                            !newItem.ProductID ||
                            !newItem.Quantity ||
                            !newItem.UnitPrice
                              ? 0.6
                              : 1,
                          width: isMobile ? "100%" : "auto",
                        }}
                        onMouseOver={(e) => {
                          if (
                            newItem.ProductID &&
                            newItem.Quantity &&
                            newItem.UnitPrice
                          ) {
                            e.target.style.transform = "translateY(-2px)";
                          }
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                        }}
                        onClick={handleAddLocalItem}
                        disabled={
                          !newItem.ProductID ||
                          !newItem.Quantity ||
                          !newItem.UnitPrice
                        }
                      >
                        Add Item
                      </button>
                    </div>

                    {/* Product Information when selected */}
                    {newItem.ProductID && (
                      <div style={styles.productInfoCard}>
                        <div
                          style={{
                            fontWeight: "600",
                            marginBottom: "8px",
                            fontSize: isMobile ? "13px" : "15px",
                          }}
                        >
                          Selected Product:{" "}
                          {
                            products.find(
                              (p) =>
                                String(p.ProductID) ===
                                String(newItem.ProductID),
                            )?.ProductName
                          }
                        </div>
                        <div
                          style={{
                            color: colors.grayDark,
                            fontSize: isMobile ? "12px" : "14px",
                            fontWeight: "600",
                          }}
                        >
                          Purchase Price: Rs.
                          {formatNumber(getPurchasePrice(newItem.ProductID))} |
                          Current Stock: {getCurrentStock(newItem.ProductID)}{" "}
                          units
                        </div>
                      </div>
                    )}

                    {/* Stock validation message */}
                    {newItem.ProductID && newItem.Quantity && (
                      <div style={styles.stockInfo}>
                        {hasSufficientStock(
                          newItem.ProductID,
                          Number(newItem.Quantity),
                        ) ? (
                          <div
                            style={{
                              color: colors.success,
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: isMobile ? "12px" : "14px",
                              fontWeight: "600",
                            }}
                          >
                            <div
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: colors.success,
                              }}
                            ></div>
                            Sufficient stock available (
                            {getCurrentStock(newItem.ProductID)} units)
                          </div>
                        ) : (
                          <div
                            style={{
                              color: colors.error,
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: isMobile ? "12px" : "14px",
                              fontWeight: "600",
                            }}
                          >
                            <AlertTriangle size={isMobile ? 14 : 16} />
                            Insufficient stock! Only{" "}
                            {getCurrentStock(newItem.ProductID)} units available
                          </div>
                        )}
                      </div>
                    )}

                    {/* Price Help Text */}
                    <div
                      style={{
                        marginTop: "12px",
                        padding: isMobile ? "10px 12px" : "12px 16px",
                        backgroundColor: colors.warning + "20",
                        border: `1px solid ${colors.warning}30`,
                        borderRadius: "8px",
                        fontSize: isMobile ? "11px" : "13px",
                        color: colors.dark,
                        fontWeight: "600",
                      }}
                    >
                      <strong>💡 Manual Price Entry:</strong> You must manually
                      enter the sale price for each product. The purchase price
                      is shown for reference only.
                    </div>
                  </div>

                  {/* Current Order Items in Table Format with Edit Functionality */}
                  {localItems.length > 0 ? (
                    <div style={{ marginBottom: "16px" }}>
                      <h4 style={styles.sectionHeader}>
                        Current Order Items ({localItems.length})
                      </h4>
                      <div style={styles.tableContainer}>
                        <table style={styles.itemsTable}>
                          <thead style={styles.itemsTableHeader}>
                            <tr>
                              <th
                                style={{
                                  ...styles.tableHeaderCell,
                                  width: isMobile ? "30%" : "30%",
                                }}
                              >
                                Product Name
                              </th>
                              <th
                                style={{
                                  ...styles.tableHeaderCell,
                                  width: isMobile ? "15%" : "15%",
                                  textAlign: "center",
                                }}
                              >
                                Quantity
                              </th>
                              <th
                                style={{
                                  ...styles.tableHeaderCell,
                                  width: isMobile ? "20%" : "20%",
                                  textAlign: "right",
                                }}
                              >
                                Unit Price
                              </th>
                              <th
                                style={{
                                  ...styles.tableHeaderCell,
                                  width: isMobile ? "20%" : "20%",
                                  textAlign: "right",
                                }}
                              >
                                Total Price
                              </th>
                              <th
                                style={{
                                  ...styles.tableHeaderCell,
                                  width: isMobile ? "15%" : "15%",
                                  textAlign: "center",
                                }}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {localItems.map((it) => {
                              const productName =
                                products.find(
                                  (p) =>
                                    String(p.ProductID) ===
                                    String(it.ProductID),
                                )?.ProductName || it.ProductID;
                              const totalPrice = calculateTotalPrice(
                                it.Quantity,
                                it.UnitPrice,
                              );
                              const currentStock = getCurrentStock(
                                it.ProductID,
                              );
                              const hasStock = hasSufficientStock(
                                it.ProductID,
                                it.Quantity,
                              );
                              const purchasePrice = getPurchasePrice(
                                it.ProductID,
                              );
                              const isEditing = editingItemId === it.ProductID;

                              return (
                                <tr
                                  key={it.ProductID}
                                  style={{
                                    ...styles.tableRow,
                                    borderColor: hasStock
                                      ? colors.grayLighter
                                      : colors.error,
                                  }}
                                >
                                  <td style={styles.tableCell}>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: isMobile ? "8px" : "12px",
                                      }}
                                    >
                                      <Package
                                        size={isMobile ? 14 : 16}
                                        color={colors.primary}
                                      />
                                      <span
                                        style={{
                                          fontWeight: "600",
                                          fontSize: isMobile ? "12px" : "14px",
                                        }}
                                      >
                                        {productName}
                                      </span>
                                    </div>
                                    <div style={styles.priceInfo}>
                                      Purchase Price: Rs.
                                      {formatNumber(purchasePrice)} | Stock:{" "}
                                      {currentStock} units
                                    </div>
                                    {!hasStock && (
                                      <div
                                        style={{
                                          ...styles.stockInfo,
                                          color: colors.error,
                                          marginTop: "8px",
                                          fontSize: isMobile ? "11px" : "13px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        <AlertTriangle
                                          size={isMobile ? 12 : 14}
                                        />
                                        Warning: Only {currentStock} units in
                                        stock!
                                      </div>
                                    )}
                                  </td>
                                  <td
                                    style={{
                                      ...styles.tableCell,
                                      textAlign: "center",
                                      fontWeight: "600",
                                      fontSize: isMobile ? "12px" : "14px",
                                    }}
                                  >
                                    {isEditing ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "4px",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <input
                                          type="number"
                                          value={editQuantity}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            if (
                                              value === "" ||
                                              (Number(value) > 0 &&
                                                Number(value) <= 10000)
                                            ) {
                                              setEditQuantity(value);
                                            }
                                          }}
                                          min="1"
                                          max="10000"
                                          style={{
                                            width: isMobile ? "50px" : "60px",
                                            padding: "4px 6px",
                                            border: `2px solid ${colors.primary}`,
                                            borderRadius: "4px",
                                            fontSize: isMobile
                                              ? "11px"
                                              : "12px",
                                            textAlign: "center",
                                            fontWeight: "600",
                                          }}
                                          autoFocus
                                          onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                              handleEditSave(it.ProductID);
                                            }
                                            if (e.key === "Escape") {
                                              handleEditCancel();
                                            }
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "4px",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <span>
                                          {formatInteger(it.Quantity)}
                                        </span>
                                      </div>
                                    )}
                                  </td>
                                  <td
                                    style={{
                                      ...styles.tableCell,
                                      textAlign: "right",
                                      fontWeight: "700",
                                      fontSize: isMobile ? "12px" : "14px",
                                    }}
                                  >
                                    Rs. {formatNumber(it.UnitPrice)}
                                  </td>
                                  <td
                                    style={{
                                      ...styles.tableCell,
                                      textAlign: "right",
                                      fontWeight: "800",
                                      color: colors.secondary,
                                      fontSize: isMobile ? "13px" : "15px",
                                    }}
                                  >
                                    Rs. {formatNumber(totalPrice)}
                                  </td>
                                  <td
                                    style={{
                                      ...styles.tableCell,
                                      textAlign: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: isMobile ? "2px" : "4px",
                                      }}
                                    >
                                      {isEditing ? (
                                        <>
                                          <button
                                            type="button"
                                            style={{
                                              ...styles.actionButton,
                                              background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.secondaryDark} 100%)`,
                                              padding: isMobile
                                                ? "4px 6px"
                                                : "5px 7px",
                                            }}
                                            onMouseOver={(e) => {
                                              e.target.style.transform =
                                                "scale(1.1)";
                                              e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, #059669 100%)`;
                                            }}
                                            onMouseOut={(e) => {
                                              e.target.style.transform =
                                                "scale(1)";
                                              e.target.style.background = `linear-gradient(135deg, ${colors.success} 0%, ${colors.secondaryDark} 100%)`;
                                            }}
                                            onClick={() =>
                                              handleEditSave(it.ProductID)
                                            }
                                            title="Save quantity"
                                          >
                                            <Check size={isMobile ? 10 : 11} />
                                          </button>
                                          <button
                                            type="button"
                                            style={{
                                              ...styles.actionButton,
                                              background: `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
                                              padding: isMobile
                                                ? "4px 6px"
                                                : "5px 7px",
                                            }}
                                            onMouseOver={(e) => {
                                              e.target.style.transform =
                                                "scale(1.1)";
                                              e.target.style.background = `linear-gradient(135deg, #f59e0b 0%, #b45309 100%)`;
                                            }}
                                            onMouseOut={(e) => {
                                              e.target.style.transform =
                                                "scale(1)";
                                              e.target.style.background = `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`;
                                            }}
                                            onClick={handleEditCancel}
                                            title="Cancel edit"
                                          >
                                            <XIcon size={isMobile ? 10 : 11} />
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <button
                                            type="button"
                                            style={{
                                              ...styles.actionButton,
                                              background: `linear-gradient(135deg, ${colors.info} 0%, #0369a1 100%)`,
                                              padding: isMobile
                                                ? "4px 6px"
                                                : "5px 7px",
                                            }}
                                            onMouseOver={(e) => {
                                              e.target.style.transform =
                                                "scale(1.1)";
                                              e.target.style.background = `linear-gradient(135deg, #0ea5e9 0%, #075985 100%)`;
                                            }}
                                            onMouseOut={(e) => {
                                              e.target.style.transform =
                                                "scale(1)";
                                              e.target.style.background = `linear-gradient(135deg, ${colors.info} 0%, #0369a1 100%)`;
                                            }}
                                            onClick={() =>
                                              handleEditStart(
                                                it.ProductID,
                                                it.Quantity,
                                              )
                                            }
                                            title="Edit quantity"
                                          >
                                            <Edit size={isMobile ? 10 : 11} />
                                          </button>
                                          <button
                                            type="button"
                                            style={{
                                              ...styles.actionButton,
                                              background: `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`,
                                              padding: isMobile
                                                ? "4px 6px"
                                                : "5px 7px",
                                            }}
                                            onMouseOver={(e) => {
                                              e.target.style.transform =
                                                "scale(1.1)";
                                              e.target.style.background = `linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)`;
                                            }}
                                            onMouseOut={(e) => {
                                              e.target.style.transform =
                                                "scale(1)";
                                              e.target.style.background = `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`;
                                            }}
                                            onClick={() =>
                                              handleRemoveLocalItem(
                                                it.ProductID,
                                              )
                                            }
                                            title="Remove item"
                                          >
                                            <X size={isMobile ? 10 : 11} />
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                            {/* Total Row */}
                            <tr
                              style={{
                                ...styles.tableRow,
                                background: colors.light,
                              }}
                            >
                              <td
                                colSpan={isMobile ? 2 : 3}
                                style={{
                                  ...styles.tableCell,
                                  textAlign: "right",
                                  fontWeight: "700",
                                  fontSize: isMobile ? "13px" : "15px",
                                }}
                              >
                                Order Total:
                              </td>
                              <td
                                style={{
                                  ...styles.tableCell,
                                  textAlign: "right",
                                  fontWeight: "800",
                                  color: colors.secondary,
                                  fontSize: isMobile ? "14px" : "16px",
                                }}
                              >
                                Rs.{" "}
                                {formatNumber(calculateOrderTotal(localItems))}
                              </td>
                              <td style={styles.tableCell}></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        padding: isMobile ? "24px" : "32px",
                        color: colors.gray,
                        backgroundColor: colors.light,
                        borderRadius: "10px",
                        marginBottom: "16px",
                        border: `2px dashed ${colors.grayLighter}`,
                      }}
                    >
                      <Package
                        size={isMobile ? 24 : 32}
                        style={{ marginBottom: "12px", opacity: 0.5 }}
                      />
                      <div
                        style={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "600",
                        }}
                      >
                        No items added yet
                      </div>
                      <div
                        style={{
                          fontSize: isMobile ? "12px" : "14px",
                          marginTop: "4px",
                        }}
                      >
                        Search and add products above
                      </div>
                    </div>
                  )}
                </div>

                <div style={styles.buttonGroup}>
                  <button
                    type="button"
                    style={{
                      ...styles.button,
                      ...styles.secondaryButton,
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`;
                      e.target.style.color = colors.white;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                      e.target.style.color = colors.grayDark;
                    }}
                    onClick={() => {
                      setShowAddForm(false);
                      setErrorMsg("");
                      setEditingItemId(null);
                      setEditQuantity("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      ...styles.button,
                      ...styles.primaryButton,
                      opacity:
                        localItems.length === 0 || !newOrder.CustomerID
                          ? 0.6
                          : 1,
                    }}
                    onMouseOver={(e) => {
                      if (localItems.length > 0 && newOrder.CustomerID) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
                      }
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
                    }}
                    disabled={localItems.length === 0 || !newOrder.CustomerID}
                  >
                    Create Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {showViewModal && selectedOrderDetails && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, ...styles.wideFormContainer }}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                VIEW SALES ORDER #{selectedOrderDetails.SalesOrderID}
              </h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedOrderForView(null);
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <X size={28} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.orderInfo}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Customer</span>
                  <span style={styles.infoValue}>
                    {
                      customers.find(
                        (c) =>
                          String(c.CustomerID) ===
                          String(selectedOrderDetails.CustomerID),
                      )?.CustomerName
                    }
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Order Date</span>
                  <span style={styles.infoValue}>
                    {formatDate(selectedOrderDetails.OrderDate)}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Total Amount</span>
                  <span
                    style={{ ...styles.infoValue, color: colors.secondary }}
                  >
                    Rs. {formatNumber(selectedOrderDetails.orderTotal || 0)}
                  </span>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Order Items</label>
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                      <tr>
                        <th style={{ ...styles.tableHeaderCell, width: "40%" }}>
                          Item Name
                        </th>
                        <th
                          style={{
                            ...styles.tableHeaderCell,
                            width: "15%",
                            textAlign: "right",
                          }}
                        >
                          Qty
                        </th>
                        <th
                          style={{
                            ...styles.tableHeaderCell,
                            width: "20%",
                            textAlign: "right",
                          }}
                        >
                          Unit Price
                        </th>
                        <th
                          style={{
                            ...styles.tableHeaderCell,
                            width: "25%",
                            textAlign: "right",
                          }}
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrderDetails.items &&
                        selectedOrderDetails.items.map((item, idx) => {
                          const purchasePrice = getPurchasePrice(
                            item.ProductID,
                          );
                          const currentStock = getCurrentStock(item.ProductID);
                          return (
                            <tr key={idx} style={styles.tableRow}>
                              <td style={styles.tableCell}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: isMobile ? "8px" : "12px",
                                  }}
                                >
                                  <Package
                                    size={isMobile ? 14 : 16}
                                    color={colors.primary}
                                  />
                                  <span
                                    style={{
                                      fontWeight: "600",
                                      fontSize: isMobile ? "12px" : "14px",
                                    }}
                                  >
                                    {item.productName}
                                  </span>
                                </div>
                                <div style={styles.priceInfo}>
                                  Purchase Price: Rs.
                                  {formatNumber(purchasePrice)} | Current Stock:{" "}
                                  {currentStock} units
                                </div>
                              </td>
                              <td
                                style={{
                                  ...styles.tableCell,
                                  textAlign: "right",
                                  fontWeight: "700",
                                  fontSize: isMobile ? "12px" : "14px",
                                }}
                              >
                                {formatInteger(item.Quantity)}
                              </td>
                              <td
                                style={{
                                  ...styles.tableCell,
                                  textAlign: "right",
                                  fontWeight: "700",
                                  fontSize: isMobile ? "12px" : "14px",
                                }}
                              >
                                Rs. {formatNumber(item.UnitPrice)}
                              </td>
                              <td
                                style={{
                                  ...styles.tableCell,
                                  textAlign: "right",
                                  fontWeight: "800",
                                  color: colors.secondary,
                                  fontSize: isMobile ? "13px" : "15px",
                                }}
                              >
                                Rs. {formatNumber(item.totalPrice)}
                              </td>
                            </tr>
                          );
                        })}
                      {(!selectedOrderDetails.items ||
                        selectedOrderDetails.items.length === 0) && (
                        <tr>
                          <td
                            colSpan={4}
                            style={{
                              ...styles.tableCell,
                              textAlign: "center",
                              color: colors.gray,
                            }}
                          >
                            No items found for this order
                          </td>
                        </tr>
                      )}
                    </tbody>
                    {selectedOrderDetails.items &&
                      selectedOrderDetails.items.length > 0 && (
                        <tfoot>
                          <tr
                            style={{
                              ...styles.tableRow,
                              background: colors.light,
                            }}
                          >
                            <td
                              colSpan={3}
                              style={{
                                ...styles.tableCell,
                                textAlign: "right",
                                fontWeight: "700",
                                fontSize: isMobile ? "13px" : "15px",
                              }}
                            >
                              Total Amount:
                            </td>
                            <td
                              style={{
                                ...styles.tableCell,
                                textAlign: "right",
                                fontWeight: "800",
                                color: colors.secondary,
                                fontSize: isMobile ? "14px" : "18px",
                              }}
                            >
                              Rs.{" "}
                              {formatNumber(
                                selectedOrderDetails.orderTotal || 0,
                              )}
                            </td>
                          </tr>
                        </tfoot>
                      )}
                  </table>
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  style={{
                    ...styles.button,
                    ...styles.secondaryButton,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`;
                    e.target.style.color = colors.white;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                    e.target.style.color = colors.grayDark;
                  }}
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedOrderForView(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SalesOrders;
