// import { useEffect, useState } from 'react'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { Plus, Edit, Phone, Mail, MapPin, Search, Filter, X, User, Users, UserCheck } from 'lucide-react';
// import {
//   GetAllCustomers,
//   AddCustomersDetails,
//   PutCustomersDetails,
// } from '../../Actions/actionsCustomers';

// const Customers = () => {
//   const dispatch = useDispatch();
//   const { responseBody, loading, msg } = useSelector(state => state.customers);

//   const [customers, setCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [showForm, setShowForm] = useState(false);
//   const [editingCustomerID, setEditingCustomerID] = useState(null);
//   const [message, setMessage] = useState("");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [formErrors, setFormErrors] = useState({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupProgress, setPopupProgress] = useState(100);

//   const [formCustomer, setFormCustomer] = useState({
//     CustomerID: '',
//     CustomerName: '',
//     Phone: '',
//     Email: '',
//     Address: '',
//     Status: 'Active',
//   });

//   // Real World Enterprise Application Color Theme - Same as Units, Categories & Suppliers
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

//   // Check screen size for mobile responsiveness
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Fetch customers
//   useEffect(() => {
//     dispatch(GetAllCustomers());
//   }, [dispatch]);

//   // Map API response and sort by ID descending
//   useEffect(() => {
//     if (responseBody && Array.isArray(responseBody)) {
//       const mapped = responseBody.map(c => ({
//         CustomerID: c.CustomerID,
//         CustomerName: c.CustomerName,
//         Phone: c.Phone,
//         Email: c.Email,
//         Address: c.Address,
//         Status: c.Status === 'A' ? 'Active' : 'Inactive',
//       }));
      
//       // Sort by CustomerID descending (newest first)
//       const sorted = mapped.sort((a, b) => {
//         const idA = parseInt(a.CustomerID, 10) || 0;
//         const idB = parseInt(b.CustomerID, 10) || 0;
//         return idB - idA;
//       });
      
//       setCustomers(sorted);
//     }
//   }, [responseBody]);

//   // Calculate statistics
//   const activeCustomers = customers.filter(c => c.Status === 'Active').length;
//   const inactiveCustomers = customers.filter(c => c.Status === 'Inactive').length;

//   // Fixed search functionality - properly searches by ID
//   const filteredCustomers = customers.filter(c => {
//     const searchLower = searchTerm.toLowerCase();
    
//     const matchesSearch = 
//       c?.CustomerName?.toLowerCase().includes(searchLower) ||
//       c?.CustomerID?.toString().toLowerCase().includes(searchLower) ||
//       c?.Email?.toLowerCase().includes(searchLower) ||
//       (c?.Phone || '').includes(searchTerm);
    
//     const matchesStatus = statusFilter === 'All' || c.Status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   // Next Customer ID
//   const getNextCustomerID = () => {
//     if (customers.length === 0) return 1;
//     const ids = customers.map(c => parseInt(c.CustomerID, 10)).filter(n => !isNaN(n));
//     return Math.max(...ids) + 1;
//   };

//   // Validation functions
//   const validateForm = () => {
//     const errors = {};

//     // Customer Name validation
//     if (!formCustomer.CustomerName.trim()) {
//       errors.CustomerName = 'Customer name is required';
//     } else if (formCustomer.CustomerName.trim().length < 2) {
//       errors.CustomerName = 'Customer name must be at least 2 characters';
//     }

//     // Phone validation
//     if (formCustomer.Phone && formCustomer.Phone.length !== 10) {
//       errors.Phone = 'Phone number must be exactly 10 digits';
//     }

//     // Email validation
//     if (formCustomer.Email && !isValidEmail(formCustomer.Email)) {
//       errors.Email = 'Please enter a valid email address';
//     }

//     // Address validation
//     if (!formCustomer.Address.trim()) {
//       errors.Address = 'Address is required';
//     } else if (formCustomer.Address.trim().length < 10) {
//       errors.Address = 'Address must be at least 10 characters';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Form submit with comprehensive validation
//   const handleFormSubmit = e => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       showPopupMessage("❌ Please fix the form errors before submitting");
//       return;
//     }

//     const payload = {
//       CustomerID: formCustomer.CustomerID,
//       CustomerName: formCustomer.CustomerName.trim(),
//       Phone: formCustomer.Phone,
//       Email: formCustomer.Email,
//       Address: formCustomer.Address.trim(),
//       Status: formCustomer.Status === 'Active' ? 'A' : 'I',
//     };

//     if (editingCustomerID) {
//       dispatch(PutCustomersDetails(payload));
//       showPopupMessage("✅ Customer successfully updated!");
//       setEditingCustomerID(null);
//     } else {
//       dispatch(AddCustomersDetails(payload));
//       showPopupMessage("✅ Customer successfully added!");
//     }

//     // Reset form
//     setFormCustomer({
//       CustomerID: '',
//       CustomerName: '',
//       Phone: '',
//       Email: '',
//       Address: '',
//       Status: 'Active',
//     });
//     setFormErrors({});
//     setShowForm(false);
//   };

