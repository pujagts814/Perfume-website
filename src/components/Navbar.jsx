import React, { useState, useEffect } from 'react'
import { Search, Heart, ShoppingBag, Sparkles, X, Menu } from 'lucide-react'

export default function Navbar({
  currency,
  setCurrency,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenQuiz,
  onSelectFragrance,
  fragrances
}) {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll listener for sticky glass header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open to prevent awkward background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredFragrances = searchQuery.trim()
    ? fragrances.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.accords.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  const handleNavClick = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      {/* Top Haute Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span className="announcement-highlight">
            <Sparkles size={13} className="sparkle-icon" />
            COMPLIMENTARY MAISON COFFRET
          </span>
          <span className="announcement-text">
            2 bespoke 2ml samples & gift box on all orders • Grasse
          </span>
        </div>
        <div className="announcement-actions">
          <div className="currency-selector" role="group" aria-label="Currency selection">
            {['EUR', 'USD', 'GBP'].map((curr) => (
              <button
                key={curr}
                className={`curr-btn ${currency === curr ? 'active' : ''}`}
                onClick={() => setCurrency(curr)}
                aria-label={`Select ${curr}`}
              >
                {curr === 'EUR' ? '€ EUR' : curr === 'USD' ? '$ USD' : '£ GBP'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header className={`main-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          {/* Mobile hamburger button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Left Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <button onClick={() => handleNavClick('flacon-showcase')} className="nav-link">
              Signature Flacons
            </button>
            <button onClick={() => handleNavClick('collection')} className="nav-link">
              The Collection
            </button>
            <button onClick={() => handleNavClick('engraving-studio')} className="nav-link">
              Bespoke Atelier
            </button>
            <button onClick={() => handleNavClick('heritage')} className="nav-link">
              Grasse Heritage
            </button>
          </nav>

          {/* Centered Brand Mark */}
          <div
            className="brand-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="button"
            tabIndex={0}
            aria-label="Lumière Haute Parfumerie Paris - Return to top"
          >
            <span className="brand-sub">MAISON FONDÉE EN 1889</span>
            <span className="brand-title">LUMIÈRE</span>
            <span className="brand-place">HAUTE PARFUMERIE • PARIS</span>
          </div>

          {/* Right Action Icons */}
          <div className="header-actions">
            <button
              className="quiz-trigger-btn"
              onClick={onOpenQuiz}
              title="Fragrance Diagnostic Quiz"
              aria-label="Start Scent Matchmaker Quiz"
            >
              <Sparkles size={15} />
              <span className="quiz-btn-text">Scent Finder</span>
            </button>

            <button
              className="icon-action-btn search-trigger-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search Fragrance Collection"
            >
              <Search size={19} />
            </button>

            <button
              className="icon-action-btn wishlist-btn"
              onClick={onOpenWishlist}
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart size={19} />
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </button>

            <button
              className="icon-action-btn cart-btn"
              onClick={onOpenCart}
              aria-label={`Shopping Bag (${cartCount} items)`}
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Live Search Drawer / Popover */}
        {searchOpen && (
          <div className="search-popover" role="dialog" aria-label="Search Fragrances">
            <div className="search-bar-inner">
              <Search size={20} className="search-input-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search notes, collections, accords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                aria-label="Search fragrances"
              />
              <button
                className="close-search-btn"
                onClick={() => {
                  setSearchOpen(false)
                  setSearchQuery('')
                }}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            {searchQuery && (
              <div className="search-results-list">
                {filteredFragrances.length > 0 ? (
                  filteredFragrances.map((item) => (
                    <div
                      key={item.id}
                      className="search-result-item"
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        onSelectFragrance(item)
                        setSearchOpen(false)
                        setSearchQuery('')
                        document.getElementById('flacon-showcase')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      <img src={item.image} alt={item.name} className="search-thumb" loading="lazy" />
                      <div className="search-info">
                        <h4>{item.name}</h4>
                        <span className="search-sub">{item.subtitle} • {item.family}</span>
                        <p>{item.description.slice(0, 80)}...</p>
                      </div>
                      <span className="search-price">€{item.price}</span>
                    </div>
                  ))
                ) : (
                  <div className="search-empty">
                    No creations found matching &quot;{searchQuery}&quot;. Try &quot;Rose&quot;, &quot;Saffron&quot;, or &quot;Oud&quot;.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation Drawer & Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className="mobile-drawer-backdrop"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            ></div>
            <div className="mobile-drawer" role="dialog" aria-label="Mobile Navigation Menu">
              <div className="mobile-drawer-top">
                <span className="mobile-drawer-brand">LUMIÈRE PARIS</span>
                <button
                  className="mobile-drawer-close"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="mobile-nav-list" aria-label="Mobile Menu Links">
                <button onClick={() => handleNavClick('flacon-showcase')}>
                  <span>Signature Flacons</span>
                  <span className="mobile-nav-sub">Interactive 3D & Scent Architecture</span>
                </button>
                <button onClick={() => handleNavClick('collection')}>
                  <span>The Collection</span>
                  <span className="mobile-nav-sub">Extrait de Parfum Portfolio</span>
                </button>
                <button onClick={() => handleNavClick('engraving-studio')}>
                  <span>Bespoke Atelier</span>
                  <span className="mobile-nav-sub">Personalized 24K Gold Inscription</span>
                </button>
                <button onClick={() => handleNavClick('heritage')}>
                  <span>Grasse Heritage</span>
                  <span className="mobile-nav-sub">Living Savoir-Faire Since 1889</span>
                </button>
                <button
                  className="mobile-nav-quiz-highlight"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenQuiz()
                  }}
                >
                  <Sparkles size={16} />
                  <span>Scent Matchmaker Diagnostic</span>
                </button>
              </nav>

              <div className="mobile-drawer-footer">
                <p>PARIS FLAGSHIP • 340 RUE SAINT-HONORÉ</p>
                <div className="mobile-currencies">
                  {['EUR', 'USD', 'GBP'].map((curr) => (
                    <button
                      key={curr}
                      className={`curr-btn ${currency === curr ? 'active' : ''}`}
                      onClick={() => {
                        setCurrency(curr)
                      }}
                    >
                      {curr === 'EUR' ? '€ EUR' : curr === 'USD' ? '$ USD' : '£ GBP'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  )
}
