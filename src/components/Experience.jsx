import { experience } from '../data.js'
import { useReveal } from '../hooks.js'

function ExpItem({ item }) {
  const ref = useReveal()
  return (
    <li className="ex rv" ref={ref}>
      <span className="y">{item.y}</span>
      <h3>{item.title}</h3>
      <p>{item.org}</p>
    </li>
  )
}

export default function Experience() {
  const labelRef = useReveal()
  return (
    <section className="sec" id="experience">
      <p className="label rv" ref={labelRef}>/ Experience</p>
      <ul className="exp">
        {experience.map((item) => <ExpItem key={item.title + item.org} item={item} />)}
      </ul>
    </section>
  )
}
