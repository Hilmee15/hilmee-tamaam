import { disciplines } from '../data.js'
import { useReveal } from '../hooks.js'

export default function About() {
  const headRef = useReveal()
  const discRef = useReveal()
  return (
    <section className="sec wrap" id="about">
      <div className="sec-head rv" ref={headRef}>
        <h2>Two Core Disciplines</h2>
        <p>I focus on two things: building smooth user apps and engineering the backends that power them.</p>
      </div>
      <div className="disc rv" ref={discRef}>
        {disciplines.map((d) => (
          <div key={d.n}>
            <p className="n">{d.n}</p>
            <h3>{d.title}</h3>
            <p>{d.body}</p>
            <div className="tags">
              {d.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