//   const handleEditCustomer = customer => {
//     setFormCustomer(customer);
//     setEditingCustomerID(customer.CustomerID);
//     setFormErrors({});
//     setShowForm(true);
//   };

//   const toggleStatus = customer => {
//     const newStatus = customer.Status === 'Active' ? 'Inactive' : 'Active';
//     const payload = {
//       CustomerID: customer.CustomerID,
//       CustomerName: customer.CustomerName,
//       Phone: customer.Phone,
//       Email: customer.Email,
//       Address: customer.Address,
//       Status: newStatus === 'Active' ? 'A' : 'I',
//     };
//     dispatch(PutCustomersDetails(payload));
//     showPopupMessage(`✅ Customer status changed to ${newStatus}`);
//   };

//   // Handle input changes with validation
//   const handleInputChange = (field, value) => {
//     setFormCustomer(prev => ({
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

//   // 3D Industrial CSS Styles with Larger Fonts - Same as Units, Categories & Suppliers
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
//       gap: isMobile ? '12px' : '20px',
//       flexDirection: isMobile ? 'column' : 'row',
//       textAlign: isMobile ? 'center' : 'left'
//     },
//     pageTitle: {
//       fontSize: isMobile ? '28px' : '36px',
//       fontWeight: '800',
//       color: colors.white,
//       margin: 0,
//       textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
//     },
//     pageSubtitle: {
//       fontSize: isMobile ? '16px' : '18px',
//       color: colors.highlight,
//       margin: isMobile ? '4px 0 0 0' : '6px 0 0 0',
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
//       flexWrap: 'wrap',
//       justifyContent: isMobile ? 'center' : 'flex-start'
//     },
//     statCard: {
//       flex: isMobile ? '1 1 120px' : '1',
//       minWidth: isMobile ? '120px' : '220px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       padding: isMobile ? '16px' : '28px',
//       borderRadius: '16px',
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
//       gap: isMobile ? '12px' : '24px',
//       alignItems: 'center',
//       marginBottom: isMobile ? '20px' : '28px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       padding: isMobile ? '16px' : '28px',
//       borderRadius: '16px',
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
//       padding: isMobile ? '14px 16px' : '18px 24px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '12px',
//       fontSize: isMobile ? '16px' : '18px',
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
//       gap: isMobile ? '8px' : '12px',
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
//       borderRadius: '20px',
//       boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
//       width: '100%',
//       maxWidth: isMobile ? '95vw' : '520px',
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
//       marginBottom: isMobile ? '6px' : '10px',
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
//       borderRadius: '10px',
//       fontSize: isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       boxSizing: 'border-box',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     textarea: {
//       width: '100%',
//       padding: isMobile ? '12px 16px' : '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       transition: 'all 0.3s ease',
//       resize: 'vertical',
//       minHeight: isMobile ? '80px' : '100px',
//       fontFamily: 'inherit',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500'
//     },
//     select: {
//       width: '100%',
//       padding: isMobile ? '12px 16px' : '16px 20px',
//       border: `2px solid ${colors.grayLighter}`,
//       borderRadius: '10px',
//       fontSize: isMobile ? '16px' : '18px',
//       background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
//       cursor: 'pointer',
//       boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
//       fontWeight: '500',
//       transition: 'all 0.3s ease'
//     },
//     buttonGroup: {
//       display: 'flex',
//       gap: isMobile ? '12px' : '16px',
//       justifyContent: 'flex-end',
//       marginTop: isMobile ? '24px' : '32px',
//       flexDirection: isMobile ? 'column' : 'row'
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
//       padding: isMobile ? '10px 16px' : '12px 24px',
//       border: 'none',
//       borderRadius: '25px',
//       fontSize: isMobile ? '12px' : '14px',
//       fontWeight: '800',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       minWidth: isMobile ? '90px' : '110px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       boxShadow: `0 2px 8px rgba(0,0,0,0.2)`
//     },
//     actionButton: {
//       padding: isMobile ? '10px' : '12px',
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
//     errorText: {
//       color: colors.error,
//       fontSize: isMobile ? '12px' : '14px',
//       fontWeight: '600',
//       margin: '8px 0 0 0',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px'
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
//           <UserCheck size={isMobile ? 40 : 52} color={colors.white} />
//           <div>
//             <h1 style={styles.pageTitle}>CUSTOMERS MANAGEMENT</h1>
//             <p style={styles.pageSubtitle}>Manage customers and their contact information across the system</p>
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
//           <p style={styles.statNumber}>{customers.length}</p>
//           <p style={styles.statLabel}>TOTAL CUSTOMERS</p>
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
//           <p style={{...styles.statNumber, color: colors.success}}>{activeCustomers}</p>
//           <p style={styles.statLabel}>ACTIVE CUSTOMERS</p>
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
//           <p style={{...styles.statNumber, color: colors.error}}>{inactiveCustomers}</p>
//           <p style={styles.statLabel}>INACTIVE CUSTOMERS</p>
//         </div>
//       </div>

