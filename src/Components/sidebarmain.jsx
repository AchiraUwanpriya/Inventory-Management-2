import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import './App.css' 

const App = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const handleLogout = () => {
    console.log('Logging out...')
  }

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
      
      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-card">
          <h1>Dashboard Content</h1>
          <p>Active Tab: {activeTab}</p>
          
          <div className="demo-section">
            <h2>Test the Sidebar</h2>
            <p>Try these actions:</p>
            <ul>
              <li>Click the hamburger menu icon to open/close sidebar</li>
              <li>Resize your browser to test mobile responsiveness</li>
              <li>Click on different menu items</li>
            </ul>
          </div>

          <div className="tab-test">
            <h3>Quick Tab Test:</h3>
            <div className="tab-buttons">
              <button onClick={() => setActiveTab('overview')}>Overview</button>
              <button onClick={() => setActiveTab('products')}>Products</button>
              <button onClick={() => setActiveTab('customers')}>Customers</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App