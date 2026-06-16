import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Trash2, Search } from "lucide-react";

import {
  GetAllPurchaseOrderItems,
  AddPurchaseOrderItemsDetails,
} from "../../Actions/actionsPurchaseOrderItems";
import { GetAllProducts } from "../../Actions/actionsProducts";

const PurchaseOrderItems = () => {
  const dispatch = useDispatch();

  const purchaseOrderItemsState = useSelector((state) => state.purchaseOrderItems);
  const productsState = useSelector((state) => state.products);

  const purchaseOrderItems = useMemo(
    () => purchaseOrderItemsState?.responseBody || [],
    [purchaseOrderItemsState?.responseBody]
  );

  const products = productsState?.responseBody || [];
  const loading = purchaseOrderItemsState?.loading || false;
  const msg = purchaseOrderItemsState?.msg || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [purchaseOrderID, setPurchaseOrderID] = useState("");

  // ✅ Multiple new items
  const [newItems, setNewItems] = useState([
    { ProductID: "", Quantity: "", UnitPrice: "", Status: "Active" },
  ]);

  useEffect(() => {
    dispatch(GetAllPurchaseOrderItems());
    dispatch(GetAllProducts());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    return purchaseOrderItems.filter((item) => {
      const productName =
        products.find((p) => p.ProductID === item.ProductID)?.ProductName || "";
      return (
        productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.PurchaseOrderID?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [purchaseOrderItems, products, searchTerm]);

  // ✅ Add new blank item row
  const addNewRow = () => {
    setNewItems([...newItems, { ProductID: "", Quantity: "", UnitPrice: "", Status: "Active" }]);
  };

  // ✅ Remove item row
  const removeRow = (index) => {
    setNewItems(newItems.filter((_, i) => i !== index));
  };

  // ✅ Handle product change per row
  const handleProductChange = (index, productId) => {
    const selectedProduct = products.find((p) => p.ProductID === productId);
    const updated = [...newItems];
    updated[index].ProductID = productId;
    updated[index].UnitPrice = selectedProduct ? selectedProduct.UnitPrice : "";
    setNewItems(updated);
  };

  // ✅ Handle quantity/status changes
  const handleChange = (index, field, value) => {
    const updated = [...newItems];
    updated[index][field] = value;
    setNewItems(updated);
  };

  // ✅ Submit all items at once
  const handleAddItems = async (e) => {
    e.preventDefault();
    if (!purchaseOrderID) {
      alert("Please enter a Purchase Order ID");
      return;
    }

    for (const item of newItems) {
      if (!item.ProductID || !item.Quantity) continue;

      const nextItemID =
        purchaseOrderItems.length > 0
          ? Math.max(...purchaseOrderItems.map((i) => parseInt(i.ItemID))) + 1
          : 1;

      const itemToAdd = {
        ItemID: nextItemID.toString(),
        PurchaseOrderID: purchaseOrderID,
        ProductID: item.ProductID,
        Quantity: item.Quantity,
        UnitPrice: item.UnitPrice,
        Status: item.Status,
      };

      console.log("➡️ Adding:", itemToAdd);
      await dispatch(AddPurchaseOrderItemsDetails(itemToAdd));
    }

    dispatch(GetAllPurchaseOrderItems());
    setShowAddForm(false);
    setPurchaseOrderID("");
    setNewItems([{ ProductID: "", Quantity: "", UnitPrice: "", Status: "Active" }]);
  };

  return (
    <div className="purchase-order-items">
      <div className="page-header">
        <h1>Purchase Order Items</h1>
      </div>

      {/* Controls */}
      <div className="page-controls flex justify-between items-center mb-4">
        <div className="search-bar flex items-center gap-2">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          className="btn-primary flex items-center gap-1"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={20} /> Add Items
        </button>
      </div>

      {/* Add Multiple Items Form */}
      {showAddForm && (
        <div className="form-modal fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="form-container bg-white p-6 rounded-lg w-[600px] shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Add Multiple Items</h3>
            <form onSubmit={handleAddItems}>
              <div className="form-group mb-4">
                <label className="block mb-1 font-medium">Purchase Order ID</label>
                <input
                  type="text"
                  value={purchaseOrderID}
                  onChange={(e) => setPurchaseOrderID(e.target.value)}
                  required
                  className="border rounded px-2 py-1 w-full"
                />
              </div>

              {/* Dynamic Rows */}
              <div className="max-h-72 overflow-y-auto border rounded mb-3 p-2">
                {newItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 mb-2 items-center">
                    <select
                      value={item.ProductID}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      className="border rounded px-1 py-1"
                      required
                    >
                      <option value="">Product</option>
                      {products.map((p) => (
                        <option key={p.ProductID} value={p.ProductID}>
                          {p.ProductName}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.Quantity}
                      onChange={(e) => handleChange(index, "Quantity", e.target.value)}
                      className="border rounded px-1 py-1"
                      required
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Unit Price"
                      value={item.UnitPrice}
                      readOnly
                      className="border rounded px-1 py-1 bg-gray-100"
                    />
                    <select
                      value={item.Status}
                      onChange={(e) => handleChange(index, "Status", e.target.value)}
                      className="border rounded px-1 py-1"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={addNewRow}
                  className="text-blue-600 font-medium"
                >
                  + Add Another Row
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn-secondary px-3"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary px-3">
                    Add All
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-container mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="data-table w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-200">
                <th>Purchase Order ID</th>
                <th>Item ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const productName =
                    products.find((p) => p.ProductID === item.ProductID)?.ProductName;
                  return (
                    <tr key={`${item.ItemID}-${index}`}>
                      <td>{item.PurchaseOrderID}</td>
                      <td>{item.ItemID}</td>
                      <td>{productName}</td>
                      <td>{item.Quantity}</td>
                      <td>Rs.{parseFloat(item.UnitPrice).toFixed(2)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {msg && <p className="text-red-600 mt-2">{msg}</p>}
    </div>
  );
};

export default PurchaseOrderItems;