//       {/* Controls - Search, Filter and Add button */}
//       <div style={styles.controls}>
//         <div style={styles.searchBox}>
//           <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder="Search customers by name, phone, or email..."
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
//             setFormCustomer({
//               CustomerID: getNextCustomerID().toString(),
//               CustomerName: '',
//               Phone: '',
//               Email: '',
//               Address: '',
//               Status: 'Active',
//             });
//             setEditingCustomerID(null);
//             setFormErrors({});
//             setShowForm(true);
//           }}
//         >
//           <Plus size={isMobile ? 20 : 24} /> Add New Customer
//         </button>
//       </div>

//      {/* Form Modal */}
//       {showForm && (
//         <div style={styles.modalOverlay}>
//           <div style={{
//             ...styles.modalContent,
//             maxWidth: isMobile ? '95vw' : '800px',
//             width: '90vw',
//             maxHeight: '95vh',
//             overflow: 'hidden'
//           }}>
//             <div style={styles.modalHeader}>
//               <h3 style={styles.modalTitle}>
//                 {editingCustomerID ? 'EDIT CUSTOMER' : 'ADD NEW CUSTOMER'}
//               </h3>
//               <button 
//                 style={styles.closeButton}
//                 onClick={() => setShowForm(false)}
//                 onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
//               >
//                 <X size={isMobile ? 24 : 28} />
//               </button>
//             </div>
            
//             <div style={{
//               ...styles.modalBody,
//               maxHeight: 'calc(95vh - 120px)',
//               overflowY: 'auto',
//               padding: isMobile ? '20px' : '32px'
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
//                       <label style={styles.label}>Customer ID</label>
//                       <input 
//                         type="text" 
//                         value={formCustomer.CustomerID} 
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
//                       <label style={styles.label}>Customer Name *</label>
//                       <input
//                         type="text"
//                         value={formCustomer.CustomerName}
//                         onChange={e => handleInputChange('CustomerName', e.target.value)}
//                         placeholder="Enter customer name"
//                         style={{
//                           ...styles.input,
//                           borderColor: formErrors.CustomerName ? colors.error : colors.grayLighter
//                         }}
//                         required
//                         onFocus={(e) => {
//                           e.target.style.borderColor = formErrors.CustomerName ? colors.error : colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = formErrors.CustomerName ? colors.error : colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                       />
//                       {formErrors.CustomerName && (
//                         <p style={styles.errorText}>⚠️ {formErrors.CustomerName}</p>
//                       )}
//                     </div>

//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Phone Number *</label>
//                       <input
//                         type="tel"
//                         value={formCustomer.Phone}
//                         onChange={e => {
//                           const value = e.target.value.replace(/\D/g, '');
//                           if (value.length <= 10) {
//                             handleInputChange('Phone', value);
//                           }
//                         }}
//                         placeholder="10-digit phone number"
//                         style={{
//                           ...styles.input,
//                           borderColor: formErrors.Phone ? colors.error : colors.grayLighter
//                         }}
//                         maxLength={10}
//                         required
//                         onFocus={(e) => {
//                           e.target.style.borderColor = formErrors.Phone ? colors.error : colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = formErrors.Phone ? colors.error : colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                       />
//                       {formErrors.Phone && (
//                         <p style={styles.errorText}>⚠️ {formErrors.Phone}</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Right Column */}
//                   <div>
//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Email Address</label>
//                       <input
//                         type="email"
//                         value={formCustomer.Email}
//                         onChange={e => handleInputChange('Email', e.target.value)}
//                         placeholder="Enter email address"
//                         style={{
//                           ...styles.input,
//                           borderColor: formErrors.Email ? colors.error : colors.grayLighter
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = formErrors.Email ? colors.error : colors.primary;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = formErrors.Email ? colors.error : colors.grayLighter;
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                         }}
//                       />
//                       {formErrors.Email && (
//                         <p style={styles.errorText}>⚠️ {formErrors.Email}</p>
//                       )}
//                     </div>

