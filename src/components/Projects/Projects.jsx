import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../../utils/constants'
import styles from './Projects.module.css'

function Projects() {
  const sectionRef = useRef(null)
  const featuredRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([featuredRef.current, ...gridRef.current.children], { 
          opacity: 1, 
          y: 0,
          filter: 'none',
          scale: 1
        })
        return () => {}
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(featuredRef.current,
          { y: 100, opacity: 0, filter: 'blur(20px)' },
          {
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
            },
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power3.out'
          }
        )

        gsap.fromTo(gridRef.current.children,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            ease: 'power3.out'
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const featured = PROJECTS[0]
  const others = PROJECTS.slice(1)

  return (
    <section id="projetos" ref={sectionRef} className={styles.projects} aria-labelledby="projects-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label} aria-hidden="true">Portfólio</span>
          <h2 id="projects-title" className={styles.title}>Projetos em Destaque</h2>
        </div>
        
        <article ref={featuredRef} className={styles.featured} aria-label={`Projeto em destaque: ${featured.title}`}>
          <a href={featured.url} target="_blank" rel="noopener noreferrer" className={styles.featuredCard}>
            <div className={styles.imageContainer}>
              <div className={styles.imagePlaceholder} aria-hidden="true">01</div>
              <div className={styles.imageOverlay} aria-hidden="true" />
            </div>
            <div className={styles.content}>
              <span className={styles.projectYear}>{featured.year}</span>
              <h3 className={styles.projectTitle}>{featured.title}</h3>
              <p className={styles.projectDescription}>{featured.description}</p>
              <div className={styles.techStack} role="list" aria-label="Tecnologias utilizadas">
                {featured.tech.map((tech) => (
                  <span key={tech} className={styles.techTag} role="listitem">{tech}</span>
                ))}
              </div>
            </div>
          </a>
        </article>
        
        <div ref={gridRef} className={styles.grid} role="list" aria-label="Outros projetos">
          {others.map((project) => (
            <a key={project.id} href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectCard} role="listitem" aria-label={project.title}>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
              </div>
              <div className={styles.techStack} role="list" aria-label="Tecnologias utilizadas">
                {project.tech.map((tech) => (
                  <span key={tech} className={styles.techTag} role="listitem">{tech}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects