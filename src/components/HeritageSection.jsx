import React from 'react'
import { Sparkles, Sun, Droplets, Leaf, Award } from 'lucide-react'
import grasseImg from '../assets/grasse-atelier.jpg'
import roseImg from '../assets/ingredient-rose.jpg'

export default function HeritageSection() {
  return (
    <section id="heritage" className="heritage-section">
      <div className="section-header">
        <span className="section-eyebrow">
          <Sparkles size={14} /> HISTOIRE & SAVOIR-FAIRE
        </span>
        <h2 className="section-title">The Legend of Grasse</h2>
        <p className="section-desc">
          Perched in the sun-drenched pre-Alps above the French Riviera, Grasse has remained
          the sacred capital of high perfumery since the 17th century.
        </p>
      </div>

      <div className="heritage-story-grid">
        {/* Story Part 1: The Atelier */}
        <div className="story-card">
          <div className="story-image-wrap">
            <img
              src={grasseImg}
              alt="Lumière Laboratory in Grasse, France"
              className="story-img"
            />
            <div className="story-image-overlay">
              <span>L'ATELIER DE DISTILLATION • EST. 1889</span>
            </div>
          </div>
          <div className="story-content">
            <span className="story-numeral">01 / ARTISANAL MASTERY</span>
            <h3 className="story-heading">Patience, Cold-Extraction & Time</h3>
            <p>
              In our family-held domain in Grasse, we eschew industrial thermal distillation.
              Our botanicals undergo gentle fractional cold-extraction over 45 days, preserving
              the volatile, whisper-soft top notes that high heat permanently destroys.
            </p>
            <div className="story-bullets">
              <div className="bullet-point">
                <Sun size={16} className="bullet-icon" />
                <span>Harvested exclusively at 6:00 AM before the sun evaporates ethereal oils</span>
              </div>
              <div className="bullet-point">
                <Leaf size={16} className="bullet-icon" />
                <span>Zero synthetic petrochemical stabilizers; aged in charred French oak casks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Part 2: The May Rose */}
        <div className="story-card reverse">
          <div className="story-image-wrap">
            <img
              src={roseImg}
              alt="Centifolia Rose Harvest in Grasse"
              className="story-img"
            />
            <div className="story-image-overlay">
              <span>ROSE DE MAI • ROSA CENTIFOLIA</span>
            </div>
          </div>
          <div className="story-content">
            <span className="story-numeral">02 / NATURE'S MASTERWORK</span>
            <h3 className="story-heading">5,000 May Roses in Every Single Flacon</h3>
            <p>
              The legendary Rosa Centifolia blooms for only three fleeting weeks each May.
              It takes more than 400 kilograms of freshly gathered petals—over 5,000 intact flowers—to
              yield a single kilogram of pure, honeyed rose absolue used in <em>Rose Éternelle</em> and <em>Rouge Noir</em>.
            </p>
            <div className="story-bullets">
              <div className="bullet-point">
                <Droplets size={16} className="bullet-icon" />
                <span>Poured into hand-polished lead-free French crystal flacons</span>
              </div>
              <div className="bullet-point">
                <Award size={16} className="bullet-icon" />
                <span>Certified UNESCO Intangible Cultural Heritage of Perfumery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage Stats Strip */}
      <div className="heritage-stats-strip">
        <div className="stat-item">
          <span className="stat-number">135+</span>
          <span className="stat-label">Years of Family Savoir-Faire</span>
        </div>
        <div className="stat-divider"></div>

        <div className="stat-item">
          <span className="stat-number">5,000</span>
          <span className="stat-label">Dawn-Picked Roses per Flacon</span>
        </div>
        <div className="stat-divider"></div>

        <div className="stat-item">
          <span className="stat-number">35%</span>
          <span className="stat-label">Concentration (Pure Extrait)</span>
        </div>
        <div className="stat-divider"></div>

        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Recyclable French Crystal</span>
        </div>
      </div>
    </section>
  )
}
