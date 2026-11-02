import React, { useState } from 'react'
import { Sparkles, X, Check, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react'
import { QUIZ_QUESTIONS } from '../data/fragrances'

export default function ScentQuizModal({
  isOpen,
  onClose,
  fragrances,
  onSelectFragrance,
  onAddToCart,
  currencySymbol,
  currencyRate
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [matchedFragrance, setMatchedFragrance] = useState(null)
  const [matchPercentage, setMatchPercentage] = useState(96)

  if (!isOpen) return null

  const handleSelectOption = (questionId, matchFragranceId) => {
    const updatedAnswers = { ...answers, [questionId]: matchFragranceId }
    setAnswers(updatedAnswers)

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate match
      const counts = {}
      Object.values(updatedAnswers).forEach(id => {
        counts[id] = (counts[id] || 0) + 1
      })
      let topId = 'rouge-noir'
      let maxCount = 0
      Object.entries(counts).forEach(([id, count]) => {
        if (count > maxCount) {
          maxCount = count
          topId = id
        }
      })
      const found = fragrances.find(f => f.id === topId) || fragrances[0]
      setMatchedFragrance(found)
      setMatchPercentage(Math.floor(Math.random() * 5) + 94) // 94-98%
      setCurrentStep(QUIZ_QUESTIONS.length)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setMatchedFragrance(null)
  }

  const currentQ = QUIZ_QUESTIONS[currentStep]

  return (
    <div className="quiz-modal-backdrop" onClick={onClose}>
      <div className="quiz-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="quiz-close-btn" onClick={onClose} aria-label="Close Quiz">
          <X size={20} />
        </button>

        {currentStep < QUIZ_QUESTIONS.length ? (
          <div className="quiz-step-content">
            {/* Progress header */}
            <div className="quiz-progress-bar">
              {QUIZ_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`quiz-progress-pill ${idx <= currentStep ? 'active' : ''}`}
                ></div>
              ))}
            </div>

            <span className="quiz-step-tag">
              <Sparkles size={13} /> STEP 0{currentStep + 1} OF 0{QUIZ_QUESTIONS.length} • LE DIAGNOSTIC
            </span>

            <h3 className="quiz-question-title">{currentQ.title}</h3>
            <p className="quiz-question-subtitle">{currentQ.subtitle}</p>

            <div className="quiz-options-list">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  className="quiz-option-button"
                  onClick={() => handleSelectOption(currentQ.id, opt.match)}
                >
                  <div className="option-bullet">
                    <span>{String.fromCharCode(65 + idx)}</span>
                  </div>
                  <div className="option-copy">
                    <strong>{opt.label}</strong>
                    <span>{opt.desc}</span>
                  </div>
                  <ArrowRight size={18} className="option-arrow" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="quiz-result-content">
            <div className="result-celebration-badge">
              <Sparkles size={16} /> YOUR BESPOKE OLFACTORY MATCH
            </div>

            <div className="affinity-score-badge">
              <span>{matchPercentage}% Olfactory Affinity</span>
            </div>

            <div className="result-flacon-showcase">
              <img
                src={matchedFragrance.image}
                alt={matchedFragrance.name}
                className="result-bottle-thumb"
              />
              <div className="result-details">
                <span className="result-family">{matchedFragrance.family}</span>
                <h3 className="result-name">{matchedFragrance.name}</h3>
                <span className="result-sub">{matchedFragrance.subtitle}</span>
                <p className="result-narrative">{matchedFragrance.description}</p>

                <div className="result-pyramid-peek">
                  <strong>Key Dominant Notes:</strong>
                  <span>
                    {matchedFragrance.pyramid.top[0].note} •{' '}
                    {matchedFragrance.pyramid.heart[0].note} •{' '}
                    {matchedFragrance.pyramid.base[0].note}
                  </span>
                </div>
              </div>
            </div>

            <div className="result-actions">
              <button
                className="btn-add-matched"
                onClick={() => {
                  const defaultSize = matchedFragrance.sizes.find(s => s.default) || matchedFragrance.sizes[0]
                  onAddToCart({
                    ...matchedFragrance,
                    selectedSize: defaultSize,
                    price: defaultSize.price,
                    engraving: null
                  })
                  onClose()
                }}
              >
                <ShoppingBag size={18} />
                <span>
                  Acquire Your Match ({currencySymbol}{Math.round(matchedFragrance.price * currencyRate)})
                </span>
              </button>

              <button
                className="btn-view-matched"
                onClick={() => {
                  onSelectFragrance(matchedFragrance)
                  onClose()
                  document.getElementById('flacon-showcase')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Inspect Flacon & Notes</span>
                <ArrowRight size={16} />
              </button>

              <button className="btn-retake-quiz" onClick={handleReset}>
                <RefreshCw size={14} />
                <span>Retake Diagnostic</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
