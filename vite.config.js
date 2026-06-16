import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/Users": {
        //target: "http://localhost:60748/",
         target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
      "/Products": {
        target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
      "/Customers": {
        target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
      "/Categories": {
        target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
      '/Units': {
        target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
      "/PurchaseOrders": {
        target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
      "/Suppliers": {
        target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
      "/PurchaseOrderItems": {
        target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
      "/SalesOrders": {
        target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
      "/SalesOrderItems": {
        target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
      "/StockTransactions": {
        target: "https://inventorybackend.dockyardsoftware.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})