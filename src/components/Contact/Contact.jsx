import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { SOCIAL } from '../../utils/constants'
import styles from './Contact.module.css'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail
}

function Contact() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const socialRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([...containerRef.current.children, ...socialRef.current.children], { 
          opacity: 1, 
          y: 0,
          filter: 'none',
          scale: 1
        })
        return () => {}
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo([...containerRef.current.children],
          { y: 60, opacity: 0, filter: 'blur(10px)' },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1,
            },
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.15,
            ease: 'power3.out'
          }
        )

        gsap.fromTo(socialRef.current.children,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: socialRef.current,
              start: 'top 85%',
              end: 'top 45%',
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
    <section id="contato" ref={sectionRef} className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.gradientTop} aria-hidden="true" />
      <div className={styles.glowLeft} aria-hidden="true" />
      <div className={styles.glowRight} aria-hidden="true" />
      
      <div ref={containerRef} className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label} aria-hidden="true">Encerramento</span>
          <h2 id="contact-title" className={styles.title}>Vamos Criar Algo Incrível Juntos?</h2>
          <p className={styles.subtitle}>
            Estou sempre aberto a novos desafios e colaborações criativas. 
            Se você tem um projeto em mente ou quer simplesmente trocar uma ideia, 
            será um prazer conversar.
          </p>
        </div>
        
        <div className={styles.ctaWrapper}>
          <a 
            href="mailto:lucas@guerra.dev" 
            className={styles.ctaButton}
            aria-label="Enviar email para Lucas Guerra"
          >
            <span>Iniciar Conversa</span>
            <ArrowRight size={20} aria-hidden="true" />
          </a>
        </div>
        
        <nav ref={socialRef} className={styles.social} aria-label="Redes sociais">
          {SOCIAL.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={`Visitar ${item.label}`}
              >
                <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>
      </div>
      
      <footer className={styles.footer} aria-label="Direitos autorais">
        © 2024 Lucas Guerra. Todos os direitos reservados.
      </footer>
    </section>
  )
}

export default Contact