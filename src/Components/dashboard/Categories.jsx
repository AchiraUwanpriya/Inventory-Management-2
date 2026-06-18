// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Plus, Edit, Search, X, FolderOpen, BookOpen, ArrowLeft } from "lucide-react";
// import {
//   GetAllCategories,
//   AddCategoriesDetails,
//   PutCategoriesDetails,
// } from "../../Actions/actionsCategories";

// const Categories = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { responseBody, loading } = useSelector((state) => state.categories);

//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [showForm, setShowForm] = useState(false);
//   const [editingCategoryID, setEditingCategoryID] = useState(null);
//   const [formCategory, setFormCategory] = useState({
//     CategoryID: "",
//     CategoryName: "",
//     Status: "Active",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [isMobile, setIsMobile] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupProgress, setPopupProgress] = useState(100);

//   // Show popup message with auto-dismiss
//   const showPopupMessage = (msg, isError = false) => {
//     if (isError) {
//       setErrorMsg(msg);
//     } else {
//       setSuccessMsg(msg);
//     }
//     setShowPopup(true);
//     setPopupProgress(100);

//     const duration = 4000; // 4 seconds
//     const interval = 50; // Update every 50ms
//     const steps = duration / interval;
//     const decrement = 100 / steps;

//     const progressTimer = setInterval(() => {
//       setPopupProgress(prev => {
//         const newProgress = prev - decrement;
//         if (newProgress <= 0) {
//           clearInterval(progressTimer);
//           setShowPopup(false);
//           setErrorMsg("");
//           setSuccessMsg("");
//           return 0;
//         }
//         return newProgress;
//       });
//     }, interval);

//     // Fallback timer to ensure popup closes
//     setTimeout(() => {
//       setShowPopup(false);
//       setErrorMsg("");
//       setSuccessMsg("");
//       clearInterval(progressTimer);
//     }, duration + 500);
//   };