//                     <div style={styles.formGroup}>
//                       <label style={styles.label}>Status</label>
//                       <select
//                         value={formCustomer.Status}
//                         onChange={e => handleInputChange('Status', e.target.value)}
//                         style={{
//                           ...styles.select,
//                           background: formCustomer.Status === 'Active' ? 
//                             `linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)` : 
//                             `linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)`,
//                           borderColor: formCustomer.Status === 'Active' ? colors.success : colors.warning,
//                           color: colors.dark
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
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
//                   <label style={styles.label}>Address *</label>
//                   <textarea
//                     value={formCustomer.Address}
//                     onChange={e => handleInputChange('Address', e.target.value)}
//                     placeholder="Enter complete customer address"
//                     style={{
//                       ...styles.textarea,
//                       width: '100%',
//                       minHeight: '80px',
//                       borderColor: formErrors.Address ? colors.error : colors.grayLighter
//                     }}
//                     required
//                     onFocus={(e) => {
//                       e.target.style.borderColor = formErrors.Address ? colors.error : colors.primary;
//                       e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = formErrors.Address ? colors.error : colors.grayLighter;
//                       e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
//                     }}
//                   />
//                   {formErrors.Address && (
//                     <p style={styles.errorText}>⚠️ {formErrors.Address}</p>
//                   )}
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
//                     onClick={() => setShowForm(false)}
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
//                     {editingCustomerID ? 'Update Customer' : 'Create Customer'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Customers Table */}
//       <div style={styles.tableContainer}>
//         <table style={styles.table}>
//           <thead style={styles.tableHeader}>
//             <tr>
//               <th style={styles.tableHeaderCell}>Customer ID</th>
//               <th style={styles.tableHeaderCell}>Customer Name</th>
//               <th style={styles.tableHeaderCell}>Contact Info</th>
//               <th style={styles.tableHeaderCell}>Address</th>
//               <th style={styles.tableHeaderCell}>Status</th>
//               <th style={styles.tableHeaderCell}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={6} style={{...styles.tableCell, textAlign: 'center', padding: isMobile ? '40px' : '60px'}}>
//                   <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
//                     <div style={{
//                       width: isMobile ? '24px' : '28px', 
//                       height: isMobile ? '24px' : '28px', 
//                       border: '3px solid #f0fdf4', 
//                       borderTop: '3px solid #10b981', 
//                       borderRadius: '50%', 
//                       animation: 'spin 1s linear infinite'
//                     }}></div>
//                     <span style={{fontWeight: '600', color: colors.primary, fontSize: isMobile ? '16px' : '18px'}}>Loading customers...</span>
//                   </div>
//                 </td>
//               </tr>
//             ) : filteredCustomers.length > 0 ? (
//               filteredCustomers.map((c) => (
//                 <tr 
//                   key={c.CustomerID} 
//                   style={styles.tableRow}
//                   onMouseOver={(e) => {
//                     e.currentTarget.style.background = `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`;
//                     e.currentTarget.style.transform = 'scale(1.01)';
//                   }}
//                   onMouseOut={(e) => {
//                     e.currentTarget.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
//                     e.currentTarget.style.transform = 'scale(1)';
//                   }}
//                 >
//                   <td style={{...styles.tableCell, fontWeight: '700', color: colors.primaryDark}}>#{c.CustomerID}</td>
//                   <td style={styles.tableCell}>
//                     <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '12px'}}>
//                       <User size={isMobile ? 16 : 20} color={colors.primary} />
//                       {c.CustomerName}
//                     </div>
//                   </td>
//                   <td style={styles.tableCell}>
//                     <div style={{display: 'flex', flexDirection: 'column', gap: isMobile ? '4px' : '8px'}}>
//                       {c.Phone && (
//                         <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px'}}>
//                           <Phone size={isMobile ? 14 : 16} color={colors.gray} />
//                           <span style={{fontSize: isMobile ? '13px' : 'inherit'}}>{c.Phone}</span>
//                         </div>
//                       )}
//                       {c.Email && (
//                         <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px'}}>
//                           <Mail size={isMobile ? 14 : 16} color={colors.gray} />
//                           <span style={{fontSize: isMobile ? '13px' : '14px'}}>{c.Email}</span>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                   <td style={styles.tableCell}>
//                     {c.Address ? (
//                       <div style={{display: 'flex', alignItems: 'flex-start', gap: isMobile ? '6px' : '8px'}}>
//                         <MapPin size={isMobile ? 14 : 16} color={colors.gray} style={{marginTop: '2px'}} />
//                         <span style={{fontSize: isMobile ? '13px' : '14px', lineHeight: '1.4'}}>{c.Address}</span>
//                       </div>
//                     ) : (
//                       <span style={{color: colors.grayLight, fontStyle: 'italic', fontSize: isMobile ? '13px' : 'inherit'}}>Not provided</span>
//                     )}
//                   </td>
//                   <td style={styles.tableCell}>
//                     <button
//                       style={{
//                         ...styles.statusButton,
//                         background: c.Status === 'Active' ? 
//                           `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)` : 
//                           `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
//                         color: colors.white
//                       }}
//                       onMouseOver={(e) => {
//                         e.target.style.transform = 'scale(1.1)';
//                         e.target.style.boxShadow = `0 4px 16px rgba(0,0,0,0.3)`;
//                       }}
//                       onMouseOut={(e) => {
//                         e.target.style.transform = 'scale(1)';
//                         e.target.style.boxShadow = `0 2px 8px rgba(0,0,0,0.2)`;
//                       }}
//                       onClick={() => toggleStatus(c)}
//                     >
//                       {c.Status === 'Active' ? 'Active' : 'Inactive'}
//                     </button>
//                   </td>
//                   <td style={styles.tableCell}>
//                     <button
//                       style={styles.actionButton}
//                       onMouseOver={(e) => {
//                         e.target.style.transform = 'scale(1.1)';
//                         e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
//                         e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
//                       }}
//                       onMouseOut={(e) => {
//                         e.target.style.transform = 'scale(1)';
//                         e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
//                         e.target.style.boxShadow = `0 2px 8px ${colors.shadowDark}`;
//                       }}
//                       onClick={() => handleEditCustomer(c)}
//                       title="Edit customer"
//                     >
//                       <Edit size={isMobile ? 16 : 18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={6} style={{...styles.tableCell, textAlign: 'center', padding: isMobile ? '40px' : '60px'}}>
//                   <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '12px' : '16px', color: colors.gray}}>
//                     <Users size={isMobile ? 48 : 72} color={colors.grayLight} />
//                     <p style={{fontSize: isMobile ? '18px' : '20px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No customers found</p>
//                     <p style={{fontSize: isMobile ? '14px' : '16px', margin: 0}}>Try adjusting your search criteria or filters</p>
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
//       `}</style>
//     </div>
//   );
// };

