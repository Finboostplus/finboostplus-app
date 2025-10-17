import { Form, useNavigation, useActionData } from 'react-router';
import InputUI from '../ui/Input';
import ButtonUI from '../ui/Button';
import TextareaUI from '../ui/Textarea';

export default function GroupForm() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmitting = navigation.state === 'submitting';
  const values = actionData?.values || {};

  return (
    <Form
      method="post"
      className="h-full w-full flex flex-col bg-surface dark:bg-surface-dark p-6 md:p-8 rounded-none md:rounded-2xl space-y-6 text-text dark:text-text-dark"
    >
      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold text-center md:text-left">
          Criar novo grupo
        </h2>
        <p className="text-sm text-muted dark:text-muted-dark mt-1">
          Preencha as informações abaixo para começar a organizar suas despesas.
        </p>
      </div>

      {/* Campo: Nome */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nome do grupo <span className="text-primary">*</span>
        </label>
        <InputUI
          id="name"
          name="name"
          type="text"
          required
          defaultValue={values.name || ''}
          placeholder="Ex: Família, Viagem Cancun..."
          className="px-4 py-2 rounded-lg bg-neutral dark:bg-neutral-dark border border-zinc-300 dark:border-surface-dark text-text dark:text-text-dark placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Campo: Descrição */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Descrição
        </label>
        <TextareaUI
          id="description"
          name="description"
          rows={4}
          defaultValue={values.description || ''}
          placeholder="Opcional: Adicione uma descrição para o grupo..."
          className="px-4 py-2 rounded-lg bg-neutral dark:bg-neutral-dark border border-zinc-300 dark:border-surface-dark text-text dark:text-text-dark placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200"
        />
      </div>

      {/* Ações */}
      <div className="flex justify-end pt-4 dark:border-surface-dark">
        <ButtonUI
          type="submit"
          disabled={isSubmitting}
          title={isSubmitting ? 'Criando...' : 'Criar grupo'}
          className={`px-6 py-2 rounded-lg font-semibold shadow-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface dark:focus:ring-offset-surface-dark cursor-pointer ${
            isSubmitting
              ? 'bg-primary/60 cursor-not-allowed opacity-70'
              : 'bg-primary hover:bg-primary/90 active:bg-primary-dark'
          }`}
        />
      </div>
    </Form>
  );
}
