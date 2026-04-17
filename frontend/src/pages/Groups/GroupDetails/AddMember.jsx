import { useState } from 'react';
import ButtonUI from '../../../components/ui/Button';
import { Form } from 'react-router';
import InputUI from '../../../components/ui/Input';
import SelectUI from '../../../components/ui/Select';

export default function AddMemberForm({ onSubmit, onCancel }) {
  const [email, setEmail] = useState('');
  const [authorization, setAuthorization] = useState('USER');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await onSubmit({ email, authorization });
      /* setEmail(''); */
      setAuthorization('USER');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = !email || isSubmitting;

  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-surface  rounded-2xl p-6 flex flex-col gap-6 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-text mb-4 text-center">
        Adicionar Membro
      </h2>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="email"
          className="text-sm font-medium text-muted-foreground"
        >
          E-mail
        </label>
        <InputUI
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email@exemplo.com"
          className="border border-border rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow shadow-sm"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="authorization"
          className="text-sm font-medium text-muted-foreground"
        >
          Tipo de autorização
        </label>
        <SelectUI
          id="authorization"
          value={authorization}
          onChange={e => setAuthorization(e.target.value)}
          className="border border-border rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow shadow-sm cursor-pointer"
        >
          <option value="USER">Usuário</option>
          <option value="ADMIN">Administrador</option>
        </SelectUI>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        {onCancel && (
          <ButtonUI
            type="button"
            onClick={onCancel}
            className="px-6 py-2 cursor-pointer rounded-lg font-semibold shadow-md bg-muted text-white hover:bg-muted/80 transition"
          >
            Cancelar
          </ButtonUI>
        )}
        <ButtonUI
          type="submit"
          disabled={isSubmitDisabled}
          className={`px-6 py-2 disabled:bg-muted/20 disabled:cursor-not-allowed cursor-pointer rounded-lg font-semibold shadow-md text-white transition bg-primary hover:bg-primary/90 active:bg-primary-dark 
           `}
        >
          {isSubmitting ? 'Adicionando...' : 'Adicionar'}
        </ButtonUI>
      </div>
    </Form>
  );
}
