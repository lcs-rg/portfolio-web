import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hero.module.css'

function Hero() {
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const cursorGlowRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(contentRef.current, { opacity: 1 })
        gsap.set([subtitleRef.current, scrollIndicatorRef.current], { opacity: 1 })
        return () => {}
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0 })

        tl.fromTo(contentRef.current, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0,
            duration: 1.2, 
            ease: 'power3.out' 
          }
        )
        .fromTo(subtitleRef.current, 
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8, 
            ease: 'power3.out' 
          }, '-=0.4'
        )
        .fromTo(scrollIndicatorRef.current, 
          { opacity: 0 },
          { 
            opacity: 1,
            duration: 0.6, 
            ease: 'power2.out' 
          }, '-=0.2'
        )

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress
            const scale = 1 + progress * 4
            const blur = progress * 50
            const y = progress * -400
            const opacity = Math.max(0, 1 - progress * 1.2)
            
            gsap.set(nameRef.current, {
              scale: scale,
              filter: `blur(${blur}px)`,
              y: y,
              opacity: opacity
            })
          }
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 2,
          ease: 'power1.out'
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Intro">
      <div className={styles.gradientBg} />
      <div className={styles.noiseOverlay} />
      <div className={styles.gridPattern} />
      
      <div className={`${styles.geometricAccent} ${styles.geo1}`} aria-hidden="true" />
      <div className={`${styles.geometricAccent} ${styles.geo2}`} aria-hidden="true" />
      <div className={`${styles.geometricAccent} ${styles.geo3}`} aria-hidden="true" />
      
      <div ref={cursorGlowRef} className={styles.cursorGlow} aria-hidden="true" />
      
      <div ref={contentRef} className={styles.content}>
        <h1 ref={nameRef} className={styles.name} aria-label="Lucas Guerra">
          Lucas Guerra
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Desenvolvedor Full Stack
        </p>
      </div>
      
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}

export default Hero