import React, { useState } from 'react'
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Clock,
  Wind,
  Sun,
  Flame,
  Camera,
  Rotate3d,
  Edit3
} from 'lucide-react'
import ThreeBottleViewer from './ThreeBottleViewer'

export default function FragranceShowcase({
  fragrances,
  selectedFragrance,
  onSelectFragrance,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onNavigateToEngraving,
  _currency,
  currencySymbol,
  currencyRate
}) {
  const [activeTab, setActiveTab] = useState('heart') // 'top', 'heart', 'base'
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1) // 100ml default
  const [viewMode, setViewMode] = useState('photo') // '3d' or 'photo'
  const [addedAnimation, setAddedAnimation] = useState(false)

  const fragrance = selectedFragrance || fragrances[0]
  const currentSize = fragrance.sizes[selectedSizeIndex] || fragrance.sizes[0]
  const convertedPrice = Math.round(currentSize.price * currencyRate)
  const isWishlisted = wishlist.some(item => item.id === fragrance.id)

  const handleAddToCartClick = () => {
    onAddToCart({
      ...fragrance,
      selectedSize: currentSize,
      price: currentSize.price,
      engraving: null
    })
    setAddedAnimation(true)
    setTimeout(() => setAddedAnimation(false), 1400)
  }

  return (
    <section id="flacon-showcase" className="showcase-section">
      <div className="section-header">
        <span className="section-eyebrow">
          <Sparkles size={14} /> L'ÉCRIN OLFACTIF
        </span>
        <h2 className="section-title">The Signature Flacon Experience</h2>
        <p className="section-desc">
          Select an iconic creation below. Explore the structural architecture of its fragrance pyramid,
          longevity, and view it in 3D crystal or editorial lighting.
        </p>
      </div>

      {/* Fragrance Selector Tabs */}
      <div className="fragrance-selector-nav">
        {fragrances.map((f) => (
          <button
            key={f.id}
            className={`fragrance-pill-btn ${f.id === fragrance.id ? 'active' : ''}`}
            onClick={() => {
              onSelectFragrance(f)
              setSelectedSizeIndex(1)
            }}
          >
            <span className="pill-indicator" style={{ backgroundColor: f.id === 'rouge-noir' ? '#8E1616' : f.id === 'golden-hour' ? '#D48B28' : f.id === 'rose-eternelle' ? '#E06D83' : '#3E2723' }}></span>
            <span className="pill-name">{f.name}</span>
            <span className="pill-tag">{f.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="showcase-grid">
        {/* Left Column: Visual Flacon Stage (3D / High-Res Photo Toggle) */}
        <div className="showcase-visual-card">
          {/* Mode Switcher Buttons */}
          <div className="view-mode-switch">
            <button
              className={`mode-btn ${viewMode === 'photo' ? 'active' : ''}`}
              onClick={() => setViewMode('photo')}
            >
              <Camera size={15} />
              <span>Haute Photography</span>
            </button>
            <button
              className={`mode-btn ${viewMode === '3d' ? 'active' : ''}`}
              onClick={() => setViewMode('3d')}
            >
              <Rotate3d size={15} />
              <span>Interactive 3D Flacon</span>
            </button>
          </div>

          <div className="visual-stage-content">
            {viewMode === 'photo' ? (
              <div className="photo-stage-wrapper">
                <img
                  src={fragrance.image}
                  alt={`${fragrance.name} Flacon`}
                  className="showcase-photo-img"
                />
                <div className="photo-flacon-badges">
                  <span className="badge-flacon-tag">{fragrance.tag}</span>
                  <span className="badge-concentration">{fragrance.concentration}</span>
                </div>
              </div>
            ) : (
              <div className="three-stage-wrapper">
                <ThreeBottleViewer fragranceId={fragrance.id} />
              </div>
            )}
          </div>

          {/* Quick Accord Tags under image */}
          <div className="accords-row">
            <span className="accords-label">Dominant Accords:</span>
            <div className="accords-chips">
              {fragrance.accords.map((accord, idx) => (
                <span key={idx} className="accord-chip">
                  {accord}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Olfactory Pyramid & Master Perfumer Notes */}
        <div className="showcase-details-card">
          <div className="details-header">
            <div className="details-title-row">
              <div>
                <span className="flacon-collection-tag">{fragrance.family}</span>
                <h3 className="flacon-name">{fragrance.name}</h3>
                <span className="flacon-subtitle">{fragrance.subtitle}</span>
              </div>
              <button
                className={`wishlist-toggle-round ${isWishlisted ? 'favorited' : ''}`}
                onClick={() => onToggleWishlist(fragrance)}
                aria-label="Save to Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? '#D4AF37' : 'none'} color="#D4AF37" />
              </button>
            </div>

            <p className="fragrance-narrative">{fragrance.description}</p>
          </div>

          {/* Interactive Olfactory Notes Pyramid */}
          <div className="pyramid-interactive-container">
            <div className="pyramid-tabs">
              <button
                className={`pyramid-tab ${activeTab === 'top' ? 'active' : ''}`}
                onClick={() => setActiveTab('top')}
              >
                <span className="tab-stage">FIRST 15 MIN</span>
                <span className="tab-title">Head / Top Notes</span>
              </button>
              <button
                className={`pyramid-tab ${activeTab === 'heart' ? 'active' : ''}`}
                onClick={() => setActiveTab('heart')}
              >
                <span className="tab-stage">HOURS 1 – 4</span>
                <span className="tab-title">Heart / Soul Notes</span>
              </button>
              <button
                className={`pyramid-tab ${activeTab === 'base' ? 'active' : ''}`}
                onClick={() => setActiveTab('base')}
              >
                <span className="tab-stage">UP TO 24 HOURS</span>
                <span className="tab-title">Base / Echo Notes</span>
              </button>
            </div>

            <div className="pyramid-notes-display">
              {fragrance.pyramid[activeTab].map((noteItem, idx) => (
                <div key={idx} className="note-card-item">
                  <div className="note-icon-bullet">✦</div>
                  <div className="note-card-text">
                    <strong>{noteItem.note}</strong>
                    <span>{noteItem.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Perfumery Technical Specifications */}
          <div className="specs-grid">
            <div className="spec-box">
              <Clock size={16} className="spec-icon" />
              <div>
                <span className="spec-label">Longevity</span>
                <span className="spec-value">{fragrance.specs.longevity}</span>
              </div>
            </div>
            <div className="spec-box">
              <Wind size={16} className="spec-icon" />
              <div>
                <span className="spec-label">Sillage Aura</span>
                <span className="spec-value">{fragrance.specs.sillage}</span>
              </div>
            </div>
            <div className="spec-box">
              <Sun size={16} className="spec-icon" />
              <div>
                <span className="spec-label">Optimal Season</span>
                <span className="spec-value">{fragrance.specs.season}</span>
              </div>
            </div>
            <div className="spec-box">
              <Flame size={16} className="spec-icon" />
              <div>
                <span className="spec-label">Gender Harmony</span>
                <span className="spec-value">{fragrance.specs.gender}</span>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="size-selector-section">
            <div className="size-selector-label">
              <span>Select Flacon Volume:</span>
              <span className="volume-guide">Refillable Heavy Glass</span>
            </div>
            <div className="size-options-group">
              {fragrance.sizes.map((size, idx) => (
                <button
                  key={size.ml}
                  className={`size-btn ${selectedSizeIndex === idx ? 'selected' : ''}`}
                  onClick={() => setSelectedSizeIndex(idx)}
                >
                  <span className="size-ml">{size.ml} ml</span>
                  <span className="size-oz">{(size.ml * 0.0338).toFixed(1)} FL. OZ.</span>
                  {size.refillable && <span className="refill-tag">Refillable</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Add to Cart Action Bar */}
          <div className="showcase-cta-bar">
            <div className="pricing-box">
              <span className="price-label">Price per Flacon:</span>
              <span className="price-number">
                {currencySymbol}{convertedPrice}
              </span>
              <span className="price-taxes">Includes VAT • Free Courier Delivery</span>
            </div>

            <div className="showcase-buttons-group">
              <button
                className={`btn-add-cart ${addedAnimation ? 'btn-added' : ''}`}
                onClick={handleAddToCartClick}
              >
                <ShoppingBag size={18} />
                <span>{addedAnimation ? 'Added to Bag ✓' : 'Add to Bag'}</span>
              </button>

              <button
                className="btn-custom-engrave"
                onClick={() => onNavigateToEngraving(fragrance)}
                title="Personalize with gold engraving"
              >
                <Edit3 size={17} />
                <span>Bespoke Engraving</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
