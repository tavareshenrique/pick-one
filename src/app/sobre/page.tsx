import type { Metadata } from 'next'
import Link from 'next/link'

import { ContentShell } from '@/components/content/content-shell'

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Quem fez o Pick One, por que ele existe, e como a indicação escolhe um filme de verdade antes de escrever o motivo.',
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre',
    description:
      'Quem fez o Pick One, por que ele existe, e como a indicação escolhe um filme de verdade antes de escrever o motivo.',
    url: '/sobre',
  },
}

export default function SobrePage() {
  return (
    <ContentShell>
      <article className="flex flex-col gap-8 text-base leading-7 text-white/80">
        <header className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-bold leading-tight text-white">
            Sobre
          </h1>
          <p>
            Pick One foi feito por Henrique Tavares. A ideia é pequena de
            propósito: um filme, para o humor de agora, no tempo que você tem.
            Não é um serviço de streaming e não guarda uma conta sua.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            Por que existe
          </h2>
          <p>
            Escolher filme virou mais uma tarefa. O catálogo é infinito, a nota
            não diz se aquilo cabe na sua noite, e a pessoa do lado também não
            sabe. O site faz a pergunta ao contrário. Me fala o que sente, me
            fala o que quer sentir, e a indicação sai disso.
          </p>
          <p>
            São quinze humores, de arrasado a extraordinário. Cada um pinta o
            fundo, escolhe gêneros diferentes para manter o clima ou para mudar,
            e decide o quanto a resposta precisa ser cuidadosa. Os textos de
            cada humor estão em <Link href="/humores">Humores</Link>.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            Como a indicação funciona
          </h2>
          <ol className="flex list-decimal flex-col gap-3 pl-5">
            <li>
              Você escolhe o humor, se quer manter ou mudar o clima, um detalhe
              opcional de até 200 caracteres, e a duração.
            </li>
            <li>
              O servidor busca filmes reais no TMDB: lançamentos recentes e
              catálogo, já com duração, pôster e sinopse.
            </li>
            <li>
              Desses candidatos sai um punhado que cabe no seu tempo. O título
              que aparece é um filme que existe. A IA não cria filme.
            </li>
            <li>
              Só então a IA escreve o motivo, uma frase sobre por que aquele
              título combina com o momento. Se o humor pede acolhimento, pode
              entrar também uma mensagem curta de companhia. Se a IA não
              responder, entram frases prontas e a escolha por gêneros. Você
              continua recebendo um filme.
            </li>
            <li>
              No resultado dá para ver onde assistir no Brasil, pedir outro,
              abrir o trailer ou, às vezes, olhar a sessão de cinema.
            </li>
          </ol>
          <p>
            Quando o momento está no peso máximo do humor arrasado, o resultado
            mostra o CVV 188. É 24 horas e gratuito. Um filme não substitui uma
            conversa. Os detalhes de uso estão nos{' '}
            <Link href="/termos">termos</Link>.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            Crédito dos filmes
          </h2>
          <p>
            Este produto usa a API do TMDB, mas não é endossado nem certificado
            pelo TMDB. Pôster, ano, duração, sinopse e onde assistir vêm de lá.
          </p>
          <p>
            O código está no{' '}
            <a href="https://github.com/tavareshenrique/pick-one">GitHub</a>.
            Para escrever, o e-mail está na página de{' '}
            <Link href="/contato">contato</Link>.
          </p>
        </section>
      </article>
    </ContentShell>
  )
}
