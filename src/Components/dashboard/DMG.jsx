// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Plus, Search, X, Package, ArrowUpCircle, ArrowDownCircle, Calendar, Truck, Menu } from "lucide-react";
// import {
//   GetAllStockTransactions,
//   AddStockTransactionsDetails,
//   PutStockTransactionsDetails,
// } from "../../Actions/actionsStockTransactions";
// import { GetAllProducts } from "../../Actions/actionsProducts";

// const StockTransactions = () => {
//   const dispatch = useDispatch();

//   // Redux state
//   const stockTransactionsState = useSelector((state) => state.stockTransactions);
//   const productsState = useSelector((state) => state.products);

//   const transactions = stockTransactionsState?.responseBody || [];
//   const loading = stockTransactionsState?.loading;
//   const products = productsState?.responseBody || [];

//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [typeFilter, setTypeFilter] = useState('All');
//   const [showForm, setShowForm] = useState(false);
//   const [editingTransactionID, setEditingTransactionID] = useState(null);
//   const [formTransaction, setFormTransaction] = useState({
//     TransactionID: "",
//     ProductID: "",
//     UserID: "",
//     Quantity: "",
//     TransactionType: "IN",
//     ReferenceNo: "",
//     Status: "Active",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   // Check screen size on mount and resize
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth <= 1024);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Real World Enterprise Application Color Theme - Same as Categories
//   const colors = {
//     // Primary Colors - Professional Blue Theme
//     primaryDark: '#1e40af',
//     primary: '#3b82f6',
//     primaryLight: '#60a5fa',

//     // Secondary Colors - Professional Green
//     secondaryDark: '#059669',
//     secondary: '#10b981',
//     secondaryLight: '#34d399',

//     // Status Colors - Enterprise Standards
//     success: '#10b981',
//     warning: '#f59e0b',
//     error: '#ef4444',
//     info: '#06b6d4',

//     // Neutral Colors - Professional Gray Scale
//     dark: '#1f2937',
//     grayDark: '#374151',
//     gray: '#6b7280',
//     grayLight: '#9ca3af',
//     grayLighter: '#e5e7eb',
//     light: '#f9fafb',
//     white: '#ffffff',

//     // Data Visualization Colors
//     blue: '#3b82f6',
//     green: '#10b981',
//     red: '#ef4444',
//     yellow: '#f59e0b',
//     purple: '#8b5cf6',
//     indigo: '#6366f1',

//     // 3D Effect Colors
//     shadowDark: 'rgba(30, 64, 175, 0.2)',
//     shadowLight: 'rgba(16, 185, 129, 0.1)',
//     highlight: 'rgba(255, 255, 255, 0.9)',
//   };

//   // Auto-increment Transaction ID
//   const generateTransactionID = () => {
//     if (transactions.length === 0) return "1";
//     const ids = transactions.map((t) => Number(t.TransactionID)).filter((n) => !isNaN(n));
//     return Math.max(...ids) + 1;
//   };

//   // Fetch transactions & products on mount
//   useEffect(() => {
//     dispatch(GetAllStockTransactions());
//     dispatch(GetAllProducts());
//   }, [dispatch]);

//   // Filter transactions and sort in descending order by TransactionID
//   const filteredTransactions = transactions
//     .filter((t) => {
//       const matchesSearch =
//         t.TransactionID?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//         t.ProductID?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//         t.ReferenceNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         products.find(p => p.ProductID === t.ProductID)?.ProductName?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesStatus = statusFilter === 'All' || t.Status === statusFilter;
//       const matchesType = typeFilter === 'All' || t.TransactionType === typeFilter;

//       return matchesSearch && matchesStatus && matchesType;
//     })
//     .sort((a, b) => {
//       const idA = Number(a.TransactionID) || 0;
//       const idB = Number(b.TransactionID) || 0;
//       return idB - idA;
//     });

//   // Calculate statistics
//   const totalTransactions = filteredTransactions.length;
//   const inTransactions = filteredTransactions.filter(t => t.TransactionType === 'IN').length;
//   const outTransactions = filteredTransactions.filter(t => t.TransactionType === 'OUT').length;
//   const activeTransactions = filteredTransactions.filter(t => t.Status === 'Active').length;

//   // Format date to yyyy-mm-dd
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       return `${year}-${month}-${day}`;
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return 'Invalid Date';
//     }
//   };

