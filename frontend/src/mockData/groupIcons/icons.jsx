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

export const categoryIcons = [
  { key: 'alimentacao', icon: <MdFastfood style={{ color: '#FF7043' }} /> }, // laranja avermelhado — energia, comida
  { key: 'transporte', icon: <MdDirectionsCar style={{ color: '#42A5F5' }} /> }, // azul — movimento, estrada
  { key: 'moradia', icon: <MdHome style={{ color: '#8D6E63' }} /> }, // marrom suave — estabilidade, lar
  {
    key: 'contas_utilidades',
    icon: <MdLightbulb style={{ color: '#FFD54F' }} />,
  }, // amarelo — eletricidade, luz
  { key: 'saude', icon: <MdHealthAndSafety style={{ color: '#66BB6A' }} /> }, // verde — saúde, bem-estar
  { key: 'educacao', icon: <MdSchool style={{ color: '#5C6BC0' }} /> }, // azul arroxeado — sabedoria, confiança
  {
    key: 'lazer_entretenimento',
    icon: <MdMovie style={{ color: '#AB47BC' }} />,
  }, // roxo — diversão, criatividade
  {
    key: 'compras_servicos',
    icon: <MdShoppingCart style={{ color: '#EC407A' }} />,
  }, // rosa — consumo, desejo
  { key: 'viagens', icon: <MdFlightTakeoff style={{ color: '#26C6DA' }} /> }, // ciano — liberdade, céu
  {
    key: 'assinaturas_streaming',
    icon: <MdSubscriptions style={{ color: '#EF5350' }} />,
  }, // vermelho — mídia, destaque
  {
    key: 'presentes_doacoes',
    icon: <MdCardGiftcard style={{ color: '#F06292' }} />,
  }, // rosa claro — generosidade
  { key: 'investimentos', icon: <MdTrendingUp style={{ color: '#43A047' }} /> }, // verde escuro — crescimento, lucro
  {
    key: 'impostos_taxas',
    icon: <MdReceiptLong style={{ color: '#BDBDBD' }} />,
  }, // cinza — burocracia, neutro
  { key: 'animais_estimacao', icon: <MdPets style={{ color: '#FFA726' }} /> }, // laranja — alegria, carinho
  { key: 'outros', icon: <MdCategory style={{ color: '#9E9E9E' }} /> }, // cinza médio — genérico
];
