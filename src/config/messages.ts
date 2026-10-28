/**
 * Mensagens de acolhimento (humores com sadness >= 1).
 * Regras: sem tom de terapia, sem diagnóstico, sem "anime-se" / "não fique triste",
 * sem prometer que o filme resolve algo. Revisar antes de publicar.
 */
export const SUPPORT_MESSAGES: string[] = [
  'Dias assim acontecem. Hoje você só precisa de um filme e um lugar confortável.',
  'Sem pressa. Escolhi algo para fazer companhia, no seu ritmo.',
  'Você não precisa estar bem para assistir a um filme. Fica à vontade.',
  'Que tal um cobertor, uma bebida quente e um bom filme? Estou por aqui.',
  'Tá tudo bem não estar tudo bem. Separei uma companhia para você.',
  'Um filme não resolve tudo, mas pode dar uma pausa gostosa. Vem.',
  'Seja gentil consigo hoje. O filme abaixo pode ajudar a respirar um pouco.',
  'Você chegou até aqui, e isso já conta. Segue uma sugestão para o seu momento.',
  'Às vezes o melhor é só ter uma boa história por perto. Achei uma para você.',
  'Se quiser rir, chorar ou só ficar quieto, tudo bem. A sessão é sua.',
  'Respira. Escolhi com carinho, e você pode pedir outro quando quiser.',
  'Hoje o plano é simples: sofá, filme e nenhuma cobrança.',
  'Seu momento importa. Separei algo para te acompanhar nele.',
  'Não precisa explicar nada. Só dar o play quando estiver pronto.',
  'Existe espaço para o que você sente. E também para um bom filme.',
  'Um passo de cada vez. Este filme pode ser o de hoje.',
  'Se o dia pesou, deixa a história carregar um pouco por você.',
  'Você merece um tempo só seu. Aproveita essa sessão.',
  'Vai com calma. Se este não combinar, tem outros esperando.',
  'Estar com você nesse momento é o que importa. Boa sessão.',
]

/** Palavras que nunca devem aparecer numa mensagem gerada por IA. */
export const FORBIDDEN_MESSAGE_PATTERNS: RegExp[] = [
  /anime-?se/i,
  /n[aã]o fique triste/i,
  /\bdeprimi/i,
  /diagn[oó]stic/i,
  /terapia|psic[oó]log|psiquiatr/i,
  /rem[eé]dio|medica[cç][aã]o/i,
  /suic[ií]d/i,
  /se matar|tirar a (pr[oó]pria )?vida/i,
  /vai passar/i,
  /vai ficar tudo bem/i,
  /(cura|resolve|vai te curar)/i,
  /https?:\/\//i,
]
