import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import DashboardContent from '../Components/DashboardContent'
import { authActions } from '../Actions/authactions'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    console.log('Logging out from dashboard...')
    dispatch(authActions.logout())
    navigate('/login')
  }

  // Calculate dynamic margin-left for the main content area
  const mainMarginLeft = isMobile ? '0px' : (isSidebarCollapsed ? '80px' : '260px')

  return (
    <div className="dashboard" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      <main 
        className="dashboard-main" 
        style={{ 
          flex: 1,
          marginLeft: mainMarginLeft, 
          transition: 'margin-left 0.3s ease-in-out',
          width: '100%',
          minHeight: '100vh',
          overflowX: 'hidden'
        }}
      >
        <DashboardContent activeTab={activeTab} />
      </main>
    </div>
  )
}

export default Dashboard