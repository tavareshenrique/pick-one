import Link from 'next/link'

import { Emoji } from '@/components/emoji'
import { SiteFooter } from '@/components/site-footer'
import { MOODS } from '@/config/moods'
import { getMoodPageById } from '@/content/moods'

export function HomeLibrary() {
  const moods = MOODS.map((mood) => {
    const page = getMoodPageById(mood.id)
    if (!page) throw new Error(`página ausente para ${mood.id}`)
    return { mood, page }
  })

  return (
    <section className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto flex max-w-2xl flex-col gap-10 px-4 py-16">
        <div className="flex flex-col gap-4 text-base leading-7 text-white/80">
          <h2 className="font-display text-3xl font-bold text-white">
            Um filme para o humor de agora
          </h2>
          <p>
            Pick One é um site de um filme só. Você diz como está, se quer
            manter esse clima ou mudar, e quanto tempo tem. A indicação sai
            disso. Não é um catálogo para rolar, nem uma nota de crítica, nem
            uma fila de pôsteres pedindo que você decida sozinho.
          </p>
          <p>
            O filme é de verdade: título, pôster, ano, duração e onde assistir
            no Brasil vêm do TMDB. A inteligência artificial não inventa o
            título. Ela só escreve o motivo, uma frase curta para o momento que
            você descreveu. Se a IA não estiver disponível, a indicação
            continua, pelos gêneros daquele humor.
          </p>
          <p>
            O fluxo aqui em cima ocupa a tela de propósito. Esta parte de baixo
            é para quem chegou querendo ler, ou para quem quer escolher pelo
            texto antes de apertar continuar. Cada humor tem uma página própria,
            com o que costuma funcionar, a diferença entre manter e mudar o
            clima, e uma lista curada.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-base leading-7 text-white/80">
          <h2 className="font-display text-2xl font-bold text-white">
            Como funciona
          </h2>
          <p>
            São quatro passos. No primeiro, você escolhe o que mais se aproxima
            de agora, entre quinze humores. No segundo, decide se quer um filme
            que fique nesse clima ou um que puxe para outro lado. Se quiser,
            escreve um detalhe, em até duzentos caracteres. No terceiro, diz a
            duração: curtinho, padrão, longo, tanto faz, ou um intervalo. No
            quarto, aparece um filme, o motivo, e a opção de pedir outro.
          </p>
          <p>
            O histórico dos títulos que você já viu fica no seu aparelho, para a
            próxima indicação não repetir o que acabou de passar. Quando o
            momento está pesado de verdade, o resultado também mostra o CVV 188.
            O número é uma conversa, 24 horas, de graça. O filme não substitui
            isso.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold">
            Escolha pelo humor
          </h2>
          <ul className="flex flex-col gap-3">
            {moods.map(({ mood, page }) => (
              <li key={mood.id}>
                <Link
                  href={`/humor/${page.slug}`}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Emoji code={mood.emoji} size={40} />
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-lg font-bold">
                      {mood.label}
                    </span>
                    <span className="text-sm leading-6 text-white/70">
                      {page.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <SiteFooter />
    </section>
  )
}
