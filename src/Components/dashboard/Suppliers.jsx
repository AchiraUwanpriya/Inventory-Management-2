// import { useEffect, useState } from 'react'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { Plus, Edit, Phone, Mail, MapPin, Search, Filter, X, User, Users, Building, Truck, Menu } from 'lucide-react';
// import {
//   GetAllSuppliers,
//   AddSuppliersDetails,
//   PutSuppliersDetails,
// } from '../../Actions/actionsSuppliers';

// const Suppliers = () => {
//   const dispatch = useDispatch();
//   const { suppliers = [], loading } = useSelector((state) => state.suppliers || {});

//   const [suppliersList, setSuppliersList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [showForm, setShowForm] = useState(false);
//   const [editingSupplierID, setEditingSupplierID] = useState(null);
//   const [message, setMessage] = useState("");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupProgress, setPopupProgress] = useState(100);

//   const [formSupplier, setFormSupplier] = useState({
//     SupplierID: '',
//     SupplierName: '',
//     ContactPerson: '',
//     Phone: '',
//     Email: '',
//     Address: '',
//     Status: 'Active',
//   });

//   // Show popup message with auto-dismiss
//   const showPopupMessage = (msg) => {
//     setMessage(msg);
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
//           setMessage("");
//           return 0;
//         }
//         return newProgress;
//       });
//     }, interval);

