/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'

/** Noto Animated Emoji (Google, CC BY 4.0). Estático se prefers-reduced-motion. */
export function Emoji({
  code,
  size = 56,
  className,
}: {
  code: string
  size?: number
  className?: string
}) {
  return (
    <picture>
      <source
        srcSet={`/emoji/${code}.webp`}
        media="(prefers-reduced-motion: no-preference)"
        type="image/webp"
      />
      <img
        src={`/emoji/${code}.svg`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn('select-none', className)}
        style={{ width: size, height: size }}
      />
    </picture>
  )
}
