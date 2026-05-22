import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

const titleWords = ['Sobre', 'Mim']

function About() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([titleRef.current, contentRef.current, ...statsRef.current.children], { 
          opacity: 1, 
          y: 0,
          filter: 'none'
        })
        return () => {}
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const titleLines = titleRef.current.querySelectorAll(`.${styles.titleLine}`)
        
        gsap.fromTo(titleLines,
          { y: 120, opacity: 0 },
          {
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              end: 'top 35%',
              scrub: 1,
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: 'power4.out'
          }
        )

        const paragraphs = contentRef.current.querySelectorAll(`.${styles.paragraph}`)
        
        gsap.fromTo(paragraphs,
          { y: 60, opacity: 0, filter: 'blur(10px)' },
          {
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1,
            },
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.12,
            ease: 'power3.out'
          }
        )

        gsap.fromTo(statsRef.current.children,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: 'power3.out'
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="sobre" ref={sectionRef} className={styles.about} aria-labelledby="about-title">
      <div className={styles.gradientLeft} aria-hidden="true" />
      <div className={styles.gradientRight} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.grid}>
          <div ref={titleRef} className={styles.header}>
            <span className={styles.label} aria-hidden="true">Introdução</span>
            <h2 id="about-title" className={styles.title}>
              {titleWords.map((word, i) => (
                <span key={i} className={styles.titleLine}>
                  <span className={styles.titleWord}>{word}</span>
                </span>
              ))}
            </h2>
          </div>
          
          <div ref={contentRef} className={styles.content}>
            <div className={styles.textBlock}>
              <p className={styles.paragraph}>
                Estudante de Engenharia de Software atualmente no 3º período, com experiência em desenvolvimento Full Stack e atuação em aplicações mobile com React Native durante estágio na <strong>MedSafe</strong>.
              </p>
              <p className={styles.paragraph}>
                Possuo familiaridade com tecnologias como Java Spring, React, Node.js, PostgreSQL, MySQL e Docker, além de experiência com deploy e infraestrutura utilizando Vercel, Render e Supabase.
              </p>
              <p className={styles.paragraph}>
                Tenho interesse em construir aplicações modernas, performáticas e bem estruturadas, unindo desenvolvimento técnico e boas experiências de usuário.
              </p>
            </div>
            
            <div ref={statsRef} className={styles.statsGrid}>
              <div className={styles.stat} role="article" aria-label="3º Período">
                <div className={styles.statNumber}>3º</div>
                <div className={styles.statLabel}>Período</div>
                <div className={styles.decorLine} aria-hidden="true" />
              </div>
              <div className={styles.stat} role="article" aria-label="Full Stack">
                <div className={styles.statNumber}>FS</div>
                <div className={styles.statLabel}>Full Stack</div>
                <div className={styles.decorLine} aria-hidden="true" />
              </div>
              <div className={styles.stat} role="article" aria-label="MedSafe">
                <div className={styles.statNumber}>MF</div>
                <div className={styles.statLabel}>MedSafe</div>
                <div className={styles.decorLine} aria-hidden="true" />
              </div>
              <div className={styles.stat} role="article" aria-label="6+ Tecnologias">
                <div className={styles.statNumber}>6+</div>
                <div className={styles.statLabel}>Tecnologias</div>
                <div className={styles.decorLine} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About