type PickOneIconProps = {
  size: number
  /** Cantos retos para ícone maskable, que o sistema recorta sozinho. */
  maskable?: boolean
}

/**
 * Marca do Pick One: um fotograma com o número 1.
 * Desenhada só com divs para o gerador de imagem do Next (Satori).
 */
export function PickOneIcon({ size, maskable = false }: PickOneIconProps) {
  const radius = maskable ? 0 : Math.round(size * 0.22)
  const frame = Math.round(size * (maskable ? 0.5 : 0.66))
  const stroke = Math.max(2, Math.round(frame * 0.07))
  const sprocket = Math.max(2, Math.round(frame * 0.11))
  const stem = Math.max(3, Math.round(frame * 0.16))
  const stemH = Math.round(frame * 0.46)

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(145deg, #312e81 0%, #0a0a0f 56%, #6d28d9 128%)',
        borderRadius: radius,
      }}
    >
      <div
        style={{
          width: frame,
          height: frame,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          border: `${stroke}px solid #ffffff`,
          borderRadius: Math.round(frame * 0.16),
          paddingLeft: Math.round(frame * 0.07),
          paddingRight: Math.round(frame * 0.07),
        }}
      >
        <Sprockets size={sprocket} />
        <One stem={stem} height={stemH} />
        <Sprockets size={sprocket} />
      </div>
    </div>
  )
}

function Sprockets({ size }: { size: number }) {
  const gap = Math.max(2, Math.round(size * 0.55))

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            marginTop: i === 0 ? 0 : gap,
            background: '#ffffff',
            borderRadius: Math.max(1, Math.round(size * 0.25)),
          }}
        />
      ))}
    </div>
  )
}

function One({ stem, height }: { stem: number; height: number }) {
  const footH = Math.max(2, Math.round(stem * 0.38))
  const serifW = Math.round(stem * 0.9)
  const serifH = Math.max(2, Math.round(stem * 0.38))

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div
          style={{
            width: serifW,
            height: serifH,
            marginTop: Math.round(stem * 0.06),
            background: '#ffffff',
            borderRadius: stem,
          }}
        />
        <div
          style={{
            width: stem,
            height,
            marginLeft: -Math.round(stem * 0.28),
            background: '#ffffff',
            borderRadius: stem,
          }}
        />
      </div>
      <div
        style={{
          width: Math.round(stem * 2.05),
          height: footH,
          marginTop: -Math.round(footH * 0.45),
          background: '#ffffff',
          borderRadius: stem,
        }}
      />
    </div>
  )
}
