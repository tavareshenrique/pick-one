import type { Metadata } from 'next'

import { ContentShell } from '@/components/content/content-shell'

export const metadata: Metadata = {
  title: 'Privacidade',
  description:
    'O que o Pick One guarda: anúncios não personalizados, analytics, o evento anônimo, o histórico no aparelho, o Turnstile e o texto enviado à IA.',
  alternates: { canonical: '/privacidade' },
  openGraph: {
    title: 'Privacidade',
    description:
      'O que o Pick One guarda: anúncios não personalizados, analytics, o evento anônimo, o histórico no aparelho, o Turnstile e o texto enviado à IA.',
    url: '/privacidade',
  },
}

export default function PrivacidadePage() {
  return (
    <ContentShell>
      <article className="flex flex-col gap-8 text-base leading-7 text-white/80">
        <header className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-bold leading-tight text-white">
            Privacidade
          </h1>
          <p>
            O Pick One não tem conta, senha nem cadastro. Dá para usar o fluxo
            sem dizer quem você é. Esta página descreve o que ainda assim sai do
            aparelho, e o que fica nele.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            Google AdSense
          </h2>
          <p>
            O anúncio aparece só na tela de resultado, depois que um filme está
            pronto. O script do Google AdSense é carregado nesse momento, não na
            abertura do site. Os anúncios são pedidos como não personalizados: o
            site marca{' '}
            <code className="text-white/90">requestNonPersonalizedAds</code>{' '}
            antes do anúncio entrar.
          </p>
          <p>
            Mesmo sem personalização, o Google e os parceiros dele podem usar
            cookies para medir exibição, limitar repetição e evitar fraude. O
            que eles fazem com esses dados está em{' '}
            <a href="https://policies.google.com/technologies/partner-sites">
              Como o Google usa dados quando você visita sites dos nossos
              parceiros
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            Vercel Web Analytics
          </h2>
          <p>
            O site usa o Vercel Web Analytics para contar páginas visitadas.
            Isso não cria um perfil seu aqui e não pede login. Serve para saber
            se o site está sendo usado, não para saber quem é a pessoa do outro
            lado.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            Evento anônimo no Neon
          </h2>
          <p>
            Quando a indicação acontece, o servidor pode gravar um evento num
            banco Neon Postgres. Não entra nome, e-mail nem o IP. Entra um
            identificador de visita, um UUID que nasce na memória da aba e some
            quando você recarrega. Entram também o humor escolhido, se você quis
            manter ou mudar o clima, a duração, o filme mostrado e, se você
            escreveu algo, esse texto.
          </p>
          <p>
            Se o texto for classificado como abuso, ele não é gravado. Sem a
            variável do banco, o evento é descartado e o filme segue do mesmo
            jeito. O IP pode ser usado só para limitar pedidos repetidos, num
            contador separado. Esse limite não vai para o evento do Neon.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            Histórico no aparelho
          </h2>
          <p>
            Os filmes que já apareceram para você ficam no{' '}
            <code className="text-white/90">localStorage</code> deste navegador,
            na chave <code className="text-white/90">pickone:history</code>. São
            só os números dos filmes no TMDB, no máximo sessenta, para a próxima
            indicação não repetir o que você acabou de ver. Isso não é enviado
            como lista permanente para uma conta, porque conta não existe.
            Limpar os dados do site neste navegador apaga o histórico.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            Cloudflare Turnstile
          </h2>
          <p>
            Na hora de pedir um filme, o site pode rodar o Turnstile invisível
            da Cloudflare. É uma verificação para reduzir abuso automatizado,
            não um captcha que você precisa resolver. A Cloudflare processa essa
            checagem. Se ela não passar, a inteligência artificial não é usada
            naquele pedido. O filme ainda pode vir pelo caminho sem IA.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold text-white">
            Texto livre e inteligência artificial
          </h2>
          <p>
            O campo do segundo passo aceita até 200 caracteres. Esse texto vai
            para o servidor junto com o humor e a duração. Ele pode ser lido por
            um modelo da TypeSafe, para entender o tom e barrar abuso, e pelo
            Gemini, do Google, na hora de escrever o motivo do filme. O Gemini
            recebe o texto como dado, junto dos filmes que já foram escolhidos.
            Ele escreve a frase. Não escolhe um título inventado.
          </p>
          <p>
            Texto classificado como abuso não segue para o Gemini e não entra no
            evento do Neon. Você pode usar o site sem escrever nada. O humor e a
            duração bastam.
          </p>
        </section>
      </article>
    </ContentShell>
  )
}
