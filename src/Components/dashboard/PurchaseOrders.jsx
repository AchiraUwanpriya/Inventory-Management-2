// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { Plus, Search, Eye, X, Package, FileText, Building2, Truck, Edit, Check, X as XIcon } from "lucide-react";
// import {
//   GetAllPurchaseOrders,
//   AddPurchaseOrdersDetails,
// } from "../../Actions/actionsPurchaseOrders";
// import { GetAllSuppliers } from "../../Actions/actionsSuppliers";
// import { GetAllProducts } from "../../Actions/actionsProducts";
// import { GetAllPurchaseOrderItems, AddPurchaseOrderItemsDetails } from "../../Actions/actionsPurchaseOrderItems";

// const PurchaseOrders = () => {
//   const dispatch = useDispatch();

//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedOrderForView, setSelectedOrderForView] = useState(null);

//   const [newOrder, setNewOrder] = useState({
//     PurchaseOrderID: "",
//     SupplierID: "",
//     OrderDate: new Date().toISOString().split('T')[0],
//     OrderStatus: "Pending",
//   });

//   const [localItems, setLocalItems] = useState([]);
//   const [newItem, setNewItem] = useState({
//     ProductID: "",
//     Quantity: "",
//     UnitPrice: "",
//   });

//   // Add new state for editing quantities
//   const [editingItemId, setEditingItemId] = useState(null);
//   const [editQuantity, setEditQuantity] = useState("");

//   // Searchable dropdown states
//   const [supplierSearch, setSupplierSearch] = useState("");
//   const [productSearch, setProductSearch] = useState("");
//   const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
//   const [showProductDropdown, setShowProductDropdown] = useState(false);

//   // Form validation state
//   const [formErrors, setFormErrors] = useState({});

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
//   const purchaseOrdersState = useSelector((state) => state.purchaseOrders, shallowEqual);
//   const suppliersState = useSelector((state) => state.suppliers, shallowEqual);
//   const productsState = useSelector((state) => state.products, shallowEqual);
//   const purchaseOrderItemsState = useSelector((state) => state.purchaseOrderItems, shallowEqual);

//   const purchaseOrders = useMemo(
//     () => purchaseOrdersState?.responseBody || purchaseOrdersState?.purchaseOrders || [],
//     [purchaseOrdersState?.responseBody, purchaseOrdersState?.purchaseOrders]
//   );

//   const suppliers = useMemo(
//     () => suppliersState?.suppliers || suppliersState?.responseBody || [],
//     [suppliersState?.suppliers, suppliersState?.responseBody]
//   );

//   const products = useMemo(
//     () => productsState?.responseBody || productsState?.products || [],
//     [productsState?.responseBody, productsState?.products]
//   );

//   const purchaseOrderItems = useMemo(
//     () => purchaseOrderItemsState?.responseBody || purchaseOrderItemsState?.purchaseOrderItems || [],
//     [purchaseOrderItemsState?.responseBody, purchaseOrderItemsState?.purchaseOrderItems]
//   );

//   const loading = purchaseOrdersState?.loading || purchaseOrderItemsState?.loading || false;

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

//   useEffect(() => {
//     dispatch(GetAllPurchaseOrders());
//     dispatch(GetAllSuppliers());
//     dispatch(GetAllProducts());
//     dispatch(GetAllPurchaseOrderItems());
//   }, [dispatch]);

//   const getNextOrderId = () => {
//     if (!purchaseOrders || purchaseOrders.length === 0) return 1;
//     const maxId = Math.max(...purchaseOrders.map((o) => Number(o.PurchaseOrderID) || 0));
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

//   // Filtered suppliers for dropdown
//   const filteredSuppliers = useMemo(() => {
//     return suppliers.filter(supplier =>
//       supplier.SupplierName.toLowerCase().includes(supplierSearch.toLowerCase())
//     );
//   }, [suppliers, supplierSearch]);

//   // Filtered products for dropdown - Don't show Product ID
//   const filteredProducts = useMemo(() => {
//     return products.filter(product =>
//       product.ProductName.toLowerCase().includes(productSearch.toLowerCase())
//     );
//   }, [products, productSearch]);

//   const mergedOrders = useMemo(() => {
//     const merged = purchaseOrders.map((order) => {
//       const items = purchaseOrderItems
//         .filter((i) => String(i.PurchaseOrderID) === String(order.PurchaseOrderID))
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
//       const idA = Number(a.PurchaseOrderID) || 0;
//       const idB = Number(b.PurchaseOrderID) || 0;
//       return idB - idA;
//     });
//   }, [purchaseOrders, purchaseOrderItems, products]);

//   const filteredOrders = useMemo(() => {
//     return mergedOrders.filter((order) => {
//       const orderId = String(order.PurchaseOrderID || "");
//       const supplierName = suppliers.find((s) => String(s.SupplierID) === String(order.SupplierID))?.SupplierName || "";
      
//       const matchesSearch = orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         supplierName.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesStatus = statusFilter === "All" || order.OrderStatus === statusFilter;
      
//       return matchesSearch && matchesStatus;
//     });
//   }, [mergedOrders, suppliers, searchTerm, statusFilter]);

//   const selectedOrderDetails = useMemo(() => {
//     if (!selectedOrderForView) return null;
//     return mergedOrders.find(order => String(order.PurchaseOrderID) === String(selectedOrderForView));
//   }, [selectedOrderForView, mergedOrders]);

//   // Form validation
//   const validateForm = () => {
//     const errors = {};

//     if (!newOrder.SupplierID) {
//       errors.supplier = "⚠️ Please select a supplier before placing order";
//     }

//     if (localItems.length === 0) {
//       errors.items = "❌ Please add at least one item to the order";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle supplier selection
//   const handleSupplierSelect = (supplierId, supplierName) => {
//     setNewOrder({ ...newOrder, SupplierID: supplierId });
//     setSupplierSearch(supplierName);
//     setShowSupplierDropdown(false);
//     // Clear supplier error when supplier is selected
//     if (formErrors.supplier) {
//       setFormErrors(prev => ({ ...prev, supplier: '' }));
//     }
//   };

//   // Handle product selection - WITHOUT auto-filling unit price and don't show Product ID
//   const handleProductSelect = (productId) => {
//     const selected = products.find((p) => String(p.ProductID) === String(productId));
//     if (selected) {
//       setNewItem({
//         ...newItem,
//         ProductID: productId,
//         Quantity: "", // Keep quantity empty
//         UnitPrice: "", // Clear unit price - user must enter manually
//       });
//       setProductSearch(selected.ProductName); // Show only product name, not ID
//       setShowProductDropdown(false);
//     }
//   };

//   const handleAddLocalItem = (e) => {
//     e.preventDefault();
//     if (!newItem.ProductID || !newItem.Quantity || !newItem.UnitPrice) {
//       setErrorMsg("⚠️ Please select a product, enter quantity and unit price");
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
//       setErrorMsg("❌ Unit price must be greater than 0");
//       setTimeout(() => setErrorMsg(""), 3000);
//       return;
//     }

//     const existingIndex = localItems.findIndex(
//       (it) => String(it.ProductID) === String(newItem.ProductID)
//     );
//     if (existingIndex >= 0) {
//       const updated = [...localItems];
//       const newTotalQty = Number(updated[existingIndex].Quantity) + qty;
      
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
//     // Clear items error when items are added
//     if (formErrors.items) {
//       setFormErrors(prev => ({ ...prev, items: '' }));
//     }
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
    
//     // Validate form before submission
//     if (!validateForm()) {
//       return;
//     }

//     if (!newOrder.PurchaseOrderID || !newOrder.SupplierID || !newOrder.OrderDate) {
//       setErrorMsg("⚠️ Please fill all required fields");
//       setTimeout(() => setErrorMsg(""), 3000);
//       return;
//     }
    
//     if (!localItems || localItems.length === 0) {
//       setErrorMsg("❌ Please add at least one item to the order");
//       setTimeout(() => setErrorMsg(""), 3000);
//       return;
//     }

//     const orderToAdd = {
//       PurchaseOrderID: newOrder.PurchaseOrderID,
//       SupplierID: newOrder.SupplierID,
//       OrderDate: newOrder.OrderDate,
//       OrderStatus: newOrder.OrderStatus || "Pending",
//     };

//     try {
//       await dispatch(AddPurchaseOrdersDetails(orderToAdd));
      
//       const currentMaxItemId = purchaseOrderItems && purchaseOrderItems.length > 0
//         ? Math.max(...purchaseOrderItems.map((i) => Number(i.ItemID) || 0))
//         : 0;

//       const addItemPromises = localItems.map((it, idx) => {
//         const nextItemID = (currentMaxItemId + idx + 1).toString();
//         const itemToAdd = {
//           ItemID: nextItemID,
//           PurchaseOrderID: orderToAdd.PurchaseOrderID,
//           ProductID: it.ProductID,
//           Quantity: String(it.Quantity),
//           UnitPrice: String(it.UnitPrice),
//           Status: "Active",
//         };
//         return dispatch(AddPurchaseOrderItemsDetails(itemToAdd));
//       });

//       await Promise.all(addItemPromises);
//       dispatch(GetAllPurchaseOrders());
//       dispatch(GetAllPurchaseOrderItems());

//       setNewOrder({ PurchaseOrderID: "", SupplierID: "", OrderDate: new Date().toISOString().split('T')[0], OrderStatus: "Pending" });
//       setLocalItems([]);
//       setShowAddForm(false);
//       setSupplierSearch("");
//       setProductSearch("");
//       setFormErrors({});
//       setEditingItemId(null);
//       setEditQuantity("");

//       setSuccessMsg("✅ Purchase order created successfully!");
//       setTimeout(() => setSuccessMsg(""), 3000);
//     } catch (err) {
//       console.error("Add purchase order error:", err);
//       setErrorMsg("❌ Failed to create purchase order");
//       setTimeout(() => setErrorMsg(""), 3000);
//     }
//   };

//   const handleViewOrder = (orderId) => {
//     setSelectedOrderForView(orderId);
//     setShowViewModal(true);
//   };

//   // Mobile responsive styles with proper breakpoints
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const isMobile = windowSize.width <= 768;
//   const isTablet = windowSize.width <= 1024;
//   const isSmallMobile = windowSize.width <= 480;

