import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Search, X, Upload, Package, ChevronDown, BookOpen, Ruler, Menu, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter } from "lucide-react";
import {
  GetAllProducts,
  AddProductsDetails,
  PutProductsDetails,
  GetProductImageUrl
} from "../../Actions/actionsProducts";
import { GetAllCategories, AddCategoriesDetails } from "../../Actions/actionsCategories";
import { GetAllUnits, AddUnitsDetails } from "../../Actions/actionsUnits";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responseBody: products = [], loading } = useSelector(
    (state) => state.products
  );
  const { responseBody: categories = [] } = useSelector(
    (state) => state.categories
  );
  const { units = [] } = useSelector((state) => state.units);

  const [localProducts, setLocalProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    ProductID: "",
    ProductName: "",
    CategoryID: "",
    UnitID: "",
    UnitPrice: "",
    ImageURL: "",
    Status: "Active",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupProgress, setPopupProgress] = useState(100);

  // Dropdown states
  const [categorySearch, setCategorySearch] = useState("");
  const [unitSearch, setUnitSearch] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);

  // New category and unit states
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showNewUnitForm, setShowNewUnitForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newUnitName, setNewUnitName] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginationItemsPerPage, setPaginationItemsPerPage] = useState(10);

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

  // Check mobile view on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Real World Enterprise Application Color Theme - Same as Stock Transactions
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

  // Format number with thousand separators
  const formatNumber = (number) => {
    if (number === null || number === undefined || number === '') return '0.00';
    const num = typeof number === 'string' ? parseFloat(number) : number;
    if (isNaN(num)) return '0.00';
    
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  // Get product image URL - FIXED VERSION
  const getProductImageUrl = (product) => {
    if (!product.ProductID) return null;
    
    // Use the imported GetProductImageUrl function from your API service
    // This will generate the correct backend URL: http://localhost:60748/Products/PhotoPreview?ProductID=xxx
    return GetProductImageUrl(product.ProductID);
  };

  // Fetch products, categories, units
  useEffect(() => {
    dispatch(GetAllProducts());
    dispatch(GetAllCategories());
    dispatch(GetAllUnits());
  }, [dispatch]);

  // Map API response and sort in descending order by Product ID
  useEffect(() => {
    if (Array.isArray(products)) {
      const mapped = products.map((p) => ({
        ProductID: p.ProductID,
        ProductName: p.ProductName,
        CategoryID: p.CategoryID,
        UnitID: p.UnitID,
        UnitPrice: p.UnitPrice,
        ImageURL: p.ProductImagePath,
        Status: p.Status === "A" ? "Active" : "Inactive",
      }));
      const sorted = mapped.sort((a, b) => b.ProductID - a.ProductID);
      setLocalProducts(sorted);
    }
  }, [products]);

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.CategoryName?.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Filter units based on search
  const filteredUnits = units.filter(unit =>
    unit.UnitName?.toLowerCase().includes(unitSearch.toLowerCase())
  );

  // Get selected category name
  const getSelectedCategoryName = () => {
    const selectedCategory = categories.find(c => c.CategoryID === formData.CategoryID);
    return selectedCategory ? selectedCategory.CategoryName : "Select Category";
  };

  // Get selected unit name
  const getSelectedUnitName = () => {
    const selectedUnit = units.find(u => u.UnitID === formData.UnitID);
    return selectedUnit ? selectedUnit.UnitName : "Select Unit";
  };

  // Generate next IDs
  const generateProductID = () => {
    if (localProducts.length === 0) return "1";
    const ids = localProducts.map((p) => Number(p.ProductID)).filter((n) => !isNaN(n));
    return String(Math.max(...ids) + 1);
  };

  const getNextCategoryID = () => {
    if (categories.length === 0) return "1";
    const numericIDs = categories
      .map((c) => parseInt(c.CategoryID, 10))
      .filter((n) => !isNaN(n));
    const maxID = Math.max(...numericIDs);
    return String(maxID + 1);
  };

  const getNextUnitID = () => {
    if (units.length === 0) return "1";
    const numericIDs = units
      .map((u) => parseInt(u.UnitID, 10))
      .filter((n) => !isNaN(n));
    return String(Math.max(...numericIDs) + 1);
  };

  const filteredProducts = localProducts.filter(
    (p) =>
      (p.ProductName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ProductID?.toString().includes(searchTerm)) &&
      (statusFilter === 'All' || p.Status === statusFilter)
  );

  // Calculate statistics
  const activeProducts = localProducts.filter(p => p.Status === 'Active').length;
  const inactiveProducts = localProducts.filter(p => p.Status === 'Inactive').length;

  // Pagination calculations
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current items for the table
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = isMobile ? 3 : 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/jfif'];
      if (!validTypes.includes(file.type)) {
        showPopupMessage("⚠️ Please select a valid image file (JPEG, PNG, GIF)", true);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showPopupMessage("⚠️ Image size should be less than 5MB", true);
        return;
      }

      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image browse
  const handleImageBrowse = () => {
    document.getElementById('file-input').click();
  };

  // Handle unit price change - prevent negative numbers
  const handleUnitPriceChange = (e) => {
    const value = e.target.value;
    // Allow only positive numbers with up to 2 decimal places
    if (value === '' || (/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) >= 0)) {
      setFormData({ ...formData, UnitPrice: value });
    }
  };

  // Handle new category creation
  const handleCreateNewCategory = async () => {
    if (!newCategoryName.trim()) {
      showPopupMessage("⚠️ Category name is required!", true);
      return;
    }

    const payload = {
      CategoryID: getNextCategoryID(),
      CategoryName: newCategoryName.trim(),
      Status: "A",
    };

    try {
      await dispatch(AddCategoriesDetails(payload));
      await dispatch(GetAllCategories());
      setNewCategoryName("");
      setShowNewCategoryForm(false);
      showPopupMessage("✅ New category added successfully!");
    } catch (error) {
      showPopupMessage("❌ Failed to create new category!", true);
    }
  };

  // Handle new unit creation
  const handleCreateNewUnit = async () => {
    if (!newUnitName.trim()) {
      showPopupMessage("⚠️ Unit name is required!", true);
      return;
    }

    const payload = {
      UnitID: getNextUnitID(),
      UnitName: newUnitName.trim(),
      Status: "A",
    };

    try {
      await dispatch(AddUnitsDetails(payload));
      await dispatch(GetAllUnits());
      setNewUnitName("");
      setShowNewUnitForm(false);
      showPopupMessage("✅ New unit added successfully!");
    } catch (error) {
      showPopupMessage("❌ Failed to create new unit!", true);
    }
  };

  // Reset form function
  const handleFormReset = () => {
    setFormData({
      ProductID: generateProductID(),
      ProductName: "",
      CategoryID: "",
      UnitID: "",
      UnitPrice: "",
      ImageURL: "",
      Status: "Active",
    });
    setSelectedFile(null);
    setImagePreview("");
    setEditingProduct(null);
    setCategorySearch("");
    setUnitSearch("");
  };

  // Handle form submission - CORRECTED VERSION
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted ✅", formData);
    console.log("Selected file:", selectedFile);
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setErrorMsg("");

    // Validation
    if (!formData.ProductName.trim()) {
      showPopupMessage("⚠️ Product name is required!", true);
      setIsSubmitting(false);
      return;
    }

    if (!formData.CategoryID) {
      showPopupMessage("⚠️ Please select a category!", true);
      setIsSubmitting(false);
      return;
    }

    if (!formData.UnitID) {
      showPopupMessage("⚠️ Please select a unit!", true);
      setIsSubmitting(false);
      return;
    }

    if (!formData.UnitPrice || Number(formData.UnitPrice) <= 0) {
      showPopupMessage("⚠️ Please enter a valid unit price!", true);
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare common payload
      const productPayload = {
        ProductID: formData.ProductID,
        ProductName: formData.ProductName.trim(),
        CategoryID: formData.CategoryID,
        UnitID: formData.UnitID,
        UnitPrice: Number(formData.UnitPrice),
        Status: formData.Status === "Active" ? "A" : "I",
      };

      if (editingProduct) {
        // Editing existing product - pass both product data and file
        console.log("📤 Updating product:", productPayload, "with file:", selectedFile);
        await dispatch(PutProductsDetails(productPayload, selectedFile));
        showPopupMessage("✅ Product updated successfully!");
      } else {
        // ADD new product - pass both product data and file
        console.log("📤 Adding new product:", productPayload, "with file:", selectedFile);
        await dispatch(AddProductsDetails(productPayload, selectedFile));
        showPopupMessage("✅ Product added successfully!");
      }

      // Reset form and close
      handleFormReset();
      setShowForm(false);
      
      // Refresh data
      setTimeout(() => {
        dispatch(GetAllProducts());
      }, 1000);
      
    } catch (err) {
      console.error("❌ Failed to save product:", err);
      showPopupMessage("❌ Failed to save product. Please try again.", true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      UnitPrice: product.UnitPrice?.toString() || ""
    });
    setSelectedFile(null);
    setImagePreview(getProductImageUrl(product) || "");
    setShowForm(true);
    setErrorMsg("");
    setSuccessMsg("");
    setCategorySearch("");
    setUnitSearch("");
  };

  // Toggle status instantly - FIXED
  const toggleStatus = async (product) => {
    const newStatus = product.Status === "Active" ? "Inactive" : "Active";
    
    // Optimistic UI update
    setLocalProducts((prev) =>
      prev.map((p) =>
        p.ProductID === product.ProductID ? { ...p, Status: newStatus } : p
      )
    );

    try {
      const payload = {
        ProductID: product.ProductID,
        ProductName: product.ProductName,
        CategoryID: product.CategoryID,
        UnitID: product.UnitID,
        UnitPrice: Number(product.UnitPrice),
        Status: newStatus === "Active" ? "A" : "I",
      };

      console.log("Toggle status payload:", payload);
      await dispatch(PutProductsDetails(payload, null)); // No file for status toggle
      
      showPopupMessage(`✅ Product ${newStatus.toLowerCase()} successfully!`);
      
      // Refresh to ensure data is in sync
      setTimeout(() => {
        dispatch(GetAllProducts());
      }, 500);
      
    } catch (err) {
      console.error("Failed to update product status:", err);
      
      // Revert optimistic update on error
      setLocalProducts((prev) =>
        prev.map((p) =>
          p.ProductID === product.ProductID ? { ...p, Status: product.Status } : p
        )
      );
      showPopupMessage("❌ Failed to update product status", true);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.category-dropdown')) {
        setShowCategoryDropdown(false);
      }
      if (!event.target.closest('.unit-dropdown')) {
        setShowUnitDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset file when closing form
  useEffect(() => {
    if (!showForm) {
      setSelectedFile(null);
      setImagePreview("");
    }
  }, [showForm]);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // 3D Industrial CSS Styles with Mobile Responsiveness
  const styles = {
    container: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.grayLighter} 100%)`,
      padding: isMobile ? '16px' : '24px',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
      padding: isMobile ? '24px 20px' : '32px',
      borderRadius: isMobile ? '12px' : '16px',
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
      gap: isMobile ? '16px' : '20px',
      flexDirection: isMobile ? 'column' : 'row',
      textAlign: isMobile ? 'center' : 'left'
    },
    pageTitle: {
      fontSize: isMobile ? '28px' : '36px',
      fontWeight: '800',
      color: colors.white,
      margin: 0,
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      lineHeight: isMobile ? '1.2' : '1.3'
    },
    pageSubtitle: {
      fontSize: isMobile ? '16px' : '18px',
      color: colors.highlight,
      margin: isMobile ? '8px 0 0 0' : '6px 0 0 0',
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
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
      gap: isMobile ? '16px' : '24px',
      marginBottom: isMobile ? '20px' : '28px'
    },
    statCard: {
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: isMobile ? '20px' : '28px',
      borderRadius: isMobile ? '12px' : '16px',
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
      gap: isMobile ? '16px' : '24px',
      alignItems: 'center',
      marginBottom: isMobile ? '20px' : '28px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      padding: isMobile ? '20px' : '28px',
      borderRadius: isMobile ? '12px' : '16px',
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
      position: 'relative',
      flexDirection: isMobile ? 'column' : 'row'
    },
    mobileControlsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      gap: '16px'
    },
    mobileFilterButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`,
      color: colors.white,
      border: 'none',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    },
    mobileFilters: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '100%',
      marginTop: '16px',
      padding: '16px',
      backgroundColor: colors.light,
      borderRadius: '8px',
      border: `1px solid ${colors.grayLighter}`
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
      padding: isMobile ? '14px 16px 14px 48px' : '18px 24px 18px 56px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? '10px' : '12px',
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
      fontSize: isMobile ? '18px' : '20px'
    },
    filterSelect: {
      padding: isMobile ? '14px 16px' : '18px 24px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? '10px' : '12px',
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
      gap: '12px',
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      border: 'none',
      borderRadius: isMobile ? '10px' : '12px',
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
      borderRadius: isMobile ? '16px' : '20px',
      boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px ${colors.shadowDark}`,
      width: '100%',
      maxWidth: isMobile ? '100%' : '520px',
      maxHeight: isMobile ? '95vh' : '90vh',
      overflow: 'auto',
      border: `2px solid ${colors.highlight}`,
      position: 'relative'
    },
    modalHeader: {
      padding: isMobile ? '24px' : '28px',
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
      padding: isMobile ? '8px' : '10px',
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
      marginBottom: isMobile ? '20px' : '24px',
      position: 'relative'
    },
    label: {
      display: 'block',
      marginBottom: isMobile ? '8px' : '10px',
      fontWeight: '700',
      color: colors.dark,
      fontSize: isMobile ? '14px' : '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    input: {
      width: '100%',
      padding: isMobile ? '14px 16px' : '16px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? '8px' : '10px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500'
    },
    select: {
      width: '100%',
      padding: isMobile ? '14px 16px' : '16px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? '8px' : '10px',
      fontSize: isMobile ? '16px' : '18px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      cursor: 'pointer',
      boxShadow: `inset 0 2px 8px rgba(0,0,0,0.1)`,
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    customDropdown: {
      position: 'relative',
      width: '100%'
    },
    dropdownHeader: {
      padding: isMobile ? '14px 16px' : '16px 20px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: isMobile ? '8px' : '10px',
      fontSize: isMobile ? '16px' : '18px',
      backgroundColor: colors.white,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      fontWeight: '500'
    },
    dropdownList: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: colors.white,
      border: `2px solid ${colors.grayLighter}`,
      borderTop: 'none',
      borderRadius: '0 0 10px 10px',
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: 1000,
      boxShadow: `0 4px 12px rgba(0,0,0,0.1)`
    },
    searchInputDropdown: {
      width: '100%',
      padding: isMobile ? '10px 12px' : '12px 16px',
      border: 'none',
      borderBottom: `1px solid ${colors.grayLighter}`,
      fontSize: isMobile ? '14px' : '16px',
      outline: 'none',
      boxSizing: 'border-box',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`
    },
    dropdownItem: {
      padding: isMobile ? '10px 12px' : '12px 16px',
      cursor: 'pointer',
      borderBottom: `1px solid ${colors.grayLighter}`,
      transition: 'all 0.2s ease',
      fontSize: isMobile ? '14px' : '16px'
    },
    dropdownItemSelected: {
      backgroundColor: colors.light,
      color: colors.primaryDark,
      fontWeight: '600'
    },
    noOptions: {
      padding: isMobile ? '10px 12px' : '12px 16px',
      color: colors.gray,
      fontSize: isMobile ? '14px' : '16px',
      textAlign: 'center'
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
      borderRadius: isMobile ? '8px' : '10px',
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
      borderRadius: isMobile ? '8px' : '10px',
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
      borderRadius: isMobile ? '12px' : '16px',
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      overflow: 'hidden',
      border: `1px solid ${colors.highlight}`,
      position: 'relative',
      overflowX: isMobile ? 'auto' : 'hidden'
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
      letterSpacing: '0.5px'
    },
    tableRow: {
      transition: 'all 0.3s ease',
      borderBottom: `1px solid ${colors.grayLighter}`,
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`
    },
    tableCell: {
      padding: isMobile ? '14px 12px' : '22px 28px',
      fontSize: isMobile ? '14px' : '16px',
      color: colors.dark,
      fontWeight: '500'
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
      borderRadius: isMobile ? '6px' : '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
      color: colors.white,
      boxShadow: `0 2px 8px ${colors.shadowDark}`
    },
    productImage: {
      width: isMobile ? '50px' : '60px',
      height: isMobile ? '50px' : '60px',
      borderRadius: isMobile ? '8px' : '10px',
      objectFit: 'cover',
      border: `2px solid ${colors.grayLighter}`,
      boxShadow: `0 2px 8px rgba(0,0,0,0.1)`
    },
    fileInput: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      cursor: 'pointer'
    },
    uploadArea: {
      border: `2px dashed ${colors.grayLighter}`,
      borderRadius: isMobile ? '8px' : '10px',
      padding: isMobile ? '20px' : '24px',
      textAlign: 'center',
      backgroundColor: colors.light,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      minHeight: isMobile ? '150px' : '180px'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: isMobile ? '40px 20px' : '60px 40px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: isMobile ? '12px' : '16px',
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
      marginTop: isMobile ? '20px' : '28px'
    },
    loadingText: {
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '600',
      color: colors.primary,
      textAlign: 'center'
    },
    emptyState: {
      textAlign: 'center',
      padding: isMobile ? '40px 20px' : '60px 40px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderRadius: isMobile ? '12px' : '16px',
      boxShadow: `0 6px 24px ${colors.shadowDark}`,
      border: `1px solid ${colors.highlight}`,
      marginTop: isMobile ? '20px' : '28px'
    },
    emptyStateTitle: {
      fontSize: isMobile ? '18px' : '20px',
      fontWeight: '700',
      color: colors.grayDark,
      marginBottom: isMobile ? '8px' : '12px'
    },
    emptyStateText: {
      fontSize: isMobile ? '14px' : '16px',
      color: colors.gray,
      marginBottom: isMobile ? '16px' : '20px'
    },
    // Pagination Styles
    paginationContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '16px 20px' : '20px 28px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      borderTop: `1px solid ${colors.grayLighter}`,
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
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '600',
      minWidth: isMobile ? '36px' : '42px'
    },
    paginationButtonActive: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      borderColor: colors.primary
    },
    paginationButtonDisabled: {
      background: colors.grayLighter,
      color: colors.gray,
      cursor: 'not-allowed',
      borderColor: colors.grayLight
    },
    pageNumber: {
      padding: isMobile ? '8px 12px' : '10px 16px',
      margin: '0 4px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '8px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '600',
      minWidth: isMobile ? '36px' : '42px'
    },
    pageNumberActive: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      color: colors.white,
      borderColor: colors.primary
    },
    itemsPerPageContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '8px' : '12px'
    },
    itemsPerPageSelect: {
      padding: isMobile ? '8px 12px' : '10px 16px',
      border: `2px solid ${colors.grayLighter}`,
      borderRadius: '8px',
      background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
      color: colors.grayDark,
      cursor: 'pointer',
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '600'
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
          <Package size={isMobile ? 40 : 52} color={colors.white} />
          <div>
            <h1 style={styles.pageTitle}>PRODUCTS MANAGEMENT</h1>
            <p style={styles.pageSubtitle}>Manage products, inventory items and their details across the system</p>
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
          <p style={styles.statNumber}>{localProducts.length}</p>
          <p style={styles.statLabel}>TOTAL PRODUCTS</p>
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
          <p style={{...styles.statNumber, color: colors.success}}>{activeProducts}</p>
          <p style={styles.statLabel}>ACTIVE PRODUCTS</p>
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
          <p style={{...styles.statNumber, color: colors.error}}>{inactiveProducts}</p>
          <p style={styles.statLabel}>INACTIVE PRODUCTS</p>
        </div>
        <div 
          style={{
            ...styles.statCard,
            borderLeft: `4px solid ${colors.warning}`
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
          <p style={{...styles.statNumber, color: colors.warning}}>
            {categories.length}
          </p>
          <p style={styles.statLabel}>CATEGORIES</p>
        </div>
      </div>

      {/* Controls - Search, Filter and Add button */}
      <div style={styles.controls}>
        {isMobile ? (
          <>
            <div style={styles.mobileControlsHeader}>
              <div style={{...styles.searchBox, flex: '1'}}>
                <Search size={isMobile ? 20 : 24} style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '12px' }}>
              <button
                style={{ ...styles.addButton, flex: 1, margin: 0 }}
                onClick={() => {
                  handleFormReset();
                  setShowForm(true);
                }}
              >
                <Plus size={20} /> Add Product
              </button>
              <button 
                style={{ ...styles.mobileFilterButton, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter size={16} />
                Filters
              </button>
            </div>

            {showMobileFilters && (
              <div style={{ ...styles.mobileFilters, width: '100%', marginTop: '12px' }}>
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
                               statusFilter === 'Active' ? colors.success : colors.warning,
                    width: '100%',
                    margin: 0
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            )}
          </>
        ) : (
          <>
            <div style={styles.searchBox}>
              <Search size={24} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search products by name or ID..."
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
                handleFormReset();
                setShowForm(true);
              }}
            >
              <Plus size={24} /> Add Product
            </button>
          </>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingText}>Loading products...</div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div style={styles.emptyState}>
          <h2 style={styles.emptyStateTitle}>No Products Found</h2>
          <p style={styles.emptyStateText}>
            {searchTerm || statusFilter !== "All" 
              ? "Try adjusting your search or filter criteria"
              : "Get started by creating your first product"
            }
          </p>
        </div>
      )}

      {/* Products Table */}
      {!loading && filteredProducts.length > 0 && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Product ID</th>
                <th style={styles.tableHeaderCell}>Image</th>
                <th style={styles.tableHeaderCell}>Product Name</th>
                <th style={styles.tableHeaderCell}>Category</th>
                <th style={styles.tableHeaderCell}>Unit</th>
                <th style={styles.tableHeaderCell}>Unit Price</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product) => {
                const category = categories.find(c => c.CategoryID === product.CategoryID);
                const unit = units.find(u => u.UnitID === product.UnitID);
                const imageUrl = getProductImageUrl(product);

                return (
                  <tr 
                    key={product.ProductID} 
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
                    <td style={{...styles.tableCell, fontWeight: '700', color: colors.primaryDark}}>
                      #{product.ProductID}
                    </td>
                    <td style={styles.tableCell}>
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt={product.ProductName}
                          style={styles.productImage}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div style={{
                          width: isMobile ? '50px' : '60px',
                          height: isMobile ? '50px' : '60px',
                          borderRadius: isMobile ? '8px' : '10px',
                          backgroundColor: colors.light,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `2px solid ${colors.grayLighter}`
                        }}>
                          <Package size={isMobile ? 20 : 24} color={colors.gray} />
                        </div>
                      )}
                    </td>
                    
                    <td style={{...styles.tableCell, fontWeight: '600'}}>
                      {product.ProductName}
                    </td>
                    <td style={styles.tableCell}>
                      {category?.CategoryName || 'N/A'}
                    </td>
                    <td style={styles.tableCell}>
                      {unit?.UnitName || 'N/A'}
                    </td>
                    <td style={{...styles.tableCell, fontWeight: '600', color: colors.primaryDark}}>
                      {formatNumber(product.UnitPrice)}
                    </td>
                    <td style={styles.tableCell}>
                      <button
                        style={{
                          ...styles.statusButton,
                          background: product.Status === "Active" ? 
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
                        onClick={() => toggleStatus(product)}
                      >
                        {product.Status}
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
                        onClick={() => handleEditClick(product)}
                        title="Edit product"
                      >
                        <Edit size={isMobile ? 16 : 18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={styles.paginationContainer}>
            <div style={styles.paginationInfo}>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} products
            </div>
            
            <div style={styles.paginationControls}>
              {/* Items per page selector */}
              <div style={styles.itemsPerPageContainer}>
                <span style={{ fontSize: isMobile ? '14px' : '16px', color: colors.grayDark, fontWeight: '600' }}>
                  Show:
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  style={styles.itemsPerPageSelect}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* Pagination buttons */}
              <button
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
                }}
                onClick={() => handlePageChange(1)}
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
              
              <button
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
                }}
                onClick={() => handlePageChange(currentPage - 1)}
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
              {getPageNumbers().map((pageNumber, index) => (
                pageNumber === '...' ? (
                  <span key={`ellipsis-${index}`} style={{ padding: '0 8px', color: colors.gray }}>
                    ...
                  </span>
                ) : (
                  <button
                    key={pageNumber}
                    style={{
                      ...styles.pageNumber,
                      ...(currentPage === pageNumber ? styles.pageNumberActive : {})
                    }}
                    onClick={() => handlePageChange(pageNumber)}
                    onMouseOver={(e) => {
                      if (currentPage !== pageNumber) {
                        e.target.style.background = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`;
                        e.target.style.color = colors.white;
                        e.target.style.borderColor = colors.primary;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (currentPage !== pageNumber) {
                        e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                        e.target.style.color = colors.grayDark;
                        e.target.style.borderColor = colors.grayLighter;
                      }
                    }}
                  >
                    {pageNumber}
                  </button>
                )
              ))}

              <button
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
                }}
                onClick={() => handlePageChange(currentPage + 1)}
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
              
              <button
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
                }}
                onClick={() => handlePageChange(totalPages)}
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
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={{
            ...styles.modalContent,
            maxWidth: isMobile ? '100%' : '900px',
            width: isMobile ? '95vw' : '95vw',
            maxHeight: isMobile ? '95vh' : '95vh',
            overflow: 'hidden'
          }}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingProduct ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
              </h3>
              <button 
                style={styles.closeButton}
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  setCategorySearch("");
                  setUnitSearch("");
                  setSelectedFile(null);
                  setImagePreview("");
                }}
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
                  gap: isMobile ? '20px' : '24px',
                  alignItems: 'start'
                }}>
                  {/* Left Column */}
                  <div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Product ID</label>
                      <input 
                        type="text" 
                        value={formData.ProductID} 
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
                      <label style={styles.label}>Product Name *</label>
                      <input
                        type="text"
                        value={formData.ProductName}
                        onChange={(e) => setFormData({ ...formData, ProductName: e.target.value })}
                        placeholder="Enter product name"
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
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Unit Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.UnitPrice}
                        onChange={handleUnitPriceChange}
                        placeholder="0.00"
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
                      />
                    </div>

                    <div style={styles.formGroup} className="category-dropdown">
                      <label style={styles.label}>Category *</label>
                      <div style={styles.customDropdown}>
                        <div
                          style={{
                            ...styles.dropdownHeader,
                            borderColor: showCategoryDropdown ? colors.primary : colors.grayLighter
                          }}
                          onClick={() => {
                            setShowCategoryDropdown(!showCategoryDropdown);
                            setShowUnitDropdown(false);
                          }}
                        >
                          <span style={{ color: formData.CategoryID ? colors.dark : colors.gray }}>
                            {getSelectedCategoryName()}
                          </span>
                          <ChevronDown 
                            size={isMobile ? 14 : 16} 
                            style={{ 
                              transform: showCategoryDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease'
                            }} 
                          />
                        </div>
                        
                        {showCategoryDropdown && (
                          <div style={styles.dropdownList}>
                            <div style={{ display: 'flex', gap: '8px', padding: isMobile ? '10px 12px' : '12px 16px', borderBottom: `1px solid ${colors.grayLighter}` }}>
                              <input
                                type="text"
                                placeholder="Search categories..."
                                value={categorySearch}
                                onChange={(e) => setCategorySearch(e.target.value)}
                                style={{...styles.searchInputDropdown, flex: 1}}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <button
                                type="button"
                                style={{
                                  padding: '8px 12px',
                                  background: colors.secondary,
                                  color: colors.white,
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: '600'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowNewCategoryForm(true);
                                  setShowCategoryDropdown(false);
                                }}
                              >
                                + New
                              </button>
                            </div>
                            {filteredCategories.length > 0 ? (
                              filteredCategories.map((category) => (
                                <div
                                  key={category.CategoryID}
                                  style={{
                                    ...styles.dropdownItem,
                                    ...(formData.CategoryID === category.CategoryID ? styles.dropdownItemSelected : {})
                                  }}
                                  onClick={() => {
                                    setFormData({ ...formData, CategoryID: category.CategoryID });
                                    setShowCategoryDropdown(false);
                                    setCategorySearch("");
                                  }}
                                  onMouseOver={(e) => {
                                    if (formData.CategoryID !== category.CategoryID) {
                                      e.target.style.backgroundColor = colors.light;
                                    }
                                  }}
                                  onMouseOut={(e) => {
                                    if (formData.CategoryID !== category.CategoryID) {
                                      e.target.style.backgroundColor = colors.white;
                                    }
                                  }}
                                >
                                  {category.CategoryName}
                                </div>
                              ))
                            ) : (
                              <div style={styles.noOptions}>No categories found</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={styles.formGroup} className="unit-dropdown">
                      <label style={styles.label}>Unit *</label>
                      <div style={styles.customDropdown}>
                        <div
                          style={{
                            ...styles.dropdownHeader,
                            borderColor: showUnitDropdown ? colors.primary : colors.grayLighter
                          }}
                          onClick={() => {
                            setShowUnitDropdown(!showUnitDropdown);
                            setShowCategoryDropdown(false);
                          }}
                        >
                          <span style={{ color: formData.UnitID ? colors.dark : colors.gray }}>
                            {getSelectedUnitName()}
                          </span>
                          <ChevronDown 
                            size={isMobile ? 14 : 16} 
                            style={{ 
                              transform: showUnitDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease'
                            }} 
                          />
                        </div>
                        
                        {showUnitDropdown && (
                          <div style={styles.dropdownList}>
                            <div style={{ display: 'flex', gap: '8px', padding: isMobile ? '10px 12px' : '12px 16px', borderBottom: `1px solid ${colors.grayLighter}` }}>
                              <input
                                type="text"
                                placeholder="Search units..."
                                value={unitSearch}
                                onChange={(e) => setUnitSearch(e.target.value)}
                                style={{...styles.searchInputDropdown, flex: 1}}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <button
                                type="button"
                                style={{
                                  padding: '8px 12px',
                                  background: colors.secondary,
                                  color: colors.white,
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: '600'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowNewUnitForm(true);
                                  setShowUnitDropdown(false);
                                }}
                              >
                                + New
                              </button>
                            </div>
                            {filteredUnits.length > 0 ? (
                              filteredUnits.map((unit) => (
                                <div
                                  key={unit.UnitID}
                                  style={{
                                    ...styles.dropdownItem,
                                    ...(formData.UnitID === unit.UnitID ? styles.dropdownItemSelected : {})
                                  }}
                                  onClick={() => {
                                    setFormData({ ...formData, UnitID: unit.UnitID });
                                    setShowUnitDropdown(false);
                                    setUnitSearch("");
                                  }}
                                  onMouseOver={(e) => {
                                    if (formData.UnitID !== unit.UnitID) {
                                      e.target.style.backgroundColor = colors.light;
                                    }
                                  }}
                                  onMouseOut={(e) => {
                                    if (formData.UnitID !== unit.UnitID) {
                                      e.target.style.backgroundColor = colors.white;
                                    }
                                  }}
                                >
                                  {unit.UnitName}
                                </div>
                              ))
                            ) : (
                              <div style={styles.noOptions}>No units found</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Status</label>
                      <select
                        value={formData.Status}
                        onChange={(e) => setFormData({ ...formData, Status: e.target.value })}
                        style={{
                          ...styles.select,
                          background: formData.Status === 'Active' ? 
                            `linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)` : 
                            `linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)`,
                          borderColor: formData.Status === 'Active' ? colors.success : colors.warning,
                          color: colors.dark
                        }}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        Product Image {!editingProduct && '(Optional)'}
                      </label>
                      
                      {/* Browse Button */}
                      <div style={{ marginBottom: '12px' }}>
                        <input
                          id="file-input"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/jfif"
                          onChange={handleFileSelect}
                          style={{ display: 'none' }}
                        />
                      </div>

                      <div 
                        style={{
                          ...styles.uploadArea,
                          borderColor: imagePreview ? colors.primary : colors.grayLighter,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.style.borderColor = colors.primary;
                          e.currentTarget.style.backgroundColor = colors.light;
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.style.borderColor = imagePreview ? colors.primary : colors.grayLighter;
                          e.currentTarget.style.backgroundColor = colors.light;
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files[0];
                          if (file) {
                            handleFileSelect({ target: { files: [file] } });
                          }
                          e.currentTarget.style.borderColor = colors.primary;
                          e.currentTarget.style.backgroundColor = colors.light;
                        }}
                        onClick={handleImageBrowse}
                      >
                        {imagePreview ? (
                          <div style={{ textAlign: 'center' }}>
                            <img 
                              src={imagePreview} 
                              alt="Product preview" 
                              style={{ 
                                maxWidth: isMobile ? '120px' : '150px', 
                                maxHeight: isMobile ? '120px' : '150px', 
                                borderRadius: '10px',
                                marginBottom: '12px',
                                border: `2px solid ${colors.grayLighter}`
                              }} 
                            />
                            <p style={{ color: colors.primary, fontWeight: '600', margin: '0', fontSize: isMobile ? '14px' : '16px' }}>
                              ✓ Image selected
                            </p>
                            <p style={{ color: colors.gray, fontSize: isMobile ? '12px' : '14px', margin: '4px 0 0 0' }}>
                              Click or drag to change
                            </p>
                          </div>
                        ) : (
                          <div style={{ textAlign: 'center' }}>
                            <Upload size={isMobile ? 24 : 32} color={colors.primary} style={{ marginBottom: '12px' }} />
                            <p style={{ color: colors.primary, fontWeight: '600', margin: '0', fontSize: isMobile ? '14px' : '16px' }}>
                              Upload Product Image
                            </p>
                            <p style={{ color: colors.gray, fontSize: isMobile ? '12px' : '14px', margin: '4px 0 0 0' }}>
                              Click to browse or drag & drop
                            </p>
                            <p style={{ color: colors.gray, fontSize: isMobile ? '10px' : '12px', margin: '4px 0 0 0' }}>
                              Supports: JPG, PNG, GIF, JFIF (Max 5MB)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.buttonGroup}>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onClick={() => {
                      setShowForm(false);
                      setEditingProduct(null);
                      setCategorySearch("");
                      setUnitSearch("");
                      setSelectedFile(null);
                      setImagePreview("");
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = `linear-gradient(135deg, ${colors.grayLighter} 0%, ${colors.grayLight} 100%)`;
                      e.target.style.color = colors.white;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`;
                      e.target.style.color = colors.grayDark;
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      ...styles.primaryButton,
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                    disabled={isSubmitting}
                    onMouseOver={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`;
                        e.target.style.boxShadow = `0 8px 24px ${colors.shadowDark}`;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
                        e.target.style.boxShadow = `0 4px 16px ${colors.shadowDark}`;
                      }
                    }}
                  >
                    {isSubmitting ? "Processing..." : (editingProduct ? "Update Product" : "Add Product")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* New Category Modal */}
      {showNewCategoryForm && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modalContent, maxWidth: isMobile ? '95%' : '480px'}}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>ADD NEW CATEGORY</h3>
              <button 
                style={styles.closeButton}
                onClick={() => {
                  setShowNewCategoryForm(false);
                  setNewCategoryName("");
                }}
              >
                <X size={isMobile ? 24 : 28} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Category Name *</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter new category name"
                  style={styles.input}
                  autoFocus
                />
              </div>
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => {
                    setShowNewCategoryForm(false);
                    setNewCategoryName("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={styles.primaryButton}
                  onClick={handleCreateNewCategory}
                >
                  Create Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Unit Modal */}
      {showNewUnitForm && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modalContent, maxWidth: isMobile ? '95%' : '480px'}}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>ADD NEW UNIT</h3>
              <button 
                style={styles.closeButton}
                onClick={() => {
                  setShowNewUnitForm(false);
                  setNewUnitName("");
                }}
              >
                <X size={isMobile ? 24 : 28} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Unit Name *</label>
                <input
                  type="text"
                  value={newUnitName}
                  onChange={(e) => setNewUnitName(e.target.value)}
                  placeholder="Enter new unit name"
                  style={styles.input}
                  autoFocus
                />
              </div>
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => {
                    setShowNewUnitForm(false);
                    setNewUnitName("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={styles.primaryButton}
                  onClick={handleCreateNewUnit}
                >
                  Create Unit
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
      `}</style>
    </div>
  );
};

export default Products;