import type { Metadata } from 'next'
import Link from 'next/link'

import { ContentShell } from '@/components/content/content-shell'

export const metadata: Metadata = {
  title: 'Termos de uso',
  description:
    'O Pick One indica um filme. Não garante onde assistir, não dá conselho e não substitui ajuda profissional. O CVV 188 é 24 horas e gratuito.',
  alternates: { canonical: '/termos' },
  openGraph: {
    title: 'Termos de uso',
    description:
      'O Pick One indica um filme. Não garante onde assistir, não dá conselho e não substitui ajuda profissional. O CVV 188 é 24 horas e gratuito.',
    url: '/termos',
  },
}

export default function TermosPage() {
  return (
    <ContentShell>
      <article className="flex flex-col gap-8 text-base leading-7 text-white/80">
        <header className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-bold leading-tight text-white">
            Termos de uso
          </h1>
          <p>
            Ao usar o pick-one.app você concorda com o que está nesta página. O
            site é uma indicação de filme a partir do humor, do clima e do tempo
            que você tem. Nada além disso.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">Uso</h2>
          <p>
            Você pode usar o fluxo, ler as páginas de humor e pedir outra
            indicação. Não use o site para sobrecarregar a API, contornar o
            limite de pedidos ou mandar texto cujo único fim seja abusar do
            sistema. O código está sob a licença MIT no repositório. O conteúdo
            dos filmes, os pôsteres e os dados de onde assistir pertencem a quem
            os licencia, não a este site.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            Sem garantia
          </h2>
          <p>
            A indicação é uma sugestão, não uma crítica definitiva e não uma
            promessa de que você vai gostar. Onde assistir muda. Um serviço pode
            sair do ar, o filme pode deixar o catálogo, a sessão de cinema pode
            não existir na sua cidade. Pôster, duração e disponibilidade vêm de
            terceiros e podem falhar. O site é oferecido como está, sem garantia
            de que vai funcionar sem interrupção.
          </p>
          <p>
            Os textos das páginas de humor são opinião editorial. Eles não
            descrevem a sua vida e não dizem o que você deve sentir.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            CVV 188
          </h2>
          <p>
            Em alguns resultados o site mostra o CVV 188. É o Centro de
            Valorização da Vida: ligação gratuita, 24 horas, para quem precisa
            conversar. O aviso existe para o momento estar acessível. Ele não
            substitui ajuda profissional, não é atendimento deste site e não
            significa que um filme vai resolver o que você está vivendo.
          </p>
          <p>
            Se o dia estiver pesado, ligar pode ser o passo certo. O filme pode
            esperar. Mais detalhes de como o site trata dados estão na{' '}
            <Link href="/privacidade">privacidade</Link>.
          </p>
        </section>
      </article>
    </ContentShell>
  )
}
