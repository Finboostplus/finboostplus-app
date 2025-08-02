import {
  MdErrorOutline,
  MdWarningAmber,
  MdCheckCircleOutline,
  MdInfoOutline,
} from 'react-icons/md';

const ICONS = {
  error: <MdErrorOutline className="w-5 h-5 text-red-500" aria-hidden="true" />,
  warning: (
    <MdWarningAmber className="w-5 h-5 text-yellow-500" aria-hidden="true" />
  ),
  success: (
    <MdCheckCircleOutline
      className="w-5 h-5 text-green-500"
      aria-hidden="true"
    />
  ),
  info: <MdInfoOutline className="w-5 h-5 text-blue-500" aria-hidden="true" />,
};

const TEXT_COLORS = {
  error: 'text-error',
  warning: 'text-warning',
  success: 'text-success',
  info: 'text-info',
};

const BG_VARS = {
  error: 'bg-error/20 border-error',
  warning: 'bg-warning/20 border-warning',
  success: 'bg-success/20 border-success',
  info: 'bg-info/20 border-info',
};

/**
 * Componente MessageBox para exibir mensagens de status (erro, aviso, sucesso, informação).
 *
 * @param {object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Conteúdo da mensagem a ser exibida.
 * @param {'error' | 'warning' | 'success' | 'info'} [props.type='error'] - Tipo da mensagem, que determina o estilo e o ícone exibido.
 * @param {boolean} [props.icon=true] - Se deve exibir o ícone correspondente ao tipo da mensagem.
 * @param {string} [props.className=''] - Classes CSS adicionais para customização do estilo.
 * @param {string} [props.role] - Valor do atributo ARIA role para acessibilidade. Por padrão, 'alert' para erros e 'status' para outros tipos.
 * @returns {JSX.Element} Elemento React renderizando a caixa de mensagem.
 */
export default function MessageBox({
  children,
  type = 'error',
  icon = true,
  className = '',
  role,
}) {
  const ariaRole = role || (type === 'error' ? 'alert' : 'status');
  const ariaLive = type === 'error' ? 'assertive' : 'polite';

  return (
    <div
      role={ariaRole}
      aria-live={ariaLive}
      className={`flex border-2 items-center gap-2 px-3 py-2 rounded-md text-sm 
        ${BG_VARS[type]} ${TEXT_COLORS[type]} ${className}`}
    >
      {icon && ICONS[type]}
      <span>{children}</span>
    </div>
  );
}
