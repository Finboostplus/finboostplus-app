import CurrencyInput from 'react-currency-input-field';

export default function CurrencyInputUI(props) {
  return (
    <CurrencyInput
      prefix="R$ "
      maxLength={10}
      decimalSeparator=","
      decimalScale={2}
      decimalsLimit={2}
      allowNegativeValue={false}
      {...props}
    />
  );
}
