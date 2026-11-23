import type { Metadata } from 'next'

import { ContentShell } from '@/components/content/content-shell'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Fale com o Henrique sobre o Pick One por e-mail ou pelo GitHub.',
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato',
    description:
      'Fale com o Henrique sobre o Pick One por e-mail ou pelo GitHub.',
    url: '/contato',
  },
}

export default function ContatoPage() {
  return (
    <ContentShell>
      <article className="flex flex-col gap-8 text-base leading-7 text-white/80">
        <header className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-bold leading-tight text-white">
            Contato
          </h1>
          <p>
            O Pick One é um projeto de uma pessoa. Se algo quebrou, se um filme
            veio errado, ou se você quiser falar do site, escreve. Não existe
            suporte com fila nem chat.
          </p>
        </header>
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl font-bold text-white">E-mail</h2>
          <p>
            <a href="mailto:ihenrist@gmail.com">ihenrist@gmail.com</a>
          </p>
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl font-bold text-white">Código</h2>
          <p>
            Problema técnico e ideia de mudança podem ir como issue no{' '}
            <a href="https://github.com/tavareshenrique/pick-one">
              repositório do Pick One
            </a>
            . O perfil é{' '}
            <a href="https://github.com/tavareshenrique">tavareshenrique</a>.
          </p>
        </section>
      </article>
    </ContentShell>
  )
}
