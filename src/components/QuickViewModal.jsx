import React, { useState } from 'react'
import { X, ShoppingBag, Heart, Clock, Wind, Sun } from 'lucide-react'

export default function QuickViewModal({
  fragrance,
  isOpen,
  onClose,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  currencySymbol,
  currencyRate
}) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1)

  if (!isOpen || !fragrance) return null

  const isWishlisted = wishlist.some(w => w.id === fragrance.id)
  const currentSize = fragrance.sizes[selectedSizeIndex] || fragrance.sizes[0]
  const convertedPrice = Math.round(currentSize.price * currencyRate)

  return (
    <div className="quickview-backdrop" onClick={onClose}>
      <div className="quickview-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="quickview-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Left: Image with badge */}
          <div className="quickview-image-pane">
            <img
              src={fragrance.image}
              alt={fragrance.name}
              className="quickview-bottle-img"
            />
            <span className="quickview-tag">{fragrance.tag}</span>
          </div>

          {/* Right: Info, Pyramid & Actions */}
          <div className="quickview-info-pane">
            <div className="quickview-header">
              <span className="quickview-collection">{fragrance.family}</span>
              <div className="quickview-title-row">
                <h3 className="quickview-title">{fragrance.name}</h3>
                <button
                  className="quickview-wishlist-toggle"
                  onClick={() => onToggleWishlist(fragrance)}
                >
                  <Heart size={20} fill={isWishlisted ? '#D4AF37' : 'none'} color="#D4AF37" />
                </button>
              </div>
              <span className="quickview-concentration">{fragrance.concentration}</span>
            </div>

            <p className="quickview-narrative">{fragrance.description}</p>

            {/* Pyramid preview */}
            <div className="quickview-pyramid-summary">
              <div className="mini-note-group">
                <strong>Top:</strong>
                <span>{fragrance.pyramid.top.map(n => n.note).join(', ')}</span>
              </div>
              <div className="mini-note-group">
                <strong>Heart:</strong>
                <span>{fragrance.pyramid.heart.map(n => n.note).join(', ')}</span>
              </div>
              <div className="mini-note-group">
                <strong>Base:</strong>
                <span>{fragrance.pyramid.base.map(n => n.note).join(', ')}</span>
              </div>
            </div>

            {/* Specs row */}
            <div className="quickview-specs-row">
              <div className="mini-spec">
                <Clock size={14} />
                <span>{fragrance.specs.longevity}</span>
              </div>
              <div className="mini-spec">
                <Wind size={14} />
                <span>{fragrance.specs.sillage}</span>
              </div>
              <div className="mini-spec">
                <Sun size={14} />
                <span>{fragrance.specs.season}</span>
              </div>
            </div>

            {/* Size selection */}
            <div className="quickview-size-selector">
              <span className="quickview-size-label">Select Volume:</span>
              <div className="quickview-sizes-list">
                {fragrance.sizes.map((s, idx) => (
                  <button
                    key={s.ml}
                    className={`qv-size-btn ${selectedSizeIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedSizeIndex(idx)}
                  >
                    <span>{s.ml} ml</span>
                    <small>{currencySymbol}{Math.round(s.price * currencyRate)}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA bar */}
            <div className="quickview-cta-row">
              <div className="qv-price-tag">
                <span className="qv-price-num">{currencySymbol}{convertedPrice}</span>
                <span className="qv-tax-note">Taxes & Shipping Included</span>
              </div>

              <button
                className="qv-add-btn"
                onClick={() => {
                  onAddToCart({
                    ...fragrance,
                    selectedSize: currentSize,
                    price: currentSize.price,
                    engraving: null
                  })
                  onClose()
                }}
              >
                <ShoppingBag size={18} />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
