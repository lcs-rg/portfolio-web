import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layout, Server, Code, Database, Cloud, PenTool } from 'lucide-react'
import { SKILLS } from '../../utils/constants'
import styles from './Skills.module.css'

const iconMap = {
  layout: Layout,
  server: Server,
  code: Code,
  database: Database,
  cloud: Cloud,
  penTool: PenTool
}

function Skills() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(gridRef.current.children, { opacity: 1, y: 0, scale: 1, rotateY: 0 })
        return () => {}
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gridRef.current.children
        
        gsap.fromTo(cards,
          { 
            y: 80, 
            opacity: 0, 
            scale: 0.92,
            rotateY: 10
          },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              end: 'top 25%',
              scrub: 1.2,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            stagger: {
              amount: 0.8,
              from: 'start'
            },
            ease: 'power3.out'
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className={styles.skills} aria-labelledby="skills-title">
      <div className={styles.topGradient} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label} aria-hidden="true">Expertise</span>
          <h2 id="skills-title" className={styles.title}>Skills & Tecnologias</h2>
        </div>
        
        <div ref={gridRef} className={styles.grid} role="list">
          {SKILLS.map((skill) => {
            const Icon = iconMap[skill.icon]
            return (
              <article 
                key={skill.id} 
                className={styles.card}
                role="listitem"
                aria-label={`${skill.title}: ${skill.description}`}
              >
                <div className={styles.iconWrapper} aria-hidden="true">
                  <Icon size={48} strokeWidth={1.25} />
                </div>
                <h3 className={styles.cardTitle}>{skill.title}</h3>
                <p className={styles.cardDescription}>{skill.description}</p>
                <div className={styles.cornerAccent} aria-hidden="true" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills