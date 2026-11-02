import React, { useState } from 'react'
import { X, Trash2, ShoppingBag, Gift, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react'
import confetti from 'canvas-confetti'
import { COMPLIMENTARY_SAMPLES } from '../data/fragrances'

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currencySymbol,
  currencyRate
}) {
  const [selectedSamples, setSelectedSamples] = useState(['s-rouge', 's-golden'])
  const [isGiftWrapped, setIsGiftWrapped] = useState(true)
  const [giftMessage, setGiftMessage] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  if (!isOpen) return null

  const itemsSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const convertedSubtotal = Math.round(itemsSubtotal * currencyRate)
  const freeShippingThreshold = 180
  const distanceToFree = Math.max(0, Math.round((freeShippingThreshold - itemsSubtotal) * currencyRate))
  const giftWrapFee = isGiftWrapped ? Math.round(15 * currencyRate) : 0
  const finalTotal = convertedSubtotal + giftWrapFee

  const toggleSample = (sampleId) => {
    if (selectedSamples.includes(sampleId)) {
      setSelectedSamples(selectedSamples.filter(id => id !== sampleId))
    } else {
      if (selectedSamples.length < 2) {
        setSelectedSamples([...selectedSamples, sampleId])
      } else {
        // replace the first one
        setSelectedSamples([selectedSamples[1], sampleId])
      }
    }
  }

  const triggerGoldConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#8E1616', '#FFFFFF']
      })
    } catch {
      // ignore
    }
  }

  const handleSimulatedCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      const randomOrder = 'LUM-' + Math.floor(100000 + Math.random() * 900000)
      setOrderNumber(randomOrder)
      setIsCheckingOut(false)
      setOrderConfirmed(true)
      triggerGoldConfetti()
    }, 1500)
  }

  const handleFinish = () => {
    onClearCart()
    setOrderConfirmed(false)
    onClose()
  }

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="gold-icon" />
            <h3>Mon Panier</h3>
            <span className="cart-count-pill">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
            </span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close Bag">
            <X size={20} />
          </button>
        </div>

        {orderConfirmed ? (
          /* Order Confirmation Screen */
          <div className="order-confirmed-view">
            <div className="order-confirmed-icon">
              <Sparkles size={36} color="#D4AF37" />
            </div>
            <span className="order-eyebrow">MERCI DE VOTRE CONFIANCE</span>
            <h3 className="order-title">Your Order is Placed</h3>
            <p className="order-desc">
              Your flacon creation is being hand-prepared and sealed in our Grasse laboratory.
              A confirmation email and tracking itinerary have been dispatched.
            </p>

            <div className="order-summary-card">
              <div className="order-field">
                <span>Order Reference:</span>
                <strong>{orderNumber}</strong>
              </div>
              <div className="order-field">
                <span>Total Paid:</span>
                <strong>{currencySymbol}{finalTotal}</strong>
              </div>
              <div className="order-field">
                <span>Complimentary Samples:</span>
                <span>2 Selected Vials Included</span>
              </div>
              <div className="order-field">
                <span>Courier Service:</span>
                <span>DHL Express Carbon-Neutral (2-3 Business Days)</span>
              </div>
            </div>

            <button className="btn-continue-shopping" onClick={handleFinish}>
              <span>Continue Exploring LUMIÈRE</span>
            </button>
          </div>
        ) : (
          /* Normal Cart Content */
          <>
            {/* Free Courier Shipping Progress */}
            <div className="shipping-progress-banner">
              <div className="shipping-text-row">
                <span>
                  {distanceToFree === 0 ? (
                    <strong className="shipping-unlocked">✦ Complimentary Express Worldwide Courier Unlocked!</strong>
                  ) : (
                    <>Add {currencySymbol}{distanceToFree} more for complimentary Courier delivery</>
                  )}
                </span>
              </div>
              <div className="shipping-track">
                <div
                  className="shipping-fill"
                  style={{ width: `${Math.min(100, (itemsSubtotal / freeShippingThreshold) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="cart-items-scroll">
              {cartItems.length === 0 ? (
                <div className="empty-cart-state">
                  <ShoppingBag size={48} className="empty-icon" />
                  <h4>Your shopping bag is empty</h4>
                  <p>Discover our iconic flacons and add your signature fragrance.</p>
                  <button className="btn-explore-empty" onClick={onClose}>
                    Explore The Collection
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="cart-item-card">
                    <img src={item.image} alt={item.name} className="cart-thumb" />

                    <div className="cart-item-meta">
                      <div className="cart-item-title-row">
                        <h4>{item.name}</h4>
                        <button
                          className="cart-remove-btn"
                          onClick={() => onRemoveItem(idx)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <span className="cart-item-sub">
                        {item.selectedSize?.ml}ml • {item.subtitle}
                      </span>

                      {/* Engraving notice if customized */}
                      {item.engraving && (
                        <div className="cart-engraving-badge">
                          <Sparkles size={12} />
                          <span>
                            Engraved: &quot;<strong>{item.engraving.text}</strong>&quot; ({item.engraving.foilColor} foil)
                          </span>
                        </div>
                      )}

                      <div className="cart-item-pricing-row">
                        <div className="qty-controls">
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(idx, item.quantity + 1)}>
                            +
                          </button>
                        </div>

                        <span className="cart-item-price">
                          {currencySymbol}{Math.round(item.price * item.quantity * currencyRate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Complimentary 2ml Discovery Samples Selector */}
              {cartItems.length > 0 && (
                <div className="complimentary-samples-box">
                  <div className="samples-box-title">
                    <Gift size={16} className="gift-icon" />
                    <strong>Select 2 Complimentary 2ml Discovery Vials</strong>
                  </div>
                  <span className="samples-sub">
                    Included with our compliments to explore additional creations.
                  </span>

                  <div className="samples-grid">
                    {COMPLIMENTARY_SAMPLES.map((sample) => {
                      const isSelected = selectedSamples.includes(sample.id)
                      return (
                        <div
                          key={sample.id}
                          className={`sample-pill-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleSample(sample.id)}
                        >
                          <div className="sample-check">
                            {isSelected ? <Check size={13} /> : null}
                          </div>
                          <div className="sample-copy">
                            <strong>{sample.name}</strong>
                            <span>{sample.desc}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Gift Presentation Packaging Option */}
              {cartItems.length > 0 && (
                <div className="gift-packaging-box">
                  <label className="gift-checkbox-row">
                    <input
                      type="checkbox"
                      checked={isGiftWrapped}
                      onChange={(e) => setIsGiftWrapped(e.target.checked)}
                    />
                    <div className="gift-label-text">
                      <strong>Signature Gift Box & Gold Ribbon (+{currencySymbol}{giftWrapFee})</strong>
                      <span>Presented in rigid burgundy box with personalized note card</span>
                    </div>
                  </label>

                  {isGiftWrapped && (
                    <input
                      type="text"
                      className="gift-message-input"
                      placeholder="Enter optional gift card sentiment (e.g. Joyeux Anniversaire)..."
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Cart Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-subtotal-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>{currencySymbol}{convertedSubtotal}</span>
                  </div>
                  {isGiftWrapped && (
                    <div className="breakdown-row">
                      <span>Signature Gift Packaging</span>
                      <span>{currencySymbol}{giftWrapFee}</span>
                    </div>
                  )}
                  <div className="breakdown-row">
                    <span>Worldwide Express Delivery</span>
                    <span>{distanceToFree === 0 ? 'Complimentary' : `${currencySymbol}15`}</span>
                  </div>
                  <div className="breakdown-row total-row">
                    <span>Estimated Total</span>
                    <span>{currencySymbol}{finalTotal}</span>
                  </div>
                </div>

                <button
                  className="btn-checkout"
                  onClick={handleSimulatedCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <span>Securing Order with Paris Maison...</span>
                  ) : (
                    <>
                      <span>Proceed to Payment</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <div className="security-badges-row">
                  <ShieldCheck size={14} />
                  <span>256-bit Encrypted Checkout • Complimentary Return Within 30 Days</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
