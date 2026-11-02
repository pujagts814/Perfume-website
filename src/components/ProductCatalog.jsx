import React, { useState } from 'react'
import { Sparkles, Heart, Eye, ShoppingBag, Star, Filter } from 'lucide-react'

export default function ProductCatalog({
  fragrances,
  onSelectFragrance,
  onAddToCart,
  onOpenQuickView,
  wishlist,
  onToggleWishlist,
  currencySymbol,
  currencyRate
}) {
  const [activeFamily, setActiveFamily] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  const families = [
    { id: 'all', label: 'All Masterpieces' },
    { id: 'amber', label: 'Amber & Gourmand' },
    { id: 'fresh', label: 'Fresh & Solar' },
    { id: 'floral', label: 'Floral & Powdery' },
    { id: 'woody', label: 'Woody & Oriental' }
  ]

  let filtered = activeFamily === 'all'
    ? [...fragrances]
    : fragrances.filter(f => f.familySlug === activeFamily)

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  }

  return (
    <section id="collection" className="catalog-section">
      <div className="section-header">
        <span className="section-eyebrow">
          <Sparkles size={14} /> LA COLLECTION COMPLÈTE
        </span>
        <h2 className="section-title">The Haute Parfumerie Portfolio</h2>
        <p className="section-desc">
          Four extraordinary olfactory compositions, distilled with up to 35% concentration
          for remarkable trail and longevity. Refillable in French crystal.
        </p>
      </div>

      {/* Filter and Sort Controls */}
      <div className="catalog-controls-bar">
        <div className="family-filter-tabs">
          {families.map((family) => (
            <button
              key={family.id}
              className={`family-tab ${activeFamily === family.id ? 'active' : ''}`}
              onClick={() => setActiveFamily(family.id)}
            >
              {family.label}
            </button>
          ))}
        </div>

        <div className="catalog-sort-select">
          <label htmlFor="sort-dropdown">
            <Filter size={14} /> Sort By:
          </label>
          <select
            id="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured Curations</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Connoisseur Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filtered.map((item) => {
          const isWishlisted = wishlist.some(w => w.id === item.id)
          const defaultSize = item.sizes.find(s => s.default) || item.sizes[0]
          const convertedPrice = Math.round(defaultSize.price * currencyRate)

          return (
            <div key={item.id} className="perfume-card">
              {/* Card Image Area */}
              <div className="card-image-wrap">
                <img
                  src={item.image}
                  alt={`${item.name} Flacon`}
                  className="card-perfume-img"
                  onClick={() => onOpenQuickView(item)}
                />

                <span className="card-badge-top">{item.tag}</span>

                <button
                  className={`card-wishlist-btn ${isWishlisted ? 'favorited' : ''}`}
                  onClick={() => onToggleWishlist(item)}
                  aria-label="Wishlist"
                >
                  <Heart size={18} fill={isWishlisted ? '#D4AF37' : 'none'} color="#D4AF37" />
                </button>

                <div className="card-hover-actions">
                  <button
                    className="quick-view-action"
                    onClick={() => onOpenQuickView(item)}
                  >
                    <Eye size={16} /> Quick View
                  </button>
                </div>
              </div>

              {/* Card Info Area */}
              <div className="card-info">
                <div className="card-family-tag">{item.family}</div>
                <h3
                  className="card-name"
                  onClick={() => {
                    onSelectFragrance(item)
                    document.getElementById('flacon-showcase')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {item.name}
                </h3>
                <span className="card-subtitle">{item.subtitle}</span>

                <div className="card-rating-row">
                  <div className="stars-wrapper">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>
                  <span className="rating-score">{item.rating} ({item.reviewsCount})</span>
                </div>

                <p className="card-short-desc">
                  {item.description.slice(0, 85)}...
                </p>

                {/* Key notes preview */}
                <div className="card-notes-pills">
                  {item.pyramid.top[0] && (
                    <span className="note-pill">{item.pyramid.top[0].note}</span>
                  )}
                  {item.pyramid.heart[0] && (
                    <span className="note-pill">{item.pyramid.heart[0].note}</span>
                  )}
                  {item.pyramid.base[0] && (
                    <span className="note-pill">{item.pyramid.base[0].note}</span>
                  )}
                </div>

                {/* Pricing & Add to Cart button */}
                <div className="card-footer-row">
                  <div className="card-price-stack">
                    <span className="price-prefix">From</span>
                    <span className="price-figure">
                      {currencySymbol}{convertedPrice}
                    </span>
                    <span className="size-label">{defaultSize.ml} ml</span>
                  </div>

                  <button
                    className="card-add-btn"
                    onClick={() => onAddToCart({
                      ...item,
                      selectedSize: defaultSize,
                      price: defaultSize.price,
                      engraving: null
                    })}
                  >
                    <ShoppingBag size={16} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