//   // Check screen size on mount and resize
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     return () => {
//       window.removeEventListener('resize', checkScreenSize);
//     };
//   }, []);

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
//     shadowDark: 'rgba(30, 64, 175, 0.2)',
//     shadowLight: 'rgba(16, 185, 129, 0.1)',
//     highlight: 'rgba(255, 255, 255, 0.9)',
//   };

//   useEffect(() => {
//     dispatch(GetAllCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (Array.isArray(responseBody)) {
//       const mapped = responseBody.map((c) => ({
//         CategoryID: c?.CategoryID || "",
//         CategoryName: c?.CategoryName || "",
//         Status:
//           c?.Status?.trim().toUpperCase() === "A"
//             ? "Active"
//             : c?.Status?.trim().toUpperCase() === "I"
//             ? "Inactive"
//             : c?.Status || "Active",
//       }));

//       // Sort by Category ID in descending order
//       const sorted = mapped.sort((a, b) => parseInt(b.CategoryID) - parseInt(a.CategoryID));
//       setCategories(sorted);
//     } else {
//       setCategories([]);
//     }
//   }, [responseBody]);

//   // Auto-increment Category ID for new categories
//   const getNextCategoryID = () => {
//     if (categories.length === 0) return "1";
//     const numericIDs = categories
//       .map((c) => parseInt(c.CategoryID, 10))
//       .filter((n) => !isNaN(n));
//     const maxID = Math.max(...numericIDs);
//     return String(maxID + 1);
//   };

//   const filteredCategories = categories.filter(
//     (c) =>
//       ((c.CategoryName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//        (c.CategoryID || "").toString().includes(searchTerm)) &&
//       (statusFilter === 'All' || c.Status === statusFilter)
//   );

//   // Calculate statistics
//   const activeCategories = categories.filter(c => c.Status === 'Active').length;
//   const inactiveCategories = categories.filter(c => c.Status === 'Inactive').length;

//   // Add / Edit category
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     if (!formCategory.CategoryName.trim()) {
//       showPopupMessage("⚠️ Category name is required!", true);
//       return;
//     }

//     // Check duplicates
//     const duplicate = categories.some(
//       (c) =>
//         c.CategoryName.trim().toLowerCase() ===
//           formCategory.CategoryName.trim().toLowerCase() &&
//         c.CategoryID !== editingCategoryID
//     );

//     if (duplicate) {
//       showPopupMessage("⚠️ This category already exists!", true);
//       return;
//     }

//     const payload = {
//       CategoryID: formCategory.CategoryID,
//       CategoryName: formCategory.CategoryName.trim(),
//       Status: formCategory.Status === "Active" ? "A" : "I",
//     };

//     try {
//       if (editingCategoryID) {
//         await dispatch(PutCategoriesDetails(payload));
//         setEditingCategoryID(null);
//         showPopupMessage("✅ Category updated successfully!");
//       } else {
//         await dispatch(AddCategoriesDetails(payload));
//         showPopupMessage("✅ Category added successfully!");
//       }

//       await dispatch(GetAllCategories());

//       setFormCategory({ CategoryID: "", CategoryName: "", Status: "Active" });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Failed to save category:", error);
//       showPopupMessage("❌ Failed to save category!", true);
//     }
//   };

//   // Edit category - Only status can be changed
//   const handleEditCategory = (category) => {
//     setFormCategory({
//       ...category,
//     });
//     setEditingCategoryID(category.CategoryID);
//     setShowForm(true);
//     setErrorMsg("");
//     setSuccessMsg("");
//   };

//   // Toggle Active/Inactive status
//   const handleToggleStatus = async (category) => {
//     const updatedStatus = category.Status === "Active" ? "Inactive" : "Active";

//     const payload = {
//       CategoryID: category.CategoryID,
//       CategoryName: category.CategoryName,
//       Status: updatedStatus === "Active" ? "A" : "I",
//     };

//     try {
//       await dispatch(PutCategoriesDetails(payload));
//       await dispatch(GetAllCategories());
//       showPopupMessage(`✅ Category ${updatedStatus.toLowerCase()} successfully!`);
//     } catch (error) {
//       console.error("Failed to toggle status:", error);
//       showPopupMessage("❌ Failed to update status!", true);
//     }
//   };

//   // Base Styles
//   const baseStyles = {
//     container: {
//       minHeight: '100vh',
//       background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
//       padding: '24px',
//       fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//     },
//     header: {
//       background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
//       padding: '32px',
//       borderRadius: '16px',
//       marginBottom: '28px',
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
//       gap: '20px'
//     },
//     pageTitle: {
//       fontSize: '36px',
//       fontWeight: '800',
//       color: colors.white,
//       margin: 0,
//       textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
//     },
//     pageSubtitle: {
//       fontSize: '18px',
//       color: colors.highlight,
//       margin: '6px 0 0 0',
//       fontWeight: '500'
//     },
//     // Popup Notification Styles
//     popupContainer: {
//       position: 'fixed',
//       top: '20px',
//       left: '50%',
//       transform: 'translateX(-50%)',
//       zIndex: 9999,
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       borderRadius: '12px',
//       boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
//       border: `1px solid ${colors.highlight}`,
//       minWidth: isMobile ? '300px' : '400px',
//       maxWidth: '90vw',
//       overflow: 'hidden',
//       animation: 'slideDown 0.3s ease-out'
//     },
//     popupProgressBar: {
//       height: '4px',
//       background: errorMsg
//         ? `linear-gradient(90deg, ${colors.error} 0%, #dc2626 100%)`
//         : `linear-gradient(90deg, ${colors.success} 0%, #059669 100%)`,
//       width: `${popupProgress}%`,
//       transition: 'width 50ms linear'
//     },
//     popupContent: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: isMobile ? '14px 20px' : '18px 28px',
//       gap: '12px',
//       background: errorMsg
//         ? `linear-gradient(135deg, ${colors.error} 0%, #dc2626 100%)`
//         : `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
//       color: colors.white
//     },
//     popupMessage: {
//       flex: 1,
//       fontWeight: '600',
//       fontSize: isMobile ? '14px' : '16px',
//       margin: 0
//     },
//     popupCloseButton: {
//       background: 'none',
//       border: 'none',
//       color: colors.white,
//       cursor: 'pointer',
//       padding: '4px',
//       borderRadius: '4px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       transition: 'all 0.3s ease'
//     },
//     statsContainer: {
//       display: 'flex',
//       gap: '24px',
//       marginBottom: '28px',
//       flexWrap: 'wrap'
//     },
//     statCard: {
//       flex: '1',
//       minWidth: '220px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       padding: '28px',
//       borderRadius: '16px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`,
//       border: `1px solid ${colors.highlight}`,
//       textAlign: 'center',
//       position: 'relative',
//       overflow: 'hidden',
//       transition: 'all 0.3s ease'
//     },
//     statNumber: {
//       fontSize: '42px',
//       fontWeight: '800',
//       color: colors.primaryDark,
//       margin: '0 0 10px 0',
//       textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
//     },
//     statLabel: {
//       fontSize: '16px',
//       color: colors.grayDark,
//       margin: 0,
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     controls: {
//       display: 'flex',
//       gap: '24px',
//       alignItems: 'center',
//       marginBottom: '28px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       padding: '28px',
//       borderRadius: '16px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}`,
//       border: `1px solid ${colors.highlight}`,
//       position: 'relative'
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
//       padding: '18px 24px 18px 56px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '12px',
//       fontSize: '18px',
//       width: '100%',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     searchIcon: {
//       position: 'absolute',
//       left: '24px',
//       color: colors.primary,
//       fontSize: '20px'
//     },
//     filterSelect: {
//       padding: '18px 24px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '12px',
//       fontSize: '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       cursor: 'pointer',
//       fontWeight: '600',
//       minWidth: '200px',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       transition: 'all 0.3s ease',
//       marginLeft: 'auto'
//     },
//     addButton: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
//       color: colors.white,
//       border: 'none',
//       borderRadius: '12px',
//       padding: '18px 32px',
//       fontSize: '18px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       boxShadow: `0 4px 16px ${colors.shadowDark}`,
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
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
//       padding: '20px',
//       backdropFilter: 'blur(8px)'
//     },
//     modalContent: {
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       borderRadius: '20px',
//       boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
//       width: '100%',
//       maxWidth: '520px',
//       maxHeight: '90vh',
//       overflow: 'auto',
//       border: `2px solid ${colors.highlight}`,
//       position: 'relative'
//     },
//     modalHeader: {
//       padding: '28px',
//       borderBottom: `2px solid ${colors.grayLighter}`,
//       background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     },
//     modalTitle: {
//       fontSize: '26px',
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
//       padding: '28px'
//     },
//     formGroup: {
//       marginBottom: '24px'
//     },
//     label: {
//       display: 'block',
//       marginBottom: '10px',
//       fontWeight: '700',
//       color: colors.dark,
//       fontSize: '16px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     input: {
//       width: '100%',
//       padding: '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       boxSizing: 'border-box',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     select: {
//       width: '100%',
//       padding: '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       cursor: 'pointer',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500',
//       transition: 'all 0.3s ease'
//     },
//     buttonGroup: {
//       display: 'flex',
//       gap: '16px',
//       justifyContent: 'flex-end',
//       marginTop: '32px'
//     },
//     secondaryButton: {
//       padding: '16px 28px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: '18px',
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
//       padding: '16px 28px',
//       border: 'none',
//       borderRadius: '10px',
//       fontSize: '18px',
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
//       borderRadius: '16px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}`,
//       overflow: 'hidden',
//       border: `1px solid ${colors.highlight}`,
//       position: 'relative'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse'
//     },
//     tableHeader: {
//       background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`
//     },
//     tableHeaderCell: {
//       padding: '22px 28px',
//       textAlign: 'left',
//       fontWeight: '800',
//       fontSize: '16px',
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
//       padding: '22px 28px',
//       fontSize: '16px',
//       color: colors.dark,
//       fontWeight: '500'
//     },
//     statusButton: {
//       padding: '12px 24px',
//       border: 'none',
//       borderRadius: '25px',
//       fontSize: '14px',
//       fontWeight: '800',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       minWidth: '110px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       boxShadow: `0 2px 8px rgba(0,0,0,0.2)`
//     },
//     actionButton: {
//       padding: '12px',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
//       color: colors.white,
//       boxShadow: `0 2px 8px ${colors.shadowDark}`
//     }
//   };

//   // Mobile-specific style overrides
//   const getResponsiveStyles = () => {
//     if (!isMobile) return baseStyles;

//     return {
//       ...baseStyles,
//       container: {
//         ...baseStyles.container,
//         padding: '16px'
//       },
//       header: {
//         ...baseStyles.header,
//         padding: '24px 20px'
//       },
//       headerContent: {
//         ...baseStyles.headerContent,
//         gap: '16px'
//       },
//       pageTitle: {
//         ...baseStyles.pageTitle,
//         fontSize: '28px'
//       },
//       pageSubtitle: {
//         ...baseStyles.pageSubtitle,
//         fontSize: '16px'
//       },
//       statsContainer: {
//         ...baseStyles.statsContainer,
//         gap: '16px',
//         marginBottom: '20px'
//       },
//       statCard: {
//         ...baseStyles.statCard,
//         flex: '1 1 100%',
//         minWidth: 'auto',
//         padding: '20px'
//       },
//       statNumber: {
//         ...baseStyles.statNumber,
//         fontSize: '32px'
//       },
//       statLabel: {
//         ...baseStyles.statLabel,
//         fontSize: '14px'
//       },
//       controls: {
//         ...baseStyles.controls,
//         flexDirection: 'column',
//         gap: '16px',
//         padding: '20px',
//         marginBottom: '20px'
//       },
//       searchInput: {
//         ...baseStyles.searchInput,
//         padding: '16px 20px 16px 48px',
//         fontSize: '16px'
//       },
//       searchIcon: {
//         ...baseStyles.searchIcon,
//         left: '16px'
//       },
//       filterSelect: {
//         ...baseStyles.filterSelect,
//         padding: '16px 20px',
//         fontSize: '16px',
//         minWidth: 'auto',
//         width: '100%',
//         marginLeft: '0'
//       },
//       addButton: {
//         ...baseStyles.addButton,
//         padding: '16px 24px',
//         fontSize: '16px',
//         width: '100%',
//         justifyContent: 'center'
//       },
//       modalContent: {
//         ...baseStyles.modalContent,
//         margin: '10px'
//       },
//       modalHeader: {
//         ...baseStyles.modalHeader,
//         padding: '20px'
//       },
//       modalTitle: {
//         ...baseStyles.modalTitle,
//         fontSize: '22px'
//       },
//       modalBody: {
//         ...baseStyles.modalBody,
//         padding: '20px'
//       },
//       input: {
//         ...baseStyles.input,
//         padding: '14px 16px',
//         fontSize: '16px'
//       },
//       select: {
//         ...baseStyles.select,
//         padding: '14px 16px',
//         fontSize: '16px'
//       },
//       secondaryButton: {
//         ...baseStyles.secondaryButton,
//         padding: '14px 20px',
//         fontSize: '16px',
//         flex: '1'
//       },
//       primaryButton: {
//         ...baseStyles.primaryButton,
//         padding: '14px 20px',
//         fontSize: '16px',
//         flex: '1'
//       },
//       buttonGroup: {
//         ...baseStyles.buttonGroup,
//         gap: '12px'
//       },
//       tableHeaderCell: {
//         ...baseStyles.tableHeaderCell,
//         padding: '16px 12px',
//         fontSize: '14px'
//       },
//       tableCell: {
//         ...baseStyles.tableCell,
//         padding: '16px 12px',
//         fontSize: '14px'
//       },
//       statusButton: {
//         ...baseStyles.statusButton,
//         padding: '8px 16px',
//         fontSize: '12px',
//         minWidth: '80px'
//       }
//     };
//   };

//   const styles = getResponsiveStyles();

//   return (
//     <div style={styles.container}>
//       {/* Popup Notification */}
//       {showPopup && (
//         <div style={styles.popupContainer}>
//           <div style={styles.popupProgressBar} />
//           <div style={styles.popupContent}>
//             <span style={styles.popupMessage}>{errorMsg || successMsg}</span>
//             <button
//               style={styles.popupCloseButton}
//               onClick={() => {
//                 setShowPopup(false);
//                 setErrorMsg("");
//                 setSuccessMsg("");
//               }}
//               onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
//               onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
//             >
//               <X size={16} />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Page Header */}
//       <div style={styles.header}>
//         <div style={styles.headerContent}>
//           <BookOpen size={isMobile ? 40 : 52} color={colors.white} />
//           <div>
//             <h1 style={styles.pageTitle}>CATEGORIES MANAGEMENT</h1>
//             <p style={styles.pageSubtitle}>Manage product categories and their status across the system</p>
//           </div>
//         </div>
//       </div>

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
//           <p style={styles.statNumber}>{categories.length}</p>
//           <p style={styles.statLabel}>TOTAL CATEGORIES</p>
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
//           <p style={{...styles.statNumber, color: colors.success}}>{activeCategories}</p>
//           <p style={styles.statLabel}>ACTIVE CATEGORIES</p>
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
//           <p style={{...styles.statNumber, color: colors.error}}>{inactiveCategories}</p>
//           <p style={styles.statLabel}>INACTIVE CATEGORIES</p>
//         </div>
//       </div>

//       {/* Controls - Search, Filter and Add button */}
//       <div style={styles.controls}>
//         <div style={styles.searchBox}>
//           <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder="Search categories by name or ID..."
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

//         <select
//           value={statusFilter}
//           onChange={e => setStatusFilter(e.target.value)}
//           style={{
//             ...styles.filterSelect,
//             background: statusFilter === 'All' ?
//               `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)` :
//               statusFilter === 'Active' ?
//               `linear-gradient(135deg, ${colors.light} 0%, #d1fae5 100%)` :
//               `linear-gradient(135deg, ${colors.light} 0%, #fef3c7 100%)`,
//             borderColor: statusFilter === 'All' ? colors.grayLighter :
//                        statusFilter === 'Active' ? colors.success : colors.warning
//           }}
//           onFocus={(e) => {
//             e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//           }}
//           onBlur={(e) => {
//             e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//           }}
//         >
//           <option value="All">All Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>

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
//             setFormCategory({
//               CategoryID: getNextCategoryID(),
//               CategoryName: "",
//               Status: "Active",
//             });
//             setEditingCategoryID(null);
//             setShowForm(true);
//             setErrorMsg("");
//             setSuccessMsg("");
//           }}
//         >
//           <Plus size={isMobile ? 20 : 24} /> Add New Category
//         </button>
//       </div>

//       {/* Form Modal */}
//       {showForm && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <div style={styles.modalHeader}>
//               <h3 style={styles.modalTitle}>
//                 {editingCategoryID ? "EDIT CATEGORY STATUS" : "ADD NEW CATEGORY"}
//               </h3>
//               <button
//                 style={styles.closeButton}
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingCategoryID(null);
//                   setErrorMsg("");
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
//               >
//                 <X size={isMobile ? 24 : 28} />
//               </button>
//             </div>

//             <div style={styles.modalBody}>
//               <form onSubmit={handleFormSubmit}>
//                 {!editingCategoryID && (
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Category Name *</label>
//                     <input
//                       type="text"
//                       value={formCategory.CategoryName}
//                       onChange={(e) =>
//                         setFormCategory({
//                           ...formCategory,
//                           CategoryName: e.target.value,
//                         })
//                       }
//                       style={styles.input}
//                       placeholder="e.g., Travel Bags, Electronics, Clothing"
//                       required
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
//                 )}

//                 {editingCategoryID && (
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Category Name</label>
//                     <input
//                       type="text"
//                       value={formCategory.CategoryName}
//                       disabled
//                       style={{
//                         ...styles.input,
//                         backgroundColor: colors.grayLighter,
//                         color: colors.grayDark,
//                         cursor: 'not-allowed'
//                       }}
//                     />
//                     <p style={{ fontSize: '14px', color: colors.gray, margin: '8px 0 0 0' }}>
//                       Category name cannot be modified after creation
//                     </p>
//                   </div>
//                 )}

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Status</label>
//                   <select
//                     value={formCategory.Status}
//                     onChange={(e) =>
//                       setFormCategory({
//                         ...formCategory,
//                         Status: e.target.value,
//                       })
//                     }
//                     style={{
//                       ...styles.select,
//                       background: formCategory.Status === 'Active' ?
//                         `linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)` :
//                         `linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)`,
//                       borderColor: formCategory.Status === 'Active' ? colors.success : colors.warning,
//                       color: colors.dark
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                     }}
//                   >
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                   </select>
//                 </div>

//                 <div style={styles.buttonGroup}>
//                   <button
//                     type="button"
//                     style={styles.secondaryButton}
//                     onMouseOver={(e) => {
//                       e.target.style.background = `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`;
//                       e.target.style.color = colors.white;
//                     }}
//                     onMouseOut={(e) => {
//                       e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
//                       e.target.style.color = colors.grayDark;
//                     }}
//                     onClick={() => {
//                       setShowForm(false);
//                       setEditingCategoryID(null);
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     style={styles.primaryButton}
//                     onMouseOver={(e) => {
//                       e.target.style.transform = 'translateY(-2px)';
//                       e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//                       e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
//                     }}
//                     onMouseOut={(e) => {
//                       e.target.style.transform = 'translateY(0)';
//                       e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
//                       e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
//                     }}
//                   >
//                     {editingCategoryID ? "Update Status" : "Create Category"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Categories Table */}
//       <div style={styles.tableContainer}>
//         {isMobile ? (
//           // Mobile view: Card layout
//           <div style={{ padding: '16px' }}>
//             {loading ? (
//               <div style={{textAlign: 'center', padding: '40px'}}>
//                 <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
//                   <div style={{
//                     width: '28px',
//                     height: '28px',
//                     border: '3px solid #f0fdf4',
//                     borderTop: '3px solid #10b981',
//                     borderRadius: '50%',
//                     animation: 'spin 1s linear infinite'
//                   }}></div>
//                   <span style={{fontWeight: '600', color: colors.primary, fontSize: '16px'}}>Loading categories...</span>
//                 </div>
//               </div>
//             ) : filteredCategories.length > 0 ? (
//               filteredCategories.map((category) => (
//                 <div
//                   key={category.CategoryID}
//                   style={{
//                     background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//                     borderRadius: '12px',
//                     padding: '20px',
//                     marginBottom: '16px',
//                     boxShadow: `0 4px 12px ${colors.shadowDark}`,
//                     border: `1px solid ${colors.highlight}`,
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseOver={(e) => {
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                     e.currentTarget.style.boxShadow = `0 8px 20px ${colors.shadowDark}`;
//                   }}
//                   onMouseOut={(e) => {
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.boxShadow = `0 4px 12px ${colors.shadowDark}`;
//                   }}
//                 >
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
//                     <div>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
//                         <FolderOpen size={16} color={colors.primary} />
//                         <span style={{ fontSize: '16px', fontWeight: '700', color: colors.primaryDark }}>
//                           #{category.CategoryID}
//                         </span>
//                       </div>
//                       <div style={{ fontSize: '18px', fontWeight: '600', color: colors.dark }}>
//                         {category.CategoryName}
//                       </div>
//                     </div>
//                     <button
//                       style={{
//                         ...styles.actionButton,
//                         padding: '8px'
//                       }}
//                       onClick={() => handleEditCategory(category)}
//                       title="Edit category status"
//                     >
//                       <Edit size={16} />
//                     </button>
//                   </div>

//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
//                     <button
//                       style={{
//                         ...styles.statusButton,
//                         background: category.Status === "Active" ?
//                           `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)` :
//                           `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
//                         color: colors.white,
//                         flex: 1,
//                         marginRight: '12px'
//                       }}
//                       onClick={() => handleToggleStatus(category)}
//                     >
//                       {category.Status}
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div style={{textAlign: 'center', padding: '40px', color: colors.gray}}>
//                 <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
//                   <FolderOpen size={48} color={colors.grayLight} />
//                   <p style={{fontSize: '18px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No categories found</p>
//                   <p style={{fontSize: '14px', margin: 0}}>Try adjusting your search criteria or filters</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           // Desktop view: Table layout
//           <table style={styles.table}>
//             <thead style={styles.tableHeader}>
//               <tr>
//                 <th style={styles.tableHeaderCell}>Category ID</th>
//                 <th style={styles.tableHeaderCell}>Category Name</th>
//                 <th style={styles.tableHeaderCell}>Status</th>
//                 <th style={styles.tableHeaderCell}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={4} style={{...styles.tableCell, textAlign: 'center', padding: '60px'}}>
//                     <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
//                       <div style={{
//                         width: '28px',
//                         height: '28px',
//                         border: '3px solid #f0fdf4',
//                         borderTop: '3px solid #10b981',
//                         borderRadius: '50%',
//                         animation: 'spin 1s linear infinite'
//                       }}></div>
//                       <span style={{fontWeight: '600', color: colors.primary, fontSize: '18px'}}>Loading categories...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredCategories.length > 0 ? (
//                 filteredCategories.map((category) => (
//                   <tr
//                     key={category.CategoryID}
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
//                     <td style={{...styles.tableCell, fontWeight: '700', color: colors.primaryDark}}>#{category.CategoryID}</td>
//                     <td style={{...styles.tableCell, fontWeight: '600'}}>
//                       <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
//                         <FolderOpen size={20} color={colors.primary} />
//                         {category.CategoryName}
//                       </div>
//                     </td>
//                     <td style={styles.tableCell}>
//                       <button
//                         style={{
//                           ...styles.statusButton,
//                           background: category.Status === "Active" ?
//                             `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)` :
//                             `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
//                           color: colors.white
//                         }}
//                         onMouseOver={(e) => {
//                           e.target.style.transform = 'scale(1.1)';
//                           e.target.style.boxShadow = `0 4px 16px rgba(0,0,0,0.3)`;
//                         }}
//                         onMouseOut={(e) => {
//                           e.target.style.transform = 'scale(1)';
//                           e.target.style.boxShadow = `0 2px 8px rgba(0,0,0,0.2)`;
//                         }}
//                         onClick={() => handleToggleStatus(category)}
//                       >
//                         {category.Status}
//                       </button>
//                     </td>
//                     <td style={styles.tableCell}>
//                       <button
//                         style={styles.actionButton}
//                         onMouseOver={(e) => {
//                           e.target.style.transform = 'scale(1.1)';
//                           e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//                           e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
//                         }}
//                         onMouseOut={(e) => {
//                           e.target.style.transform = 'scale(1)';
//                           e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
//                           e.target.style.boxShadow = `0 2px 8px ${colors.shadowDark}`;
//                         }}
//                         onClick={() => handleEditCategory(category)}
//                         title="Edit category status"
//                       >
//                         <Edit size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={4} style={{...styles.tableCell, textAlign: 'center', padding: '60px'}}>
//                     <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: colors.gray}}>
//                       <FolderOpen size={72} color={colors.grayLight} />
//                       <p style={{fontSize: '20px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No categories found</p>
//                       <p style={{fontSize: '16px', margin: 0}}>Try adjusting your search criteria or filters</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         @keyframes slideDown {
//           from {
//             transform: translateX(-50%) translateY(-100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(-50%) translateY(0);
//             opacity: 1;
//           }
//         }

//         @keyframes slideUp {
//           from {
//             transform: translateX(-50%) translateY(0);
//             opacity: 1;
//           }
//           to {
//             transform: translateX(-50%) translateY(-100%);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Categories;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Search,
  X,
  FolderOpen,
  BookOpen,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  GetAllCategories,
  AddCategoriesDetails,
  PutCategoriesDetails,
} from "../../Actions/actionsCategories";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responseBody, loading } = useSelector((state) => state.categories);

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingCategoryID, setEditingCategoryID] = useState(null);
  const [formCategory, setFormCategory] = useState({
    CategoryID: "",
    CategoryName: "",
    Status: "Active",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupProgress, setPopupProgress] = useState(100);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

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
    shadowDark: "rgba(30, 64, 175, 0.2)",
    shadowLight: "rgba(16, 185, 129, 0.1)",
    highlight: "rgba(255, 255, 255, 0.9)",
  };

  useEffect(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(responseBody)) {
      const mapped = responseBody.map((c) => ({
        CategoryID: c?.CategoryID || "",
        CategoryName: c?.CategoryName || "",
        Status:
          c?.Status?.trim().toUpperCase() === "A"
            ? "Active"
            : c?.Status?.trim().toUpperCase() === "I"
              ? "Inactive"
              : c?.Status || "Active",
      }));

      // Sort by Category ID in descending order
      const sorted = mapped.sort(
        (a, b) => parseInt(b.CategoryID) - parseInt(a.CategoryID),
      );
      setCategories(sorted);
    } else {
      setCategories([]);
    }
  }, [responseBody]);

  // Auto-increment Category ID for new categories
  const getNextCategoryID = () => {
    if (categories.length === 0) return "1";
    const numericIDs = categories
      .map((c) => parseInt(c.CategoryID, 10))
      .filter((n) => !isNaN(n));
    const maxID = Math.max(...numericIDs);
    return String(maxID + 1);
  };

  const filteredCategories = categories.filter(
    (c) =>
      ((c.CategoryName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        (c.CategoryID || "").toString().includes(searchTerm)) &&
      (statusFilter === "All" || c.Status === statusFilter),
  );

  // Pagination calculations
  const totalItems = filteredCategories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredCategories.slice(startIndex, endIndex);

  // Calculate statistics
  const activeCategories = categories.filter(
    (c) => c.Status === "Active",
  ).length;
  const inactiveCategories = categories.filter(
    (c) => c.Status === "Inactive",
  ).length;

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Add / Edit category
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formCategory.CategoryName.trim()) {
      showPopupMessage("⚠️ Category name is required!", true);
      return;
    }

    // Check duplicates
    const duplicate = categories.some(
      (c) =>
        c.CategoryName.trim().toLowerCase() ===
          formCategory.CategoryName.trim().toLowerCase() &&
        c.CategoryID !== editingCategoryID,
    );

    if (duplicate) {
      showPopupMessage("⚠️ This category already exists!", true);
      return;
    }

    const payload = {
      CategoryID: formCategory.CategoryID,
      CategoryName: formCategory.CategoryName.trim(),
      Status: formCategory.Status === "Active" ? "A" : "I",
    };

    try {
      if (editingCategoryID) {
        await dispatch(PutCategoriesDetails(payload));
        setEditingCategoryID(null);
        showPopupMessage("✅ Category updated successfully!");
      } else {
        await dispatch(AddCategoriesDetails(payload));
        showPopupMessage("✅ Category added successfully!");
      }

      await dispatch(GetAllCategories());

      setFormCategory({ CategoryID: "", CategoryName: "", Status: "Active" });
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save category:", error);
      showPopupMessage("❌ Failed to save category!", true);
    }
  };

  // Edit category - Only status can be changed
  const handleEditCategory = (category) => {
    setFormCategory({
      ...category,
    });
    setEditingCategoryID(category.CategoryID);
    setShowForm(true);
    setErrorMsg("");
    setSuccessMsg("");
  };

  // Toggle Active/Inactive status
  const handleToggleStatus = async (category) => {
    const updatedStatus = category.Status === "Active" ? "Inactive" : "Active";

    const payload = {
      CategoryID: category.CategoryID,
      CategoryName: category.CategoryName,
      Status: updatedStatus === "Active" ? "A" : "I",
    };

    try {
      await dispatch(PutCategoriesDetails(payload));
      await dispatch(GetAllCategories());
      showPopupMessage(
        `✅ Category ${updatedStatus.toLowerCase()} successfully!`,
      );
    } catch (error) {
      console.error("Failed to toggle status:", error);
      showPopupMessage("❌ Failed to update status!", true);
    }
  };

  // Base Styles
  const baseStyles = {
    container: {
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
      padding: "24px",
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
      padding: "32px",
      borderRadius: "16px",
      marginBottom: "28px",
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
      gap: "20px",
    },
    pageTitle: {
      fontSize: "36px",
      fontWeight: "800",
      color: colors.white,
      margin: 0,
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    },
    pageSubtitle: {
      fontSize: "18px",
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
      fontSize: isMobile ? "14px" : "16px",
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
      gap: "24px",
      marginBottom: "28px",
      flexWrap: "wrap",
    },
    statCard: {
      flex: "1",
      minWidth: "220px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: "28px",
      borderRadius: "16px",
      boxShadow: `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`,
      border: `1px solid ${colors.highlight}`,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
    },
    statNumber: {
      fontSize: "42px",
      fontWeight: "800",
      color: colors.primaryDark,
      margin: "0 0 10px 0",
      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    },
    statLabel: {
      fontSize: "16px",
      color: colors.grayDark,
      margin: 0,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    controls: {
      display: "flex",
      gap: "24px",
      alignItems: "center",
      marginBottom: "28px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: "28px",
      borderRadius: "16px",
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
      position: "relative",
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
      padding: "18px 24px 18px 48px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "12px",
      fontSize: "18px",
      width: "100%",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: "all 0.3s ease",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: "500",
    },
    searchIcon: {
      position: "absolute",
      left: "16px",
      color: colors.primary,
      fontSize: "20px",
    },
    filterSelect: {
      padding: "18px 24px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "12px",
      fontSize: "18px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: "pointer",
      fontWeight: "600",
      minWidth: "200px",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      transition: "all 0.3s ease",
      marginLeft: "auto",
    },
    addButton: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      border: "none",
      borderRadius: "12px",
      padding: "18px 32px",
      fontSize: "18px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: `0 4px 16px ${colors.shadowDark}`,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
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
      padding: "20px",
      backdropFilter: "blur(8px)",
    },
    modalContent: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: "20px",
      boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
      width: "100%",
      maxWidth: "520px",
      maxHeight: "90vh",
      overflow: "auto",
      border: `2px solid ${colors.highlight}`,
      position: "relative",
    },
    modalHeader: {
      padding: "28px",
      borderBottom: `2px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: "26px",
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
      padding: "28px",
    },
    formGroup: {
      marginBottom: "24px",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      fontWeight: "700",
      color: colors.dark,
      fontSize: "16px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      padding: "16px 20px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "10px",
      fontSize: "18px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: "500",
    },
    select: {
      width: "100%",
      padding: "16px 20px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "10px",
      fontSize: "18px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: "pointer",
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
      justifyContent: "flex-end",
      marginTop: "32px",
    },
    secondaryButton: {
      padding: "16px 28px",
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: "10px",
      fontSize: "18px",
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
      padding: "16px 28px",
      border: "none",
      borderRadius: "10px",
      fontSize: "18px",
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
      borderRadius: "16px",
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      overflow: "hidden",
      border: `1px solid ${colors.highlight}`,
      position: "relative",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
    },
    tableHeaderCell: {
      padding: "22px 28px",
      textAlign: "left",
      fontWeight: "800",
      fontSize: "16px",
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
      padding: "22px 28px",
      fontSize: "16px",
      color: colors.dark,
      fontWeight: "500",
    },
    statusButton: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "25px",
      fontSize: "14px",
      fontWeight: "800",
      cursor: "pointer",
      transition: "all 0.3s ease",
      minWidth: "110px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: `0 2px 8px rgba(0,0,0,0.2)`,
    },
    actionButton: {
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
      color: colors.white,
      boxShadow: `0 2px 8px ${colors.shadowDark}`,
    },
    // Pagination Styles
    paginationContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 28px",
      background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
      borderTop: `1px solid ${colors.highlight}`,
      flexWrap: "wrap",
      gap: "16px",
    },
    paginationInfo: {
      fontSize: "14px",
      color: colors.grayDark,
      fontWeight: "600",
    },
    paginationControls: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    paginationButton: {
      padding: "10px 16px",
      border: `1px solid ${colors.grayLighter}`,
      borderRadius: "8px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "14px",
    },
    paginationButtonActive: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      borderColor: colors.primary,
    },
    paginationButtonDisabled: {
      background: colors.grayLighter,
      color: colors.grayLight,
      cursor: "not-allowed",
      opacity: 0.6,
    },
    itemsPerPageSelect: {
      padding: "10px 16px",
      border: `1px solid ${colors.grayLighter}`,
      borderRadius: "8px",
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      marginLeft: "16px",
    },
  };

  // Mobile-specific style overrides
  const getResponsiveStyles = () => {
    if (!isMobile) return baseStyles;

    return {
      ...baseStyles,
      container: {
        ...baseStyles.container,
        padding: "16px",
      },
      header: {
        ...baseStyles.header,
        padding: "24px 20px",
      },
      headerContent: {
        ...baseStyles.headerContent,
        gap: "16px",
      },
      pageTitle: {
        ...baseStyles.pageTitle,
        fontSize: "28px",
      },
      pageSubtitle: {
        ...baseStyles.pageSubtitle,
        fontSize: "16px",
      },
      statsContainer: {
        ...baseStyles.statsContainer,
        gap: "16px",
        marginBottom: "20px",
      },
      statCard: {
        ...baseStyles.statCard,
        flex: "1 1 100%",
        minWidth: "auto",
        padding: "20px",
      },
      statNumber: {
        ...baseStyles.statNumber,
        fontSize: "32px",
      },
      statLabel: {
        ...baseStyles.statLabel,
        fontSize: "14px",
      },
      controls: {
        ...baseStyles.controls,
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        marginBottom: "20px",
      },
      searchInput: {
        ...baseStyles.searchInput,
        padding: "16px 20px 16px 40px",
        fontSize: "16px",
      },
      searchIcon: {
        ...baseStyles.searchIcon,
        left: "16px",
      },
      filterSelect: {
        ...baseStyles.filterSelect,
        padding: "16px 20px",
        fontSize: "16px",
        minWidth: "auto",
        width: "100%",
        marginLeft: "0",
      },
      addButton: {
        ...baseStyles.addButton,
        padding: "16px 24px",
        fontSize: "16px",
        width: "100%",
        justifyContent: "center",
      },
      modalContent: {
        ...baseStyles.modalContent,
        margin: "10px",
      },
      modalHeader: {
        ...baseStyles.modalHeader,
        padding: "20px",
      },
      modalTitle: {
        ...baseStyles.modalTitle,
        fontSize: "22px",
      },
      modalBody: {
        ...baseStyles.modalBody,
        padding: "20px",
      },
      input: {
        ...baseStyles.input,
        padding: "14px 16px",
        fontSize: "16px",
      },
      select: {
        ...baseStyles.select,
        padding: "14px 16px",
        fontSize: "16px",
      },
      secondaryButton: {
        ...baseStyles.secondaryButton,
        padding: "14px 20px",
        fontSize: "16px",
        flex: "1",
      },
      primaryButton: {
        ...baseStyles.primaryButton,
        padding: "14px 20px",
        fontSize: "16px",
        flex: "1",
      },
      buttonGroup: {
        ...baseStyles.buttonGroup,
        gap: "12px",
      },
      tableHeaderCell: {
        ...baseStyles.tableHeaderCell,
        padding: "16px 12px",
        fontSize: "14px",
      },
      tableCell: {
        ...baseStyles.tableCell,
        padding: "16px 12px",
        fontSize: "14px",
      },
      statusButton: {
        ...baseStyles.statusButton,
        padding: "8px 16px",
        fontSize: "12px",
        minWidth: "80px",
      },
      paginationContainer: {
        ...baseStyles.paginationContainer,
        flexDirection: "column",
        gap: "16px",
        padding: "16px 20px",
      },
      paginationControls: {
        ...baseStyles.paginationControls,
        flexWrap: "wrap",
        justifyContent: "center",
      },
      paginationButton: {
        ...baseStyles.paginationButton,
        padding: "8px 12px",
        fontSize: "12px",
      },
    };
  };

  const styles = getResponsiveStyles();

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
          <BookOpen size={isMobile ? 40 : 52} color={colors.white} />
          <div>
            <h1 style={styles.pageTitle}>CATEGORIES MANAGEMENT</h1>
            <p style={styles.pageSubtitle}>
              Manage product categories and their status across the system
            </p>
          </div>
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
          <p style={styles.statNumber}>{categories.length}</p>
          <p style={styles.statLabel}>TOTAL CATEGORIES</p>
        </div>
        <div
          style={{
            ...styles.statCard,
            borderLeft: `4px solid ${colors.success}`,
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
          <p style={{ ...styles.statNumber, color: colors.success }}>
            {activeCategories}
          </p>
          <p style={styles.statLabel}>ACTIVE CATEGORIES</p>
        </div>
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
            {inactiveCategories}
          </p>
          <p style={styles.statLabel}>INACTIVE CATEGORIES</p>
        </div>
      </div>

      {/* Controls - Search, Filter and Add button */}
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search categories by name or ID..."
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

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            ...styles.filterSelect,
            background:
              statusFilter === "All"
                ? `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`
                : statusFilter === "Active"
                  ? `linear-gradient(135deg, ${colors.light} 0%, #d1fae5 100%)`
                  : `linear-gradient(135deg, ${colors.light} 0%, #fef3c7 100%)`,
            borderColor:
              statusFilter === "All"
                ? colors.grayLighter
                : statusFilter === "Active"
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
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

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
            setFormCategory({
              CategoryID: getNextCategoryID(),
              CategoryName: "",
              Status: "Active",
            });
            setEditingCategoryID(null);
            setShowForm(true);
            setErrorMsg("");
            setSuccessMsg("");
          }}
        >
          <Plus size={isMobile ? 20 : 24} /> Add New Category
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingCategoryID
                  ? "EDIT CATEGORY STATUS"
                  : "ADD NEW CATEGORY"}
              </h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowForm(false);
                  setEditingCategoryID(null);
                  setErrorMsg("");
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <X size={isMobile ? 24 : 28} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <form onSubmit={handleFormSubmit}>
                {!editingCategoryID && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Category Name *</label>
                    <input
                      type="text"
                      value={formCategory.CategoryName}
                      onChange={(e) =>
                        setFormCategory({
                          ...formCategory,
                          CategoryName: e.target.value,
                        })
                      }
                      style={styles.input}
                      placeholder="e.g., Travel Bags, Electronics, Clothing"
                      required
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
                )}

                {editingCategoryID && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Category Name</label>
                    <input
                      type="text"
                      value={formCategory.CategoryName}
                      disabled
                      style={{
                        ...styles.input,
                        backgroundColor: colors.grayLighter,
                        color: colors.grayDark,
                        cursor: "not-allowed",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        color: colors.gray,
                        margin: "8px 0 0 0",
                      }}
                    >
                      Category name cannot be modified after creation
                    </p>
                  </div>
                )}

                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select
                    value={formCategory.Status}
                    onChange={(e) =>
                      setFormCategory({
                        ...formCategory,
                        Status: e.target.value,
                      })
                    }
                    style={{
                      ...styles.select,
                      background:
                        formCategory.Status === "Active"
                          ? `linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)`
                          : `linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)`,
                      borderColor:
                        formCategory.Status === "Active"
                          ? colors.success
                          : colors.warning,
                      color: colors.dark,
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div style={styles.buttonGroup}>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onMouseOver={(e) => {
                      e.target.style.background = `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`;
                      e.target.style.color = colors.white;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                      e.target.style.color = colors.grayDark;
                    }}
                    onClick={() => {
                      setShowForm(false);
                      setEditingCategoryID(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={styles.primaryButton}
                    onMouseOver={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
                      e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
                      e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
                    }}
                  >
                    {editingCategoryID ? "Update Status" : "Create Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div style={styles.tableContainer}>
        {isMobile ? (
          // Mobile view: Card layout
          <div style={{ padding: "16px" }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
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
                      fontSize: "16px",
                    }}
                  >
                    Loading categories...
                  </span>
                </div>
              </div>
            ) : currentItems.length > 0 ? (
              currentItems.map((category) => (
                <div
                  key={category.CategoryID}
                  style={{
                    background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "16px",
                    boxShadow: `0 4px 12px ${colors.shadowDark}`,
                    border: `1px solid ${colors.highlight}`,
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 8px 20px ${colors.shadowDark}`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 4px 12px ${colors.shadowDark}`;
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <FolderOpen size={16} color={colors.primary} />
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: colors.primaryDark,
                          }}
                        >
                          #{category.CategoryID}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: colors.dark,
                        }}
                      >
                        {category.CategoryName}
                      </div>
                    </div>
                    <button
                      style={{
                        ...styles.actionButton,
                        padding: "8px",
                      }}
                      onClick={() => handleEditCategory(category)}
                      title="Edit category status"
                    >
                      <Edit size={16} />
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "16px",
                    }}
                  >
                    <button
                      style={{
                        ...styles.statusButton,
                        background:
                          category.Status === "Active"
                            ? `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`
                            : `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
                        color: colors.white,
                        flex: 1,
                        marginRight: "12px",
                      }}
                      onClick={() => handleToggleStatus(category)}
                    >
                      {category.Status}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: colors.gray,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <FolderOpen size={48} color={colors.grayLight} />
                  <p
                    style={{
                      fontSize: "18px",
                      margin: 0,
                      fontWeight: "700",
                      color: colors.grayDark,
                    }}
                  >
                    No categories found
                  </p>
                  <p style={{ fontSize: "14px", margin: 0 }}>
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Desktop view: Table layout
          <>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableHeaderCell}>Category ID</th>
                  <th style={styles.tableHeaderCell}>Category Name</th>
                  <th style={styles.tableHeaderCell}>Status</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
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
                          Loading categories...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : currentItems.length > 0 ? (
                  currentItems.map((category) => (
                    <tr
                      key={category.CategoryID}
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
                        #{category.CategoryID}
                      </td>
                      <td style={{ ...styles.tableCell, fontWeight: "600" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <FolderOpen size={20} color={colors.primary} />
                          {category.CategoryName}
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <button
                          style={{
                            ...styles.statusButton,
                            background:
                              category.Status === "Active"
                                ? `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`
                                : `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
                            color: colors.white,
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.1)";
                            e.target.style.boxShadow = `0 4px 16px rgba(0,0,0,0.3)`;
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = `0 2px 8px rgba(0,0,0,0.2)`;
                          }}
                          onClick={() => handleToggleStatus(category)}
                        >
                          {category.Status}
                        </button>
                      </td>
                      <td style={styles.tableCell}>
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
                          onClick={() => handleEditCategory(category)}
                          title="Edit category status"
                        >
                          <Edit size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
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
                        <FolderOpen size={72} color={colors.grayLight} />
                        <p
                          style={{
                            fontSize: "20px",
                            margin: 0,
                            fontWeight: "700",
                            color: colors.grayDark,
                          }}
                        >
                          No categories found
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

            {/* Pagination Controls */}
            {!loading && filteredCategories.length > 0 && (
              <div style={styles.paginationContainer}>
                <div style={styles.paginationInfo}>
                  Showing {startIndex + 1} to {endIndex} of {totalItems} entries
                </div>

                <div style={styles.paginationControls}>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(e.target.value)}
                    style={styles.itemsPerPageSelect}
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                  </select>

                  <button
                    style={{
                      ...styles.paginationButton,
                      ...(currentPage === 1
                        ? styles.paginationButtonDisabled
                        : {}),
                    }}
                    onClick={() => goToPage(1)}
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
                        e.target.style.color = colors.grayDark;
                      }
                    }}
                  >
                    <ChevronsLeft size={16} />
                  </button>

                  <button
                    style={{
                      ...styles.paginationButton,
                      ...(currentPage === 1
                        ? styles.paginationButtonDisabled
                        : {}),
                    }}
                    onClick={() => goToPage(currentPage - 1)}
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
                        e.target.style.color = colors.grayDark;
                      }
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <span
                    style={{
                      padding: "10px 16px",
                      color: colors.grayDark,
                      fontWeight: "600",
                    }}
                  >
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    style={{
                      ...styles.paginationButton,
                      ...(currentPage === totalPages
                        ? styles.paginationButtonDisabled
                        : {}),
                    }}
                    onClick={() => goToPage(currentPage + 1)}
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
                        e.target.style.color = colors.grayDark;
                      }
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>

                  <button
                    style={{
                      ...styles.paginationButton,
                      ...(currentPage === totalPages
                        ? styles.paginationButtonDisabled
                        : {}),
                    }}
                    onClick={() => goToPage(totalPages)}
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
                        e.target.style.color = colors.grayDark;
                      }
                    }}
                  >
                    <ChevronsRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
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

export default Categories;
