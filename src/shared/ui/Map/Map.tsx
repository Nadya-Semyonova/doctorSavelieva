import { useState } from 'react'
import styles from './Map.module.css'

interface MapProps {
  src: string
  title?: string
}

export default function Map({ src, title = 'Карта проезда' }: MapProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={styles.wrapper}>
      {!isLoaded && <div className={styles.placeholder}>Загрузка карты…</div>}

      <iframe
        src={src}
        title={title}
        className={styles.map}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        allowFullScreen
      />
    </div>
  )
}