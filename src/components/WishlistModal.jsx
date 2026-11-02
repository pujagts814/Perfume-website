import React from 'react'
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'

export default function WishlistModal({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  currencySymbol,
  currencyRate
}) {
  if (!isOpen) return null

  return (
    <div className="wishlist-backdrop" onClick={onClose}>
      <div className="wishlist-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="wishlist-header">
          <div className="wishlist-title-row">
            <Heart size={20} fill="#D4AF37" color="#D4AF37" />
            <h3>Your Saved Curations</h3>
            <span className="wishlist-count-badge">{wishlist.length}</span>
          </div>
          <button className="wishlist-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="wishlist-items-list">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty-state">
              <Heart size={44} className="empty-heart-icon" />
              <h4>No Fragrances Saved Yet</h4>
              <p>Bookmark your preferred olfactory creations to view and compare them here.</p>
              <button className="btn-explore-empty" onClick={onClose}>
                Explore The Collection
              </button>
            </div>
          ) : (
            wishlist.map((item) => {
              const defaultSize = item.sizes.find(s => s.default) || item.sizes[0]
              const price = Math.round(defaultSize.price * currencyRate)
              return (
                <div key={item.id} className="wishlist-item-row">
                  <img src={item.image} alt={item.name} className="wishlist-thumb" />

                  <div className="wishlist-item-details">
                    <span className="wishlist-item-family">{item.family}</span>
                    <h4 className="wishlist-item-name">{item.name}</h4>
                    <span className="wishlist-item-size">{defaultSize.ml} ml • {item.subtitle}</span>
                    <span className="wishlist-item-price">{currencySymbol}{price}</span>
                  </div>

                  <div className="wishlist-item-actions">
                    <button
                      className="wishlist-add-btn"
                      onClick={() => {
                        onAddToCart({
                          ...item,
                          selectedSize: defaultSize,
                          price: defaultSize.price,
                          engraving: null
                        })
                      }}
                      title="Add to Shopping Bag"
                    >
                      <ShoppingBag size={16} />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      className="wishlist-remove-btn"
                      onClick={() => onRemoveFromWishlist(item.id)}
                      title="Remove from favorites"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
