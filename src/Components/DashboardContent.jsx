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
import GoodsReceivedNotes from './dashboard/GoodsReceivedNotes'
import SRN from './dashboard/SRN'
import DMG from './dashboard/DMG'
import SAJ from './dashboard/SAJ'
import STR from './dashboard/STR'
import ISS from './dashboard/ISS'


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
      case 'goods-received-notes':
        return <GoodsReceivedNotes />
      case 'srn':
        return <SRN />
      case 'dmg':
        return <DMG />
      case 'saj':
        return <SAJ />
      case 'str':
        return <STR />
      case 'iss':
        return <ISS />
   
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