import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import CustomCursor from './components/CustomCursor/CustomCursor'
import Navigation from './components/Navigation/Navigation'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'

gsap.registerPlugin(ScrollTrigger)

gsap.matchMedia().add('(prefers-reduced-motion: reduce)', () => {
  ScrollTrigger.getAll().forEach(st => st.kill())
})

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef(null)

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading')
    } else {
      document.body.classList.remove('loading')
    }
  }, [isLoading])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <CustomCursor />
      <main id="main-content" ref={mainRef}>
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App