//   // Add / Update transaction handler
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (isSubmitting) {
//       return;
//     }

//     setErrorMsg("");
//     setIsSubmitting(true);

//     if (!formTransaction.ProductID) {
//       setErrorMsg("⚠️ Please select a product!");
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formTransaction.UserID) {
//       setErrorMsg("⚠️ User ID is required!");
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formTransaction.Quantity || Number(formTransaction.Quantity) <= 0) {
//       setErrorMsg("⚠️ Please enter a valid quantity!");
//       setIsSubmitting(false);
//       return;
//     }

//     const payload = {
//       ...formTransaction,
//       TransactionID: formTransaction.TransactionID,
//       Quantity: Number(formTransaction.Quantity),
//     };

//     try {
//       if (editingTransactionID) {
//         await dispatch(PutStockTransactionsDetails(payload));
//         setSuccessMsg("✅ Transaction updated successfully!");
//       } else {
//         await dispatch(AddStockTransactionsDetails(payload));
//         setSuccessMsg("✅ Transaction added successfully!");
//       }

//       await dispatch(GetAllStockTransactions());

//       setFormTransaction({
//         TransactionID: "",
//         ProductID: "",
//         UserID: "",
//         Quantity: "",
//         TransactionType: "IN",
//         ReferenceNo: "",
//         Status: "Active",
//       });
//       setShowForm(false);
//       setEditingTransactionID(null);

//       setTimeout(() => setSuccessMsg(""), 3000);
//       setIsSubmitting(false);
//     } catch (err) {
//       console.error("❌ Failed to save transaction", err);
//       setErrorMsg("❌ Failed to save transaction!");
//       setIsSubmitting(false);
//     }
//   };

//   // Fixed handleToggleStatus function
//   const handleToggleStatus = async (transaction) => {
//     const updatedStatus = transaction.Status === "Active" ? "Inactive" : "Active";

//     const payload = {
//       ...transaction,
//       Status: updatedStatus,
//       ProductID: transaction.ProductID,
//       UserID: transaction.UserID,
//       Quantity: Number(transaction.Quantity),
//       TransactionType: transaction.TransactionType,
//       ReferenceNo: transaction.ReferenceNo || "",
//     };

//     console.log("Toggle Payload:", payload); // Debug log

//     try {
//       // Dispatch the update action
//       await dispatch(PutStockTransactionsDetails(payload));

//       // Refresh the data from server to ensure consistency
//       await dispatch(GetAllStockTransactions());

//       setSuccessMsg(`✅ Transaction ${updatedStatus.toLowerCase()} successfully!`);
//       setTimeout(() => setSuccessMsg(""), 3000);
//     } catch (error) {
//       console.error("Failed to toggle status:", error);
//       setErrorMsg("❌ Failed to update status!");

//       // Revert the UI by refreshing data
//       dispatch(GetAllStockTransactions());
//     }
//   };

//   // Edit transaction
//   const handleEditTransaction = (transaction) => {
//     setFormTransaction({
//       ...transaction,
//       Quantity: transaction.Quantity?.toString() || ""
//     });
//     setEditingTransactionID(transaction.TransactionID);
//     setShowForm(true);
//     setErrorMsg("");
//     setSuccessMsg("");
//   };

//   // 3D Industrial CSS Styles - Responsive
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
//       padding: isMobile ? '16px' : '24px',
//       fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//     },
//     header: {
//       background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
//       padding: isMobile ? '16px 20px' : '20px 28px',
//       borderRadius: '16px',
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
//       gap: isMobile ? '12px' : '20px'
//     },
//     pageTitle: {
//       fontSize: isMobile ? '20px' : '28px',
//       fontWeight: '800',
//       color: colors.white,
//       margin: 0,
//       textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
//     },
//     pageSubtitle: {
//       fontSize: isMobile ? '12px' : '14px',
//       color: colors.highlight,
//       margin: '6px 0 0 0',
//       fontWeight: '500'
//     },
//     successMsg: {
//       background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
//       color: colors.white,
//       padding: isMobile ? '14px 20px' : '18px 28px',
//       borderRadius: '12px',
//       marginBottom: isMobile ? '20px' : '28px',
//       textAlign: 'center',
//       fontWeight: '600',
//       fontSize: isMobile ? '12px' : '14px',
//       boxShadow: `0 4px 16px ${colors.shadowLight}`,
//       border: `1px solid ${colors.highlight}`
//     },
//     errorMsg: {
//       background: `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`,
//       color: colors.white,
//       padding: isMobile ? '14px 20px' : '18px 28px',
//       borderRadius: '12px',
//       marginBottom: isMobile ? '20px' : '28px',
//       textAlign: 'center',
//       fontWeight: '600',
//       fontSize: isMobile ? '12px' : '14px',
//       boxShadow: `0 4px 16px rgba(239, 68, 68, 0.3)`,
//       border: `1px solid ${colors.highlight}`
//     },
//     statsContainer: {
//       display: 'flex',
//       gap: isMobile ? '12px' : '16px',
//       marginBottom: isMobile ? '20px' : '28px',
//       flexWrap: 'wrap'
//     },
//     statCard: {
//       flex: isMobile ? '1 0 calc(50% - 6px)' : '1',
//       minWidth: isMobile ? 'calc(50% - 6px)' : '220px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       padding: isMobile ? '12px 14px' : '16px 20px',
//       borderRadius: '12px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`,
//       border: `1px solid ${colors.highlight}`,
//       textAlign: 'center',
//       position: 'relative',
//       overflow: 'hidden',
//       transition: 'all 0.3s ease'
//     },
//     statNumber: {
//       fontSize: isMobile ? '22px' : '30px',
//       fontWeight: '800',
//       color: colors.primaryDark,
//       margin: '0 0 8px 0',
//       textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
//     },
//     statLabel: {
//       fontSize: isMobile ? '11px' : '13px',
//       color: colors.grayDark,
//       margin: 0,
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     controls: {
//       display: 'flex',
//       gap: isMobile ? '12px' : '16px',
//       alignItems: 'center',
//       marginBottom: isMobile ? '20px' : '28px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       padding: isMobile ? '12px 14px' : '16px 20px',
//       borderRadius: '12px',
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
//       padding: isMobile ? '10px 12px 10px 36px' : '12px 16px 12px 44px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: isMobile ? '14px' : '15px',
//       width: '100%',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     searchIcon: {
//       position: 'absolute',
//       left: isMobile ? '12px' : '16px',
//       color: colors.primary,
//       fontSize: '20px'
//     },
//     filterSelect: {
//       padding: isMobile ? '10px 12px' : '12px 16px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: isMobile ? '14px' : '15px',
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
//       gap: '10px',
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
//       color: colors.white,
//       border: 'none',
//       borderRadius: '10px',
//       padding: isMobile ? '10px 14px' : '12px 18px',
//       fontSize: isMobile ? '14px' : '15px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       boxShadow: `0 4px 16px ${colors.shadowDark}`,
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       width: isMobile ? '100%' : 'auto'
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
//       borderRadius: '16px',
//       boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
//       width: '100%',
//       maxWidth: isMobile ? '100%' : '520px',
//       maxHeight: '90vh',
//       overflow: 'auto',
//       border: `2px solid ${colors.highlight}`,
//       position: 'relative'
//     },
//     modalHeader: {
//       padding: isMobile ? '20px' : '28px',
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
//       padding: '8px',
//       borderRadius: '8px',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     modalBody: {
//       padding: isMobile ? '20px' : '28px'
//     },
//     formGroup: {
//       marginBottom: isMobile ? '16px' : '24px'
//     },
//     label: {
//       display: 'block',
//       marginBottom: '8px',
//       fontWeight: '700',
//       color: colors.dark,
//       fontSize: isMobile ? '12px' : '14px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     input: {
//       width: '100%',
//       padding: isMobile ? '14px 16px' : '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '8px',
//       fontSize: isMobile ? '14px' : '15px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       boxSizing: 'border-box',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     select: {
//       width: '100%',
//       padding: isMobile ? '14px 16px' : '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '8px',
//       fontSize: isMobile ? '14px' : '15px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       cursor: 'pointer',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500',
//       transition: 'all 0.3s ease'
//     },
//     buttonGroup: {
//       display: 'flex',
//       gap: '12px',
//       justifyContent: 'flex-end',
//       marginTop: isMobile ? '24px' : '32px',
//       flexDirection: isMobile ? 'column' : 'row'
//     },
//     secondaryButton: {
//       padding: isMobile ? '14px 20px' : '16px 28px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '8px',
//       fontSize: isMobile ? '14px' : '15px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       color: colors.grayDark,
//       transition: 'all 0.3s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       boxShadow: `0 2px 8px rgba(0,0,0,0.1)`
//     },
//     primaryButton: {
//       padding: isMobile ? '14px 20px' : '16px 28px',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: isMobile ? '14px' : '15px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
//       color: colors.white,
//       transition: 'all 0.3s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       boxShadow: `0 4px 16px ${colors.shadowDark}`
//     },
//     tableContainer: {
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       borderRadius: '12px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}`,
//       overflow: 'auto',
//       border: `1px solid ${colors.highlight}`,
//       position: 'relative'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       minWidth: '850px'
//     },
//     tableHeader: {
//       background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`
//     },
//     tableHeaderCell: {
//       padding: isMobile ? '10px 8px' : '12px 16px',
//       textAlign: 'left',
//       fontWeight: '800',
//       fontSize: isMobile ? '12px' : '14px',
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
//       padding: isMobile ? '10px 8px' : '12px 16px',
//       fontSize: isMobile ? '12px' : '14px',
//       color: colors.dark,
//       fontWeight: '500',
//       whiteSpace: 'nowrap'
//     },
//     statusButton: {
//       padding: isMobile ? '10px 16px' : '12px 24px',
//       border: 'none',
//       borderRadius: '20px',
//       fontSize: isMobile ? '12px' : '14px',
//       fontWeight: '800',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       minWidth: isMobile ? '90px' : '110px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       boxShadow: `0 2px 8px rgba(0,0,0,0.2)`
//     },
//     typeBadge: {
//       padding: isMobile ? '6px 12px' : '8px 16px',
//       borderRadius: '16px',
//       fontSize: isMobile ? '11px' : '12px',
//       fontWeight: '800',
//       textAlign: 'center',
//       minWidth: isMobile ? '70px' : '80px',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '4px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     mobileMenuButton: {
//       display: isMobile ? 'flex' : 'none',
//       alignItems: 'center',
//       justifyContent: 'center',
//       background: 'none',
//       border: 'none',
//       color: colors.white,
//       cursor: 'pointer',
//       padding: '8px',
//       borderRadius: '6px'
//     },
//     mobileFilters: {
//       display: isMobile && showMobileMenu ? 'flex' : 'none',
//       flexDirection: 'column',
//       gap: '12px',
//       width: '100%',
//       marginTop: '12px'
//     }
//   };

//   if (loading) {
//     return (
//       <div style={styles.container}>
//         <div style={{textAlign: 'center', padding: '40px', color: colors.gray}}>
//           Loading transactions...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       {/* Page Header */}
//       <div style={styles.header}>
//         <div style={styles.headerContent}>
//           <Truck size={isMobile ? 36 : 52} color={colors.white} />
//           <div style={{flex: 1}}>
//             <h1 style={styles.pageTitle}>STOCK TRANSACTIONS MANAGEMENT</h1>
//             <p style={styles.pageSubtitle}>Manage and track all stock movements and inventory transactions</p>
//           </div>
//           <button
//             style={styles.mobileMenuButton}
//             onClick={() => setShowMobileMenu(!showMobileMenu)}
//           >
//             <Menu size={24} />
//           </button>
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

//       {/* Statistics Cards */}
//       <div style={styles.statsContainer}>
//         <div
//           style={styles.statCard}
//           onMouseOver={(e) => {
//             e.currentTarget.style.transform = 'translateY(-4px)';
//             e.currentTarget.style.boxShadow = `0 12px 32px ${colors.shadowDark}, 0 4px 16px rgba(0,0,0,0.2)`;
//           }}
//           onMouseOut={(e) => {
//             e.currentTarget.style.transform = 'translateY(0)';
//             e.currentTarget.style.boxShadow = `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`;
//           }}
//         >
//           <p style={styles.statNumber}>{totalTransactions}</p>
//           <p style={styles.statLabel}>TOTAL TRANSACTIONS</p>
//         </div>
//         <div
//           style={{
//             ...styles.statCard,
//             borderLeft: `4px solid ${colors.success}`
//           }}
//           onMouseOver={(e) => {
//             e.currentTarget.style.transform = 'translateY(-4px)';
//             e.currentTarget.style.boxShadow = `0 12px 32px ${colors.shadowDark}, 0 4px 16px rgba(0,0,0,0.2)`;
//           }}
//           onMouseOut={(e) => {
//             e.currentTarget.style.transform = 'translateY(0)';
//             e.currentTarget.style.boxShadow = `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`;
//           }}
//         >
//           <p style={{...styles.statNumber, color: colors.success}}>{inTransactions}</p>
//           <p style={styles.statLabel}>STOCK IN</p>
//         </div>
//         <div
//           style={{
//             ...styles.statCard,
//             borderLeft: `4px solid ${colors.error}`
//           }}
//           onMouseOver={(e) => {
//             e.currentTarget.style.transform = 'translateY(-4px)';
//             e.currentTarget.style.boxShadow = `0 12px 32px ${colors.shadowDark}, 0 4px 16px rgba(0,0,0,0.2)`;
//           }}
//           onMouseOut={(e) => {
//             e.currentTarget.style.transform = 'translateY(0)';
//             e.currentTarget.style.boxShadow = `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`;
//           }}
//         >
//           <p style={{...styles.statNumber, color: colors.error}}>{outTransactions}</p>
//           <p style={styles.statLabel}>STOCK OUT</p>
//         </div>
//       </div>

//       {/* Controls - Search, Filter and Add button */}
//       <div style={styles.controls}>
//         <div style={styles.searchBox}>
//           <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder="Search transactions by ID, product, or reference..."
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

//         <div style={styles.mobileFilters}>
//           <select
//             value={typeFilter}
//             onChange={e => setTypeFilter(e.target.value)}
//             style={{
//               ...styles.filterSelect,
//               background: typeFilter === 'All' ?
//                 `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)` :
//                 typeFilter === 'IN' ?
//                 `linear-gradient(135deg, ${colors.light} 0%, #d1fae5 100%)` :
//                 `linear-gradient(135deg, ${colors.light} 0%, #fef3c7 100%)`,
//               borderColor: typeFilter === 'All' ? colors.grayLighter :
//                          typeFilter === 'IN' ? colors.success : colors.warning
//             }}
//             onFocus={(e) => {
//               e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//             }}
//             onBlur={(e) => {
//               e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//             }}
//           >
//             <option value="All">All Types</option>
//             <option value="IN">Stock In</option>
//             <option value="OUT">Stock Out</option>
//           </select>
//         </div>

//         {!isMobile && (
//           <select
//             value={typeFilter}
//             onChange={e => setTypeFilter(e.target.value)}
//             style={{
//               ...styles.filterSelect,
//               background: typeFilter === 'All' ?
//                 `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)` :
//                 typeFilter === 'IN' ?
//                 `linear-gradient(135deg, ${colors.light} 0%, #d1fae5 100%)` :
//                 `linear-gradient(135deg, ${colors.light} 0%, #fef3c7 100%)`,
//               borderColor: typeFilter === 'All' ? colors.grayLighter :
//                          typeFilter === 'IN' ? colors.success : colors.warning
//             }}
//             onFocus={(e) => {
//               e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//             }}
//             onBlur={(e) => {
//               e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//             }}
//           >
//             <option value="All">All Types</option>
//             <option value="IN">Stock In</option>
//             <option value="OUT">Stock Out</option>
//           </select>
//         )}

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
//             setFormTransaction({
//               TransactionID: generateTransactionID(),
//               ProductID: "",
//               UserID: "",
//               Quantity: "",
//               TransactionType: "IN",
//               ReferenceNo: "",
//               Status: "Active",
//             });
//             setEditingTransactionID(null);
//             setShowForm(true);
//             setErrorMsg("");
//             setSuccessMsg("");
//           }}
//           disabled={isSubmitting}
//         >
//           <Plus size={isMobile ? 20 : 24} /> Add Transaction
//         </button>
//       </div>

//       {/* Form Modal */}
//       {showForm && (
//         <div style={styles.modalOverlay}>
//           <div style={{
//             ...styles.modalContent,
//             maxWidth: isMobile ? '100%' : '800px',
//             width: isMobile ? '100%' : '90vw',
//             maxHeight: '95vh',
//             overflow: 'hidden'
//           }}>
//             <div style={styles.modalHeader}>
//               <h3 style={styles.modalTitle}>
//                 {editingTransactionID ? "EDIT TRANSACTION" : "ADD NEW TRANSACTION"}
//               </h3>
//               <button
//                 style={styles.closeButton}
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingTransactionID(null);
//                   setErrorMsg("");
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
//                 disabled={isSubmitting}
//               >
//                 <X size={isMobile ? 24 : 28} />
//               </button>
//             </div>

//             <div style={{
//               ...styles.modalBody,
//               maxHeight: 'calc(95vh - 120px)',
//               overflowY: 'auto',
//               padding: isMobile ? '16px 20px' : '20px 28px'
//             }}>
//               <form onSubmit={handleFormSubmit}>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
//                   gap: isMobile ? '16px' : '24px',
//                   alignItems: 'start'
//                 }}>
//                   {/* Left Column */}
//                   <div>
//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Transaction ID</label>
//                       <input
//                         type="text"
//                         value={formTransaction.TransactionID}
//                         disabled
//                         style={{
//                           ...styles.input,
//                           backgroundColor: colors.grayLighter,
//                           color: colors.grayDark,
//                           cursor: 'not-allowed'
//                         }}
//                       />
//                     </div>

//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Product *</label>
//                       <select
//                         value={formTransaction.ProductID}
//                         onChange={(e) => setFormTransaction({ ...formTransaction, ProductID: e.target.value })}
//                         style={styles.select}
//                         required
//                         disabled={isSubmitting}
//                       >
//                         <option value="">Select Product</option>
//                         {products.map((p) => (
//                           <option key={p.ProductID} value={p.ProductID}>
//                             {p.ProductName}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Quantity *</label>
//                       <input
//                         type="number"
//                         value={formTransaction.Quantity}
//                         onChange={(e) => setFormTransaction({ ...formTransaction, Quantity: e.target.value })}
//                         style={styles.input}
//                         placeholder="Enter quantity"
//                         required
//                         min="1"
//                         onFocus={(e) => {
//                           e.target.style.borderColor = colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                         disabled={isSubmitting}
//                       />
//                     </div>
//                   </div>

//                   {/* Right Column */}
//                   <div>
//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Transaction Type</label>
//                       <select
//                         value={formTransaction.TransactionType}
//                         onChange={(e) => setFormTransaction({ ...formTransaction, TransactionType: e.target.value })}
//                         style={{
//                           ...styles.select,
//                           background: formTransaction.TransactionType === 'IN' ?
//                             `linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)` :
//                             `linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)`,
//                           borderColor: formTransaction.TransactionType === 'IN' ? colors.success : colors.warning,
//                           color: colors.dark
//                         }}
//                         disabled={isSubmitting}
//                       >
//                         <option value="IN">Stock In</option>
//                         <option value="OUT">Stock Out</option>
//                       </select>
//                     </div>

//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>User ID *</label>
//                       <input
//                         type="text"
//                         value={formTransaction.UserID}
//                         onChange={(e) => setFormTransaction({ ...formTransaction, UserID: e.target.value })}
//                         style={styles.input}
//                         placeholder="Enter User ID"
//                         required
//                         onFocus={(e) => {
//                           e.target.style.borderColor = colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                         disabled={isSubmitting}
//                       />
//                     </div>

//                     {/* <div style={styles.formGroup}>
//                       <label style={styles.label}>Reference No</label>
//                       <input
//                         type="text"
//                         value={formTransaction.ReferenceNo}
//                         onChange={(e) => setFormTransaction({ ...formTransaction, ReferenceNo: e.target.value })}
//                         style={styles.input}
//                         placeholder="Enter reference number"
//                         onFocus={(e) => {
//                           e.target.style.borderColor = colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                         disabled={isSubmitting}
//                       />
//                     </div> */}
//                   </div>
//                 </div>

//                 <div style={styles.buttonGroup}>
//                   <button
//                     type="button"
//                     style={styles.secondaryButton}
//                     onMouseOver={(e) => !isSubmitting && (e.target.style.background = `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`)}
//                     onMouseOut={(e) => !isSubmitting && (e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`)}
//                     onClick={() => {
//                       setShowForm(false);
//                       setEditingTransactionID(null);
//                     }}
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     style={{
//                       ...styles.primaryButton,
//                       opacity: isSubmitting ? 0.6 : 1,
//                       cursor: isSubmitting ? 'not-allowed' : 'pointer'
//                     }}
//                     onMouseOver={(e) => {
//                       if (!isSubmitting) {
//                         e.target.style.transform = 'translateY(-2px)';
//                         e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//                         e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
//                       }
//                     }}
//                     onMouseOut={(e) => {
//                       if (!isSubmitting) {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
//                         e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
//                       }
//                     }}
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Saving..." : (editingTransactionID ? "Update Transaction" : "Add Transaction")}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Transactions Table */}
//       <div style={styles.tableContainer}>
//         <table style={styles.table}>
//           <thead style={styles.tableHeader}>
//             <tr>
//               <th style={styles.tableHeaderCell}>Transaction ID</th>
//               <th style={styles.tableHeaderCell}>Product Name</th>
//               <th style={styles.tableHeaderCell}>Quantity</th>
//               <th style={styles.tableHeaderCell}>Balance Quantity</th>
//               <th style={styles.tableHeaderCell}>Type</th>
//               <th style={styles.tableHeaderCell}>Date</th>
//               <th style={styles.tableHeaderCell}>Reference No</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTransactions.length === 0 ? (
//               <tr>
//                 <td colSpan={7} style={{...styles.tableCell, textAlign: 'center', padding: isMobile ? '40px' : '60px'}}>
//                   <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: colors.gray}}>
//                     <Package size={isMobile ? 48 : 72} color={colors.grayLight} />
//                     <p style={{fontSize: isMobile ? '18px' : '20px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No transactions found</p>
//                     <p style={{fontSize: isMobile ? '12px' : '14px', margin: 0}}>Try adjusting your search criteria or filters</p>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               filteredTransactions.map((t) => {
//                 const product = products.find((p) => p.ProductID === t.ProductID);
//                 return (
//                   <tr
//                     key={t.TransactionID}
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
//                     <td style={{...styles.tableCell, fontWeight: '700', color: colors.primaryDark}}>#{t.TransactionID}</td>
//                     <td style={styles.tableCell}>
//                       <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px'}}>
//                         <Package size={isMobile ? 16 : 20} color={colors.primary} />
//                         {product?.ProductName || t.ProductID}
//                       </div>
//                     </td>
//                     <td style={{...styles.tableCell, fontWeight: '600', textAlign: 'center'}}>
//                       {t.Quantity}
//                     </td>
//                     <td style={{...styles.tableCell, fontWeight: '700', textAlign: 'center', color: colors.secondary}}>
//                       {t.BalanceQuantity || '0'}
//                     </td>
//                     <td style={styles.tableCell}>
//                       <div style={{
//                         ...styles.typeBadge,
//                         background: t.TransactionType === 'IN' ?
//                           `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)` :
//                           `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
//                         color: colors.white
//                       }}>
//                         {t.TransactionType === 'IN' ? <ArrowUpCircle size={isMobile ? 12 : 14} /> : <ArrowDownCircle size={isMobile ? 12 : 14} />}
//                         {t.TransactionType}
//                       </div>
//                     </td>
//                     <td style={styles.tableCell}>
//                       <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px', color: colors.gray}}>
//                         <Calendar size={isMobile ? 14 : 16} />
//                         {formatDate(t.TransactionDate)}
//                       </div>
//                     </td>
//                     <td style={styles.tableCell}>
//                       {t.ReferenceNo || (
//                         <span style={{color: colors.gray, fontStyle: 'italic'}}>No reference</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default StockTransactions;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Search,
  X,
  Package,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  Truck,
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  GetStockTransactionsByFormType,
  AddStockTransactionsDetails,
  PutStockTransactionsDetails,
} from "../../Actions/actionsStockTransactions";
import { GetAllProducts } from "../../Actions/actionsProducts";

const DMG = () => {
  const dispatch = useDispatch();

  // Redux state
  const stockTransactionsState = useSelector((state) => state.grnTransactions);
  const productsState = useSelector((state) => state.products);

  const transactions = stockTransactionsState?.responseBody || [];
  const loading = stockTransactionsState?.loading;
  const products = productsState?.responseBody || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingTransactionID, setEditingTransactionID] = useState(null);
  const [formTransaction, setFormTransaction] = useState({
    TransactionID: "",
    ProductID: "",
    UserID: "",
    Quantity: "",
    TransactionType: "IN",
    ReferenceNo: "",
    Status: "Active",
    TransactionDate: new Date().toISOString().split("T")[0],
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupProgress, setPopupProgress] = useState(100);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

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
      setPopupProgress((prev) => {
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

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Real World Enterprise Application Color Theme - Same as Categories
  const colors = {
    // Primary Colors - Professional Blue Theme
    primaryDark: "#1e40af",
    primary: "#3b82f6",
    primaryLight: "#60a5fa",

    // Secondary Colors - Professional Green
    secondaryDark: "#059669",
    secondary: "#10b981",
    secondaryLight: "#34d399",

    // Status Colors - Enterprise Standards
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#06b6d4",

    // Neutral Colors - Professional Gray Scale
    dark: "#1f2937",
    grayDark: "#374151",
    gray: "#6b7280",
    grayLight: "#9ca3af",
    grayLighter: "#e5e7eb",
    light: "#f9fafb",
    white: "#ffffff",

    // Data Visualization Colors
    blue: "#3b82f6",
    green: "#10b981",
    red: "#ef4444",
    yellow: "#f59e0b",
    purple: "#8b5cf6",
    indigo: "#6366f1",

    // 3D Effect Colors
    shadowDark: "rgba(30, 64, 175, 0.2)",
    shadowLight: "rgba(16, 185, 129, 0.1)",
    highlight: "rgba(255, 255, 255, 0.9)",
  };

  // Auto-increment Transaction ID
  const generateTransactionID = () => {
    if (transactions.length === 0) return "1";
    const ids = transactions
      .map((t) => Number(t.TransactionID))
      .filter((n) => !isNaN(n));
    return Math.max(...ids) + 1;
  };

  // Fetch transactions & products on mount
  useEffect(() => {
    dispatch(GetStockTransactionsByFormType("DMG"));
    dispatch(GetAllProducts());
  }, [dispatch]);

  // Filter transactions and sort in descending order by TransactionID
  const filteredTransactions = transactions
    .filter((t) => {
      const matchesSearch =
        t.TransactionID?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        t.ProductID?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        t.ReferenceNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        products
          .find((p) => p.ProductID === t.ProductID)
          ?.ProductName?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "All" || t.Status === statusFilter;
      const matchesType =
        typeFilter === "All" || t.TransactionType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      const idA = Number(a.TransactionID) || 0;
      const idB = Number(b.TransactionID) || 0;
      return idB - idA;
    });

  // Pagination calculations
  useEffect(() => {
    const total = filteredTransactions.length;
    const pages = Math.ceil(total / itemsPerPage);
    setTotalPages(pages);

    // Reset to first page if current page is beyond new total pages
    if (currentPage > pages && pages > 0) {
      setCurrentPage(1);
    }
  }, [filteredTransactions, itemsPerPage, currentPage]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

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

  // Calculate statistics
  const totalTransactions = filteredTransactions.length;
  const inTransactions = filteredTransactions.filter(
    (t) => t.TransactionType === "IN",
  ).length;
  const outTransactions = filteredTransactions.filter(
    (t) => t.TransactionType === "OUT",
  ).length;
  const activeTransactions = filteredTransactions.filter(
    (t) => t.Status === "Active",
  ).length;

  // Format date to yyyy-mm-dd
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  // Add / Update transaction handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    if (!formTransaction.ProductID) {
      showPopupMessage("⚠️ Please select a product!", true);
      setIsSubmitting(false);
      return;
    }

    if (!formTransaction.UserID) {
      showPopupMessage("⚠️ User ID is required!", true);
      setIsSubmitting(false);
      return;
    }

    if (!formTransaction.Quantity || Number(formTransaction.Quantity) <= 0) {
      showPopupMessage("⚠️ Please enter a valid quantity!", true);
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...formTransaction,
      TransactionID: formTransaction.TransactionID,
      Quantity: Number(formTransaction.Quantity),
      TransactionType: "OUT",
      OrderItemType: "SO",
      FormTypeID: 3,
      TransactiionDate:
        formTransaction.TransactionDate ||
        new Date().toISOString().split("T")[0],
    };

    try {
      if (editingTransactionID) {
        await dispatch(PutStockTransactionsDetails(payload));
        setEditingTransactionID(null);
        showPopupMessage("✅ Damage updated successfully!");
      } else {
        await dispatch(AddStockTransactionsDetails(payload));
        showPopupMessage("✅ Damage added successfully!");
      }

      await dispatch(GetStockTransactionsByFormType("DMG"));

      setFormTransaction({
        TransactionID: "",
        ProductID: "",
        UserID: "",
        Quantity: "",
        TransactionType: "IN",
        ReferenceNo: "",
        Status: "Active",
        TransactionDate: new Date().toISOString().split("T")[0],
      });
      setShowForm(false);
      setIsSubmitting(false);
    } catch (err) {
      console.error("❌ Failed to save Damage", err);
      showPopupMessage("❌ Failed to save Damage!", true);
      setIsSubmitting(false);
    }
  };

  // Fixed handleToggleStatus function
  const handleToggleStatus = async (transaction) => {
    const updatedStatus =
      transaction.Status === "Active" ? "Inactive" : "Active";

    const payload = {
      ...transaction,
      Status: updatedStatus,
      ProductID: transaction.ProductID,
      UserID: transaction.UserID,
      Quantity: Number(transaction.Quantity),
      TransactionType: transaction.TransactionType,
      ReferenceNo: transaction.ReferenceNo || "",
    };

    console.log("Toggle Payload:", payload); // Debug log

    try {
      // Dispatch the update action
      await dispatch(PutStockTransactionsDetails(payload));

      // Refresh the data from server to ensure consistency
      await dispatch(GetStockTransactionsByFormType("DMG"));

      showPopupMessage(
        `✅ Transaction ${updatedStatus.toLowerCase()} successfully!`,
      );
    } catch (error) {
      console.error("Failed to toggle status:", error);
      showPopupMessage("❌ Failed to update status!", true);

      // Revert the UI by refreshing data
      dispatch(GetStockTransactionsByFormType("DMG"));
    }
  };

  // Edit transaction
  const handleEditTransaction = (transaction) => {
    setFormTransaction({
      ...transaction,
      Quantity: transaction.Quantity?.toString() || "",
    });
    setEditingTransactionID(transaction.TransactionID);
    setShowForm(true);
    setErrorMsg("");
    setSuccessMsg("");
  };

  // Pagination Component
  const PaginationControls = () => {
    // Generate page numbers to display
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = isMobile ? 3 : 5;

      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2),
      );
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
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredTransactions.length)} of{" "}
          {filteredTransactions.length} Damages
        </div>

        {/* Pagination controls */}
        <div style={styles.paginationControls}>
          {/* First Page */}
          <button
            style={{
              ...styles.paginationButton,
              ...(currentPage === 1 ? styles.paginationButtonDisabled : {}),
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
              ...(currentPage === 1 ? styles.paginationButtonDisabled : {}),
            }}
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page) => (
            <button
              key={page}
              style={{
                ...styles.paginationButton,
                ...(page === currentPage ? styles.paginationButtonActive : {}),
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
              ...(currentPage === totalPages
                ? styles.paginationButtonDisabled
                : {}),
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
              ...(currentPage === totalPages
                ? styles.paginationButtonDisabled
                : {}),
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

  // 3D Industrial CSS Styles - Responsive
  const styles = {
    container: {
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
      padding: isMobile ? "16px" : "24px",
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
      padding: isMobile ? "16px 20px" : "20px 28px",
      borderRadius: "16px",
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
    },
    pageTitle: {
      fontSize: isMobile ? "20px" : "28px",
      fontWeight: "800",
      color: colors.white,
      margin: 0,
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    },
    pageSubtitle: {
      fontSize: isMobile ? "12px" : "14px",
      color: colors.highlight,
      margin: "6px 0 0 0",
      fontWeight: "500",
    },
    // Popup Notification Styles
    popupContainer: {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: "12px",
      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
      border: `1px solid ${colors.highlight}`,
      minWidth: isMobile ? "300px" : "400px",
      maxWidth: "90vw",
      overflow: "hidden",
      animation: "slideDown 0.3s ease-out",
    },
    popupProgressBar: {
      height: "4px",
      background: errorMsg
        ? `linear-gradient(90deg, ${colors.error} 0%, #dc2626 100%)`
        : `linear-gradient(90deg, ${colors.success} 0%, #059669 100%)`,
      width: `${popupProgress}%`,
      transition: "width 50ms linear",
    },
    popupContent: {
      display: "flex",
      alignItems: "center",
      padding: isMobile ? "14px 20px" : "18px 28px",
      gap: "12px",
      background: errorMsg
        ? `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`
        : `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
      color: colors.white,
    },
    popupMessage: {
      flex: 1,
      fontWeight: "600",
      fontSize: isMobile ? "12px" : "14px",
      margin: 0,
    },
    popupCloseButton: {
      background: "none",
      border: "none",
      color: colors.white,
      cursor: "pointer",
      padding: "4px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
    },
    statsContainer: {
      display: "flex",
      gap: isMobile ? "12px" : "16px",
      marginBottom: isMobile ? "20px" : "28px",
      flexWrap: "wrap",
    },
    statCard: {
      flex: isMobile ? "1 0 calc(50% - 6px)" : "1",
      minWidth: isMobile ? "calc(50% - 6px)" : "220px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: isMobile ? "12px 14px" : "16px 20px",
      borderRadius: "12px",
      boxShadow: `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`,
      border: `1px solid ${colors.highlight}`,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
    },
    statNumber: {
      fontSize: isMobile ? "22px" : "30px",
      fontWeight: "800",
      color: colors.primaryDark,
      margin: "0 0 8px 0",
      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    },
    statLabel: {
      fontSize: isMobile ? "11px" : "13px",
      color: colors.grayDark,
      margin: 0,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    controls: {
      display: "flex",
      gap: isMobile ? "12px" : "16px",
      alignItems: "center",
      marginBottom: isMobile ? "20px" : "28px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: isMobile ? "12px 14px" : "16px 20px",
      borderRadius: "12px",
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
      padding: isMobile ? "10px 12px 10px 28px" : "12px 16px 12px 36px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "10px",
      fontSize: isMobile ? "14px" : "15px",
      width: "100%",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: "all 0.3s ease",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: "500",
    },
    searchIcon: {
      position: "absolute",
      left: isMobile ? "4px" : "8px",
      color: colors.primary,
      fontSize: "20px",
    },
    filterSelect: {
      padding: isMobile ? "10px 12px" : "12px 16px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "10px",
      fontSize: isMobile ? "14px" : "15px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: "pointer",
      fontWeight: "600",
      minWidth: isMobile ? "100%" : "200px",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      transition: "all 0.3s ease",
      marginLeft: isMobile ? "0" : "auto",
    },
    addButton: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      border: "none",
      borderRadius: "10px",
      padding: isMobile ? "10px 14px" : "12px 18px",
      fontSize: isMobile ? "14px" : "15px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: `0 4px 16px ${colors.shadowDark}`,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      width: isMobile ? "100%" : "auto",
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
      borderRadius: "16px",
      boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
      width: "100%",
      maxWidth: isMobile ? "100%" : "520px",
      maxHeight: "90vh",
      overflow: "auto",
      border: `2px solid ${colors.highlight}`,
      position: "relative",
    },
    modalHeader: {
      padding: isMobile ? "20px" : "28px",
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
      padding: "8px",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalBody: {
      padding: isMobile ? "20px" : "28px",
    },
    formGroup: {
      marginBottom: isMobile ? "16px" : "24px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "700",
      color: colors.dark,
      fontSize: isMobile ? "12px" : "14px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      padding: isMobile ? "14px 16px" : "16px 20px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "8px",
      fontSize: isMobile ? "14px" : "15px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: "500",
    },
    select: {
      width: "100%",
      padding: isMobile ? "14px 16px" : "16px 20px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "8px",
      fontSize: isMobile ? "14px" : "15px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: "pointer",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    buttonGroup: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      marginTop: isMobile ? "24px" : "32px",
      flexDirection: isMobile ? "column" : "row",
    },
    secondaryButton: {
      padding: isMobile ? "14px 20px" : "16px 28px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "8px",
      fontSize: isMobile ? "14px" : "15px",
      fontWeight: "700",
      cursor: "pointer",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: `0 2px 8px rgba(0,0,0,0.1)`,
    },
    primaryButton: {
      padding: isMobile ? "14px 20px" : "16px 28px",
      border: "none",
      borderRadius: "8px",
      fontSize: isMobile ? "14px" : "15px",
      fontWeight: "700",
      cursor: "pointer",
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: `0 4px 16px ${colors.shadowDark}`,
    },
    tableContainer: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: "12px",
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      overflow: "auto",
      border: `1px solid ${colors.highlight}`,
      position: "relative",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "850px",
    },
    tableHeader: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
    },
    tableHeaderCell: {
      padding: isMobile ? "10px 8px" : "12px 16px",
      textAlign: "left",
      fontWeight: "800",
      fontSize: isMobile ? "12px" : "14px",
      borderBottom: `3px solid ${colors.secondary}`,
      color: colors.white,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      whiteSpace: "nowrap",
    },
    tableRow: {
      transition: "all 0.3s ease",
      borderBottom: `1px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
    },
    tableCell: {
      padding: isMobile ? "10px 8px" : "12px 16px",
      fontSize: isMobile ? "12px" : "14px",
      color: colors.dark,
      fontWeight: "500",
      whiteSpace: "nowrap",
    },
    statusButton: {
      padding: isMobile ? "10px 16px" : "12px 24px",
      border: "none",
      borderRadius: "20px",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "800",
      cursor: "pointer",
      transition: "all 0.3s ease",
      minWidth: isMobile ? "90px" : "110px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: `0 2px 8px rgba(0,0,0,0.2)`,
    },
    typeBadge: {
      padding: isMobile ? "6px 12px" : "8px 16px",
      borderRadius: "16px",
      fontSize: isMobile ? "11px" : "12px",
      fontWeight: "800",
      textAlign: "center",
      minWidth: isMobile ? "70px" : "80px",
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    mobileMenuButton: {
      display: isMobile ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      background: "none",
      border: "none",
      color: colors.white,
      cursor: "pointer",
      padding: "8px",
      borderRadius: "6px",
    },
    mobileFilters: {
      display: isMobile && showMobileMenu ? "flex" : "none",
      flexDirection: "column",
      gap: "12px",
      width: "100%",
      marginTop: "12px",
    },
    // Pagination Styles
    paginationContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "16px" : "20px 28px",
      borderTop: `1px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.white} 100%)`,
      gap: isMobile ? "16px" : "20px",
    },
    itemsPerPageContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: isMobile ? "12px" : "14px",
    },
    itemsPerPageSelect: {
      padding: "6px 12px",
      border: `1px solid ${colors.grayLighter}`,
      borderRadius: "6px",
      background: colors.white,
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "600",
      cursor: "pointer",
    },
    paginationLabel: {
      color: colors.grayDark,
      fontWeight: "600",
      fontSize: isMobile ? "12px" : "14px",
    },
    pageInfo: {
      color: colors.grayDark,
      fontWeight: "600",
      fontSize: isMobile ? "12px" : "14px",
      textAlign: "center",
    },
    paginationControls: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    paginationButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "8px" : "10px 14px",
      border: `1px solid ${colors.grayLighter}`,
      borderRadius: "6px",
      background: colors.white,
      color: colors.grayDark,
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "600",
      cursor: "pointer",
      minWidth: isMobile ? "32px" : "40px",
      transition: "all 0.2s ease",
    },
    paginationButtonActive: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      borderColor: colors.primaryDark,
    },
    paginationButtonDisabled: {
      background: colors.grayLighter,
      color: colors.grayLight,
      cursor: "not-allowed",
      opacity: 0.6,
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div
          style={{ textAlign: "center", padding: "40px", color: colors.gray }}
        >
          Loading Damages...
        </div>
      </div>
    );
  }

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
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <Truck size={isMobile ? 36 : 52} color={colors.white} />
          <div style={{ flex: 1 }}>
            <h1 style={styles.pageTitle}>DAMAGES (DMG)</h1>
            <p style={styles.pageSubtitle}>
              Manage and track goods received into inventory
            </p>
          </div>
          <button
            style={styles.mobileMenuButton}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={styles.statsContainer}>
        <div
          style={styles.statCard}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = `0 12px 32px ${colors.shadowDark}, 0 4px 16px rgba(0,0,0,0.2)`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`;
          }}
        >
          <p style={styles.statNumber}>{totalTransactions}</p>
          <p style={styles.statLabel}>TOTAL DAMAGES</p>
        </div>
        {/* <div 
          style={{
            ...styles.statCard,
            borderLeft: `4px solid ${colors.success}`
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = `0 12px 32px ${colors.shadowDark}, 0 4px 16px rgba(0,0,0,0.2)`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`;
          }}
        >
          <p style={{...styles.statNumber, color: colors.success}}>{inTransactions}</p>
          <p style={styles.statLabel}>STOCK IN</p>
        </div> */}
        <div
          style={{
            ...styles.statCard,
            borderLeft: `4px solid ${colors.error}`,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = `0 12px 32px ${colors.shadowDark}, 0 4px 16px rgba(0,0,0,0.2)`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`;
          }}
        >
          <p style={{ ...styles.statNumber, color: colors.error }}>
            {outTransactions}
          </p>
          <p style={styles.statLabel}>STOCK OUT</p>
        </div>
      </div>

      {/* Controls - Search, Filter and Add button */}
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Damages by ID, product, or reference..."
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

        <div style={styles.mobileFilters}>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              ...styles.filterSelect,
              background:
                typeFilter === "All"
                  ? `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`
                  : typeFilter === "IN"
                    ? `linear-gradient(135deg, ${colors.light} 0%, #d1fae5 100%)`
                    : `linear-gradient(135deg, ${colors.light} 0%, #fef3c7 100%)`,
              borderColor:
                typeFilter === "All"
                  ? colors.grayLighter
                  : typeFilter === "IN"
                    ? colors.success
                    : colors.warning,
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
            }}
          >
            <option value="All">All Types</option>
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
          </select>
        </div>

        {!isMobile && (
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              ...styles.filterSelect,
              background:
                typeFilter === "All"
                  ? `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`
                  : typeFilter === "IN"
                    ? `linear-gradient(135deg, ${colors.light} 0%, #d1fae5 100%)`
                    : `linear-gradient(135deg, ${colors.light} 0%, #fef3c7 100%)`,
              borderColor:
                typeFilter === "All"
                  ? colors.grayLighter
                  : typeFilter === "IN"
                    ? colors.success
                    : colors.warning,
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
            }}
          >
            <option value="All">All Types</option>
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
          </select>
        )}

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
            setFormTransaction({
              TransactionID: generateTransactionID(),
              ProductID: "",
              UserID: "",
              Quantity: "",
              TransactionType: "IN",
              ReferenceNo: "",
              Status: "Active",
              TransactionDate: new Date().toISOString().split("T")[0],
            });
            setEditingTransactionID(null);
            setShowForm(true);
            setErrorMsg("");
            setSuccessMsg("");
          }}
          disabled={isSubmitting}
        >
          <Plus size={isMobile ? 20 : 24} /> Add Damage
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div
            style={{
              ...styles.modalContent,
              maxWidth: isMobile ? "100%" : "800px",
              width: isMobile ? "100%" : "90vw",
              maxHeight: "95vh",
              overflow: "hidden",
            }}
          >
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingTransactionID
                  ? "EDIT DAMAGE RECORD"
                  : "ADD NEW DAMAGE RECORD"}
              </h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowForm(false);
                  setEditingTransactionID(null);
                  setErrorMsg("");
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                disabled={isSubmitting}
              >
                <X size={isMobile ? 24 : 28} />
              </button>
            </div>

            <div
              style={{
                ...styles.modalBody,
                maxHeight: "calc(95vh - 120px)",
                overflowY: "auto",
                padding: isMobile ? "16px 20px" : "20px 28px",
              }}
            >
              <form onSubmit={handleFormSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "16px" : "24px",
                    alignItems: "start",
                  }}
                >
                  {/* Left Column */}
                  <div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Damage ID</label>
                      <input
                        type="text"
                        value={formTransaction.TransactionID}
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
                      <label style={styles.label}>Product *</label>
                      <select
                        value={formTransaction.ProductID}
                        onChange={(e) =>
                          setFormTransaction({
                            ...formTransaction,
                            ProductID: e.target.value,
                          })
                        }
                        style={styles.select}
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select Product</option>
                        {products.map((p) => (
                          <option key={p.ProductID} value={p.ProductID}>
                            {p.ProductName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Quantity *</label>
                      <input
                        type="number"
                        value={formTransaction.Quantity}
                        onChange={(e) =>
                          setFormTransaction({
                            ...formTransaction,
                            Quantity: e.target.value,
                          })
                        }
                        style={styles.input}
                        placeholder="Enter quantity"
                        required
                        min="1"
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>User ID *</label>
                      <input
                        type="text"
                        value={formTransaction.UserID}
                        onChange={(e) =>
                          setFormTransaction({
                            ...formTransaction,
                            UserID: e.target.value,
                          })
                        }
                        style={styles.input}
                        placeholder="Enter User ID"
                        required
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Record Date *</label>
                      <input
                        type="date"
                        value={formTransaction.TransactionDate}
                        onChange={(e) =>
                          setFormTransaction({
                            ...formTransaction,
                            TransactionDate: e.target.value,
                          })
                        }
                        style={styles.input}
                        required
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* <div style={styles.formGroup}>
                      <label style={styles.label}>Reference No</label>
                      <input
                        type="text"
                        value={formTransaction.ReferenceNo}
                        onChange={(e) => setFormTransaction({ ...formTransaction, ReferenceNo: e.target.value })}
                        style={styles.input}
                        placeholder="Enter reference number"
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                        disabled={isSubmitting}
                      />
                    </div> */}
                  </div>
                </div>

                <div style={styles.buttonGroup}>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onMouseOver={(e) =>
                      !isSubmitting &&
                      (e.target.style.background = `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`)
                    }
                    onMouseOut={(e) =>
                      !isSubmitting &&
                      (e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`)
                    }
                    onClick={() => {
                      setShowForm(false);
                      setEditingTransactionID(null);
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      ...styles.primaryButton,
                      opacity: isSubmitting ? 0.6 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                    onMouseOver={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
                        e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
                        e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Saving..."
                      : editingTransactionID
                        ? "Update Damage"
                        : "Add Damage"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Damage ID</th>
              <th style={styles.tableHeaderCell}>Product Name</th>
              <th style={styles.tableHeaderCell}>Quantity</th>
              <th style={styles.tableHeaderCell}>Balance Quantity</th>
              <th style={styles.tableHeaderCell}>Type</th>
              <th style={styles.tableHeaderCell}>Date</th>
              <th style={styles.tableHeaderCell}>Reference No</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    ...styles.tableCell,
                    textAlign: "center",
                    padding: isMobile ? "40px" : "60px",
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
                    <Package
                      size={isMobile ? 48 : 72}
                      color={colors.grayLight}
                    />
                    <p
                      style={{
                        fontSize: isMobile ? "18px" : "20px",
                        margin: 0,
                        fontWeight: "700",
                        color: colors.grayDark,
                      }}
                    >
                      No Damages found
                    </p>
                    <p
                      style={{
                        fontSize: isMobile ? "12px" : "14px",
                        margin: 0,
                      }}
                    >
                      Try adjusting your search criteria or filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentItems.map((t) => {
                const product = products.find(
                  (p) => p.ProductID === t.ProductID,
                );
                return (
                  <tr
                    key={t.TransactionID}
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
                      #{t.TransactionID}
                    </td>
                    <td style={styles.tableCell}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: isMobile ? "8px" : "12px",
                        }}
                      >
                        <Package
                          size={isMobile ? 16 : 20}
                          color={colors.primary}
                        />
                        {product?.ProductName || t.ProductID}
                      </div>
                    </td>
                    <td
                      style={{
                        ...styles.tableCell,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {t.Quantity}
                    </td>
                    <td
                      style={{
                        ...styles.tableCell,
                        fontWeight: "700",
                        textAlign: "center",
                        color: colors.secondary,
                      }}
                    >
                      {t.BalanceQuantity || "0"}
                    </td>
                    <td style={styles.tableCell}>
                      <div
                        style={{
                          ...styles.typeBadge,
                          background:
                            t.TransactionType === "IN"
                              ? `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`
                              : `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
                          color: colors.white,
                        }}
                      >
                        {t.TransactionType === "IN" ? (
                          <ArrowUpCircle size={isMobile ? 12 : 14} />
                        ) : (
                          <ArrowDownCircle size={isMobile ? 12 : 14} />
                        )}
                        {t.TransactionType}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: isMobile ? "6px" : "8px",
                          color: colors.gray,
                        }}
                      >
                        <Calendar size={isMobile ? 14 : 16} />
                        {formatDate(t.TransactionDate)}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      {t.ReferenceNo || (
                        <span
                          style={{ color: colors.gray, fontStyle: "italic" }}
                        >
                          No reference
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {filteredTransactions.length > 0 && <PaginationControls />}
      </div>

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
      `}</style>
    </div>
  );
};

export default DMG;
