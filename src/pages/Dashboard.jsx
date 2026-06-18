import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import DashboardContent from '../Components/DashboardContent'
import { authActions } from '../Actions/authactions'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log('Logging out from dashboard...')
    dispatch(authActions.logout())
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <main className="dashboard-main">
        <DashboardContent activeTab={activeTab} />
      </main>
    </div>
  )
}

export default Dashboard