// export default Customers;

import { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit, Phone, Mail, MapPin, Search, Filter, X, User, Users, UserCheck, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  GetAllCustomers,
  AddCustomersDetails,
  PutCustomersDetails,
} from '../../Actions/actionsCustomers';

const Customers = () => {
  const dispatch = useDispatch();
  const { responseBody, loading, msg } = useSelector(state => state.customers);

  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingCustomerID, setEditingCustomerID] = useState(null);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [formErrors, setFormErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupProgress, setPopupProgress] = useState(100);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [formCustomer, setFormCustomer] = useState({
    CustomerID: '',
    CustomerName: '',
    Phone: '',
    Email: '',
    Address: '',
    Status: 'Active',
  });

  // Real World Enterprise Application Color Theme - Same as Units, Categories & Suppliers
  const colors = {
    // Primary Colors - Professional Blue Theme
    primaryDark: '#1e40af',
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    
    // Secondary Colors - Professional Green
    secondaryDark: '#059669',
    secondary: '#10b981',
    secondaryLight: '#34d399',
    
    // Status Colors - Enterprise Standards
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
    
    // Neutral Colors - Professional Gray Scale
    dark: '#1f2937',
    grayDark: '#374151',
    gray: '#6b7280',
    grayLight: '#9ca3af',
    grayLighter: '#e5e7eb',
    light: '#f9fafb',
    white: '#ffffff',
    
    // Data Visualization Colors
    blue: '#3b82f6',
    green: '#10b981',
    red: '#ef4444',
    yellow: '#f59e0b',
    purple: '#8b5cf6',
    indigo: '#6366f1',
    
    // 3D Effect Colors
    shadowDark: 'rgba(30, 64, 175, 0.2)',
    shadowLight: 'rgba(16, 185, 129, 0.1)',
    highlight: 'rgba(255, 255, 255, 0.9)',
  };

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

  // Check screen size for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch customers
  useEffect(() => {
    dispatch(GetAllCustomers());
  }, [dispatch]);

  // Map API response and sort by ID descending
  useEffect(() => {
    if (responseBody && Array.isArray(responseBody)) {
      const mapped = responseBody.map(c => ({
        CustomerID: c.CustomerID,
        CustomerName: c.CustomerName,
        Phone: c.Phone,
        Email: c.Email,
        Address: c.Address,
        Status: c.Status === 'A' ? 'Active' : 'Inactive',
      }));
      
      // Sort by CustomerID descending (newest first)
      const sorted = mapped.sort((a, b) => {
        const idA = parseInt(a.CustomerID, 10) || 0;
        const idB = parseInt(b.CustomerID, 10) || 0;
        return idB - idA;
      });
      
      setCustomers(sorted);
    }
  }, [responseBody]);

  // Calculate statistics
  const activeCustomers = customers.filter(c => c.Status === 'Active').length;
  const inactiveCustomers = customers.filter(c => c.Status === 'Inactive').length;

  // Fixed search functionality - properly searches by ID
  const filteredCustomers = customers.filter(c => {
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = 
      c?.CustomerName?.toLowerCase().includes(searchLower) ||
      c?.CustomerID?.toString().toLowerCase().includes(searchLower) ||
      c?.Email?.toLowerCase().includes(searchLower) ||
      (c?.Phone || '').includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All' || c.Status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  useEffect(() => {
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    setTotalPages(totalPages || 1);
    
    // Reset to first page if current page is beyond new total pages
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredCustomers, itemsPerPage, currentPage]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCustomers.slice(startIndex, endIndex);
  };

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Next Customer ID
  const getNextCustomerID = () => {
    if (customers.length === 0) return 1;
    const ids = customers.map(c => parseInt(c.CustomerID, 10)).filter(n => !isNaN(n));
    return Math.max(...ids) + 1;
  };

  // Validation functions
  const validateForm = () => {
    const errors = {};

    // Customer Name validation
    if (!formCustomer.CustomerName.trim()) {
      errors.CustomerName = 'Customer name is required';
    } else if (formCustomer.CustomerName.trim().length < 2) {
      errors.CustomerName = 'Customer name must be at least 2 characters';
    }

    // Phone validation
    if (formCustomer.Phone && formCustomer.Phone.length !== 10) {
      errors.Phone = 'Phone number must be exactly 10 digits';
    }

    // Email validation
    if (formCustomer.Email && !isValidEmail(formCustomer.Email)) {
      errors.Email = 'Please enter a valid email address';
    }

    // Address validation
    if (!formCustomer.Address.trim()) {
      errors.Address = 'Address is required';
    } else if (formCustomer.Address.trim().length < 10) {
      errors.Address = 'Address must be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form submit with comprehensive validation
  const handleFormSubmit = e => {
    e.preventDefault();
    
    if (!validateForm()) {
      showPopupMessage("❌ Please fix the form errors before submitting");
      return;
    }

    const payload = {
      CustomerID: formCustomer.CustomerID,
      CustomerName: formCustomer.CustomerName.trim(),
      Phone: formCustomer.Phone,
      Email: formCustomer.Email,
      Address: formCustomer.Address.trim(),
      Status: formCustomer.Status === 'Active' ? 'A' : 'I',
    };

    if (editingCustomerID) {
      dispatch(PutCustomersDetails(payload));
      showPopupMessage("✅ Customer successfully updated!");
      setEditingCustomerID(null);
    } else {
      dispatch(AddCustomersDetails(payload));
      showPopupMessage("✅ Customer successfully added!");
    }

    // Reset form
    setFormCustomer({
      CustomerID: '',
      CustomerName: '',
      Phone: '',
      Email: '',
      Address: '',
      Status: 'Active',
    });
    setFormErrors({});
    setShowForm(false);
  };

  const handleEditCustomer = customer => {
    setFormCustomer(customer);
    setEditingCustomerID(customer.CustomerID);
    setFormErrors({});
    setShowForm(true);
  };

  const toggleStatus = customer => {
    const newStatus = customer.Status === 'Active' ? 'Inactive' : 'Active';
    const payload = {
      CustomerID: customer.CustomerID,
      CustomerName: customer.CustomerName,
      Phone: customer.Phone,
      Email: customer.Email,
      Address: customer.Address,
      Status: newStatus === 'Active' ? 'A' : 'I',
    };
    dispatch(PutCustomersDetails(payload));
    showPopupMessage(`✅ Customer status changed to ${newStatus}`);
  };

  // Handle input changes with validation
  const handleInputChange = (field, value) => {
    setFormCustomer(prev => ({
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

  // 3D Industrial CSS Styles with Larger Fonts - Same as Units, Categories & Suppliers
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
      gap: isMobile ? '12px' : '20px',
      flexDirection: isMobile ? 'column' : 'row',
      textAlign: isMobile ? 'center' : 'left'
    },
    pageTitle: {
      fontSize: isMobile ? '28px' : '36px',
      fontWeight: '800',
      color: colors.white,
      margin: 0,
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    pageSubtitle: {
      fontSize: isMobile ? '16px' : '18px',
      color: colors.highlight,
      margin: isMobile ? '4px 0 0 0' : '6px 0 0 0',
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
      flexWrap: 'wrap',
      justifyContent: isMobile ? 'center' : 'flex-start'
    },
    statCard: {
      flex: isMobile ? '1 1 120px' : '1',
      minWidth: isMobile ? '120px' : '220px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: isMobile ? '16px' : '28px',
      borderRadius: '16px',
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
      gap: isMobile ? '12px' : '24px',
      alignItems: 'center',
      marginBottom: isMobile ? '20px' : '28px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: isMobile ? '16px' : '28px',
      borderRadius: '16px',
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
      position: 'relative',
      flexDirection: isMobile ? 'column' : 'row'
    },
    searchBox: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flex: '1',
      maxWidth: 'none',
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
      padding: isMobile ? '14px 16px' : '18px 24px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '12px',
      fontSize: isMobile ? '16px' : '18px',
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
      gap: isMobile ? '8px' : '12px',
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
      padding: isMobile ? '10px' : '20px',
      backdropFilter: 'blur(8px)'
    },
    modalContent: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: '20px',
      boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
      width: '100%',
      maxWidth: isMobile ? '95vw' : '520px',
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
      marginBottom: isMobile ? '6px' : '10px',
      fontWeight: '700',
      color: colors.dark,
      fontSize: isMobile ? '14px' : '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    input: {
      width: '100%',
      padding: isMobile ? '12px 16px' : '16px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '10px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500'
    },
    textarea: {
      width: '100%',
      padding: isMobile ? '12px 16px' : '16px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '10px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: 'all 0.3s ease',
      resize: 'vertical',
      minHeight: isMobile ? '80px' : '100px',
      fontFamily: 'inherit',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500'
    },
    select: {
      width: '100%',
      padding: isMobile ? '12px 16px' : '16px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '10px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: 'pointer',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    buttonGroup: {
      display: 'flex',
      gap: isMobile ? '12px' : '16px',
      justifyContent: 'flex-end',
      marginTop: isMobile ? '24px' : '32px',
      flexDirection: isMobile ? 'column' : 'row'
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
      padding: isMobile ? '10px 16px' : '12px 24px',
      border: 'none',
      borderRadius: '25px',
      fontSize: isMobile ? '12px' : '14px',
      fontWeight: '800',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minWidth: isMobile ? '90px' : '110px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: `0 2px 8px rgba(0,0,0,0.2)`
    },
    actionButton: {
      padding: isMobile ? '10px' : '12px',
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
    errorText: {
      color: colors.error,
      fontSize: isMobile ? '12px' : '14px',
      fontWeight: '600',
      margin: '8px 0 0 0',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
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
  const endIndex = Math.min(startIndex + itemsPerPage, filteredCustomers.length);

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
          <UserCheck size={isMobile ? 40 : 52} color={colors.white} />
          <div>
            <h1 style={styles.pageTitle}>CUSTOMERS MANAGEMENT</h1>
            <p style={styles.pageSubtitle}>Manage customers and their contact information across the system</p>
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
          <p style={styles.statNumber}>{customers.length}</p>
          <p style={styles.statLabel}>TOTAL CUSTOMERS</p>
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
          <p style={{...styles.statNumber, color: colors.success}}>{activeCustomers}</p>
          <p style={styles.statLabel}>ACTIVE CUSTOMERS</p>
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
          <p style={{...styles.statNumber, color: colors.error}}>{inactiveCustomers}</p>
          <p style={styles.statLabel}>INACTIVE CUSTOMERS</p>
        </div>
      </div>

      {/* Controls - Search, Filter and Add button */}
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search customers by name, phone, or email..."
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
            setFormCustomer({
              CustomerID: getNextCustomerID().toString(),
              CustomerName: '',
              Phone: '',
              Email: '',
              Address: '',
              Status: 'Active',
            });
            setEditingCustomerID(null);
            setFormErrors({});
            setShowForm(true);
          }}
        >
          <Plus size={isMobile ? 20 : 24} /> Add New Customer
        </button>
      </div>

     {/* Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={{
            ...styles.modalContent,
            maxWidth: isMobile ? '95vw' : '800px',
            width: '90vw',
            maxHeight: '95vh',
            overflow: 'hidden'
          }}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingCustomerID ? 'EDIT CUSTOMER' : 'ADD NEW CUSTOMER'}
              </h3>
              <button 
                style={styles.closeButton}
                onClick={() => setShowForm(false)}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X size={isMobile ? 24 : 28} />
              </button>
            </div>
            
            <div style={{
              ...styles.modalBody,
              maxHeight: 'calc(95vh - 120px)',
              overflowY: 'auto',
              padding: isMobile ? '20px' : '32px'
            }}>
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
                      <label style={styles.label}>Customer ID</label>
                      <input 
                        type="text" 
                        value={formCustomer.CustomerID} 
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
                      <label style={styles.label}>Customer Name *</label>
                      <input
                        type="text"
                        value={formCustomer.CustomerName}
                        onChange={e => handleInputChange('CustomerName', e.target.value)}
                        placeholder="Enter customer name"
                        style={{
                          ...styles.input,
                          borderColor: formErrors.CustomerName ? colors.error : colors.grayLighter
                        }}
                        required
                        onFocus={(e) => {
                          e.target.style.borderColor = formErrors.CustomerName ? colors.error : colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.CustomerName ? colors.error : colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                      />
                      {formErrors.CustomerName && (
                        <p style={styles.errorText}>⚠️ {formErrors.CustomerName}</p>
                      )}
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Phone Number *</label>
                      <input
                        type="tel"
                        value={formCustomer.Phone}
                        onChange={e => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 10) {
                            handleInputChange('Phone', value);
                          }
                        }}
                        placeholder="10-digit phone number"
                        style={{
                          ...styles.input,
                          borderColor: formErrors.Phone ? colors.error : colors.grayLighter
                        }}
                        maxLength={10}
                        required
                        onFocus={(e) => {
                          e.target.style.borderColor = formErrors.Phone ? colors.error : colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.Phone ? colors.error : colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                      />
                      {formErrors.Phone && (
                        <p style={styles.errorText}>⚠️ {formErrors.Phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Email Address</label>
                      <input
                        type="email"
                        value={formCustomer.Email}
                        onChange={e => handleInputChange('Email', e.target.value)}
                        placeholder="Enter email address"
                        style={{
                          ...styles.input,
                          borderColor: formErrors.Email ? colors.error : colors.grayLighter
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = formErrors.Email ? colors.error : colors.primary;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.Email ? colors.error : colors.grayLighter;
                          e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                        }}
                      />
                      {formErrors.Email && (
                        <p style={styles.errorText}>⚠️ {formErrors.Email}</p>
                      )}
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Status</label>
                      <select
                        value={formCustomer.Status}
                        onChange={e => handleInputChange('Status', e.target.value)}
                        style={{
                          ...styles.select,
                          background: formCustomer.Status === 'Active' ? 
                            `linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)` : 
                            `linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)`,
                          borderColor: formCustomer.Status === 'Active' ? colors.success : colors.warning,
                          color: colors.dark
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
                  </div>
                </div>

                {/* Full Width Address Field */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Address *</label>
                  <textarea
                    value={formCustomer.Address}
                    onChange={e => handleInputChange('Address', e.target.value)}
                    placeholder="Enter complete customer address"
                    style={{
                      ...styles.textarea,
                      width: '100%',
                      minHeight: '80px',
                      borderColor: formErrors.Address ? colors.error : colors.grayLighter
                    }}
                    required
                    onFocus={(e) => {
                      e.target.style.borderColor = formErrors.Address ? colors.error : colors.primary;
                      e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 3px ${colors.shadowLight}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = formErrors.Address ? colors.error : colors.grayLighter;
                      e.target.style.boxShadow = `inset 0 2px 8px rgba(0,0,0,0.1)`;
                    }}
                  />
                  {formErrors.Address && (
                    <p style={styles.errorText}>⚠️ {formErrors.Address}</p>
                  )}
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
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={styles.primaryButton}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
                      e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
                      e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
                    }}
                  >
                    {editingCustomerID ? 'Update Customer' : 'Create Customer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Customer ID</th>
              <th style={styles.tableHeaderCell}>Customer Name</th>
              <th style={styles.tableHeaderCell}>Contact Info</th>
              <th style={styles.tableHeaderCell}>Address</th>
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{...styles.tableCell, textAlign: 'center', padding: isMobile ? '40px' : '60px'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
                    <div style={{
                      width: isMobile ? '24px' : '28px', 
                      height: isMobile ? '24px' : '28px', 
                      border: '3px solid #f0fdf4', 
                      borderTop: '3px solid #10b981', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    <span style={{fontWeight: '600', color: colors.primary, fontSize: isMobile ? '16px' : '18px'}}>Loading customers...</span>
                  </div>
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((c) => (
                <tr 
                  key={c.CustomerID} 
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
                  <td style={{...styles.tableCell, fontWeight: '700', color: colors.primaryDark}}>#{c.CustomerID}</td>
                  <td style={styles.tableCell}>
                    <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '12px'}}>
                      <User size={isMobile ? 16 : 20} color={colors.primary} />
                      {c.CustomerName}
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: isMobile ? '4px' : '8px'}}>
                      {c.Phone && (
                        <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px'}}>
                          <Phone size={isMobile ? 14 : 16} color={colors.gray} />
                          <span style={{fontSize: isMobile ? '13px' : 'inherit'}}>{c.Phone}</span>
                        </div>
                      )}
                      {c.Email && (
                        <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px'}}>
                          <Mail size={isMobile ? 14 : 16} color={colors.gray} />
                          <span style={{fontSize: isMobile ? '13px' : '14px'}}>{c.Email}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    {c.Address ? (
                      <div style={{display: 'flex', alignItems: 'flex-start', gap: isMobile ? '6px' : '8px'}}>
                        <MapPin size={isMobile ? 14 : 16} color={colors.gray} style={{marginTop: '2px'}} />
                        <span style={{fontSize: isMobile ? '13px' : '14px', lineHeight: '1.4'}}>{c.Address}</span>
                      </div>
                    ) : (
                      <span style={{color: colors.grayLight, fontStyle: 'italic', fontSize: isMobile ? '13px' : 'inherit'}}>Not provided</span>
                    )}
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      style={{
                        ...styles.statusButton,
                        background: c.Status === 'Active' ? 
                          `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)` : 
                          `linear-gradient(135deg, ${colors.warning} 0%, #d97706 100%)`,
                        color: colors.white
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = `0 4px 16px rgba(0,0,0,0.3)`;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = `0 2px 8px rgba(0,0,0,0.2)`;
                      }}
                      onClick={() => toggleStatus(c)}
                    >
                      {c.Status === 'Active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td style={styles.tableCell}>
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
                      onClick={() => handleEditCustomer(c)}
                      title="Edit customer"
                    >
                      <Edit size={isMobile ? 16 : 18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{...styles.tableCell, textAlign: 'center', padding: isMobile ? '40px' : '60px'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '12px' : '16px', color: colors.gray}}>
                    <Users size={isMobile ? 48 : 72} color={colors.grayLight} />
                    <p style={{fontSize: isMobile ? '18px' : '20px', margin: 0, fontWeight: '700', color: colors.grayDark}}>No customers found</p>
                    <p style={{fontSize: isMobile ? '14px' : '16px', margin: 0}}>Try adjusting your search criteria or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {filteredCustomers.length > 0 && (
          <div style={styles.paginationContainer}>
            <div style={styles.paginationInfo}>
              Showing {startIndex + 1} to {endIndex} of {filteredCustomers.length} customers
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
      `}</style>
    </div>
  );
};

export default Customers;