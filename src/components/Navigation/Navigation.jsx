import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Navigation.module.css'

const menuItems = ['Sobre', 'Skills', 'Projetos', 'Contato']

function Navigation() {
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -100',
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 100) {
          nav.classList.add(styles.scrolled)
        } else if (self.scroll() <= 100) {
          nav.classList.remove(styles.scrolled)
        }
      }
    })

    const mm = gsap.matchMedia()
    
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(nav, { opacity: 1, y: 0 })
      return () => {}
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(nav, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.5 }
      )
    })
  }, [])

  const scrollToSection = (section) => {
    const target = document.getElementById(section.toLowerCase())
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav ref={navRef} className={styles.nav} role="navigation" aria-label="Navegação principal">
      <a href="#" className={styles.logo} aria-label="Lucas Guerra - Início">
        <span aria-hidden="true">LG</span>
      </a>
      <ul className={styles.menu} role="menubar">
        {menuItems.map((item) => (
          <li key={item} role="none">
            <button 
              className={styles.menuItem}
              onClick={() => scrollToSection(item)}
              role="menuitem"
              aria-label={`Navegar para ${item}`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation