import type { Sadness } from '@/lib/types'

import type { TextReading } from './types'

const ABUSE = [
  /ignore (all|any|previous|the above)/i,
  /ignor(e|a) (as |todas as |tudo |suas )?(instru|regras|anterior)/i,
  /system prompt|prompt do sistema|developer message/i,
  /jailbreak|\bDAN\b|do anything now/i,
  /(voc[eê]|you) (agora )?(é|e|are) (um|uma|now)/i,
  /(finja|pretend|act as|aja como|haja como)/i,
  /(revele|reveal|mostre|show).{0,20}(prompt|instru[cç][oõ]es|chave|key|token)/i,
  /https?:\/\/|<\/?[a-z][^>]*>|```/i,
]

const HEAVY = [
  /suic[ií]d/i,
  /me matar|quero morrer|queria morrer|acabar com (tudo|a minha vida)|tirar minha vida/i,
  /n[aã]o (aguento|quero) mais (viver|nada)?/i,
  /sem (sa[ií]da|esperan[cç]a|vontade de viver)/i,
  /perdi (meu|minha|o|a) (pai|m[aã]e|filh|irm|esposa|marido|amig|companheir)/i,
  /luto|faleceu|morreu/i,
]

const SAD = [
  /triste|tristeza|chorar|chorei|chorando/i,
  /sozinh|solid[aã]o|ansios|ang[uú]stia|p[aâ]nico/i,
  /sem for[cç]as|esgotad|desanimad|cansad[oa] de tudo|vazio/i,
  /terminei|t[eé]rmino|separa[cç][aã]o|me largou|sa[uú]dade/i,
]

/** Leitura local, gratuita, sempre executada como rede de segurança. */
export function readTextHeuristic(text: string): TextReading {
  const abuse = ABUSE.some((r) => r.test(text))
  let sadness: Sadness = 0
  if (HEAVY.some((r) => r.test(text))) sadness = 2
  else if (SAD.some((r) => r.test(text))) sadness = 1
  return { sadness, abuse, confidence: 0.5 }
}
