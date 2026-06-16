import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Trash2, Search } from 'lucide-react';
import {
  GetAllSalesOrderItems,
  AddSalesOrderItemsDetails,
  PutSalesOrderItemsDetails,
} from '../../Actions/actionsSalesOrderItems';
import { GetAllProducts } from '../../Actions/actionsProducts';

const SalesOrderItems = () => {
  const dispatch = useDispatch();

  const salesOrderItemsState = useSelector((state) => state.salesOrderItems) || {};
  const { responseBody: salesOrderItems = [], loading = false, error = null } = salesOrderItemsState;

  const productsState = useSelector((state) => state.products) || {};
  const { responseBody: products = [] } = productsState;

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // 🆕 Store multiple new items
  const [newItems, setNewItems] = useState([
    {
      ItemID: '',
      SalesOrderID: '',
      ProductID: '',
      Quantity: '',
      UnitPrice: '',
      Status: 'Active',
    },
  ]);

  useEffect(() => {
    dispatch(GetAllSalesOrderItems());
    dispatch(GetAllProducts());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    return salesOrderItems.filter((item) => {
      const productName = products.find((p) => p.ProductID === item.ProductID)?.ProductName || '';
      return (
        productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.SalesOrderID?.toString().includes(searchTerm)
      );
    });
  }, [salesOrderItems, products, searchTerm]);

  const getProductName = (productID) => {
    const product = products.find((p) => p.ProductID === productID);
    return product ? product.ProductName : productID;
  };

  // 🆕 Add a new empty item row
  const handleAddRow = () => {
    setNewItems([
      ...newItems,
      {
        ItemID: '',
        SalesOrderID: newItems[0]?.SalesOrderID || '', // auto-fill same SalesOrderID if already set
        ProductID: '',
        Quantity: '',
        UnitPrice: '',
        Status: 'Active',
      },
    ]);
  };

  // 🆕 Remove an item row
  const handleRemoveRow = (index) => {
    setNewItems(newItems.filter((_, i) => i !== index));
  };

  // 🆕 Handle form input change
  const handleChange = (index, field, value) => {
    const updatedItems = [...newItems];
    if (field === 'ProductID') {
      const selectedProduct = products.find((p) => p.ProductID === value);
      updatedItems[index][field] = value;
      updatedItems[index].UnitPrice = selectedProduct ? selectedProduct.UnitPrice : '';
    } else {
      updatedItems[index][field] = value;
    }
    setNewItems(updatedItems);
  };

  // 🆕 Submit multiple items
  const handleAddItems = async (e) => {
    e.preventDefault();
    for (const item of newItems) {
      if (item.SalesOrderID && item.ProductID) {
        await dispatch(AddSalesOrderItemsDetails(item));
      }
    }
    setShowAddForm(false);
    setNewItems([
      {
        ItemID: '',
        SalesOrderID: '',
        ProductID: '',
        Quantity: '',
        UnitPrice: '',
        Status: 'Active',
      },
    ]);
    dispatch(GetAllSalesOrderItems());
  };

  return (
    <div className="sales-order-items p-4">
      <div className="page-header mb-4">
        <h1 className="text-2xl font-bold">Sales Order Items</h1>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border rounded px-2">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search items..."
            className="ml-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={20} /> Add Items
        </button>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] max-h-[90vh] overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Add Multiple Sales Order Items</h3>
            <form onSubmit={handleAddItems} className="flex flex-col gap-3">
              {newItems.map((item, index) => (
                <div key={index} className="grid grid-cols-6 gap-2 items-end border-b pb-2 mb-2">
                  <div>
                    <label>Sales Order ID</label>
                    <input
                      type="text"
                      value={item.SalesOrderID}
                      onChange={(e) => handleChange(index, 'SalesOrderID', e.target.value)}
                      required
                      className="border rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label>Product</label>
                    <select
                      value={item.ProductID}
                      onChange={(e) => handleChange(index, 'ProductID', e.target.value)}
                      required
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">Select Product</option>
                      {products.map((p) => (
                        <option key={p.ProductID} value={p.ProductID}>
                          {p.ProductName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={item.Quantity}
                      onChange={(e) => handleChange(index, 'Quantity', e.target.value)}
                      required
                      className="border rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label>Unit Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.UnitPrice}
                      readOnly
                      className="border rounded px-2 py-1 bg-gray-100 cursor-not-allowed w-full"
                    />
                  </div>
                  <div>
                    <label>Status</label>
                    <select
                      value={item.Status}
                      onChange={(e) => handleChange(index, 'Status', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <Plus size={16} /> Add Row
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 border rounded"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
                    Save All
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto border rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Sales Order ID</th>
              <th className="border px-3 py-2">Product Name</th>
              <th className="border px-3 py-2">Quantity</th>
              <th className="border px-3 py-2">Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-3">Loading...</td>
              </tr>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.ItemID}>
                  <td className="border px-3 py-2">{item.SalesOrderID}</td>
                  <td className="border px-3 py-2">{getProductName(item.ProductID)}</td>
                  <td className="border px-3 py-2">{item.Quantity}</td>
                  <td className="border px-3 py-2">Rs.{parseFloat(item.UnitPrice).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
        {error && <p className="text-red-500 mt-2">{error.msg || error}</p>}
      </div>
    </div>
  );
};

export default SalesOrderItems;