//     // Fallback timer to ensure popup closes
//     setTimeout(() => {
//       setShowPopup(false);
//       setMessage("");
//       clearInterval(progressTimer);
//     }, duration + 500);
//   };

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setShowMobileFilters(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
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

//   // Fetch suppliers
//   useEffect(() => {
//     dispatch(GetAllSuppliers());
//   }, [dispatch]);

//   // Map API response and sort by ID descending
//   useEffect(() => {
//     if (Array.isArray(suppliers)) {
//       const mapped = suppliers.map(s => ({
//         SupplierID: s.SupplierID || s.SupplierID,
//         SupplierName: s.SupplierName || s.SupplierName,
//         ContactPerson: s.ContactPerson || s.ContactPerson,
//         Phone: s.Phone || s.Phone,
//         Email: s.Email || s.Email,
//         Address: s.Address || s.Address || '',
//         Status: (s.Status || s.Status) === 'A' ? 'Active' : 'Inactive',
//       }));
      
//       const sorted = mapped.sort((a, b) => {
//         const idA = parseInt(a.SupplierID, 10) || 0;
//         const idB = parseInt(b.SupplierID, 10) || 0;
//         return idB - idA;
//       });
      
//       setSuppliersList(sorted);
//     }
//   }, [suppliers]);

//   // Calculate statistics
//   const activeSuppliers = suppliersList.filter(s => s.Status === 'Active').length;
//   const inactiveSuppliers = suppliersList.filter(s => s.Status === 'Inactive').length;

//   // Fixed search functionality - properly searches by ID
//   const filteredSuppliers = suppliersList.filter(s => {
//     const searchLower = searchTerm.toLowerCase();
    
//     const matchesSearch = 
//       s.SupplierName.toLowerCase().includes(searchLower) ||
//       s.SupplierID.toString().toLowerCase().includes(searchLower) ||
//       (s.ContactPerson || '').toLowerCase().includes(searchLower) ||
//       (s.Email || '').toLowerCase().includes(searchLower) ||
//       (s.Phone || '').includes(searchTerm);
    
//     const matchesStatus = statusFilter === 'All' || s.Status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   // Next Supplier ID
//   const getNextSupplierID = () => {
//     if (suppliersList.length === 0) return "1";
//     const ids = suppliersList.map(s => parseInt(s.SupplierID, 10)).filter(n => !isNaN(n));
//     return (Math.max(...ids) + 1).toString();
//   };

//   // Validation function
//   const validateForm = () => {
//     const errors = {};

//     if (!formSupplier.SupplierName.trim()) {
//       errors.SupplierName = "Supplier name is required";
//     }

//     if (!formSupplier.ContactPerson.trim()) {
//       errors.ContactPerson = "Contact person is required";
//     }

//     if (!formSupplier.Phone.trim()) {
//       errors.Phone = "Phone number is required";
//     } else if (formSupplier.Phone.length !== 10) {
//       errors.Phone = "Phone number must be exactly 10 digits";
//     }

//     if (!formSupplier.Email.trim()) {
//       errors.Email = "Email address is required";
//     } else if (!/\S+@\S+\.\S+/.test(formSupplier.Email)) {
//       errors.Email = "Email address is invalid";
//     }

//     if (!formSupplier.Address.trim()) {
//       errors.Address = "Address is required";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Form submit with validation
//   const handleFormSubmit = e => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       showPopupMessage("❌ Please fill all required fields correctly");
//       return;
//     }

//     const payload = {
//       SupplierID: formSupplier.SupplierID,
//       SupplierName: formSupplier.SupplierName.trim(),
//       ContactPerson: formSupplier.ContactPerson.trim(),
//       Phone: formSupplier.Phone,
//       Email: formSupplier.Email.trim(),
//       Address: formSupplier.Address.trim(),
//       Status: formSupplier.Status === 'Active' ? 'A' : 'I',
//     };

//     if (editingSupplierID) {
//       dispatch(PutSuppliersDetails(payload));
//       showPopupMessage("✅ Supplier successfully updated!");
//       setEditingSupplierID(null);
//     } else {
//       dispatch(AddSuppliersDetails(payload));
//       showPopupMessage("✅ Supplier successfully added!");
//     }

//     setFormSupplier({
//       SupplierID: '',
//       SupplierName: '',
//       ContactPerson: '',
//       Phone: '',
//       Email: '',
//       Address: '',
//       Status: 'Active',
//     });
//     setFormErrors({});
//     setShowForm(false);
//   };

//   const handleEditSupplier = supplier => {
//     setFormSupplier(supplier);
//     setEditingSupplierID(supplier.SupplierID);
//     setFormErrors({});
//     setShowForm(true);
//   };

//   const toggleStatus = supplier => {
//     const newStatus = supplier.Status === 'Active' ? 'Inactive' : 'Active';
//     const payload = {
//       SupplierID: supplier.SupplierID,
//       SupplierName: supplier.SupplierName,
//       ContactPerson: supplier.ContactPerson,
//       Phone: supplier.Phone,
//       Email: supplier.Email,
//       Address: supplier.Address,
//       Status: newStatus === 'Active' ? 'A' : 'I',
//     };
//     dispatch(PutSuppliersDetails(payload));
//     showPopupMessage(`✅ Supplier status changed to ${newStatus}`);
//   };

//   // Handle input changes and clear errors when user starts typing
//   const handleInputChange = (field, value) => {
//     setFormSupplier(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear error when user starts typing
//     if (formErrors[field]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   // Responsive Styles
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
//       padding: isMobile ? '16px' : '24px',
//       fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//     },
//     header: {
//       background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
//       padding: isMobile ? '20px' : '32px',
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
//       fontSize: isMobile ? '24px' : '36px',
//       fontWeight: '800',
//       color: colors.white,
//       margin: 0,
//       textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
//     },
//     pageSubtitle: {
//       fontSize: isMobile ? '14px' : '18px',
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
//       background: message.includes('❌') || message.includes('⚠️') 
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
//       background: message.includes('❌') || message.includes('⚠️') 
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
//       gap: isMobile ? '12px' : '24px',
//       marginBottom: isMobile ? '20px' : '28px',
//       flexWrap: 'wrap'
//     },
//     statCard: {
//       flex: isMobile ? '1 1 calc(50% - 6px)' : '1',
//       minWidth: isMobile ? 'calc(50% - 6px)' : '220px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       padding: isMobile ? '16px' : '28px',
//       borderRadius: '12px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`,
//       border: `1px solid ${colors.highlight}`,
//       textAlign: 'center',
//       position: 'relative',
//       overflow: 'hidden',
//       transition: 'all 0.3s ease'
//     },
//     statNumber: {
//       fontSize: isMobile ? '28px' : '42px',
//       fontWeight: '800',
//       color: colors.primaryDark,
//       margin: '0 0 8px 0',
//       textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
//     },
//     statLabel: {
//       fontSize: isMobile ? '12px' : '16px',
//       color: colors.grayDark,
//       margin: 0,
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     controls: {
//       display: 'flex',
//       flexDirection: isMobile ? 'column' : 'row',
//       gap: isMobile ? '16px' : '24px',
//       alignItems: isMobile ? 'stretch' : 'center',
//       marginBottom: isMobile ? '20px' : '28px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       padding: isMobile ? '20px' : '28px',
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
//       width: '100%'
//     },
//     searchInput: {
//       padding: isMobile ? '14px 20px 14px 48px' : '18px 24px 18px 56px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '12px',
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
//       fontSize: '20px'
//     },
//     filterSelect: {
//       padding: isMobile ? '14px 20px' : '18px 24px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '12px',
//       fontSize: isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       cursor: 'pointer',
//       fontWeight: '600',
//       minWidth: isMobile ? '100%' : '200px',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       transition: 'all 0.3s ease'
//     },
//     addButton: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '12px',
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
//       color: colors.white,
//       border: 'none',
//       borderRadius: '12px',
//       padding: isMobile ? '14px 20px' : '18px 32px',
//       fontSize: isMobile ? '16px' : '18px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       boxShadow: `0 4px 16px ${colors.shadowDark}`,
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       width: isMobile ? '100%' : 'auto'
//     },
//     mobileFilterButton: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '8px',
//       background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`,
//       color: colors.white,
//       border: 'none',
//       borderRadius: '12px',
//       padding: '14px 20px',
//       fontSize: '16px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       boxShadow: `0 4px 16px ${colors.shadowDark}`,
//       width: '100%'
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
//       borderRadius: '20px',
//       boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
//       width: '100%',
//       maxWidth: isMobile ? '100%' : '800px',
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
//       padding: '10px',
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
//       fontSize: isMobile ? '14px' : '16px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     requiredLabel: {
//       display: 'block',
//       marginBottom: '8px',
//       fontWeight: '700',
//       color: colors.dark,
//       fontSize: isMobile ? '14px' : '16px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     requiredStar: {
//       color: colors.error,
//       marginLeft: '4px'
//     },
//     input: {
//       width: '100%',
//       padding: isMobile ? '14px 16px' : '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       boxSizing: 'border-box',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     inputError: {
//       width: '100%',
//       padding: isMobile ? '14px 16px' : '16px 20px',
//       border: `2px solid ${colors.error}`,
//       borderRadius: '10px',
//       fontSize: isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)`,
//       transition: 'all 0.3s ease',
//       boxSizing: 'border-box',
//       boxShadow: `inset 0 2px 8px rgba(239, 68, 68, 0.1)`,
//       fontWeight: '500'
//     },
//     textarea: {
//       width: '100%',
//       padding: isMobile ? '14px 16px' : '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       resize: 'vertical',
//       minHeight: '80px',
//       fontFamily: 'inherit',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     textareaError: {
//       width: '100%',
//       padding: isMobile ? '14px 16px' : '16px 20px',
//       border: `2px solid ${colors.error}`,
//       borderRadius: '10px',
//       fontSize: isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)`,
//       transition: 'all 0.3s ease',
//       resize: 'vertical',
//       minHeight: '80px',
//       fontFamily: 'inherit',
//       boxShadow: `inset 0 2px 8px rgba(239, 68, 68, 0.1)`,
//       fontWeight: '500'
//     },
//     select: {
//       width: '100%',
//       padding: isMobile ? '14px 16px' : '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       cursor: 'pointer',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500',
//       transition: 'all 0.3s ease'
//     },
//     errorText: {
//       color: colors.error,
//       fontSize: '14px',
//       margin: '8px 0 0 0',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px'
//     },
//     buttonGroup: {
//       display: 'flex',
//       flexDirection: isMobile ? 'column' : 'row',
//       gap: '12px',
//       justifyContent: 'flex-end',
//       marginTop: isMobile ? '24px' : '32px'
//     },
//     secondaryButton: {
//       padding: isMobile ? '14px 20px' : '16px 28px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: isMobile ? '16px' : '18px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       color: colors.grayDark,
//       transition: 'all 0.3s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       boxShadow: `0 2px 8px rgba(0,0,0,0.1)`,
//       width: isMobile ? '100%' : 'auto'
//     },
//     primaryButton: {
//       padding: isMobile ? '14px 20px' : '16px 28px',
//       border: 'none',
//       borderRadius: '10px',
//       fontSize: isMobile ? '16px' : '18px',
//       fontWeight: '700',
//       cursor: 'pointer',
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
//       color: colors.white,
//       transition: 'all 0.3s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       boxShadow: `0 4px 16px ${colors.shadowDark}`,
//       width: isMobile ? '100%' : 'auto'
//     },
//     tableContainer: {
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       borderRadius: '16px',
//       boxShadow: `0 6px 24px ${colors.shadowDark}`,
//       overflow: 'auto',
//       border: `1px solid ${colors.highlight}`,
//       position: 'relative'
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       minWidth: isMobile ? '800px' : 'auto'
//     },
//     tableHeader: {
//       background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`
//     },
//     tableHeaderCell: {
//       padding: isMobile ? '16px 12px' : '22px 28px',
//       textAlign: 'left',
//       fontWeight: '800',
//       fontSize: isMobile ? '14px' : '16px',
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
//       padding: isMobile ? '16px 12px' : '22px 28px',
//       fontSize: isMobile ? '14px' : '16px',
//       color: colors.dark,
//       fontWeight: '500',
//       whiteSpace: 'nowrap'
//     },
//     statusButton: {
//       padding: isMobile ? '8px 16px' : '12px 24px',
//       border: 'none',
//       borderRadius: '25px',
//       fontSize: isMobile ? '12px' : '14px',
//       fontWeight: '800',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       minWidth: isMobile ? '80px' : '110px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       boxShadow: `0 2px 8px rgba(0,0,0,0.2)`
//     },
//     actionButton: {
//       padding: isMobile ? '8px' : '12px',
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
//     },
//     mobileFiltersPanel: {
//       position: 'fixed',
//       top: 0,
//       right: showMobileFilters ? 0 : '-100%',
//       width: '280px',
//       height: '100vh',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       boxShadow: `-4px 0 32px rgba(0,0,0,0.3)`,
//       zIndex: 1001,
//       transition: 'right 0.3s ease',
//       padding: '20px',
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '20px'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Popup Notification */}
//       {showPopup && (
//         <div style={styles.popupContainer}>
//           <div style={styles.popupProgressBar} />
//           <div style={styles.popupContent}>
//             <span style={styles.popupMessage}>{message}</span>
//             <button
//               style={styles.popupCloseButton}
//               onClick={() => {
//                 setShowPopup(false);
//                 setMessage("");
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
//           <Truck size={isMobile ? 36 : 52} color={colors.white} />
//           <div>
//             <h1 style={styles.pageTitle}>SUPPLIERS MANAGEMENT</h1>
//             <p style={styles.pageSubtitle}>Manage suppliers and their contact information across the system</p>
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
//           <p style={styles.statNumber}>{suppliersList.length}</p>
//           <p style={styles.statLabel}>TOTAL SUPPLIERS</p>
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
//           <p style={{...styles.statNumber, color: colors.success}}>{activeSuppliers}</p>
//           <p style={styles.statLabel}>ACTIVE SUPPLIERS</p>
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
//           <p style={{...styles.statNumber, color: colors.error}}>{inactiveSuppliers}</p>
//           <p style={styles.statLabel}>INACTIVE SUPPLIERS</p>
//         </div>
//       </div>

//       {/* Controls - Search, Filter and Add button */}
//       <div style={styles.controls}>
//         <div style={styles.searchBox}>
//           <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder={isMobile ? "Search suppliers..." : "Search suppliers by name, contact person, or email..."}
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
        
//         {isMobile ? (
//           <>
//             <button
//               style={styles.mobileFilterButton}
//               onClick={() => setShowMobileFilters(!showMobileFilters)}
//             >
//               <Filter size={20} />
//               Filters & Actions
//             </button>
            
//             {/* Mobile Filters Panel */}
//             <div style={styles.mobileFiltersPanel}>
//               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//                 <h3 style={{margin: 0, color: colors.dark}}>Filters & Actions</h3>
//                 <button 
//                   style={styles.closeButton}
//                   onClick={() => setShowMobileFilters(false)}
//                 >
//                   <X size={24} color={colors.dark} />
//                 </button>
//               </div>
              
//               <select 
//                 value={statusFilter} 
//                 onChange={e => setStatusFilter(e.target.value)}
//                 style={{
//                   ...styles.filterSelect,
//                   background: statusFilter === 'All' ? 
//                     `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)` :
//                     statusFilter === 'Active' ? 
//                     `linear-gradient(135deg, ${colors.light} 0%, #d1fae5 100%)` : 
//                     `linear-gradient(135deg, ${colors.light} 0%, #fef3c7 100%)`,
//                   borderColor: statusFilter === 'All' ? colors.grayLighter :
//                             statusFilter === 'Active' ? colors.success : colors.warning
//                 }}
//               >
//                 <option value="All">All Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>

//               <button
//                 style={styles.addButton}
//                 onMouseOver={(e) => {
//                   e.target.style.transform = 'translateY(-2px) scale(1.02)';
//                   e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
//                   e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.transform = 'translateY(0) scale(1)';
//                   e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
//                   e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
//                 }}
//                 onClick={() => {
//                   setFormSupplier({
//                     SupplierID: getNextSupplierID().toString(),
//                     SupplierName: '',
//                     ContactPerson: '',
//                     Phone: '',
//                     Email: '',
//                     Address: '',
//                     Status: 'Active',
//                   });
//                   setEditingSupplierID(null);
//                   setFormErrors({});
//                   setShowForm(true);
//                   setShowMobileFilters(false);
//                 }}
//               >
//                 <Plus size={20} /> Add New Supplier
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <select 
//               value={statusFilter} 
//               onChange={e => setStatusFilter(e.target.value)}
//               style={{
//                 ...styles.filterSelect,
//                 background: statusFilter === 'All' ? 
//                   `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)` :
//                   statusFilter === 'Active' ? 
//                   `linear-gradient(135deg, ${colors.light} 0%, #d1fae5 100%)` : 
//                   `linear-gradient(135deg, ${colors.light} 0%, #fef3c7 100%)`,
//                 borderColor: statusFilter === 'All' ? colors.grayLighter :
//                           statusFilter === 'Active' ? colors.success : colors.warning
//               }}
//             >
//               <option value="All">All Status</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>

//             <button
//               style={styles.addButton}
//               onMouseOver={(e) => {
//                 e.target.style.transform = 'translateY(-2px) scale(1.02)';
//                 e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
//                 e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.transform = 'translateY(0) scale(1)';
//                 e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
//                 e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
//               }}
//               onClick={() => {
//                 setFormSupplier({
//                   SupplierID: getNextSupplierID().toString(),
//                   SupplierName: '',
//                   ContactPerson: '',
//                   Phone: '',
//                   Email: '',
//                   Address: '',
//                   Status: 'Active',
//                 });
//                 setEditingSupplierID(null);
//                 setFormErrors({});
//                 setShowForm(true);
//               }}
//             >
//               <Plus size={24} /> Add New Supplier
//             </button>
//           </>
//         )}
//       </div>

//       {/* Form Modal */}
//       {showForm && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <div style={styles.modalHeader}>
//               <h3 style={styles.modalTitle}>
//                 {editingSupplierID ? 'EDIT SUPPLIER' : 'ADD NEW SUPPLIER'}
//               </h3>
//               <button 
//                 style={styles.closeButton}
//                 onClick={() => setShowForm(false)}
//                 onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
//               >
//                 <X size={28} />
//               </button>
//             </div>
            
//             <div style={styles.modalBody}>
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
//                       <label style={styles.label}>Supplier ID</label>
//                       <input 
//                         type="text" 
//                         value={formSupplier.SupplierID} 
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
//                       <label style={styles.requiredLabel}>
//                         Supplier Name <span style={styles.requiredStar}>*</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={formSupplier.SupplierName}
//                         onChange={e => handleInputChange('SupplierName', e.target.value)}
//                         placeholder="Enter supplier name"
//                         style={formErrors.SupplierName ? styles.inputError : styles.input}
//                         required
//                         onFocus={(e) => {
//                           e.target.style.borderColor = colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = formErrors.SupplierName ? colors.error : colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                       />
//                       {formErrors.SupplierName && (
//                         <p style={styles.errorText}>❌ {formErrors.SupplierName}</p>
//                       )}
//                     </div>

//                     <div style={styles.formGroup}>
//                       <label style={styles.requiredLabel}>
//                         Contact Person <span style={styles.requiredStar}>*</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={formSupplier.ContactPerson}
//                         onChange={e => handleInputChange('ContactPerson', e.target.value)}
//                         placeholder="Enter contact person name"
//                         style={formErrors.ContactPerson ? styles.inputError : styles.input}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = formErrors.ContactPerson ? colors.error : colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                       />
//                       {formErrors.ContactPerson && (
//                         <p style={styles.errorText}>❌ {formErrors.ContactPerson}</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Right Column */}
//                   <div>
//                     <div style={styles.formGroup}>
//                       <label style={styles.requiredLabel}>
//                         Phone Number <span style={styles.requiredStar}>*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         value={formSupplier.Phone}
//                         onChange={e => {
//                           const value = e.target.value.replace(/\D/g, '');
//                           if (value.length <= 10) {
//                             handleInputChange('Phone', value);
//                           }
//                         }}
//                         placeholder="10-digit phone number"
//                         style={formErrors.Phone ? styles.inputError : {
//                           ...styles.input,
//                           borderColor: formSupplier.Phone && formSupplier.Phone.length !== 10 ? colors.error : colors.grayLighter
//                         }}
//                         maxLength={10}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = formErrors.Phone ? colors.error : 
//                             (formSupplier.Phone && formSupplier.Phone.length !== 10 ? colors.error : colors.grayLighter);
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                       />
//                       {formErrors.Phone && (
//                         <p style={styles.errorText}>❌ {formErrors.Phone}</p>
//                       )}
//                     </div>

//                     <div style={styles.formGroup}>
//                       <label style={styles.requiredLabel}>
//                         Email Address <span style={styles.requiredStar}>*</span>
//                       </label>
//                       <input
//                         type="email"
//                         value={formSupplier.Email}
//                         onChange={e => handleInputChange('Email', e.target.value)}
//                         placeholder="Enter email address"
//                         style={formErrors.Email ? styles.inputError : styles.input}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = formErrors.Email ? colors.error : colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                       />
//                       {formErrors.Email && (
//                         <p style={styles.errorText}>❌ {formErrors.Email}</p>
//                       )}
//                     </div>

//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Status</label>
//                       <select
//                         value={formSupplier.Status}
//                         onChange={e => setFormSupplier({ ...formSupplier, Status: e.target.value })}
//                         style={{
//                           ...styles.select,
//                           background: formSupplier.Status === 'Active' ? 
//                             `linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)` : 
//                             `linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)`,
//                           borderColor: formSupplier.Status === 'Active' ? colors.success : colors.warning,
//                           color: colors.dark
//                         }}
//                       >
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Full Width Address Field */}
//                 <div style={styles.formGroup}>
//                   <label style={styles.requiredLabel}>
//                     Address <span style={styles.requiredStar}>*</span>
//                   </label>
//                   <textarea
//                     value={formSupplier.Address}
//                     onChange={e => handleInputChange('Address', e.target.value)}
//                     placeholder="Enter supplier address"
//                     style={formErrors.Address ? styles.textareaError : styles.textarea}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = colors.primary;
//                       e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = formErrors.Address ? colors.error : colors.grayLighter;
//                       e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                     }}
//                   />
//                   {formErrors.Address && (
//                     <p style={styles.errorText}>❌ {formErrors.Address}</p>
//                   )}
//                 </div>

