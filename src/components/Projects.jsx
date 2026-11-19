import { useRef, useState } from 'react'
import { projects } from '../data.js'
import { finePointer, reducedMotion, useReveal } from '../hooks.js'

const canPreview = finePointer && !reducedMotion

function Label() {
  const ref = useReveal()
  return <p className="label rv" ref={ref}>Selected projects</p>
}

function ProjectRow({ p, onEnter, onLeave }) {
  const ref = useReveal()
  const inner = (
    <>
      <span className="n">{p.n}</span>
      <h3>{p.title}<small>{p.desc}</small></h3>
      <p>{p.stack}</p>
      <span className="y">{p.year}</span>
    </>
  )
  const hoverProps = canPreview
    ? { onMouseEnter: (e) => onEnter(p, e), onMouseLeave: onLeave }
    : {}
  return p.href ? (
    <a ref={ref} className="row rv" href={p.href} target="_blank" rel="noreferrer" {...hoverProps}>
      {inner}
    </a>
  ) : (
    <div ref={ref} className="row rv" {...hoverProps}>{inner}</div>
  )
}

export default function Projects() {
  const [hover, setHover] = useState(null)
  const pvRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const cur = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const runningRef = useRef(false)

  const place = (x, y) => {
    if (pvRef.current) {
      pvRef.current.style.transform = `translate3d(${x + 40}px, ${y - 60}px, 0)`
    }
  }

  const loop = () => {
    cur.current.x += (target.current.x - cur.current.x) * 0.14
    cur.current.y += (target.current.y - cur.current.y) * 0.14
    place(cur.current.x, cur.current.y)
    if (runningRef.current) rafRef.current = requestAnimationFrame(loop)
  }

  const onEnter = (p, e) => {
    setHover(p)
    target.current = { x: e.clientX, y: e.clientY }
    cur.current = { x: e.clientX, y: e.clientY }
    place(e.clientX, e.clientY)
    if (!runningRef.current) {
      runningRef.current = true
      rafRef.current = requestAnimationFrame(loop)
    }
  }

  const onLeave = () => {
    setHover(null)
    runningRef.current = false
    cancelAnimationFrame(rafRef.current)
  }

  const onMove = (e) => {
    target.current = { x: e.clientX, y: e.clientY }
  }

  return (
    <section className="sec" id="projects">
      <Label />
      <div className={hover ? 'list hov' : 'list'} onMouseMove={canPreview ? onMove : undefined}>
        {projects.map((p) => (
          <ProjectRow key={p.n} p={p} onEnter={onEnter} onLeave={onLeave} />
        ))}
      </div>
      <div
        className={hover ? 'pv show' : 'pv'}
        ref={pvRef}
        aria-hidden="true"
        style={{ background: hover?.c || '#e8e8e8' }}
      >
        <img alt="" src={hover?.img || undefined} style={{ display: hover?.img ? 'block' : 'none' }} />
        <span>{hover && !hover.img ? hover.title : ''}</span>
      </div>
    </section>
  )
}
