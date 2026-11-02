import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FragranceShowcase from './components/FragranceShowcase'
import ProductCatalog from './components/ProductCatalog'
import EngravingStudio from './components/EngravingStudio'
import HeritageSection from './components/HeritageSection'
import CartDrawer from './components/CartDrawer'
import ScentQuizModal from './components/ScentQuizModal'
import QuickViewModal from './components/QuickViewModal'
import WishlistModal from './components/WishlistModal'
import Footer from './components/Footer'
import { FRAGRANCES } from './data/fragrances'
import './App.css'

const CURRENCIES = {
  EUR: { symbol: '€', rate: 1.0 },
  USD: { symbol: '$', rate: 1.08 },
  GBP: { symbol: '£', rate: 0.86 }
}

export default function App() {
  const [currency, setCurrency] = useState('EUR')
  const [selectedFragrance, setSelectedFragrance] = useState(FRAGRANCES[0])
  const [cartItems, setCartItems] = useState([
    {
      ...FRAGRANCES[0],
      selectedSize: FRAGRANCES[0].sizes[1],
      price: FRAGRANCES[0].sizes[1].price,
      quantity: 1,
      engraving: null
    }
  ])
  const [wishlist, setWishlist] = useState([FRAGRANCES[1]])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [quickViewFragrance, setQuickViewFragrance] = useState(null)
  const [toast, setToast] = useState(null)

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.EUR

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 2800)
  }

  const handleAddToCart = (productToAdd) => {
    setCartItems(prev => {
      // Check if identical item exists (matching id, size and engraving)
      const existingIdx = prev.findIndex(item =>
        item.id === productToAdd.id &&
        item.selectedSize?.ml === productToAdd.selectedSize?.ml &&
        JSON.stringify(item.engraving) === JSON.stringify(productToAdd.engraving)
      )

      if (existingIdx > -1) {
        const copy = [...prev]
        copy[existingIdx].quantity += 1
        return copy
      } else {
        return [...prev, { ...productToAdd, quantity: 1 }]
      }
    })
    showToast(`Added "${productToAdd.name}" to your shopping bag`)
  }

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) return
    setCartItems(prev => {
      const copy = [...prev]
      copy[index].quantity = newQty
      return copy
    })
  }

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const handleToggleWishlist = (fragrance) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === fragrance.id)
      if (exists) {
        showToast(`Removed "${fragrance.name}" from your saved list`)
        return prev.filter(item => item.id !== fragrance.id)
      } else {
        showToast(`Saved "${fragrance.name}" to your wishlist`)
        return [...prev, fragrance]
      }
    })
  }

  const handleRemoveFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
  }

  const handleNavigateToEngraving = (fragrance) => {
    setSelectedFragrance(fragrance)
    const element = document.getElementById('engraving-studio')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleExploreClick = () => {
    const element = document.getElementById('flacon-showcase')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="lumiere-app">
      {/* Toast Notification */}
      {toast && (
        <div className="luxury-toast">
          <span className="toast-sparkle">✦</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Main Luxury Navigation */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSelectFragrance={setSelectedFragrance}
        fragrances={FRAGRANCES}
      />

      <main>
        {/* Grand Hero */}
        <Hero
          onOpenQuiz={() => setIsQuizOpen(true)}
          onExploreClick={handleExploreClick}
        />

        {/* Signature Interactive Flacon Showcase (3D / Olfactory Pyramid) */}
        <FragranceShowcase
          fragrances={FRAGRANCES}
          selectedFragrance={selectedFragrance}
          onSelectFragrance={setSelectedFragrance}
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onNavigateToEngraving={handleNavigateToEngraving}
          currency={currency}
          currencySymbol={currencyConfig.symbol}
          currencyRate={currencyConfig.rate}
        />

        {/* Complete Portfolio Catalog */}
        <ProductCatalog
          fragrances={FRAGRANCES}
          onSelectFragrance={setSelectedFragrance}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setQuickViewFragrance}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          currencySymbol={currencyConfig.symbol}
          currencyRate={currencyConfig.rate}
        />

        {/* Bespoke Monogramming & Glass Engraving Atelier */}
        <EngravingStudio
          fragrances={FRAGRANCES}
          initialFragrance={selectedFragrance}
          onAddToCart={handleAddToCart}
          currencySymbol={currencyConfig.symbol}
          currencyRate={currencyConfig.rate}
        />

        {/* Grasse Savoir-Faire & Living Legacy */}
        <HeritageSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currencySymbol={currencyConfig.symbol}
        currencyRate={currencyConfig.rate}
      />

      {/* Fragrance Diagnostic Quiz Modal */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        fragrances={FRAGRANCES}
        onSelectFragrance={setSelectedFragrance}
        onAddToCart={handleAddToCart}
        currencySymbol={currencyConfig.symbol}
        currencyRate={currencyConfig.rate}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        fragrance={quickViewFragrance}
        isOpen={Boolean(quickViewFragrance)}
        onClose={() => setQuickViewFragrance(null)}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        currencySymbol={currencyConfig.symbol}
        currencyRate={currencyConfig.rate}
      />

      {/* Wishlist Drawer Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        currencySymbol={currencyConfig.symbol}
        currencyRate={currencyConfig.rate}
      />
    </div>
  )
}
