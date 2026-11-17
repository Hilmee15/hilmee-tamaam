import { useEffect, useRef, useState } from 'react'

export default function Marquee({ items, srText }) {
  const trackRef = useRef(null)
  const repsRef = useRef(4)
  const [reps, setReps] = useState(4)

  useEffect(() => {
    const track = trackRef.current
    const fill = () => {
      if (!trackRef.current) return
      const one = track.scrollWidth / repsRef.current
      if (one <= 0) return
      const target = Math.max(screen.width, innerWidth) * 1.2
      let need = Math.ceil(target / one)
      if (need % 2) need += 1
      if (need !== repsRef.current) {
        repsRef.current = need
        setReps(need)
      }
    }
    fill()
    document.fonts?.ready.then(fill)
    addEventListener('resize', fill)
    return () => removeEventListener('resize', fill)
  }, [])

  return (
    <>
      <div className="mq" aria-hidden="true">
        <div ref={trackRef}>
          {Array.from({ length: reps }, (_, r) =>
            items.map((item, i) => <span key={`${r}-${i}`}>{item}</span>),
          )}
        </div>
      </div>
      {srText ? <p className="sr-only">{srText}</p> : null}
    </>
  )
}
