import React from 'react'
import { Sparkles, Compass, Shield, Award, Droplets } from 'lucide-react'

export default function Hero({ onOpenQuiz, onExploreClick }) {
  return (
    <section className="hero-section">
      <div className="hero-ambient-glow hero-glow-1"></div>
      <div className="hero-ambient-glow hero-glow-2"></div>

      <div className="hero-container">
        {/* Editorial Subtitle */}
        <div className="hero-badge">
          <Sparkles size={14} className="hero-sparkle" />
          <span>HAUTE PARFUMERIE FRANÇAISE • GRASSE 1889</span>
        </div>

        {/* Grand Editorial Headline */}
        <h1 className="hero-title">
          The Poetry of Scent, <br />
          <em>Distilled into Living Art</em>
        </h1>

        <p className="hero-lead">
          Conceived in the historic floral sanctuaries of Grasse, Provence. Each flacon houses
          an uncompromising Extrait de Parfum crafted from dawn-picked Centifolia roses, rare
          aged Cambodian oud, and golden bourbon resins.
        </p>

        {/* Action Buttons */}
        <div className="hero-ctas">
          <button className="btn-primary-gold" onClick={onExploreClick}>
            <span>Explore The Flacons</span>
          </button>

          <button className="btn-secondary-outline" onClick={onOpenQuiz}>
            <Compass size={17} />
            <span>Find Your Olfactory Signature</span>
          </button>
        </div>

        {/* Value Badges */}
        <div className="hero-pillars">
          <div className="pillar-item">
            <Droplets size={18} className="pillar-icon" />
            <div className="pillar-text">
              <strong>30–35% Pure Extrait</strong>
              <span>Sublime 14h+ staying power</span>
            </div>
          </div>
          <div className="pillar-divider"></div>

          <div className="pillar-item">
            <Award size={18} className="pillar-icon" />
            <div className="pillar-text">
              <strong>Centifolia Rose de Mai</strong>
              <span>Exclusive harvest in Provence</span>
            </div>
          </div>
          <div className="pillar-divider"></div>

          <div className="pillar-item">
            <Shield size={18} className="pillar-icon" />
            <div className="pillar-text">
              <strong>Bespoke Glass Engraving</strong>
              <span>Personalized with pure gold foil</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