//                 <div style={styles.buttonGroup}>
//                   <button 
//                     type="button" 
//                     style={styles.secondaryButton}
//                     onClick={() => setShowForm(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit" 
//                     style={styles.primaryButton}
//                   >
//                     {editingSupplierID ? 'Update Supplier' : 'Create Supplier'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Suppliers Table */}
//       <div style={styles.tableContainer}>
//         <table style={styles.table}>
//           <thead style={styles.tableHeader}>
//             <tr>
//               <th style={styles.tableHeaderCell}>ID</th>
//               <th style={styles.tableHeaderCell}>Supplier Name</th>
//               {!isMobile && <th style={styles.tableHeaderCell}>Contact Person</th>}
//               {!isMobile && <th style={styles.tableHeaderCell}>Contact Info</th>}
//               {!isMobile && <th style={styles.tableHeaderCell}>Address</th>}
//               <th style={styles.tableHeaderCell}>Status</th>
//               <th style={styles.tableHeaderCell}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={isMobile ? 4 : 7} style={{...styles.tableCell, textAlign: 'center', padding: '40px'}}>
//                   <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
//                     <div style={{
//                       width: '28px', 
//                       height: '28px', 
//                       border: '3px solid #f0fdf4', 
//                       borderTop: '3px solid #10b981', 
//                       borderRadius: '50%', 
//                       animation: 'spin 1s linear infinite'
//                     }}></div>
//                     <span style={{fontWeight: '600', color: colors.primary, fontSize: '16px'}}>Loading suppliers...</span>
//                   </div>
//                 </td>
//               </tr>
//             ) : filteredSuppliers.length > 0 ? (
//               filteredSuppliers.map((s) => (
//                 <tr 
//                   key={s.SupplierID} 
//                   style={styles.tableRow}
//                 >
//                   <td style={{...styles.tableCell, fontWeight: '700', color: colors.primaryDark}}>#{s.SupplierID}</td>
//                   <td style={styles.tableCell}>
//                     <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
//                       <Building size={isMobile ? 16 : 20} color={colors.primary} />
//                       <span>{s.SupplierName}</span>
//                     </div>
//                     {isMobile && s.ContactPerson && (
//                       <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '12px', color: colors.gray}}>
//                         <User size={12} />
//                         <span>{s.ContactPerson}</span>
//                       </div>
//                     )}
//                     {isMobile && (
//                       <div style={{marginTop: '4px', fontSize: '12px', color: colors.gray}}>
//                         {s.Phone && <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
//                           <Phone size={12} /> {s.Phone}
//                         </div>}
//                         {s.Email && <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
//                           <Mail size={12} /> {s.Email.substring(0, 20)}...
//                         </div>}
//                       </div>
//                     )}
//                   </td>
//                   {!isMobile && (
//                     <td style={styles.tableCell}>
//                       {s.ContactPerson ? (
//                         <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
//                           <User size={16} color={colors.gray} />
//                           <span>{s.ContactPerson}</span>
//                         </div>
//                       ) : (
//                         <span style={{color: colors.grayLight, fontStyle: 'italic'}}>Not specified</span>
//                       )}
//                     </td>
//                   )}
//                   {!isMobile && (
//                     <td style={styles.tableCell}>
//                       <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
//                         {s.Phone && (
//                           <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
//                             <Phone size={16} color={colors.gray} />
//                             <span>{s.Phone}</span>
//                           </div>
//                         )}
//                         {s.Email && (
//                           <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
//                             <Mail size={16} color={colors.gray} />
//                             <span style={{fontSize: '14px'}}>{s.Email}</span>
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                   )}
//                   {!isMobile && (
//                     <td style={styles.tableCell}>
//                       {s.Address ? (
//                         <div style={{display: 'flex', alignItems: 'flex-start', gap: '8px'}}>
//                           <MapPin size={16} color={colors.gray} style={{marginTop: '2px'}} />
//                           <span style={{fontSize: '14px', lineHeight: '1.4'}}>
//                             {s.Address.length > 50 ? s.Address.substring(0, 50) + '...' : s.Address}
//                           </span>
//                         </div>
//                       ) : (
//                         <span style={{color: colors.grayLight, fontStyle: 'italic'}}>Not provided</span>
//                       )}
//                     </td>
//                   )}
//                   <td style={styles.tableCell}>
//                     <button
//                       style={{
//                         ...styles.statusButton,
//                         background: s.Status === 'Active' ? 
//                           `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)` : 
//                           `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
//                         color: colors.white
//                       }}
//                       onClick={() => toggleStatus(s)}
//                     >
//                       {s.Status === 'Active' ? 'Active' : 'Inactive'}
//                     </button>
//                   </td>
//                   <td style={styles.tableCell}>
//                     <button
//                       style={styles.actionButton}
//                       onClick={() => handleEditSupplier(s)}
//                       title="Edit supplier"
//                     >
//                       <Edit size={isMobile ? 16 : 18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={isMobile ? 4 : 7} style={{...styles.tableCell, textAlign: 'center', padding: '40px'}}>
//                   <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: colors.gray}}>
//                     <Building size={isMobile ? 48 : 72} color={colors.grayLight} />
//                     <p style={{fontSize: isMobile ? '18px' : '20px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No suppliers found</p>
//                     <p style={{fontSize: isMobile ? '14px' : '16px', margin: 0, textAlign: 'center'}}>Try adjusting your search criteria or filters</p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
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
        
