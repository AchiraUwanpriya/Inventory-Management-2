import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Package } from 'lucide-react'

const Header = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' }
  ]

  return (
    <header className="header">
      <div className="header-container">
        
        <div className="header-brand">
          <Package className="header-logo" size={32} />
          <span className="header-title">Dreamy Dreams</span>
        </div>

        {location.pathname === '/' && (
          <nav className={`header-nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="nav-link">
                {item.name}
              </a>
            ))}
          </nav>
        )}

        <div className="header-actions">
          {location.pathname === '/' && (
            <>
              <Link to="/login" className="btn-primary">
                Sign In
              </Link>
              <button
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          )}
          {isAuthenticated && (
            <button onClick={onLogout} className="btn-secondary">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header