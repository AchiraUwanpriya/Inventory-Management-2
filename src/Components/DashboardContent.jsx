import Overview from './dashboard/Overview'
import Categories from './dashboard/Categories'
import Units from './dashboard/Units'
import Products from './dashboard/Products'
import Suppliers from './dashboard/Suppliers'
import Customers from './dashboard/Customers'
import PurchaseOrders from './dashboard/PurchaseOrders'
import PurchaseOrderItems from './dashboard/PurchaseOrderItems'
import SalesOrders from './dashboard/SalesOrders'
import SalesOrderItems from './dashboard/SalesOrderItems'
import StockTransactions from './dashboard/StockTransactions'


const DashboardContent = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />
      case 'categories':
        return <Categories />
      case 'units':
        return <Units />
      case 'products':
        return <Products />
      case 'suppliers':
        return <Suppliers />
      case 'customers':
        return <Customers />
      case 'purchase-orders':
        return <PurchaseOrders />
      case 'purchase-order-items':
        return <PurchaseOrderItems />
      case 'sales-orders':
        return <SalesOrders />
      case 'sales-order-items':
        return <SalesOrderItems />
      case 'stock-transactions':
        return <StockTransactions />
   
      default:
        return <Overview />
    }
  }

  return (
    <div className="dashboard-content">
      {renderContent()}
    </div>
  )
}

export default DashboardContent