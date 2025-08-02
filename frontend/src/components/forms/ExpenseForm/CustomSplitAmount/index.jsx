import InputUI from '../../../ui/Input';

export default function CustomSplitAmount() {
  return (
    <>
      {/* <!-- Valores por pessoa (estáticos) --> */}
      <div className="col-span-2 mt-4">
        <p className="font-semibold">Valores por pessoa</p>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span className="w-28">Marina (Eu)</span>
            <InputUI
              type="number"
              className="w-full p-2 border rounded"
              placeholder="R$"
              step="0.01"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-28">João</span>
            <InputUI
              type="number"
              className="w-full p-2 border rounded"
              placeholder="R$"
              step="0.01"
            />
          </div>
        </div>

        {/* <!-- Status de validação (simples) --> */}
        <div className="mt-4 p-2 rounded bg-yellow-100 text-yellow-700">
          Total dividido: R$ 0,00 – verifique os valores
        </div>
      </div>
    </>
  );
}
