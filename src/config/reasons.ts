/**
 * Motivos curados que o Jev escolhe por filme (pergunta `choice`).
 * Usado quando o Gemini está indisponível, mantendo o "Por que esse filme"
 * decidido por IA. `when` descreve o critério para o Jev; `text` é o que aparece.
 */
export const REASON_TEMPLATES: Record<
  string,
  { when: string; text: string[] }
> = {
  light: {
    when: 'Filme leve, divertido, bom para relaxar e desligar a cabeça',
    text: 'Leve e divertido, bom para desligar a cabeça por um tempo.',
  },
  warm: {
    when: 'Filme acolhedor, sensível, com calor humano e afeto',
    text: 'Uma história acolhedora, que faz boa companhia.',
  },
  emotional: {
    when: 'Filme emocionante, que mexe com os sentimentos e permite sentir',
    text: 'Emocionante, para deixar o que você sente ter espaço.',
  },
  adventure: {
    when: 'Filme de aventura, ritmo animado, que prende a atenção e dá energia',
    text: 'Aventura de ritmo animado para empolgar e prender a atenção.',
  },
  tense: {
    when: 'Filme tenso, de suspense ou mistério, que prende pela expectativa',
    text: 'Tenso na medida certa, prende do começo ao fim.',
  },
  romantic: {
    when: 'Filme romântico, sobre amor e relações',
    text: 'Uma história de amor para esquentar o coração.',
  },
  thoughtful: {
    when: 'Filme reflexivo, que faz pensar sobre a vida',
    text: 'Faz pensar sobre a vida sem pressa.',
  },
  nostalgic: {
    when: 'Filme nostálgico ou clássico, com sabor de memória afetiva',
    text: 'Um clássico com sabor de memória afetiva.',
  },
}
