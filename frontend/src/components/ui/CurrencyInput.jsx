import CurrencyInput from 'react-currency-input-field';

export default function CurrencyInputUI(props) {
  return (
    <CurrencyInput
      decimalsLimit={2}
      decimalScale={2}
      decimalSeparator=","
      groupSeparator="."
      intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
      prefix="R$ "
      allowNegativeValue={false}
      {...props}
    />
  );
}
