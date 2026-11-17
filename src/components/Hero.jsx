export default function Hero() {
  return (
    <section className="hero">
      <p className="meta"><span className="dot" />Undergraduate Computer Science student · Bandung, ID</p>
      <h1>
        <span className="ln"><span style={{ '--d': '.05s' }}>Ahmad Hilmi</span></span>
        <span className="ln"><span style={{ '--d': '.18s' }}>Tamaam<em>.</em></span></span>
      </h1>
      <div className="hero-foot">
        <p>Full-stack &amp; mobile developer. Still learning a lot, but I like seeing an idea end up
          as something real: Flutter Apps, Laravel platforms.</p>
        <div className="btns">
          <a className="btn" href="#projects">See selected work</a>
          <a className="btn ghost" href="Resume/CV.pdf" download="Ahmad_Hilmi_Tamaam_CV.pdf">Download CV</a>
        </div>
      </div>
    </section>
  )
}
