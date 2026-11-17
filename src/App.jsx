import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  useEffect(() => {
    const raf = requestAnimationFrame(() => document.documentElement.classList.add('ready'))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee
          items={['Flutter', 'Laravel', 'JavaScript', 'Kotlin', 'React', 'Node.js', 'Dart']}
          srText="Flutter, Laravel, JavaScript, Kotlin, React, Node.js, Dart"
        />
        <About />
        <Projects />
        <Experience />
      </main>
      <Contact />
    </>
  )
}
