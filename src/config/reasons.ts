/**
 * Motivos curados que o Jev escolhe por filme (pergunta `choice`).
 * Usado quando o Gemini está indisponível, mantendo o "Por que esse filme"
 * decidido por IA. `when` descreve o critério para o Jev; `text` são variantes
 * da frase exibida (alternadas quando vários filmes caem na mesma categoria).
 */
export const REASON_TEMPLATES: Record<
  string,
  { when: string; text: string[] }
> = {
  light: {
    when: 'Filme leve, divertido, bom para relaxar e desligar a cabeça',
    text: [
      'Leve e divertido, bom para desligar a cabeça por um tempo.',
      'Pede pouco de você e devolve boas risadas.',
      'Um respiro leve, sem exigir esforço.',
    ],
  },
  warm: {
    when: 'Filme acolhedor, sensível, com calor humano e afeto',
    text: [
      'Uma história acolhedora, que faz boa companhia.',
      'Calorosa, daquelas que abraçam.',
      'Tem afeto de sobra para um momento como esse.',
    ],
  },
  emotional: {
    when: 'Filme emocionante, que mexe com os sentimentos e permite sentir',
    text: [
      'Emocionante, para deixar o que você sente ter espaço.',
      'Mexe com os sentimentos, no tempo dele.',
      'Uma história que permite sentir sem pressa.',
    ],
  },
  adventure: {
    when: 'Filme de aventura, ritmo animado, que prende a atenção e dá energia',
    text: [
      'Aventura de ritmo animado para empolgar e prender a atenção.',
      'Cheio de movimento, para tirar a mente do lugar.',
      'Energia de sobra para te levar a outra jornada.',
    ],
  },
  tense: {
    when: 'Filme tenso, de suspense ou mistério, que prende pela expectativa',
    text: [
      'Tenso na medida certa, prende do começo ao fim.',
      'Suspense que não deixa a atenção cair.',
      'Cheio de expectativa, difícil de largar.',
    ],
  },
  romantic: {
    when: 'Filme romântico, sobre amor e relações',
    text: [
      'Uma história de amor para esquentar o coração.',
      'Romance que combina com esse momento.',
      'Amor na tela para acompanhar o seu clima.',
    ],
  },
  thoughtful: {
    when: 'Filme reflexivo, que faz pensar sobre a vida',
    text: [
      'Faz pensar sobre a vida sem pressa.',
      'Convida a refletir com calma.',
      'Tem camadas para pensar depois dos créditos.',
    ],
  },
  nostalgic: {
    when: 'Filme nostálgico ou clássico, com sabor de memória afetiva',
    text: [
      'Um clássico com sabor de memória afetiva.',
      'Daqueles que trazem lembranças boas.',
      'Nostalgia em forma de filme.',
    ],
  },
}
