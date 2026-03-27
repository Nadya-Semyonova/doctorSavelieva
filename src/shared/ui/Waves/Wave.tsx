import {
  WaveHero,
  WaveBenefit,
  WaveReviews,
  WaveAddress,
} from '../../../assets/images/IconsSvg/Waves'

const map = {
  hero: WaveHero,
  benefit: WaveBenefit,
  reviews: WaveReviews,
  address: WaveAddress,
} as const

type WaveVariant = keyof typeof map

interface WaveProps {
  variant?: WaveVariant
  className?: string
}

export default function Wave({
  variant = 'hero',
  className,
}: WaveProps) {
  const WaveComponent = map[variant] || WaveHero

  return (
    <div className={className}>
      <WaveComponent />
    </div>
  )
}