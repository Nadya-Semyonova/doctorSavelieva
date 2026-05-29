import {
  WaveHero,
  WaveBenefit,
  WaveLinks,
  WaveAddress,
} from "../../../assets/images/IconsSvg/Waves";

const map = {
  hero: WaveHero,
  benefit: WaveBenefit,
  links: WaveLinks,
  address: WaveAddress,
} as const;

type WaveVariant = keyof typeof map;

interface WaveProps {
  variant?: WaveVariant;
  className?: string;
  compact?: boolean;
}

export default function Wave({ variant = "hero", className }: WaveProps) {
  const WaveComponent = map[variant] || WaveHero;

  return (
    <div className={className}>
      <WaveComponent />
    </div>
  );
}
