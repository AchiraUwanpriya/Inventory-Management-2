import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

import { Package, BarChart3, Shield, Zap } from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: <Package size={48} />,
      title: 'Smart Inventory',
      description: 'Track your bag inventory with advanced categorization and real-time updates.'
    },
    {
      icon: <BarChart3 size={48} />,
      title: 'Analytics Dashboard',
      description: 'Get insights into your inventory trends, popular items, and stock levels.'
    },
    {
      icon: <Shield size={48} />,
      title: 'Secure & Reliable',
      description: 'Your inventory data is protected with enterprise-grade security measures.'
    },
    {
      icon: <Zap size={48} />,
      title: 'Lightning Fast',
      description: 'Quick searches, instant updates, and seamless user experience.'
    }
  ]

  return (
    <div className="landing-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
  Chase your dreams, but don't forget to grab your 
  <span style={{ color: "white" }}> FAVORITE BAG 👜</span>
</h1>

            <p className="hero-description">
              Streamline your bag inventory management with our powerful, intuitive platform. 
              Track stock, analyze trends, and optimize your business operations.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn-primary-large">
                Get Started Now
              </Link>
            
             
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <div className="card-header">
                <Package size={24} />
                <span>Inventory Overview</span>
              </div>
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-value">1,247</span>
                  <span className="stat-label">Total Bags</span>
                </div>
                <div className="stat">
                  <span className="stat-value">89%</span>
                  <span className="stat-label">Stock Level</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-container">
          <div className="section-header">
            <h2>Powerful Features for Modern Inventory</h2>
            <p>Everything you need to manage your bag inventory efficiently</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-container">
          <div className="section-header">
            <h2>About BagInventory</h2>
            <p>Your trusted partner in inventory management solutions</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Our Mission</h3>
              <p>
                We're dedicated to helping businesses streamline their bag inventory management 
                through innovative technology and user-friendly design. Our platform combines 
                powerful analytics with intuitive interfaces to make inventory tracking effortless.
              </p>
              <h3>Why Choose Us?</h3>
              <ul>
                <li>✓ Real-time inventory tracking</li>
                <li>✓ Advanced analytics and reporting</li>
                <li>✓ Secure cloud-based platform</li>
                <li>✓ 24/7 customer support</li>
                <li>✓ Easy integration with existing systems</li>
              </ul>
            </div>
            <div className="about-stats">
              <div className="about-stat">
                <h4>10,000+</h4>
                <p>Happy Customers</p>
              </div>
              <div className="about-stat">
                <h4>99.9%</h4>
                <p>Uptime</p>
              </div>
              <div className="about-stat">
                <h4>5 Years</h4>
                <p>Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default LandingPage