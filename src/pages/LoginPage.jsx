import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Package, Eye, EyeOff } from 'lucide-react'
import { authActions } from '../Actions/authactions'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // Get auth state from Redux store
  const { loading, error } = useSelector(state => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('=== FORM SUBMIT TRIGGERED ===')
    console.log('Form submitted with:', formData)
    
    try {
      // Only allow admin user from your database
      if (formData.username !== 'admin') {
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          error: 'Access denied. Only admin can login to the system.' 
        })
        return
      }

      // Use dispatch for Redux action with your database credentials
      console.log('Dispatching login action...')
      const result = await dispatch(authActions.login(formData.username, formData.password))
      
      console.log('Login action result:', result)
      
      // Check if login was successful
      if (result && result.type === 'LOGIN_SUCCESS') {
        console.log('Login successful!')
        console.log('Navigating to dashboard...')
        navigate('/dashboard')
      } else if (result && result.type === 'LOGIN_FAILURE') {
        console.log('Login failed in action')
      }
      
    } catch (error) {
      console.log('Login error in handleSubmit:', error)
    }
  }

  const handleChange = (e) => {
    console.log('Input changed:', e.target.name, e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    
    // Clear error when user starts typing
    if (error) {
      dispatch(authActions.clearError())
    }
  }

  // Remove the handleButtonClick function or modify it to not interfere
  const handleButtonClick = (e) => {
    console.log('=== BUTTON CLICKED (Form will handle submission) ===')
    // Let the form handle the submission, don't prevent default
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-brand">
              <Package size={40} />
              <h1>Dreamy Dreams</h1>
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                {/* <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button> */}
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input type="checkbox" />
                Remember me
              </label>
              {/* <a href="#forgot" className="forgot-link">
                Forgot password?
              </a> */}
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
        
          </div>
        </div>

        <div className="login-bg">
          <div className="bg-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

