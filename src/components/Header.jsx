import { useEffect, useRef, useState } from 'react'
import { EMAIL } from '../data.js'

const LINKS = [
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const barRef = useRef(null)
  const lastY = useRef(0)
  const openRef = useRef(false)

  useEffect(() => { openRef.current = open }, [open])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('menu-open', open)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      root.classList.remove('menu-open')
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    let busy = false
    const onScroll = () => {
      const y = scrollY
      const h = document.documentElement.scrollHeight - innerHeight
      if (barRef.current) barRef.current.style.transform = `scaleX(${h > 0 ? y / h : 0})`
      setHidden(y > lastY.current && y > 240 && !openRef.current)
      lastY.current = y
      busy = false
    }
    const onScrollRaf = () => { if (!busy) { busy = true; requestAnimationFrame(onScroll) } }
    addEventListener('scroll', onScrollRaf, { passive: true })
    return () => removeEventListener('scroll', onScrollRaf)
  }, [])

  return (
    <>
      <div className="bar" ref={barRef} />
      <header className={hidden ? 'head hide' : 'head'}>
        <a className="logo" href="#top">Hilmee Tamaam</a>
        <nav className="nav">
          {LINKS.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <button
          type="button"
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          <i /><i />
        </button>
      </header>
      <div className="menu" id="menu">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="menu-mail" href={`mailto:${EMAIL}`} onClick={() => setOpen(false)}>{EMAIL}</a>
      </div>
    </>
  )
}
