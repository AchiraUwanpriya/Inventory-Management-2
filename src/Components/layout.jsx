import React, { useState, useEffect } from 'react';
import {
  Package,
  LogOut,
  Home,
  Users,
  Truck,
  ShoppingCart,
  FileText,
  Grid3X3,
  Scale,
  TrendingUp,
  Menu,
  ChevronLeft,
  X
} from "lucide-react";

const Layout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false); // Close sidebar on mobile by default
      } else {
        setIsSidebarOpen(true); // Open sidebar on desktop by default
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { id: "overview", label: "Overview", icon: <Home size={20} /> },
    { id: "categories", label: "Categories", icon: <Grid3X3 size={20} /> },
    { id: "units", label: "Units", icon: <Scale size={20} /> },
    { id: "products", label: "Products", icon: <Package size={20} /> },
    { id: "suppliers", label: "Suppliers", icon: <Truck size={20} /> },
    { id: "customers", label: "Customers", icon: <Users size={20} /> },
    { id: "purchase-orders", label: "Purchase Orders", icon: <ShoppingCart size={20} /> },
    { id: "sales-orders", label: "Sales Orders", icon: <FileText size={20} /> },
    { id: "stock-transactions", label: "Stock Transactions", icon: <TrendingUp size={20} /> },
  ];

  const colors = {
    sidebarBg: "#1e3a8a",
    headerBg: "#1e40af",
    hoverBg: "#2d4a8c",
    activeBg: "#3b82f6",
    border: "#334155",
    white: "#ffffff",
    logoutRed: "#dc2626",
    logoutHover: "#b91c1c",
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (itemId) => {
    setActiveTab(itemId);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Styles
  const styles = {
    appContainer: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    sidebar: {
      width: isSidebarOpen ? '260px' : '0px',
      backgroundColor: colors.sidebarBg,
      color: colors.white,
      position: isMobile ? 'fixed' : 'relative',
      top: 0,
      left: 0,
      height: '100vh',
      zIndex: 1000,
      transition: 'width 0.3s ease-in-out',
      overflow: 'hidden',
      boxShadow: isMobile && isSidebarOpen ? '2px 0 10px rgba(0,0,0,0.3)' : 'none'
    },
    sidebarContent: {
      width: '260px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      opacity: isSidebarOpen ? 1 : 0,
      transition: 'opacity 0.2s ease'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.headerBg,
      height: '70px',
      padding: '0 20px',
      borderBottom: `1px solid ${colors.border}`
    },
    nav: {
      flex: 1,
      padding: '15px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    navItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '14px 16px',
      borderRadius: '8px',
      backgroundColor: isActive ? colors.activeBg : 'transparent',
      color: colors.white,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '500'
    }),
    footer: {
      padding: '20px 16px',
      borderTop: `1px solid ${colors.border}`
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      backgroundColor: colors.logoutRed,
      border: 'none',
      color: colors.white,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '100%'
    },
    mainContent: {
      flex: 1,
      padding: '20px',
      transition: 'margin-left 0.3s ease-in-out',
      marginLeft: isMobile ? 0 : (isSidebarOpen ? '260px' : '0px'),
      width: isMobile ? '100%' : (isSidebarOpen ? 'calc(100% - 260px)' : '100%'),
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    },
    toggleButton: {
      position: 'fixed',
      top: '20px',
      left: isSidebarOpen ? '270px' : '20px',
      backgroundColor: colors.sidebarBg,
      color: colors.white,
      border: 'none',
      borderRadius: '8px',
      padding: '10px',
      cursor: 'pointer',
      zIndex: 1100,
      transition: 'left 0.3s ease-in-out',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mobileOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
      display: isMobile && isSidebarOpen ? 'block' : 'none'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: colors.white,
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div style={styles.mobileOverlay} onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Toggle Button */}
      <button
        style={styles.toggleButton}
        onClick={toggleSidebar}
        title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarContent}>
          {/* Header */}
          <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Package size={24} />
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Dreamy Dreams</span>
            </div>
            {isMobile && (
              <button
                style={styles.closeButton}
                onClick={() => setIsSidebarOpen(false)}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.hoverBg}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav style={styles.nav}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                style={styles.navItem(activeTab === item.id)}
                onClick={() => handleMenuItemClick(item.id)}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.backgroundColor = colors.hoverBg;
                    e.target.style.transform = 'translateX(5px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateX(0)';
                  }
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div style={styles.footer}>
            <button
              style={styles.logoutButton}
              onClick={handleLogout}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.logoutHover;
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = colors.logoutRed;
                e.target.style.transform = 'scale(1)';
              }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h1 style={{ color: '#1e3a8a', marginBottom: '20px' }}>Dashboard</h1>
          
          <div style={{
            background: '#f1f5f9',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            borderLeft: '4px solid #3b82f6'
          }}>
            <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>Current State:</h3>
            <p><strong>Active Tab:</strong> {activeTab}</p>
            <p><strong>Sidebar:</strong> {isSidebarOpen ? 'OPEN' : 'CLOSED'}</p>
            <p><strong>Screen:</strong> {isMobile ? 'MOBILE' : 'DESKTOP'}</p>
            <p><strong>Content Margin:</strong> {isSidebarOpen ? '260px' : '0px'}</p>
          </div>

          <button 
            onClick={toggleSidebar}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              marginBottom: '20px'
            }}
          >
            {isSidebarOpen ? '🔒 Close Sidebar' : '🔓 Open Sidebar'}
          </button>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginTop: '20px'
          }}>
            <div style={{ background: '#e0f2fe', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
              Card 1
            </div>
            <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
              Card 2
            </div>
            <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
              Card 3
            </div>
            <div style={{ background: '#fce7f3', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
              Card 4
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;