//   // 3D Industrial CSS Styles with enhanced mobile responsiveness
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
//       padding: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
//       fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px'
//     },
//     header: {
//       background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
//       padding: isSmallMobile ? '16px' : isMobile ? '20px' : '32px',
//       borderRadius: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
//       marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
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
//       gap: isSmallMobile ? '8px' : isMobile ? '12px' : '20px',
//       flexDirection: isMobile ? 'column' : 'row',
//       textAlign: isMobile ? 'center' : 'left'
//     },
//     pageTitle: {
//       fontSize: isSmallMobile ? '20px' : isMobile ? '24px' : '42px',
//       fontWeight: '800',
//       color: colors.white,
//       margin: 0,
//       textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
//       lineHeight: isSmallMobile ? '1.2' : isMobile ? '1.2' : '1.3'
//     },
//     pageSubtitle: {
//       fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '22px',
//       color: colors.highlight,
//       margin: isSmallMobile ? '2px 0 0 0' : isMobile ? '4px 0 0 0' : '6px 0 0 0',
//       fontWeight: '500'
//     },
//     successMsg: {
//       background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
//       color: colors.white,
//       padding: isSmallMobile ? '12px 16px' : isMobile ? '14px 20px' : '18px 28px',
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//       marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
//       textAlign: 'center',
//       fontWeight: '600',
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px',
//       boxShadow: `0 4px 16px ${colors.shadowLight}`,
//       border: `1px solid ${colors.highlight}`
//     },
//     errorMsg: {
//       background: `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`,
//       color: colors.white,
//       padding: isSmallMobile ? '12px 16px' : isMobile ? '14px 20px' : '18px 28px',
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//       marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
//       textAlign: 'center',
//       fontWeight: '600',
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px',
//       boxShadow: `0 4px 16px rgba(239, 68, 68, 0.3)`,
//       border: `1px solid ${colors.highlight}`
//     },
//     validationError: {
//       background: `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
//       color: colors.white,
//       padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 16px' : '14px 20px',
//       borderRadius: isSmallMobile ? '4px' : isMobile ? '6px' : '8px',
//       marginBottom: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
//       textAlign: 'center',
//       fontWeight: '600',
//       fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '18px',
//       boxShadow: `0 4px 16px rgba(245, 158, 11, 0.3)`,
//       border: `1px solid ${colors.highlight}`
//     },
//     controls: {
//       display: 'flex',
//       gap: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
//       alignItems: 'center',
//       marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       padding: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
//       borderRadius: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}`,
//       border: `1px solid ${colors.highlight}`,
//       position: 'relative',
//       flexDirection: isMobile ? 'column' : 'row'
//     },
//     searchBox: {
//       position: 'relative',
//       display: 'flex',
//       alignItems: 'center',
//       flex: isMobile ? 'none' : '1',
//       maxWidth: 'none',
//       width: isMobile ? '100%' : 'auto'
//     },
//     searchInput: {
//       padding: isSmallMobile ? '12px 16px 12px 40px' : isMobile ? '16px 20px 16px 50px' : '20px 24px 20px 60px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px',
//       width: '100%',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     searchIcon: {
//       position: 'absolute',
//       left: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
//       color: colors.primary,
//       fontSize: isSmallMobile ? '16px' : isMobile ? '20px' : '24px'
//     },
//     filterSelect: {
//       padding: isSmallMobile ? '12px 16px' : isMobile ? '16px 20px' : '20px 24px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       cursor: 'pointer',
//       fontWeight: '600',
//       minWidth: isMobile ? '100%' : '200px',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       transition: 'all 0.3s ease',
//       marginLeft: isMobile ? '0' : 'auto'
//     },
//     addButton: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
//       color: colors.white,
//       border: 'none',
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//       padding: isSmallMobile ? '12px 16px' : isMobile ? '16px 24px' : '20px 36px',
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px',
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
//       padding: isSmallMobile ? '8px' : isMobile ? '10px' : '20px',
//       backdropFilter: 'blur(8px)'
//     },
//     modalContent: {
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       borderRadius: isSmallMobile ? '8px' : isMobile ? '12px' : '20px',
//       boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
//       width: '100%',
//       maxWidth: isSmallMobile ? '100%' : isMobile ? '100%' : '1400px',
//       maxHeight: isSmallMobile ? '90vh' : isMobile ? '95vh' : '95vh',
//       overflow: 'auto',
//       border: `2px solid ${colors.highlight}`,
//       position: 'relative'
//     },
//     modalHeader: {
//       padding: isSmallMobile ? '16px' : isMobile ? '20px' : '32px',
//       borderBottom: `2px solid ${colors.grayLighter}`,
//       background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       flexDirection: isMobile ? 'column' : 'row',
//       gap: isSmallMobile ? '8px' : isMobile ? '12px' : '0',
//       textAlign: isMobile ? 'center' : 'left'
//     },
//     modalTitle: {
//       fontSize: isSmallMobile ? '16px' : isMobile ? '18px' : '32px',
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
//       padding: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//       borderRadius: '6px',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       position: isMobile ? 'absolute' : 'static',
//       top: isSmallMobile ? '8px' : isMobile ? '10px' : 'auto',
//       right: isSmallMobile ? '8px' : isMobile ? '10px' : 'auto'
//     },
//     modalBody: {
//       padding: isSmallMobile ? '16px' : isMobile ? '20px' : '32px'
//     },
//     formGroup: {
//       marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px'
//     },
//     label: {
//       display: 'block',
//       marginBottom: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//       fontWeight: '700',
//       color: colors.dark,
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     input: {
//       width: '100%',
//       padding: isSmallMobile ? '12px 14px' : isMobile ? '14px 16px' : '18px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       boxSizing: 'border-box',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     select: {
//       width: '100%',
//       padding: isSmallMobile ? '12px 14px' : isMobile ? '14px 16px' : '18px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px',
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
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
//       maxHeight: '200px',
//       overflowY: 'auto',
//       zIndex: 1000,
//       boxShadow: `0 4px 12px rgba(0,0,0,0.1)`
//     },
//     dropdownItem: {
//       padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 14px' : '16px 18px',
//       cursor: 'pointer',
//       borderBottom: `1px solid ${colors.grayLighter}`,
//       transition: 'all 0.2s ease',
//       fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'
//     },
//     itemCard: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: isSmallMobile ? '12px' : isMobile ? '16px' : '20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
//       marginBottom: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//       backgroundColor: colors.light,
//       transition: 'all 0.3s ease',
//       flexDirection: isMobile ? 'column' : 'row',
//       gap: isSmallMobile ? '6px' : isMobile ? '8px' : '0'
//     },
//     itemGrid: {
//       display: 'grid',
//       gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? '1fr' : '2fr 1fr 1fr auto',
//       gap: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
//       marginTop: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
//       alignItems: 'end'
//     },
//     buttonGroup: {
//       display: 'flex',
//       gap: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
//       justifyContent: 'flex-end',
//       marginTop: isSmallMobile ? '16px' : isMobile ? '24px' : '32px',
//       paddingTop: isSmallMobile ? '16px' : isMobile ? '20px' : '24px',
//       borderTop: `2px solid ${colors.grayLighter}`,
//       flexDirection: isMobile ? 'column' : 'row'
//     },
//     button: {
//       padding: isSmallMobile ? '12px 16px' : isMobile ? '14px 24px' : '18px 32px',
//       border: 'none',
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px',
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
//       borderRadius: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}`,
//       overflow: 'auto',
//       border: `1px solid ${colors.highlight}`,
//       position: 'relative'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       minWidth: isSmallMobile ? '500px' : isMobile ? '600px' : 'auto'
//     },
//     tableHeader: {
//       background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`
//     },
//     tableHeaderCell: {
//       padding: isSmallMobile ? '12px 8px' : isMobile ? '16px 12px' : '24px 20px',
//       textAlign: 'left',
//       fontWeight: '800',
//       fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
//       borderBottom: `3px solid ${colors.secondary}`,
//       color: colors.white,
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       whiteSpace: 'nowrap'
//     },
//     tableRow: {
//       transition: 'all 0.3s ease',
//       borderBottom: `1px solid ${colors.grayLighter}`,
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`
//     },
//     tableCell: {
//       padding: isSmallMobile ? '12px 8px' : isMobile ? '16px 12px' : '22px 20px',
//       fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
//       color: colors.dark,
//       fontWeight: '500',
//       wordWrap: 'break-word',
//       whiteSpace: isSmallMobile ? 'normal' : 'nowrap'
//     },
//     actionButton: {
//       padding: isSmallMobile ? '6px 8px' : isMobile ? '8px 12px' : '12px 18px',
//       border: 'none',
//       borderRadius: isSmallMobile ? '4px' : isMobile ? '6px' : '8px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
//       color: colors.white,
//       boxShadow: `0 2px 8px ${colors.shadowDark}`,
//       margin: '0 2px'
//     },
//     orderInfo: {
//       display: 'grid',
//       gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? '1fr' : '1fr 1fr 1fr',
//       gap: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
//       marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
//       padding: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
//       backgroundColor: colors.light,
//       borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//       border: `2px solid ${colors.grayLighter}`
//     },
//     infoItem: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: isSmallMobile ? '2px' : isMobile ? '4px' : '8px'
//     },
//     infoLabel: {
//       fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
//       color: colors.grayDark,
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     infoValue: {
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px',
//       color: colors.dark,
//       fontWeight: '700'
//     },
//     sectionHeader: {
//       fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '22px',
//       fontWeight: '700',
//       color: colors.primaryDark,
//       marginBottom: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
//       paddingBottom: isSmallMobile ? '4px' : isMobile ? '6px' : '8px',
//       borderBottom: `2px solid ${colors.primaryLight}`,
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     itemsContainer: {
//       maxHeight: 'none',
//       overflowY: 'visible',
//       padding: '8px'
//     },
//     wideFormContainer: {
//       width: isSmallMobile ? '98vw' : isMobile ? '95vw' : '95vw',
//       maxWidth: isSmallMobile ? '100%' : isMobile ? '100%' : '1600px',
//       margin: '0 auto'
//     },
//     itemsTable: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       marginTop: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
//       minWidth: isSmallMobile ? '400px' : isMobile ? '500px' : 'auto'
//     },
//     itemsTableHeader: {
//       background: `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`
//     },
//     itemsTableCell: {
//       padding: isSmallMobile ? '10px 6px' : isMobile ? '14px 10px' : '18px 14px',
//       border: `1px solid ${colors.grayLighter}`,
//       textAlign: 'left',
//       fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Page Header */}
//       <div style={styles.header}>
//         <div style={styles.headerContent}>
//           <Truck size={isSmallMobile ? 32 : isMobile ? 40 : 52} color={colors.white} />
//           <div>
//             <h1 style={styles.pageTitle}>PURCHASE ORDERS MANAGEMENT</h1>
//             <p style={styles.pageSubtitle}>Manage purchase orders and supplier transactions across the system</p>
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
//           <Search size={isSmallMobile ? 16 : isMobile ? 20 : 24} style={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder="Search orders by ID or supplier name..."
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
//               PurchaseOrderID: getNextOrderId(),
//               SupplierID: "",
//               OrderDate: new Date().toISOString().split('T')[0],
//               OrderStatus: "Pending",
//             });
//             setLocalItems([]);
//             setNewItem({ ProductID: "", Quantity: "", UnitPrice: "" });
//             setShowAddForm(true);
//             setSupplierSearch("");
//             setProductSearch("");
//             setErrorMsg("");
//             setSuccessMsg("");
//             setFormErrors({});
//             setEditingItemId(null);
//             setEditQuantity("");
//           }}
//         >
//           <Plus size={isSmallMobile ? 16 : isMobile ? 20 : 24} /> CREATE PURCHASE ORDER
//         </button>
//       </div>

//       {/* Purchase Orders Table */}
//       <div style={styles.tableContainer}>
//         <table style={styles.table}>
//           <thead style={styles.tableHeader}>
//             <tr>
//               <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%'}}>Order ID</th>
//               <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '30%' : isMobile ? '35%' : '30%'}}>Supplier</th>
//               <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '20%' : '20%'}}>Order Date</th>
//               <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '20%' : '20%', textAlign: 'right'}}>Total Amount Rs. </th>
//               <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '10%' : isMobile ? '15%' : '10%', textAlign: 'center'}}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={5} style={{...styles.tableCell, textAlign: 'center', padding: isSmallMobile ? '30px' : isMobile ? '40px' : '60px'}}>
//                   <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexDirection: isMobile ? 'column' : 'row'}}>
//                     <div style={{
//                       width: isSmallMobile ? '20px' : isMobile ? '24px' : '28px', 
//                       height: isSmallMobile ? '20px' : isMobile ? '24px' : '28px', 
//                       border: '3px solid #f0fdf4', 
//                       borderTop: '3px solid #10b981', 
//                       borderRadius: '50%', 
//                       animation: 'spin 1s linear infinite'
//                     }}></div>
//                     <span style={{fontWeight: '600', color: colors.primary, fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px'}}>Loading purchase orders...</span>
//                   </div>
//                 </td>
//               </tr>
//             ) : filteredOrders.length > 0 ? (
//               filteredOrders.map((order) => {
//                 const supplierName = suppliers.find((s) => String(s.SupplierID) === String(order.SupplierID))?.SupplierName || order.SupplierID;
//                 return (
//                   <tr 
//                     key={order.PurchaseOrderID}
//                     style={styles.tableRow}
//                     onMouseOver={(e) => {
//                       e.currentTarget.style.background = `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`;
//                       e.currentTarget.style.transform = 'scale(1.01)';
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
//                       e.currentTarget.style.transform = 'scale(1)';
//                     }}
//                   >
//                     <td style={{...styles.tableCell, fontWeight: '700', color: colors.primaryDark}}>#{order.PurchaseOrderID}</td>
//                     <td style={styles.tableCell}>
//                       <div style={{display: 'flex', alignItems: 'center', gap: isSmallMobile ? '4px' : isMobile ? '6px' : '12px'}}>
//                         <Building2 size={isSmallMobile ? 12 : isMobile ? 14 : 18} color={colors.primary} />
//                         <span style={{fontSize: isSmallMobile ? '12px' : isMobile ? '13px' : 'inherit'}}>
//                           {isSmallMobile && supplierName.length > 15 ? `${supplierName.substring(0, 15)}...` : 
//                            isMobile && supplierName.length > 20 ? `${supplierName.substring(0, 20)}...` : supplierName}
//                         </span>
//                       </div>
//                     </td>
//                     <td style={styles.tableCell}>{formatDate(order.OrderDate)}</td>
//                     <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', color: colors.secondary, fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : 'inherit'}}>
//                        {formatNumber(order.orderTotal || 0)}
//                     </td>
//                     <td style={{...styles.tableCell, textAlign: 'center'}}>
//                       <div style={{display: 'flex', justifyContent: 'center', gap: isSmallMobile ? '2px' : isMobile ? '4px' : '8px'}}>
//                         <button
//                           style={styles.actionButton}
//                           onMouseOver={(e) => {
//                             e.target.style.transform = 'scale(1.1)';
//                             e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//                             e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
//                           }}
//                           onMouseOut={(e) => {
//                             e.target.style.transform = 'scale(1)';
//                             e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
//                             e.target.style.boxShadow = `0 2px 8px ${colors.shadowDark}`;
//                           }}
//                           onClick={() => handleViewOrder(order.PurchaseOrderID)}
//                           title="View order details"
//                         >
//                           <Eye size={isSmallMobile ? 12 : isMobile ? 14 : 16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={5} style={{...styles.tableCell, textAlign: 'center', padding: isSmallMobile ? '30px' : isMobile ? '40px' : '60px'}}>
//                   <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isSmallMobile ? '8px' : isMobile ? '12px' : '16px', color: colors.gray}}>
//                     <Truck size={isSmallMobile ? 36 : isMobile ? 48 : 72} color={colors.grayLight} />
//                     <p style={{fontSize: isSmallMobile ? '16px' : isMobile ? '18px' : '24px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No purchase orders found</p>
//                     <p style={{fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '18px', margin: 0, textAlign: 'center'}}>Try adjusting your search criteria or filters</p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Create Order Modal */}
//       {showAddForm && (
//         <div style={styles.modalOverlay}>
//           <div style={{...styles.modalContent, ...styles.wideFormContainer}}>
//             <div style={styles.modalHeader}>
//               <h3 style={styles.modalTitle}>CREATE PURCHASE ORDER</h3>
//               <button 
//                 style={styles.closeButton}
//                 onClick={() => {
//                   setShowAddForm(false);
//                   setErrorMsg("");
//                   setFormErrors({});
//                   setEditingItemId(null);
//                   setEditQuantity("");
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
//               >
//                 <X size={isSmallMobile ? 16 : isMobile ? 20 : 28} />
//               </button>
//             </div>
            
//             <div style={styles.modalBody}>
//               {/* Form Validation Errors */}
//               {Object.keys(formErrors).map(key => (
//                 formErrors[key] && (
//                   <div key={key} style={styles.validationError}>
//                     {formErrors[key]}
//                   </div>
//                 )
//               ))}

//               <form onSubmit={handleAddOrder}>
//                 <div style={{display: 'grid', gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? '1fr' : '1fr 1fr', gap: isSmallMobile ? '12px' : isMobile ? '16px' : '24px', marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px'}}>
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Order ID</label>
//                     <input 
//                       type="text" 
//                       value={newOrder.PurchaseOrderID} 
//                       disabled 
//                       style={{
//                         ...styles.input, 
//                         backgroundColor: colors.grayLighter,
//                         color: colors.grayDark,
//                         cursor: 'not-allowed',
//                         fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px'
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

//                 {/* Supplier Selection */}
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Select Supplier *</label>
//                   <div style={styles.dropdownContainer}>
//                     <input
//                       type="text"
//                       placeholder="Search suppliers..."
//                       value={supplierSearch}
//                       onChange={(e) => {
//                         setSupplierSearch(e.target.value);
//                         setShowSupplierDropdown(true);
//                       }}
//                       onFocus={() => setShowSupplierDropdown(true)}
//                       style={{
//                         ...styles.input,
//                         borderColor: !newOrder.SupplierID ? colors.error : colors.grayLighter
//                       }}
//                       onBlur={() => setTimeout(() => setShowSupplierDropdown(false), 200)}
//                     />
                    
//                     {/* Supplier Validation Message */}
//                     {!newOrder.SupplierID && (
//                       <div style={{
//                         color: colors.error,
//                         fontSize: isSmallMobile ? '10px' : isMobile ? '12px' : '14px',
//                         fontWeight: '600',
//                         marginTop: '6px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '6px'
//                       }}>
//                         <span style={{fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px', fontWeight: 'bold'}}>⚠</span>
//                         Please select a supplier to continue
//                       </div>
//                     )}
                    
//                     {showSupplierDropdown && filteredSuppliers.length > 0 && (
//                       <div style={styles.dropdown}>
//                         {filteredSuppliers.map((supplier) => (
//                           <div
//                             key={supplier.SupplierID}
//                             style={styles.dropdownItem}
//                             onMouseOver={(e) => e.target.style.backgroundColor = colors.light}
//                             onMouseOut={(e) => e.target.style.backgroundColor = colors.white}
//                             onMouseDown={(e) => {
//                               e.preventDefault();
//                               handleSupplierSelect(supplier.SupplierID, supplier.SupplierName);
//                             }}
//                           >
//                             {supplier.SupplierName}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Search Products Section - Don't show Product ID */}
//                 <div style={{marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '24px', padding: isSmallMobile ? '12px' : isMobile ? '16px' : '24px', backgroundColor: colors.light, borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px', border: `2px solid ${colors.grayLighter}`}}>
//                   <h4 style={styles.sectionHeader}>Search & Add Products</h4>
//                   <div style={styles.itemGrid}>
//                     <div style={styles.dropdownContainer}>
//                       <input
//                         type="text"
//                         placeholder="Search products by name..."
//                         value={productSearch}
//                         onChange={(e) => {
//                           setProductSearch(e.target.value);
//                           setShowProductDropdown(true);
//                         }}
//                         onFocus={() => setShowProductDropdown(true)}
//                         style={{...styles.input, padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 14px' : '14px 16px', fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'}}
//                         onBlur={() => setTimeout(() => setShowProductDropdown(false), 200)}
//                       />
//                       {showProductDropdown && filteredProducts.length > 0 && (
//                         <div style={styles.dropdown}>
//                           {filteredProducts.map((product) => (
//                             <div
//                               key={product.ProductID}
//                               style={styles.dropdownItem}
//                               onMouseOver={(e) => e.target.style.backgroundColor = colors.light}
//                               onMouseOut={(e) => e.target.style.backgroundColor = colors.white}
//                               onMouseDown={(e) => {
//                                 e.preventDefault();
//                                 handleProductSelect(product.ProductID);
//                               }}
//                             >
//                               <div style={{ fontWeight: '600', fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px' }}>{product.ProductName}</div>
//                               {/* Product ID is removed from display */}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>

//                     <input
//                       type="number"
//                       value={newItem.Quantity}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         if (value === '' || (Number(value) > 0 && Number(value) <= 10000)) {
//                           setNewItem({ ...newItem, Quantity: value });
//                         }
//                       }}
//                       placeholder="Quantity"
//                       min="1"
//                       max="10000"
//                       style={{...styles.input, padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 14px' : '14px 16px', fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'}}
//                       onFocus={(e) => {
//                         e.target.style.borderColor = colors.primary;
//                         e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                       }}
//                       onBlur={(e) => {
//                         e.target.style.borderColor = colors.grayLighter;
//                         e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                       }}
//                     />

//                     {/* MANUAL UNIT PRICE INPUT - EDITABLE */}
//                     <input
//                       type="number"
//                       value={newItem.UnitPrice}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         if (value === '' || (Number(value) >= 0 && Number(value) <= 1000000)) {
//                           setNewItem({ ...newItem, UnitPrice: value });
//                         }
//                       }}
//                       placeholder="Enter Unit Price *"
//                       min="0"
//                       max="1000000"
//                       step="0.01"
//                       style={{
//                         ...styles.input, 
//                         padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 14px' : '14px 16px',
//                         fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
//                         fontWeight: '600',
//                         color: newItem.UnitPrice ? colors.secondary : colors.gray,
//                         borderColor: newItem.UnitPrice ? colors.secondary : colors.grayLighter
//                       }}
//                       onFocus={(e) => {
//                         e.target.style.borderColor = colors.primary;
//                         e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                       }}
//                       onBlur={(e) => {
//                         e.target.style.borderColor = newItem.UnitPrice ? colors.secondary : colors.grayLighter;
//                         e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                       }}
//                     />

//                     <button 
//                       type="button" 
//                       style={{
//                         ...styles.button,
//                         ...styles.primaryButton,
//                         padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 14px' : '14px 16px',
//                         fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
//                         opacity: (!newItem.ProductID || !newItem.Quantity || !newItem.UnitPrice) ? 0.6 : 1
//                       }}
//                       onMouseOver={(e) => {
//                         if (newItem.ProductID && newItem.Quantity && newItem.UnitPrice) {
//                           e.target.style.transform = 'translateY(-2px)';
//                         }
//                       }}
//                       onMouseOut={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                       }}
//                       onClick={handleAddLocalItem}
//                       disabled={!newItem.ProductID || !newItem.Quantity || !newItem.UnitPrice}
//                     >
//                       Add Item
//                     </button>
//                   </div>

//                   {/* Price Help Text */}
//                   <div style={{
//                     marginTop: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
//                     padding: isSmallMobile ? '8px 10px' : isMobile ? '10px 12px' : '14px 16px',
//                     backgroundColor: colors.info + '20',
//                     border: `1px solid ${colors.info}30`,
//                     borderRadius: isSmallMobile ? '4px' : isMobile ? '6px' : '8px',
//                     fontSize: isSmallMobile ? '10px' : isMobile ? '12px' : '14px',
//                     color: colors.dark
//                   }}>
//                     <strong>💡 Manual Price Entry:</strong> You must manually enter the unit price for each product. 
//                     The price will NOT auto-fill when selecting products.
//                   </div>
//                 </div>

//                 {/* Current Order Items in Table Format with Edit Functionality */}
//                 {localItems.length > 0 ? (
//                   <div style={{ marginBottom: isSmallMobile ? '8px' : isMobile ? '12px' : '16px' }}>
//                     <h4 style={styles.sectionHeader}>Current Order Items ({localItems.length})</h4>
//                     <div style={styles.tableContainer}>
//                       <table style={styles.itemsTable}>
//                         <thead style={styles.itemsTableHeader}>
//                           <tr>
//                             <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '25%' : isMobile ? '30%' : '35%'}}>Product Name</th>
//                             <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '15%' : isMobile ? '20%' : '15%', textAlign: 'center'}}>Quantity</th>
//                             <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%', textAlign: 'right'}}>Unit Price</th>
//                             <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%', textAlign: 'right'}}>Total Price</th>
//                             <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '15%' : isMobile ? '15%' : '10%', textAlign: 'center'}}>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {localItems.map((it) => {
//                             const productName = products.find((p) => String(p.ProductID) === String(it.ProductID))?.ProductName || it.ProductID;
//                             const totalPrice = calculateTotalPrice(it.Quantity, it.UnitPrice);
//                             const isEditing = editingItemId === it.ProductID;
                            
//                             return (
//                               <tr key={it.ProductID} style={styles.tableRow}>
//                                 <td style={styles.tableCell}>
//                                   <div style={{display: 'flex', alignItems: 'center', gap: isSmallMobile ? '4px' : isMobile ? '6px' : '12px'}}>
//                                     <Package size={isSmallMobile ? 10 : isMobile ? 12 : 16} color={colors.primary} />
//                                     <span style={{fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
//                                       {isSmallMobile && productName.length > 15 ? `${productName.substring(0, 15)}...` : 
//                                        isMobile && productName.length > 20 ? `${productName.substring(0, 20)}...` : productName}
//                                     </span>
//                                   </div>
//                                 </td>
//                                 <td style={{...styles.tableCell, textAlign: 'center', fontWeight: '600', fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
//                                   {isEditing ? (
//                                     <div style={{display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center'}}>
//                                       <input
//                                         type="number"
//                                         value={editQuantity}
//                                         onChange={(e) => {
//                                           const value = e.target.value;
//                                           if (value === '' || (Number(value) > 0 && Number(value) <= 10000)) {
//                                             setEditQuantity(value);
//                                           }
//                                         }}
//                                         min="1"
//                                         max="10000"
//                                         style={{
//                                           width: isSmallMobile ? '50px' : isMobile ? '60px' : '80px',
//                                           padding: '4px 6px',
//                                           border: `2px solid ${colors.primary}`,
//                                           borderRadius: '4px',
//                                           fontSize: isSmallMobile ? '11px' : isMobile ? '12px' : '14px',
//                                           textAlign: 'center',
//                                           fontWeight: '600'
//                                         }}
//                                         autoFocus
//                                         onKeyPress={(e) => {
//                                           if (e.key === 'Enter') {
//                                             handleEditSave(it.ProductID);
//                                           }
//                                           if (e.key === 'Escape') {
//                                             handleEditCancel();
//                                           }
//                                         }}
//                                       />
//                                     </div>
//                                   ) : (
//                                     <div style={{display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center'}}>
//                                       <span>{formatInteger(it.Quantity)}</span>
//                                     </div>
//                                   )}
//                                 </td>
//                                 <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '600', fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
//                                   Rs. {formatNumber(it.UnitPrice)}
//                                 </td>
//                                 <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', color: colors.secondary, fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
//                                   Rs. {formatNumber(totalPrice)}
//                                 </td>
//                                 <td style={{...styles.tableCell, textAlign: 'center'}}>
//                                   <div style={{display: 'flex', justifyContent: 'center', gap: isSmallMobile ? '2px' : isMobile ? '4px' : '6px'}}>
//                                     {isEditing ? (
//                                       <>
//                                         <button
//                                           type="button"
//                                           style={{
//                                             ...styles.actionButton,
//                                             background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.secondaryDark} 100%)`,
//                                             padding: isSmallMobile ? '4px 6px' : isMobile ? '5px 7px' : '6px 8px'
//                                           }}
//                                           onMouseOver={(e) => {
//                                             e.target.style.transform = 'scale(1.1)';
//                                             e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, #059669 100%)`;
//                                           }}
//                                           onMouseOut={(e) => {
//                                             e.target.style.transform = 'scale(1)';
//                                             e.target.style.background = `linear-gradient(135deg, ${colors.success} 0%, ${colors.secondaryDark} 100%)`;
//                                           }}
//                                           onClick={() => handleEditSave(it.ProductID)}
//                                           title="Save quantity"
//                                         >
//                                           <Check size={isSmallMobile ? 10 : isMobile ? 11 : 12} />
//                                         </button>
//                                         <button
//                                           type="button"
//                                           style={{
//                                             ...styles.actionButton,
//                                             background: `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
//                                             padding: isSmallMobile ? '4px 6px' : isMobile ? '5px 7px' : '6px 8px'
//                                           }}
//                                           onMouseOver={(e) => {
//                                             e.target.style.transform = 'scale(1.1)';
//                                             e.target.style.background = `linear-gradient(135deg, #f59e0b 0%, #b45309 100%)`;
//                                           }}
//                                           onMouseOut={(e) => {
//                                             e.target.style.transform = 'scale(1)';
//                                             e.target.style.background = `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`;
//                                           }}
//                                           onClick={handleEditCancel}
//                                           title="Cancel edit"
//                                         >
//                                           <XIcon size={isSmallMobile ? 10 : isMobile ? 11 : 12} />
//                                         </button>
//                                       </>
//                                     ) : (
//                                       <>
//                                         <button
//                                           type="button"
//                                           style={{
//                                             ...styles.actionButton,
//                                             background: `linear-gradient(135deg, ${colors.info} 0%, #0369a1 100%)`,
//                                             padding: isSmallMobile ? '4px 6px' : isMobile ? '5px 7px' : '6px 8px'
//                                           }}
//                                           onMouseOver={(e) => {
//                                             e.target.style.transform = 'scale(1.1)';
//                                             e.target.style.background = `linear-gradient(135deg, #0ea5e9 0%, #075985 100%)`;
//                                           }}
//                                           onMouseOut={(e) => {
//                                             e.target.style.transform = 'scale(1)';
//                                             e.target.style.background = `linear-gradient(135deg, ${colors.info} 0%, #0369a1 100%)`;
//                                           }}
//                                           onClick={() => handleEditStart(it.ProductID, it.Quantity)}
//                                           title="Edit quantity"
//                                         >
//                                           <Edit size={isSmallMobile ? 10 : isMobile ? 11 : 12} />
//                                         </button>
//                                         <button
//                                           type="button"
//                                           style={{
//                                             ...styles.actionButton,
//                                             background: `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`,
//                                             padding: isSmallMobile ? '4px 6px' : isMobile ? '5px 7px' : '6px 8px'
//                                           }}
//                                           onMouseOver={(e) => {
//                                             e.target.style.transform = 'scale(1.1)';
//                                             e.target.style.background = `linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)`;
//                                           }}
//                                           onMouseOut={(e) => {
//                                             e.target.style.transform = 'scale(1)';
//                                             e.target.style.background = `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`;
//                                           }}
//                                           onClick={() => handleRemoveLocalItem(it.ProductID)}
//                                           title="Remove item"
//                                         >
//                                           <X size={isSmallMobile ? 10 : isMobile ? 11 : 12} />
//                                         </button>
//                                       </>
//                                     )}
//                                   </div>
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                           {/* Total Row */}
//                           <tr style={{...styles.tableRow, background: colors.light}}>
//                             <td colSpan={isSmallMobile ? 2 : isMobile ? 2 : 3} style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'}}>
//                               Order Total:
//                             </td>
//                             <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '800', color: colors.secondary, fontSize: isSmallMobile ? '13px' : isMobile ? '15px' : '18px'}}>
//                               Rs. {formatNumber(calculateOrderTotal(localItems))}
//                             </td>
//                             <td style={styles.tableCell}></td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 ) : (
//                   <div style={{ 
//                     textAlign: 'center', 
//                     padding: isSmallMobile ? '20px' : isMobile ? '30px' : '40px', 
//                     color: colors.gray, 
//                     backgroundColor: colors.light, 
//                     borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
//                     marginBottom: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
//                     border: `2px dashed ${colors.grayLighter}`
//                   }}>
//                     <Package size={isSmallMobile ? 24 : isMobile ? 36 : 48} style={{ marginBottom: isSmallMobile ? '8px' : isMobile ? '12px' : '16px', opacity: 0.5 }} />
//                     <div style={{ fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px', fontWeight: '600', marginBottom: isSmallMobile ? '4px' : isMobile ? '6px' : '8px' }}>No items added yet</div>
//                     <div style={{ fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px' }}>Search and add products above to create your purchase order</div>
//                   </div>
//                 )}

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
//                       setFormErrors({});
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
//                       opacity: (localItems.length === 0 || !newOrder.SupplierID) ? 0.6 : 1
//                     }}
//                     onMouseOver={(e) => {
//                       if (localItems.length > 0 && newOrder.SupplierID) {
//                         e.target.style.transform = 'translateY(-2px)';
//                         e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//                       }
//                     }}
//                     onMouseOut={(e) => {
//                       e.target.style.transform = 'translateY(0)';
//                       e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
//                     }}
//                     disabled={localItems.length === 0 || !newOrder.SupplierID}
//                   >
//                     Create Purchase Order
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
//               <h3 style={styles.modalTitle}>VIEW PURCHASE ORDER #{selectedOrderDetails.PurchaseOrderID}</h3>
//               <button 
//                 style={styles.closeButton}
//                 onClick={() => {
//                   setShowViewModal(false);
//                   setSelectedOrderForView(null);
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
//               >
//                 <X size={isSmallMobile ? 16 : isMobile ? 20 : 28} />
//               </button>
//             </div>
            
//             <div style={styles.modalBody}>
//               <div style={styles.orderInfo}>
//                 <div style={styles.infoItem}>
//                   <span style={styles.infoLabel}>Supplier</span>
//                   <span style={styles.infoValue}>
//                     {suppliers.find(s => String(s.SupplierID) === String(selectedOrderDetails.SupplierID))?.SupplierName}
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
//                         <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '30%' : isMobile ? '35%' : '40%'}}>Item Name</th>
//                         <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%', textAlign: 'right'}}>Qty</th>
//                         <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%', textAlign: 'right'}}>Unit Price</th>
//                         <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%', textAlign: 'right'}}>Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedOrderDetails.items && selectedOrderDetails.items.map((item, idx) => (
//                         <tr key={idx} style={styles.tableRow}>
//                           <td style={styles.tableCell}>
//                             <div style={{display: 'flex', alignItems: 'center', gap: isSmallMobile ? '4px' : isMobile ? '6px' : '12px'}}>
//                               <Package size={isSmallMobile ? 10 : isMobile ? 12 : 16} color={colors.primary} />
//                               <span style={{fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
//                                 {isSmallMobile && item.productName.length > 15 ? `${item.productName.substring(0, 15)}...` : 
//                                  isMobile && item.productName.length > 20 ? `${item.productName.substring(0, 20)}...` : item.productName}
//                               </span>
//                             </div>
//                           </td>
//                           <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '600', fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
//                             {formatInteger(item.Quantity)}
//                           </td>
//                           <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '600', fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
//                              {formatNumber(item.UnitPrice)}
//                           </td>
//                           <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', color: colors.secondary, fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
//                              {formatNumber(item.totalPrice)}
//                           </td>
//                         </tr>
//                       ))}
//                       {(!selectedOrderDetails.items || selectedOrderDetails.items.length === 0) && (
//                         <tr>
//                           <td colSpan={4} style={{...styles.tableCell, textAlign: 'center', color: colors.gray, fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'}}>
//                             No items found for this order
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                     {selectedOrderDetails.items && selectedOrderDetails.items.length > 0 && (
//                       <tfoot>
//                         <tr style={{...styles.tableRow, background: colors.light}}>
//                           <td colSpan={isSmallMobile ? 2 : isMobile ? 2 : 3} style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'}}>
//                             Total Amount:
//                           </td>
//                           <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '800', color: colors.secondary, fontSize: isSmallMobile ? '13px' : isMobile ? '15px' : '20px'}}>
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
        
//         @media (max-width: 480px) {
//           body {
//             overflow-x: hidden;
//           }
//           * {
//             -webkit-tap-highlight-color: transparent;
//           }
//         }
        
//         @media (max-width: 768px) {
//           body {
//             overflow-x: hidden;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PurchaseOrders;

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Plus, Search, Eye, X, Package, FileText, Building2, Truck, Edit, Check, X as XIcon, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import {
  GetAllPurchaseOrders,
  AddPurchaseOrdersDetails,
} from "../../Actions/actionsPurchaseOrders";
import { GetAllSuppliers } from "../../Actions/actionsSuppliers";
import { GetAllProducts } from "../../Actions/actionsProducts";
import { GetAllPurchaseOrderItems, AddPurchaseOrderItemsDetails } from "../../Actions/actionsPurchaseOrderItems";

const PurchaseOrders = () => {
  const dispatch = useDispatch();

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOrderForView, setSelectedOrderForView] = useState(null);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupProgress, setPopupProgress] = useState(100);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [newOrder, setNewOrder] = useState({
    PurchaseOrderID: "",
    SupplierID: "",
    OrderDate: new Date().toISOString().split('T')[0],
    OrderStatus: "Pending",
  });

  const [localItems, setLocalItems] = useState([]);
  const [newItem, setNewItem] = useState({
    ProductID: "",
    Quantity: "",
    UnitPrice: "",
  });

  // Add new state for editing quantities
  const [editingItemId, setEditingItemId] = useState(null);
  const [editQuantity, setEditQuantity] = useState("");

  // Searchable dropdown states
  const [supplierSearch, setSupplierSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  // Form validation state
  const [formErrors, setFormErrors] = useState({});

  // Show popup message with auto-dismiss
  const showPopupMessage = (msg, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
    } else {
      setSuccessMsg(msg);
    }
    setShowPopup(true);
    setPopupProgress(100);
    
    const duration = 4000; // 4 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const decrement = 100 / steps;
    
    const progressTimer = setInterval(() => {
      setPopupProgress(prev => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(progressTimer);
          setShowPopup(false);
          setErrorMsg("");
          setSuccessMsg("");
          return 0;
        }
        return newProgress;
      });
    }, interval);

    // Fallback timer to ensure popup closes
    setTimeout(() => {
      setShowPopup(false);
      setErrorMsg("");
      setSuccessMsg("");
      clearInterval(progressTimer);
    }, duration + 500);
  };

  // Real World Enterprise Application Color Theme
  const colors = {
    primaryDark: '#1e40af',
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    secondaryDark: '#059669',
    secondary: '#10b981',
    secondaryLight: '#34d399',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
    dark: '#1f2937',
    grayDark: '#374151',
    gray: '#6b7280',
    grayLight: '#9ca3af',
    grayLighter: '#e5e7eb',
    light: '#f9fafb',
    white: '#ffffff',
    blue: '#3b82f6',
    green: '#10b981',
    red: '#ef4444',
    yellow: '#f59e0b',
    purple: '#8b5cf6',
    indigo: '#6366f1',
    shadowDark: 'rgba(30, 64, 175, 0.2)',
    shadowLight: 'rgba(16, 185, 129, 0.1)',
    highlight: 'rgba(255, 255, 255, 0.9)',
  };

  // Redux states
  const purchaseOrdersState = useSelector((state) => state.purchaseOrders, shallowEqual);
  const suppliersState = useSelector((state) => state.suppliers, shallowEqual);
  const productsState = useSelector((state) => state.products, shallowEqual);
  const purchaseOrderItemsState = useSelector((state) => state.purchaseOrderItems, shallowEqual);

  const purchaseOrders = useMemo(
    () => purchaseOrdersState?.responseBody || purchaseOrdersState?.purchaseOrders || [],
    [purchaseOrdersState?.responseBody, purchaseOrdersState?.purchaseOrders]
  );

  const suppliers = useMemo(
    () => suppliersState?.suppliers || suppliersState?.responseBody || [],
    [suppliersState?.suppliers, suppliersState?.responseBody]
  );

  const products = useMemo(
    () => productsState?.responseBody || productsState?.products || [],
    [productsState?.responseBody, productsState?.products]
  );

  const purchaseOrderItems = useMemo(
    () => purchaseOrderItemsState?.responseBody || purchaseOrderItemsState?.purchaseOrderItems || [],
    [purchaseOrderItemsState?.responseBody, purchaseOrderItemsState?.purchaseOrderItems]
  );

  const loading = purchaseOrdersState?.loading || purchaseOrderItemsState?.loading || false;

  // Format number with thousand separators
  const formatNumber = (number) => {
    if (number === null || number === undefined || number === '') return '0';
    const num = typeof number === 'string' ? parseFloat(number) : number;
    if (isNaN(num)) return '0';
    
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  // Format number without decimal places (for quantities)
  const formatInteger = (number) => {
    if (number === null || number === undefined || number === '') return '0';
    const num = typeof number === 'string' ? parseInt(number) : number;
    if (isNaN(num)) return '0';
    
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // Format date to show only date part (remove time)
// Format date to show only date part (remove time)
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    // If it's already in YYYY-MM-DD format, return as is
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }
    
    // Otherwise, try to parse it
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    
    // Format as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    return dateString; // Return original string if error
  }
};
  useEffect(() => {
    dispatch(GetAllPurchaseOrders());
    dispatch(GetAllSuppliers());
    dispatch(GetAllProducts());
    dispatch(GetAllPurchaseOrderItems());
  }, [dispatch]);

  const getNextOrderId = () => {
    if (!purchaseOrders || purchaseOrders.length === 0) return 1;
    const maxId = Math.max(...purchaseOrders.map((o) => Number(o.PurchaseOrderID) || 0));
    return maxId + 1;
  };

  const calculateTotalPrice = (quantity, unitPrice) => {
    const qty = Number(quantity) || 0;
    const price = Number(unitPrice) || 0;
    return (qty * price);
  };

  const calculateOrderTotal = (items) => {
    if (!items || items.length === 0) return 0;
    const total = items.reduce((sum, item) => {
      return sum + (Number(item.Quantity) || 0) * (Number(item.UnitPrice) || 0);
    }, 0);
    return total;
  };

  // Function to handle edit start
  const handleEditStart = (productId, currentQuantity) => {
    setEditingItemId(productId);
    setEditQuantity(currentQuantity.toString());
  };

  // Function to handle edit save
  const handleEditSave = (productId) => {
    if (!editQuantity || Number(editQuantity) <= 0) {
      showPopupMessage("❌ Quantity must be greater than 0", true);
      return;
    }

    const updatedItems = localItems.map(item => 
      String(item.ProductID) === String(productId) 
        ? { ...item, Quantity: Number(editQuantity) }
        : item
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

  // Filtered suppliers for dropdown
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier =>
      supplier.SupplierName.toLowerCase().includes(supplierSearch.toLowerCase())
    );
  }, [suppliers, supplierSearch]);

  // Filtered products for dropdown - Don't show Product ID
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.ProductName.toLowerCase().includes(productSearch.toLowerCase())
    );
  }, [products, productSearch]);

  const mergedOrders = useMemo(() => {
    const merged = purchaseOrders.map((order) => {
      const items = purchaseOrderItems
        .filter((i) => String(i.PurchaseOrderID) === String(order.PurchaseOrderID))
        .map((i) => {
          const product = products.find((p) => String(p.ProductID) === String(i.ProductID));
          return {
            ...i,
            productName: product ? product.ProductName : i.ProductID,
            totalPrice: calculateTotalPrice(i.Quantity, i.UnitPrice)
          };
        });
      return { 
        ...order, 
        items,
        orderTotal: calculateOrderTotal(items)
      };
    });
    
    return merged.sort((a, b) => {
      const idA = Number(a.PurchaseOrderID) || 0;
      const idB = Number(b.PurchaseOrderID) || 0;
      return idB - idA;
    });
  }, [purchaseOrders, purchaseOrderItems, products]);

  const filteredOrders = useMemo(() => {
    return mergedOrders.filter((order) => {
      const orderId = String(order.PurchaseOrderID || "");
      const supplierName = suppliers.find((s) => String(s.SupplierID) === String(order.SupplierID))?.SupplierName || "";
      
      const matchesSearch = orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplierName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || order.OrderStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [mergedOrders, suppliers, searchTerm, statusFilter]);

  // Pagination calculations
  useEffect(() => {
    const total = filteredOrders.length;
    const pages = Math.ceil(total / itemsPerPage);
    setTotalPages(pages);
    
    // Reset to first page if current page is beyond new total pages
    if (currentPage > pages && pages > 0) {
      setCurrentPage(1);
    }
  }, [filteredOrders, itemsPerPage, currentPage]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const selectedOrderDetails = useMemo(() => {
    if (!selectedOrderForView) return null;
    return mergedOrders.find(order => String(order.PurchaseOrderID) === String(selectedOrderForView));
  }, [selectedOrderForView, mergedOrders]);

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!newOrder.SupplierID) {
      errors.supplier = "⚠️ Please select a supplier before placing order";
    }

    if (localItems.length === 0) {
      errors.items = "❌ Please add at least one item to the order";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle supplier selection
  const handleSupplierSelect = (supplierId, supplierName) => {
    setNewOrder({ ...newOrder, SupplierID: supplierId });
    setSupplierSearch(supplierName);
    setShowSupplierDropdown(false);
    // Clear supplier error when supplier is selected
    if (formErrors.supplier) {
      setFormErrors(prev => ({ ...prev, supplier: '' }));
    }
  };

  // Handle product selection - WITHOUT auto-filling unit price and don't show Product ID
  const handleProductSelect = (productId) => {
    const selected = products.find((p) => String(p.ProductID) === String(productId));
    if (selected) {
      setNewItem({
        ...newItem,
        ProductID: productId,
        Quantity: "", // Keep quantity empty
        UnitPrice: "", // Clear unit price - user must enter manually
      });
      setProductSearch(selected.ProductName); // Show only product name, not ID
      setShowProductDropdown(false);
    }
  };

  const handleAddLocalItem = (e) => {
    e.preventDefault();
    if (!newItem.ProductID || !newItem.Quantity || !newItem.UnitPrice) {
      showPopupMessage("⚠️ Please select a product, enter quantity and unit price", true);
      return;
    }

    const qty = Number(newItem.Quantity);
    const price = Number(newItem.UnitPrice) || 0;

    if (qty <= 0) {
      showPopupMessage("❌ Quantity must be greater than 0", true);
      return;
    }

    if (price <= 0) {
      showPopupMessage("❌ Unit price must be greater than 0", true);
      return;
    }

    const existingIndex = localItems.findIndex(
      (it) => String(it.ProductID) === String(newItem.ProductID)
    );
    if (existingIndex >= 0) {
      const updated = [...localItems];
      const newTotalQty = Number(updated[existingIndex].Quantity) + qty;
      
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
    // Clear items error when items are added
    if (formErrors.items) {
      setFormErrors(prev => ({ ...prev, items: '' }));
    }
  };

  const handleRemoveLocalItem = (productId) => {
    setLocalItems(localItems.filter((it) => String(it.ProductID) !== String(productId)));
    // If we're removing an item that's being edited, cancel editing
    if (editingItemId === productId) {
      handleEditCancel();
    }
  };

const handleAddOrder = async (e) => {
  e.preventDefault();
  
  // Validate form before submission
  if (!validateForm()) {
    return;
  }

  if (!newOrder.PurchaseOrderID || !newOrder.SupplierID || !newOrder.OrderDate) {
    showPopupMessage("⚠️ Please fill all required fields", true);
    return;
  }
  
  if (!localItems || localItems.length === 0) {
    showPopupMessage("❌ Please add at least one item to the order", true);
    return;
  }

  // FIX: Ensure date is properly formatted as YYYY-MM-DD
  const orderDate = newOrder.OrderDate; // This should already be in YYYY-MM-DD from date input
  
  const orderToAdd = {
    PurchaseOrderID: newOrder.PurchaseOrderID,
    SupplierID: newOrder.SupplierID,
    OrderDate: orderDate, // Use the date directly from input (already in YYYY-MM-DD)
    OrderStatus: newOrder.OrderStatus || "Pending",
  };

  console.log('Submitting order with date:', orderDate); // Debug log

  try {
    await dispatch(AddPurchaseOrdersDetails(orderToAdd));
    
    const currentMaxItemId = purchaseOrderItems && purchaseOrderItems.length > 0
      ? Math.max(...purchaseOrderItems.map((i) => Number(i.ItemID) || 0))
      : 0;

    const addItemPromises = localItems.map((it, idx) => {
      const nextItemID = (currentMaxItemId + idx + 1).toString();
      const itemToAdd = {
        ItemID: nextItemID,
        PurchaseOrderID: orderToAdd.PurchaseOrderID,
        ProductID: it.ProductID,
        Quantity: String(it.Quantity),
        UnitPrice: String(it.UnitPrice),
        Status: "Active",
      };
      return dispatch(AddPurchaseOrderItemsDetails(itemToAdd));
    });

    await Promise.all(addItemPromises);
    dispatch(GetAllPurchaseOrders());
    dispatch(GetAllPurchaseOrderItems());

    setNewOrder({ 
      PurchaseOrderID: "", 
      SupplierID: "", 
      OrderDate: new Date().toISOString().split('T')[0], // Reset to today's date
      OrderStatus: "Pending" 
    });
    setLocalItems([]);
    setShowAddForm(false);
    setSupplierSearch("");
    setProductSearch("");
    setFormErrors({});
    setEditingItemId(null);
    setEditQuantity("");

    showPopupMessage("✅ Purchase order created successfully!");
  } catch (err) {
    console.error("Add purchase order error:", err);
    showPopupMessage("❌ Failed to create purchase order", true);
  }
};

  const handleViewOrder = (orderId) => {
    setSelectedOrderForView(orderId);
    setShowViewModal(true);
  };

  // Pagination Component
  const PaginationControls = () => {
    // Generate page numbers to display
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = isMobile ? 3 : 5;
      
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      // Adjust start page if we're near the end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      return pages;
    };

    return (
      <div style={styles.paginationContainer}>
        {/* Items per page selector */}
        <div style={styles.itemsPerPageContainer}>
          <span style={styles.paginationLabel}>Show:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={styles.itemsPerPageSelect}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span style={styles.paginationLabel}>items per page</span>
        </div>

        {/* Page info */}
        <div style={styles.pageInfo}>
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
        </div>

        {/* Pagination controls */}
        <div style={styles.paginationControls}>
          {/* First Page */}
          <button
            style={{
              ...styles.paginationButton,
              ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
            }}
            onClick={goToFirstPage}
            disabled={currentPage === 1}
          >
            <ChevronsLeft size={16} />
          </button>

          {/* Previous Page */}
          <button
            style={{
              ...styles.paginationButton,
              ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
            }}
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map(page => (
            <button
              key={page}
              style={{
                ...styles.paginationButton,
                ...(page === currentPage ? styles.paginationButtonActive : {})
              }}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          {/* Next Page */}
          <button
            style={{
              ...styles.paginationButton,
              ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
            }}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>

          {/* Last Page */}
          <button
            style={{
              ...styles.paginationButton,
              ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
            }}
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  // Mobile responsive styles with proper breakpoints
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width <= 768;
  const isTablet = windowSize.width <= 1024;
  const isSmallMobile = windowSize.width <= 480;

  // 3D Industrial CSS Styles with enhanced mobile responsiveness
  const styles = {
    container: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
      padding: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px'
    },
    header: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
      padding: isSmallMobile ? '16px' : isMobile ? '20px' : '32px',
      borderRadius: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
      marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
      boxShadow: `0 8px 32px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
      position: 'relative',
      overflow: 'hidden'
    },
    headerContent: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: isSmallMobile ? '8px' : isMobile ? '12px' : '20px',
      flexDirection: isMobile ? 'column' : 'row',
      textAlign: isMobile ? 'center' : 'left'
    },
    pageTitle: {
      fontSize: isSmallMobile ? '20px' : isMobile ? '24px' : '42px',
      fontWeight: '800',
      color: colors.white,
      margin: 0,
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      lineHeight: isSmallMobile ? '1.2' : isMobile ? '1.2' : '1.3'
    },
    pageSubtitle: {
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '22px',
      color: colors.highlight,
      margin: isSmallMobile ? '2px 0 0 0' : isMobile ? '4px 0 0 0' : '6px 0 0 0',
      fontWeight: '500'
    },
    // Popup Notification Styles
    popupContainer: {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: '12px',
      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
      border: `1px solid ${colors.highlight}`,
      minWidth: isMobile ? '300px' : '400px',
      maxWidth: '90vw',
      overflow: 'hidden',
      animation: 'slideDown 0.3s ease-out'
    },
    popupProgressBar: {
      height: '4px',
      background: errorMsg 
        ? `linear-gradient(90deg, ${colors.error} 0%, #dc2626 100%)`
        : `linear-gradient(90deg, ${colors.success} 0%, #059669 100%)`,
      width: `${popupProgress}%`,
      transition: 'width 50ms linear'
    },
    popupContent: {
      display: 'flex',
      alignItems: 'center',
      padding: isMobile ? '14px 20px' : '18px 28px',
      gap: '12px',
      background: errorMsg 
        ? `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`
        : `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
      color: colors.white
    },
    popupMessage: {
      flex: 1,
      fontWeight: '600',
      fontSize: isMobile ? '14px' : '16px',
      margin: 0
    },
    popupCloseButton: {
      background: 'none',
      border: 'none',
      color: colors.white,
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    validationError: {
      background: `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
      color: colors.white,
      padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 16px' : '14px 20px',
      borderRadius: isSmallMobile ? '4px' : isMobile ? '6px' : '8px',
      marginBottom: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '18px',
      boxShadow: `0 4px 16px rgba(245, 158, 11, 0.3)`,
      border: `1px solid ${colors.highlight}`
    },
    controls: {
      display: 'flex',
      gap: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
      alignItems: 'center',
      marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
      borderRadius: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
      position: 'relative',
      flexDirection: isMobile ? 'column' : 'row'
    },
    searchBox: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flex: isMobile ? 'none' : '1',
      maxWidth: 'none',
      width: isMobile ? '100%' : 'auto'
    },
    searchInput: {
      padding: isSmallMobile ? '12px 16px 12px 40px' : isMobile ? '16px 20px 16px 50px' : '20px 24px 20px 60px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
      fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px',
      width: '100%',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: 'all 0.3s ease',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500'
    },
    searchIcon: {
      position: 'absolute',
      left: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
      color: colors.primary,
      fontSize: isSmallMobile ? '16px' : isMobile ? '20px' : '24px'
    },
    filterSelect: {
      padding: isSmallMobile ? '12px 16px' : isMobile ? '16px 20px' : '20px 24px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
      fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: 'pointer',
      fontWeight: '600',
      minWidth: isMobile ? '100%' : '200px',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      transition: 'all 0.3s ease',
      marginLeft: isMobile ? '0' : 'auto'
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      gap: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      border: 'none',
      borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
      padding: isSmallMobile ? '12px 16px' : isMobile ? '16px 24px' : '20px 36px',
      fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 16px ${colors.shadowDark}`,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      width: isMobile ? '100%' : 'auto',
      justifyContent: 'center'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isSmallMobile ? '8px' : isMobile ? '10px' : '20px',
      backdropFilter: 'blur(8px)'
    },
    modalContent: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: isSmallMobile ? '8px' : isMobile ? '12px' : '20px',
      boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
      width: '100%',
      maxWidth: isSmallMobile ? '100%' : isMobile ? '100%' : '1400px',
      maxHeight: isSmallMobile ? '90vh' : isMobile ? '95vh' : '95vh',
      overflow: 'auto',
      border: `2px solid ${colors.highlight}`,
      position: 'relative'
    },
    modalHeader: {
      padding: isSmallMobile ? '16px' : isMobile ? '20px' : '32px',
      borderBottom: `2px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isSmallMobile ? '8px' : isMobile ? '12px' : '0',
      textAlign: isMobile ? 'center' : 'left'
    },
    modalTitle: {
      fontSize: isSmallMobile ? '16px' : isMobile ? '18px' : '32px',
      fontWeight: '800',
      color: colors.white,
      margin: 0,
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: colors.white,
      cursor: 'pointer',
      padding: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: isMobile ? 'absolute' : 'static',
      top: isSmallMobile ? '8px' : isMobile ? '10px' : 'auto',
      right: isSmallMobile ? '8px' : isMobile ? '10px' : 'auto'
    },
    modalBody: {
      padding: isSmallMobile ? '16px' : isMobile ? '20px' : '32px'
    },
    formGroup: {
      marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px'
    },
    label: {
      display: 'block',
      marginBottom: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
      fontWeight: '700',
      color: colors.dark,
      fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    input: {
      width: '100%',
      padding: isSmallMobile ? '12px 14px' : isMobile ? '14px 16px' : '18px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
      fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500'
    },
    select: {
      width: '100%',
      padding: isSmallMobile ? '12px 14px' : isMobile ? '14px 16px' : '18px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
      fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: 'pointer',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    dropdownContainer: {
      position: 'relative',
      width: '100%'
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: colors.white,
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: 1000,
      boxShadow: `0 4px 12px rgba(0,0,0,0.1)`
    },
    dropdownItem: {
      padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 14px' : '16px 18px',
      cursor: 'pointer',
      borderBottom: `1px solid ${colors.grayLighter}`,
      transition: 'all 0.2s ease',
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'
    },
    itemCard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isSmallMobile ? '12px' : isMobile ? '16px' : '20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
      marginBottom: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
      backgroundColor: colors.light,
      transition: 'all 0.3s ease',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isSmallMobile ? '6px' : isMobile ? '8px' : '0'
    },
    itemGrid: {
      display: 'grid',
      gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? '1fr' : '2fr 1fr 1fr auto',
      gap: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
      marginTop: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
      alignItems: 'end'
    },
    buttonGroup: {
      display: 'flex',
      gap: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
      justifyContent: 'flex-end',
      marginTop: isSmallMobile ? '16px' : isMobile ? '24px' : '32px',
      paddingTop: isSmallMobile ? '16px' : isMobile ? '20px' : '24px',
      borderTop: `2px solid ${colors.grayLighter}`,
      flexDirection: isMobile ? 'column' : 'row'
    },
    button: {
      padding: isSmallMobile ? '12px 16px' : isMobile ? '14px 24px' : '18px 32px',
      border: 'none',
      borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
      fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: `0 4px 16px ${colors.shadowDark}`,
      width: isMobile ? '100%' : 'auto'
    },
    secondaryButton: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      border: `2px solid ${colors.grayLighter}`
    },
    primaryButton: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white
    },
    tableContainer: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      overflow: 'auto',
      border: `1px solid ${colors.highlight}`,
      position: 'relative'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: isSmallMobile ? '500px' : isMobile ? '600px' : 'auto'
    },
    tableHeader: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`
    },
    tableHeaderCell: {
      padding: isSmallMobile ? '12px 8px' : isMobile ? '16px 12px' : '24px 20px',
      textAlign: 'left',
      fontWeight: '800',
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
      borderBottom: `3px solid ${colors.secondary}`,
      color: colors.white,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      whiteSpace: 'nowrap'
    },
    tableRow: {
      transition: 'all 0.3s ease',
      borderBottom: `1px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`
    },
    tableCell: {
      padding: isSmallMobile ? '12px 8px' : isMobile ? '16px 12px' : '22px 20px',
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
      color: colors.dark,
      fontWeight: '500',
      wordWrap: 'break-word',
      whiteSpace: isSmallMobile ? 'normal' : 'nowrap'
    },
    actionButton: {
      padding: isSmallMobile ? '6px 8px' : isMobile ? '8px 12px' : '12px 18px',
      border: 'none',
      borderRadius: isSmallMobile ? '4px' : isMobile ? '6px' : '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
      color: colors.white,
      boxShadow: `0 2px 8px ${colors.shadowDark}`,
      margin: '0 2px'
    },
    orderInfo: {
      display: 'grid',
      gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? '1fr' : '1fr 1fr 1fr',
      gap: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
      marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px',
      padding: isSmallMobile ? '12px' : isMobile ? '16px' : '24px',
      backgroundColor: colors.light,
      borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
      border: `2px solid ${colors.grayLighter}`
    },
    infoItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: isSmallMobile ? '2px' : isMobile ? '4px' : '8px'
    },
    infoLabel: {
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
      color: colors.grayDark,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    infoValue: {
      fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px',
      color: colors.dark,
      fontWeight: '700'
    },
    sectionHeader: {
      fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '22px',
      fontWeight: '700',
      color: colors.primaryDark,
      marginBottom: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
      paddingBottom: isSmallMobile ? '4px' : isMobile ? '6px' : '8px',
      borderBottom: `2px solid ${colors.primaryLight}`,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    itemsContainer: {
      maxHeight: 'none',
      overflowY: 'visible',
      padding: '8px'
    },
    wideFormContainer: {
      width: isSmallMobile ? '98vw' : isMobile ? '95vw' : '95vw',
      maxWidth: isSmallMobile ? '100%' : isMobile ? '100%' : '1600px',
      margin: '0 auto'
    },
    itemsTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
      minWidth: isSmallMobile ? '400px' : isMobile ? '500px' : 'auto'
    },
    itemsTableHeader: {
      background: `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`
    },
    itemsTableCell: {
      padding: isSmallMobile ? '10px 6px' : isMobile ? '14px 10px' : '18px 14px',
      border: `1px solid ${colors.grayLighter}`,
      textAlign: 'left',
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'
    },
    // Pagination Styles
    paginationContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isSmallMobile ? '12px' : isMobile ? '16px' : '20px 28px',
      borderTop: `1px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.white} 100%)`,
      gap: isSmallMobile ? '12px' : isMobile ? '16px' : '20px'
    },
    itemsPerPageContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '14px'
    },
    itemsPerPageSelect: {
      padding: '6px 12px',
      border: `1px solid ${colors.grayLighter}`,
      borderRadius: '6px',
      background: colors.white,
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '14px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    paginationLabel: {
      color: colors.grayDark,
      fontWeight: '600',
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '14px'
    },
    pageInfo: {
      color: colors.grayDark,
      fontWeight: '600',
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '14px',
      textAlign: 'center'
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    paginationButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isSmallMobile ? '6px' : isMobile ? '8px' : '10px 14px',
      border: `1px solid ${colors.grayLighter}`,
      borderRadius: '6px',
      background: colors.white,
      color: colors.grayDark,
      fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '14px',
      fontWeight: '600',
      cursor: 'pointer',
      minWidth: isSmallMobile ? '28px' : isMobile ? '32px' : '40px',
      transition: 'all 0.2s ease'
    },
    paginationButtonActive: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      borderColor: colors.primaryDark
    },
    paginationButtonDisabled: {
      background: colors.grayLighter,
      color: colors.grayLight,
      cursor: 'not-allowed',
      opacity: 0.6
    }
  };

  return (
    <div style={styles.container}>
      {/* Popup Notification */}
      {showPopup && (
        <div style={styles.popupContainer}>
          <div style={styles.popupProgressBar} />
          <div style={styles.popupContent}>
            <span style={styles.popupMessage}>{errorMsg || successMsg}</span>
            <button
              style={styles.popupCloseButton}
              onClick={() => {
                setShowPopup(false);
                setErrorMsg("");
                setSuccessMsg("");
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <Truck size={isSmallMobile ? 32 : isMobile ? 40 : 52} color={colors.white} />
          <div>
            <h1 style={styles.pageTitle}>PURCHASE ORDERS MANAGEMENT</h1>
            <p style={styles.pageSubtitle}>Manage purchase orders and supplier transactions across the system</p>
          </div>
        </div>
      </div>

      {/* Controls - Search, Filter and Add button */}
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <Search size={isSmallMobile ? 16 : isMobile ? 20 : 24} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search orders by ID or supplier name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
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

        <button
          style={styles.addButton}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px) scale(1.02)';
            e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
            e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
            e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
          }}
          onClick={() => {
            setNewOrder({
              PurchaseOrderID: getNextOrderId(),
              SupplierID: "",
              OrderDate: new Date().toISOString().split('T')[0],
              OrderStatus: "Pending",
            });
            setLocalItems([]);
            setNewItem({ ProductID: "", Quantity: "", UnitPrice: "" });
            setShowAddForm(true);
            setSupplierSearch("");
            setProductSearch("");
            setErrorMsg("");
            setSuccessMsg("");
            setFormErrors({});
            setEditingItemId(null);
            setEditQuantity("");
          }}
        >
          <Plus size={isSmallMobile ? 16 : isMobile ? 20 : 24} /> CREATE PURCHASE ORDER
        </button>
      </div>

      {/* Purchase Orders Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%'}}>Order ID</th>
              <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '30%' : isMobile ? '35%' : '30%'}}>Supplier</th>
              <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '20%' : '20%'}}>Order Date</th>
              <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '20%' : '20%', textAlign: 'right'}}>Total Amount Rs. </th>
              <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '10%' : isMobile ? '15%' : '10%', textAlign: 'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{...styles.tableCell, textAlign: 'center', padding: isSmallMobile ? '30px' : isMobile ? '40px' : '60px'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexDirection: isMobile ? 'column' : 'row'}}>
                    <div style={{
                      width: isSmallMobile ? '20px' : isMobile ? '24px' : '28px', 
                      height: isSmallMobile ? '20px' : isMobile ? '24px' : '28px', 
                      border: '3px solid #f0fdf4', 
                      borderTop: '3px solid #10b981', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    <span style={{fontWeight: '600', color: colors.primary, fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px'}}>Loading purchase orders...</span>
                  </div>
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((order) => {
                const supplierName = suppliers.find((s) => String(s.SupplierID) === String(order.SupplierID))?.SupplierName || order.SupplierID;
                return (
                  <tr 
                    key={order.PurchaseOrderID}
                    style={styles.tableRow}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`;
                      e.currentTarget.style.transform = 'scale(1.01)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <td style={{...styles.tableCell, fontWeight: '700', color: colors.primaryDark}}>#{order.PurchaseOrderID}</td>
                    <td style={styles.tableCell}>
                      <div style={{display: 'flex', alignItems: 'center', gap: isSmallMobile ? '4px' : isMobile ? '6px' : '12px'}}>
                        <Building2 size={isSmallMobile ? 12 : isMobile ? 14 : 18} color={colors.primary} />
                        <span style={{fontSize: isSmallMobile ? '12px' : isMobile ? '13px' : 'inherit'}}>
                          {isSmallMobile && supplierName.length > 15 ? `${supplierName.substring(0, 15)}...` : 
                           isMobile && supplierName.length > 20 ? `${supplierName.substring(0, 20)}...` : supplierName}
                        </span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>{formatDate(order.OrderDate)}</td>
                    <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', color: colors.secondary, fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : 'inherit'}}>
                       {formatNumber(order.orderTotal || 0)}
                    </td>
                    <td style={{...styles.tableCell, textAlign: 'center'}}>
                      <div style={{display: 'flex', justifyContent: 'center', gap: isSmallMobile ? '2px' : isMobile ? '4px' : '8px'}}>
                        <button
                          style={styles.actionButton}
                          onMouseOver={(e) => {
                            e.target.style.transform = 'scale(1.1)';
                            e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
                            e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                            e.target.style.boxShadow = `0 2px 8px ${colors.shadowDark}`;
                          }}
                          onClick={() => handleViewOrder(order.PurchaseOrderID)}
                          title="View order details"
                        >
                          <Eye size={isSmallMobile ? 12 : isMobile ? 14 : 16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{...styles.tableCell, textAlign: 'center', padding: isSmallMobile ? '30px' : isMobile ? '40px' : '60px'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isSmallMobile ? '8px' : isMobile ? '12px' : '16px', color: colors.gray}}>
                    <Truck size={isSmallMobile ? 36 : isMobile ? 48 : 72} color={colors.grayLight} />
                    <p style={{fontSize: isSmallMobile ? '16px' : isMobile ? '18px' : '24px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No purchase orders found</p>
                    <p style={{fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '18px', margin: 0, textAlign: 'center'}}>Try adjusting your search criteria or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {filteredOrders.length > 0 && (
          <PaginationControls />
        )}
      </div>

      {/* Create Order Modal */}
      {showAddForm && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modalContent, ...styles.wideFormContainer}}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>CREATE PURCHASE ORDER</h3>
              <button 
                style={styles.closeButton}
                onClick={() => {
                  setShowAddForm(false);
                  setErrorMsg("");
                  setFormErrors({});
                  setEditingItemId(null);
                  setEditQuantity("");
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X size={isSmallMobile ? 16 : isMobile ? 20 : 28} />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              {/* Form Validation Errors */}
              {Object.keys(formErrors).map(key => (
                formErrors[key] && (
                  <div key={key} style={styles.validationError}>
                    {formErrors[key]}
                  </div>
                )
              ))}

              <form onSubmit={handleAddOrder}>
                <div style={{display: 'grid', gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? '1fr' : '1fr 1fr', gap: isSmallMobile ? '12px' : isMobile ? '16px' : '24px', marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '28px'}}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Order ID</label>
                    <input 
                      type="text" 
                      value={newOrder.PurchaseOrderID} 
                      disabled 
                      style={{
                        ...styles.input, 
                        backgroundColor: colors.grayLighter,
                        color: colors.grayDark,
                        cursor: 'not-allowed',
                        fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '18px'
                      }} 
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Order Date *</label>
                    <input
                      type="date"
                      value={newOrder.OrderDate}
                      onChange={(e) => setNewOrder({ ...newOrder, OrderDate: e.target.value })}
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

                {/* Supplier Selection */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Supplier *</label>
                  <div style={styles.dropdownContainer}>
                    <input
                      type="text"
                      placeholder="Search suppliers..."
                      value={supplierSearch}
                      onChange={(e) => {
                        setSupplierSearch(e.target.value);
                        setShowSupplierDropdown(true);
                      }}
                      onFocus={() => setShowSupplierDropdown(true)}
                      style={{
                        ...styles.input,
                        borderColor: !newOrder.SupplierID ? colors.error : colors.grayLighter
                      }}
                      onBlur={() => setTimeout(() => setShowSupplierDropdown(false), 200)}
                    />
                    
                    {/* Supplier Validation Message */}
                    {!newOrder.SupplierID && (
                      <div style={{
                        color: colors.error,
                        fontSize: isSmallMobile ? '10px' : isMobile ? '12px' : '14px',
                        fontWeight: '600',
                        marginTop: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span style={{fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px', fontWeight: 'bold'}}>⚠</span>
                        Please select a supplier to continue
                      </div>
                    )}
                    
                    {showSupplierDropdown && filteredSuppliers.length > 0 && (
                      <div style={styles.dropdown}>
                        {filteredSuppliers.map((supplier) => (
                          <div
                            key={supplier.SupplierID}
                            style={styles.dropdownItem}
                            onMouseOver={(e) => e.target.style.backgroundColor = colors.light}
                            onMouseOut={(e) => e.target.style.backgroundColor = colors.white}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleSupplierSelect(supplier.SupplierID, supplier.SupplierName);
                            }}
                          >
                            {supplier.SupplierName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Search Products Section - Don't show Product ID */}
                <div style={{marginBottom: isSmallMobile ? '16px' : isMobile ? '20px' : '24px', padding: isSmallMobile ? '12px' : isMobile ? '16px' : '24px', backgroundColor: colors.light, borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px', border: `2px solid ${colors.grayLighter}`}}>
                  <h4 style={styles.sectionHeader}>Search & Add Products</h4>
                  <div style={styles.itemGrid}>
                    <div style={styles.dropdownContainer}>
                      <input
                        type="text"
                        placeholder="Search products by name..."
                        value={productSearch}
                        onChange={(e) => {
                          setProductSearch(e.target.value);
                          setShowProductDropdown(true);
                        }}
                        onFocus={() => setShowProductDropdown(true)}
                        style={{...styles.input, padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 14px' : '14px 16px', fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'}}
                        onBlur={() => setTimeout(() => setShowProductDropdown(false), 200)}
                      />
                      {showProductDropdown && filteredProducts.length > 0 && (
                        <div style={styles.dropdown}>
                          {filteredProducts.map((product) => (
                            <div
                              key={product.ProductID}
                              style={styles.dropdownItem}
                              onMouseOver={(e) => e.target.style.backgroundColor = colors.light}
                              onMouseOut={(e) => e.target.style.backgroundColor = colors.white}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleProductSelect(product.ProductID);
                              }}
                            >
                              <div style={{ fontWeight: '600', fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px' }}>{product.ProductName}</div>
                              {/* Product ID is removed from display */}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <input
                      type="number"
                      value={newItem.Quantity}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (Number(value) > 0 && Number(value) <= 10000)) {
                          setNewItem({ ...newItem, Quantity: value });
                        }
                      }}
                      placeholder="Quantity"
                      min="1"
                      max="10000"
                      style={{...styles.input, padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 14px' : '14px 16px', fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'}}
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
                        if (value === '' || (Number(value) >= 0 && Number(value) <= 1000000)) {
                          setNewItem({ ...newItem, UnitPrice: value });
                        }
                      }}
                      placeholder="Enter Unit Price *"
                      min="0"
                      max="1000000"
                      step="0.01"
                      style={{
                        ...styles.input, 
                        padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 14px' : '14px 16px',
                        fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
                        fontWeight: '600',
                        color: newItem.UnitPrice ? colors.secondary : colors.gray,
                        borderColor: newItem.UnitPrice ? colors.secondary : colors.grayLighter
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = colors.primary;
                        e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = newItem.UnitPrice ? colors.secondary : colors.grayLighter;
                        e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                      }}
                    />

                    <button 
                      type="button" 
                      style={{
                        ...styles.button,
                        ...styles.primaryButton,
                        padding: isSmallMobile ? '10px 12px' : isMobile ? '12px 14px' : '14px 16px',
                        fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
                        opacity: (!newItem.ProductID || !newItem.Quantity || !newItem.UnitPrice) ? 0.6 : 1
                      }}
                      onMouseOver={(e) => {
                        if (newItem.ProductID && newItem.Quantity && newItem.UnitPrice) {
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                      }}
                      onClick={handleAddLocalItem}
                      disabled={!newItem.ProductID || !newItem.Quantity || !newItem.UnitPrice}
                    >
                      Add Item
                    </button>
                  </div>

                  {/* Price Help Text */}
                  <div style={{
                    marginTop: isSmallMobile ? '6px' : isMobile ? '8px' : '12px',
                    padding: isSmallMobile ? '8px 10px' : isMobile ? '10px 12px' : '14px 16px',
                    backgroundColor: colors.info + '20',
                    border: `1px solid ${colors.info}30`,
                    borderRadius: isSmallMobile ? '4px' : isMobile ? '6px' : '8px',
                    fontSize: isSmallMobile ? '10px' : isMobile ? '12px' : '14px',
                    color: colors.dark
                  }}>
                    <strong>💡 Manual Price Entry:</strong> You must manually enter the unit price for each product. 
                    The price will NOT auto-fill when selecting products.
                  </div>
                </div>

                {/* Current Order Items in Table Format with Edit Functionality */}
                {localItems.length > 0 ? (
                  <div style={{ marginBottom: isSmallMobile ? '8px' : isMobile ? '12px' : '16px' }}>
                    <h4 style={styles.sectionHeader}>Current Order Items ({localItems.length})</h4>
                    <div style={styles.tableContainer}>
                      <table style={styles.itemsTable}>
                        <thead style={styles.itemsTableHeader}>
                          <tr>
                            <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '25%' : isMobile ? '30%' : '35%'}}>Product Name</th>
                            <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '15%' : isMobile ? '20%' : '15%', textAlign: 'center'}}>Quantity</th>
                            <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%', textAlign: 'right'}}>Unit Price</th>
                            <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%', textAlign: 'right'}}>Total Price</th>
                            <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '15%' : isMobile ? '15%' : '10%', textAlign: 'center'}}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {localItems.map((it) => {
                            const productName = products.find((p) => String(p.ProductID) === String(it.ProductID))?.ProductName || it.ProductID;
                            const totalPrice = calculateTotalPrice(it.Quantity, it.UnitPrice);
                            const isEditing = editingItemId === it.ProductID;
                            
                            return (
                              <tr key={it.ProductID} style={styles.tableRow}>
                                <td style={styles.tableCell}>
                                  <div style={{display: 'flex', alignItems: 'center', gap: isSmallMobile ? '4px' : isMobile ? '6px' : '12px'}}>
                                    <Package size={isSmallMobile ? 10 : isMobile ? 12 : 16} color={colors.primary} />
                                    <span style={{fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
                                      {isSmallMobile && productName.length > 15 ? `${productName.substring(0, 15)}...` : 
                                       isMobile && productName.length > 20 ? `${productName.substring(0, 20)}...` : productName}
                                    </span>
                                  </div>
                                </td>
                                <td style={{...styles.tableCell, textAlign: 'center', fontWeight: '600', fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
                                  {isEditing ? (
                                    <div style={{display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center'}}>
                                      <input
                                        type="number"
                                        value={editQuantity}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          if (value === '' || (Number(value) > 0 && Number(value) <= 10000)) {
                                            setEditQuantity(value);
                                          }
                                        }}
                                        min="1"
                                        max="10000"
                                        style={{
                                          width: isSmallMobile ? '50px' : isMobile ? '60px' : '80px',
                                          padding: '4px 6px',
                                          border: `2px solid ${colors.primary}`,
                                          borderRadius: '4px',
                                          fontSize: isSmallMobile ? '11px' : isMobile ? '12px' : '14px',
                                          textAlign: 'center',
                                          fontWeight: '600'
                                        }}
                                        autoFocus
                                        onKeyPress={(e) => {
                                          if (e.key === 'Enter') {
                                            handleEditSave(it.ProductID);
                                          }
                                          if (e.key === 'Escape') {
                                            handleEditCancel();
                                          }
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div style={{display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center'}}>
                                      <span>{formatInteger(it.Quantity)}</span>
                                    </div>
                                  )}
                                </td>
                                <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '600', fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
                                  Rs. {formatNumber(it.UnitPrice)}
                                </td>
                                <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', color: colors.secondary, fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
                                  Rs. {formatNumber(totalPrice)}
                                </td>
                                <td style={{...styles.tableCell, textAlign: 'center'}}>
                                  <div style={{display: 'flex', justifyContent: 'center', gap: isSmallMobile ? '2px' : isMobile ? '4px' : '6px'}}>
                                    {isEditing ? (
                                      <>
                                        <button
                                          type="button"
                                          style={{
                                            ...styles.actionButton,
                                            background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.secondaryDark} 100%)`,
                                            padding: isSmallMobile ? '4px 6px' : isMobile ? '5px 7px' : '6px 8px'
                                          }}
                                          onMouseOver={(e) => {
                                            e.target.style.transform = 'scale(1.1)';
                                            e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, #059669 100%)`;
                                          }}
                                          onMouseOut={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.background = `linear-gradient(135deg, ${colors.success} 0%, ${colors.secondaryDark} 100%)`;
                                          }}
                                          onClick={() => handleEditSave(it.ProductID)}
                                          title="Save quantity"
                                        >
                                          <Check size={isSmallMobile ? 10 : isMobile ? 11 : 12} />
                                        </button>
                                        <button
                                          type="button"
                                          style={{
                                            ...styles.actionButton,
                                            background: `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
                                            padding: isSmallMobile ? '4px 6px' : isMobile ? '5px 7px' : '6px 8px'
                                          }}
                                          onMouseOver={(e) => {
                                            e.target.style.transform = 'scale(1.1)';
                                            e.target.style.background = `linear-gradient(135deg, #f59e0b 0%, #b45309 100%)`;
                                          }}
                                          onMouseOut={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.background = `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`;
                                          }}
                                          onClick={handleEditCancel}
                                          title="Cancel edit"
                                        >
                                          <XIcon size={isSmallMobile ? 10 : isMobile ? 11 : 12} />
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          style={{
                                            ...styles.actionButton,
                                            background: `linear-gradient(135deg, ${colors.info} 0%, #0369a1 100%)`,
                                            padding: isSmallMobile ? '4px 6px' : isMobile ? '5px 7px' : '6px 8px'
                                          }}
                                          onMouseOver={(e) => {
                                            e.target.style.transform = 'scale(1.1)';
                                            e.target.style.background = `linear-gradient(135deg, #0ea5e9 0%, #075985 100%)`;
                                          }}
                                          onMouseOut={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.background = `linear-gradient(135deg, ${colors.info} 0%, #0369a1 100%)`;
                                          }}
                                          onClick={() => handleEditStart(it.ProductID, it.Quantity)}
                                          title="Edit quantity"
                                        >
                                          <Edit size={isSmallMobile ? 10 : isMobile ? 11 : 12} />
                                        </button>
                                        <button
                                          type="button"
                                          style={{
                                            ...styles.actionButton,
                                            background: `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`,
                                            padding: isSmallMobile ? '4px 6px' : isMobile ? '5px 7px' : '6px 8px'
                                          }}
                                          onMouseOver={(e) => {
                                            e.target.style.transform = 'scale(1.1)';
                                            e.target.style.background = `linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)`;
                                          }}
                                          onMouseOut={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.background = `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`;
                                          }}
                                          onClick={() => handleRemoveLocalItem(it.ProductID)}
                                          title="Remove item"
                                        >
                                          <X size={isSmallMobile ? 10 : isMobile ? 11 : 12} />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                          {/* Total Row */}
                          <tr style={{...styles.tableRow, background: colors.light}}>
                            <td colSpan={isSmallMobile ? 2 : isMobile ? 2 : 3} style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'}}>
                              Order Total:
                            </td>
                            <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '800', color: colors.secondary, fontSize: isSmallMobile ? '13px' : isMobile ? '15px' : '18px'}}>
                              Rs. {formatNumber(calculateOrderTotal(localItems))}
                            </td>
                            <td style={styles.tableCell}></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: isSmallMobile ? '20px' : isMobile ? '30px' : '40px', 
                    color: colors.gray, 
                    backgroundColor: colors.light, 
                    borderRadius: isSmallMobile ? '6px' : isMobile ? '8px' : '10px',
                    marginBottom: isSmallMobile ? '8px' : isMobile ? '12px' : '16px',
                    border: `2px dashed ${colors.grayLighter}`
                  }}>
                    <Package size={isSmallMobile ? 24 : isMobile ? 36 : 48} style={{ marginBottom: isSmallMobile ? '8px' : isMobile ? '12px' : '16px', opacity: 0.5 }} />
                    <div style={{ fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : '20px', fontWeight: '600', marginBottom: isSmallMobile ? '4px' : isMobile ? '6px' : '8px' }}>No items added yet</div>
                    <div style={{ fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px' }}>Search and add products above to create your purchase order</div>
                  </div>
                )}

                <div style={styles.buttonGroup}>
                  <button 
                    type="button" 
                    style={{
                      ...styles.button,
                      ...styles.secondaryButton
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
                      setFormErrors({});
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
                      opacity: (localItems.length === 0 || !newOrder.SupplierID) ? 0.6 : 1
                    }}
                    onMouseOver={(e) => {
                      if (localItems.length > 0 && newOrder.SupplierID) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
                      }
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
                    }}
                    disabled={localItems.length === 0 || !newOrder.SupplierID}
                  >
                    Create Purchase Order
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
          <div style={{...styles.modalContent, ...styles.wideFormContainer}}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>VIEW PURCHASE ORDER #{selectedOrderDetails.PurchaseOrderID}</h3>
              <button 
                style={styles.closeButton}
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedOrderForView(null);
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X size={isSmallMobile ? 16 : isMobile ? '20' : 28} />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.orderInfo}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Supplier</span>
                  <span style={styles.infoValue}>
                    {suppliers.find(s => String(s.SupplierID) === String(selectedOrderDetails.SupplierID))?.SupplierName}
                  </span>
                </div>
                <div style={styles.infoItem}>
  <span style={styles.infoLabel}>Order Date</span>
  <span style={styles.infoValue}>
    {selectedOrderDetails.OrderDate ? 
      formatDate(selectedOrderDetails.OrderDate)  // CORRECT - use your formatDate function
      : 'N/A'
    }
  </span>
</div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Total Amount</span>
                  <span style={{...styles.infoValue, color: colors.secondary}}>
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
                        <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '30%' : isMobile ? '35%' : '40%'}}>Item Name</th>
                        <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%', textAlign: 'right'}}>Qty</th>
                        <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%', textAlign: 'right'}}>Unit Price</th>
                        <th style={{...styles.tableHeaderCell, width: isSmallMobile ? '20%' : isMobile ? '25%' : '20%', textAlign: 'right'}}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrderDetails.items && selectedOrderDetails.items.map((item, idx) => (
                        <tr key={idx} style={styles.tableRow}>
                          <td style={styles.tableCell}>
                            <div style={{display: 'flex', alignItems: 'center', gap: isSmallMobile ? '4px' : isMobile ? '6px' : '12px'}}>
                              <Package size={isSmallMobile ? 10 : isMobile ? 12 : 16} color={colors.primary} />
                              <span style={{fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
                                {isSmallMobile && item.productName.length > 15 ? `${item.productName.substring(0, 15)}...` : 
                                 isMobile && item.productName.length > 20 ? `${item.productName.substring(0, 20)}...` : item.productName}
                              </span>
                            </div>
                          </td>
                          <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '600', fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
                            {formatInteger(item.Quantity)}
                          </td>
                          <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '600', fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
                             {formatNumber(item.UnitPrice)}
                          </td>
                          <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', color: colors.secondary, fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '16px'}}>
                             {formatNumber(item.totalPrice)}
                          </td>
                        </tr>
                      ))}
                      {(!selectedOrderDetails.items || selectedOrderDetails.items.length === 0) && (
                        <tr>
                          <td colSpan={4} style={{...styles.tableCell, textAlign: 'center', color: colors.gray, fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'}}>
                            No items found for this order
                          </td>
                        </tr>
                      )}
                    </tbody>
                    {selectedOrderDetails.items && selectedOrderDetails.items.length > 0 && (
                      <tfoot>
                        <tr style={{...styles.tableRow, background: colors.light}}>
                          <td colSpan={isSmallMobile ? 2 : isMobile ? 2 : 3} style={{...styles.tableCell, textAlign: 'right', fontWeight: '700', fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px'}}>
                            Total Amount:
                          </td>
                          <td style={{...styles.tableCell, textAlign: 'right', fontWeight: '800', color: colors.secondary, fontSize: isSmallMobile ? '13px' : isMobile ? '15px' : '20px'}}>
                            Rs. {formatNumber(selectedOrderDetails.orderTotal || 0)}
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
                    ...styles.secondaryButton
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
        
        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
        }
        
        @media (max-width: 480px) {
          body {
            overflow-x: hidden;
          }
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
        
        @media (max-width: 768px) {
          body {
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseOrders;