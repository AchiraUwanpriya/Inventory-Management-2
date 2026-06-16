const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>BagInventory</h4>
            <p>Streamline your bag inventory management with our powerful platform.</p>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li><a href="#inventory">Inventory Tracking</a></li>
              <li><a href="#analytics">Analytics</a></li>
              <li><a href="#reports">Reports</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#docs">Documentation</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Information</h4>
            <ul>
              <li>📞 Phone: +1 (555) 123-4567</li>
              <li>📧 Email: support@baginventory.com</li>
              <li>📍 Address: 123 Business St, City, State 12345</li>
              <li>🕒 Hours: Mon-Fri 9AM-6PM EST</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 BagInventory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer