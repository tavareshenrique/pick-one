export const metadata = { title: 'Sem conexão • Pick One' }

export default function Offline() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl">📡</p>
      <h1 className="font-display text-3xl font-bold">Você está offline</h1>
      <p className="max-w-sm text-white/60">
        Precisamos de internet para indicar um filme. Assim que a conexão
        voltar, é só tentar de novo.
      </p>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/"
        className="flex min-h-12 items-center rounded-full bg-white px-6 font-semibold text-neutral-950"
      >
        Tentar de novo
      </a>
    </main>
  )
}
