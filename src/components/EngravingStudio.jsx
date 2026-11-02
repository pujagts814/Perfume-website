import React, { useState } from 'react'
import { Sparkles, ShoppingBag, Check, Award } from 'lucide-react'

export default function EngravingStudio({
  fragrances,
  initialFragrance,
  onAddToCart,
  currencySymbol,
  currencyRate
}) {
  const [selectedId, setSelectedId] = useState(initialFragrance?.id || 'rouge-noir')
  const [engravingText, setEngravingText] = useState('E.L. 1889')
  const [fontStyle, setFontStyle] = useState('serif') // 'serif', 'script', 'modern'
  const [foilColor, setFoilColor] = useState('gold') // 'gold', 'silver', 'rosegold'
  const [added, setAdded] = useState(false)

  const activeFragrance = fragrances.find(f => f.id === selectedId) || fragrances[0]
  const defaultSize = activeFragrance.sizes.find(s => s.default) || activeFragrance.sizes[0]
  const engravingFee = 35
  const totalPrice = Math.round((defaultSize.price + engravingFee) * currencyRate)

  const handleAddEngravedToCart = () => {
    onAddToCart({
      ...activeFragrance,
      selectedSize: defaultSize,
      price: defaultSize.price + engravingFee,
      engraving: {
        text: engravingText || 'LUMIÈRE',
        fontStyle,
        foilColor,
        fee: engravingFee
      }
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const foilHex = {
    gold: '#E6C280',
    silver: '#E0E0E0',
    rosegold: '#E6A5A5'
  }[foilColor]

  return (
    <section id="engraving-studio" className="engraving-section">
      <div className="section-header">
        <span className="section-eyebrow">
          <Sparkles size={14} /> ATELIER DE PERSONNALISATION
        </span>
        <h2 className="section-title">Bespoke Flacon Engraving</h2>
        <p className="section-desc">
          Immortalize a momentous date, monograms, or sentiment onto heavy French crystal.
          Each flacon is etched by master artisans and filled with your choice of precious metal leaf.
        </p>
      </div>

      <div className="engraving-stage-grid">
        {/* Left: Live Interactive Bottle Mockup with Real-time Engraved Foil Preview */}
        <div className="engraving-preview-card">
          <div className="engraving-bottle-container">
            <img
              src={activeFragrance.image}
              alt={`${activeFragrance.name} Flacon`}
              className="engraving-bottle-img"
            />

            {/* Glowing foil engraving plate overlay on the bottle glass */}
            <div className="engraving-glass-plate">
              <div
                className={`engraved-text-preview font-${fontStyle}`}
                style={{
                  color: foilHex,
                  textShadow: `0 0 10px ${foilHex}88, 0 1px 2px rgba(0,0,0,0.9)`
                }}
              >
                {engravingText || 'VOTRE NOM'}
              </div>
              <div
                className="engraved-underline"
                style={{ backgroundColor: foilHex }}
              ></div>
              <span className="engraved-location-tag">PARIS • BESPOKE</span>
            </div>
          </div>

          <div className="engraving-artisan-note">
            <Award size={16} className="artisan-icon" />
            <span>Hand-etched by Parisian master glassmiths • 24K Leaf Inlay</span>
          </div>
        </div>

        {/* Right: Customization Controls Form */}
        <div className="engraving-controls-card">
          {/* Step 1: Choose Fragrance */}
          <div className="control-group">
            <label className="control-label">
              1. Select Your Flacon Creation:
            </label>
            <div className="bottle-pill-selection">
              {fragrances.map((f) => (
                <button
                  key={f.id}
                  className={`bottle-pill-choice ${f.id === selectedId ? 'selected' : ''}`}
                  onClick={() => setSelectedId(f.id)}
                >
                  <img src={f.image} alt={f.name} className="pill-thumb" />
                  <div className="pill-meta">
                    <strong>{f.name}</strong>
                    <span>{f.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Custom Text Input */}
          <div className="control-group">
            <label className="control-label">
              2. Inscription / Monogram (Max 18 Characters):
            </label>
            <div className="input-with-counter">
              <input
                type="text"
                maxLength={18}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="e.g. M.V. 2026 or POUR TOUJOURS"
                className="engraving-text-input"
              />
              <span className="char-count">{engravingText.length}/18</span>
            </div>
            <span className="input-hint">
              Popular inscriptions: Initials (e.g. &ldquo;A.C.&rdquo;), dates (&ldquo;14.02.2026&rdquo;), or love notes.
            </span>
          </div>

          {/* Step 3: Typography Style */}
          <div className="control-group">
            <label className="control-label">
              3. Calligraphic Typography:
            </label>
            <div className="style-buttons-row">
              <button
                className={`style-btn ${fontStyle === 'serif' ? 'active' : ''}`}
                onClick={() => setFontStyle('serif')}
              >
                <span className="font-preview font-serif">Haute Serif</span>
                <span className="style-desc">Timeless & Aristocratic</span>
              </button>

              <button
                className={`style-btn ${fontStyle === 'script' ? 'active' : ''}`}
                onClick={() => setFontStyle('script')}
              >
                <span className="font-preview font-script">Royal Script</span>
                <span className="style-desc">Handwritten Calligraphy</span>
              </button>

              <button
                className={`style-btn ${fontStyle === 'modern' ? 'active' : ''}`}
                onClick={() => setFontStyle('modern')}
              >
                <span className="font-preview font-modern">Modernist</span>
                <span className="style-desc">Clean Architectural Caps</span>
              </button>
            </div>
          </div>

          {/* Step 4: Metallic Leaf Finish */}
          <div className="control-group">
            <label className="control-label">
              4. Precious Foil Inlay:
            </label>
            <div className="foil-options-row">
              <button
                className={`foil-btn ${foilColor === 'gold' ? 'active' : ''}`}
                onClick={() => setFoilColor('gold')}
              >
                <span className="foil-swatch swatch-gold"></span>
                <span>24K Champagne Gold</span>
              </button>

              <button
                className={`foil-btn ${foilColor === 'silver' ? 'active' : ''}`}
                onClick={() => setFoilColor('silver')}
              >
                <span className="foil-swatch swatch-silver"></span>
                <span>Platinum Silver</span>
              </button>

              <button
                className={`foil-btn ${foilColor === 'rosegold' ? 'active' : ''}`}
                onClick={() => setFoilColor('rosegold')}
              >
                <span className="foil-swatch swatch-rosegold"></span>
                <span>Rose Copper</span>
              </button>
            </div>
          </div>

          {/* Summary & Add to Cart */}
          <div className="engraving-summary-box">
            <div className="engraving-price-row">
              <div>
                <span className="summary-title">{activeFragrance.name} (100ml) + Bespoke Glass Engraving</span>
                <span className="summary-sub">Includes hand-finished gift presentation</span>
              </div>
              <div className="summary-amount">
                {currencySymbol}{totalPrice}
              </div>
            </div>

            <button
              className={`btn-order-engraved ${added ? 'btn-added' : ''}`}
              onClick={handleAddEngravedToCart}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>Personalized Flacon Added ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add Bespoke Flacon to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
