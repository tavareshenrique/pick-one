import { type MoodId, moodIdSchema } from '@/config/moods'

/**
 * Texto das páginas /humor/*. Rascunho na voz do site, para o Henrique
 * revisar e personalizar antes de pedir a revisão do AdSense.
 */
export interface MoodPick {
  tmdbId: number
  why: string
}

export interface MoodPage {
  id: MoodId
  slug: string
  title: string
  description: string
  summary: string
  intro: string
  picks: readonly MoodPick[]
}

const pages = [
  {
    id: 'devastated',
    slug: 'arrasado',
    title: 'Filmes para um dia arrasado',
    description:
      'Quando o peito pesa, o filme certo faz companhia. Nem comédia forçada, nem drama que só empilha desgraça.',
    summary:
      'Dia arrasado pede companhia, não conserto. Drama que fica do lado, ou um calor pequeno quando você quiser sair do fundo. Nada de piada cobrando alegria.',
    intro: [
      'Tem dia em que escolher filme já é trabalho demais. O peito chega na frente. A tela cheia de pôsteres vira mais uma coisa pedindo decisão, e decisão é exatamente o que não sobra. Arrasado não precisa de um discurso sobre superação. Precisa de uma história que sente o tamanho da sala e fica. Companhia, não conserto.',
      'O que costuma funcionar é gente inteira na tela. Família complicada, luto que não vira lição de cartaz, amizade que não cabe num slogan. O ritmo pode ser lento, desde que a cena tenha alguém dentro. Uma risada pequena, daquelas que escapam sem pedido, vale mais do que um número musical exigindo ânimo. Animação também cabe, quando trata perda como parte da casa e não como vilão que precisa ser derrotado até os créditos.',
      'Manter o clima, aqui, é deixar o filme ficar triste com você. Um pai e uma filha num verão curto. Um homem que não sabe o que fazer com as mãos depois de uma morte. Um adeus que a família ainda não combinou como contar. Você não deve nada a um final redentor. Duas horas podem ser só o tempo de não estar sozinho com a coisa.',
      'Mudar o clima é outra escolha, e ela não é fuga vergonhosa. É pedir uma mesa posta, um casaco azul, uma cidade que ainda tem padaria. O deslocamento bom, nesse ponto, é calor. Não é piada às custas de quem sofre, nem perseguição de carro para tapar o buraco com barulho. Se a comédia só funciona quando você já está leve, ela pode esperar outro dia.',
      'Eu evitaria filme que usa violência contra alguém vulnerável como reviravolta de efeito, e final que humilha o personagem para parecer profundo. Também evitaria maratona. Um filme. Se não servir, pede outro, em vez de abrir cinco abas e se sentir ainda mais incapaz. Quando o momento está nesse peso, o Pick One mostra o CVV 188 junto da indicação: 24 horas, de graça. Um filme não substitui essa conversa. Ele só senta do lado enquanto a noite passa.',
      'A lista abaixo mistura os dois caminhos, e cada frase diz por que aquele título serve para arrasado, não para a prateleira genérica de drama. Se quiser um só, no tempo que você tem agora, o botão no fim volta ao fluxo com esse humor marcado. Manter ou mudar continua sendo uma decisão sua. Ela muda o filme.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 965150,
        why: 'Aftersun fica num verão entre pai e filha sem explicar o buraco. Serve quando você precisa que alguém aguente o silêncio junto.',
      },
      {
        tmdbId: 334541,
        why: 'Manchester à Beira-Mar não oferece conserto. O luto ocupa a casa, e o filme aceita ficar nessa casa com você.',
      },
      {
        tmdbId: 565310,
        why: 'A Despedida é uma família inteira representando normalidade em volta de uma notícia. O carinho está na mentira combinada, não num discurso.',
      },
      {
        tmdbId: 354912,
        why: 'Viva trata morte como memória que ainda canta. Dá para chorar sem se sentir empurrado para um final motivacional.',
      },
      {
        tmdbId: 773,
        why: 'Pequena Miss Sunshine é uma van de gente falhada indo a um concurso ridículo. A risada vem do cansaço compartilhado, não de uma lição.',
      },
      {
        tmdbId: 77338,
        why: 'Intocáveis aquece sem fingir que a cadeira de rodas sumiu. A amizade é prática: carro, piada, presença.',
      },
      {
        tmdbId: 194,
        why: 'Amélie organiza a cidade em pequenos gestos. Quando mudar o clima significa querer delicadeza, e não euforia, ela cabe.',
      },
      {
        tmdbId: 346648,
        why: 'Paddington 2 acredita que gentileza dá trabalho e mesmo assim vale. É calor de verdade, não piada pedindo para você melhorar.',
      },
      {
        tmdbId: 14160,
        why: 'Up começa com uma vida inteira e depois sai de casa. A aventura só funciona porque o filme não apaga a perda que veio antes.',
      },
    ],
  },
  {
    id: 'sad',
    slug: 'triste',
    title: 'Filmes para um dia triste',
    description:
      'Tristeza menor que um desabamento ainda pede filme com gente, chuva e conversa. Sem cobrança para animar.',
    summary:
      'Triste não é o mesmo que arrasado. Cabe romance quieto, cidade à noite e filme em que duas pessoas se escutam. A risada, se vier, vem sem ordem.',
    intro: [
      'Triste é menor que arrasado e mesmo assim ocupa a tarde. Não é um colapso com nome. É o dia cinza, a mensagem que não veio, a saudade sem evento claro para apontar. Nesse tamanho, filme bombástico costuma errar o alvo. Ou passa longe, ou aumenta o volume de um sentimento que já estava no tamanho certo.',
      'O que costuma funcionar é conversa, cidade e tempo. Duas pessoas andando, um quarto de hotel com jet lag, um amor que já acabou e continua educado. A câmera perto do rosto ajuda mais do que o espetáculo. Você acompanha alguém sentindo uma coisa parecida, sem precisar se identificar com uma tragédia maior que a sua. A escala importa. Tristeza de terça não pede épico de guerra.',
      'Manter o clima é escolher o filme que também está um pouco molhado. Memória que apaga, voz que fala com um sistema operacional, um reencontro em que o assunto é o que não foi dito da primeira vez. Esses filmes não resolvem a tristeza. Eles dão a ela um sofá e uma trilha que não tem pressa. Dá para chorar no meio, voltar, perder um diálogo e continuar. Nada disso quebra a sessão.',
      'Mudar o clima, quando a tristeza já durou o bastante para você querer ar, não precisa ser uma comédia de gritaria. Um filme de tempo bem usado, uma família que briga e ainda se ama, uma história em que o futuro aparece sem fanfarra. O erro é pular direto para o pastelão e se sentir ainda mais distante, porque a sala inteira está rindo e você não. O deslocamento bom é um grau acima, não dez.',
      'Eu evitaria vingança como substituto de tristeza, plot twist que transforma dor em pegadinha, e qualquer filme cujo marketing promete que você vai sair renovado. Também evitaria abrir o aplicativo de notas para registrar o que sente enquanto o filme passa. A sessão pode ser só a sessão. Se quiser escrever alguma coisa no Pick One, são até duzentos caracteres, um detalhe, não um diário.',
      'Os títulos abaixo servem para esse meio-termo. Uns ficam na melancolia com educação. Outros abrem a janela sem acender todas as luzes. A frase de cada um é o motivo de estar nesta página, e não numa lista de melhores romances da década. O botão no fim marca Triste no fluxo, e você ainda escolhe se quer manter o cinza ou clarear um pouco.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 38,
        why: 'Brilho Eterno trata memória de um amor como algo que dói e mesmo assim você não quer entregar. A tristeza aqui tem humor, sem virar piada.',
      },
      {
        tmdbId: 152601,
        why: 'Ela é uma voz no ouvido num apartamento vazio. Serve quando a tristeza é solidão mansa, não um acontecimento.',
      },
      {
        tmdbId: 153,
        why: 'Encontros e Desencontros passa numa cidade que não é a sua, com jet lag e pouca obrigação. A conversa basta.',
      },
      {
        tmdbId: 76,
        why: 'Antes do Amanhecer é uma noite inteira de fala. Para tristeza que quer companhia de ideia, não de espetáculo.',
      },
      {
        tmdbId: 80,
        why: 'Antes do Pôr do Sol é o reencontro, anos depois, no que não foi dito. Mantém o clima sem reabrir a ferida por esporte.',
      },
      {
        tmdbId: 398818,
        why: 'Me Chame Pelo Seu Nome deixa o verão acabar. A tristeza é de algo que foi bonito e teve data, não de um erro a corrigir.',
      },
      {
        tmdbId: 391713,
        why: 'Lady Bird é mãe, filha e uma cidade pequena. A briga é amor mal embalado, e isso cabe num dia triste sem ser devastador.',
      },
      {
        tmdbId: 666277,
        why: 'Vidas Passadas é o que teria sido, dito com calma. Saudade adulta, sem vilão e sem pedido para esquecer.',
      },
      {
        tmdbId: 531428,
        why: 'Retrato de uma Jovem em Chamas olha devagar. A tristeza mora no olhar que sabe que o tempo daquela ilha vai acabar.',
      },
      {
        tmdbId: 122906,
        why: 'Questão de Tempo usa o relógio para falar de pai, de casa e de presença. Clareia o dia sem apagar o que doía.',
      },
    ],
  },
  {
    id: 'anxious',
    slug: 'ansioso',
    title: 'Filmes para quando a ansiedade não desliga',
    description:
      'Cabeça acelerada pede filme com regra clara ou uma saída mansa. Sem susto gratuito e sem maratona de abas.',
    summary:
      'Ansiedade na hora de escolher filme é mais uma tarefa. Funciona história com regra visível, ou uma saída gentil quando você quiser que o corpo desça o volume.',
    intro: [
      'Ansiedade na hora do filme é um problema meio cruel. A cabeça já está adiantada, listando o que pode dar errado amanhã, e o catálogo pede uma decisão agora. Rolar pôster vira tarefa. O título certo, nesse estado, não é o mais famoso da semana. É o que ocupa a atenção sem pedir que você administre mais nada além de ficar sentado.',
      'O que costuma funcionar é previsibilidade de regra, não de tédio. Alguém investiga, cozinha, conserta, atravessa uma cidade com um objetivo que você entende. A mente acelerada gosta de ter o que fazer, mesmo que as mãos só segurem o controle. Animação bem desenhada também organiza o mundo antes de você entrar: cor, música, problema no tamanho de uma tarde. Drama em que todo mundo grita o que sente costuma sobrar.',
      'Manter o clima não significa procurar um filme sobre ansiedade. Significa dar à aceleração um lugar com começo, meio e fim. Um mistério longo, em que a tensão mora numa mesa de arquivos. Uma chegada que transforma pânico em problema de linguagem. Isso é diferente de terror que dispara susto sem aviso. O susto solto não organiza. Ele só confirma para o corpo que havia motivo para estar ligado.',
      'Mudar o clima é sair dessa aceleração de propósito. Comédia de bom coração, urso educado, floresta com criatura grande e mansa, aventura em que ninguém é humilhado por ser desajeitado. Os dois caminhos existem no fluxo do site. O que não funciona é misturá-los sem querer: abrir um filme pesado achando que vai relaxar e terminar mais acordado do que começou, com o coração na garganta e a sensação de que a noite piorou.',
      'Eu evitaria plot twist cruel só para chocar, violência que chega sem função, e maratona. Um filme só. A pilha de abas é parente dessa pressa, não o remédio. Também evitaria história em que o relógio da trama é o seu relógio: contagem regressiva, pessoa presa, criança em perigo o tempo todo. Tem gente que usa isso como descarga. Em dia ansioso, muita gente só sai mais cansada e igualmente ligada.',
      'A lista não é ranking nem obrigação. São filmes com um motivo concreto para este humor: ou a atenção ganha uma tarefa clara, ou o ruído troca de textura. A frase embaixo de cada título é esse motivo. O botão marca Ansioso e devolve você aos quatro passos. Duração continua valendo. Se você só tem oitenta minutos de cabeça, não faz sentido começar um épico de três horas para se sentir ainda mais atrasado.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 329865,
        why: 'A Chegada transforma o medo de não entender em trabalho de escuta. A tensão existe, mas ela tem método e um relógio que você acompanha.',
      },
      {
        tmdbId: 1949,
        why: 'Zodíaco é investigação longa, quase um ofício. A ansiedade senta numa mesa e mexe com papel, em vez de estourar em susto.',
      },
      {
        tmdbId: 508442,
        why: 'Soul trata a pressa de viver como o próprio problema. Muda o clima sem pedir que você finja que está tudo resolvido.',
      },
      {
        tmdbId: 10681,
        why: 'WALL-E quase não fala e mesmo assim conduz. O mundo é claro, o robô tem uma tarefa, e a tarde desce o volume.',
      },
      {
        tmdbId: 120467,
        why: 'O Grande Hotel Budapeste é simétrico de propósito. Cor, porta e plano combinam, e essa ordem acalma uma cabeça bagunçada.',
      },
      {
        tmdbId: 346648,
        why: 'Paddington 2 é gentileza com regra de convivência. Dá para prever o tom, e prever o tom já é um descanso.',
      },
      {
        tmdbId: 8392,
        why: 'Meu Amigo Totoro não tem vilão perseguindo ninguém. A floresta é grande e a ameaça, quando existe, não é cruel.',
      },
      {
        tmdbId: 150540,
        why: 'Divertida Mente dá nome ao alvoroço sem aula de autoajuda. A sede da cabeça vira cenário, e isso basta.',
      },
      {
        tmdbId: 116745,
        why: 'A Vida Secreta de Walter Mitty sai do cubículo para um cartão-postal de verdade. É a opção de mudar o clima por movimento, não por grito.',
      },
      {
        tmdbId: 371645,
        why: 'Fuga para o mato com um tio ranzinza e um garoto. Aventura com humor seco, sem humilhar nenhum dos dois.',
      },
    ],
  },
  {
    id: 'stressed',
    slug: 'estressado',
    title: 'Filmes para descarregar o estresse',
    description:
      'Estresse quer fim de tarefa: alguém competente resolvendo um problema, ou uma comédia que termina o serviço no seu lugar.',
    summary:
      'Cabeça cheia pede filme que termina uma tarefa. Ação com ofício claro, cozinha, ou comédia em que o caos tem regra. Barulho sem propósito só aumenta o dia.',
    intro: [
      'Estresse não é tristeza e não é tédio. É a sensação de que o dia ainda não acabou, mesmo com você já no sofá. O corpo quer um fim. Por isso catálogo infinito irrita tanto: é mais uma lista aberta. O filme útil, aqui, é o que se comporta como uma tarefa concluída. Alguém entra, faz o trabalho, sai. Você acompanha até o crédito e a conta do dia fecha junto.',
      'Manter o clima pode ser descarga, não mais pressão. Ação funciona quando o herói é competente e o problema é visível: um prédio, uma perseguição, um inimigo que não é a sua caixa de e-mail. O prazer está em ver habilidade, não em ver sofrimento prolongado. Comédia de polícia absurda também mantém a energia e ainda ri da própria seriedade. O que não serve é filme em que todo mundo é incompetente e a câmera só grita. Isso parece plantão, não sessão.',
      'Mudar o clima é trocar a meta do dia. Cozinha, banda de escola, bruxa mirim fazendo entrega, floresta sem prazo. O estresse abaixa quando a história tem cheiro, música ou uma regra de jogo que não é a do trabalho. Você não precisa de uma trama sobre burnout. Precisa de um mundo em que o problema cabe numa panela ou num ensaio, e acaba.',
      'A diferença entre os dois caminhos é o que você faz com a carga. Manter é gastar. Mudar é pousar. Os dois são honestos. O erro comum é escolher um drama corporativo achando que vai se sentir visto, e sair mais irritado porque o filme só confirmou a semana. Outro erro é abrir um terror lento com a cabeça já latejando. Medo sem convite vira mais um alarme.',
      'Eu evitaria franquia no meio, daquelas que exigem três filmes anteriores para a piada funcionar. Evitaria também reunião filmada: gente sentada explicando política interna por duas horas, a menos que a piada seja justamente essa reunião. E evitaria velocidade pela velocidade. Corte a cada dois segundos cansa um sistema nervoso que já veio cansado. Ritmo não é a mesma coisa que pressa.',
      'A lista separa descarga e pouso sem transformar isso num manual. Cada frase diz o serviço que aquele filme faz nesta noite. Se quiser que o site escolha um, com a duração que ainda cabe antes de dormir, o botão marca Estressado. Você segue para o passo do clima e decide se a noite vai gastar a carga ou guardar a faca.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 562,
        why: 'Duro de Matar é um prédio, um problema e um cara competente. O estresse vira tarefa com fim, não uma semana sem borda.',
      },
      {
        tmdbId: 245891,
        why: 'John Wick trata vingança como ofício: corredor, regra, consequência. Serve para gastar a carga, não para pensar na segunda-feira.',
      },
      {
        tmdbId: 4638,
        why: 'Chumbo Grosso, o Hot Fuzz, é ação que ri da própria obsessão por dever. A energia fica, a seriedade do dia não.',
      },
      {
        tmdbId: 290250,
        why: 'Dois Caras Legais junta detetive cansado e caso enrolado. A química faz o trabalho de desarmar a noite.',
      },
      {
        tmdbId: 339403,
        why: 'Em Ritmo de Fuga sincroniza fuga e música. O estresse vira coreografia, e coreografia acaba na última faixa.',
      },
      {
        tmdbId: 2062,
        why: 'Ratatouille muda o clima pela cozinha. O problema é um prato, o prazo é o serviço, e ninguém te cobra planilha.',
      },
      {
        tmdbId: 212778,
        why: 'Chef larga o restaurante estrela e volta para o caminhão. É um filme sobre fazer uma coisa bem feita e ir para a próxima cidade.',
      },
      {
        tmdbId: 1584,
        why: 'Escola de Rock é ensaio, palco e um adulto que finalmente termina um show. A bagunça tem apresentação no fim.',
      },
      {
        tmdbId: 16859,
        why: 'O Serviço de Entregas da Kiki é trabalho de primeiro emprego, com vassoura e padaria. O estresse aqui é pequeno e cabe na tarde.',
      },
      {
        tmdbId: 8392,
        why: 'Meu Amigo Totoro não tem meta de produtividade. Se a escolha for pousar, a floresta não pede relatório.',
      },
    ],
  },
  {
    id: 'tired',
    slug: 'cansado',
    title: 'Filmes para quando você está cansado demais para escolher',
    description:
      'Cansaço pede filme fácil de acompanhar, com coração claro e pouca lição de casa. Sem trama que pune um piscar de olho.',
    summary:
      'Olho pesado não combina com filme que castiga distração. Paddington, conto de fadas e animação mansa deixam você perder uma fala e continuar.',
    intro: [
      'Cansado é quando o corpo já votou e a cabeça ainda finge que vai escolher com critério. Você abre o catálogo, lê três sinopses e esquece a primeira. O filme certo, nesse estado, perdoa. Se você piscar longo, a história continua compreensível. Se você rir baixo, ninguém na tela exige que você prove que entendeu o símbolo.',
      'O que costuma funcionar é conto com coração na manga. Urso de casaco, princesa que narra a própria aventura, robô que não fala, bruxa criança, cozinha, amizade entre um milionário e o cuidador. A premissa cabe numa frase, e o filme honra essa frase em vez de traí-la no terceiro ato para parecer adulto. Adulto, aqui, seria respeitar que você está moído. Não seria escurecer o desenho sem motivo.',
      'Manter o clima significa ficar no leve de propósito. Comédia mansa, família, animação que não transforma o descanso em montanha-russa de piada moderna a cada vinte segundos. Você pode tricotar, comer, deixar o filme ocupar a sala como uma lâmpada boa. Isso é uso legítimo de cinema. Nem toda sessão precisa te deixar diferente. Algumas só precisam te deixar inteiro até a hora de apagar a luz.',
      'Mudar o clima, para quem está cansado, não é pedir um thriller para acordar. Acordar à força costuma dar errado: você termina ligado e ainda sem sono. Mudar, quando funciona, é uma aventura curta, com mapa claro, que puxa o interesse sem puxar o cortisol. Se no passo seguinte você escolher mudar, o site tende a aventura e ação arejadas, não a um plantão de hospital filmado em câmera na mão.',
      'Eu evitaria filme com legenda densa e política interna complicada, a menos que você esteja cansado só do corpo e a cabeça ainda queira trabalho. Evitaria também terror, trama de golpe com quinze nomes, e qualquer coisa que castigue a distração. Se perder um diálogo significa não entender o final, guarde para outro dia. E evitaria episódio piloto de série disfarçado de filme. Cansaço quer fim, não gancho para a próxima temporada.',
      'Os títulos desta página foram escolhidos porque dá para entrar tarde e ainda ser bem recebido. A frase de cada um diz o tipo de descanso que ele oferece, porque descanso também tem textura: doçura, piada seca, viagem, silêncio. O botão marca Cansado. No passo da duração, curto é um amigo. Não há medalha para quem termina um filme de três horas com o olho fechado na última meia hora.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 346648,
        why: 'Paddington 2 é educado com quem está cansado. A bondade é o enredo, e você pode perder uma cena sem se perder.',
      },
      {
        tmdbId: 2493,
        why: 'A Princesa Prometida avisa o tom na narração. Conto, esgrima e piada no tamanho certo para um olho pesado.',
      },
      {
        tmdbId: 8392,
        why: 'Meu Amigo Totoro tem o ritmo de uma tarde quente. Não pune quem cochila cinco minutos no meio.',
      },
      {
        tmdbId: 12429,
        why: 'Ponyo é mar, criança e uma amizade simples. A imagem faz o trabalho, e a cabeça pode descansar da trama.',
      },
      {
        tmdbId: 194,
        why: 'Amélie é Paris em pequenos favores. Leve, desenhado, e fácil de retomar se você foi buscar água.',
      },
      {
        tmdbId: 212778,
        why: 'Chef tem comida, estrada e pouca maldade. O cansaço encontra uma tarefa gostosa de ver até o fim.',
      },
      {
        tmdbId: 77338,
        why: 'Intocáveis é amizade em voz alta, com piada clara. Você ri sem precisar montar um quebra-cabeça.',
      },
      {
        tmdbId: 872,
        why: 'Cantando na Chuva é cor, ensaio e música. O prazer está na superfície, e a superfície aqui é o ponto.',
      },
      {
        tmdbId: 16859,
        why: 'Kiki chega numa cidade nova e abre uma entrega. O conflito é do tamanho de um primeiro emprego, não de um apocalipse.',
      },
      {
        tmdbId: 869626,
        why: 'Marcel, a Concha de Sapatos, fala baixo e mostra uma casa por detalhes. Companhia minúscula para uma noite sem energia.',
      },
    ],
  },
  {
    id: 'bored',
    slug: 'entediado',
    title: 'Filmes para quando você está entediado de verdade',
    description:
      'Tédio pede filme com atrito: invenção, ritmo e uma ideia que não cabe no pôster. Calmaria é para outro humor.',
    summary:
      'Entediado não quer mais do mesmo. Quer filme que vira a mesa nos primeiros minutos e sustenta o truque até o fim, com ofício visível.',
    intro: [
      'Tédio de catálogo é diferente de cansaço. O olho está aberto. O problema é que tudo parece pré-mastigado: herói, trailer, lição, pós-crédito. Você não precisa de um filme fácil. Precisa de um filme que te trate como alguém capaz de acompanhar uma ideia. Se a escolha for mansa demais, o tédio só troca de sofá.',
      'O que costuma funcionar é ofício à mostra. Montagem que você percebe, câmera com opinião, piada que demora o tempo certo, ação desenhada em vez de ação embolada. Pode ser um suspense de casa rica, uma perseguição no deserto, um desenho que quebra o próprio quadrinho, um hotel cor-de-rosa operando como relógio. O assunto importa menos do que a sensação de que alguém fez aquilo com a mão, e não com um comitê com medo de te entediar.',
      'Manter o clima, para entediado, parece contraditório, mas não é. Significa ficar no estado de quem quer estímulo e escolher comédia, aventura, ficção ou mistério que realmente estimulam. Não é escolher um drama morno porque a sinopse usa a palavra inesperado. Inesperado de pôster quase nunca é. Inesperado de filme é uma cena que você não conseguiria prever a partir do cartaz, e que ainda assim pertence àquela história.',
      'Mudar o clima empurra para ação, suspense e fantasia com mais volume. Vale quando o tédio já virou inquietação no corpo e você quer ser carregado. O risco é confundir barulho com interesse. Explosão sem geografia, perseguição sem motivo, piada de referência a cada frase: isso enche o minuto e esvazia a hora. No fim você lembra do barulho e não lembra por que alguém atravessou a sala.',
      'Eu evitaria continuação no quinto capítulo se você não está a fim de dever de casa. Evitaria também biografia que confunde duração com importância, e filme cujo principal argumento é ser baseado em fatos reais. Fato real não é ritmo. E evitaria abrir o celular na primeira cena lenta. Alguns dos melhores remédios para tédio começam quietos e armam a mesa. Se você fugir no silêncio inicial, volta para a mesma grade de sempre.',
      'Cada título abaixo está aqui por um truque concreto, dito na frase: estrutura, perseguição, diálogo, desenho, humor de gênero. Não é uma lista dos mais elogiados do século. É uma lista para uma noite em que você se recusa a assistir no piloto automático. O botão marca Entediado. Se quiser, escreve o que já tentou e não funcionou. Esse detalhe ajuda mais do que mais meia hora rolando capa.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 545611,
        why: 'Tudo em Todo o Lugar ao Mesmo Tempo transforma tédio de declaração de imposto num universo inteiro. A invenção não para para explicar a piada.',
      },
      {
        tmdbId: 496243,
        why: 'Parasita muda de filme no meio sem pedir licença. O tédio não sobrevive à planta daquela casa.',
      },
      {
        tmdbId: 244786,
        why: 'Whiplash é ensaio como confronto. O tédio leva tapa de metrônomo, e a cena não te deixa checar o celular.',
      },
      {
        tmdbId: 76341,
        why: 'Mad Max: Estrada da Fúria é perseguição com geografia. Você entende onde está cada caminhão, e por isso o barulho interessa.',
      },
      {
        tmdbId: 324857,
        why: 'Homem-Aranha no Aranhaverso desenha como gibi em movimento. Mesmo quem já viu herói demais encontra outra textura.',
      },
      {
        tmdbId: 546554,
        why: 'Entre Facas e Segredos é mistério de elenco grande que brinca com a própria sala. A trama prende porque a conversa é afiada.',
      },
      {
        tmdbId: 339403,
        why: 'Em Ritmo de Fuga corta a fuga no compasso da música. Estímulo com regra, não só carro batendo.',
      },
      {
        tmdbId: 120467,
        why: 'O Grande Hotel Budapeste é comédia de precisão. Cada plano parece feito para quem estava entediado de filme sem opinião visual.',
      },
      {
        tmdbId: 4638,
        why: 'Chumbo Grosso ama filme de ação o bastante para rir dele e ainda entregar a perseguição. Gênero com cérebro.',
      },
      {
        tmdbId: 16869,
        why: 'Bastardos Inglórios é papo tenso em mesa e só depois o espetáculo. O tédio morre na primeira conversa de bar.',
      },
    ],
  },
  {
    id: 'lonely',
    slug: 'solitario',
    title: 'Filmes para uma noite solitária',
    description:
      'Solidão pede filme com uma pessoa e uma cidade, ou duas vozes numa mesa. Multidão rindo alto pode piorar a sala.',
    summary:
      'Noite solitária combina com voz baixa, cidade estranha e amizade concreta. Comédia de turma grande às vezes deixa a sala ainda mais vazia.',
    intro: [
      'Solitário não é a mesma coisa que triste, embora os dois se visitem. Solitário é a sala grande demais para uma pessoa, o fone sem ninguém do outro lado, a vontade de ouvir voz humana sem ter que sustentar uma conversa inteira. Filme, nesse caso, é visita. Alguns visitas enchem a casa. Outras fazem você perceber ainda mais que está só, e isso não é falha sua. É escolha de elenco.',
      'O que costuma funcionar é pouca gente e muita presença. Um motorista de ônibus com a mesma rota. Um poeta que escreve o que viu no dia. Duas pessoas dividindo uma refeição sem declarar o que aquilo significa. Uma amizade que se mede em tarefa: buscar, cozinhar, sentar. A cidade pode ser Tóquio, Paris, Los Angeles, Mumbai. O que importa é alguém atravessando o dia com um hábito, porque hábito é o que a solidão estranha. Ver hábito na tela devolve um ritmo.',
      'Manter o clima é aceitar a sala quieta e pôr um filme que também é quieto. Não para afundar. Para não mentir. Ela, Encontros e Desencontros, Paterson: ninguém finge que companhia é simples. A voz, a estrangeira, o poema curto. Você fica com eles sem plateia. Isso pode doer um pouco e ainda assim ser o certo, porque a alternativa é uma comédia de festa em que todo mundo se abraça e a sua sala fica mais vazia no silêncio depois da risada gravada.',
      'Mudar o clima é chamar uma visita mais quente. Amizade em voz alta, comida, um filme em que as pessoas se escolhem de propósito no meio de uma vida comum. O calor precisa ser específico. Declaração genérica de que os amigos são a família não aquece ninguém. Aquece ver o sanduíche sendo embrulhado, a carona, a piada interna que demorou meses para existir. Se o filme só tem a frase e não tem o gesto, ele não muda o clima. Ele faz um discurso.',
      'Eu evitaria épico de guerra, terror de isolamento que transforma solidão em punição, e reality de humilhação. Também evitaria romance em que a pessoa sozinha é o problema a ser corrigido até o casamento. Você não está incompleto por estar numa noite só. Está numa noite só. O filme pode fazer companhia sem te tratar como um caso a resolver antes dos créditos.',
      'As frases abaixo dizem que tipo de companhia cada título oferece: voz, rota, mesa, cidade, risada de dois. Escolhe pela visita que você aguenta hoje. O botão marca Solitário e te devolve ao fluxo, onde ainda dá para manter a quietude ou pedir calor. As duas coisas são uma noite válida. Nenhuma das duas precisa ser explicada para ninguém.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 152601,
        why: 'Ela põe uma voz no apartamento. A solidão ganha conversa sem ganhar uma multidão, e o filme não trata isso como fraqueza.',
      },
      {
        tmdbId: 153,
        why: 'Encontros e Desencontros é duas pessoas sem sono numa cidade estrangeira. Companhia de insônia, no tamanho certo.',
      },
      {
        tmdbId: 370755,
        why: 'Paterson passa os dias de um motorista que escreve poema. O hábito vira companhia, e a solidão deixa de ser só ausência.',
      },
      {
        tmdbId: 976893,
        why: 'Dias Perfeitos segue a rota de um homem em Tóquio. Banheiro público, fita cassete, luz na árvore. A repetição acolhe.',
      },
      {
        tmdbId: 191714,
        why: 'A Lancheira é uma marmita viajando de uma cozinha até um escritório. Cuidado concreto, sem discurso sobre conexão humana.',
      },
      {
        tmdbId: 77338,
        why: 'Intocáveis é a visita que chega e não vai embora no primeiro constrangimento. Muda o clima com presença, não com frase.',
      },
      {
        tmdbId: 212778,
        why: 'Chef enche a tela de gente que trabalha junta e come junto. A solidão cede para um balcão, se for isso que você quer hoje.',
      },
      {
        tmdbId: 194,
        why: 'Amélie pratica pequenos encontros pela cidade. Cada gesto é uma ponte curta, boa para quem não quer uma festa.',
      },
      {
        tmdbId: 122906,
        why: 'Questão de Tempo insiste em estar presente no almoço de família. É calor de casa, com a tristeza ainda sentada à mesa.',
      },
      {
        tmdbId: 121986,
        why: 'Frances Ha é uma amiga, um sofá emprestado e uma cidade cara. A solidão de adulta jovem, sem transformar isso em tese.',
      },
    ],
  },
  {
    id: 'normal',
    slug: 'normal',
    title: 'Filmes para um dia normal',
    description:
      'Dia comum merece filme bom sem ocasião especial. Um título bem feito já basta. Não precisa ser o melhor da sua vida.',
    summary:
      'Humor normal é permissão para assistir algo apenas bom. Mistério, coming-of-age, aventura curta. A noite não precisa de um evento.',
    intro: [
      'Normal é o humor mais difícil de atender, porque ele não grita um gênero. Você não está mal, não está eufórico, não quer um susto como programa. Quer um filme que justifique a noite sem transformá-la num acontecimento. A indústria inteira empurra o contrário: imperdível, fenômeno, só nos cinemas, todo mundo comentando. Dia normal não deve satisfação a isso.',
      'O que costuma funcionar é filme bem feito de meio de semana. Mistério com elenco que sabe falar. História de uma garota querendo sair da cidade. Ficção que trata uma ideia com clareza. Desenho com opinião. Romance em que duas pessoas andam e a caminhada é o filme. Nenhum desses pede fantasia, vela ou grupo de discussão depois. Eles cabem entre o jantar e a escova de dente, e ainda assim não são sobra.',
      'Manter o clima, num dia comum, é continuar aberto. Comédia, drama, aventura, ficção científica: o site usa essa mistura de propósito, porque normal não é um gênero, é uma disponibilidade. O risco de manter é a indecisão. Tudo serve e por isso nada é escolhido. Por isso a lista existe. Não para dizer o que é objetivo e correto. Para cortar o catálogo até um punhado de filmes que prestam em qualquer terça.',
      'Mudar o clima, quando o dia foi comum demais, é pedir um grau de espanto. Fantasia, aventura, uma imagem que o seu apartamento não tem. Não precisa ser barulhento. Um hotel impossível, uma raposa com plano, um outro universo desenhado à mão já deslocam a noite. O erro é achar que mudar significa obrigatoriamente explosão. Explosão num dia normal pode ser só cansaço com trilha sonora.',
      'Eu evitaria começar uma trilogia se você não quer dever a continuação amanhã. Evitaria também o filme que todo grupo cobra e você sabe que vai assistir sem vontade, só para não ficar de fora. Dia normal é a melhor ocasião para ver o que te interessa de verdade, justamente porque não há desculpa dramática. E evitaria olhar a nota antes de olhar o tom. Nota alta não diz se a noite vai ser leve ou pesada.',
      'Os dez títulos cobrem esse meio aberto: precisão cômica, mistério, adolescência, primeira contato, gibi, conversa noturna, conto, música como conflito, saudade adulta, bicho com terno. Dá para fechar os olhos e apontar. Dá para ler a frase e escolher pelo serviço. O botão marca Normal e segue o fluxo. Se nada disso couber na duração de hoje, o passo do tempo existe para isso. Um filme curto e redondo ganha de um clássico que você vai pausar para sempre.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 120467,
        why: 'O Grande Hotel Budapeste é prazer de superfície bem feita. Num dia normal, precisão já é motivo suficiente.',
      },
      {
        tmdbId: 546554,
        why: 'Entre Facas e Segredos entrega mistério, risada e elenco. Funciona sem você estar num humor extremo.',
      },
      {
        tmdbId: 391713,
        why: 'Lady Bird dura o tamanho de uma vontade de sair de casa. Coming-of-age sem transformar terça em tragédia.',
      },
      {
        tmdbId: 329865,
        why: 'A Chegada é ficção com uma ideia clara e gente falando sério. Cabe quando você quer pensar sem sofrer.',
      },
      {
        tmdbId: 324857,
        why: 'No Aranhaverso é alegria de desenho mesmo para quem não está eufórico. O dia comum ganha cor sem precisar de ocasião.',
      },
      {
        tmdbId: 76,
        why: 'Antes do Amanhecer é só uma conversa boa. Em dia normal, isso pode ser o filme inteiro, e está tudo certo.',
      },
      {
        tmdbId: 2493,
        why: 'A Princesa Prometida é conto reconfortante com piada. Não pede que a noite seja especial para funcionar.',
      },
      {
        tmdbId: 244786,
        why: 'Whiplash serve quando o dia normal está pedindo um pouco de pulso. Curto, intenso, e termina.',
      },
      {
        tmdbId: 666277,
        why: 'Vidas Passadas é adulto e quieto. Para quem quer um drama que respeita a inteligência sem pesar o resto da semana.',
      },
      {
        tmdbId: 10315,
        why: 'O Fantástico Sr. Raposo muda o clima com charme e plano de assalto. Aventura de mesa de jantar, não de campo de guerra.',
      },
    ],
  },
  {
    id: 'happy',
    slug: 'feliz',
    title: 'Filmes para continuar feliz',
    description:
      'Se o dia já está bom, o filme pode prolongar isso. Musical, comédia de elenco e desenho. Sem trauma de surpresa.',
    summary:
      'Feliz pede filme que não fura o balão à toa. Dá para manter a luz com musical e comédia, ou escolher um drama sabendo que é uma decisão.',
    intro: [
      'Feliz é um humor que o catálogo trata mal. A grade insiste em te oferecer trauma porque trauma parece importante, e você está tendo um dia bom que não pediu importância. Proteger esse dia não é superficialidade. É bom senso. O filme pode prolongar a luz que já está em você, ou pode trocá-la por outra coisa, mas a troca deveria ser consciente, não uma emboscada no segundo ato.',
      'Manter o clima é a escolha mais natural, e ela tem ofício. Musical em que a câmera dança, comédia de investigação boba, loira que ganha o tribunal com pasta rosa, banda de escola, brinquedo que entende lealdade, desenho que trata família como perseguição criativa. O tom combina com o seu. Você sai parecido com quem entrou, talvez um pouco mais solto. Isso é um resultado excelente. Cinema não é obrigado a te transformar para ter valido a entrada.',
      'O que esses filmes fazem de melhor é sinceridade de prazer. Eles não piscam para a plateia pedindo desculpa por serem gostosos. Cantando na Chuva gosta de ensaio. Mamma Mia gosta de gente cantando alto numa ilha. Paddington gosta de educação. Se você está feliz, essa franqueza encontra plateia. Filme que tem vergonha da própria doçura, e enfia uma crueldade no meio para ganhar respeito, costuma ser pior nos dois departamentos.',
      'Mudar o clima é permitido e às vezes é o que você quer: a felicidade está estável, e você topa um drama, um suspense, uma ficção mais seca. O fluxo chama isso de mudar, e os gêneros puxam para esse lado. Faça isso de propósito. Leia o tom. Não aperte play num filme de luto só porque ele está no topo de uma lista e você está leve o bastante para aguentar. Aguentar não é o mesmo que querer. Um dia feliz também pode ser gasto, e gastar sem querer é um jeito bobo de terminar a noite.',
      'Eu evitaria terror nesta página de propósito, e evitaria comédia que só funciona humilhando alguém que não pode revidar. Alegre não precisa ser cruel. Também evitaria a obrigação de chamar alguém para dividir. Filme feliz sozinho, com a janela aberta, é uma das melhores sessões que existem. Companhia é bem-vinda. Não é requisito para você ter o direito de assistir uma coisa luminosa.',
      'As frases abaixo dizem como cada título segura a luz: dança, caso policial bobo, tribunal, show, brinquedo, teia, ilha, hotel, família em fuga. Escolhe pelo tipo de alegria, porque alegria também tem sotaque. O botão marca Feliz. Se no passo seguinte você decidir mudar, tudo bem. Só não deixe o algoritmo decidir isso por você no escuro, no meio de um filme que você abriu por engano.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 872,
        why: 'Cantando na Chuva é felicidade com técnica. Dança e ensaio prolongam o dia bom sem pedir desculpa por isso.',
      },
      {
        tmdbId: 346648,
        why: 'Paddington 2 é a versão mais alegre de alguém sendo decente. Combina com quem já está bem e quer continuar.',
      },
      {
        tmdbId: 290250,
        why: 'Dois Caras Legais é risada de dupla, caso e terno amarrotado. Comédia que não precisa te derrubar para ser engraçada.',
      },
      {
        tmdbId: 8835,
        why: 'Legalmente Loira ganha o filme sendo exatamente quem é. A alegria aqui é competência com brilho, não piada sobre a personagem.',
      },
      {
        tmdbId: 1584,
        why: 'Escola de Rock termina em show. Se você está feliz, o palco encontra você no meio do caminho.',
      },
      {
        tmdbId: 10193,
        why: 'Toy Story 3 é lealdade de brinquedo e um adeus que não estraga a ternura. Dá para rir e marejar sem sair do tom.',
      },
      {
        tmdbId: 324857,
        why: 'No Aranhaverso é cor em excesso bom. Mantém o ânimo e ainda mostra coisa nova para o olho.',
      },
      {
        tmdbId: 11631,
        why: 'Mamma Mia canta a felicidade em voz alta, numa ilha, sem ironia protegendo o musical. Ou você entra, ou não é a noite.',
      },
      {
        tmdbId: 120467,
        why: 'O Grande Hotel Budapeste é deleite visual. Para um humor já bom, a simetria vira sobremesa.',
      },
      {
        tmdbId: 501929,
        why: 'A Família Mitchell e a Revolta das Máquinas é família, piada e perseguição. Energia de desenho para não sentar em cima da alegria.',
      },
    ],
  },
  {
    id: 'inlove',
    slug: 'apaixonado',
    title: 'Filmes para quem está apaixonado',
    description:
      'Apaixonado combina com filme sobre olhar, conversa e tempo. Não só com casamento e aeroporto.',
    summary:
      'O coração leve pede filme em que duas pessoas se escutam. Caminhada, carta, retrato, comédia de diálogo. Casamento de fórmula pode esperar.',
    intro: [
      'Apaixonado é um humor fácil de errar com filme errado. A prateleira romântica está cheia de aeroporto, corrida na chuva e discurso no casamento de outra pessoa. Isso pode ser gostoso, e também pode parecer que o seu sentimento precisa de um acontecimento público para ser real. Não precisa. Muita da melhor cinema sobre amor é duas pessoas percebendo que a conversa não acabou.',
      'O que costuma funcionar é tempo juntos na tela. Uma noite em Viena. Um fim de tarde anos depois. Um retrato pintado numa ilha, em que olhar é o enredo. Um corredor de Hong Kong filmado como se o desejo ocupasse a arquitetura. Comédia em que o diálogo é o beijo. Musical que admite que a cidade fica mais colorida, e também admite que sonho profissional e vida a dois não cabem sempre no mesmo plano. O sentimento ganha forma diferente em cada um, e essa diferença importa mais do que o pôster de casal.',
      'Manter o clima é ficar nesse brilho. Romance, comédia romântica, música. Você quer reconhecer a leveza, não analisá-la até secar. O filme pode ser antigo ou recente, heterossexual ou não, falado ou quase mudo de tanta contenção. O critério é se a câmera trata o encontro como algo que vale ser visto com atenção. Se o filme tem pressa de chegar no beijo e pressa de chegar no conflito de mentira besta, ele não está apaixonado. Está cumprindo etapa.',
      'Mudar o clima é o que você escolhe quando o coração já está abastecido e você quer gastar a energia em outro lugar: estrada, fantasia, uma aventura que não é sobre o casal. Também é válido. Amor não obriga tema. Às vezes o melhor filme de um dia apaixonado é uma perseguição no deserto, porque você está generoso com o mundo e topa velocidade. Só não deixe um drama de separação cruel entrar disfarçado de romance. O pôster mente com frequência nessa prateleira.',
      'Eu evitaria história em que ciúme é prova de amor, perseguição tratada como charme, e final que ensina que uma pessoa completa a outra como se fosse peça faltando. Você já está inteiro. O filme pode acompanhar isso. Também evitaria comédia humilhando o corpo ou a profissão de alguém para gerar o casal. Química boa não precisa de um alvo. E se você for assistir acompanhado, escolham pelo que os dois aguentam ouvir em silêncio juntos. Pausar para debater cada cena pode ser ótimo amanhã. Hoje talvez atrapalhe.',
      'Cada frase da lista diz que espécie de olhar o filme pratica: noite inteira, reencontro, pintura, corredor, diálogo, favores, música, desejo contido, o que não foi vivido, casa de campo. Dá para montar uma sessão só com um deles. O botão marca Apaixonado e o fluxo segue. Manter é o caminho óbvio, e está tudo bem se for o que você quer. Óbvio, numa noite dessas, não é defeito.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 76,
        why: 'Antes do Amanhecer é amor como conversa que não quer acabar. Serve quando o sentimento ainda está no começo e a fala é o acontecimento.',
      },
      {
        tmdbId: 80,
        why: 'Antes do Pôr do Sol é o mesmo par, com a vida já no meio. Para quem ama e também lembra do que ficou pelo caminho.',
      },
      {
        tmdbId: 531428,
        why: 'Retrato de uma Jovem em Chamas faz do olhar o enredo. Pouca pressa, muito desejo, nenhum discurso de aeroporto.',
      },
      {
        tmdbId: 843,
        why: 'Amor à Flor da Pele filma um corredor como se ele soubesse do segredo. Contenção que combina com coração cheio e boca fechada.',
      },
      {
        tmdbId: 639,
        why: 'Harry e Sally provam que diálogo pode ser a cena de amor. A comédia é adulta e a química está na fala.',
      },
      {
        tmdbId: 194,
        why: 'Amélie acredita em pequeno destino e em favores. É doçura com opinião, boa para manter o brilho sem fórmula de casamento.',
      },
      {
        tmdbId: 313369,
        why: 'La La Land deixa a cidade cantar e ainda admite o custo. Romance para quem está feliz e não precisa que mintam o final.',
      },
      {
        tmdbId: 258480,
        why: 'Carol é desejo filmado com luvas e loja de departamento. O amor cabe no gesto, não numa declaração para a plateia.',
      },
      {
        tmdbId: 666277,
        why: 'Vidas Passadas é o amor que segue educado com a vida que já foi escolhida. Lindo, e sem vilão para odiar.',
      },
      {
        tmdbId: 4348,
        why: 'Orgulho e Preconceito é conversa afiada numa casa de campo. O prazer está em ver duas pessoas se entenderem devagar.',
      },
    ],
  },
  {
    id: 'nostalgic',
    slug: 'nostalgico',
    title: 'Filmes para quando bate a saudade',
    description:
      'Nostalgia pede textura de outro tempo: sala de cinema, bicicleta, verão de criança. Sem aula sobre o passado ser melhor.',
    summary:
      'Saudade gosta de filme com pó de outra década: cinema de cidade pequena, verão, bicicleta, desenho que você viu cedo demais ou tarde demais.',
    intro: [
      'Nostálgico não é um pedido para o mundo voltar atrás. É uma textura. Cheiro de sala escura, verão em que o dia durava mais, fita que arranhava, rua que você achava enorme. Filme serve quando ele tem essa textura de verdade, não quando alguém no roteiro diz que antigamente é que era bom. Frase pronta não dá saudade. Imagem dá.',
      'O que costuma funcionar é história de formação sem discurso de formação. Meninos atrás de um corpo na ferrovia. Um grupo procurando tesouro porque o mapa apareceu. Um extraterrestre no armário. Uma manhã de escola em que a vida inteira parece caber num corredor. Desenho japonês em que o espírito da floresta é tratado com naturalidade. Cinema dentro do cinema, com um projecionista e uma praça. Você não precisa ter vivido aquilo. Saudade também é emprestada. A gente sente falta de uma tarde que é de outra pessoa, e o filme empresta com honestidade.',
      'Manter o clima é ficar nesse pó dourado de propósito. Família, aventura, fantasia, animação, um pouco de história. O fundo do site esquenta para esse lado. Não é obrigatório que o filme seja antigo. Meia-Noite em Paris, por exemplo, é sobre a armadilha da saudade, e ainda assim tem a textura. O critério é se a imagem parece tocável. Luz de fim de tarde, tecido, quadro, bicicleta, poeira no projetor. Se parece anúncio de banco, a nostalgia é de mentira.',
      'Mudar o clima puxa para ficção, ação e suspense, e faz sentido quando a saudade começou a apertar demais e você quer uma porta para outro século, não para o seu. O risco é escolher um filme moderno barulhento só para provar que você não está preso no passado. Você não deve essa prova. Se for mudar, que seja porque a história te interessa, não porque você ficou com vergonha de rever um filme de 1985 numa sexta à noite.',
      'Eu evitaria remake que só existe para lembrar o original sem ter o que dizer, e evitaria cinebiografia que transforma a sua banda favorita em uma sucessão de cenas de estúdio com data na tela. Datas não são memória. Também evitaria ironia constante, o filme que não consegue mostrar uma criança de bicicleta sem rir dela. Saudade é sincera ou não é. Dá para ter humor, como Os Goonies tem, sem tratar o passado como piada particular de quem já cresceu.',
      'A lista passeia por sala de projeção, trilho, porão, subúrbio, floresta, detenção, poesia e banho de espíritos. Cada frase diz qual saudade aquele filme acende, porque elas não são intercambiáveis. Saudade de infância não é saudade de cinema, que não é saudade de escola. O botão marca Nostálgico. Se quiser, escreve de que época você está com saudade. Um detalhe desses muda mais a indicação do que mais dez minutos de indecisão.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 11216,
        why: 'Cinema Paradiso é saudade do próprio ato de assistir. Praça, projecionista e uma vida inteira cabendo numa cabine.',
      },
      {
        tmdbId: 59436,
        why: 'Meia-Noite em Paris caminha pela cidade sonhando com outra década, e ainda cutuca quem acha que só o passado presta.',
      },
      {
        tmdbId: 235,
        why: 'Conta Comigo é verão, trilho e amizade de menino. A saudade aqui tem terra no sapato, não filtro sépia.',
      },
      {
        tmdbId: 9340,
        why: 'Os Goonies é porão, mapa e grupo. Infância como aventura de verdade, com piada que não humilha as crianças.',
      },
      {
        tmdbId: 601,
        why: 'E.T. guarda a casa, a bicicleta e o armário. É a saudade de um subúrbio que talvez nem tenha sido seu, e mesmo assim dói.',
      },
      {
        tmdbId: 105,
        why: 'De Volta para o Futuro brinca com o tempo e ainda é, ele mesmo, um objeto de saudade. Ritmo de sábado à tarde.',
      },
      {
        tmdbId: 8392,
        why: 'Meu Amigo Totoro tem o verão japonês parado no calor. Saudade de infância lenta, sem vilão e sem lição gritada.',
      },
      {
        tmdbId: 2108,
        why: 'O Clube dos Cinco é uma detenção que vira o colégio inteiro. Saudade de escola, com cada um carregando um tipo.',
      },
      {
        tmdbId: 207,
        why: 'Sociedade dos Poetas Mortos é carteira, pátio e um professor. A saudade de quem foi acordado por uma aula, não por um acontecimento.',
      },
      {
        tmdbId: 129,
        why: 'A Viagem de Chihiro é um mundo que parece lembrança mesmo na primeira vez. Banho, trem, espírito. Fantasia com pó de memória.',
      },
    ],
  },
  {
    id: 'reflective',
    slug: 'reflexivo',
    title: 'Filmes para pensar com calma',
    description:
      'Humor reflexivo pede filme com espaço entre as cenas. Trabalho, luto manso, ideia de ficção. Sem pressa de te explicar a vida.',
    summary:
      'Reflexivo quer espaço, não tese. Rota de trabalho, poema, primeiro contato, um verão que só se entende depois. O filme pensa com você, sem quadro-negro.',
    intro: [
      'Reflexivo é vontade de pensar sem ser empurrado para uma conclusão. Você não está necessariamente triste. Está permeável. Uma frase fica, uma cena comum parece maior, e o filme ruim para esse estado é o que chega com a resposta debaixo do braço. Você quer espaço entre as coisas. Quer poder discordar em silêncio, pausar, voltar uma fala, deixar a imagem trabalhar enquanto a chaleira esquenta.',
      'O que costuma funcionar é rotina filmada com respeito. Um motorista e os poemas que ele escreve no almoço. Um homem que limpa banheiros em Tóquio e ainda escolhe a fita que vai ouvir no carro. Um funcionário público diante da própria morte, num clássico japonês que não transforma isso em corrida contra o tempo. Esses filmes não aceleram para você não pensar. Eles confiam que pensar é o programa. Se você está nesse humor, a lentidão não é defeito de ritmo. É o cômodo onde a sessão acontece.',
      'Ficção também serve, quando a ideia é clara o bastante para você entrar nela e ficar. Uma linguista diante de uma língua que muda o tempo. Uma voz artificial num apartamento, e a pergunta do que conta como companhia. Um desenho sobre uma alma com pressa de ter uma vida importante. O pensamento aqui não é lição de escola. É uma situação que não existe no seu bairro e, justamente por isso, deixa ver o bairro de outro ângulo quando a luz volta.',
      'Manter o clima puxa drama, documentário, história, ficção, mistério. É o caminho de quem quer continuar pensando. Mudar o clima é pedir comédia, aventura ou animação mais solta, para o pensamento não virar ruminação. Ruminação é quando a mesma frase gira sem imagem nova. Se você perceber que está nesse giro antes mesmo de dar play, mudar pode ser mais honesto do que mais um drama sério. Sério não é sinônimo de profundo. Às vezes profundo é rir e ir dormir.',
      'Eu evitaria filme que explica o próprio tema num diálogo final, e evitaria mistério que trata reflexão como truque de revelação. Também evitaria abrir dez textos sobre o filme antes de ver. A interpretação de outra pessoa ocupa o espaço que era para ser seu. Depois, se quiser, leia. Durante, fica com a cena. E evita transformar a sessão num julgamento do seu próprio caráter. Gostar de um filme lento não te torna melhor. Não gostar também não te torna raso. O humor reflexivo não é uma prova.',
      'As frases da lista apontam o tipo de pensamento que cada filme sustenta: trabalho, rota, língua, voz, verão, o que não vivemos, pressa de viver, a morte como prazo, luto de pai e filha, um internato no inverno. Escolhe pelo assunto que você já está ruminando, ou pelo que você topa convidar. O botão marca Reflexivo. A duração importa mais do que parece. Um filme de três horas pede uma noite em que você realmente quer ficar até tarde com uma ideia. Se a noite não é essa, escolha o menor.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 370755,
        why: 'Paterson encontra o pensamento no intervalo do trabalho. Poema curto, rua repetida, e nenhuma pressa de declarar o sentido da vida.',
      },
      {
        tmdbId: 976893,
        why: 'Dias Perfeitos observa uma rotina até ela ficar enorme. Limpar, ouvir, olhar a árvore. Reflexão sem quadro-negro.',
      },
      {
        tmdbId: 329865,
        why: 'A Chegada usa ficção para falar de tempo, língua e o que a gente escolhe sabendo o fim. Dá para pensar sem sair arrasado.',
      },
      {
        tmdbId: 152601,
        why: 'Ela pergunta o que é intimidade quando a outra voz não tem corpo. A pergunta fica depois do crédito, sem manual de resposta.',
      },
      {
        tmdbId: 965150,
        why: 'Aftersun deixa você entender o verão um pouco atrasado, como memória faz. O pensamento chega na montagem, não num discurso.',
      },
      {
        tmdbId: 666277,
        why: 'Vidas Passadas é a vida que seguimos e a que só visitamos. Adulto, quieto, e cheio de espaço entre as falas.',
      },
      {
        tmdbId: 508442,
        why: 'Soul briga com a ideia de que a vida só conta quando vira conquista. Útil quando a reflexão está presa em produtividade.',
      },
      {
        tmdbId: 3782,
        why: 'Viver, o Ikiru de Kurosawa, põe um prazo na mesa e recusa a corrida heroica. O pensamento é sobre o que ainda dá para fazer.',
      },
      {
        tmdbId: 758866,
        why: 'Drive My Car leva o luto para o ensaio e para a estrada. Longo de propósito: o assunto precisa de quilômetro, não de atalho.',
      },
      {
        tmdbId: 840430,
        why: 'Os Rejeitados passa um inverno inteiro numa escola quase vazia. Três pessoas, neve, e tempo bastante para cada uma mudar um pouco.',
      },
    ],
  },
  {
    id: 'adventurous',
    slug: 'aventureiro',
    title: 'Filmes para vontade de partir',
    description:
      'Vontade de explorar pede mapa, veículo e horizonte. Aventura com geografia, não só barulho de trailer.',
    summary:
      'Aventureiro quer sair de casa mesmo ficando no sofá. Mapa, caminhão, deserto, floresta, navio. O filme precisa saber onde é o longe.',
    intro: [
      'Aventureiro é vontade física. Não basta um filme em que alguém diz que é hora de mudar de vida. Você quer horizonte, veículo, mapa com uma parte em branco, gente saindo pela porta e a porta ficando menor. O sofá continua sendo o sofá. A sessão funciona quando o filme cumpre a viagem no seu lugar, com geografia que você entende. Longe precisa parecer longe. Se todas as cidades forem o mesmo beco com fumaça, você não foi a lugar nenhum.',
      'O que costuma funcionar é deslocamento com regra de mundo. Um arqueólogo que tem medo de cobra e mesmo assim entra no templo. Um conto em que a esgrima e o pântano são de brincadeira e de verdade ao mesmo tempo. Um deserto em que a perseguição dura porque o combustível, a areia e o comboio importam. Uma menina num banho de espíritos, descendo andares que não existiam na escada de casa. Um planeta largo, filmado para você sentir o tamanho antes de alguém explicar a política. Viagem boa tem logística. Você sente o que custa atravessar.',
      'Manter o clima é pedir mais disso: aventura, ação, fantasia, um western se aparecer. O humor já está de bota. O filme não precisa te convencer a sair. Precisa te levar. Personagem resmungão no meio do mato, com um garoto que não devia estar ali, também conta. Aventura não é só capa e trilha grandiosa. Às vezes é estrada vicinal, tio e uma cabana. O tamanho do espetáculo importa menos do que a sensação de que o dia seguinte vai amanhecer em outro ponto do mapa.',
      'Mudar o clima, aqui, é uma escolha esquisita e legítima: você está com vontade de explorar e mesmo assim pede um drama, um mistério, uma comédia mais parada. Pode ser que a vontade de partir seja emocional e não caiba em perseguição. O fluxo deixa. Só não use mudar como sinônimo de filme menor. Um mistério de conversa pode ser uma expedição interior tão séria quanto o deserto. O que não funciona é ação sem chão, em que o herói teletransporta entre continentes porque o roteiro cansou de viajar.',
      'Eu evitaria franquia no capítulo quatro se você quer descobrir o mapa, não lembrar quem traiu quem. Evitaria também viagem que é só cartão-postal, sem pessoa dentro. Paisagem bonita não é aventura. Aventura é alguém atravessando e pagando com sapato, fome ou medo. E evitaria ficar na escolha por mais de dez minutos. Esse humor azeda quando vira planejamento.',
      'As frases dizem o veículo de cada título: arca, pântano, caminhão, balneário de espíritos, deserto de outro planeta, a pé até a montanha, mato fechado, capa de revista, navio, castelo que anda. Escolhe pelo terreno que te deu vontade hoje. O botão marca Aventureiro. No passo da duração, longo combina com épico, e curto combina com conto. Os dois são partida. Nenhum exige que você faça a mala de verdade, embora às vezes dê vontade, e essa vontade já é o filme trabalhando.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 85,
        why: 'Os Caçadores da Arca Perdida são mapa, templo e medo no meio da piada. Aventura clássica com chão e com cobra.',
      },
      {
        tmdbId: 2493,
        why: 'A Princesa Prometida atravessa pântano, penhasco e castelo como conto. Dá vontade de partir sem levar a noite tão a sério.',
      },
      {
        tmdbId: 76341,
        why: 'Mad Max: Estrada da Fúria é viagem que não para. O horizonte existe, e cada metro dele é disputado.',
      },
      {
        tmdbId: 129,
        why: 'A Viagem de Chihiro desce num mundo com regra própria. Explorar aqui é aprender o prédio, o trem e os espíritos.',
      },
      {
        tmdbId: 693134,
        why: 'Duna: Parte Dois faz o deserto ter escala. Você sente que atravessar aquilo custa o dia, a água e a fé de alguém.',
      },
      {
        tmdbId: 120,
        why: 'A Sociedade do Anel é partida no sentido literal. O Condado fica para trás, e o filme respeita a distância.',
      },
      {
        tmdbId: 371645,
        why: 'Hunt for the Wilderpeople troca o épico por mato, tio e um garoto. A vontade de fugir cabe numa ilha, e ainda é aventura.',
      },
      {
        tmdbId: 116745,
        why: 'A Vida Secreta de Walter Mitty larga a mesa do escritório e cumpre o cartão-postal a sério. Partir, no caso, é o enredo.',
      },
      {
        tmdbId: 22,
        why: 'Piratas do Caribe ainda tem navio, bússola e ilha. É passeio de horizonte largo, com piada e um pouco de fantasma.',
      },
      {
        tmdbId: 4935,
        why: 'O Castelo Animado anda. A viagem é a casa, a guerra fica no fundo, e o mundo muda de cheiro a cada porta.',
      },
    ],
  },
  {
    id: 'thrill',
    slug: 'querendo-um-susto',
    title: 'Filmes para quem quer um susto',
    description:
      'Medo de brincadeira pede regra: o que está te seguindo, onde está a saída, e um filme que não confunde crueldade com susto.',
    summary:
      'Querendo um susto é medo com convite. Terror e suspense funcionam quando a ameaça tem regra. Sofrimento sem forma não é diversão.',
    intro: [
      'Querendo um susto é um pedido claro, e o site trata os dois caminhos do mesmo jeito: terror, suspense, mistério. Não existe aqui a opção de te empurrar para uma comédia no meio do susto, porque você não pediu para ser acalmado. Pediu medo divertido. A diferença entre medo divertido e filme que só machuca está na regra. Se você entende o que está te seguindo, onde não pisar e qual é a saída, o coração acelera e a sessão continua sendo brincadeira. Se o filme só empilha dor sem forma, a brincadeira acaba e fica o mal-estar.',
      'O que costuma funcionar é ameaça com limite. Um bicho que imita gente numa estação isolada. Uma criatura no corredor da nave, com a tripulação contável nos dedos. Uma casa silenciosa em que o barulho é o perigo. Um verão em que a coisa anda atrás no passo, sem correr. Uma floresta no século dezessete, com a luz errada e pouca explicação. O susto bom te dá informação suficiente para você ter medo do lugar certo. O susto ruim apaga a luz e espera você se assustar com o próprio escuro da sala.',
      'Há também o medo que ri de si mesmo, e ele conta como susto se a tensão for de verdade. Pânico conhece a regra do telefone e ainda faz o telefone importar. Invocação do Mal aposta na casa familiar e no intervalo antes da batida. Se deixar de ser divertido, pausa. Não há contrato te obrigando a terminar.',
      'Eu separaria susto de crueldade com uma pergunta simples. Você está com medo do que pode acontecer, ou está vendo alguém sofrer porque o filme não teve outra ideia? O primeiro é o pedido desta página. O segundo é outra coisa, e muita gente confunde os dois porque os dois usam o mesmo pôster escuro. Hereditário, por exemplo, é excelente e é pesado além da brincadeira. Está na lista para quem quer esse peso com forma, não para quem quer um pulo e uma pipoca. Leia a frase antes. A frase existe para você não se enganar de propósito.',
      'Eu evitaria franquia de tortura e a compilação de mortes antes do filme. Também evitaria começar de madrugada se você precisa estar inteiro cedo e o medo não desliga com o crédito. Se estiver acompanhado, rir depois é ótimo. Falar em cima de cada cena para provar que não sentiu nada estraga o pedido que você mesmo fez.',
      'Os títulos vão do clássico de estação ao silêncio, da perseguição lenta ao conto de bruxa. Cada frase avisa o tipo de medo, porque o susto ainda tem temperatura. O botão marca esse humor e segue o fluxo. Duração conta: um terror de noventa minutos bem desenhado ganha de um de duas horas que repete o mesmo corredor. E se no meio você perceber que não era medo que queria, e sim companhia, para. Trocar de filme no meio não é derrota. É ajuste.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 1091,
        why: 'O Enigma de Outro Mundo isola um grupo e uma criatura que imita. O medo tem planta da estação e paranoia com regra.',
      },
      {
        tmdbId: 348,
        why: 'Alien conta a tripulação e o corredor. Susto de geografia: você sabe que a saída existe e que ela ficou longe.',
      },
      {
        tmdbId: 419430,
        why: 'Corra! é tensão social que vira terror sem perder a ideia. O medo é divertido e ainda é sobre alguma coisa.',
      },
      {
        tmdbId: 447332,
        why: 'Um Lugar Silencioso transforma barulho em armadilha. Curto, claro, e fácil de sentir no corpo sem um manual.',
      },
      {
        tmdbId: 270303,
        why: 'Corrente do Mal faz a ameaça andar no seu passo. O susto é a regra simples, não um susto editado no colo.',
      },
      {
        tmdbId: 310131,
        why: 'A Bruxa é floresta, luz antiga e pouca explicação. Medo de atmosfera, para quem não quer só o pulo.',
      },
      {
        tmdbId: 4232,
        why: 'Pânico brinca com a regra do gênero e ainda cumpre a regra. Serve quando você quer susto e também quer rir do contrato.',
      },
      {
        tmdbId: 138843,
        why: 'Invocação do Mal é casa, família e o intervalo antes da batida. Clássico de sessão, honesto sobre o que está prometendo.',
      },
      {
        tmdbId: 948,
        why: 'Halloween, o de 1978, é formato puro: subúrbio, vulto andando, música. O susto não precisa de mitologia infinita.',
      },
      {
        tmdbId: 493922,
        why: 'Hereditário é pesado de verdade, além do pulo. Entra na lista para quem quer medo com luto, não uma brincadeira leve.',
      },
    ],
  },
  {
    id: 'extraordinary',
    slug: 'extraordinario',
    title: 'Filmes para um dia que já está grande',
    description:
      'No auge, filme pequeno demais frustra. Cabe invenção, escala e ofício: desenho, deserto, palco, música em velocidade.',
    summary:
      'Extraordinário é excesso bom. O filme precisa acompanhar o volume do dia: invenção, escala, música, desenho. Mediano apaga o ânimo.',
    intro: [
      'Extraordinário é o auge. Você já chegou alto, por um motivo que o filme não precisa conhecer, e um título mediano apaga isso como um pano molhado. Não é hora de cinema correto, equilibrado, que todo mundo respeita e ninguém rever. É hora de filme com excesso de ofício. Excesso de ideia, de cor, de escala, de música, de precisão. Você está generoso. O filme deveria estar também.',
      'O que costuma funcionar é obra que parece impossível de ter sido feita e mesmo assim foi. Um desenho que muda de técnica no meio da briga. Dois universos e uma declaração de imposto. Uma perseguição que dura o filme porque alguém coreografou caminhão. Um deserto tão largo que a política fica pequena perto da areia, e mesmo assim a política importa. Um ensaio de bateria filmado como se fosse final de campeonato. Uma cidade cantando na chuva de estúdio, com poça de verdade e sorriso que não pede desculpa. O seu ânimo encontra par.',
      'Manter o clima é ficar nesse volume. Aventura, família, fantasia, ação, comédia com energia. O site não vai te oferecer um drama de corredor de hospital como primeira ideia, e faz bem. Você não está pedindo para descer. Está pedindo para o filme subir até onde você já está. Família em fuga contra máquinas, hotel impossível, aranha desenhada: tudo isso mantém o dia grande sem exigir que você finja que a vida é só espetáculo. Espetáculo, por uma noite, pode ser o programa inteiro.',
      'Mudar o clima empurra para fantasia, ação e ficção com outro tipo de grandeza, mais seca ou mais estranha. Vale se o auge está pedindo espanto em vez de alegria. As duas coisas são grandes e não são iguais. Alegria quer gente, música, piada no ponto. Espanto quer escala e silêncio no meio do barulho, um plano aberto em que você percebe o tamanho. Se você não souber qual dos dois está sentindo, mantenha. Errar para o lado da generosidade, nesse humor, quase nunca estraga a noite. Errar para o lado do filme tímido estraga.',
      'Eu evitaria o prestígio morno: o título que você respeita e adia porque hoje ele vai parecer dever. Hoje não é dia de dever. Também evitaria continuação que só aponta a própria mitologia em vez de criar uma cena nova. Guarda o debate para o crédito. A cena pediu o olho inteiro.',
      'Cada frase abaixo nomeia o excesso daquele filme: invenção, gibi, escala de teia, caminhão, jato, deserto, metrônomo, poça, hotel, fuga no compasso. Não estão aqui por serem os maiores de todos. Estão aqui porque não encolhem quem já chegou alto. O botão marca Extraordinário e devolve o fluxo. Escolhe a duração sem culpa. Um filme enorme de duas horas e meia cabe, se a noite for realmente essa. Se a euforia for embora cedo, curto e intenso também honra o pico. O que não honra é deixar o ânimo esfriar na grade, comparando capas, até o dia voltar a ser comum.',
    ].join('\n\n'),
    picks: [
      {
        tmdbId: 545611,
        why: 'Tudo em Todo o Lugar ao Mesmo Tempo tem excesso de ideia e ainda assim uma família no centro. Acompanha um dia que já chegou grande.',
      },
      {
        tmdbId: 324857,
        why: 'No Aranhaverso muda o desenho no meio do movimento. Ofício à mostra, no volume que esse humor pede.',
      },
      {
        tmdbId: 569094,
        why: 'Através do Aranhaverso aumenta a escala sem perder o desenho. Se o primeiro já te deixou alto, este continua a subida.',
      },
      {
        tmdbId: 76341,
        why: 'Mad Max: Estrada da Fúria é espetáculo com geografia. O auge encontra caminhão, areia e uma perseguição que não pede desculpa.',
      },
      {
        tmdbId: 361743,
        why: 'Top Gun: Maverick filma velocidade para valer. O dia grande ganha jato, e o jato devolve o dia ainda maior.',
      },
      {
        tmdbId: 693134,
        why: 'Duna: Parte Dois é escala e fé e areia. Espanto de plano aberto, para quando o extraordinário for grandioso e não só alegre.',
      },
      {
        tmdbId: 244786,
        why: 'Whiplash é pico em sala de ensaio. Não tem planeta nem exército, e mesmo assim termina no volume máximo.',
      },
      {
        tmdbId: 872,
        why: 'Cantando na Chuva é excesso de charme e técnica. A felicidade do estúdio combina com quem já está no auge e quer dança.',
      },
      {
        tmdbId: 120467,
        why: 'O Grande Hotel Budapeste é deleite sem mea-culpa. Precisão, cor e conto: um excesso educado, e ainda assim excesso.',
      },
      {
        tmdbId: 339403,
        why: 'Em Ritmo de Fuga casa música e perseguição até parecer um número só. Energia contínua para não sentar em cima do ânimo.',
      },
    ],
  },
] as const satisfies readonly MoodPage[]

export const MOOD_PAGES: readonly MoodPage[] = pages

type Covered = (typeof pages)[number]['id']
type MissingMood = Exclude<MoodId, Covered>

/** Falha o typecheck se um humor de config/moods.ts ficar sem página. */
export const moodPagesCoverAllIds: [MissingMood] extends [never]
  ? true
  : never = true

const bySlug = new Map(MOOD_PAGES.map((page) => [page.slug, page]))
const byId = new Map(MOOD_PAGES.map((page) => [page.id, page]))

export function getMoodPage(slug: string): MoodPage | undefined {
  return bySlug.get(slug)
}

export function getMoodPageById(id: MoodId): MoodPage | undefined {
  return byId.get(id)
}

/** `?humor=` aceita o slug público (`ansioso`) ou o id (`anxious`). */
export function moodIdFromHumorParam(
  value: string | string[] | undefined,
): MoodId | null {
  const raw = (Array.isArray(value) ? value[0] : value)?.trim()
  if (!raw) return null

  const byMoodId = moodIdSchema.safeParse(raw)
  if (byMoodId.success) return byMoodId.data

  const page = bySlug.get(raw)
  if (!page) return null
  const parsed = moodIdSchema.safeParse(page.id)
  return parsed.success ? parsed.data : null
}