//         /* Mobile overlay for filters */
//         ${showMobileFilters ? `
//           .mobile-overlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: rgba(0,0,0,0.5);
//             z-index: 1000;
//           }
//         ` : ''}
//       `}</style>
      
//       {showMobileFilters && (
//         <div 
//           className="mobile-overlay"
//           onClick={() => setShowMobileFilters(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Suppliers;

import { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit, Phone, Mail, MapPin, Search, Filter, X, User, Users, Building, Truck, Menu, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  GetAllSuppliers,
  AddSuppliersDetails,
  PutSuppliersDetails,
} from '../../Actions/actionsSuppliers';

const Suppliers = () => {
  const dispatch = useDispatch();
  const { suppliers = [], loading } = useSelector((state) => state.suppliers || {});

  const [suppliersList, setSuppliersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingSupplierID, setEditingSupplierID] = useState(null);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupProgress, setPopupProgress] = useState(100);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [formSupplier, setFormSupplier] = useState({
    SupplierID: '',
    SupplierName: '',
    ContactPerson: '',
    Phone: '',
    Email: '',
    Address: '',
    Status: 'Active',
  });

  // Show popup message with auto-dismiss
  const showPopupMessage = (msg) => {
    setMessage(msg);
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
          setMessage("");
          return 0;
        }
        return newProgress;
      });
    }, interval);

    // Fallback timer to ensure popup closes
    setTimeout(() => {
      setShowPopup(false);
      setMessage("");
      clearInterval(progressTimer);
    }, duration + 500);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileFilters(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    shadowDark: 'rgba(30, 64, 175, 0.2)',
    shadowLight: 'rgba(16, 185, 129, 0.1)',
    highlight: 'rgba(255, 255, 255, 0.9)',
  };

  // Fetch suppliers
  useEffect(() => {
    dispatch(GetAllSuppliers());
  }, [dispatch]);

  // Map API response and sort by ID descending
  useEffect(() => {
    if (Array.isArray(suppliers)) {
      const mapped = suppliers.map(s => ({
        SupplierID: s.SupplierID || s.SupplierID,
        SupplierName: s.SupplierName || s.SupplierName,
        ContactPerson: s.ContactPerson || s.ContactPerson,
        Phone: s.Phone || s.Phone,
        Email: s.Email || s.Email,
        Address: s.Address || s.Address || '',
        Status: (s.Status || s.Status) === 'A' ? 'Active' : 'Inactive',
      }));
      
      const sorted = mapped.sort((a, b) => {
        const idA = parseInt(a.SupplierID, 10) || 0;
        const idB = parseInt(b.SupplierID, 10) || 0;
        return idB - idA;
      });
      
      setSuppliersList(sorted);
    }
  }, [suppliers]);

  // Calculate statistics
  const activeSuppliers = suppliersList.filter(s => s.Status === 'Active').length;
  const inactiveSuppliers = suppliersList.filter(s => s.Status === 'Inactive').length;

  // Fixed search functionality - properly searches by ID
  const filteredSuppliers = suppliersList.filter(s => {
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = 
      s.SupplierName.toLowerCase().includes(searchLower) ||
      s.SupplierID.toString().toLowerCase().includes(searchLower) ||
      (s.ContactPerson || '').toLowerCase().includes(searchLower) ||
      (s.Email || '').toLowerCase().includes(searchLower) ||
      (s.Phone || '').includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All' || s.Status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  useEffect(() => {
    const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
    setTotalPages(totalPages || 1);
    
    // Reset to first page if current page is beyond new total pages
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredSuppliers, itemsPerPage, currentPage]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSuppliers.slice(startIndex, endIndex);
  };

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const currentItems = getCurrentPageItems();
  const pageNumbers = generatePageNumbers();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredSuppliers.length);

  // Next Supplier ID
  const getNextSupplierID = () => {
    if (suppliersList.length === 0) return "1";
    const ids = suppliersList.map(s => parseInt(s.SupplierID, 10)).filter(n => !isNaN(n));
    return (Math.max(...ids) + 1).toString();
  };

  // Validation function
  const validateForm = () => {
    const errors = {};

    if (!formSupplier.SupplierName.trim()) {
      errors.SupplierName = "Supplier name is required";
    }

    if (!formSupplier.ContactPerson.trim()) {
      errors.ContactPerson = "Contact person is required";
    }

    if (!formSupplier.Phone.trim()) {
      errors.Phone = "Phone number is required";
    } else if (formSupplier.Phone.length !== 10) {
      errors.Phone = "Phone number must be exactly 10 digits";
    }

    if (!formSupplier.Email.trim()) {
      errors.Email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formSupplier.Email)) {
      errors.Email = "Email address is invalid";
    }

    if (!formSupplier.Address.trim()) {
      errors.Address = "Address is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submit with validation
  const handleFormSubmit = e => {
    e.preventDefault();
    
    if (!validateForm()) {
      showPopupMessage("❌ Please fill all required fields correctly");
      return;
    }

    const payload = {
      SupplierID: formSupplier.SupplierID,
      SupplierName: formSupplier.SupplierName.trim(),
      ContactPerson: formSupplier.ContactPerson.trim(),
      Phone: formSupplier.Phone,
      Email: formSupplier.Email.trim(),
      Address: formSupplier.Address.trim(),
      Status: formSupplier.Status === 'Active' ? 'A' : 'I',
    };

    if (editingSupplierID) {
      dispatch(PutSuppliersDetails(payload));
      showPopupMessage("✅ Supplier successfully updated!");
      setEditingSupplierID(null);
    } else {
      dispatch(AddSuppliersDetails(payload));
      showPopupMessage("✅ Supplier successfully added!");
    }

    setFormSupplier({
      SupplierID: '',
      SupplierName: '',
      ContactPerson: '',
      Phone: '',
      Email: '',
      Address: '',
      Status: 'Active',
    });
    setFormErrors({});
    setShowForm(false);
  };

  const handleEditSupplier = supplier => {
    setFormSupplier(supplier);
    setEditingSupplierID(supplier.SupplierID);
    setFormErrors({});
    setShowForm(true);
  };

  const toggleStatus = supplier => {
    const newStatus = supplier.Status === 'Active' ? 'Inactive' : 'Active';
    const payload = {
      SupplierID: supplier.SupplierID,
      SupplierName: supplier.SupplierName,
      ContactPerson: supplier.ContactPerson,
      Phone: supplier.Phone,
      Email: supplier.Email,
      Address: supplier.Address,
      Status: newStatus === 'Active' ? 'A' : 'I',
    };
    dispatch(PutSuppliersDetails(payload));
    showPopupMessage(`✅ Supplier status changed to ${newStatus}`);
  };

  // Handle input changes and clear errors when user starts typing
  const handleInputChange = (field, value) => {
    setFormSupplier(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Responsive Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
      padding: isMobile ? '16px' : '24px',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
      padding: isMobile ? '20px' : '32px',
      borderRadius: '16px',
      marginBottom: isMobile ? '20px' : '28px',
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
      gap: isMobile ? '12px' : '20px'
    },
    pageTitle: {
      fontSize: isMobile ? '24px' : '36px',
      fontWeight: '800',
      color: colors.white,
      margin: 0,
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    pageSubtitle: {
      fontSize: isMobile ? '14px' : '18px',
      color: colors.highlight,
      margin: '6px 0 0 0',
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
      background: message.includes('❌') || message.includes('⚠️') 
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
      background: message.includes('❌') || message.includes('⚠️') 
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
    statsContainer: {
      display: 'flex',
      gap: isMobile ? '12px' : '24px',
      marginBottom: isMobile ? '20px' : '28px',
      flexWrap: 'wrap'
    },
    statCard: {
      flex: isMobile ? '1 1 calc(50% - 6px)' : '1',
      minWidth: isMobile ? 'calc(50% - 6px)' : '220px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: isMobile ? '16px' : '28px',
      borderRadius: '12px',
      boxShadow: `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`,
      border: `1px solid ${colors.highlight}`,
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    },
    statNumber: {
      fontSize: isMobile ? '28px' : '42px',
      fontWeight: '800',
      color: colors.primaryDark,
      margin: '0 0 8px 0',
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
    },
    statLabel: {
      fontSize: isMobile ? '12px' : '16px',
      color: colors.grayDark,
      margin: 0,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    controls: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '16px' : '24px',
      alignItems: isMobile ? 'stretch' : 'center',
      marginBottom: isMobile ? '20px' : '28px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: isMobile ? '20px' : '28px',
      borderRadius: '16px',
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
      position: 'relative'
    },
    searchBox: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flex: '1',
      width: '100%'
    },
    searchInput: {
      padding: isMobile ? '14px 20px 14px 48px' : '18px 24px 18px 56px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '12px',
      fontSize: isMobile ? '16px' : '18px',
      width: '100%',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: 'all 0.3s ease',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500'
    },
    searchIcon: {
      position: 'absolute',
      left: isMobile ? '16px' : '24px',
      color: colors.primary,
      fontSize: '20px'
    },
    filterSelect: {
      padding: isMobile ? '14px 20px' : '18px 24px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '12px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: 'pointer',
      fontWeight: '600',
      minWidth: isMobile ? '100%' : '200px',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      transition: 'all 0.3s ease'
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      border: 'none',
      borderRadius: '12px',
      padding: isMobile ? '14px 20px' : '18px 32px',
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 16px ${colors.shadowDark}`,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      width: isMobile ? '100%' : 'auto'
    },
    mobileFilterButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`,
      color: colors.white,
      border: 'none',
      borderRadius: '12px',
      padding: '14px 20px',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 16px ${colors.shadowDark}`,
      width: '100%'
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
      padding: isMobile ? '10px' : '20px',
      backdropFilter: 'blur(8px)'
    },
    modalContent: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: '20px',
      boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
      width: '100%',
      maxWidth: isMobile ? '100%' : '800px',
      maxHeight: '90vh',
      overflow: 'auto',
      border: `2px solid ${colors.highlight}`,
      position: 'relative'
    },
    modalHeader: {
      padding: isMobile ? '20px' : '28px',
      borderBottom: `2px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: isMobile ? '20px' : '26px',
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
      padding: '10px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBody: {
      padding: isMobile ? '20px' : '28px'
    },
    formGroup: {
      marginBottom: isMobile ? '16px' : '24px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '700',
      color: colors.dark,
      fontSize: isMobile ? '14px' : '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    requiredLabel: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '700',
      color: colors.dark,
      fontSize: isMobile ? '14px' : '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    requiredStar: {
      color: colors.error,
      marginLeft: '4px'
    },
    input: {
      width: '100%',
      padding: isMobile ? '14px 16px' : '16px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '10px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500'
    },
    inputError: {
      width: '100%',
      padding: isMobile ? '14px 16px' : '16px 20px',
      border: `2px solid ${colors.error}`,
      borderRadius: '10px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)`,
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      boxShadow: `inset 0 2px 8px rgba(239, 68, 68, 0.1)`,
      fontWeight: '500'
    },
    textarea: {
      width: '100%',
      padding: isMobile ? '14px 16px' : '16px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '10px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: 'all 0.3s ease',
      resize: 'vertical',
      minHeight: '80px',
      fontFamily: 'inherit',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500'
    },
    textareaError: {
      width: '100%',
      padding: isMobile ? '14px 16px' : '16px 20px',
      border: `2px solid ${colors.error}`,
      borderRadius: '10px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)`,
      transition: 'all 0.3s ease',
      resize: 'vertical',
      minHeight: '80px',
      fontFamily: 'inherit',
      boxShadow: `inset 0 2px 8px rgba(239, 68, 68, 0.1)`,
      fontWeight: '500'
    },
    select: {
      width: '100%',
      padding: isMobile ? '14px 16px' : '16px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '10px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: 'pointer',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    errorText: {
      color: colors.error,
      fontSize: '14px',
      margin: '8px 0 0 0',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: isMobile ? '24px' : '32px'
    },
    secondaryButton: {
      padding: isMobile ? '14px 20px' : '16px 28px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '10px',
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '700',
      cursor: 'pointer',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: `0 2px 8px rgba(0,0,0,0.1)`,
      width: isMobile ? '100%' : 'auto'
    },
    primaryButton: {
      padding: isMobile ? '14px 20px' : '16px 28px',
      border: 'none',
      borderRadius: '10px',
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '700',
      cursor: 'pointer',
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: `0 4px 16px ${colors.shadowDark}`,
      width: isMobile ? '100%' : 'auto'
    },
    tableContainer: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: '16px',
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      overflow: 'auto',
      border: `1px solid ${colors.highlight}`,
      position: 'relative'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: isMobile ? '800px' : 'auto'
    },
    tableHeader: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`
    },
    tableHeaderCell: {
      padding: isMobile ? '16px 12px' : '22px 28px',
      textAlign: 'left',
      fontWeight: '800',
      fontSize: isMobile ? '14px' : '16px',
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
      padding: isMobile ? '16px 12px' : '22px 28px',
      fontSize: isMobile ? '14px' : '16px',
      color: colors.dark,
      fontWeight: '500',
      whiteSpace: 'nowrap'
    },
    statusButton: {
      padding: isMobile ? '8px 16px' : '12px 24px',
      border: 'none',
      borderRadius: '25px',
      fontSize: isMobile ? '12px' : '14px',
      fontWeight: '800',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minWidth: isMobile ? '80px' : '110px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: `0 2px 8px rgba(0,0,0,0.2)`
    },
    actionButton: {
      padding: isMobile ? '8px' : '12px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
      color: colors.white,
      boxShadow: `0 2px 8px ${colors.shadowDark}`
    },
    mobileFiltersPanel: {
      position: 'fixed',
      top: 0,
      right: showMobileFilters ? 0 : '-100%',
      width: '280px',
      height: '100vh',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      boxShadow: `-4px 0 32px rgba(0,0,0,0.3)`,
      zIndex: 1001,
      transition: 'right 0.3s ease',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    // Pagination Styles
    paginationContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '16px' : '24px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderTop: `2px solid ${colors.grayLighter}`,
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '16px' : '0'
    },
    paginationInfo: {
      fontSize: isMobile ? '14px' : '16px',
      color: colors.grayDark,
      fontWeight: '600'
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '8px' : '12px'
    },
    paginationButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '8px 12px' : '10px 16px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '8px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      fontSize: isMobile ? '14px' : '16px'
    },
    paginationPageButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: isMobile ? '32px' : '40px',
      height: isMobile ? '32px' : '40px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '6px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      fontSize: isMobile ? '14px' : '16px'
    },
    paginationSelect: {
      padding: isMobile ? '8px 12px' : '10px 16px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '8px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: isMobile ? '14px' : '16px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Popup Notification */}
      {showPopup && (
        <div style={styles.popupContainer}>
          <div style={styles.popupProgressBar} />
          <div style={styles.popupContent}>
            <span style={styles.popupMessage}>{message}</span>
            <button
              style={styles.popupCloseButton}
              onClick={() => {
                setShowPopup(false);
                setMessage("");
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
          <Truck size={isMobile ? 36 : 52} color={colors.white} />
          <div>
            <h1 style={styles.pageTitle}>SUPPLIERS MANAGEMENT</h1>
            <p style={styles.pageSubtitle}>Manage suppliers and their contact information across the system</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={styles.statsContainer}>
        <div 
          style={styles.statCard}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = `0 12px 32px ${colors.shadowDark}, 0 4px 16px rgba(0,0,0,0.2)`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 6px 24px ${colors.shadowDark}, 0 2px 8px rgba(0,0,0,0.1)`;
          }}
        >
          <p style={styles.statNumber}>{suppliersList.length}</p>
          <p style={styles.statLabel}>TOTAL SUPPLIERS</p>
        </div>
        <div 
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
          <p style={{...styles.statNumber, color: colors.success}}>{activeSuppliers}</p>
          <p style={styles.statLabel}>ACTIVE SUPPLIERS</p>
        </div>
        <div 
          style={{
            ...styles.statCard,
            borderLeft: `4px solid ${colors.error}`
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
          <p style={{...styles.statNumber, color: colors.error}}>{inactiveSuppliers}</p>
          <p style={styles.statLabel}>INACTIVE SUPPLIERS</p>
        </div>
      </div>

      {/* Controls - Search, Filter and Add button */}
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
          <input
            type="text"
            placeholder={isMobile ? "Search suppliers..." : "Search suppliers by name, contact person, or email..."}
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
        
        {isMobile ? (
          <>
            <button
              style={styles.mobileFilterButton}
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter size={20} />
              Filters & Actions
            </button>
            
            {/* Mobile Filters Panel */}
            <div style={styles.mobileFiltersPanel}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3 style={{margin: 0, color: colors.dark}}>Filters & Actions</h3>
                <button 
                  style={styles.closeButton}
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X size={24} color={colors.dark} />
                </button>
              </div>
              
              <select 
                value={statusFilter} 
                onChange={e => setStatusFilter(e.target.value)}
                style={{
                  ...styles.filterSelect,
                  background: statusFilter === 'All' ? 
                    `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)` :
                    statusFilter === 'Active' ? 
                    `linear-gradient(135deg, ${colors.light} 0%, #d1fae5 100%)` : 
                    `linear-gradient(135deg, ${colors.light} 0%, #fef3c7 100%)`,
                  borderColor: statusFilter === 'All' ? colors.grayLighter :
                            statusFilter === 'Active' ? colors.success : colors.warning
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

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
                  setFormSupplier({
                    SupplierID: getNextSupplierID().toString(),
                    SupplierName: '',
                    ContactPerson: '',
                    Phone: '',
                    Email: '',
                    Address: '',
                    Status: 'Active',
                  });
                  setEditingSupplierID(null);
                  setFormErrors({});
                  setShowForm(true);
                  setShowMobileFilters(false);
                }}
              >
                <Plus size={20} /> Add New Supplier
              </button>
            </div>
          </>
        ) : (
          <>
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
              style={{
                ...styles.filterSelect,
                background: statusFilter === 'All' ? 
                  `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)` :
                  statusFilter === 'Active' ? 
                  `linear-gradient(135deg, ${colors.light} 0%, #d1fae5 100%)` : 
                  `linear-gradient(135deg, ${colors.light} 0%, #fef3c7 100%)`,
                borderColor: statusFilter === 'All' ? colors.grayLighter :
                          statusFilter === 'Active' ? colors.success : colors.warning
              }}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

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
                setFormSupplier({
                  SupplierID: getNextSupplierID().toString(),
                  SupplierName: '',
                  ContactPerson: '',
                  Phone: '',
                  Email: '',
                  Address: '',
                  Status: 'Active',
                });
                setEditingSupplierID(null);
                setFormErrors({});
                setShowForm(true);
              }}
            >
              <Plus size={24} /> Add New Supplier
            </button>
          </>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingSupplierID ? 'EDIT SUPPLIER' : 'ADD NEW SUPPLIER'}
              </h3>
              <button 
                style={styles.closeButton}
                onClick={() => setShowForm(false)}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X size={28} />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <form onSubmit={handleFormSubmit}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: isMobile ? '16px' : '24px',
                  alignItems: 'start'
                }}>
                  {/* Left Column */}
                  <div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Supplier ID</label>
                      <input 
                        type="text" 
                        value={formSupplier.SupplierID} 
                        disabled 
                        style={{
                          ...styles.input, 
                          backgroundColor: colors.grayLighter,
                          color: colors.grayDark,
                          cursor: 'not-allowed'
                        }} 
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.requiredLabel}>
                        Supplier Name <span style={styles.requiredStar}>*</span>
                      </label>
                      <input
                        type="text"
                        value={formSupplier.SupplierName}
                        onChange={e => handleInputChange('SupplierName', e.target.value)}
                        placeholder="Enter supplier name"
                        style={formErrors.SupplierName ? styles.inputError : styles.input}
                        required
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.SupplierName ? colors.error : colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                      />
                      {formErrors.SupplierName && (
                        <p style={styles.errorText}>❌ {formErrors.SupplierName}</p>
                      )}
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.requiredLabel}>
                        Contact Person <span style={styles.requiredStar}>*</span>
                      </label>
                      <input
                        type="text"
                        value={formSupplier.ContactPerson}
                        onChange={e => handleInputChange('ContactPerson', e.target.value)}
                        placeholder="Enter contact person name"
                        style={formErrors.ContactPerson ? styles.inputError : styles.input}
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.ContactPerson ? colors.error : colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                      />
                      {formErrors.ContactPerson && (
                        <p style={styles.errorText}>❌ {formErrors.ContactPerson}</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div style={styles.formGroup}>
                      <label style={styles.requiredLabel}>
                        Phone Number <span style={styles.requiredStar}>*</span>
                      </label>
                      <input
                        type="tel"
                        value={formSupplier.Phone}
                        onChange={e => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 10) {
                            handleInputChange('Phone', value);
                          }
                        }}
                        placeholder="10-digit phone number"
                        style={formErrors.Phone ? styles.inputError : {
                          ...styles.input,
                          borderColor: formSupplier.Phone && formSupplier.Phone.length !== 10 ? colors.error : colors.grayLighter
                        }}
                        maxLength={10}
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.Phone ? colors.error : 
                            (formSupplier.Phone && formSupplier.Phone.length !== 10 ? colors.error : colors.grayLighter);
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                      />
                      {formErrors.Phone && (
                        <p style={styles.errorText}>❌ {formErrors.Phone}</p>
                      )}
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.requiredLabel}>
                        Email Address <span style={styles.requiredStar}>*</span>
                      </label>
                      <input
                        type="email"
                        value={formSupplier.Email}
                        onChange={e => handleInputChange('Email', e.target.value)}
                        placeholder="Enter email address"
                        style={formErrors.Email ? styles.inputError : styles.input}
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.Email ? colors.error : colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                      />
                      {formErrors.Email && (
                        <p style={styles.errorText}>❌ {formErrors.Email}</p>
                      )}
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Status</label>
                      <select
                        value={formSupplier.Status}
                        onChange={e => setFormSupplier({ ...formSupplier, Status: e.target.value })}
                        style={{
                          ...styles.select,
                          background: formSupplier.Status === 'Active' ? 
                            `linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)` : 
                            `linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)`,
                          borderColor: formSupplier.Status === 'Active' ? colors.success : colors.warning,
                          color: colors.dark
                        }}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Full Width Address Field */}
                <div style={styles.formGroup}>
                  <label style={styles.requiredLabel}>
                    Address <span style={styles.requiredStar}>*</span>
                  </label>
                  <textarea
                    value={formSupplier.Address}
                    onChange={e => handleInputChange('Address', e.target.value)}
                    placeholder="Enter supplier address"
                    style={formErrors.Address ? styles.textareaError : styles.textarea}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = formErrors.Address ? colors.error : colors.grayLighter;
                      e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                    }}
                  />
                  {formErrors.Address && (
                    <p style={styles.errorText}>❌ {formErrors.Address}</p>
                  )}
                </div>

                <div style={styles.buttonGroup}>
                  <button 
                    type="button" 
                    style={styles.secondaryButton}
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={styles.primaryButton}
                  >
                    {editingSupplierID ? 'Update Supplier' : 'Create Supplier'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Suppliers Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>ID</th>
              <th style={styles.tableHeaderCell}>Supplier Name</th>
              {!isMobile && <th style={styles.tableHeaderCell}>Contact Person</th>}
              {!isMobile && <th style={styles.tableHeaderCell}>Contact Info</th>}
              {!isMobile && <th style={styles.tableHeaderCell}>Address</th>}
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isMobile ? 4 : 7} style={{...styles.tableCell, textAlign: 'center', padding: '40px'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
                    <div style={{
                      width: '28px', 
                      height: '28px', 
                      border: '3px solid #f0fdf4', 
                      borderTop: '3px solid #10b981', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    <span style={{fontWeight: '600', color: colors.primary, fontSize: '16px'}}>Loading suppliers...</span>
                  </div>
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((s) => (
                <tr 
                  key={s.SupplierID} 
                  style={styles.tableRow}
                >
                  <td style={{...styles.tableCell, fontWeight: '700', color: colors.primaryDark}}>#{s.SupplierID}</td>
                  <td style={styles.tableCell}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <Building size={isMobile ? 16 : 20} color={colors.primary} />
                      <span>{s.SupplierName}</span>
                    </div>
                    {isMobile && s.ContactPerson && (
                      <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '12px', color: colors.gray}}>
                        <User size={12} />
                        <span>{s.ContactPerson}</span>
                      </div>
                    )}
                    {isMobile && (
                      <div style={{marginTop: '4px', fontSize: '12px', color: colors.gray}}>
                        {s.Phone && <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                          <Phone size={12} /> {s.Phone}
                        </div>}
                        {s.Email && <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                          <Mail size={12} /> {s.Email.substring(0, 20)}...
                        </div>}
                      </div>
                    )}
                  </td>
                  {!isMobile && (
                    <td style={styles.tableCell}>
                      {s.ContactPerson ? (
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <User size={16} color={colors.gray} />
                          <span>{s.ContactPerson}</span>
                        </div>
                      ) : (
                        <span style={{color: colors.grayLight, fontStyle: 'italic'}}>Not specified</span>
                      )}
                    </td>
                  )}
                  {!isMobile && (
                    <td style={styles.tableCell}>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                        {s.Phone && (
                          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <Phone size={16} color={colors.gray} />
                            <span>{s.Phone}</span>
                          </div>
                        )}
                        {s.Email && (
                          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <Mail size={16} color={colors.gray} />
                            <span style={{fontSize: '14px'}}>{s.Email}</span>
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                  {!isMobile && (
                    <td style={styles.tableCell}>
                      {s.Address ? (
                        <div style={{display: 'flex', alignItems: 'flex-start', gap: '8px'}}>
                          <MapPin size={16} color={colors.gray} style={{marginTop: '2px'}} />
                          <span style={{fontSize: '14px', lineHeight: '1.4'}}>
                            {s.Address.length > 50 ? s.Address.substring(0, 50) + '...' : s.Address}
                          </span>
                        </div>
                      ) : (
                        <span style={{color: colors.grayLight, fontStyle: 'italic'}}>Not provided</span>
                      )}
                    </td>
                  )}
                  <td style={styles.tableCell}>
                    <button
                      style={{
                        ...styles.statusButton,
                        background: s.Status === 'Active' ? 
                          `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)` : 
                          `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
                        color: colors.white
                      }}
                      onClick={() => toggleStatus(s)}
                    >
                      {s.Status === 'Active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.actionButton}
                      onClick={() => handleEditSupplier(s)}
                      title="Edit supplier"
                    >
                      <Edit size={isMobile ? 16 : 18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isMobile ? 4 : 7} style={{...styles.tableCell, textAlign: 'center', padding: '40px'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: colors.gray}}>
                    <Building size={isMobile ? 48 : 72} color={colors.grayLight} />
                    <p style={{fontSize: isMobile ? '18px' : '20px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No suppliers found</p>
                    <p style={{fontSize: isMobile ? '14px' : '16px', margin: 0, textAlign: 'center'}}>Try adjusting your search criteria or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {filteredSuppliers.length > 0 && (
          <div style={styles.paginationContainer}>
            <div style={styles.paginationInfo}>
              Showing {startIndex + 1} to {endIndex} of {filteredSuppliers.length} suppliers
            </div>
            
            <div style={styles.paginationControls}>
              {/* Items per page selector */}
              <select 
                value={itemsPerPage} 
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                style={styles.paginationSelect}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>

              {/* First page button */}
              <button
                style={{
                  ...styles.paginationButton,
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                onMouseOver={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                    e.target.style.color = colors.white;
                    e.target.style.borderColor = colors.primary;
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                    e.target.style.color = colors.grayDark;
                    e.target.style.borderColor = colors.grayLighter;
                  }
                }}
              >
                <ChevronsLeft size={isMobile ? 16 : 18} />
              </button>

              {/* Previous page button */}
              <button
                style={{
                  ...styles.paginationButton,
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                onMouseOver={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                    e.target.style.color = colors.white;
                    e.target.style.borderColor = colors.primary;
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                    e.target.style.color = colors.grayDark;
                    e.target.style.borderColor = colors.grayLighter;
                  }
                }}
              >
                <ChevronLeft size={isMobile ? 16 : 18} />
              </button>

              {/* Page numbers */}
              {pageNumbers.map(page => (
                <button
                  key={page}
                  style={{
                    ...styles.paginationPageButton,
                    background: page === currentPage 
                      ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                      : `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
                    color: page === currentPage ? colors.white : colors.grayDark,
                    borderColor: page === currentPage ? colors.primary : colors.grayLighter
                  }}
                  onClick={() => goToPage(page)}
                  onMouseOver={(e) => {
                    if (page !== currentPage) {
                      e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                      e.target.style.color = colors.white;
                      e.target.style.borderColor = colors.primary;
                    }
                  }}
                  onMouseOut={(e) => {
                    if (page !== currentPage) {
                      e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                      e.target.style.color = colors.grayDark;
                      e.target.style.borderColor = colors.grayLighter;
                    }
                  }}
                >
                  {page}
                </button>
              ))}

              {/* Next page button */}
              <button
                style={{
                  ...styles.paginationButton,
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                onMouseOver={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                    e.target.style.color = colors.white;
                    e.target.style.borderColor = colors.primary;
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                    e.target.style.color = colors.grayDark;
                    e.target.style.borderColor = colors.grayLighter;
                  }
                }}
              >
                <ChevronRight size={isMobile ? 16 : 18} />
              </button>

              {/* Last page button */}
              <button
                style={{
                  ...styles.paginationButton,
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                onMouseOver={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                    e.target.style.color = colors.white;
                    e.target.style.borderColor = colors.primary;
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                    e.target.style.color = colors.grayDark;
                    e.target.style.borderColor = colors.grayLighter;
                  }
                }}
              >
                <ChevronsRight size={isMobile ? 16 : 18} />
              </button>
            </div>
          </div>
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
        
        /* Mobile overlay for filters */
        ${showMobileFilters ? `
          .mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
          }
        ` : ''}
      `}</style>
      
      {showMobileFilters && (
        <div 
          className="mobile-overlay"
          onClick={() => setShowMobileFilters(false)}
        />
      )}
    </div>
  );
};

export default Suppliers;