import React, { useState } from 'react'
import { Sparkles, Send, Shield, Award, Heart, Check } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="luxury-footer">
      {/* Newsletter Strip */}
      <div className="newsletter-banner">
        <div className="newsletter-container">
          <div className="newsletter-copy">
            <span className="newsletter-eyebrow">
              <Sparkles size={14} /> LE SALON PRIVÉ
            </span>
            <h3 className="newsletter-title">Receive Private Invitations & First Releases</h3>
            <p className="newsletter-sub">
              Subscribers receive private salon tasting appointments, early access to limited harvests,
              and a complimentary 10ml travel flacon with your inaugural acquisition.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your confidential email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit-btn">
                {subscribed ? <Check size={18} /> : <Send size={18} />}
                <span>{subscribed ? 'Privileged Access Granted' : 'Subscribe'}</span>
              </button>
            </div>
            {subscribed && (
              <span className="newsletter-success-msg">
                ✦ Bienvenue. A welcome missive with your private gift code has been dispatched.
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links & Maison Info */}
      <div className="footer-main-container">
        <div className="footer-brand-column">
          <div className="footer-brand-logo">
            <span className="brand-sub">MAISON FONDÉE EN 1889</span>
            <span className="brand-title">LUMIÈRE</span>
            <span className="brand-place">HAUTE PARFUMERIE • PARIS</span>
          </div>
          <p className="footer-mission">
            Guardians of French olfactory heritage. Each flacon is an uncompromising architectural
            vessel of time, crafted from rare botanicals distilled in Grasse.
          </p>
          <div className="footer-locations">
            <div>
              <strong>FLAGSHIP BOUTIQUE</strong>
              <span>340 Rue Saint-Honoré, 75001 Paris</span>
            </div>
            <div>
              <strong>GRASSE ATELIER & DOMAINE</strong>
              <span>Chemin des Roses de Mai, 06130 Grasse</span>
            </div>
          </div>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4>LES PARFUMS</h4>
            <ul>
              <li><a href="#flacon-showcase">Rouge Noir (32% Extrait)</a></li>
              <li><a href="#flacon-showcase">Golden Hour (Solar Amber)</a></li>
              <li><a href="#flacon-showcase">Rose Éternelle (May Rose)</a></li>
              <li><a href="#flacon-showcase">Ombre Royale (Aged Oud)</a></li>
              <li><a href="#collection">Discovery Coffret 4x10ml</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>SAVOIR-FAIRE</h4>
            <ul>
              <li><a href="#heritage">The Grasse Rose Fields</a></li>
              <li><a href="#heritage">Fractional Cold Enfleurage</a></li>
              <li><a href="#engraving-studio">Bespoke 24K Gold Engraving</a></li>
              <li><a href="#heritage">French Crystal Metallurgy</a></li>
              <li><a href="#heritage">IFRA Certified Purity</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>CONCIERGE CLIENTÈLE</h4>
            <ul>
              <li><a href="#flacon-showcase">Complimentary Sample Policy</a></li>
              <li><a href="#flacon-showcase">Worldwide Courier Tracking</a></li>
              <li><a href="#flacon-showcase">Boutique Appointment Booking</a></li>
              <li><a href="#flacon-showcase">Care of Heavy Crystal Flacons</a></li>
              <li><a href="#flacon-showcase">Private Gifting Concierge</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Sustainability */}
      <div className="footer-bottom-bar">
        <div className="footer-certifications">
          <span>✦ 100% Cruelty-Free</span>
          <span>✦ Sustainable May Rose Harvest</span>
          <span>✦ Carbon-Neutral Express Shipping</span>
          <span>✦ Paris Haute Parfumerie Guild</span>
        </div>
        <p className="copyright-line">
          © {new Date().getFullYear()} LUMIÈRE HAUTE PARFUMERIE PARIS. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
