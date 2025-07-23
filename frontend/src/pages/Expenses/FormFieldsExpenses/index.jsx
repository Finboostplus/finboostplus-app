import InputUI from '../../../components/ui/Input';

export default function FormFieldsExpenses() {
  return (
    <>
      {/*   <!-- Título --> */}
      <div>
        <label htmlFor="descricao" className="block text-sm font-medium">
          Título
        </label>
        <InputUI
          id="titulo"
          type="text"
          name="titulo"
          className="w-full p-2 border rounded"
          placeholder="Ex: Jantar no restaurante"
          required
        />
      </div>

      {/* <!-- Valor --> */}
      <div>
        <label htmlFor="valor" className="block text-sm font-medium">
          Valor
        </label>
        <InputUI
          id="valor"
          type="number"
          name="valor"
          className="w-full p-2 border rounded"
          placeholder="R$ 0,00"
          step="0.01"
          required
        />
      </div>

      {/* <!-- Grupo --> */}
      <div>
        <label htmlFor="grupo" className="block text-sm font-medium">
          Grupo
        </label>
        <InputUI
          id="grupo"
          name="grupo"
          className="w-full p-2 border rounded read-only:opacity-80 read-only:cursor-not-allowed read-only:select-none"
          readonly={true}
        />
        {/* <select id="grupo" name="grupo" className="w-full p-2 border rounded">
          <option>Casal - Marina & João</option>
          <option>Família</option>
        </select> */}
      </div>

      {/* <!-- Categoria --> */}
      <div>
        <label htmlFor="categoria" className="block text-sm font-medium">
          Categoria
        </label>
        <select
          id="categoria"
          name="categoria"
          className="w-full p-2 border rounded"
        >
          <option>Alimentação</option>
          <option>Transporte</option>
          <option>Outros</option>
        </select>
      </div>

      {/* <!-- Quem pagou --> */}
      <div className="col-span-2">
        <label htmlFor="quemPagou" className="block text-sm font-medium">
          Quem pagou?
        </label>
        <select
          id="quemPagou"
          name="quemPagou"
          className="w-full p-2 border rounded"
        >
          <option>Marina (Eu)</option>
          <option>João</option>
        </select>
      </div>
    </>
  );
}
