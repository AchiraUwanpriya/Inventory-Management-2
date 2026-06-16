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
  ChevronLeft
} from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = ({ activeTab, setActiveTab, onLogout, isSidebarCollapsed, setIsSidebarCollapsed }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // Fixed toggle handlers
 const handleCloseSidebar = () => {
  console.log("Close button clicked");
  if (isMobile) {
    setIsMobileOpen(false);
  } else {
    setIsSidebarCollapsed(!isSidebarCollapsed); // This causes issues
  }
};
  const handleOpenSidebar = () => {
    console.log("Hamburger clicked");
    if (isMobile) {
      setIsMobileOpen(true);
    } else {
      setIsSidebarCollapsed(false); // Always expand on desktop
    }
  };

  // Determine if sidebar should be visible
  const isSidebarVisible = isMobile ? isMobileOpen : !isSidebarCollapsed;

  console.log("Sidebar state:", {
    isMobile,
    isMobileOpen,
    isSidebarCollapsed,
    isSidebarVisible
  });

  const styles = {
    sidebar: {
      height: "100vh",
      width: isSidebarVisible ? "260px" : "0px",
      background: `linear-gradient(145deg, ${colors.sidebarBg}, ${colors.headerBg})`,
      color: colors.white,
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
      boxShadow: isSidebarVisible ? "8px 0 20px rgba(0, 0, 0, 0.4)" : "none",
      transition: "all 0.3s ease-in-out",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    sidebarContent: {
      display: "flex",
      flexDirection: "column",
      width: "260px",
      height: "100%",
      opacity: isSidebarVisible ? 1 : 0,
      transition: "opacity 0.2s ease",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.headerBg,
      height: "70px",
      padding: "0 20px",
      borderBottom: `1px solid ${colors.border}`,
      boxShadow: "inset 0 -2px 4px rgba(255,255,255,0.1)",
      textShadow: "0 2px 6px rgba(0,0,0,0.4)",
      fontSize: "18px",
      fontWeight: "bold",
    },
    headerContent: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    nav: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: "15px 12px",
      gap: "8px",
      overflowY: "auto",
    },
    navButton: (isActive) => ({
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "14px 16px",
      borderRadius: "12px",
      backgroundColor: isActive ? colors.activeBg : "transparent",
      color: colors.white,
      cursor: "pointer",
      transition: "all 0.2s ease",
      border: "none",
      width: "100%",
      textAlign: "left",
    }),
    footer: {
      padding: "20px 16px",
      borderTop: `1px solid ${colors.border}`,
      backgroundColor: colors.sidebarBg,
      display: "flex",
      justifyContent: "center",
    },
    logoutButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      padding: "14px 20px",
      borderRadius: "12px",
      backgroundColor: colors.logoutRed,
      border: "none",
      color: colors.white,
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
      width: "100%",
      maxWidth: "200px",
      fontWeight: 600,
      fontSize: "14px",
    },
    hamburger: {
      position: "fixed",
      top: "16px",
      left: "16px",
      backgroundColor: colors.sidebarBg,
      color: colors.white,
      borderRadius: "10px",
      padding: "10px",
      zIndex: 1100,
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      border: `1px solid ${colors.border}`,
      transition: "all 0.3s ease",
    },
    closeButton: {
      backgroundColor: "transparent",
      border: "none",
      color: colors.white,
      cursor: "pointer",
      padding: "8px",
      borderRadius: "6px",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    backdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 900,
      display: isMobileOpen && isMobile ? "block" : "none",
      backdropFilter: "blur(3px)",
    },
  };

  return (
    <>
      {/* Hamburger Menu - Show when sidebar is hidden */}
      {!isSidebarVisible && (
        <div style={styles.hamburger} onClick={handleOpenSidebar}>
          <Menu size={22} />
        </div>
      )}

      {/* Backdrop for Mobile */}
      {isMobile && isMobileOpen && (
        <div style={styles.backdrop} onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarContent}>
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <Package size={22} />
              <span>Dreamy Dreams</span>
            </div>
            
            {/* Improved close button with better icon */}
            {/* <button
              style={styles.closeButton}
              onClick={handleCloseSidebar}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.hoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              title={isMobile ? "Close sidebar" : "Collapse sidebar"}
            >
              {isMobile ? <ChevronLeft size={20} /> : <ChevronLeft size={20} />}
            </button> */}
          </div>

          <nav style={styles.nav}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobile) setIsMobileOpen(false);
                }}
                style={styles.navButton(activeTab === item.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = activeTab === item.id ? colors.activeBg : colors.hoverBg;
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = activeTab === item.id ? colors.activeBg : "transparent";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {item.icon}
                <span style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</span>
              </button>
            ))}
          </nav>

          <div style={styles.footer}>
            <button
              onClick={onLogout}
              style={styles.logoutButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.logoutHover;
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.logoutRed;
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
   

export default Sidebar;