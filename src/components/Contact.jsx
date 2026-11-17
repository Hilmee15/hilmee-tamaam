import { useState } from 'react'
import { EMAIL } from '../data.js'
import { useReveal } from '../hooks.js'

export default function Contact() {
  const closingRef = useReveal()
  const [copyState, setCopyState] = useState('idle')

  const onCopy = () => {
    const done = (ok) => {
      setCopyState(ok ? 'copied' : 'failed')
      setTimeout(() => setCopyState('idle'), 1800)
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(EMAIL).then(() => done(true), () => done(false))
    } else {
      done(false)
    }
  }

  const copyLabel = copyState === 'copied' ? 'Copied ✓'
    : copyState === 'failed' ? EMAIL
      : 'Copy email'

  return (
    <section className="contact" id="contact">
      <div className="c-grid">
        <div className="closing rv" ref={closingRef}>
          <p className="eyebrow">What's next</p>
          <h2>Have something worth building?</h2>
          <p>Tell me the constraint you're stuck on. That's usually where the interesting work is.</p>
          <div className="btns">
            <a className="btn" href={`mailto:${EMAIL}`}>Get in touch</a>
            <button type="button" className="btn ghost copy-email" onClick={onCopy}>{copyLabel}</button>
          </div>
          <p className="soc">
            <a href="https://github.com/Hilmee15" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/hilmee15" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </p>
        </div>
      </div>
      <footer><span>2026 Ahmad Hilmi Tamaam</span></footer>
    </section>
  )
}
