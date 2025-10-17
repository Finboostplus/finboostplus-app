export const avatarBackgroundColors = [
  '#ff69b4',
  '#3B82F6', // Azul médio (confiança)
  '#10B981', // Verde esmeralda (estabilidade, finanças)
  '#8B5CF6', // Roxo vibrante (inovação)
  '#F59E0B', // Âmbar (energia, destaque)
  '#EF4444', // Vermelho suave (determinação)
  '#14B8A6', // Ciano (tecnologia)
  '#6366F1', // Indigo (profissionalismo)
  '#EC4899', // Rosa (amigável, moderno)
  '#0EA5E9', // Azul claro (tranquilidade)
  '#22C55E', // Verde limão (otimismo)
  '#A855F7', // Roxo (criativo)
  '#EAB308', // Dourado (prosperidade)
  '#F43F5E', // Rosa escuro (personalidade forte)
  '#475569', // Cinza azulado (neutro elegante)
  '#6B7280', // Cinza médio (fallback)
];

export function getavatarBackgroundColorRandom() {
  const index = Math.floor(Math.random() * avatarBackgroundColors.length);
  const color = avatarBackgroundColors[index];
  return color;
}
