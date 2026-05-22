import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './LoadingScreen.module.css'

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(`.${styles.loading}`, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => onComplete()
        })
      }
    })

    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100))
      }
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className={styles.loading}>
      <div className={styles.logo}>LG</div>
      <div className={styles.progressWrapper}>
        <div ref={progressRef} className={styles.progressBar} />
        <div className={styles.progressGlow} />
      </div>
      <span className={styles.percentage}>{progress}%</span>
    </div>
  )
}

export default LoadingScreen