import {
  MdFastfood,
  MdDirectionsCar,
  MdHome,
  MdLightbulb,
  MdHealthAndSafety,
  MdSchool,
  MdMovie,
  MdShoppingCart,
  MdFlightTakeoff,
  MdSubscriptions,
  MdCardGiftcard,
  MdTrendingUp,
  MdReceiptLong,
  MdPets,
  MdCategory,
} from 'react-icons/md';

export const categoryIcons = {
  alimentacao: { icon: MdFastfood, color: '#FF7043' },
  transporte: { icon: MdDirectionsCar, color: '#42A5F5' },
  moradia: { icon: MdHome, color: '#8D6E63' },
  contas_utilidades: { icon: MdLightbulb, color: '#FFD54F' },
  saude: { icon: MdHealthAndSafety, color: '#66BB6A' },
  educacao: { icon: MdSchool, color: '#5C6BC0' },
  lazer_entretenimento: { icon: MdMovie, color: '#AB47BC' },
  compras_servicos: { icon: MdShoppingCart, color: '#EC407A' },
  viagens: { icon: MdFlightTakeoff, color: '#26C6DA' },
  assinaturas_streaming: { icon: MdSubscriptions, color: '#EF5350' },
  presentes_doacoes: { icon: MdCardGiftcard, color: '#F06292' },
  investimentos: { icon: MdTrendingUp, color: '#43A047' },
  impostos_taxas: { icon: MdReceiptLong, color: '#BDBDBD' },
  animais_estimacao: { icon: MdPets, color: '#FFA726' },
  outros: { icon: MdCategory, color: '#9E9E9E' },
};

export function CategoryIcon({ categoryKey, size = 24, className }) {
  const entry = categoryIcons[categoryKey];

  if (!entry) return null; // Se a chave não existir, não renderiza nada

  const { icon: Icon, color } = entry;

  return <Icon size={size} color={color} className={className} />;
}
